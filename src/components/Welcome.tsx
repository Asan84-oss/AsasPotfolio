import { motion } from 'framer-motion';

interface WelcomeProps {
  persona: 'engineer' | 'creator';
}

export default function Welcome({ persona }: WelcomeProps) {
  const isEngineer = persona === 'engineer';

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
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full"
            style={{
              background: 'rgba(0, 255, 0, 0.05)',
              border: '1px solid rgba(0, 255, 0, 0.2)'
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span
              className="text-xs tracking-widest uppercase"
              style={{ fontFamily: "'Fira Code', monospace", color: '#00FF00' }}
            >
              System Online — Available for Projects
            </span>
          </motion.div>
        )}

        {/* Creator badge */}
        {!isEngineer && (
          <motion.div
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full"
            style={{
              background: 'rgba(45, 45, 45, 0.03)',
              border: '1px solid rgba(45, 45, 45, 0.1)'
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-sm" style={{ color: '#8B7355' }}>✦</span>
            <span
              className="text-xs tracking-[0.3em] uppercase"
              style={{ fontFamily: "'Inter', sans-serif", color: '#666' }}
            >
              Software Engineer & Content Creator
            </span>
          </motion.div>
        )}

        {/* Main heading */}
        <motion.h1
          className="mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {isEngineer ? (
            <span
              className="block text-5xl md:text-7xl lg:text-8xl font-bold leading-tight"
              style={{
                fontFamily: "'Fira Code', monospace",
                color: '#00FF00',
                textShadow: '0 0 30px rgba(0, 255, 0, 0.3), 0 0 60px rgba(0, 255, 0, 0.1)'
              }}
            >
              <span className="text-pink-500">const</span> developer{' '}
              <span className="text-white">=</span>{' '}
              <span style={{ color: '#FF006E' }}>{'{'}
              </span>
              <br />
              <span className="text-white text-3xl md:text-4xl lg:text-5xl ml-4">
                name: <span style={{ color: '#00FF00' }}>"Asa Samuel Bless"</span>,
              </span>
              <br />
              <span className="text-white text-3xl md:text-4xl lg:text-5xl ml-4">
                role: <span style={{ color: '#00FF00' }}>"Full-Stack Engineer"</span>
              </span>
              <br />
              <span style={{ color: '#FF006E' }}>{'}'}</span>
            </span>
          ) : (
            <span
              className="block text-5xl md:text-7xl lg:text-8xl font-bold leading-tight"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: '#2D2D2D'
              }}
            >
              Asa Samuel
              <br />
              <span className="italic font-light" style={{ color: '#8B7355' }}>Bless</span>
            </span>
          )}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl max-w-2xl mx-auto mb-10"
          style={{
            fontFamily: isEngineer ? "'Fira Code', monospace" : "'Inter', sans-serif",
            color: isEngineer ? 'rgba(0, 255, 0, 0.6)' : 'rgba(45, 45, 45, 0.6)',
            fontWeight: isEngineer ? 300 : 300,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          {isEngineer
            ? '// Crafting digital experiences from Douala, Cameroon 🇨🇲\n// Bilingual: English + Français'
            : 'Crafting stories that bridge technology and culture, from the heart of Douala, Cameroon.'
          }
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <motion.a
            href="#projects"
            className="px-8 py-4 rounded-lg text-sm font-bold tracking-wider uppercase transition-all duration-300"
            style={{
              fontFamily: isEngineer ? "'Fira Code', monospace" : "'Inter', sans-serif",
              background: isEngineer
                ? 'linear-gradient(135deg, rgba(0, 255, 0, 0.15), rgba(255, 0, 110, 0.15))'
                : 'linear-gradient(135deg, #2D2D2D, #444)',
              color: isEngineer ? '#00FF00' : '#FAF8F5',
              border: isEngineer ? '1px solid rgba(0, 255, 0, 0.3)' : 'none',
              boxShadow: isEngineer ? '0 0 20px rgba(0, 255, 0, 0.1)' : '0 4px 15px rgba(0,0,0,0.2)'
            }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {isEngineer ? '> View Projects' : 'Explore My Work'}
          </motion.a>
          <motion.a
            href="#about"
            className="px-8 py-4 rounded-lg text-sm font-medium tracking-wider uppercase transition-all duration-300"
            style={{
              fontFamily: isEngineer ? "'Fira Code', monospace" : "'Inter', sans-serif",
              color: isEngineer ? 'rgba(0, 255, 0, 0.7)' : 'rgba(45, 45, 45, 0.7)',
              border: isEngineer ? '1px solid rgba(0, 255, 0, 0.2)' : '1px solid rgba(45, 45, 45, 0.15)',
            }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {isEngineer ? '$ whoami' : 'About Me'}
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div
            className="w-6 h-10 rounded-full flex items-start justify-center pt-2"
            style={{
              border: isEngineer ? '1px solid rgba(0, 255, 0, 0.3)' : '1px solid rgba(45, 45, 45, 0.2)'
            }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: isEngineer ? '#00FF00' : '#2D2D2D' }}
              animate={{ opacity: [1, 0.3, 1], y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
