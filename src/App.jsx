import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { LayoutGrid, Hand, Paintbrush, ShieldCheck, Atom, Settings, Terminal, ExternalLink, Cpu, Wifi, Battery, Zap, ArrowLeft, Activity, Shield, RotateCcw, Bell, Monitor, Palette as PaletteIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

// ─── Lazy-loaded full-screen modules ─────────────────────────────────────────
import AirDrawerPage    from './pages/AirDrawer/AirDrawerPage.jsx';
import HandConnectPage  from './pages/HandConnect/HandConnectPage.jsx';
import ParticlePage     from './pages/Particles/ParticlePage.jsx';
import FraudEyeApp      from './pages/FraudEye/FraudEyeApp.jsx';

// ─── Module Registry — route field replaces external link ────────────────────
const PROJECTS = [
  { id: 'hand',     name: 'HandConnect', desc: 'Advanced hand tracking AR system with real-time gesture recognition and neon physics simulation.',  IconComp: Hand,        color: '#00f2ff', route: '/handconnect', status: 'ACTIVE'  },
  { id: 'draw',     name: 'AirDrawer',   desc: 'AI-powered 3D spatial drawing engine. Create in thin air with neural precision tracking.',           IconComp: Paintbrush,  color: '#ffd700', route: '/airdrawer',   status: 'READY'   },
  { id: 'security', name: 'Fraud Eye',   desc: 'Next-gen security analytics with neural anomaly detection and threat mitigation protocols.',          IconComp: ShieldCheck, color: '#ff007a', route: '/fraudeye',    status: 'SECURED' },
  { id: 'visuals',  name: '3Js Visuals', desc: 'High-fidelity particle simulation engine with GPU-accelerated rendering pipelines.',                  IconComp: Atom,        color: '#a855f7', route: '/particles',   status: 'STABLE'  },
];

// ─── Dashboard ────────────────────────────────────────────────────────────────
const Dashboard = ({ onModule }) => {
  // Dynamic date stamp for terminal log
  const today = new Date().toISOString().slice(0, 10).replace(/-/g, '.');
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="p-12 space-y-16 relative">
      <div className="hero">
          <div className="flex items-center gap-4 mb-6">
              <div className="system-status"><div className="status-dot"></div><span>SYSTEMS ONLINE</span></div>
              <div className="system-status warning"><Zap size={12} /><span>NEURAL PROCESSING</span></div>
          </div>
          <h1 className="text-7xl font-black font-outfit mb-6 tracking-tight">
              <span className="gradient-text">ZIVIS</span>
          </h1>
          <p className="text-gray-400 max-w-2xl text-lg font-medium leading-relaxed">Welcome back, User. Your integrated AI ecosystem is fully operational. All neural pathways are synchronized and ready for deployment.</p>
          <div className="stats-row mt-10">
              <StatBox label="Active Modules" value="04" icon={<Cpu size={16}/>} />
              <StatBox label="Neural Speed"   value="98.2%" icon={<Zap size={16}/>} />
              <StatBox label="System Health"  value="OPTIMAL" icon={<Wifi size={16}/>} />
              <StatBox label="Power"          value="100%" icon={<Battery size={16}/>} />
          </div>
      </div>

      <div className="section-header">
          <div className="section-line"></div>
          <span>DEPLOYED MODULES</span>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {PROJECTS.map((proj, idx) => (
          <ProjectCard
            key={proj.id}
            {...proj}
            icon={<proj.IconComp />}
            /* ← Card click → module detail page (not raw window.open) */
            onLaunch={() => onModule(proj.id)}
            delay={idx * 0.1}
          />
        ))}
      </div>

      {/* Dynamic terminal log */}
      <div className="terminal-section">
          <div className="terminal-header">
              <div className="terminal-dots"><span></span><span></span><span></span></div>
              <span>SYSTEM LOG // ZIVIS_CORE</span>
          </div>
          <div className="terminal-body">
              <p><span className="text-cyan-400">[</span><span className="text-gray-500">{today}</span><span className="text-cyan-400">]</span> Initializing neural bridge protocols... <span className="text-green-400">COMPLETE</span></p>
              <p><span className="text-cyan-400">[</span><span className="text-gray-500">{today}</span><span className="text-cyan-400">]</span> Loading HandConnect module... <span className="text-green-400">LOADED</span></p>
              <p><span className="text-cyan-400">[</span><span className="text-gray-500">{today}</span><span className="text-cyan-400">]</span> Calibrating gesture recognition... <span className="text-green-400">98.2% ACCURACY</span></p>
              <p><span className="text-cyan-400">[</span><span className="text-gray-500">{today}</span><span className="text-cyan-400">]</span> All systems operational. Waiting for input.</p>
              <p className="terminal-cursor">_</p>
          </div>
      </div>
    </motion.div>
  );
};

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

// ─── Root App — react-router-dom Routes ───────────────────────────────────────
export default function App() {
  return (
    <Routes>
      {/* Hub 3-column dashboard */}
      <Route path="/"            element={<HubApp />} />
      {/* Full-screen modules */}
      <Route path="/airdrawer"   element={<AirDrawerPage />} />
      <Route path="/handconnect" element={<HandConnectPage />} />
      <Route path="/particles"   element={<ParticlePage />} />
      {/* FraudEye sub-application with its own routes */}
      <Route path="/fraudeye/*"  element={<FraudEyeApp />} />
      {/* Fallback */}
      <Route path="*"            element={<Navigate to="/" replace />} />
    </Routes>
  );
}

// ─── Hub App — 3-column glassmorphism layout ──────────────────────────────────
function HubApp() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('dashboard');
  const [selectedModule, setSelectedModule] = useState(null);
  const [time, setTime] = useState(new Date());
  const [agentMsg] = useState({
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

  // Navigate: module cards → react-router route (full-screen), or hub internal for module detail
  const openModule = (moduleId) => {
    const mod = PROJECTS.find(p => p.id === moduleId);
    if (!mod) return;
    // security (FraudEye) and visuals (Particles) + others → navigate to their route
    navigate(mod.route);
  };

  return (
    <div className="hub-container bg-black text-white selection:bg-cyan-500/30">
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
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl relative cursor-pointer"
            style={{
                background: 'linear-gradient(135deg, #00f2ff 0%, #0080ff 50%, #ff007a 100%)',
                boxShadow: '0 0 40px rgba(0, 242, 255, 0.4), 0 0 80px rgba(255, 0, 122, 0.2)'
            }}
            onClick={() => switchPage('dashboard')}
        >
            J
            <div className="absolute -inset-2 rounded-3xl border border-white/20 animate-pulse"></div>
        </motion.div>

        <div className="flex flex-col gap-4 w-full px-3">
            <NavItem active={activePage === 'dashboard'} onClick={() => switchPage('dashboard')} icon={<LayoutGrid size={20}/>} label="Hub" />
            {/* ← Fixed: each NavItem now routes to its module page */}
            <NavItem active={activePage === 'module' && selectedModule?.id === 'hand'}     onClick={() => openModule('hand')}     icon={<Hand size={20}/>}        label="Hand"   />
            <NavItem active={activePage === 'module' && selectedModule?.id === 'draw'}     onClick={() => openModule('draw')}     icon={<Paintbrush size={20}/>}  label="Draw"   />
            <NavItem active={activePage === 'module' && selectedModule?.id === 'security'} onClick={() => openModule('security')} icon={<ShieldCheck size={20}/>} label="Secure" />
            <NavItem active={activePage === 'module' && selectedModule?.id === 'visuals'}  onClick={() => openModule('visuals')}  icon={<Atom size={20}/>}        label="Visual" />
        </div>

        <div className="mt-auto flex flex-col gap-6 items-center">
            {/* ← Fixed: Terminal and Settings now have real routes */}
            <NavItem active={activePage === 'terminal'} onClick={() => switchPage('terminal')} icon={<Terminal size={20}/>} label="Term" />
            <NavItem active={activePage === 'settings'} onClick={() => switchPage('settings')} icon={<Settings size={20}/>} label="Config" />
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
                    Jarvis Core // {(activePage === 'module' ? selectedModule?.name : activePage).toUpperCase()}
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
            {activePage === 'dashboard' && <Dashboard key="dash" onModule={openModule} />}
            {activePage === 'module'    && <ModulePage key={`mod-${selectedModule?.id}`} module={selectedModule} onBack={() => switchPage('dashboard')} />}
            {activePage === 'settings'  && <SettingsPage key="settings" />}
            {activePage === 'terminal'  && <TerminalPage key="terminal" />}
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
            <AgentCard name="NEXUS"    role="System Architecture" msg={agentMsg.nexus}    color="#00f2ff" status="ONLINE"     />
            <AgentCard name="SENTINEL" role="Security Protocol"   msg={agentMsg.sentinel} color="#ff007a" status="GUARDING"   />
            <AgentCard name="VISION"   role="Neural Optics"       msg={agentMsg.vision}   color="#ffd700" status="PROCESSING" />
        </div>

        <div className="mt-auto space-y-4 relative z-10">
            {[
              { label: 'Environment Health', pct: '98%',    fill: '',       progress: '98%'  },
              { label: 'Memory Usage',       pct: '2.4 GB', fill: 'purple', progress: '42%'  },
              { label: 'GPU Load',           pct: '67%',    fill: 'pink',   progress: '67%'  },
            ].map(({ label, pct, fill, progress }, i) => (
              <div key={label} className="system-monitor">
                <div className="monitor-header">
                  <span className="text-[9px] text-gray-500 uppercase tracking-widest">{label}</span>
                  <span className={`text-[10px] font-bold ${fill === 'purple' ? 'text-purple-400' : fill === 'pink' ? 'text-pink-400' : 'text-cyan-400'}`}>{pct}</span>
                </div>
                <div className="monitor-bar">
                  <motion.div initial={{ width: 0 }} animate={{ width: progress }} transition={{ duration: 2, delay: 0.5 + i * 0.3 }} className={`monitor-fill ${fill}`} />
                </div>
              </div>
            ))}
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

// ─── Module Detail Page ───────────────────────────────────────────────────────
const ModulePage = ({ module: mod, onBack }) => {
  const navigate = useNavigate();
  if (!mod) return null;
  const { IconComp, name, desc, color, route, status } = mod;
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.4, ease: [0.165, 0.84, 0.44, 1] }}
      className="p-12 space-y-10 relative"
    >
      <button
        onClick={onBack}
        className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest transition-all duration-200 active:scale-95 cursor-pointer"
        style={{ color, background: `${color}10`, border: `1px solid ${color}30`, borderRadius: 12, padding: '10px 20px' }}
      >
        <ArrowLeft size={16} /> Back to Hub
      </button>

      <div className="flex items-center gap-8">
        <div className="w-24 h-24 rounded-3xl flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${color}30, ${color}08)`, border: `1px solid ${color}50`, color, boxShadow: `0 0 60px ${color}30` }}>
          <IconComp size={44} />
        </div>
        <div>
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-5xl font-black font-outfit text-white">{name}</h1>
            <div className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest"
              style={{ background: `${color}20`, color, border: `1px solid ${color}40` }}>{status}</div>
          </div>
          <p className="text-gray-400 text-base max-w-2xl leading-relaxed">{desc}</p>
        </div>
      </div>

      <div className="stats-row">
        {[
          { label: 'Version',  value: 'v3.1.0',   icon: <Cpu size={16}/>      },
          { label: 'Latency',  value: '< 12ms',   icon: <Zap size={16}/>      },
          { label: 'Uptime',   value: '99.9%',    icon: <Activity size={16}/> },
          { label: 'Security', value: 'AES-256',  icon: <Shield size={16}/>   },
        ].map(s => (
          <div key={s.label} className="stat-box" style={{ borderColor: `${color}20` }}>
            <div className="stat-icon" style={{ background: `${color}15`, color }}>{s.icon}</div>
            <div className="stat-content">
              <div className="stat-value" style={{ color }}>{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="glass p-10 rounded-[28px] border border-white/5">
        <h3 className="text-lg font-black font-outfit mb-2 text-white">Launch Module</h3>
        <p className="text-gray-500 text-sm mb-8 leading-relaxed">Open the {name} environment in a new tab. All neural pathways will be initialized on launch.</p>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(route)}
            className="launch-btn active:scale-95"
            style={{ '--btn-color': color, fontSize: 13, padding: '14px 32px' }}
          >
            <span>Initialize {name}</span>
            <ExternalLink size={16} />
          </button>
          <span className="text-xs text-gray-600 font-mono">Full-screen mode</span>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Settings Page ────────────────────────────────────────────────────────────
const ToggleSwitch = ({ value, onChange, color = 'var(--accent)' }) => (
  <div onClick={onChange} className="cursor-pointer active:scale-95 transition-transform" style={{
    width: 44, height: 24, borderRadius: 12, flexShrink: 0,
    background: value ? color : 'rgba(255,255,255,0.1)',
    border: `1px solid ${value ? color : 'rgba(255,255,255,0.1)'}`,
    position: 'relative', transition: 'all 0.3s ease',
  }}>
    <motion.div animate={{ x: value ? 22 : 2 }} transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      style={{ position: 'absolute', top: 2, width: 18, height: 18, borderRadius: '50%',
        background: value ? '#000' : 'rgba(255,255,255,0.5)', boxShadow: value ? `0 0 8px ${color}` : 'none' }} />
  </div>
);

const SettingsPage = () => {
  const [s, setS] = useState({ scanLines: true, glowOrbs: true, particleEffects: false, reducedMotion: false, notifications: true, autoLaunch: false });
  const toggle = k => setS(prev => ({ ...prev, [k]: !prev[k] }));

  const sections = [
    { icon: <Monitor size={18}/>, label: 'Display', items: [
      { key: 'scanLines',      label: 'Scan Line Animation', desc: 'Animated scan effect across panels' },
      { key: 'glowOrbs',       label: 'Ambient Glow Orbs',   desc: 'Background radial gradient orbs'   },
    ]},
    { icon: <PaletteIcon size={18}/>, label: 'Effects', items: [
      { key: 'particleEffects', label: 'Particle Effects', desc: 'GPU-accelerated background particles' },
      { key: 'reducedMotion',   label: 'Reduce Motion',   desc: 'Minimize animations for accessibility' },
    ]},
    { icon: <Bell size={18}/>, label: 'System', items: [
      { key: 'notifications', label: 'System Notifications',    desc: 'Toast alerts for module events'      },
      { key: 'autoLaunch',    label: 'Auto-Launch Last Module', desc: 'Resume last active module on start'  },
    ]},
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="p-12 space-y-10">
      <div>
        <h1 className="text-5xl font-black font-outfit mb-3 gradient-text">Settings</h1>
        <p className="text-gray-500 text-sm">Configure your ZIVIS neural environment</p>
      </div>

      {sections.map(section => (
        <div key={section.label} className="glass p-8 rounded-[24px] border border-white/5 space-y-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-cyan-400" style={{ background: 'rgba(255,255,255,0.05)' }}>{section.icon}</div>
            <h3 className="font-black font-outfit text-white tracking-wide">{section.label}</h3>
          </div>
          {section.items.map(item => (
            <div key={item.key} onClick={() => toggle(item.key)}
              className="flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all duration-200 active:scale-[0.99]"
              style={{ background: s[item.key] ? 'rgba(0,242,255,0.04)' : 'rgba(255,255,255,0.015)' }}>
              <div>
                <div className="text-sm font-semibold text-white">{item.label}</div>
                <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div>
              </div>
              <ToggleSwitch value={s[item.key]} onChange={() => toggle(item.key)} />
            </div>
          ))}
        </div>
      ))}

      <div className="glass p-8 rounded-[24px] border border-white/5">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-pink-400" style={{ background: 'rgba(255,255,255,0.05)' }}><Shield size={18}/></div>
          <h3 className="font-black font-outfit text-white tracking-wide">System Info</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[['ZIVIS Version','1.0.0'],['React','19.0.0'],['Renderer','Vite 5 / CF Pages'],['ML Engine','MediaPipe 0.4']].map(([label, value]) => (
            <div key={label} className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
              <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">{label}</div>
              <div className="font-mono text-sm text-white font-bold">{value}</div>
            </div>
          ))}
        </div>
      </div>

      <button className="flex items-center gap-3 text-xs text-gray-600 active:text-white transition-colors font-mono uppercase tracking-widest cursor-pointer"
        onClick={() => setS({ scanLines: true, glowOrbs: true, particleEffects: false, reducedMotion: false, notifications: true, autoLaunch: false })}>
        <RotateCcw size={14} /> Reset to Defaults
      </button>
    </motion.div>
  );
};

// ─── Terminal / Log Page ──────────────────────────────────────────────────────
const TerminalPage = () => {
  const [logs, setLogs] = useState([
    { ts: new Date().toISOString(), msg: 'ZIVIS_CORE boot sequence initiated', type: 'info' },
    { ts: new Date().toISOString(), msg: 'Neural bridge protocols initialized', type: 'success' },
    { ts: new Date().toISOString(), msg: 'MediaPipe Hands loaded (640×480 @ 30fps)', type: 'success' },
    { ts: new Date().toISOString(), msg: 'HandConnect module ACTIVE — landmark accuracy 98.2%', type: 'success' },
    { ts: new Date().toISOString(), msg: 'Fraud Eye security layer armed', type: 'success' },
    { ts: new Date().toISOString(), msg: 'GPU pipeline warm — WebGL2 renderer ready', type: 'info' },
    { ts: new Date().toISOString(), msg: 'All 4 modules operational. Awaiting user input.', type: 'info' },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [logs]);

  const handleCmd = (e) => {
    if (e.key !== 'Enter' || !input.trim()) return;
    const cmd = input.trim();
    const responses = {
      help:   'Commands: help | status | clear | modules | version',
      status: 'All systems nominal. Neural accuracy: 98.2%. Uptime: 99.9%.',
      clear:  '__CLEAR__',
      modules:'HandConnect [ACTIVE] | AirDrawer [READY] | FraudEye [SECURED] | 3JsVisuals [STABLE]',
      version:'ZIVIS v1.0.0 — React 19 / Vite 5 / MediaPipe 0.4 / Three.js r160',
    };
    const res = responses[cmd.toLowerCase()];
    if (res === '__CLEAR__') { setLogs([]); setInput(''); return; }
    setLogs(prev => [
      ...prev,
      { ts: new Date().toISOString(), msg: `> ${cmd}`, type: 'cmd' },
      { ts: new Date().toISOString(), msg: res ?? `Command not found: ${cmd}. Type 'help'.`, type: res ? 'success' : 'error' },
    ]);
    setInput('');
  };

  const typeColor = { info: '#71768b', success: '#00ff88', error: '#ff007a', cmd: '#00f2ff' };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-12 h-full flex flex-col">
      <h1 className="text-5xl font-black font-outfit mb-6 gradient-text">Terminal</h1>
      <div className="terminal-section flex-1 flex flex-col" style={{ minHeight: 0 }}>
        <div className="terminal-header">
          <div className="terminal-dots"><span/><span/><span/></div>
          <span>ZIVIS_CORE // SYSTEM LOG</span>
        </div>
        <div className="terminal-body flex-1 overflow-y-auto" style={{ maxHeight: '55vh' }}>
          {logs.map((l, i) => (
            <p key={i}>
              <span style={{ color: '#71768b', fontSize: 10 }}>[{new Date(l.ts).toLocaleTimeString()}]</span>{' '}
              <span style={{ color: typeColor[l.type] }}>{l.msg}</span>
            </p>
          ))}
          <div ref={bottomRef} />
        </div>
        <div style={{ padding: '12px 20px', borderTop: '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ color: 'var(--accent)', fontFamily: 'JetBrains Mono', fontSize: 12 }}>❯</span>
          <input
            className="glass-input"
            style={{ flex: 1, padding: '8px 12px', fontSize: 12, fontFamily: 'JetBrains Mono', background: 'transparent', border: 'none' }}
            placeholder="Type a command… (try 'help')"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleCmd}
            autoFocus
          />
        </div>
      </div>
    </motion.div>
  );
};

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
