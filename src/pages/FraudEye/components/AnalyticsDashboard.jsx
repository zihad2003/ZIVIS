import React from 'react';

const AnalyticsDashboard = ({ data }) => {
  if (!data) return (
    <div style={{ textAlign: 'center', padding: '100px 0', color: 'rgba(255,255,255,0.4)' }}>
      No analysis data available.
    </div>
  );

  const { summary, fraud_rings = [], suspicious_accounts = [] } = data;

  const glassCard = {
    background: 'rgba(255,255,255,0.03)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderRadius: 20,
    padding: 28,
    border: '1px solid rgba(255,255,255,0.07)',
    marginBottom: 32,
  };

  const stats = [
    { label: 'Analyzed',   value: summary?.total_accounts_analyzed ?? 0,    color: '#00f2ff' },
    { label: 'Suspicious', value: summary?.suspicious_accounts_flagged ?? 0, color: '#ff007a' },
    { label: 'Rings',      value: summary?.fraud_rings_detected ?? 0,        color: '#ffd700' },
    { label: 'Latency',    value: `${((summary?.processing_time_seconds ?? 0) * 1000).toFixed(0)}ms`, color: '#a855f7' },
  ];

  return (
    <div>
      {/* Stat Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20, marginBottom: 36 }}>
        {stats.map(s => (
          <div key={s.label} style={{
            ...glassCard, marginBottom: 0, textAlign: 'center',
            boxShadow: `0 0 24px ${s.color}10`,
          }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>{s.label}</div>
            <div style={{ fontSize: 34, fontWeight: 900, color: s.color, letterSpacing: '-0.02em' }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Fraud Rings */}
      <div style={glassCard}>
        <h3 style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 20, letterSpacing: '-0.01em' }}>
          Detected Fraud <span style={{ color: '#ff007a' }}>Rings</span>
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {fraud_rings.length === 0 && (
            <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, padding: '20px 0', textAlign: 'center' }}>No rings detected</div>
          )}
          {fraud_rings.map((ring, idx) => (
            <div key={idx} style={{
              padding: '20px 24px', borderRadius: 14,
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: 14, color: '#fff', marginBottom: 4, fontFamily: 'monospace' }}>{ring.ring_id}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
                  Pattern: <span style={{ color: '#00f2ff', textTransform: 'uppercase', fontWeight: 700 }}>{ring.pattern_type}</span>
                  {' · '}{ring.member_accounts?.length ?? 0} Members
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontWeight: 700, marginBottom: 4, textTransform: 'uppercase' }}>Risk Score</div>
                <div style={{
                  fontSize: 22, fontWeight: 900,
                  color: (ring.risk_score ?? 0) > 70 ? '#ff007a' : '#ffd700',
                }}>
                  {Math.round(ring.risk_score ?? 0)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Flagged Accounts */}
      <div style={glassCard}>
        <h3 style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 20, letterSpacing: '-0.01em' }}>
          Flagged <span style={{ color: '#ff007a' }}>Accounts</span>
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                {['Account ID', 'Score', 'Patterns', 'Ring ID'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', fontSize: 10, color: 'rgba(255,255,255,0.35)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', textAlign: 'left' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {suspicious_accounts.length === 0 && (
                <tr><td colSpan={4} style={{ padding: '20px 16px', color: 'rgba(255,255,255,0.3)', fontSize: 13, textAlign: 'center' }}>No flagged accounts</td></tr>
              )}
              {suspicious_accounts.map((acc, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '14px 16px', fontFamily: 'monospace', fontWeight: 700, color: '#fff', fontSize: 13 }}>{acc.account_id}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{
                      padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 800,
                      background: (acc.suspicion_score ?? 0) > 70 ? 'rgba(255,0,122,0.15)' : 'rgba(255,215,0,0.12)',
                      color: (acc.suspicion_score ?? 0) > 70 ? '#ff007a' : '#ffd700',
                      border: `1px solid ${(acc.suspicion_score ?? 0) > 70 ? 'rgba(255,0,122,0.3)' : 'rgba(255,215,0,0.25)'}`,
                    }}>
                      {acc.suspicion_score}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
                    {(acc.detected_patterns ?? []).join(', ')}
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.3)' }}>
                    {acc.ring_id ?? '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
