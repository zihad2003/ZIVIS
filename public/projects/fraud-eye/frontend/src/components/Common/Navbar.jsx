import React from 'react';
import { Shield, LayoutDashboard, Share2, Info } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="glass-nav px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Shield className="text-primary w-8 h-8" />
        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          FraudEye
        </span>
      </div>
      <div className="hidden md:flex items-center gap-8">
        <a href="#" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
          <LayoutDashboard size={20} /> Dashboard
        </a>
        <a href="#" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
          <Share2 size={20} /> Graph
        </a>
        <a href="#" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
          <Info size={20} /> About
        </a>
      </div>
      <button className="btn-primary">Connect Wallet</button>
    </nav>
  );
};

export default Navbar;
