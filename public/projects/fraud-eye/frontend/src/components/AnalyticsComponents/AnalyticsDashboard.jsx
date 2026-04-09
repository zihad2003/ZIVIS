import React from 'react';

const AnalyticsDashboard = ({ data }) => {
  if (!data) return (
    <div style={{ textAlign: 'center', padding: '100px 0', color: 'var(--text-secondary)' }}>
      No analysis data available. Please upload a file first.
    </div>
  );

  const { summary, fraud_rings, suspicious_accounts } = data;

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderRadius: '24px',
    padding: '32px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)',
    marginBottom: '40px',
    animation: 'fadeInUp 0.8s ease-out forwards'
  };

  const statGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '24px',
    marginBottom: '48px'
  };

  const statItemStyle = {
    padding: '24px',
    background: 'rgba(255, 255, 255, 0.5)',
    borderRadius: '20px',
    textAlign: 'center',
    transition: 'transform 0.3s ease'
  };

  return (
    <div className="analytics-dashboard">
      <div style={{ marginBottom: '60px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '16px', letterSpacing: '-0.03em' }}>
          Network <span style={{ color: 'var(--primary)' }}>Intelligence</span>
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
          Real-time fraud detection and relationship mapping analysis.
        </p>
      </div>

      <div style={statGridStyle}>
        <div style={statItemStyle} className="hover-lift">
          <div style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase' }}>Analyzed</div>
          <div style={{ fontSize: '32px', fontWeight: '800' }}>{summary.total_accounts_analyzed}</div>
        </div>
        <div style={statItemStyle} className="hover-lift">
          <div style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase' }}>Suspicious</div>
          <div style={{ fontSize: '32px', fontWeight: '800', color: '#FF3B30' }}>{summary.suspicious_accounts_flagged}</div>
        </div>
        <div style={statItemStyle} className="hover-lift">
          <div style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase' }}>Rings Found</div>
          <div style={{ fontSize: '32px', fontWeight: '800', color: 'var(--primary)' }}>{summary.fraud_rings_detected}</div>
        </div>
        <div style={statItemStyle} className="hover-lift">
          <div style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase' }}>Latency</div>
          <div style={{ fontSize: '32px', fontWeight: '800' }}>{summary.processing_time_seconds * 1000}ms</div>
        </div>
      </div>

      <div style={cardStyle}>
        <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px' }}>Detected Fraud Rings</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {fraud_rings.map((ring, idx) => (
            <div key={idx} style={{ 
              padding: '24px', 
              background: 'rgba(255, 255, 255, 0.4)', 
              borderRadius: '16px',
              border: '1px solid var(--border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontWeight: '700', fontSize: '16px', marginBottom: '4px' }}>{ring.ring_id}</div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  Pattern: <span style={{ textTransform: 'capitalize', color: 'var(--text)' }}>{ring.pattern_type}</span> • {ring.member_accounts.length} Members
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '4px' }}>RISK SCORE</div>
                <div style={{ 
                  fontSize: '20px', 
                  fontWeight: '800', 
                  color: ring.risk_score > 70 ? '#FF3B30' : '#FFCC00'
                }}>
                  {Math.round(ring.risk_score)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={cardStyle}>
        <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px' }}>Flagged Accounts</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border)' }}>
                <th style={{ padding: '16px', fontSize: '13px', color: 'var(--text-secondary)' }}>ACCOUNT ID</th>
                <th style={{ padding: '16px', fontSize: '13px', color: 'var(--text-secondary)' }}>SCORE</th>
                <th style={{ padding: '16px', fontSize: '13px', color: 'var(--text-secondary)' }}>PATTERNS</th>
                <th style={{ padding: '16px', fontSize: '13px', color: 'var(--text-secondary)' }}>RING ID</th>
              </tr>
            </thead>
            <tbody>
              {suspicious_accounts.map((acc, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(0,0,0,0.03)' }}>
                  <td style={{ padding: '16px', fontWeight: '600' }}>{acc.account_id}</td>
                  <td style={{ padding: '16px' }}>
                    <span style={{ 
                      padding: '4px 10px', 
                      borderRadius: '100px', 
                      background: acc.suspicion_score > 30 ? 'rgba(255, 59, 48, 0.1)' : 'rgba(255, 159, 10, 0.1)',
                      color: acc.suspicion_score > 30 ? '#FF3B30' : '#FF9500',
                      fontSize: '12px',
                      fontWeight: '700'
                    }}>
                      {acc.suspicion_score}
                    </span>
                  </td>
                  <td style={{ padding: '16px', fontSize: '14px' }}>
                    {acc.detected_patterns.join(', ')}
                  </td>
                  <td style={{ padding: '16px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                    {acc.ring_id}
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
