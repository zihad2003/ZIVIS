# ZIVIS System Design Blueprint

## Project Overview
- **Name**: ZIVIS - Neural Hub Platform
- **Type**: React SPA with multiple embedded projects
- **Purpose**: AI Ecosystem dashboard with hand tracking, drawing, security analytics, and particle visualization modules

## Tech Stack
- **Framework**: React 19 + Vite 5
- **Styling**: Tailwind CSS 3.3 + Custom CSS
- **Animation**: Framer Motion 12
- **Icons**: Lucide React
- **3D/ML**: Three.js, MediaPipe Hands
- **Deployment**: Cloudflare Pages (wrangler)

## Folder Structure
```
HandConnect/
├── src/
│   ├── main.jsx
│   ├── App.jsx          # Main dashboard component
│   └── App.css          # All styles (496 lines)
├── public/
│   └── projects/
│       ├── HandConnect/index.html
│       ├── AirDrawer/index.html
│       ├── 3JsParticle/index.html
│       └── fraud-eye/frontend/index.html
├── index.html
├── vite.config.js
├── package.json
├── wrangler.toml
└── blueprints/
    └── system_design.md
```

## State Management
- React useState for local component state
- Single activePage state (dashboard/hand/draw/security/visuals)
- Time state with 1-second interval

## Component Architecture
1. **Dashboard** - Hero section, stats, project grid, terminal log
2. **ProjectCard** - Reusable project tile with hover effects
3. **StatBox** - System metrics display
4. **NavItem** - Sidebar navigation items
5. **AgentCard** - AI agent status panels

## Sub-projects (Public Directory)
Each lives in `public/projects/` as standalone HTML apps:
- HandConnect: Hand tracking with MediaPipe
- AirDrawer: 3D spatial drawing
- 3JsParticle: Particle simulation
- Fraud-eye: Security analytics frontend

## Deployment
- **Build**: `npm run build` → `dist/`
- **Deploy**: `wrangler pages deploy dist`
- **URL**: https://zivis.pages.dev/

## CSS Variables (App.css)
```css
--accent: #00f2ff (cyan)
--secondary: #ff007a (pink)
--tertiary: #ffd700 (gold)
--bg-deep: #03040a
--text-main: #ffffff
--text-muted: #6b7280
```

## Implementation Notes
- Glassmorphism UI with backdrop-filter
- Grid layout: sidebar 85px | main content | agents panel 360px
- Framer Motion animations for entrance and hover states
- Terminal-style system logs with timestamps
- Real-time clock display
- Neural network status indicators
