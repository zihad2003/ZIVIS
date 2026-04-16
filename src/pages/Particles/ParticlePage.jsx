// 3JsParticle — embedded from public/projects/3JsParticle/index.html
// Original: https://github.com/Axshatt/3JsParticle
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Atom } from 'lucide-react';

export default function ParticlePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#050505', overflow: 'hidden' }}>
      {/* Full-screen iframe — Three.js particle simulation */}
      <iframe
        src="/projects/3JsParticle/index.html"
        title="3Js Particle Visualizer"
        allow="camera; autoplay"
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          border: 'none', display: 'block',
        }}
      />

      {/* ZIVIS overlay */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/')}
        style={{
          position: 'fixed', top: 20, left: 20, zIndex: 9999,
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '10px 18px', borderRadius: 14, cursor: 'pointer',
          background: 'rgba(8,10,18,0.9)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(168,85,247,0.3)',
          color: '#a855f7', fontSize: 12, fontWeight: 700,
          letterSpacing: '0.05em', textTransform: 'uppercase',
          boxShadow: '0 0 20px rgba(168,85,247,0.2)',
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft size={14} /> Hub
      </motion.button>

      <div style={{
        position: 'fixed', top: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 9999,
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '6px 14px', borderRadius: 20,
        background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.2)',
        color: '#a855f7', fontSize: 9, fontWeight: 700, letterSpacing: '0.2em',
        textTransform: 'uppercase', pointerEvents: 'none',
      }}>
        <Atom size={10} /> 3Js Particles // GPU ACTIVE
      </div>
    </div>
  );
}
