import React from 'react';
import { Download, AlertTriangle, Users, Timer, Activity } from 'lucide-react';

const AnalysisResults = ({ results, onDownload }) => {
  if (!results) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '24px' 
      }}>
        {[
          { label: 'Network Nodes', value: results.summary.total_accounts_analyzed, icon: Users, color: 'var(--primary)' },
          { label: 'Risk Flags', value: results.summary.suspicious_accounts_flagged, icon: AlertTriangle, color: 'var(--accent)' },
          { label: 'Clusters', value: results.summary.fraud_rings_detected, icon: Activity, color: 'var(--secondary)' },
          { label: 'Latency', value: `${results.summary.processing_time_seconds.toFixed(2)}s`, icon: Timer, color: 'var(--text-secondary)' },
        ].map((stat, i) => (
          <div key={i} className="apple-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', marginBottom: '4px' }}>{stat.label}</p>
              <p style={{ fontSize: '28px', fontWeight: '800' }}>{stat.value}</p>
            </div>
            <div style={{ color: stat.color }}>
              <stat.icon size={24} />
            </div>
          </div>
        ))}
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '40px' 
      }}>
        <div className="apple-card" style={{ gridColumn: 'span 2', padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: '700' }}>Anomalous Entities</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>High Probability Risk Vectors</p>
            </div>
            <button 
              onClick={onDownload}
              className="apple-btn apple-btn-secondary"
              style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', padding: '8px 16px' }}
            >
              <Download size={14} /> Export Results
            </button>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: 'rgba(0,0,0,0.02)', color: 'var(--text-secondary)', fontSize: '12px', textTransform: 'uppercase' }}>
                  <th style={{ padding: '16px 24px' }}>Account ID</th>
                  <th style={{ padding: '16px 24px', textAlign: 'center' }}>Score</th>
                  <th style={{ padding: '16px 24px' }}>Patterns</th>
                </tr>
              </thead>
              <tbody>
                 {results.suspicious_accounts.map((acc, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent)' }} />
                        <span style={{ fontFamily: 'monospace', fontWeight: '600', fontSize: '14px' }}>{acc.account_id}</span>
                      </div>
                    </td>
                    <td style={{ padding: '16px 24px', textAlign: 'center' }}>
                      <span style={{ 
                        backgroundColor: 'rgba(255, 59, 48, 0.1)', 
                        color: 'var(--accent)', 
                        padding: '4px 8px', 
                        borderRadius: '6px', 
                        fontSize: '12px', 
                        fontWeight: '700' 
                      }}>
                        {acc.suspicion_score.toFixed(1)}%
                      </span>
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {acc.detected_patterns.map((p, pi) => (
                          <span key={pi} style={{ 
                            fontSize: '10px', 
                            fontWeight: '600', 
                            backgroundColor: 'rgba(0, 113, 227, 0.05)', 
                            color: 'var(--primary)', 
                            padding: '2px 8px', 
                            borderRadius: '4px',
                            textTransform: 'uppercase'
                          }}>
                            {p}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="apple-card" style={{ height: 'fit-content' }}>
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700' }}>Detected Rings</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {results.fraud_rings.map((ring, i) => (
              <div key={i} style={{ 
                padding: '16px', 
                borderRadius: '12px', 
                backgroundColor: 'rgba(0,0,0,0.02)', 
                border: '1px solid var(--border)' 
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div>
                    <p style={{ fontSize: '10px', fontWeight: '700', color: 'var(--primary)', textTransform: 'uppercase' }}>{ring.pattern_type}</p>
                    <h4 style={{ fontSize: '14px', fontWeight: '700' }}>{ring.ring_id}</h4>
                  </div>
                  <span style={{ fontSize: '18px', fontWeight: '800', color: 'var(--accent)' }}>{ring.risk_score.toFixed(1)}%</span>
                </div>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {ring.member_accounts.slice(0, 4).map((acc, ai) => (
                    <div key={ai} style={{ 
                      width: '24px', 
                      height: '24px', 
                      borderRadius: '50%', 
                      backgroundColor: 'var(--primary)', 
                      color: 'white', 
                      fontSize: '9px', 
                      fontWeight: '700',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {acc.slice(-2)}
                    </div>
                  ))}
                  {ring.member_accounts.length > 4 && (
                    <div style={{ 
                      width: '24px', 
                      height: '24px', 
                      borderRadius: '50%', 
                      backgroundColor: 'rgba(0,0,0,0.1)', 
                      fontSize: '9px', 
                      fontWeight: '700',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      +{ring.member_accounts.length - 4}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;
