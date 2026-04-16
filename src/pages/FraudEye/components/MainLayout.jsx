// MainLayout — dark glassmorphism restyled for ZIVIS
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LogOut, Shield, ArrowLeft, LayoutDashboard, Activity } from 'lucide-react';

const MainLayout = ({ children }) => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/fraudeye/login'); };

  return (
    <div className="fraud-eye-root" style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      backgroundColor: 'var(--background)', color: 'var(--text)',
      fontFamily: "'Outfit', 'Inter', sans-serif",
    }}>
      {/* Header */}
      <header className="glass-nav" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto', width: '100%',
          padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {/* Left: back to hub + brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button
              onClick={() => navigate('/')}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '7px 14px', borderRadius: 10, cursor: 'pointer',
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                color: '#71768b', fontSize: 11, fontWeight: 700,
                letterSpacing: '0.05em', textTransform: 'uppercase',
                transition: 'all 0.2s', fontFamily: 'inherit',
              }}
              onMouseEnter={e => { e.target.style.color = '#00f2ff'; e.target.style.borderColor = 'rgba(0,242,255,0.3)'; }}
              onMouseLeave={e => { e.target.style.color = '#71768b'; e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }}
            >
              <ArrowLeft size={12} /> Hub
            </button>

            <Link to="/fraudeye" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: 'inherit' }}>
              <div style={{
                width: 32, height: 32, background: 'linear-gradient(135deg, #00f2ff, #ff007a)',
                borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 20px rgba(0,242,255,0.3)',
              }}>
                <Shield size={16} color="#000" strokeWidth={2.5} />
              </div>
              <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em', background: 'linear-gradient(135deg, #00f2ff, #ff007a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                FraudEye
              </span>
            </Link>
          </div>

          {/* Center nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Link to="/fraudeye" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontWeight: 600, fontSize: 13, padding: '7px 14px', borderRadius: 10, transition: 'all 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#f8f8ff'} onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.5)'}>
              Home
            </Link>
            {isAuthenticated && <>
              <Link to="/fraudeye/analyze" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontWeight: 600, fontSize: 13, padding: '7px 14px', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#f8f8ff'} onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.5)'}>
                <Activity size={14} /> Analyze
              </Link>
              <Link to="/fraudeye/analytics" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontWeight: 600, fontSize: 13, padding: '7px 14px', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#f8f8ff'} onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.5)'}>
                <LayoutDashboard size={14} /> Analytics
              </Link>
            </>}
          </nav>

          {/* Right: auth */}
          <div style={{ display: 'flex', gap: 10 }}>
            {isAuthenticated ? (
              <button onClick={handleLogout} className="apple-btn apple-btn-secondary"
                style={{ padding: '8px 16px', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
                <LogOut size={14} /> Logout
              </button>
            ) : (
              <Link to="/fraudeye/login" className="apple-btn"
                style={{ padding: '8px 18px', fontSize: 13, textDecoration: 'none' }}>
                Sign In
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main style={{ flexGrow: 1, maxWidth: 1200, margin: '0 auto', width: '100%', padding: '80px 24px 60px' }}>
        {children}
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '32px 24px', width: '100%', backgroundColor: 'rgba(8,10,18,0.9)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-secondary)', fontSize: 12 }}>
          <span style={{ fontWeight: 700 }}>FRAUDEYE © {new Date().getFullYear()} — ZIVIS MODULE</span>
          <div style={{ display: 'flex', gap: 24 }}>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
