import React from 'react';

const LayoutWrapper = ({ children }) => {
  return (
    <>
      {/* Mesh Gradient Background */}
      <div className="mesh-gradient-bg" />
      
      {/* Grid Overlay Effect */}
      <div className="grid-overlay" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }} />
      
      {/* Scan Line */}
      <div className="scan-line" style={{ position: 'fixed', zIndex: 0 }} />
      
      {/* Glow Orbs */}
      <div className="glow-orb orb-1" style={{ position: 'fixed', zIndex: 0 }} />
      <div className="glow-orb orb-2" style={{ position: 'fixed', zIndex: 0 }} />
      
      {children}
    </>
  );
};

export default LayoutWrapper;