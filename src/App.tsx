import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Welcome from './components/Welcome';
import Projects from './components/Projects';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import EngineerBackground from './components/EngineerBackground';
import CreatorBackground from './components/CreatorBackground';
import AdminAuth from './pages/admin/AuthPage';
import AdminDashboard from './pages/admin/DashboardPage';

/**
 * PORTFOLIO PAGE — Dual-Persona Theme Engine
 * 
 * CRASH FIX: Each theme is wrapped in a completely separate parent div
 * with an explicit, immutable React key. This forces React to perform
 * a full unmount → remount cycle when toggling personas, preventing
 * the "Failed to execute 'removeChild' on 'Node'" DOM error.
 * 
 * The key values are:
 *   - "asa-engineer-cyberpunk-root" for Software Engineer mode
 *   - "asa-creator-minimalist-root" for Content Creator mode
 */
function PortfolioPage() {
  const getInitialPersona = (): 'engineer' | 'creator' => {
    const params = new URLSearchParams(window.location.search);
    const p = params.get('persona');
    if (p === 'creator') return 'creator';
    return 'engineer';
  };

  const [persona, setPersona] = useState<'engineer' | 'creator'>(getInitialPersona);
  const isEngineer = persona === 'engineer';

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'SET_PERSONA') {
        setPersona(event.data.persona);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const togglePersona = () => {
    setPersona(prev => prev === 'engineer' ? 'creator' : 'engineer');
  };

  // ── CRASH FIX: Complete DOM tree isolation via explicit keys ──
  // Each theme renders its own independent parent wrapper.
  // React sees the key change and safely destroys the old tree
  // before constructing the new one — no partial unmount conflicts.

  if (isEngineer) {
    return (
      <div
        key="asa-engineer-cyberpunk-root"
        className="relative min-h-screen engineer-theme"
        style={{
          background: '#0a0a0f',
          color: '#00FF00',
          fontFamily: "'Fira Code', monospace"
        }}
      >
        <EngineerBackground />
        <Header persona={persona} onToggle={togglePersona} />
        <main className="relative" style={{ zIndex: 1 }}>
          <Welcome persona={persona} />
          <Projects persona={persona} />
          <About persona={persona} />
          <Testimonials persona={persona} />
        </main>
        <Footer persona={persona} />
      </div>
    );
  }

  return (
    <div
      key="asa-creator-minimalist-root"
      className="relative min-h-screen creator-theme"
      style={{
        background: '#FAF8F5',
        color: '#2D2D2D',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      <CreatorBackground />
      <Header persona={persona} onToggle={togglePersona} />
      <main className="relative" style={{ zIndex: 1 }}>
        <Welcome persona={persona} />
        <Projects persona={persona} />
        <About persona={persona} />
        <Testimonials persona={persona} />
      </main>
      <Footer persona={persona} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PortfolioPage />} />
        <Route path="/admin/auth" element={<AdminAuth />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
