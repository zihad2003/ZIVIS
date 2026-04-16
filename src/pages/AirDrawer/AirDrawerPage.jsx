// AirDrawer — ported from https://github.com/Axshatt/AirDrawer
// Adapted for ZIVIS unified hub: adds back navigation, preserves all drawing/gesture logic.
import React, { useState, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Hand } from 'lucide-react';
import CameraView from './components/CameraView';
import DrawingCanvas from './components/DrawingCanvas';
import HelpPanel from './components/HelpPanel';
import ControlPanel from './components/ControlPanel';
import { GestureInterpreter, CONTROL_GESTURES } from './modules/gestureInterpreter';
import { GESTURES } from './modules/gestureController';

// AirDrawer uses its own full-screen body style — apply/remove on mount
const AIRDRAWER_BODY_STYLE = 'overflow:hidden;background:#0f172a;touch-action:none;';

function AirDrawerPage() {
  const navigate = useNavigate();

  const [settings, setSettings] = useState({ color: '#00ffff', lineWidth: 8, glowIntensity: 20 });
  const [gesture, setGesture] = useState(GESTURES.IDLE);
  const [landmark, setLandmark] = useState(null);
  const [fingertips, setFingertips] = useState([]);
  const [controlGesture, setControlGesture] = useState(CONTROL_GESTURES.IDLE);
  const [controlLandmark, setControlLandmark] = useState(null);
  const [controlFingertips, setControlFingertips] = useState([]);
  const [controlPinchDelta, setControlPinchDelta] = useState(0);
  const [controlAngleDelta, setControlAngleDelta] = useState(0);
  const [cameraVisible, setCameraVisible] = useState(true);
  const [gesturesEnabled, setGesturesEnabled] = useState(true);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const canvasRef = useRef(null);
  const interpreter = useMemo(() => new GestureInterpreter(), []);

  const onResults = useCallback((results) => {
    if (!gesturesEnabled) {
      setGesture(GESTURES.IDLE); setLandmark(null); setFingertips([]);
      setControlGesture(CONTROL_GESTURES.IDLE); setControlLandmark(null); setControlFingertips([]);
      return;
    }
    const { primary, secondary } = interpreter.interpret(results);
    setGesture(primary.gesture);
    setLandmark(primary.landmark);
    setFingertips(primary.fingertips || []);
    setControlGesture(secondary.gesture);
    setControlLandmark(secondary.landmark);
    setControlFingertips(secondary.fingertips || []);
    setControlPinchDelta(secondary.pinchDelta || 0);
    setControlAngleDelta(secondary.angleDelta || 0);
  }, [gesturesEnabled, interpreter]);

  const handleSettingsChange = useCallback((changes) => {
    setSettings(prev => ({ ...prev, ...changes }));
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#0f172a', overflow: 'hidden', touchAction: 'none' }}>
      {/* Camera + Drawing */}
      {cameraVisible && <CameraView onResults={onResults} />}
      <DrawingCanvas
        ref={canvasRef}
        settings={settings}
        gesture={gesture}
        landmark={landmark}
        controlGesture={controlGesture}
        controlLandmark={controlLandmark}
        controlPinchDelta={controlPinchDelta}
        controlAngleDelta={controlAngleDelta}
      />

      {/* Back to Hub overlay button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/')}
        style={{
          position: 'fixed', top: 20, left: 20, zIndex: 200,
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '10px 18px', borderRadius: 14, cursor: 'pointer',
          background: 'rgba(8,10,18,0.85)',
          backdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.12)',
          color: '#00f2ff', fontSize: 12, fontWeight: 700,
          letterSpacing: '0.05em', textTransform: 'uppercase',
          boxShadow: '0 0 20px rgba(0,242,255,0.15)',
        }}
        whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0,242,255,0.3)' }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft size={14} /> Hub
      </motion.button>

      {/* Module badge */}
      <div style={{
        position: 'fixed', top: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 150,
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '6px 14px', borderRadius: 20,
        background: 'rgba(255,215,0,0.08)', border: '1px solid rgba(255,215,0,0.2)',
        color: '#ffd700', fontSize: 9, fontWeight: 700, letterSpacing: '0.2em',
        textTransform: 'uppercase', pointerEvents: 'none',
      }}>
        <Hand size={10} /> AirDrawer // ACTIVE
      </div>

      {/* Controls Panel */}
      <ControlPanel
        settings={settings}
        onSettingsChange={handleSettingsChange}
        onClear={() => canvasRef.current?.clear()}
        onUndo={() => canvasRef.current?.undo()}
        onRedo={() => canvasRef.current?.redo()}
        onSave={() => canvasRef.current?.save()}
        onToggleCamera={() => setCameraVisible(v => !v)}
        cameraVisible={cameraVisible}
        gestureVisible={gesturesEnabled}
        onToggleGestures={() => setGesturesEnabled(v => !v)}
        onHelp={() => setIsHelpOpen(true)}
      />

      <HelpPanel isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </div>
  );
}

export default AirDrawerPage;
