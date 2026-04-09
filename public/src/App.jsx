import React, { useState } from 'react';
import { LayoutGrid, Hand, Paintbrush, ShieldCheck, Atom, Settings, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './styles/App.css';

// --- Sub-Pages / Components ---
const Dashboard = ({ onLaunch }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-10 space-y-8">
    <div className="hero">
        <p className="text-cyan-400 uppercase tracking-widest font-semibold text-xs mb-2">Neural Integration Platform</p>
        <h1 className="text-5xl font-bold font-outfit mb-4">Project Coordinate</h1>
        <p className="text-gray-400 max-w-2xl text-lg">Welcome to the Axshatt Ecosystem. Your projects are synchronized and the agents are online.</p>
    </div>
    <div className="grid grid-cols-2 gap-6">
      {[
        { id: 'hand', name: 'HandConnect', desc: 'Advanced AR hand tracking experience.', icon: <Hand />, color: 'var(--accent)' },
        { id: 'draw', name: 'AirDrawer', desc: 'AI-powered 3D sketching toolkit.', icon: <Paintbrush />, color: 'var(--tertiary)' },
        { id: 'security', name: 'Fraud Eye', desc: 'Security analytics & anomaly detection.', icon: <ShieldCheck />, color: 'var(--secondary)' },
        { id: 'visuals', name: '3Js Visuals', desc: 'High-performance particle systems.', icon: <Atom />, color: 'var(--accent)' }
      ].map(proj => (
        <ProjectCard key={proj.id} {...proj} onLaunch={() => onLaunch(proj.id)} />
      ))}
    </div>
  </motion.div>
);

const ProjectCard = ({ name, desc, icon, color, onLaunch }) => (
  <motion.div 
    whileHover={{ y: -5, borderColor: color }}
    className="glass p-8 rounded-3xl border border-white/5 cursor-pointer relative overflow-hidden group"
    onClick={onLaunch}
  >
    <div className="flex items-center gap-4 mb-4">
        <div className="p-3 rounded-xl bg-white/5 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
            {icon}
        </div>
        <h3 className="text-xl font-bold font-outfit">{name}</h3>
    </div>
    <p className="text-gray-400 text-sm leading-relaxed mb-6">{desc}</p>
    <button className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-cyan-400 group-hover:text-white transition-colors">
        Launch Interface <Terminal size={16} />
    </button>
  </motion.div>
);

// --- Main App ---
export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [agentMsg, setAgentMsg] = useState({ nexus: 'Ready', sentinel: 'Scanning', vision: 'Calibrated' });

  const switchPage = (page) => {
    setActivePage(page);
    // Update Agent feedback based on page
    if (page === 'hand') setAgentMsg(prev => ({ ...prev, vision: 'Hand landmark model active.' }));
    if (page === 'security') setAgentMsg(prev => ({ ...prev, sentinel: 'Deep packet inspection running.' }));
  };

  return (
    <div className="hub-container bg-black text-white">
      {/* Sidebar */}
      <nav id="sidebar" className="glass flex flex-col items-center py-10 gap-10 border-r border-white/5">
        <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-pink-500 rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg shadow-cyan-500/20 mb-4">A</div>
        <div className="flex flex-col gap-6">
            <NavItem active={activePage === 'dashboard'} onClick={() => switchPage('dashboard')} icon={<LayoutGrid />} title="Dashboard" />
            <NavItem active={activePage === 'hand'} onClick={() => switchPage('hand')} icon={<Hand />} title="HandConnect" />
            <NavItem active={activePage === 'draw'} onClick={() => switchPage('draw')} icon={<Paintbrush />} title="AirDrawer" />
            <NavItem active={activePage === 'security'} onClick={() => switchPage('security')} icon={<ShieldCheck />} title="Fraud Eye" />
            <NavItem active={activePage === 'visuals'} onClick={() => switchPage('visuals')} icon={<Atom />} title="Visuals" />
        </div>
        <div className="mt-auto">
            <NavItem icon={<Settings />} title="Settings" />
        </div>
      </nav>

      {/* Content Area */}
      <main className="relative overflow-hidden flex flex-col">
        <header className="p-10 pb-0 flex justify-between items-center">
            <div className="text-xs font-mono text-gray-500 uppercase tracking-[4px]">Ecosystem / {activePage}</div>
            <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></div>
                <div className="text-[10px] text-cyan-400 font-bold uppercase">System Synced</div>
            </div>
        </header>

        <AnimatePresence mode="wait">
            {activePage === 'dashboard' && <Dashboard onLaunch={switchPage} />}
            {activePage !== 'dashboard' && (
                <motion.div 
                    initial={{ opacity: 0, x: 20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    exit={{ opacity: 0, x: -20 }}
                    className="flex-1 flex items-center justify-center p-10"
                >
                    <div className="text-center">
                        <h2 className="text-4xl font-outfit font-bold mb-4 uppercase tracking-widest">{activePage} Mode</h2>
                        <p className="text-gray-500 italic">"Performing Neural Sync for {activePage}..."</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
      </main>

      {/* Agent Panel */}
      <aside id="agents" className="glass border-l border-white/5 p-8 flex flex-col gap-8">
        <h3 className="text-xs font-bold uppercase tracking-[3px] text-gray-500">Core Agents</h3>
        
        <AgentCard name="Nexus" role="Systems" msg={agentMsg.nexus} color="cyan" />
        <AgentCard name="Sentinel" role="Security" msg={agentMsg.sentinel} color="pink" />
        <AgentCard name="Vision" role="Creative" msg={agentMsg.vision} color="yellow" />

        <div className="mt-auto p-4 bg-white/5 rounded-2xl border border-white/5">
            <div className="text-[10px] text-gray-400 uppercase mb-2">Environment Health</div>
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-400 w-3/4"></div>
            </div>
        </div>
      </aside>
    </div>
  );
}

const NavItem = ({ icon, title, active, onClick }) => (
    <div 
        onClick={onClick}
        className={`w-12 h-12 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 relative group
        ${active ? 'bg-white/10 text-cyan-400' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
    >
        {icon}
        {active && <div className="absolute left-[-15px] w-1 h-6 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]" />}
    </div>
);

const AgentCard = ({ name, role, msg, color }) => (
    <div className="space-y-4">
        <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg bg-${color}-500/20 flex items-center justify-center text-${color}-400 font-bold border border-${color}-400/20`}>
                {name[0]}
            </div>
            <div>
                <div className="text-sm font-bold font-outfit">{name}</div>
                <div className="text-[10px] text-gray-500 uppercase font-medium">{role}</div>
            </div>
        </div>
        <div className="bg-black/40 p-4 rounded-xl text-xs italic text-gray-300 border border-white/5">
            "{msg}"
        </div>
    </div>
);
