import { motion } from 'framer-motion';

interface PersonaToggleProps {
  persona: 'engineer' | 'creator';
  onToggle: () => void;
}

export default function PersonaToggle({ persona, onToggle }: PersonaToggleProps) {
  const isEngineer = persona === 'engineer';

  return (
    <motion.button
      onClick={onToggle}
      className="relative flex items-center gap-3 px-6 py-3 rounded-full cursor-pointer select-none"
      style={{
        background: isEngineer
          ? 'linear-gradient(135deg, rgba(0, 255, 0, 0.1), rgba(255, 0, 110, 0.1))'
          : 'linear-gradient(135deg, rgba(45, 45, 45, 0.05), rgba(180, 160, 140, 0.1))',
        border: isEngineer
          ? '1px solid rgba(0, 255, 0, 0.3)'
          : '1px solid rgba(45, 45, 45, 0.15)',
        backdropFilter: 'blur(10px)'
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Engineer label */}
      <motion.span
        className="text-xs font-bold tracking-wider uppercase"
        style={{
          fontFamily: isEngineer ? "'Fira Code', monospace" : "'Inter', sans-serif",
          color: isEngineer ? '#00FF00' : 'rgba(45, 45, 45, 0.4)',
          textShadow: isEngineer ? '0 0 10px rgba(0, 255, 0, 0.5)' : 'none'
        }}
        animate={{ opacity: isEngineer ? 1 : 0.4 }}
      >
        {'<Dev />'}
      </motion.span>

      {/* Toggle track */}
      <div
        className="relative w-14 h-7 rounded-full transition-all duration-300"
        style={{
          background: isEngineer
            ? 'linear-gradient(90deg, #00FF00, #FF006E)'
            : 'linear-gradient(90deg, #C4A882, #8B7355)',
          boxShadow: isEngineer
            ? '0 0 15px rgba(0, 255, 0, 0.4), inset 0 1px 3px rgba(0,0,0,0.3)'
            : '0 2px 8px rgba(0,0,0,0.1), inset 0 1px 3px rgba(0,0,0,0.1)'
        }}
      >
        {/* Toggle thumb */}
        <motion.div
          className="absolute top-1 w-5 h-5 rounded-full shadow-md"
          style={{
            background: isEngineer ? '#0a0a0f' : '#FAF8F5',
            boxShadow: isEngineer
              ? '0 0 8px rgba(0, 255, 0, 0.6)'
              : '0 2px 4px rgba(0,0,0,0.2)'
          }}
          animate={{
            left: isEngineer ? '4px' : 'calc(100% - 24px)'
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </div>

      {/* Creator label */}
      <motion.span
        className="text-xs font-bold tracking-wider uppercase"
        style={{
          fontFamily: !isEngineer ? "'Playfair Display', serif" : "'Inter', sans-serif",
          color: !isEngineer ? '#2D2D2D' : 'rgba(0, 255, 0, 0.4)',
        }}
        animate={{ opacity: !isEngineer ? 1 : 0.4 }}
      >
        ✦ Creator
      </motion.span>
    </motion.button>
  );
}
