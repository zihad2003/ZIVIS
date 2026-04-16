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
          node.color = acc.suspicion_score > 70 ? '#ff007a' : '#ffd700';
          node.val = 2 + (acc.suspicion_score / 20);
          node.isSuspicious = true;
        }
      });
    }

    // Also highlight flagged transactions from demo analysis
    if (data.analysis && data.analysis.flagged_transactions) {
      data.analysis.flagged_transactions.forEach(t => {
        const sid = t.sender_id || t.SenderID;
        if (nodesMap.has(sid)) {
          nodesMap.get(sid).color = '#ff007a';
          nodesMap.get(sid).isSuspicious = true;
        }
      });
    }

    return { nodes: Array.from(nodesMap.values()), links };
  }, [data]);

  return (
    <div className="apple-card" style={{
      height: 560, padding: 0, overflow: 'hidden', position: 'relative',
      background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20,
    }}>
      {/* Legend overlay */}
      <div style={{
        position: 'absolute', top: 20, left: 20, zIndex: 10,
        background: 'rgba(8,10,18,0.85)', backdropFilter: 'blur(12px)',
        padding: '12px 18px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#00f2ff', boxShadow: '0 0 8px #00f2ff', animation: 'graphPulse 2s infinite' }} />
          <h3 style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#fff', margin: 0 }}>Relation Map</h3>
        </div>
        <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', margin: 0 }}>Neural Transaction Network</p>
      </div>

      <div style={{ position: 'absolute', bottom: 20, right: 20, zIndex: 10, display: 'flex', gap: 10 }}>
        {[['#00f2ff', 'Normal'], ['#ffd700', 'Suspect'], ['#ff007a', 'Fraud']].map(([color, label]) => (
          <div key={label} style={{
            display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, fontWeight: 700,
            color: 'rgba(255,255,255,0.6)', background: 'rgba(8,10,18,0.85)',
            backdropFilter: 'blur(8px)', padding: '4px 10px', borderRadius: 20,
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: color, boxShadow: `0 0 6px ${color}` }} />
            {label}
          </div>
        ))}
      </div>

      <ForceGraph2D
        graphData={graphData}
        nodeLabel="name"
        nodeColor={n => n.color || '#00f2ff'}
        nodeRelSize={6}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const r = (node.val || 1) * 3;
          // glow effect
          ctx.shadowBlur = node.isSuspicious ? 16 : 8;
          ctx.shadowColor = node.color || '#00f2ff';
          ctx.beginPath();
          ctx.arc(node.x, node.y, r, 0, 2 * Math.PI, false);
          ctx.fillStyle = node.color || '#00f2ff';
          ctx.fill();
          ctx.shadowBlur = 0;

          if (globalScale > 2.5) {
            const fontSize = 10 / globalScale;
            ctx.font = `bold ${fontSize}px Outfit`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = 'rgba(255,255,255,0.7)';
            ctx.fillText(node.name, node.x, node.y + r + fontSize);
          }
        }}
        linkDirectionalParticles={2}
        linkDirectionalParticleSpeed={d => (d.amount || 1) * 0.0004}
        linkDirectionalParticleWidth={2}
        linkDirectionalParticleColor={() => 'rgba(0,242,255,0.6)'}
        linkColor={() => 'rgba(255,255,255,0.06)'}
        backgroundColor="#03040a"
      />
      <style>{`
        @keyframes graphPulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
      `}</style>
    </div>
  );
};

export default GraphView;
