import React, { useState, useEffect } from 'react';
import MainLayout from '../Layout/MainLayout';
import AnalyticsDashboard from '../components/AnalyticsComponents/AnalyticsDashboard';

const AnalyticsPage = () => {
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating fetching data from local storage or an API
    // Using the mock data provided in the request
    const mockData = {
      "suspicious_accounts": [
        { "account_id": "ACC_777", "suspicion_score": 40, "detected_patterns": ["cycle_length_4"], "ring_id": "RING_8B54A03A" },
        { "account_id": "ACC_888", "suspicion_score": 40, "detected_patterns": ["cycle_length_4"], "ring_id": "RING_8B54A03A" },
        { "account_id": "ACC_999", "suspicion_score": 40, "detected_patterns": ["cycle_length_4"], "ring_id": "RING_8B54A03A" },
        { "account_id": "ACC_222", "suspicion_score": 40, "detected_patterns": ["cycle_length_4"], "ring_id": "RING_8B54A03A" }
      ],
      "fraud_rings": [
        { "ring_id": "RING_8B54A03A", "member_accounts": ["ACC_777", "ACC_888", "ACC_999", "ACC_222"], "pattern_type": "cycle", "risk_score": 99.23518738022237 }
      ],
      "summary": { "total_accounts_analyzed": 5, "suspicious_accounts_flagged": 4, "fraud_rings_detected": 1, "processing_time_seconds": 0.001 }
    };

    setTimeout(() => {
      setAnalysisData(mockData);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <MainLayout>
      <div className="page-transition">
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
            <div className="spinner"></div>
          </div>
        ) : (
          <AnalyticsDashboard data={analysisData} />
        )}
      </div>
    </MainLayout>
  );
};

export default AnalyticsPage;
