import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface WelcomeProps {
  persona: 'engineer' | 'creator';
}

export default function Welcome({ persona }: WelcomeProps) {
  const isEngineer = persona === 'engineer';
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  const engineerPitch = "Data-driven Software Engineer specializing in full-stack applications, autonomous AI coding agents, and robust transactional architectures. I eliminate systems bottlenecks and scale backend infrastructure seamlessly.";
  const creatorPitch = "Algorithm-focused Digital Marketer and Content Creator. Scaled an organic TikTok community to 50,000+ followers in 3 months. I translate brand messages into viral short-form video assets using clean visual storytelling.";

  const pitch = isEngineer ? engineerPitch : creatorPitch;

  // Terminal typing effect for engineer mode
  useEffect(() => {
    if (!isEngineer) {
      setDisplayedText('');
      return;
    }

    setDisplayedText('');
    let index = 0;
    const interval = setInterval(() => {
      if (index < pitch.length) {
        setDisplayedText(pitch.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [isEngineer, pitch]);

  // Cursor blink
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <section
      id="welcome"
      className="relative min-h-screen flex items-center justify-center px-6"
      style={{ zIndex: 1 }}
    >
      <div className="max-w-5xl mx-auto text-center">
        {/* Name / Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span
            className="block text-xs tracking-[0.3em] uppercase mb-6"
            style={{
              fontFamily: isEngineer ? "'Fira Code', monospace" : "'Inter', sans-serif",
              color: isEngineer ? '#FF006E' : '#8B7355'
            }}
          >
            {isEngineer ? '// Asa Samuel Bless — Douala, Cameroon' : 'Asa Samuel Bless'}
          </span>

          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8"
            style={{
              fontFamily: isEngineer ? "'Fira Code', monospace" : "'Playfair Display', serif",
              color: isEngineer ? '#00FF00' : '#2D2D2D',
              textShadow: isEngineer ? '0 0 30px rgba(0, 255, 0, 0.3)' : 'none',
              letterSpacing: isEngineer ? '-0.02em' : '0.02em',
              lineHeight: isEngineer ? '1.1' : '1.2'
            }}
          >
            {isEngineer ? (
              <>
                <span style={{ color: '#FF006E' }}>{'>'}</span> asa_bless
                <span className="text-2xl md:text-3xl" style={{ color: 'rgba(0, 255, 0, 0.5)' }}>.init()</span>
              </>
            ) : (
              'Asa Samuel Bless'
            )}
          </h1>
        </motion.div>

        {/* Pitch */}
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {isEngineer ? (
            /* Engineer: Terminal typing effect */
            <div
              className="text-left p-8 rounded-lg"
              style={{
                background: 'rgba(0, 255, 0, 0.02)',
                border: '1px solid rgba(0, 255, 0, 0.15)',
                boxShadow: '0 0 40px rgba(0, 255, 0, 0.05)'
              }}
            >
              {/* Terminal header */}
              <div className="flex items-center gap-2 mb-4 pb-4" style={{ borderBottom: '1px solid rgba(0, 255, 0, 0.1)' }}>
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#FF5F56' }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#FFBD2E' }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#27C93F' }} />
                <span className="ml-4 text-[10px]" style={{ color: 'rgba(0, 255, 0, 0.4)' }}>
                  ~/asa_bless — pitch.txt
                </span>
              </div>
              <p
                className="text-sm md:text-base leading-relaxed"
                style={{
                  fontFamily: "'Fira Code', monospace",
                  color: 'rgba(0, 255, 0, 0.7)',
                  fontSize: '13px'
                }}
              >
                {displayedText}
                <span
                  className="inline-block w-2 h-5 ml-1 align-middle"
                  style={{
                    background: '#00FF00',
                    opacity: showCursor ? 1 : 0,
                    boxShadow: '0 0 8px rgba(0, 255, 0, 0.5)'
                  }}
                />
              </p>
            </div>
          ) : (
            /* Creator: Elegant fade-in editorial typography */
            <motion.p
              className="text-xl md:text-2xl lg:text-3xl leading-relaxed"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: '#2D2D2D',
                letterSpacing: '0.01em',
                lineHeight: '1.6'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.8, ease: 'easeOut' }}
            >
              {creatorPitch}
            </motion.p>
          )}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block"
          >
            <span
              className="text-xs tracking-wider"
              style={{
                fontFamily: isEngineer ? "'Fira Code', monospace" : "'Inter', sans-serif",
                color: isEngineer ? 'rgba(0, 255, 0, 0.3)' : 'rgba(45, 45, 45, 0.3)'
              }}
            >
              {isEngineer ? '↓ scroll.down()' : '↓'}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
