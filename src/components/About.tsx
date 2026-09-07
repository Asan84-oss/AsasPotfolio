import { motion } from 'framer-motion';
import { getBiographies } from '../data/mockData';

interface AboutProps {
  persona: 'engineer' | 'creator';
}

const engineerSkills = [
  { category: 'Backend', items: ['Node.js', 'PHP', 'Python', 'PostgreSQL'] },
  { category: 'Frontend', items: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'] },
  { category: 'AI/ML', items: ['DeepSeek', 'Qwen', 'Gemini', 'LangChain'] },
  { category: 'DevOps', items: ['Docker', 'Vercel', 'AWS', 'CI/CD'] },
];

const engineerRules = [
  'Write clean, documented, testable code',
  'Prioritize system reliability over speed',
  'Design for scale from day one',
  'Automate repetitive workflows',
  'Security-first architecture decisions',
];

const creatorExpertise = [
  {
    title: 'Media Production',
    description: 'Advanced proficiency in CapCut, DaVinci Resolve, and Adobe Creative Suite. Specializing in short-form video optimization for TikTok, Instagram Reels, and YouTube Shorts.'
  },
  {
    title: 'Content Strategy',
    description: 'Data-driven content calendars, algorithmic trend analysis, audience growth frameworks, and cross-platform repurposing systems that maximize organic reach.'
  },
  {
    title: 'Creative Execution',
    description: 'From concept to viral delivery — hook engineering, visual storytelling, brand voice translation, and community engagement protocols that build loyal audiences.'
  }
];

export default function About({ persona }: AboutProps) {
  const isEngineer = persona === 'engineer';
  const bios = getBiographies();
  const bio = bios.find(b => b.persona === (isEngineer ? 'software_engineer' : 'content_creator'));

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
            {isEngineer ? '// System Profile' : 'About'}
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{
              fontFamily: isEngineer ? "'Fira Code', monospace" : "'Playfair Display', serif",
              color: isEngineer ? '#00FF00' : '#2D2D2D',
              textShadow: isEngineer ? '0 0 20px rgba(0, 255, 0, 0.2)' : 'none'
            }}
          >
            {isEngineer ? 'about.config()' : 'The Story'}
          </h2>
        </motion.div>

        {isEngineer ? (
          /* ENGINEER MODE: Dashboard Layout */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Bio Panel */}
            <motion.div
              className="lg:col-span-2 p-6 rounded-xl"
              style={{
                background: 'rgba(10, 10, 15, 0.7)',
                border: '1px solid rgba(0, 255, 0, 0.12)',
                backdropFilter: 'blur(10px)'
              }}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-4 pb-3" style={{ borderBottom: '1px solid rgba(0, 255, 0, 0.1)' }}>
                <span className="w-2 h-2 rounded-full" style={{ background: '#00FF00', boxShadow: '0 0 6px rgba(0,255,0,0.5)' }} />
                <span
                  className="text-xs"
                  style={{ fontFamily: "'Fira Code', monospace", color: 'rgba(0, 255, 0, 0.5)' }}
                >
                  profile.json
                </span>
              </div>
              <h3
                className="text-lg font-bold mb-3"
                style={{ fontFamily: "'Fira Code', monospace", color: '#00FF00' }}
              >
                {bio?.pitchTitle || 'Engineering Systems That Scale'}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ fontFamily: "'Fira Code', monospace", color: 'rgba(0, 255, 0, 0.55)', fontSize: '12px' }}
              >
                {bio?.bioText || ''}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6 pt-4" style={{ borderTop: '1px solid rgba(0, 255, 0, 0.08)' }}>
                {[
                  { label: 'Years Exp', value: '3+' },
                  { label: 'Projects', value: '15+' },
                  { label: 'Uptime', value: '99.9%' }
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div
                      className="text-xl font-bold"
                      style={{ fontFamily: "'Fira Code', monospace", color: '#FF006E' }}
                    >
                      {stat.value}
                    </div>
                    <div
                      className="text-[10px] mt-1"
                      style={{ fontFamily: "'Fira Code', monospace", color: 'rgba(0, 255, 0, 0.4)' }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Working Rules Panel */}
            <motion.div
              className="p-6 rounded-xl"
              style={{
                background: 'rgba(10, 10, 15, 0.7)',
                border: '1px solid rgba(255, 0, 110, 0.12)',
                backdropFilter: 'blur(10px)'
              }}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3
                className="text-sm font-bold mb-4"
                style={{ fontFamily: "'Fira Code', monospace", color: '#FF006E' }}
              >
                {'// Working Rules'}
              </h3>
              <ul className="space-y-3">
                {engineerRules.map((rule, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span style={{ color: '#00FF00', fontFamily: "'Fira Code', monospace", fontSize: '10px' }}>
                      [{String(i + 1).padStart(2, '0')}]
                    </span>
                    <span
                      className="text-xs"
                      style={{ fontFamily: "'Fira Code', monospace", color: 'rgba(0, 255, 0, 0.5)' }}
                    >
                      {rule}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Tech Stack Panel */}
            <motion.div
              className="lg:col-span-3 p-6 rounded-xl"
              style={{
                background: 'rgba(10, 10, 15, 0.7)',
                border: '1px solid rgba(0, 255, 0, 0.12)',
                backdropFilter: 'blur(10px)'
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3
                className="text-sm font-bold mb-6"
                style={{ fontFamily: "'Fira Code', monospace", color: '#00FF00' }}
              >
                {'// Tech Stack'}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {engineerSkills.map((category) => (
                  <div key={category.category}>
                    <h4
                      className="text-xs font-bold mb-3"
                      style={{ fontFamily: "'Fira Code', monospace", color: '#FF006E' }}
                    >
                      {category.category}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {category.items.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 rounded text-[10px]"
                          style={{
                            fontFamily: "'Fira Code', monospace",
                            background: 'rgba(0, 255, 0, 0.05)',
                            border: '1px solid rgba(0, 255, 0, 0.15)',
                            color: 'rgba(0, 255, 0, 0.7)'
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        ) : (
          /* CREATOR MODE: Editorial Multi-Column Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Bio Narrative */}
            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3
                className="text-3xl font-bold mb-6"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: '#2D2D2D'
                }}
              >
                {bio?.pitchTitle || 'Stories That Move Millions'}
              </h3>
              <p
                className="text-base leading-loose"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: 'rgba(45, 45, 45, 0.7)',
                  lineHeight: '2'
                }}
              >
                {bio?.bioText || ''}
              </p>

              {/* Stats - elegant */}
              <div className="mt-10 grid grid-cols-3 gap-6">
                {[
                  { label: 'Followers Grown', value: '54K+' },
                  { label: 'Videos Produced', value: '200+' },
                  { label: 'Months Active', value: '12+' }
                ].map((stat) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <div
                      className="text-2xl font-bold"
                      style={{ fontFamily: "'Playfair Display', serif", color: '#2D2D2D' }}
                    >
                      {stat.value}
                    </div>
                    <div
                      className="text-xs mt-1 tracking-wider uppercase"
                      style={{ fontFamily: "'Inter', sans-serif", color: 'rgba(139, 115, 85, 0.7)' }}
                    >
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Expertise Columns */}
            <div className="lg:col-span-7 space-y-8">
              {creatorExpertise.map((item, i) => (
                <motion.div
                  key={item.title}
                  className="p-8 rounded-xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.5)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(45, 45, 45, 0.04)'
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className="text-3xl font-bold opacity-20"
                      style={{ fontFamily: "'Playfair Display', serif", color: '#2D2D2D' }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h4
                        className="text-xl font-bold mb-3"
                        style={{ fontFamily: "'Playfair Display', serif", color: '#2D2D2D' }}
                      >
                        {item.title}
                      </h4>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ fontFamily: "'Inter', sans-serif", color: 'rgba(45, 45, 45, 0.6)', lineHeight: '1.8' }}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
