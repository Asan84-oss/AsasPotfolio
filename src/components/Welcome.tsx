import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getBiographies } from '../data/mockData';

interface WelcomeProps {
  persona: 'engineer' | 'creator';
}

function useTypingEffect(text: string, speed: number = 40, startDelay: number = 500) {
  const [displayed, setDisplayed] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setIsComplete(false);
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1));
          i++;
        } else {
          setIsComplete(true);
          clearInterval(interval);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);

  return { displayed, isComplete };
}

export default function Welcome({ persona }: WelcomeProps) {
  const isEngineer = persona === 'engineer';
  const bios = getBiographies();
  const bio = bios.find(b => b.persona === (isEngineer ? 'software_engineer' : 'content_creator'));

  const engineerPitch = "Data-driven Software Engineer specializing in full-stack applications, autonomous AI coding agents, and robust transactional architectures. I eliminate systems bottlenecks and scale backend infrastructure seamlessly.";
  const creatorPitch = "Algorithm-focused Digital Marketer and Content Creator. Scaled an organic TikTok community to 50,000+ followers in 3 months. I translate brand messages into viral short-form video assets using clean visual storytelling.";

  const pitch = isEngineer ? engineerPitch : creatorPitch;
  const { displayed, isComplete } = useTypingEffect(pitch, isEngineer ? 30 : 0, 800);

  return (
    <section
      id="welcome"
      className="relative min-h-screen flex items-center justify-center px-6 pt-20"
      style={{ zIndex: 1 }}
    >
      <div className="max-w-5xl mx-auto text-center">
        {/* Status indicator for engineer */}
        {isEngineer && (
          <motion.div
            className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full"
            style={{
              background: 'rgba(0, 255, 0, 0.05)',
              border: '1px solid rgba(0, 255, 0, 0.2)'
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" style={{ boxShadow: '0 0 8px rgba(0,255,0,0.5)' }} />
            <span
              className="text-xs tracking-wider"
              style={{ fontFamily: "'Fira Code', monospace", color: 'rgba(0, 255, 0, 0.7)' }}
            >
              SYSTEM ONLINE — DOUALA, CAMEROON
            </span>
          </motion.div>
        )}

        {/* Creator mode - elegant subtitle */}
        {!isEngineer && (
          <motion.p
            className="text-sm tracking-[0.4em] uppercase mb-8"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: 'rgba(139, 115, 85, 0.8)'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            Software Engineer & Content Creator
          </motion.p>
        )}

        {/* Name */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8"
          style={{
            fontFamily: isEngineer ? "'Fira Code', monospace" : "'Playfair Display', serif",
            color: isEngineer ? '#00FF00' : '#2D2D2D',
            textShadow: isEngineer ? '0 0 40px rgba(0, 255, 0, 0.3)' : 'none',
            letterSpacing: isEngineer ? '0.05em' : '-0.02em'
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {isEngineer ? (
            <>
              <span style={{ color: '#FF006E' }}>{'>'}</span> Asa_Samuel_Bless
              <span className="animate-pulse" style={{ color: '#00FF00' }}>_</span>
            </>
          ) : (
            'Asa Samuel Bless'
          )}
        </motion.h1>

        {/* Pitch Section */}
        <div className="max-w-3xl mx-auto">
          {isEngineer ? (
            /* Engineer: Terminal typing effect */
            <motion.div
              className="p-6 rounded-lg text-left"
              style={{
                background: 'rgba(10, 10, 15, 0.8)',
                border: '1px solid rgba(0, 255, 0, 0.15)',
                boxShadow: '0 0 30px rgba(0, 255, 0, 0.05)'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-4 pb-3" style={{ borderBottom: '1px solid rgba(0, 255, 0, 0.1)' }}>
                <span className="w-3 h-3 rounded-full" style={{ background: '#FF006E' }} />
                <span className="w-3 h-3 rounded-full" style={{ background: '#FFD700' }} />
                <span className="w-3 h-3 rounded-full" style={{ background: '#00FF00' }} />
                <span
                  className="ml-4 text-xs"
                  style={{ fontFamily: "'Fira Code', monospace", color: 'rgba(0, 255, 0, 0.4)' }}
                >
                  ~/asa-bless/pitch.txt
                </span>
              </div>
              <p
                className="text-sm md:text-base leading-relaxed"
                style={{
                  fontFamily: "'Fira Code', monospace",
                  color: '#00FF00',
                  minHeight: '4.5em'
                }}
              >
                {displayed}
                {!isComplete && (
                  <span className="animate-pulse" style={{ color: '#FF006E' }}>█</span>
                )}
              </p>
            </motion.div>
          ) : (
            /* Creator: Elegant fade-in typography */
            <motion.p
              className="text-xl md:text-2xl lg:text-3xl leading-relaxed"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: '#2D2D2D',
                letterSpacing: '0.01em',
                lineHeight: '1.6'
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.6, ease: 'easeOut' }}
            >
              {creatorPitch}
            </motion.p>
          )}
        </div>

        {/* Bio subtitle */}
        {bio && (
          <motion.p
            className="mt-8 text-sm"
            style={{
              fontFamily: isEngineer ? "'Fira Code', monospace" : "'Inter', sans-serif",
              color: isEngineer ? 'rgba(0, 255, 0, 0.4)' : 'rgba(45, 45, 45, 0.4)',
              fontSize: isEngineer ? '11px' : '13px'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            {isEngineer ? `// ${bio.pitchTitle}` : bio.pitchTitle}
          </motion.p>
        )}

        {/* Scroll indicator */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          <motion.div
            className="w-6 h-10 mx-auto rounded-full flex items-start justify-center p-2"
            style={{
              border: isEngineer ? '1px solid rgba(0, 255, 0, 0.3)' : '1px solid rgba(45, 45, 45, 0.2)'
            }}
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: isEngineer ? '#00FF00' : '#2D2D2D' }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
