import React, { useMemo } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

const GraphView = ({ data }) => {
  const graphData = useMemo(() => {
    if (!data || !data.transactions) return { nodes: [], links: [] };

    const nodesMap = new Map();
    const links = [];

    data.transactions.forEach(t => {
      const senderId = t.sender_id || t.SenderID;
      const receiverId = t.receiver_id || t.ReceiverID;
      if (!nodesMap.has(senderId)) {
        nodesMap.set(senderId, { id: senderId, name: `ACC_${String(senderId).slice(-4)}`, val: 1 });
      }
      if (!nodesMap.has(receiverId)) {
        nodesMap.set(receiverId, { id: receiverId, name: `ACC_${String(receiverId).slice(-4)}`, val: 1 });
      }
      links.push({ source: senderId, target: receiverId, amount: t.amount });
    });

    if (data.analysis && data.analysis.suspicious_accounts) {
      data.analysis.suspicious_accounts.forEach(acc => {
        if (nodesMap.has(acc.account_id)) {
          const node = nodesMap.get(acc.account_id);
          node.color = acc.suspicion_score > 70 ? '#FF3B30' : '#FF9500';
          node.val = 2 + (acc.suspicion_score / 20);
          node.isSuspicious = true;
        }
      });
    }

    return { nodes: Array.from(nodesMap.values()), links };
  }, [data]);

  return (
    <div className="apple-card" style={{ height: '600px', padding: '0', overflow: 'hidden', position: 'relative' }}>
      <div style={{ 
        position: 'absolute', 
        top: '20px', 
        left: '20px', 
        zIndex: 10, 
        backgroundColor: 'rgba(255, 255, 255, 0.8)', 
        backdropFilter: 'blur(10px)',
        padding: '12px 20px', 
        borderRadius: '12px', 
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent)', animation: 'pulse 2s infinite' }} />
          <h3 style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Relation Mapping</h3>
        </div>
        <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Neural Network Visualization</p>
      </div>

      <div style={{ 
        position: 'absolute', 
        bottom: '20px', 
        right: '20px', 
        zIndex: 10, 
        display: 'flex', 
        gap: '12px' 
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '6px', 
          fontSize: '11px', 
          fontWeight: '600', 
          color: 'var(--text-secondary)',
          backgroundColor: 'white',
          padding: '4px 10px',
          borderRadius: '20px',
          border: '1px solid var(--border)'
        }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--primary)' }} /> Normal
        </div>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '6px', 
          fontSize: '11px', 
          fontWeight: '600', 
          color: 'var(--text-secondary)',
          backgroundColor: 'white',
          padding: '4px 10px',
          borderRadius: '20px',
          border: '1px solid var(--border)'
        }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent)' }} /> Suspicious
        </div>
      </div>

      <ForceGraph2D
        graphData={graphData}
        nodeLabel="name"
        nodeColor={n => n.color || '#0071E3'}
        nodeRelSize={6}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.name;
          const fontSize = 12/globalScale;
          ctx.font = `${fontSize}px Outfit`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = node.color || '#0071E3';
          
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.val * 3, 0, 2 * Math.PI, false);
          ctx.fill();
          
          if (globalScale > 3) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
            ctx.fillText(label, node.x, node.y + node.val * 5);
          }
        }}
        linkDirectionalParticles={1}
        linkDirectionalParticleSpeed={d => d.amount * 0.0005}
        linkDirectionalParticleWidth={1.5}
        linkDirectionalParticleColor={() => 'rgba(0, 113, 227, 0.4)'}
        linkColor={() => 'rgba(0, 0, 0, 0.08)'}
        backgroundColor="#FFFFFF"
      />
      <style>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default GraphView;
