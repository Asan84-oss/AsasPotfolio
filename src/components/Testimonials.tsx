import { motion } from 'framer-motion';
import { getTestimonials, type Testimonial } from '../data/mockData';

interface TestimonialsProps {
  persona: 'engineer' | 'creator';
}

export default function Testimonials({ persona }: TestimonialsProps) {
  const isEngineer = persona === 'engineer';
  const filteredTestimonials = getTestimonials().filter(t =>
    isEngineer ? t.persona === 'software_engineer' : t.persona === 'content_creator'
  );

  return (
    <section
      id="testimonials"
      className="relative min-h-screen py-32 px-6"
      style={{ zIndex: 1 }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
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
            {isEngineer ? '// Client Reviews' : 'Kind Words'}
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{
              fontFamily: isEngineer ? "'Fira Code', monospace" : "'Playfair Display', serif",
              color: isEngineer ? '#00FF00' : '#2D2D2D',
              textShadow: isEngineer ? '0 0 20px rgba(0, 255, 0, 0.2)' : 'none'
            }}
          >
            {isEngineer ? 'testimonials.log()' : 'What People Say'}
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredTestimonials.map((testimonial: Testimonial, index: number) => (
            <motion.div
              key={testimonial.id}
              className="relative p-8 rounded-xl"
              style={{
                background: isEngineer
                  ? 'rgba(10, 10, 15, 0.6)'
                  : 'rgba(255, 255, 255, 0.6)',
                border: isEngineer
                  ? '1px solid rgba(0, 255, 0, 0.12)'
                  : '1px solid rgba(45, 45, 45, 0.06)',
                backdropFilter: 'blur(15px)',
                boxShadow: isEngineer
                  ? '0 0 30px rgba(0, 255, 0, 0.03)'
                  : '0 10px 40px rgba(0,0,0,0.04)'
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{
                y: -5,
                boxShadow: isEngineer
                  ? '0 0 50px rgba(0, 255, 0, 0.08)'
                  : '0 20px 60px rgba(0,0,0,0.08)'
              }}
            >
              {/* Quote mark */}
              <span
                className="absolute top-4 left-6 text-5xl opacity-20"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: isEngineer ? '#00FF00' : '#2D2D2D'
                }}
              >
                "
              </span>

              {/* Review text */}
              <p
                className="leading-relaxed mb-8 mt-6"
                style={{
                  fontFamily: isEngineer ? "'Fira Code', monospace" : "'Playfair Display', serif",
                  color: isEngineer ? 'rgba(0, 255, 0, 0.6)' : 'rgba(45, 45, 45, 0.7)',
                  fontSize: isEngineer ? '12px' : '16px',
                  fontStyle: isEngineer ? 'normal' : 'italic',
                  lineHeight: isEngineer ? '1.8' : '1.8',
                  padding: isEngineer ? '12px' : '0',
                  background: isEngineer ? 'rgba(0, 255, 0, 0.02)' : 'transparent',
                  borderRadius: isEngineer ? '6px' : '0'
                }}
              >
                {testimonial.reviewText}
              </p>

              {/* Client info */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.clientImageUrl}
                  alt={testimonial.clientName}
                  className="w-12 h-12 rounded-full object-cover"
                  style={{
                    border: isEngineer
                      ? '2px solid rgba(0, 255, 0, 0.3)'
                      : '2px solid rgba(45, 45, 45, 0.1)'
                  }}
                />
                <div>
                  <p
                    className="text-sm font-bold"
                    style={{
                      fontFamily: isEngineer ? "'Fira Code', monospace" : "'Inter', sans-serif",
                      color: isEngineer ? '#00FF00' : '#2D2D2D'
                    }}
                  >
                    {testimonial.clientName}
                  </p>
                  <p
                    className="text-xs"
                    style={{
                      fontFamily: isEngineer ? "'Fira Code', monospace" : "'Inter', sans-serif",
                      color: isEngineer ? 'rgba(255, 0, 110, 0.7)' : 'rgba(45, 45, 45, 0.5)'
                    }}
                  >
                    {testimonial.company}
                  </p>
                </div>
              </div>

              {/* Corner decoration for engineer */}
              {isEngineer && (
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                  <div
                    className="absolute top-2 right-2 w-2 h-2 rounded-full"
                    style={{ background: '#00FF00', boxShadow: '0 0 6px rgba(0, 255, 0, 0.5)' }}
                  />
                  <div
                    className="absolute top-2 right-6 w-2 h-2 rounded-full"
                    style={{ background: '#FF006E', boxShadow: '0 0 6px rgba(255, 0, 110, 0.5)' }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div
            className="inline-block p-10 rounded-2xl"
            style={{
              background: isEngineer
                ? 'rgba(0, 255, 0, 0.03)'
                : 'rgba(45, 45, 45, 0.02)',
              border: isEngineer
                ? '1px solid rgba(0, 255, 0, 0.1)'
                : '1px solid rgba(45, 45, 45, 0.06)'
            }}
          >
            <h3
              className="text-2xl md:text-3xl font-bold mb-4"
              style={{
                fontFamily: isEngineer ? "'Fira Code', monospace" : "'Playfair Display', serif",
                color: isEngineer ? '#00FF00' : '#2D2D2D'
              }}
            >
              {isEngineer ? 'Ready to build something?' : "Let's create together"}
            </h3>
            <p
              className="text-sm mb-6"
              style={{
                fontFamily: isEngineer ? "'Fira Code', monospace" : "'Inter', sans-serif",
                color: isEngineer ? 'rgba(0, 255, 0, 0.5)' : 'rgba(45, 45, 45, 0.5)'
              }}
            >
              {isEngineer
                ? '// Open for freelance & full-time opportunities'
                : 'Open for collaborations, partnerships, and creative projects'}
            </p>
            <motion.a
              href="mailto:asa.samuel@example.com"
              className="inline-block px-8 py-4 rounded-lg text-sm font-bold tracking-wider uppercase"
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
              {isEngineer ? '$ contact --email' : 'Get in Touch'}
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
