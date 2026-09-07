import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { getProjects, type Project } from '../data/mockData';

interface ProjectsProps {
  persona: 'engineer' | 'creator';
}

export default function Projects({ persona }: ProjectsProps) {
  const isEngineer = persona === 'engineer';
  const allProjects = getProjects().filter(p =>
    isEngineer ? p.persona === 'software_engineer' : p.persona === 'content_creator'
  );

  const [expanded, setExpanded] = useState(false);
  const displayedProjects = expanded ? allProjects : allProjects.slice(0, 3);
  const hasMore = allProjects.length > 3;

  const handleToggle = () => {
    if (expanded) {
      // Scroll to top of section
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    }
    setExpanded(!expanded);
  };

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

        {/* Projects Grid with AnimatePresence for smooth expand/collapse */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((project: Project, index: number) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isEngineer={isEngineer}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View More / Hide Button */}
        {hasMore && (
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={handleToggle}
              className="px-8 py-3 rounded-lg text-sm font-medium tracking-wider uppercase"
              style={{
                fontFamily: isEngineer ? "'Fira Code', monospace" : "'Inter', sans-serif",
                background: isEngineer
                  ? 'rgba(0, 255, 0, 0.05)'
                  : 'rgba(45, 45, 45, 0.03)',
                color: isEngineer ? '#00FF00' : '#2D2D2D',
                border: isEngineer
                  ? '1px solid rgba(0, 255, 0, 0.2)'
                  : '1px solid rgba(45, 45, 45, 0.1)',
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: isEngineer
                  ? '0 0 20px rgba(0, 255, 0, 0.15)'
                  : '0 4px 20px rgba(0,0,0,0.08)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              {isEngineer
                ? (expanded ? 'collapse()' : `expand(${allProjects.length - 3}_more)`)
                : (expanded ? 'Hide' : `View More (${allProjects.length - 3})`)
              }
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project, index, isEngineer }: { project: Project; index: number; isEngineer: boolean }) {
  return (
    <motion.article
      className="group relative overflow-hidden rounded-xl"
      style={{
        background: isEngineer
          ? 'rgba(10, 10, 15, 0.8)'
          : 'rgba(255, 255, 255, 0.7)',
        border: isEngineer
          ? '1px solid rgba(0, 255, 0, 0.15)'
          : '1px solid rgba(45, 45, 45, 0.05)',
        backdropFilter: 'blur(10px)',
        boxShadow: isEngineer
          ? '0 0 30px rgba(0, 255, 0, 0.05)'
          : '0 10px 40px rgba(0,0,0,0.04)'
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
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
      {/* Crosshair corners for engineer */}
      {isEngineer && (
        <>
          <div className="absolute top-0 left-0 w-4 h-4" style={{ borderTop: '1px solid #00FF00', borderLeft: '1px solid #00FF00' }} />
          <div className="absolute top-0 right-0 w-4 h-4" style={{ borderTop: '1px solid #00FF00', borderRight: '1px solid #00FF00' }} />
          <div className="absolute bottom-0 left-0 w-4 h-4" style={{ borderBottom: '1px solid #FF006E', borderLeft: '1px solid #FF006E' }} />
          <div className="absolute bottom-0 right-0 w-4 h-4" style={{ borderBottom: '1px solid #FF006E', borderRight: '1px solid #FF006E' }} />
        </>
      )}

      {/* Project Name - Above Image */}
      <div className="p-5 pb-3">
        <h3
          className="text-base font-bold leading-tight"
          style={{
            fontFamily: isEngineer ? "'Fira Code', monospace" : "'Playfair Display', serif",
            color: isEngineer ? '#00FF00' : '#2D2D2D',
            fontSize: isEngineer ? '13px' : '18px'
          }}
        >
          {isEngineer ? `> ${project.name}` : project.name}
        </h3>
        {isEngineer && (
          <span
            className="text-[10px] mt-1 inline-block"
            style={{
              fontFamily: "'Fira Code', monospace",
              color: 'rgba(255, 0, 110, 0.6)'
            }}
          >
            [{project.createdAt}]
          </span>
        )}
      </div>

      {/* Project Image - Center */}
      <div className="relative h-44 overflow-hidden mx-4 rounded-lg">
        <img
          src={project.imageUrl}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: isEngineer
              ? 'linear-gradient(180deg, transparent 40%, rgba(10, 10, 15, 0.8) 100%)'
              : 'linear-gradient(180deg, transparent 40%, rgba(250, 248, 245, 0.8) 100%)',
            opacity: 0.7
          }}
        />
        {/* Scan line effect for engineer */}
        {isEngineer && (
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.03) 2px, rgba(0,255,0,0.03) 4px)'
            }}
          />
        )}
      </div>

      {/* Description + Link - Below Image */}
      <div className="p-5 pt-4">
        <p
          className="text-sm leading-relaxed mb-4"
          style={{
            fontFamily: isEngineer ? "'Fira Code', monospace" : "'Inter', sans-serif",
            color: isEngineer ? 'rgba(0, 255, 0, 0.45)' : 'rgba(45, 45, 45, 0.6)',
            fontSize: isEngineer ? '11px' : '14px'
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
  );
}
