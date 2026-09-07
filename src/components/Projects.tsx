import { motion } from 'framer-motion';
import { projects } from '../data/mockData';

interface ProjectsProps {
  persona: 'engineer' | 'creator';
}

export default function Projects({ persona }: ProjectsProps) {
  const isEngineer = persona === 'engineer';
  const filteredProjects = projects.filter(p =>
    isEngineer ? p.persona === 'software_engineer' : p.persona === 'content_creator'
  );

  return (
    <section
      id="projects"
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
            {isEngineer ? '// Featured Work' : 'Selected Projects'}
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{
              fontFamily: isEngineer ? "'Fira Code', monospace" : "'Playfair Display', serif",
              color: isEngineer ? '#00FF00' : '#2D2D2D',
              textShadow: isEngineer ? '0 0 20px rgba(0, 255, 0, 0.2)' : 'none'
            }}
          >
            {isEngineer ? 'Projects.build()' : 'Creative Portfolio'}
          </h2>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.article
              key={project.id}
              className="group relative overflow-hidden rounded-xl"
              style={{
                background: isEngineer
                  ? 'rgba(10, 10, 15, 0.8)'
                  : 'rgba(255, 255, 255, 0.7)',
                border: isEngineer
                  ? '1px solid rgba(0, 255, 0, 0.15)'
                  : '1px solid rgba(45, 45, 45, 0.08)',
                backdropFilter: 'blur(10px)',
                boxShadow: isEngineer
                  ? '0 0 30px rgba(0, 255, 0, 0.05)'
                  : '0 10px 40px rgba(0,0,0,0.06)'
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              whileHover={{
                y: -8,
                boxShadow: isEngineer
                  ? '0 0 50px rgba(0, 255, 0, 0.15)'
                  : '0 20px 60px rgba(0,0,0,0.1)'
              }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: isEngineer
                      ? 'linear-gradient(180deg, transparent 0%, rgba(10, 10, 15, 0.9) 100%)'
                      : 'linear-gradient(180deg, transparent 0%, rgba(250, 248, 245, 0.9) 100%)'
                  }}
                />
                {/* Corner accent for engineer */}
                {isEngineer && (
                  <div className="absolute top-3 right-3">
                    <span
                      className="text-[10px] px-2 py-1 rounded"
                      style={{
                        fontFamily: "'Fira Code', monospace",
                        background: 'rgba(0, 255, 0, 0.1)',
                        border: '1px solid rgba(0, 255, 0, 0.3)',
                        color: '#00FF00'
                      }}
                    >
                      {project.createdAt}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3
                  className="text-lg font-bold mb-3"
                  style={{
                    fontFamily: isEngineer ? "'Fira Code', monospace" : "'Playfair Display', serif",
                    color: isEngineer ? '#00FF00' : '#2D2D2D'
                  }}
                >
                  {isEngineer ? `> ${project.name}` : project.name}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{
                    fontFamily: isEngineer ? "'Fira Code', monospace" : "'Inter', sans-serif",
                    color: isEngineer ? 'rgba(0, 255, 0, 0.5)' : 'rgba(45, 45, 45, 0.6)',
                    fontSize: isEngineer ? '12px' : '14px'
                  }}
                >
                  {project.description}
                </p>
                <motion.a
                  href={project.projectUrl}
                  className="inline-flex items-center gap-2 text-xs font-medium tracking-wider uppercase"
                  style={{
                    fontFamily: isEngineer ? "'Fira Code', monospace" : "'Inter', sans-serif",
                    color: isEngineer ? '#FF006E' : '#8B7355'
                  }}
                  whileHover={{ x: 5 }}
                >
                  {isEngineer ? 'view_source()' : 'View Project'}
                  <span>→</span>
                </motion.a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
