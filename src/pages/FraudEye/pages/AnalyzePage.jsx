import React, { useState, useRef } from 'react';
import MainLayout from '../components/MainLayout';
import CSVUpload from '../components/CSVUpload';
import analysisService from '../services/analysisServices';
import AnalysisResults from '../components/AnalysisResults';
import GraphView from '../components/GraphView';
import LoadingDialog from '../components/LoadingDialog';
import Papa from 'papaparse';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AnalyzePage = () => {
  const [data, setData] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timedLoading, setTimedLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const resultsRef = useRef(null);

  const handleUpload = async (csvData) => {
    setLoading(true); setTimedLoading(true); setError(null); setAnalysis(null);
    const timer = new Promise(resolve => setTimeout(resolve, 3000));
    try {
      const transactions = csvData
        .filter(row => row.transaction_id || row.TransactionID)
        .map(row => ({
          transaction_id: row.transaction_id || row.TransactionID,
          sender_id: row.sender_id || row.SenderID,
          receiver_id: row.receiver_id || row.ReceiverID,
          amount: parseFloat(row.amount || row.Amount),
          timestamp: row.timestamp || row.Timestamp || new Date().toISOString(),
        }));
      if (transactions.length === 0) throw new Error('No valid transactions found in CSV.');
      setData({ transactions });
      const result = await analysisService.analyzeTransactions(transactions);
      await timer;
      setAnalysis(result.data);
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    } catch (err) {
      setError(err.message || 'Analysis failed. Check CSV format.');
    } finally {
      setLoading(false);
      setTimeout(() => setTimedLoading(false), 500);
    }
  };

  return (
    <MainLayout>
      <LoadingDialog isOpen={timedLoading} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button
            onClick={() => navigate('/fraudeye')}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '8px 16px', borderRadius: 10, cursor: 'pointer',
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              color: 'var(--text-secondary)', fontSize: 13, fontWeight: 600,
            }}
          >
            <ArrowLeft size={14} /> Back
          </button>
          <div>
            <h1 style={{ fontSize: 36, fontWeight: 900, color: 'var(--text)', letterSpacing: '-0.02em' }}>
              Analysis <span style={{ color: 'var(--primary)' }}>Center</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginTop: 4 }}>Upload a transaction CSV to detect fraud patterns</p>
          </div>
        </div>

        {error && (
          <div className="apple-card" style={{ display: 'flex', alignItems: 'center', gap: 12, borderColor: 'rgba(255,59,48,0.3)' }}>
            <AlertCircle size={20} color="#ff007a" />
            <span style={{ color: '#ff007a', fontSize: 14, fontWeight: 600 }}>{error}</span>
          </div>
        )}

        <CSVUpload onUpload={handleUpload} />

        {data && analysis && (
          <div ref={resultsRef} style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            <AnalysisResults results={analysis} onDownload={() => {
              const blob = new Blob([JSON.stringify(analysis, null, 2)], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a'); a.href = url; a.download = 'fraud-analysis.json'; a.click();
            }} />
            <GraphView data={{ ...data, analysis }} />
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default AnalyzePage;
