import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ShieldCheck, Database, Search } from 'lucide-react';

const LoadingDialog = ({ isOpen }) => {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);

  const statuses = [
    "Initializing neural parser...",
    "Scanning for anomalous patterns...",
    "Validating transaction integrity...",
    "Finalizing fraud report...",
  ];

  useEffect(() => {
    if (!isOpen) return;
    setProgress(0);
    setStatusIndex(0);
    const pi = setInterval(() => setProgress(p => Math.min(p + 1.1, 100)), 30);
    const si = setInterval(() => setStatusIndex(p => (p + 1) % statuses.length), 750);
    return () => { clearInterval(pi); clearInterval(si); };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed', inset: 0,
            backgroundColor: 'rgba(3,4,10,0.85)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            zIndex: 9999,
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              width: '100%', maxWidth: 400,
              background: 'rgba(8,10,18,0.95)',
              backdropFilter: 'blur(24px)',
              borderRadius: 28, padding: 40,
              border: '1px solid rgba(0,242,255,0.15)',
              boxShadow: '0 0 60px rgba(0,242,255,0.1), 0 20px 60px rgba(0,0,0,0.6)',
              textAlign: 'center',
              display: 'flex', flexDirection: 'column', gap: 24,
            }}
          >
            {/* Spinner */}
            <div style={{ position: 'relative', width: 80, height: 80, margin: '0 auto' }}>
              <div className="spinner" style={{ width: 80, height: 80, borderWidth: 3 }} />
              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)', color: '#00f2ff',
              }}>
                <ShieldCheck size={30} />
              </div>
            </div>

            <div>
              <h2 style={{ fontSize: 22, fontWeight: 900, color: '#fff', marginBottom: 8, letterSpacing: '-0.02em' }}>
                Analyzing Data
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, fontWeight: 500, height: 22 }}>
                {statuses[statusIndex]}
              </p>
            </div>

            {/* Progress bar */}
            <div style={{ width: '100%', background: 'rgba(255,255,255,0.07)', height: 5, borderRadius: 10, overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                style={{
                  height: '100%', borderRadius: 10,
                  background: 'linear-gradient(90deg, #00f2ff, #ff007a)',
                  boxShadow: '0 0 12px rgba(0,242,255,0.5)',
                }}
              />
            </div>

            {/* Icons */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 20, color: 'rgba(0,242,255,0.3)' }}>
              <Database size={18} />
              <Search size={18} />
              <Activity size={18} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingDialog;
