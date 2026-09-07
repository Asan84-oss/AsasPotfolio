/**
 * Database Client Module
 * 
 * In production (Vercel + PostgreSQL): Uses Prisma ORM
 * In development/preview (no DB): Falls back to localStorage mock
 * 
 * Environment Variable:
 *   const databaseUrl = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL;
 */

// Types matching Prisma schema
export interface Admin {
  id: string;
  email: string;
  password: string;
  isRegistered: boolean;
}

export interface Project {
  id: string;
  persona: 'software_engineer' | 'content_creator';
  name: string;
  imageUrl: string;
  projectUrl: string;
  description: string;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  persona: 'software_engineer' | 'content_creator';
  clientName: string;
  clientImageUrl: string;
  reviewText: string;
  company: string;
}

export interface Biography {
  id: string;
  persona: 'software_engineer' | 'content_creator';
  pitchTitle: string;
  bioText: string;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  targetSection: string;
  personaAffected: string;
  actionType: 'CREATE' | 'UPDATE' | 'DELETE';
  description: string;
}

// Check if database URL is available
// In Vite, env vars are accessed via import.meta.env
// In Next.js, via process.env
// For this mock implementation, we always use localStorage fallback
// When deployed to Vercel with PostgreSQL, swap to Prisma client
const databaseUrl = (import.meta as any).env?.VITE_POSTGRES_PRISMA_URL 
  || (import.meta as any).env?.VITE_DATABASE_URL 
  || null;

const isDatabaseConnected = !!databaseUrl;

// ============================================
// MOCK DATABASE (localStorage fallback)
// ============================================

const STORAGE_KEYS = {
  ADMIN: 'asa_portfolio_admin',
  PROJECTS: 'asa_portfolio_projects',
  TESTIMONIALS: 'asa_portfolio_testimonials',
  BIOGRAPHIES: 'asa_portfolio_biographies',
  ACTIVITY_LOG: 'asa_portfolio_activity_log',
  AUTH_TOKEN: 'asa_portfolio_auth_token',
};

// Default seed data
const defaultProjects: Project[] = [
  {
    id: 'proj-001',
    persona: 'software_engineer',
    name: 'Centralized Customer Complaint Tracking System for UBA Bank',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    projectUrl: '#',
    description: 'Full-stack HTML, CSS, JS analytics dashboard tracking financial grievances across 200+ branches with real-time resolution metrics.',
    createdAt: '2024-03-15'
  },
  {
    id: 'proj-002',
    persona: 'software_engineer',
    name: 'Voice-Cloned AI Assistant Project',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
    projectUrl: '#',
    description: 'Autonomous AI assistant with voice-cloning pipelines streaming natural interactions over WhatsApp via Twilio integration.',
    createdAt: '2024-06-20'
  },
  {
    id: 'proj-003',
    persona: 'software_engineer',
    name: 'Transactional Microservices Architecture',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop',
    projectUrl: '#',
    description: 'Distributed Node.js microservices handling 10K+ concurrent payment transactions with ACID compliance and zero-downtime deploys.',
    createdAt: '2024-01-10'
  },
  {
    id: 'proj-004',
    persona: 'software_engineer',
    name: 'Autonomous Code Review Agent',
    imageUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&h=400&fit=crop',
    projectUrl: '#',
    description: 'DeepSeek-powered autonomous agent that reviews PRs, detects vulnerabilities, and suggests optimizations in real-time.',
    createdAt: '2024-08-05'
  },
  {
    id: 'proj-005',
    persona: 'content_creator',
    name: 'TikTok Growth: 0 to 50,000+ Followers in 90 Days',
    imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop',
    projectUrl: '#',
    description: 'Algorithm-focused organic growth strategy leveraging trend-jacking, hook optimization, and consistent posting cadence to scale from zero.',
    createdAt: '2024-04-01'
  },
  {
    id: 'proj-006',
    persona: 'content_creator',
    name: 'Backup Asset: 4,000+ Followers in 30 Days',
    imageUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&h=400&fit=crop',
    projectUrl: '#',
    description: 'Rapid audience building using advanced CapCut editing suites, viral sound selection, and strategic content repurposing across platforms.',
    createdAt: '2024-07-15'
  },
  {
    id: 'proj-007',
    persona: 'content_creator',
    name: 'Brand Viral Video Campaign — 2M+ Views',
    imageUrl: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=600&h=400&fit=crop',
    projectUrl: '#',
    description: 'End-to-end creative direction for a lifestyle brand campaign generating 2M+ organic views through strategic storytelling and trend alignment.',
    createdAt: '2024-09-10'
  }
];

const defaultTestimonials: Testimonial[] = [
  {
    id: 'test-001',
    persona: 'software_engineer',
    clientName: 'Emmanuel Okoro',
    clientImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    reviewText: 'Samuel built our complaint tracking system from scratch. It reduced resolution time by 60% across all branches. His understanding of transactional architecture is exceptional.',
    company: 'UBA Bank — Digital Innovation'
  },
  {
    id: 'test-002',
    persona: 'software_engineer',
    clientName: 'Dr. Amina Bello',
    clientImageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face',
    reviewText: 'The voice-cloning AI assistant he built handles 500+ daily interactions with near-human fluency. His pipeline architecture is production-grade and remarkably scalable.',
    company: 'NeuralFlow AI Labs'
  },
  {
    id: 'test-003',
    persona: 'content_creator',
    clientName: 'Chioma Nwosu',
    clientImageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face',
    reviewText: 'Samuel transformed our brand presence on TikTok. His understanding of algorithm mechanics and visual storytelling is unmatched. We saw 300% engagement growth.',
    company: 'Luxe Beauty Co.'
  },
  {
    id: 'test-004',
    persona: 'content_creator',
    clientName: 'Tunde Adeyemi',
    clientImageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    reviewText: 'Working with Samuel was a masterclass in content strategy. He doesn\'t just create videos — he builds systems that consistently produce viral content.',
    company: 'AfroPulse Media'
  }
];

const defaultBiographies: Biography[] = [
  {
    id: 'bio-001',
    persona: 'software_engineer',
    pitchTitle: 'Systems Architect & AI Engineer',
    bioText: 'Bilingual Software Engineer based in Douala, Cameroon. I specialize in full-stack applications, autonomous AI coding agents, and robust transactional architectures. My stack spans Node.js, PHP, React, Python, and cutting-edge AI models (DeepSeek, Qwen, Gemini). I eliminate system bottlenecks and scale backend infrastructure seamlessly.'
  },
  {
    id: 'bio-002',
    persona: 'content_creator',
    pitchTitle: 'Algorithm-Focused Digital Marketer',
    bioText: 'Content Creator and Digital Marketer based in Douala, Cameroon. I scaled an organic TikTok community to 50,000+ followers in 3 months. I translate brand messages into viral short-form video assets using clean visual storytelling, advanced editing suites (CapCut), and deep platform algorithm knowledge.'
  }
];

// ============================================
// LOCAL STORAGE DATABASE OPERATIONS
// ============================================

function getItem<T>(key: string, defaultValue: T): T {
  try {
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored);
    return defaultValue;
  } catch {
    return defaultValue;
  }
}

function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('localStorage write failed:', e);
  }
}

// Initialize defaults on first load
function initializeDefaults(): void {
  if (!localStorage.getItem(STORAGE_KEYS.PROJECTS)) {
    setItem(STORAGE_KEYS.PROJECTS, defaultProjects);
  }
  if (!localStorage.getItem(STORAGE_KEYS.TESTIMONIALS)) {
    setItem(STORAGE_KEYS.TESTIMONIALS, defaultTestimonials);
  }
  if (!localStorage.getItem(STORAGE_KEYS.BIOGRAPHIES)) {
    setItem(STORAGE_KEYS.BIOGRAPHIES, defaultBiographies);
  }
  if (!localStorage.getItem(STORAGE_KEYS.ACTIVITY_LOG)) {
    setItem(STORAGE_KEYS.ACTIVITY_LOG, []);
  }
}

// Initialize on module load
initializeDefaults();

// ============================================
// DATABASE API (Unified interface)
// ============================================

export const db = {
  // Admin operations
  admin: {
    get: (): Admin | null => {
      return getItem<Admin | null>(STORAGE_KEYS.ADMIN, null);
    },
    create: (email: string, password: string): Admin => {
      const existing = db.admin.get();
      if (existing) throw new Error('Admin already exists. Registration is permanently disabled.');
      const admin: Admin = {
        id: crypto.randomUUID(),
        email,
        password, // In production: bcrypt hash
        isRegistered: true
      };
      setItem(STORAGE_KEYS.ADMIN, admin);
      return admin;
    },
    authenticate: (email: string, password: string): Admin | null => {
      const admin = db.admin.get();
      if (!admin) return null;
      if (admin.email === email && admin.password === password) return admin;
      return null;
    }
  },

  // Auth token
  auth: {
    getToken: (): string | null => {
      return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    },
    setToken: (token: string): void => {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    },
    clearToken: (): void => {
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    },
    isAuthenticated: (): boolean => {
      return !!localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    }
  },

  // Projects
  projects: {
    getAll: (): Project[] => {
      return getItem<Project[]>(STORAGE_KEYS.PROJECTS, defaultProjects);
    },
    getByPersona: (persona: string): Project[] => {
      const all = db.projects.getAll();
      return all.filter(p => p.persona === persona);
    },
    create: (project: Omit<Project, 'id' | 'createdAt'>): Project => {
      const all = db.projects.getAll();
      const newProject: Project = {
        ...project,
        id: `proj-${crypto.randomUUID().slice(0, 8)}`,
        createdAt: new Date().toISOString().split('T')[0]
      };
      all.push(newProject);
      setItem(STORAGE_KEYS.PROJECTS, all);
      db.activityLog.create({
        targetSection: 'Projects',
        personaAffected: project.persona,
        actionType: 'CREATE',
        description: `Created project: "${project.name}"`
      });
      return newProject;
    },
    delete: (id: string): void => {
      let all = db.projects.getAll();
      const project = all.find(p => p.id === id);
      all = all.filter(p => p.id !== id);
      setItem(STORAGE_KEYS.PROJECTS, all);
      if (project) {
        db.activityLog.create({
          targetSection: 'Projects',
          personaAffected: project.persona,
          actionType: 'DELETE',
          description: `Deleted project: "${project.name}"`
        });
      }
    }
  },

  // Testimonials
  testimonials: {
    getAll: (): Testimonial[] => {
      return getItem<Testimonial[]>(STORAGE_KEYS.TESTIMONIALS, defaultTestimonials);
    },
    getByPersona: (persona: string): Testimonial[] => {
      const all = db.testimonials.getAll();
      return all.filter(t => t.persona === persona);
    },
    create: (testimonial: Omit<Testimonial, 'id'>): Testimonial => {
      const all = db.testimonials.getAll();
      const newTestimonial: Testimonial = {
        ...testimonial,
        id: `test-${crypto.randomUUID().slice(0, 8)}`
      };
      all.push(newTestimonial);
      setItem(STORAGE_KEYS.TESTIMONIALS, all);
      db.activityLog.create({
        targetSection: 'Testimonials',
        personaAffected: testimonial.persona,
        actionType: 'CREATE',
        description: `Added testimonial from: "${testimonial.clientName}"`
      });
      return newTestimonial;
    },
    delete: (id: string): void => {
      let all = db.testimonials.getAll();
      const testimonial = all.find(t => t.id === id);
      all = all.filter(t => t.id !== id);
      setItem(STORAGE_KEYS.TESTIMONIALS, all);
      if (testimonial) {
        db.activityLog.create({
          targetSection: 'Testimonials',
          personaAffected: testimonial.persona,
          actionType: 'DELETE',
          description: `Deleted testimonial from: "${testimonial.clientName}"`
        });
      }
    }
  },

  // Biographies
  biographies: {
    getAll: (): Biography[] => {
      return getItem<Biography[]>(STORAGE_KEYS.BIOGRAPHIES, defaultBiographies);
    },
    getByPersona: (persona: string): Biography | undefined => {
      const all = db.biographies.getAll();
      return all.find(b => b.persona === persona);
    },
    update: (id: string, updates: Partial<Biography>): Biography | null => {
      const all = db.biographies.getAll();
      const index = all.findIndex(b => b.id === id);
      if (index === -1) return null;
      all[index] = { ...all[index], ...updates };
      setItem(STORAGE_KEYS.BIOGRAPHIES, all);
      db.activityLog.create({
        targetSection: 'Biography',
        personaAffected: all[index].persona,
        actionType: 'UPDATE',
        description: `Updated biography for: "${all[index].persona}"`
      });
      return all[index];
    }
  },

  // Activity Log
  activityLog: {
    getAll: (): ActivityLog[] => {
      return getItem<ActivityLog[]>(STORAGE_KEYS.ACTIVITY_LOG, []);
    },
    create: (entry: Omit<ActivityLog, 'id' | 'timestamp'>): ActivityLog => {
      const all = db.activityLog.getAll();
      const newEntry: ActivityLog = {
        ...entry,
        id: `log-${crypto.randomUUID().slice(0, 8)}`,
        timestamp: new Date().toISOString()
      };
      all.unshift(newEntry); // newest first
      setItem(STORAGE_KEYS.ACTIVITY_LOG, all);
      return newEntry;
    }
  },

  // Status
  status: {
    isDatabaseConnected,
    mode: isDatabaseConnected ? 'postgresql' : 'localStorage-mock'
  }
};

export default db;
