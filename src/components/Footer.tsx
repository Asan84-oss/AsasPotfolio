import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface FooterProps {
  persona: 'engineer' | 'creator';
}

export default function Footer({ persona }: FooterProps) {
  const isEngineer = persona === 'engineer';

  return (
    <footer
      id="footer"
      className="relative py-12 px-6"
      style={{
        zIndex: 1,
        borderTop: isEngineer
          ? '1px solid rgba(0, 255, 0, 0.08)'
          : '1px solid rgba(45, 45, 45, 0.06)'
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Brand */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p
              className="text-sm font-bold"
              style={{
                fontFamily: isEngineer ? "'Fira Code', monospace" : "'Playfair Display', serif",
                color: isEngineer ? '#00FF00' : '#2D2D2D'
              }}
            >
              {isEngineer ? 'ASB.dev' : 'Asa Samuel Bless'}
            </p>
            <p
              className="text-xs mt-1"
              style={{
                fontFamily: isEngineer ? "'Fira Code', monospace" : "'Inter', sans-serif",
                color: isEngineer ? 'rgba(0, 255, 0, 0.3)' : 'rgba(45, 45, 45, 0.4)'
              }}
            >
              Douala, Cameroon
            </p>
          </motion.div>

          {/* Center: Links */}
          <motion.div
            className="flex items-center gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {['GitHub', 'LinkedIn', 'TikTok', 'Email'].map((link) => (
              <a
                key={link}
                href="#"
                className="text-xs tracking-wider uppercase transition-opacity hover:opacity-100"
                style={{
                  fontFamily: isEngineer ? "'Fira Code', monospace" : "'Inter', sans-serif",
                  color: isEngineer ? 'rgba(0, 255, 0, 0.4)' : 'rgba(45, 45, 45, 0.4)',
                  opacity: 0.7
                }}
              >
                {isEngineer ? link.toLowerCase() : link}
              </a>
            ))}
          </motion.div>

          {/* Right: Copyright + Admin Portal */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <p
              className="text-xs"
              style={{
                fontFamily: isEngineer ? "'Fira Code', monospace" : "'Inter', sans-serif",
                color: isEngineer ? 'rgba(0, 255, 0, 0.3)' : 'rgba(45, 45, 45, 0.3)'
              }}
            >
              © {new Date().getFullYear()} ASB
            </p>

            {/* Admin Portal Link - subtle, bottom-right */}
            <Link
              to="/admin/auth"
              className="text-xs opacity-30 hover:opacity-70 transition-opacity duration-300 cursor-pointer"
              style={{
                fontFamily: "'Fira Code', monospace",
                color: isEngineer ? '#00FF00' : '#2D2D2D',
                fontSize: '10px'
              }}
              title="Admin Portal"
            >
              {isEngineer ? '// admin.sys' : '🔒'}
            </Link>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
