import React from 'react';
import { motion } from 'framer-motion';
import { Database, Activity, LayoutDashboard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = ({ onSampleLoad }) => {
  const navigate = useNavigate();

  return (
    <section className="animate-fade-in" style={{ 
      position: 'relative', 
      paddingTop: '100px', 
      paddingBottom: '60px', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      textAlign: 'center' 
    }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ maxWidth: '850px' }}
      >
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '8px', 
          padding: '8px 20px', 
          borderRadius: '980px', 
          background: 'rgba(0, 113, 227, 0.08)', 
          color: 'var(--primary)', 
          fontSize: '14px', 
          fontWeight: '600', 
          marginBottom: '40px' 
        }}>
          <span style={{ width: '6px', height: '6px', background: 'var(--primary)', borderRadius: '50%', animation: 'pulse 2s infinite' }} />
          Bhai, Financial Security is our Top Priority
        </div>
        <h1 className="apple-heading" style={{ 
          fontSize: 'clamp(48px, 8vw, 88px)', 
          lineHeight: '1.02', 
          marginBottom: '32px',
        }}>
          Stop Fraud <br /> 
          <span style={{ color: 'var(--primary)' }}>Instantly.</span>
        </h1>
        <p style={{ 
          fontSize: '20px', 
          color: 'var(--text-secondary)', 
          maxWidth: '600px', 
          margin: '0 auto 48px',
          fontWeight: '500',
          lineHeight: '1.45'
        }}>
          Advanced AML heuristics and relationship mapping to secure your financial ecosystem bhai. Real-time protection for your assets.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}
      >
        <button 
          onClick={() => navigate('/analyze')}
          className="apple-btn"
          style={{ padding: '16px 32px', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Activity size={20} /> Analysis Center
        </button>
        <button 
          onClick={() => navigate('/analytics')}
          className="apple-btn apple-btn-secondary"
          style={{ padding: '16px 32px', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <LayoutDashboard size={20} /> Intelligence Dashboard
        </button>
        <button 
          onClick={onSampleLoad}
          style={{ 
            background: 'none', 
            border: '1px solid var(--border)', 
            padding: '16px 32px', 
            borderRadius: '12px',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
          className="hover-lift"
        >
          <Database size={18} /> Test Sample
        </button>
      </motion.div>
    </section>
  );
};

export default Hero;
