import React, { useState, useContext } from 'react';
import { AuthContext } from '../Context/Auth/AuthContext';
import { Mail, Lock, Loader2, Send } from 'lucide-react';
import { useNavigate, Navigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const { login, isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    if (isAuthenticated) {
        return <Navigate to="/analyze" replace />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        try {
            await login(email, password);
            navigate('/analyze');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed bhai. Check details.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const styles = {
        container: {
            height: '100vh',
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
            backgroundColor: '#FFFFFF',
            overflow: 'hidden',
            fontFamily: 'sans-serif',
        },
        leftColumn: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '24px',
            position: 'relative',
            backgroundColor: '#F8FAFF',
        },
        formWrapper: {
            width: '100%',
            maxWidth: '380px',
        },
        badge: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '4px 12px',
            backgroundColor: '#EFF6FF',
            color: '#2563EB',
            borderRadius: '9999px',
            fontSize: '10px',
            fontBold: '700',
            marginBottom: '16px',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
        },
        title: {
            fontSize: '30px',
            fontWeight: '900',
            color: '#111827',
            marginBottom: '12px',
            letterSpacing: '-0.025em',
        },
        subtitle: {
            color: '#9CA3AF',
            fontSize: '14px',
            lineHeight: '1.625',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
        },
        inputGroup: {
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
        },
        label: {
            fontSize: '11px',
            fontWeight: '700',
            color: '#9CA3AF',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginLeft: '4px',
        },
        inputWrapper: {
            position: 'relative',
        },
        icon: {
            position: 'absolute',
            top: '0',
            bottom: '0',
            left: '0',
            paddingLeft: '16px',
            display: 'flex',
            alignItems: 'center',
            pointerEvents: 'none',
            color: '#D1D5DB',
            transition: 'color 0.2s',
        },
        input: {
            width: '100%',
            paddingLeft: '40px',
            paddingRight: '16px',
            paddingTop: '14px',
            paddingBottom: '14px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: '16px',
            color: '#111827',
            fontSize: '14px',
            outline: 'none',
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            transition: 'all 0.2s',
        },
        submitBtn: {
            width: '100%',
            backgroundColor: '#2563EB',
            color: '#FFFFFF',
            fontWeight: '700',
            paddingTop: '14px',
            paddingBottom: '14px',
            borderRadius: '16px',
            boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.2)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'all 0.2s',
        },
        branding: {
            marginTop: '48px',
            textAlign: 'center',
        },
        brandText: {
            fontSize: '11px',
            fontWeight: '500',
            color: '#9CA3AF',
            letterSpacing: '0.025em',
            textTransform: 'uppercase',
        },
        rightColumn: {
            position: 'relative',
            backgroundColor: '#2563EB',
            overflow: 'hidden',
        },
        visualContainer: {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(64px)',
            borderRadius: '48px',
            padding: '40px',
            width: '100%',
            maxWidth: '500px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        illustContainer: {
            position: 'relative',
            width: '100%',
            maxWidth: '320px',
            aspectRatio: '1/1',
            borderRadius: '24px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
    };

    return (
        <div style={{
            ...styles.container,
            gridTemplateColumns: window.innerWidth >= 1024 ? 'repeat(2, minmax(0, 1fr))' : 'repeat(1, minmax(0, 1fr))'
        }}>
            {/* Left Column */}
            <div style={styles.leftColumn}>
                <div style={styles.formWrapper}>
                    <div style={{ marginBottom: '32px', textAlign: 'left' }}>
                        <div style={styles.badge}>
                            <Send size={10} />
                            Fraud Eye Platform
                        </div>
                        <h1 style={styles.title}>
                            Login <span style={{ color: '#FB923C' }}>✌️</span>
                        </h1>
                        <p style={styles.subtitle}>
                            Welcome back! Please enter your details.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} style={styles.form}>
                        {error && (
                            <div style={{
                                padding: '12px',
                                backgroundColor: '#FEF2F2',
                                color: '#DC2626',
                                fontSize: '12px',
                                fontWeight: '700',
                                borderRadius: '12px',
                                border: '1px solid #FEE2E2',
                            }}>
                                {error}
                            </div>
                        )}
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Email</label>
                            <div style={styles.inputWrapper}>
                                <div style={styles.icon}>
                                    <Mail size={16} />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@admin.com"
                                    style={styles.input}
                                    required
                                />
                            </div>
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Password</label>
                            <div style={styles.inputWrapper}>
                                <div style={styles.icon}>
                                    <Lock size={16} />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    style={styles.input}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            style={{
                                ...styles.submitBtn,
                                opacity: isSubmitting ? 0.7 : 1,
                                transform: isSubmitting ? 'scale(0.98)' : 'scale(1)',
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#1D4ED8'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = '#2563EB'}
                        >
                            {isSubmitting ? (
                                <Loader2 className="animate-spin" size={18} />
                            ) : (
                                'Login Now'
                            )}
                        </button>
                    </form>

                    <div style={styles.branding}>
                        <p style={styles.brandText}>
                            Powered by <span style={{ color: '#2563EB', fontWeight: '900' }}>Fraud-Eye</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Column */}
            <div style={{
                ...styles.rightColumn,
                display: window.innerWidth >= 1024 ? 'block' : 'none'
            }}>
                <div style={{ position: 'absolute', inset: 0, opacity: 0.1, pointerEvents: 'none' }}>
                    <svg style={{ width: '100%', height: '100%' }} viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0,40 Q25,20 50,40 T100,40 V100 H0 Z" fill="white" />
                        <path d="M0,70 Q30,50 60,70 T100,70 V100 H0 Z" fill="white" />
                    </svg>
                </div>

                <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px', textAlign: 'center' }}>
                    <div style={styles.visualContainer}>
                        <h2 style={{ fontSize: '30px', fontWeight: '900', color: '#FFFFFF', lineHeight: '1.25', marginBottom: '32px' }}>
                            Advanced Fraud Analytics <br /> 
                            <span style={{ color: '#BFDBFE' }}>Real-time detection.</span> 🚀
                        </h2>
                        
                        <div style={styles.illustContainer}>
                            <img src="/login_illustration.png" alt="Analytics Illustration" style={{ width: '80%', filter: 'drop-shadow(0 25px 25px rgba(0, 0, 0, 0.15))' }} />
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin {
                    animation: spin 1s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default LoginPage;
