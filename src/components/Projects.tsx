import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import db from '../lib/db';
import type { Project } from '../lib/db';

interface ProjectsProps {
  persona: 'engineer' | 'creator';
}

export default function Projects({ persona }: ProjectsProps) {
  const isEngineer = persona === 'engineer';
  const [showAll, setShowAll] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  // Load projects from database
  useEffect(() => {
    const personaKey = isEngineer ? 'software_engineer' : 'content_creator';
    setProjects(db.projects.getByPersona(personaKey));

    // Listen for storage changes (when admin makes updates)
    const handleStorageChange = () => {
      setProjects(db.projects.getByPersona(personaKey));
    };
    window.addEventListener('storage', handleStorageChange);

    // Also refresh on visibility change (when user returns to tab)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setProjects(db.projects.getByPersona(personaKey));
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isEngineer]);

  const filteredProjects = projects;
  const visibleProjects = showAll ? filteredProjects : filteredProjects.slice(0, 3);
  const hasMore = filteredProjects.length > 3;

  const handleToggleView = () => {
    if (showAll && sectionRef.current) {
      // Scroll to top of section when collapsing
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setShowAll(!showAll);
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
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
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          animate={{ height: 'auto' }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence>
            {visibleProjects.map((project, index) => (
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
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                whileHover={{
                  y: -8,
                  boxShadow: isEngineer
                    ? '0 0 50px rgba(0, 255, 0, 0.15)'
                    : '0 20px 60px rgba(0,0,0,0.1)'
                }}
                layout
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
          </AnimatePresence>
        </motion.div>

        {/* View More / Hide Button */}
        {hasMore && (
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              onClick={handleToggleView}
              className="px-8 py-4 rounded-lg text-sm font-bold tracking-wider uppercase"
              style={{
                fontFamily: isEngineer ? "'Fira Code', monospace" : "'Inter', sans-serif",
                background: isEngineer
                  ? 'rgba(0, 255, 0, 0.05)'
                  : 'rgba(45, 45, 45, 0.05)',
                color: isEngineer ? '#00FF00' : '#2D2D2D',
                border: isEngineer
                  ? '1px solid rgba(0, 255, 0, 0.3)'
                  : '1px solid rgba(45, 45, 45, 0.2)',
                boxShadow: isEngineer ? '0 0 20px rgba(0, 255, 0, 0.1)' : 'none'
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {isEngineer
                ? (showAll ? '> collapse()' : '> loadMore()')
                : (showAll ? 'Show Less' : 'View All Projects')}
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
