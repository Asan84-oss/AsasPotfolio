import { motion } from 'framer-motion';
import { biography } from '../data/mockData';

interface AboutProps {
  persona: 'engineer' | 'creator';
}

export default function About({ persona }: AboutProps) {
  const isEngineer = persona === 'engineer';
  const bio = biography.find(b =>
    isEngineer ? b.persona === 'software_engineer' : b.persona === 'content_creator'
  );

  const skills = isEngineer
    ? ['React', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'Docker', 'AWS', 'Next.js', 'GraphQL', 'Tailwind CSS']
    : ['Content Strategy', 'Bilingual Writing', 'Podcast Production', 'Video Editing', 'Social Media', 'Brand Design', 'Storytelling', 'SEO', 'Analytics', 'Community Building'];

  return (
    <section
      id="about"
      className="relative min-h-screen py-32 px-6"
      style={{ zIndex: 1 }}
    >
      <div className="max-w-6xl mx-auto">
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
            {isEngineer ? '// About Me' : 'Biography'}
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{
              fontFamily: isEngineer ? "'Fira Code', monospace" : "'Playfair Display', serif",
              color: isEngineer ? '#00FF00' : '#2D2D2D',
              textShadow: isEngineer ? '0 0 20px rgba(0, 255, 0, 0.2)' : 'none'
            }}
          >
            {bio?.pitchTitle || ''}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Bio text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p
              className="text-lg leading-relaxed mb-8"
              style={{
                fontFamily: isEngineer ? "'Fira Code', monospace" : "'Inter', sans-serif",
                color: isEngineer ? 'rgba(0, 255, 0, 0.7)' : 'rgba(45, 45, 45, 0.7)',
                fontSize: isEngineer ? '14px' : '16px'
              }}
            >
              {bio?.bioText || ''}
            </p>

            {/* Location badge */}
            <div
              className="inline-flex items-center gap-3 px-5 py-3 rounded-lg"
              style={{
                background: isEngineer ? 'rgba(0, 255, 0, 0.05)' : 'rgba(45, 45, 45, 0.03)',
                border: isEngineer ? '1px solid rgba(0, 255, 0, 0.15)' : '1px solid rgba(45, 45, 45, 0.08)'
              }}
            >
              <span className="text-2xl">📍</span>
              <div>
                <p
                  className="text-sm font-medium"
                  style={{
                    fontFamily: isEngineer ? "'Fira Code', monospace" : "'Inter', sans-serif",
                    color: isEngineer ? '#00FF00' : '#2D2D2D'
                  }}
                >
                  Douala, Cameroon
                </p>
                <p
                  className="text-xs"
                  style={{
                    fontFamily: isEngineer ? "'Fira Code', monospace" : "'Inter', sans-serif",
                    color: isEngineer ? 'rgba(0, 255, 0, 0.5)' : 'rgba(45, 45, 45, 0.5)'
                  }}
                >
                  {isEngineer ? 'GMT+1 | Remote Worldwide' : 'Available for collaborations worldwide'}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Skills / Expertise */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3
              className="text-sm font-bold tracking-[0.2em] uppercase mb-6"
              style={{
                fontFamily: isEngineer ? "'Fira Code', monospace" : "'Inter', sans-serif",
                color: isEngineer ? '#FF006E' : '#8B7355'
              }}
            >
              {isEngineer ? 'tech_stack[]' : 'Areas of Expertise'}
            </h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, i) => (
                <motion.span
                  key={skill}
                  className="px-4 py-2 rounded-lg text-sm font-medium"
                  style={{
                    fontFamily: isEngineer ? "'Fira Code', monospace" : "'Inter', sans-serif",
                    fontSize: isEngineer ? '12px' : '13px',
                    background: isEngineer
                      ? 'rgba(0, 255, 0, 0.05)'
                      : 'rgba(45, 45, 45, 0.04)',
                    color: isEngineer ? 'rgba(0, 255, 0, 0.8)' : 'rgba(45, 45, 45, 0.7)',
                    border: isEngineer
                      ? '1px solid rgba(0, 255, 0, 0.15)'
                      : '1px solid rgba(45, 45, 45, 0.08)'
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                  whileHover={{
                    scale: 1.05,
                    background: isEngineer
                      ? 'rgba(0, 255, 0, 0.1)'
                      : 'rgba(45, 45, 45, 0.08)',
                    borderColor: isEngineer
                      ? 'rgba(0, 255, 0, 0.4)'
                      : 'rgba(45, 45, 45, 0.2)'
                  }}
                >
                  {isEngineer ? `${skill}` : skill}
                </motion.span>
              ))}
            </div>

            {/* Stats for engineer */}
            {isEngineer && (
              <div className="mt-10 grid grid-cols-3 gap-4">
                {[
                  { label: 'Years Exp.', value: '5+' },
                  { label: 'Projects', value: '40+' },
                  { label: 'Clients', value: '25+' }
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="text-center p-4 rounded-lg"
                    style={{
                      background: 'rgba(0, 255, 0, 0.03)',
                      border: '1px solid rgba(0, 255, 0, 0.1)'
                    }}
                  >
                    <div
                      className="text-2xl font-bold"
                      style={{ fontFamily: "'Fira Code', monospace", color: '#00FF00' }}
                    >
                      {stat.value}
                    </div>
                    <div
                      className="text-xs mt-1"
                      style={{ fontFamily: "'Fira Code', monospace", color: 'rgba(0, 255, 0, 0.4)' }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Stats for creator */}
            {!isEngineer && (
              <div className="mt-10 grid grid-cols-3 gap-4">
                {[
                  { label: 'Countries', value: '15+' },
                  { label: 'Episodes', value: '100+' },
                  { label: 'Followers', value: '50K+' }
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="text-center p-4 rounded-lg"
                    style={{
                      background: 'rgba(45, 45, 45, 0.02)',
                      border: '1px solid rgba(45, 45, 45, 0.06)'
                    }}
                  >
                    <div
                      className="text-2xl font-bold"
                      style={{ fontFamily: "'Playfair Display', serif", color: '#2D2D2D' }}
                    >
                      {stat.value}
                    </div>
                    <div
                      className="text-xs mt-1"
                      style={{ fontFamily: "'Inter', sans-serif", color: 'rgba(45, 45, 45, 0.5)' }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
