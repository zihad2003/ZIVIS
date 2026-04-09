import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ShieldCheck, Database, Search } from 'lucide-react';

const LoadingDialog = ({ isOpen }) => {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  
  const statuses = [
    "Initializing neural parser bhai...",
    "Scanning for anomalous patterns...",
    "Validating transaction integrity...",
    "Finalizing fraud report..."
  ];

  useEffect(() => {
    if (isOpen) {
      setProgress(0);
      setStatusIndex(0);
      
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) return 100;
          return prev + 1.1;
        });
      }, 30);

      const statusInterval = setInterval(() => {
        setStatusIndex(prev => (prev + 1) % statuses.length);
      }, 750);

      return () => {
        clearInterval(interval);
        clearInterval(statusInterval);
      };
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              width: '100%',
              maxWidth: '400px',
              background: '#FFFFFF',
              borderRadius: '32px',
              padding: '40px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
              border: '1px solid rgba(0,0,0,0.05)',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px'
            }}
          >
            <div style={{ position: 'relative', width: '80px', height: '80px', margin: '0 auto' }}>
              <div 
                className="spinner" 
                style={{ 
                  width: '80px', 
                  height: '80px', 
                  borderWidth: '3px',
                  borderColor: 'rgba(0,0,0,0.05)',
                  borderTopColor: 'var(--primary)'
                }} 
              />
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'var(--primary)'
              }}>
                <ShieldCheck size={32} />
              </div>
            </div>

            <div>
              <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '8px', letterSpacing: '-0.02em' }}>
                Analyzing Data
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '15px', fontWeight: '500', height: '24px' }}>
                {statuses[statusIndex]}
              </p>
            </div>

            <div style={{ width: '100%', background: 'rgba(0,0,0,0.05)', height: '6px', borderRadius: '10px', overflow: 'hidden' }}>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                style={{ height: '100%', background: 'var(--primary)', borderRadius: '10px' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', color: 'rgba(0,0,0,0.2)' }}>
              <Database size={20} />
              <Search size={20} />
              <Activity size={20} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingDialog;
