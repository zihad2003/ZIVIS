import React from 'react';
import MainLayout from '../Layout/MainLayout';
import Hero from '../components/HomePageComponent/Hero';
import FAQ from '../components/HomePageComponent/FAQ';
import analysisService from '../services/analysisServices';
import Papa from 'papaparse';

const HomePage = () => {
  const generateSampleData = async () => {
    try {
      const response = await fetch('/transactions.csv');
      const csvText = await response.text();
      
      Papa.parse(csvText, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: async (results) => {
          const transactions = results.data.filter(row => row.transaction_id || row.TransactionID).map(row => ({
            transaction_id: row.transaction_id || row.TransactionID,
            sender_id: row.sender_id || row.SenderID,
            receiver_id: row.receiver_id || row.ReceiverID,
            amount: parseFloat(row.amount || row.Amount),
            timestamp: row.timestamp || row.Timestamp || new Date().toISOString()
          }));
          
          if (transactions.length > 0) {
            await analysisService.analyzeTransactions(transactions);
            // In a real app, we might redirect to /analytics here
          }
        },
      });
    } catch (err) {
      console.error("Failed to fetch sample data bhai.", err);
    }
  };

  return (
    <MainLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
        <Hero onSampleLoad={generateSampleData} />
        <FAQ />
      </div>
    </MainLayout>
  );
};

export default HomePage;
