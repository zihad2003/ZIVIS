import React, { useState, useEffect } from 'react';
import MainLayout from '../components/MainLayout';
import AnalyticsDashboard from '../components/AnalyticsDashboard';

// Sample data for demo — replace with API call
const DEMO_DATA = {
  suspicious_accounts: [
    { account_id: 'ACC_777', suspicion_score: 40, detected_patterns: ['cycle_length_4'], ring_id: 'RING_8B54A03A' },
    { account_id: 'ACC_888', suspicion_score: 40, detected_patterns: ['cycle_length_4'], ring_id: 'RING_8B54A03A' },
    { account_id: 'ACC_999', suspicion_score: 40, detected_patterns: ['cycle_length_4'], ring_id: 'RING_8B54A03A' },
    { account_id: 'ACC_222', suspicion_score: 40, detected_patterns: ['cycle_length_4'], ring_id: 'RING_8B54A03A' },
  ],
  fraud_rings: [
    { ring_id: 'RING_8B54A03A', member_accounts: ['ACC_777','ACC_888','ACC_999','ACC_222'], pattern_type: 'cycle', risk_score: 99.23 },
  ],
  summary: { total_accounts_analyzed: 5, suspicious_accounts_flagged: 4, fraud_rings_detected: 1, processing_time_seconds: 0.001 },
};

const AnalyticsPage = () => {
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => { setAnalysisData(DEMO_DATA); setLoading(false); }, 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <MainLayout>
      <div className="page-transition">
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontSize: 36, fontWeight: 900, color: 'var(--text)', letterSpacing: '-0.02em' }}>
            Intelligence <span style={{ color: 'var(--primary)' }}>Dashboard</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginTop: 4 }}>Neural network fraud pattern analysis</p>
        </div>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh' }}>
            <div className="spinner" />
          </div>
        ) : (
          <AnalyticsDashboard data={analysisData} />
        )}
      </div>
    </MainLayout>
  );
};

export default AnalyticsPage;
