import React from 'react';
import { Download, AlertTriangle, Users, Timer, Activity } from 'lucide-react';

const AnalysisResults = ({ results, onDownload }) => {
  if (!results) return null;

  const summary = results.summary ?? {};
  const suspicious = results.suspicious_accounts ?? [];
  const rings = results.fraud_rings ?? [];

  const stats = [
    { label: 'Accounts Analyzed', value: summary.total_accounts_analyzed ?? '—', icon: Users,         color: '#00f2ff' },
    { label: 'Risk Flags',         value: summary.suspicious_accounts_flagged ?? '—', icon: AlertTriangle, color: '#ff007a' },
    { label: 'Fraud Rings',        value: summary.fraud_rings_detected ?? '—',        icon: Activity,      color: '#ffd700' },
    { label: 'Latency',            value: summary.processing_time_seconds != null
        ? `${Number(summary.processing_time_seconds).toFixed(2)}s`
        : '—',                                                                          icon: Timer,         color: '#a855f7' },
  ];

  const glassCard = {
    background: 'rgba(255,255,255,0.03)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 20,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20 }}>
        {stats.map((stat, i) => (
          <div key={i} style={{ ...glassCard, padding: '24px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{stat.label}</p>
              <p style={{ fontSize: 30, fontWeight: 900, color: stat.color, letterSpacing: '-0.02em', lineHeight: 1 }}>{stat.value}</p>
            </div>
            <div style={{ color: stat.color, opacity: 0.7 }}><stat.icon size={22} /></div>
          </div>
        ))}
      </div>

      {/* Suspicious Accounts Table */}
      <div style={{ ...glassCard, overflow: 'hidden' }}>
        <div style={{ padding: '22px 28px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: '#fff', margin: 0 }}>Anomalous Entities</h3>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, margin: '4px 0 0' }}>High probability risk vectors</p>
          </div>
          <button
            onClick={onDownload}
            style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px',
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 10, color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: 700,
              cursor: 'pointer', transition: 'all 0.2s',
            }}
          >
            <Download size={13} /> Export JSON
          </button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                {['Account ID', 'Score', 'Detected Patterns'].map(h => (
                  <th key={h} style={{ padding: '14px 24px', fontSize: 10, color: 'rgba(255,255,255,0.3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {suspicious.length === 0 && (
                <tr><td colSpan={3} style={{ padding: '24px', color: 'rgba(255,255,255,0.25)', fontSize: 13, textAlign: 'center' }}>No suspicious accounts detected</td></tr>
              )}
              {suspicious.map((acc, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '14px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: '#ff007a', boxShadow: '0 0 8px #ff007a' }} />
                      <span style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: 13, color: '#fff' }}>{acc.account_id}</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px 24px' }}>
                    <span style={{
                      background: Number(acc.suspicion_score) > 70 ? 'rgba(255,0,122,0.15)' : 'rgba(255,215,0,0.12)',
                      color: Number(acc.suspicion_score) > 70 ? '#ff007a' : '#ffd700',
                      border: `1px solid ${Number(acc.suspicion_score) > 70 ? 'rgba(255,0,122,0.3)' : 'rgba(255,215,0,0.25)'}`,
                      padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 800,
                    }}>
                      {Number(acc.suspicion_score ?? 0).toFixed(1)}%
                    </span>
                  </td>
                  <td style={{ padding: '14px 24px' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {(acc.detected_patterns ?? []).map((p, pi) => (
                        <span key={pi} style={{
                          fontSize: 10, fontWeight: 700,
                          background: 'rgba(0,242,255,0.08)', color: '#00f2ff',
                          border: '1px solid rgba(0,242,255,0.2)',
                          padding: '2px 8px', borderRadius: 4, textTransform: 'uppercase',
                        }}>{p}</span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fraud Rings */}
      {rings.length > 0 && (
        <div style={{ ...glassCard, padding: 28 }}>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 20 }}>
            Detected <span style={{ color: '#ff007a' }}>Rings</span>
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {rings.map((ring, i) => (
              <div key={i} style={{
                padding: '18px 22px', borderRadius: 14,
                background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <div>
                  <p style={{ fontSize: 10, fontWeight: 700, color: '#00f2ff', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{ring.pattern_type}</p>
                  <h4 style={{ fontSize: 14, fontWeight: 800, color: '#fff', margin: 0, fontFamily: 'monospace' }}>{ring.ring_id}</h4>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {(ring.member_accounts ?? []).slice(0, 4).map((acc, ai) => (
                      <div key={ai} style={{
                        width: 26, height: 26, borderRadius: '50%',
                        background: 'linear-gradient(135deg, rgba(0,242,255,0.3), rgba(255,0,122,0.2))',
                        border: '1px solid rgba(0,242,255,0.3)',
                        color: '#fff', fontSize: 9, fontWeight: 800,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>{String(acc).slice(-2)}</div>
                    ))}
                    {(ring.member_accounts ?? []).length > 4 && (
                      <div style={{
                        width: 26, height: 26, borderRadius: '50%',
                        background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                        color: 'rgba(255,255,255,0.5)', fontSize: 9, fontWeight: 700,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>+{(ring.member_accounts ?? []).length - 4}</div>
                    )}
                  </div>
                  <span style={{
                    fontSize: 20, fontWeight: 900,
                    color: Number(ring.risk_score) > 70 ? '#ff007a' : '#ffd700',
                  }}>{Number(ring.risk_score ?? 0).toFixed(1)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisResults;
