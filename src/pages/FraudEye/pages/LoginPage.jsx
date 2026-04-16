// LoginPage — dark glassmorphism restyled
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Mail, Lock, Loader2, Shield } from 'lucide-react';
import { useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { login, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  if (isAuthenticated) return <Navigate to="/fraudeye/analyze" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); setError('');
    try {
      await login(email, password);
      navigate('/fraudeye/analyze');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Check credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #03040a 0%, #0a0a16 100%)',
      padding: '24px', position: 'relative', overflow: 'hidden',
      fontFamily: "'Outfit','Inter',sans-serif",
    }}>
      {/* Background glows */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '-20%', right: '10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,242,255,0.1) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', bottom: '-20%', left: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,0,122,0.08) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.165, 0.84, 0.44, 1] }}
        style={{
          width: '100%', maxWidth: 420, position: 'relative', zIndex: 1,
          background: 'rgba(8,10,18,0.9)',
          backdropFilter: 'blur(24px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 24, padding: 40,
          boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 56, height: 56, margin: '0 auto 16px',
            background: 'linear-gradient(135deg, #00f2ff, #ff007a)',
            borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 30px rgba(0,242,255,0.3)',
          }}>
            <Shield size={24} color="#000" strokeWidth={2.5} />
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 900, color: '#f8f8ff', letterSpacing: '-0.025em', marginBottom: 6 }}>
            FraudEye Login
          </h1>
          <p style={{ color: '#71768b', fontSize: 13 }}>Access the fraud detection platform</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {error && (
            <div style={{
              padding: '12px 16px', borderRadius: 12,
              background: 'rgba(255,0,122,0.1)', border: '1px solid rgba(255,0,122,0.3)',
              color: '#ff007a', fontSize: 13, fontWeight: 600,
            }}>
              {error}
            </div>
          )}

          {/* Email */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: '#71768b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Email</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, bottom: 0, left: 14, display: 'flex', alignItems: 'center', color: '#71768b', pointerEvents: 'none' }}>
                <Mail size={15} />
              </div>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)} required
                placeholder="admin@admin.com"
                style={{
                  width: '100%', paddingLeft: 42, paddingRight: 14, paddingTop: 13, paddingBottom: 13,
                  background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 12, color: '#f8f8ff', fontSize: 14, outline: 'none',
                  transition: 'all 0.2s', boxSizing: 'border-box',
                }}
                onFocus={e => { e.target.style.borderColor = '#00f2ff'; e.target.style.boxShadow = '0 0 15px rgba(0,242,255,0.2)'; }}
                onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: '#71768b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, bottom: 0, left: 14, display: 'flex', alignItems: 'center', color: '#71768b', pointerEvents: 'none' }}>
                <Lock size={15} />
              </div>
              <input
                type="password" value={password} onChange={e => setPassword(e.target.value)} required
                placeholder="••••••••"
                style={{
                  width: '100%', paddingLeft: 42, paddingRight: 14, paddingTop: 13, paddingBottom: 13,
                  background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 12, color: '#f8f8ff', fontSize: 14, outline: 'none',
                  transition: 'all 0.2s', boxSizing: 'border-box',
                }}
                onFocus={e => { e.target.style.borderColor = '#00f2ff'; e.target.style.boxShadow = '0 0 15px rgba(0,242,255,0.2)'; }}
                onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
              />
            </div>
          </div>

          {/* Submit */}
          <motion.button
            type="submit" disabled={isSubmitting}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            style={{
              width: '100%', padding: '14px 20px', marginTop: 8,
              background: 'linear-gradient(135deg, rgba(0,242,255,0.8), rgba(0,128,255,0.6))',
              border: 'none', borderRadius: 14, color: '#000', fontSize: 14, fontWeight: 800,
              cursor: isSubmitting ? 'wait' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              opacity: isSubmitting ? 0.7 : 1,
              boxShadow: '0 0 30px rgba(0,242,255,0.3)',
              fontFamily: 'inherit',
            }}
          >
            {isSubmitting ? <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> : 'Access Platform'}
          </motion.button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 24, fontSize: 11, color: '#71768b', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          Powered by <span style={{ background: 'linear-gradient(135deg, #00f2ff, #ff007a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 900 }}>ZIVIS • FraudEye</span>
        </p>

        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </motion.div>
    </div>
  );
};

export default LoginPage;
