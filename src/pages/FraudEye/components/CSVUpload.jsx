import React, { useState } from 'react';
import { Upload, X, FileText, CheckCircle2, Activity } from 'lucide-react';
import Papa from 'papaparse';
import { motion, AnimatePresence } from 'framer-motion';

const CSVUpload = ({ onUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file) => {
    setFile(file);
    setIsScanning(true);
    
    setTimeout(() => {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          onUpload(results.data);
          setIsScanning(false);
        }
      });
    }, 1500);
  };

  return (
    <div 
      className="apple-card"
      style={{ 
        borderStyle: 'dashed', 
        borderWidth: '2px',
        borderColor: dragActive ? 'var(--primary)' : 'var(--border)',
        backgroundColor: dragActive ? 'rgba(0, 113, 227, 0.05)' : 'var(--card)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        minHeight: '300px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => !file && document.getElementById('csv-upload').click()}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', textAlign: 'center' }}>
        <div style={{ 
          width: '64px', 
          height: '64px', 
          borderRadius: '16px', 
          backgroundColor: 'rgba(0, 113, 227, 0.1)', 
          color: 'var(--primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {isScanning ? <Activity size={32} style={{ animation: 'pulse 1.5s infinite' }} /> : <Upload size={32} />}
        </div>
        
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>
            {isScanning ? "Scanning Patterns..." : "Data Injection"}
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', maxWidth: '240px', margin: '0 auto' }}>
            {isScanning ? "Decoding transactions bhai..." : "Drag your CSV here or click to upload."}
          </p>
        </div>

        <input 
          type="file" 
          accept=".csv"
          onChange={(e) => e.target.files[0] && handleFile(e.target.files[0])}
          style={{ display: 'none' }}
          id="csv-upload"
        />
        
        {!isScanning && !file && (
          <button className="apple-btn" style={{ marginTop: '10px' }}>Choose File</button>
        )}
        
        <AnimatePresence>
          {file && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ 
                marginTop: '10px', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px', 
                padding: '8px 16px', 
                background: 'rgba(0,0,0,0.03)', 
                borderRadius: '8px',
                border: '1px solid var(--border)'
              }}
            >
              <FileText size={18} color="var(--primary)" />
              <span style={{ fontSize: '14px', fontWeight: '500' }}>{file.name}</span>
              <CheckCircle2 size={16} color="#34C759" />
              <button 
                onClick={(e) => { e.stopPropagation(); setFile(null); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: '4px' }}
              >
                <X size={14} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default CSVUpload;
