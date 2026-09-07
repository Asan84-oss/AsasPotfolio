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
  // Check URL params for persona override (from admin preview links)
  const getInitialPersona = (): 'engineer' | 'creator' => {
    const params = new URLSearchParams(window.location.search);
    const p = params.get('persona');
    if (p === 'creator') return 'creator';
    return 'engineer';
  };

  const [persona, setPersona] = useState<'engineer' | 'creator'>(getInitialPersona);
  const isEngineer = persona === 'engineer';

  // Listen for messages from admin preview
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
    <div
      className={`relative min-h-screen transition-colors duration-700 ${isEngineer ? 'engineer-theme' : 'creator-theme'}`}
      style={{
        background: isEngineer ? '#0a0a0f' : '#FAF8F5',
        color: isEngineer ? '#00FF00' : '#2D2D2D'
      }}
    >
      {/* Background Animation */}
      <AnimatePresence mode="wait">
        {isEngineer ? (
          <motion.div
            key="engineer-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <EngineerBackground />
          </motion.div>
        ) : (
          <motion.div
            key="creator-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CreatorBackground />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <Header persona={persona} onToggle={togglePersona} />

      {/* Main Content */}
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={persona}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Welcome persona={persona} />
            <Projects persona={persona} />
            <About persona={persona} />
            <Testimonials persona={persona} />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer persona={persona} />
    </div>
  );
}

function App() {
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

export default App;
