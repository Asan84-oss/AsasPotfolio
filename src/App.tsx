import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
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

  return (
    <>
      {/* 
        FIX: Each theme gets a completely distinct keyed container.
        This forces React to fully unmount/remount the DOM subtree 
        rather than trying to diff and patch mismatched canvas nodes.
      */}
      {isEngineer ? (
        <div
          key="theme-cyberpunk-eng"
          className="relative min-h-screen transition-colors duration-700 engineer-theme"
          style={{ background: '#0a0a0f', color: '#00FF00' }}
        >
          <EngineerBackground />
          <Header persona={persona} onToggle={togglePersona} />
          <main>
            <Welcome persona={persona} />
            <Projects persona={persona} />
            <About persona={persona} />
            <Testimonials persona={persona} />
          </main>
          <Footer persona={persona} />
        </div>
      ) : (
        <div
          key="theme-editorial-creat"
          className="relative min-h-screen transition-colors duration-700 creator-theme"
          style={{ background: '#FAF8F5', color: '#2D2D2D' }}
        >
          <CreatorBackground />
          <Header persona={persona} onToggle={togglePersona} />
          <main>
            <Welcome persona={persona} />
            <Projects persona={persona} />
            <About persona={persona} />
            <Testimonials persona={persona} />
          </main>
          <Footer persona={persona} />
        </div>
      )}
    </>
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
