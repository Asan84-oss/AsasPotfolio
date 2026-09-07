import { motion } from 'framer-motion';

interface AboutProps {
  persona: 'engineer' | 'creator';
}

export default function About({ persona }: AboutProps) {
  const isEngineer = persona === 'engineer';

  const engineerSkills = [
    'Node.js', 'PHP', 'React', 'Python', 'DeepSeek', 'Qwen', 'Gemini',
    'PostgreSQL', 'Docker', 'AWS', 'TypeScript', 'Next.js', 'Prisma'
  ];

  const creatorSkills = [
    'CapCut', 'Adobe Premiere', 'TikTok Algorithm', 'Content Strategy',
    'Video Editing', 'Trend Analysis', 'Brand Storytelling', 'Analytics'
  ];

  return (
    <section
      id="about"
      className="relative min-h-screen py-32 px-6"
      style={{ zIndex: 1 }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span
            className="block text-xs tracking-[0.3em] uppercase mb-4"
            style={{
              fontFamily: isEngineer ? "'Fira Code', monospace" : "'Inter', sans-serif",
              color: isEngineer ? '#FF006E' : '#8B7355'
            }}
          >
            {isEngineer ? '// About.sys' : 'About'}
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{
              fontFamily: isEngineer ? "'Fira Code', monospace" : "'Playfair Display', serif",
              color: isEngineer ? '#00FF00' : '#2D2D2D',
              textShadow: isEngineer ? '0 0 20px rgba(0, 255, 0, 0.2)' : 'none'
            }}
          >
            {isEngineer ? 'whoami --verbose' : 'The Story'}
          </h2>
        </motion.div>

        {isEngineer ? (
          /* ── ENGINEER: Dashboard Layout ── */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <motion.div
              className="lg:col-span-1 p-8 rounded-xl"
              style={{
                background: 'rgba(10, 10, 15, 0.8)',
                border: '1px solid rgba(0, 255, 0, 0.15)',
                backdropFilter: 'blur(10px)'
              }}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6">
                <div
                  className="w-20 h-20 rounded-lg mb-4 flex items-center justify-center text-3xl"
                  style={{
                    background: 'rgba(0, 255, 0, 0.1)',
                    border: '1px solid rgba(0, 255, 0, 0.3)'
                  }}
                >
                  👨‍💻
                </div>
                <h3 className="text-lg font-bold" style={{ color: '#00FF00', fontFamily: "'Fira Code', monospace" }}>
                  Asa Samuel Bless
                </h3>
                <p className="text-xs mt-1" style={{ color: 'rgba(0, 255, 0, 0.5)', fontFamily: "'Fira Code', monospace" }}>
                  Software Engineer
                </p>
                <p className="text-xs" style={{ color: 'rgba(0, 255, 0, 0.3)', fontFamily: "'Fira Code', monospace" }}>
                  Douala, Cameroon 🇨🇲
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span style={{ color: '#FF006E' }}>→</span>
                  <span className="text-xs" style={{ color: 'rgba(0, 255, 0, 0.6)', fontFamily: "'Fira Code', monospace" }}>
                    asa746090@gmail.com
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ color: '#FF006E' }}>→</span>
                  <span className="text-xs" style={{ color: 'rgba(0, 255, 0, 0.6)', fontFamily: "'Fira Code', monospace" }}>
                    +237 670 713 584
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ color: '#FF006E' }}>→</span>
                  <span className="text-xs" style={{ color: 'rgba(0, 255, 0, 0.6)', fontFamily: "'Fira Code', monospace" }}>
                    github.com/Asan84-oss
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Tech Stack & Bio */}
            <motion.div
              className="lg:col-span-2 space-y-8"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Bio */}
              <div
                className="p-6 rounded-xl"
                style={{
                  background: 'rgba(10, 10, 15, 0.6)',
                  border: '1px solid rgba(0, 255, 0, 0.1)'
                }}
              >
                <h4 className="text-xs font-bold mb-4" style={{ color: '#FF006E', fontFamily: "'Fira Code', monospace" }}>
                  // BIOGRAPHY
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(0, 255, 0, 0.6)', fontFamily: "'Fira Code', monospace", fontSize: '12px' }}>
                  Bilingual Software Engineer based in Douala, Cameroon. Specializing in full-stack web applications, autonomous AI coding agents, and robust transactional architectures. I build systems that eliminate bottlenecks and scale seamlessly — from UBA Bank's complaint tracking infrastructure to voice-cloned AI assistants streaming over WhatsApp.
                </p>
              </div>

              {/* Tech Stack */}
              <div
                className="p-6 rounded-xl"
                style={{
                  background: 'rgba(10, 10, 15, 0.6)',
                  border: '1px solid rgba(0, 255, 0, 0.1)'
                }}
              >
                <h4 className="text-xs font-bold mb-4" style={{ color: '#FF006E', fontFamily: "'Fira Code', monospace" }}>
                  // TECH_STACK
                </h4>
                <div className="flex flex-wrap gap-2">
                  {engineerSkills.map((skill, i) => (
                    <motion.span
                      key={skill}
                      className="px-3 py-1.5 rounded text-xs"
                      style={{
                        background: 'rgba(0, 255, 0, 0.05)',
                        border: '1px solid rgba(0, 255, 0, 0.2)',
                        color: '#00FF00',
                        fontFamily: "'Fira Code', monospace"
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{
                        background: 'rgba(0, 255, 0, 0.15)',
                        boxShadow: '0 0 15px rgba(0, 255, 0, 0.2)'
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Working Rules */}
              <div
                className="p-6 rounded-xl"
                style={{
                  background: 'rgba(10, 10, 15, 0.6)',
                  border: '1px solid rgba(0, 255, 0, 0.1)'
                }}
              >
                <h4 className="text-xs font-bold mb-4" style={{ color: '#FF006E', fontFamily: "'Fira Code', monospace" }}>
                  // WORKING_RULES
                </h4>
                <ul className="space-y-2">
                  {[
                    'Clean, documented, maintainable code',
                    'Test-driven development where applicable',
                    'Performance-first architecture decisions',
                    'Continuous learning and adaptation',
                    'Open communication and transparent timelines'
                  ].map((rule, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span style={{ color: '#00FF00' }} className="text-xs mt-0.5">[{i + 1}]</span>
                      <span className="text-xs" style={{ color: 'rgba(0, 255, 0, 0.5)', fontFamily: "'Fira Code', monospace" }}>
                        {rule}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        ) : (
          /* ── CREATOR: Editorial Layout ── */
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="space-y-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Bio */}
              <div>
                <p
                  className="text-lg md:text-xl leading-relaxed"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: '#2D2D2D',
                    lineHeight: '1.8'
                  }}
                >
                  I'm Asa Samuel Bless, a bilingual digital marketer and content creator based in Douala, Cameroon. My work lives at the intersection of algorithmic strategy and authentic storytelling — turning brand messages into viral short-form video assets that resonate with millions.
                </p>
              </div>

              {/* Multi-column expertise */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="text-xs tracking-[0.2em] uppercase" style={{ color: '#8B7355' }}>01</span>
                  <h3
                    className="text-xl font-bold mt-2 mb-4"
                    style={{ fontFamily: "'Playfair Display', serif", color: '#2D2D2D' }}
                  >
                    Media Production
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(45, 45, 45, 0.6)', fontFamily: "'Inter', sans-serif" }}>
                    Advanced video editing with CapCut and professional suites. Clean visual storytelling that captures attention in the first frame and holds it through the final second.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <span className="text-xs tracking-[0.2em] uppercase" style={{ color: '#8B7355' }}>02</span>
                  <h3
                    className="text-xl font-bold mt-2 mb-4"
                    style={{ fontFamily: "'Playfair Display', serif", color: '#2D2D2D' }}
                  >
                    Content Strategy
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(45, 45, 45, 0.6)', fontFamily: "'Inter', sans-serif" }}>
                    Deep understanding of TikTok's algorithm, trend-jacking frameworks, and organic growth mechanics. Proven ability to scale communities from zero to 50K+ followers.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  <span className="text-xs tracking-[0.2em] uppercase" style={{ color: '#8B7355' }}>03</span>
                  <h3
                    className="text-xl font-bold mt-2 mb-4"
                    style={{ fontFamily: "'Playfair Display', serif", color: '#2D2D2D' }}
                  >
                    Creative Execution
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(45, 45, 45, 0.6)', fontFamily: "'Inter', sans-serif" }}>
                    Translating brand visions into scroll-stopping content. Every frame intentional, every transition purposeful, every hook engineered for maximum retention.
                  </p>
                </motion.div>
              </div>

              {/* Skills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex flex-wrap gap-3">
                  {creatorSkills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 rounded-full text-xs tracking-wider"
                      style={{
                        background: 'rgba(45, 45, 45, 0.04)',
                        border: '1px solid rgba(45, 45, 45, 0.08)',
                        color: 'rgba(45, 45, 45, 0.6)',
                        fontFamily: "'Inter', sans-serif"
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Contact */}
              <motion.div
                className="pt-8"
                style={{ borderTop: '1px solid rgba(45, 45, 45, 0.08)' }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1 }}
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs" style={{ color: 'rgba(45, 45, 45, 0.5)' }}>
                  <div>
                    <span className="block text-[10px] tracking-wider uppercase mb-1" style={{ color: '#8B7355' }}>Email</span>
                    asa746090@gmail.com
                  </div>
                  <div>
                    <span className="block text-[10px] tracking-wider uppercase mb-1" style={{ color: '#8B7355' }}>WhatsApp</span>
                    +237 670 713 584
                  </div>
                  <div>
                    <span className="block text-[10px] tracking-wider uppercase mb-1" style={{ color: '#8B7355' }}>TikTok</span>
                    @lordsprayer11
                  </div>
                  <div>
                    <span className="block text-[10px] tracking-wider uppercase mb-1" style={{ color: '#8B7355' }}>Location</span>
                    Douala, Cameroon
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
