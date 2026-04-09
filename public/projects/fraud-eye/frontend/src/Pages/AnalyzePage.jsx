import React, { useState } from 'react';
import MainLayout from '../Layout/MainLayout';
import CSVUpload from '../components/HomePageComponent/CSVUpload';
import analysisService from '../services/analysisServices';
import AnalysisResults from '../components/AnalysisComponent/AnalysisResults';
import GraphView from '../components/AnalysisComponent/GraphView';
import LoadingDialog from '../components/Common/LoadingDialog';
import Papa from 'papaparse';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

const AnalyzePage = () => {
  const [data, setData] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timedLoading, setTimedLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const resultsRef = useRef(null);

  const handleUpload = async (csvData) => {
    setLoading(true);
    setTimedLoading(true);
    setError(null);
    setAnalysis(null);
    
    // Start the 3-second timer
    const timer = new Promise(resolve => setTimeout(resolve, 3000));
    
    try {
      const transactions = csvData.filter(row => row.transaction_id || row.TransactionID).map(row => ({
        transaction_id: row.transaction_id || row.TransactionID,
        sender_id: row.sender_id || row.SenderID,
        receiver_id: row.receiver_id || row.ReceiverID,
        amount: parseFloat(row.amount || row.Amount),
        timestamp: row.timestamp || row.Timestamp || new Date().toISOString()
      }));

      if (transactions.length === 0) {
        throw new Error("No valid transactions found in CSV bhai.");
      }

      setData({ transactions });
      const result = await analysisService.analyzeTransactions(transactions);
      
      // Wait for both results and 3-second timer
      await timer;
      
      setAnalysis(result.data);
      
      // Smooth scroll to results after a small delay to ensure rendering
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);

    } catch (err) {
      setError(err.message || "Failed to analyze data. Please check CSV format bhai.");
      console.error(err);
    } finally {
      setLoading(false);
      setTimedLoading(false);
    }
  };

  const downloadJSON = () => {
    if (!analysis) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(analysis, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "fraud_analysis.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <MainLayout>
      <div className="page-transition" style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            onClick={() => navigate(-1)} 
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer', 
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <ArrowLeft size={24} />
          </button>
          <h1 style={{ fontSize: '32px', fontWeight: '800', letterSpacing: '-0.02em' }}>Transaction <span style={{ color: 'var(--primary)' }}>Analysis</span></h1>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '40px', 
          alignItems: 'start' 
        }}>
          <CSVUpload onUpload={handleUpload} />
          <GraphView data={{ transactions: data?.transactions || [], analysis }} />
        </div>

        {error && (
          <div style={{ 
            backgroundColor: '#FFF1F0', 
            border: '1px solid #FFA39E', 
            padding: '16px 24px', 
            borderRadius: '12px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            color: 'var(--accent)'
          }}>
            <AlertCircle size={20} /> 
            <span style={{ fontWeight: '600' }}>{error}</span>
          </div>
        )}

        {analysis && (
          <div ref={resultsRef}>
            <AnalysisResults results={analysis} onDownload={downloadJSON} />
          </div>
        )}
        <LoadingDialog isOpen={timedLoading} />
      </div>
    </MainLayout>
  );
};

export default AnalyzePage;
