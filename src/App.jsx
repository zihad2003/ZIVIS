import React, { useState, useEffect } from 'react';
import { LayoutGrid, Hand, Paintbrush, ShieldCheck, Atom, Settings, Terminal, ExternalLink, Cpu, Wifi, Battery, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './styles/App.css';

const Dashboard = ({ onLaunch }) => (
  <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="p-12 space-y-16 relative">
    <div className="hero">
        <div className="flex items-center gap-4 mb-6">
            <div className="system-status">
                <div className="status-dot"></div>
                <span>SYSTEMS ONLINE</span>
            </div>
            <div className="system-status warning">
                <Zap size={12} />
                <span>NEURAL PROCESSING</span>
            </div>
        </div>
        <h1 className="text-7xl font-black font-outfit mb-6 tracking-tight">
            <span className="gradient-text">JARVIS</span>
            <span className="text-white ml-4">BD</span>
        </h1>
        <p className="text-gray-400 max-w-2xl text-lg font-medium leading-relaxed">Welcome back, User. Your integrated AI ecosystem is fully operational. All neural pathways are synchronized and ready for deployment.</p>
        
        <div className="stats-row mt-10">
            <StatBox label="Active Modules" value="04" icon={<Cpu size={16}/>} />
            <StatBox label="Neural Speed" value="98.2%" icon={<Zap size={16}/>} />
            <StatBox label="System Health" value="OPTIMAL" icon={<Wifi size={16}/>} />
            <StatBox label="Power" value="100%" icon={<Battery size={16}/>} />
        </div>
    </div>

    <div className="section-header">
        <div className="section-line"></div>
        <span>DEPLOYED MODULES</span>
    </div>

    <div className="grid grid-cols-2 gap-8">
      {[
        { id: 'hand', name: 'HandConnect', desc: 'Advanced hand tracking AR system with real-time gesture recognition and neon physics simulation.', icon: <Hand />, color: 'var(--accent)', link: '/projects/HandConnect/index.html', status: 'ACTIVE' },
        { id: 'draw', name: 'AirDrawer', desc: 'AI-powered 3D spatial drawing engine. Create in thin air with neural precision tracking.', icon: <Paintbrush />, color: 'var(--tertiary)', link: '/projects/AirDrawer/index.html', status: 'READY' },
        { id: 'security', name: 'Fraud Eye', desc: 'Next-gen security analytics with neural anomaly detection and threat mitigation protocols.', icon: <ShieldCheck />, color: 'var(--secondary)', link: '/projects/fraud-eye/frontend/index.html', status: 'SECURED' },
        { id: 'visuals', name: '3Js Visuals', desc: 'High-fidelity particle simulation engine with GPU-accelerated rendering pipelines.', icon: <Atom />, color: '#a855f7', link: '/projects/3JsParticle/index.html', status: 'STABLE' }
      ].map((proj, idx) => (
        <ProjectCard key={proj.id} {...proj} onLaunch={() => window.open(proj.link, '_blank')} delay={idx * 0.1} />
      ))}
    </div>

    <div className="terminal-section">
        <div className="terminal-header">
            <div className="terminal-dots">
                <span></span><span></span><span></span>
            </div>
            <span>SYSTEM LOG // JARVIS_CORE</span>
        </div>
        <div className="terminal-body">
            <p><span className="text-cyan-400">[</span><span className="text-gray-500">2026.04.09</span><span className="text-cyan-400">]</span> Initializing neural bridge protocols... <span className="text-green-400">COMPLETE</span></p>
            <p><span className="text-cyan-400">[</span><span className="text-gray-500">2026.04.09</span><span className="text-cyan-400">]</span> Loading HandConnect module... <span className="text-green-400">LOADED</span></p>
            <p><span className="text-cyan-400">[</span><span className="text-gray-500">2026.04.09</span><span className="text-cyan-400">]</span> Calibrating gesture recognition... <span className="text-green-400">98.2% ACCURACY</span></p>
            <p><span className="text-cyan-400">[</span><span className="text-gray-500">2026.04.09</span><span className="text-cyan-400">]</span> All systems operational. Waiting for input.</p>
            <p className="terminal-cursor">_</p>
        </div>
    </div>
  </motion.div>
);

const StatBox = ({ label, value, icon }) => (
    <div className="stat-box">
        <div className="stat-icon">{icon}</div>
        <div className="stat-content">
            <div className="stat-value">{value}</div>
            <div className="stat-label">{label}</div>
        </div>
    </div>
);

const ProjectCard = ({ name, desc, icon, color, onLaunch, status, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: delay, duration: 0.6, ease: [0.165, 0.84, 0.44, 1] }}
    whileHover={{ y: -8, borderColor: color, backgroundColor: 'rgba(255,255,255,0.035)' }}
    className="glass p-10 rounded-[32px] border border-white/5 cursor-pointer relative overflow-hidden group transition-all duration-500"
    onClick={onLaunch}
  >
    <div className="card-grid-bg"></div>
    
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
    
    <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-6">
                <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500"
                    style={{ 
                        background: `linear-gradient(135deg, ${color}20, ${color}05)`,
                        border: `1px solid ${color}40`,
                        color: color,
                        boxShadow: `0 0 30px ${color}20`
                    }}
                >
                    {React.cloneElement(icon, { size: 32 })}
                </div>
                <div>
                    <h3 className="text-2xl font-black font-outfit tracking-tight text-white">{name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }}></div>
                        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: color }}>{status}</span>
                    </div>
                </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 -translate-x-2">
                <ExternalLink size={18} />
            </div>
        </div>
        
        <p className="text-gray-500 text-sm leading-7 mb-8 font-medium">{desc}</p>
        
        <div className="flex items-center justify-between">
            <button className="launch-btn" style={{ '--btn-color': color }}>
                <span>Initialize</span>
                <ExternalLink size={14} />
            </button>
            <div className="tech-specs">
                <span className="text-[9px] text-gray-600 font-mono">v3.1.0</span>
            </div>
        </div>
    </div>

    <div className="corner-accent" style={{ borderColor: color }}></div>
  </motion.div>
);

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [time, setTime] = useState(new Date());
  const [agentMsg, setAgentMsg] = useState({ 
    nexus: 'All neural pathways synchronized. HandConnect module showing 98.2% landmark accuracy.', 
    sentinel: 'Security protocols active. No anomalies detected in the network mesh.', 
    vision: 'Visual rendering pipelines optimized. GPU acceleration at maximum capacity.' 
  });

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const switchPage = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="hub-container bg-black text-white h-screen w-screen selection:bg-cyan-500/30">
      {/* Animated Background */}
      <div className="bg-effects">
        <div className="grid-overlay"></div>
        <div className="scan-line"></div>
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
      </div>

      {/* Sidebar */}
      <nav id="sidebar" className="glass flex flex-col items-center py-8 gap-8 border-r border-white/[0.06] relative z-10">
        <motion.div 
            whileHover={{ rotate: 180, scale: 1.1 }} 
            transition={{ duration: 0.5 }}
            className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl relative"
            style={{
                background: 'linear-gradient(135deg, #00f2ff 0%, #0080ff 50%, #ff007a 100%)',
                boxShadow: '0 0 40px rgba(0, 242, 255, 0.4), 0 0 80px rgba(255, 0, 122, 0.2)'
            }}
        >
            J
            <div className="absolute -inset-2 rounded-3xl border border-white/20 animate-pulse"></div>
        </motion.div>
        
        <div className="flex flex-col gap-4 w-full px-3">
            <NavItem active={activePage === 'dashboard'} onClick={() => switchPage('dashboard')} icon={<LayoutGrid size={20}/>} label="Hub" />
            <NavItem active={activePage === 'hand'} onClick={() => switchPage('dashboard')} icon={<Hand size={20}/>} label="Hand" />
            <NavItem active={activePage === 'draw'} onClick={() => switchPage('dashboard')} icon={<Paintbrush size={20}/>} label="Draw" />
            <NavItem active={activePage === 'security'} onClick={() => switchPage('dashboard')} icon={<ShieldCheck size={20}/>} label="Secure" />
            <NavItem active={activePage === 'visuals'} onClick={() => switchPage('dashboard')} icon={<Atom size={20}/>} label="Visual" />
        </div>

        <div className="mt-auto flex flex-col gap-6 items-center">
            <NavItem icon={<Terminal size={20}/>} label="Term" />
            <NavItem icon={<Settings size={20}/>} label="Config" />
        </div>

        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 animate-pulse" style={{ boxShadow: '0 0 20px rgba(0, 242, 255, 0.6)' }}></div>
        </div>
      </nav>

      {/* Content Area */}
      <main className="relative overflow-y-auto flex flex-col relative z-10">
        <header className="px-12 pt-10 pb-6 flex justify-between items-center">
            <div className="flex items-center gap-6">
                <div className="text-[10px] font-black font-mono text-gray-500 uppercase tracking-[5px] flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                    Jarvis Core // {activePage.toUpperCase()}
                </div>
            </div>
            <div className="flex items-center gap-8">
                <div className="flex items-center gap-3 text-[10px] font-mono text-gray-500">
                    <Cpu size={14} className="text-cyan-400" />
                    <span>NEURAL: <span className="text-cyan-400">98.2%</span></span>
                </div>
                <div className="text-[11px] font-mono text-gray-400 bg-white/[0.03] px-4 py-2 rounded-lg border border-white/[0.06]">
                    {time.toLocaleDateString()} <span className="text-cyan-400">{time.toLocaleTimeString()}</span>
                </div>
            </div>
        </header>

        <AnimatePresence mode="wait">
            {activePage === 'dashboard' && <Dashboard key="dash" onLaunch={switchPage} />}
        </AnimatePresence>
      </main>

      {/* Agent Panel */}
      <aside id="agents" className="glass border-l border-white/[0.06] p-8 flex flex-col gap-8 relative overflow-hidden">
        <div className="scan-line-vertical"></div>
        
        <div className="flex justify-between items-center relative z-10">
            <h3 className="text-[10px] font-black uppercase tracking-[4px] text-gray-500">AI CORE</h3>
            <div className="px-3 py-1.5 rounded-full bg-cyan-400/10 text-cyan-400 text-[8px] font-black uppercase flex items-center gap-2">
                <Wifi size={10} /> SYNCED
            </div>
        </div>

        <div className="space-y-6 relative z-10">
            <AgentCard 
                name="NEXUS" 
                role="System Architecture" 
                msg={agentMsg.nexus} 
                color="#00f2ff" 
                status="ONLINE"
            />
            <AgentCard 
                name="SENTINEL" 
                role="Security Protocol" 
                msg={agentMsg.sentinel} 
                color="#ff007a" 
                status="GUARDING"
            />
            <AgentCard 
                name="VISION" 
                role="Neural Optics" 
                msg={agentMsg.vision} 
                color="#ffd700" 
                status="PROCESSING"
            />
        </div>

        <div className="mt-auto space-y-4 relative z-10">
            <div className="system-monitor">
                <div className="monitor-header">
                    <span className="text-[9px] text-gray-500 uppercase tracking-widest">Environment Health</span>
                    <span className="text-[10px] text-cyan-400 font-bold">98%</span>
                </div>
                <div className="monitor-bar">
                    <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: '98%' }} 
                        transition={{ duration: 2, delay: 0.5 }} 
                        className="monitor-fill"
                    ></motion.div>
                </div>
            </div>

            <div className="system-monitor">
                <div className="monitor-header">
                    <span className="text-[9px] text-gray-500 uppercase tracking-widest">Memory Usage</span>
                    <span className="text-[10px] text-purple-400 font-bold">2.4 GB</span>
                </div>
                <div className="monitor-bar">
                    <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: '42%' }} 
                        transition={{ duration: 2, delay: 0.8 }} 
                        className="monitor-fill purple"
                    ></motion.div>
                </div>
            </div>

            <div className="system-monitor">
                <div className="monitor-header">
                    <span className="text-[9px] text-gray-500 uppercase tracking-widest">GPU Load</span>
                    <span className="text-[10px] text-pink-400 font-bold">67%</span>
                </div>
                <div className="monitor-bar">
                    <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: '67%' }} 
                        transition={{ duration: 2, delay: 1.1 }} 
                        className="monitor-fill pink"
                    ></motion.div>
                </div>
            </div>
        </div>

        <div className="circuit-pattern"></div>
      </aside>
    </div>
  );
}

const NavItem = ({ icon, active, onClick, label }) => (
    <motion.div 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={`nav-item ${active ? 'active' : ''}`}
        title={label}
    >
        {icon}
        {active && <motion.div layoutId="nav-glow" className="nav-active-glow" />}
    </motion.div>
);

const AgentCard = ({ name, role, msg, color, status }) => (
    <motion.div 
        whileHover={{ x: 4 }}
        className="agent-card group"
    >
        <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
                <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-black border relative"
                    style={{ 
                        backgroundColor: `${color}10`, 
                        color: color, 
                        borderColor: `${color}30` 
                    }}
                >
                    {name[0]}
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }}></div>
                </div>
                <div>
                    <div className="text-[12px] font-black font-outfit tracking-wider text-white">{name}</div>
                    <div className="text-[9px] text-gray-500 uppercase font-bold tracking-widest">{role}</div>
                </div>
            </div>
            <div 
                className="text-[8px] font-black uppercase px-2 py-1 rounded"
                style={{ backgroundColor: `${color}15`, color: color }}
            >
                {status}
            </div>
        </div>
        <div 
            className="p-4 rounded-xl text-[11px] leading-relaxed text-gray-400 border border-white/[0.04] group-hover:text-gray-300 group-hover:border-white/[0.08] transition-all duration-300"
            style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
        >
            "{msg}"
        </div>
    </motion.div>
);
