import { motion } from 'framer-motion';
import PersonaToggle from './PersonaToggle';

interface HeaderProps {
  persona: 'engineer' | 'creator';
  onToggle: () => void;
}

export default function Header({ persona, onToggle }: HeaderProps) {
  const isEngineer = persona === 'engineer';

  const navLinks = [
    { href: '#welcome', label: 'Home' },
    { href: '#projects', label: 'Projects' },
    { href: '#about', label: 'About' },
    { href: '#testimonials', label: 'Testimonials' },
  ];

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      style={{
        background: isEngineer
          ? 'rgba(10, 10, 15, 0.85)'
          : 'rgba(250, 248, 245, 0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: isEngineer
          ? '1px solid rgba(0, 255, 0, 0.15)'
          : '1px solid rgba(45, 45, 45, 0.08)',
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo / Name */}
        <motion.a
          href="#welcome"
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <span
            className="text-lg font-bold"
            style={{
              fontFamily: isEngineer ? "'Fira Code', monospace" : "'Playfair Display', serif",
              color: isEngineer ? '#00FF00' : '#2D2D2D',
              textShadow: isEngineer ? '0 0 10px rgba(0, 255, 0, 0.3)' : 'none'
            }}
          >
            {isEngineer ? 'ASB.dev' : 'Asa Samuel Bless'}
          </span>
        </motion.a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              className="text-sm font-medium tracking-wide transition-colors duration-300"
              style={{
                fontFamily: isEngineer ? "'Fira Code', monospace" : "'Inter', sans-serif",
                color: isEngineer ? 'rgba(0, 255, 0, 0.7)' : 'rgba(45, 45, 45, 0.7)',
              }}
              whileHover={{
                color: isEngineer ? '#00FF00' : '#2D2D2D',
                y: -2
              }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.3 }}
            >
              {isEngineer ? `.${link.label.toLowerCase()}` : link.label}
            </motion.a>
          ))}
        </nav>

        {/* Persona Toggle */}
        <PersonaToggle persona={persona} onToggle={onToggle} />
      </div>
    </motion.header>
  );
}
