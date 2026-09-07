import { motion } from 'framer-motion';

interface FooterProps {
  persona: 'engineer' | 'creator';
}

export default function Footer({ persona }: FooterProps) {
  const isEngineer = persona === 'engineer';

  return (
    <footer
      className="relative py-16 px-6"
      style={{
        zIndex: 1,
        borderTop: isEngineer
          ? '1px solid rgba(0, 255, 0, 0.1)'
          : '1px solid rgba(45, 45, 45, 0.06)'
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3
              className="text-lg font-bold mb-4"
              style={{
                fontFamily: isEngineer ? "'Fira Code', monospace" : "'Playfair Display', serif",
                color: isEngineer ? '#00FF00' : '#2D2D2D'
              }}
            >
              {isEngineer ? 'ASB.dev' : 'Asa Samuel Bless'}
            </h3>
            <p
              className="text-sm leading-relaxed"
              style={{
                fontFamily: isEngineer ? "'Fira Code', monospace" : "'Inter', sans-serif",
                color: isEngineer ? 'rgba(0, 255, 0, 0.4)' : 'rgba(45, 45, 45, 0.5)',
                fontSize: isEngineer ? '11px' : '14px'
              }}
            >
              {isEngineer
                ? '// Bilingual Software Engineer & Content Creator'
                : 'Bilingual Software Engineer & Content Creator'}
            </p>
            <p
              className="text-xs mt-2"
              style={{
                fontFamily: isEngineer ? "'Fira Code', monospace" : "'Inter', sans-serif",
                color: isEngineer ? 'rgba(0, 255, 0, 0.3)' : 'rgba(45, 45, 45, 0.4)'
              }}
            >
              Douala, Cameroon 🇨🇲
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-xs font-bold tracking-wider uppercase mb-4"
              style={{
                fontFamily: isEngineer ? "'Fira Code', monospace" : "'Inter', sans-serif",
                color: isEngineer ? '#FF006E' : '#8B7355'
              }}
            >
              {isEngineer ? '// Navigation' : 'Quick Links'}
            </h4>
            <ul className="space-y-2">
              {['Home', 'Projects', 'About', 'Testimonials'].map(link => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-xs transition-colors"
                    style={{
                      fontFamily: isEngineer ? "'Fira Code', monospace" : "'Inter', sans-serif",
                      color: isEngineer ? 'rgba(0, 255, 0, 0.5)' : 'rgba(45, 45, 45, 0.5)'
                    }}
                  >
                    {isEngineer ? `> ./${link.toLowerCase()}` : link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-xs font-bold tracking-wider uppercase mb-4"
              style={{
                fontFamily: isEngineer ? "'Fira Code', monospace" : "'Inter', sans-serif",
                color: isEngineer ? '#FF006E' : '#8B7355'
              }}
            >
              {isEngineer ? '// Connect' : 'Get in Touch'}
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:asa746090@gmail.com"
                  className="text-xs transition-colors"
                  style={{
                    fontFamily: isEngineer ? "'Fira Code', monospace" : "'Inter', sans-serif",
                    color: isEngineer ? 'rgba(0, 255, 0, 0.5)' : 'rgba(45, 45, 45, 0.5)'
                  }}
                >
                  {isEngineer ? 'email: asa746090@gmail.com' : 'asa746090@gmail.com'}
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/237670713584"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs transition-colors"
                  style={{
                    fontFamily: isEngineer ? "'Fira Code', monospace" : "'Inter', sans-serif",
                    color: isEngineer ? 'rgba(0, 255, 0, 0.5)' : 'rgba(45, 45, 45, 0.5)'
                  }}
                >
                  {isEngineer ? 'whatsapp: +237 670 713 584' : '+237 670 713 584'}
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Asan84-oss"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs transition-colors"
                  style={{
                    fontFamily: isEngineer ? "'Fira Code', monospace" : "'Inter', sans-serif",
                    color: isEngineer ? 'rgba(0, 255, 0, 0.5)' : 'rgba(45, 45, 45, 0.5)'
                  }}
                >
                  {isEngineer ? 'github: @Asan84-oss' : 'GitHub'}
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/asa-bless-a48070415"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs transition-colors"
                  style={{
                    fontFamily: isEngineer ? "'Fira Code', monospace" : "'Inter', sans-serif",
                    color: isEngineer ? 'rgba(0, 255, 0, 0.5)' : 'rgba(45, 45, 45, 0.5)'
                  }}
                >
                  {isEngineer ? 'linkedin: /in/asa-bless' : 'LinkedIn'}
                </a>
              </li>
              <li>
                <span
                  className="text-xs"
                  style={{
                    fontFamily: isEngineer ? "'Fira Code', monospace" : "'Inter', sans-serif",
                    color: isEngineer ? 'rgba(0, 255, 0, 0.5)' : 'rgba(45, 45, 45, 0.5)'
                  }}
                >
                  {isEngineer ? 'tiktok: @lordsprayer11-@graceatwork07-@glorious.god472' : 'TikTok: @lordsprayer11-@graceatwork07-@glorious.god472'}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: isEngineer ? '1px solid rgba(0, 255, 0, 0.08)' : '1px solid rgba(45, 45, 45, 0.06)' }}
        >
          <p
            className="text-xs"
            style={{
              fontFamily: isEngineer ? "'Fira Code', monospace" : "'Inter', sans-serif",
              color: isEngineer ? 'rgba(0, 255, 0, 0.3)' : 'rgba(45, 45, 45, 0.3)'
            }}
          >
            {isEngineer
              ? `// © ${new Date().getFullYear()} Asa Samuel Bless. All rights reserved. Built from Douala.`
              : `© ${new Date().getFullYear()} Asa Samuel Bless. Crafted with intention in Douala, Cameroon.`}
          </p>

          {/* Hidden Admin Portal */}
          <motion.a
            href="/admin/auth"
            className="text-xs transition-opacity hover:opacity-100"
            style={{
              fontFamily: "'Fira Code', monospace",
              color: isEngineer ? 'rgba(0, 255, 0, 0.15)' : 'rgba(45, 45, 45, 0.15)',
              opacity: 0.5
            }}
            whileHover={{ opacity: 1 }}
          >
            {isEngineer ? '// admin.sys' : '🔒'}
          </motion.a>
        </div>
      </div>
    </footer>
  );
}
