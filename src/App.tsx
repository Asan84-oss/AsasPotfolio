import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Welcome from './components/Welcome';
import Projects from './components/Projects';
import About from './components/About';
import Testimonials from './components/Testimonials';
import EngineerBackground from './components/EngineerBackground';
import CreatorBackground from './components/CreatorBackground';

function App() {
  const [persona, setPersona] = useState<'engineer' | 'creator'>('engineer');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleToggle = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setPersona(prev => prev === 'engineer' ? 'creator' : 'engineer');
      setTimeout(() => setIsTransitioning(false), 100);
    }, 300);
  };

  // Update body class for theme-specific styling
  useEffect(() => {
    document.body.className = persona === 'engineer' ? 'engineer-theme' : 'creator-theme';
    document.body.style.backgroundColor = persona === 'engineer' ? '#0a0a0f' : '#FAF8F5';
    document.body.style.transition = 'background-color 0.6s ease';
  }, [persona]);

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{
        background: persona === 'engineer' ? '#0a0a0f' : '#FAF8F5',
        transition: 'background 0.6s ease'
      }}
    >
      {/* Background Layer */}
      <AnimatePresence mode="wait">
        {persona === 'engineer' ? (
          <motion.div
            key="engineer-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <EngineerBackground />
          </motion.div>
        ) : (
          <motion.div
            key="creator-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <CreatorBackground />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Transition overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="fixed inset-0 z-[100] pointer-events-none"
            style={{
              background: persona === 'engineer'
                ? 'radial-gradient(circle, rgba(0, 255, 0, 0.1), rgba(10, 10, 15, 0.9))'
                : 'radial-gradient(circle, rgba(250, 248, 245, 0.8), rgba(250, 248, 245, 1))'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <Header persona={persona} onToggle={handleToggle} />

      {/* Main Content */}
      <main className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={persona}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <Welcome persona={persona} />
            <Projects persona={persona} />
            <About persona={persona} />
            <Testimonials persona={persona} />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
