import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';

interface ProjectsProps {
  persona: 'engineer' | 'creator';
}

// Asa's actual project data
const engineerProjects = [
  {
    id: 'eng-1',
    name: 'Centralized Customer Complaint Tracking System for UBA Bank',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    projectUrl: '#',
    description: 'HTML, CSS, JavaScript analytics dashboard tracking financial grievances. Real-time complaint resolution metrics, automated escalation workflows, and comprehensive reporting for banking operations.',
    createdAt: '2024'
  },
  {
    id: 'eng-2',
    name: 'Voice-Cloned AI Assistant Project',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
    projectUrl: '#',
    description: 'Autonomous assistant with voice-cloning pipelines streaming interactions over WhatsApp. Deep learning models for natural language processing and real-time voice synthesis.',
    createdAt: '2024'
  },
  {
    id: 'eng-3',
    name: 'Transactional Microservices Architecture',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop',
    projectUrl: '#',
    description: 'Distributed system handling high-volume financial transactions with ACID compliance, event-driven architecture, and zero-downtime deployments.',
    createdAt: '2024'
  },
  {
    id: 'eng-4',
    name: 'Autonomous Code Review Agent',
    imageUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&h=400&fit=crop',
    projectUrl: '#',
    description: 'AI-powered code analysis tool that automatically reviews pull requests, identifies security vulnerabilities, and suggests optimizations using LLM integration.',
    createdAt: '2024'
  }
];

const creatorProjects = [
  {
    id: 'cre-1',
    name: 'TikTok Community Growth: 0 → 50,000+ Followers',
    imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop',
    projectUrl: 'https://tiktok.com/@lordsprayer11',
    description: 'Case study on scaling a primary TikTok community to 50,000+ followers organically in 3 months. Algorithm optimization, trend-jacking, and authentic engagement strategies.',
    createdAt: '2024'
  },
  {
    id: 'cre-2',
    name: 'Backup Asset: 4,000+ Active Followers in 30 Days',
    imageUrl: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=600&h=400&fit=crop',
    projectUrl: 'https://tiktok.com/@graceatwork07',
    description: 'Built a backup asset to 4,000+ active followers in 30 days using advanced editing suites (CapCut) and trend-jacking. Replicable growth framework for content creators.',
    createdAt: '2024'
  },
  {
    id: 'cre-3',
    name: 'Brand Viral Video Campaign',
    imageUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&h=400&fit=crop',
    projectUrl: 'https://tiktok.com/@glorious.god472',
    description: 'Produced viral short-form video assets for brand partnerships. Clean visual storytelling, strategic hook placement, and data-driven content optimization.',
    createdAt: '2024'
  }
];

export default function Projects({ persona }: ProjectsProps) {
  const isEngineer = persona === 'engineer';
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const filteredProjects = isEngineer ? engineerProjects : creatorProjects;
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
