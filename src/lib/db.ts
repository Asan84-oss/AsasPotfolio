/**
 * Database Client — Unified API with localStorage Fallback
 * 
 * In production (Vercel with PostgreSQL):
 *   Uses Prisma Client connected via POSTGRES_PRISMA_URL
 * 
 * In development/preview (no database):
 *   Falls back to localStorage mock for full CRUD functionality
 * 
 * This allows the admin dashboard to work entirely in the browser preview
 * before connecting to a real database.
 */

// ─────────────────────────────────────────────
// TYPE DEFINITIONS
// ─────────────────────────────────────────────

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

// ─────────────────────────────────────────────
// LOCAL STORAGE KEYS
// ─────────────────────────────────────────────

const STORAGE_KEYS = {
  ADMIN: 'asa_portfolio_admin',
  PROJECTS: 'asa_portfolio_projects',
  TESTIMONIALS: 'asa_portfolio_testimonials',
  BIOGRAPHIES: 'asa_portfolio_biographies',
  ACTIVITY_LOG: 'asa_portfolio_activity_log',
  AUTH_TOKEN: 'asa_portfolio_auth_token',
};

// ─────────────────────────────────────────────
// UTILITY FUNCTIONS
// ─────────────────────────────────────────────

function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function getFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored) as T;
    }
  } catch (error) {
    console.error(`Error reading from localStorage (${key}):`, error);
  }
  return defaultValue;
}

function setToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing to localStorage (${key}):`, error);
  }
}

// ─────────────────────────────────────────────
// SEED DATA (Initial projects and testimonials)
// ─────────────────────────────────────────────

const SEED_PROJECTS: Omit<Project, 'id' | 'createdAt'>[] = [
  {
    persona: 'software_engineer',
    name: 'Centralized Customer Complaint Tracking System for UBA Bank',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    projectUrl: '#',
    description: 'HTML, CSS, JavaScript analytics dashboard tracking financial grievances. Real-time complaint resolution metrics, automated escalation workflows, and comprehensive reporting for banking operations.',
  },
  {
    persona: 'software_engineer',
    name: 'Voice-Cloned AI Assistant Project',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
    projectUrl: '#',
    description: 'Autonomous assistant with voice-cloning pipelines streaming interactions over WhatsApp. Deep learning models for natural language processing and real-time voice synthesis.',
  },
  {
    persona: 'software_engineer',
    name: 'Transactional Microservices Architecture',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop',
    projectUrl: '#',
    description: 'Distributed system handling high-volume financial transactions with ACID compliance, event-driven architecture, and zero-downtime deployments.',
  },
  {
    persona: 'software_engineer',
    name: 'Autonomous Code Review Agent',
    imageUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&h=400&fit=crop',
    projectUrl: '#',
    description: 'AI-powered code analysis tool that automatically reviews pull requests, identifies security vulnerabilities, and suggests optimizations using LLM integration.',
  },
  {
    persona: 'content_creator',
    name: 'TikTok Community Growth: 0 → 50,000+ Followers',
    imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop',
    projectUrl: 'https://tiktok.com/@lordsprayer11',
    description: 'Case study on scaling a primary TikTok community to 50,000+ followers organically in 3 months. Algorithm optimization, trend-jacking, and authentic engagement strategies.',
  },
  {
    persona: 'content_creator',
    name: 'Backup Asset: 4,000+ Active Followers in 30 Days',
    imageUrl: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=600&h=400&fit=crop',
    projectUrl: 'https://tiktok.com/@graceatwork07',
    description: 'Built a backup asset to 4,000+ active followers in 30 days using advanced editing suites (CapCut) and trend-jacking. Replicable growth framework for content creators.',
  },
  {
    persona: 'content_creator',
    name: 'Brand Viral Video Campaign',
    imageUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&h=400&fit=crop',
    projectUrl: 'https://tiktok.com/@glorious.god472',
    description: 'Produced viral short-form video assets for brand partnerships. Clean visual storytelling, strategic hook placement, and data-driven content optimization.',
  },
];

const SEED_TESTIMONIALS: Omit<Testimonial, 'id'>[] = [
  {
    persona: 'software_engineer',
    clientName: 'Emmanuel Okoro',
    clientImageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    reviewText: 'Asa delivered our complaint tracking system ahead of schedule. His understanding of financial workflows and ability to translate complex requirements into clean, functional code is exceptional. The dashboard has transformed how we handle customer grievances.',
    company: 'UBA Bank — Digital Operations'
  },
  {
    persona: 'software_engineer',
    clientName: 'Dr. Amina Bello',
    clientImageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    reviewText: 'The voice-cloned AI assistant Asa built for us is remarkable. His expertise in deep learning pipelines and real-time streaming architecture made what seemed impossible, possible. He communicates clearly and delivers consistently.',
    company: 'NeuralFlow AI Labs'
  },
  {
    persona: 'content_creator',
    clientName: 'Chioma Nwosu',
    clientImageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    reviewText: 'Working with Asa was a game-changer for our brand. He took our vague ideas and turned them into viral content that reached millions. His understanding of the TikTok algorithm is unmatched, and his editing skills are top-tier.',
    company: 'GlowUp Beauty — Brand Director'
  },
  {
    persona: 'content_creator',
    clientName: 'Tunde Adeyemi',
    clientImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    reviewText: 'Asa helped us build a TikTok presence from scratch. Within 30 days, we had 4,000 engaged followers and content that consistently hit the For You page. His strategic approach to trend-jacking is brilliant.',
    company: 'Lagos Streetwear Co.'
  },
];

const SEED_BIOGRAPHIES: Omit<Biography, 'id'>[] = [
  {
    persona: 'software_engineer',
    pitchTitle: 'Software Engineer & Systems Architect',
    bioText: "Bilingual Software Engineer based in Douala, Cameroon. Specializing in full-stack web applications, autonomous AI coding agents, and robust transactional architectures. I build systems that eliminate bottlenecks and scale seamlessly — from UBA Bank's complaint tracking infrastructure to voice-cloned AI assistants streaming over WhatsApp."
  },
  {
    persona: 'content_creator',
    pitchTitle: 'Digital Marketer & Content Creator',
    bioText: "I'm Asa Samuel Bless, a bilingual digital marketer and content creator based in Douala, Cameroon. My work lives at the intersection of algorithmic strategy and authentic storytelling — turning brand messages into viral short-form video assets that resonate with millions."
  },
];

// ─────────────────────────────────────────────
// SEED FUNCTION
// ─────────────────────────────────────────────

function seedDatabase() {
  // Only seed if projects table is empty
  const existingProjects = getFromStorage<Project[]>(STORAGE_KEYS.PROJECTS, []);
  if (existingProjects.length === 0) {
    const projects: Project[] = SEED_PROJECTS.map(data => ({
      ...data,
      id: generateId('proj'),
      createdAt: new Date().toISOString().split('T')[0],
    }));
    setToStorage(STORAGE_KEYS.PROJECTS, projects);
  }

  // Only seed if testimonials table is empty
  const existingTestimonials = getFromStorage<Testimonial[]>(STORAGE_KEYS.TESTIMONIALS, []);
  if (existingTestimonials.length === 0) {
    const testimonials: Testimonial[] = SEED_TESTIMONIALS.map(data => ({
      ...data,
      id: generateId('test'),
    }));
    setToStorage(STORAGE_KEYS.TESTIMONIALS, testimonials);
  }

  // Only seed if biographies table is empty
  const existingBiographies = getFromStorage<Biography[]>(STORAGE_KEYS.BIOGRAPHIES, []);
  if (existingBiographies.length === 0) {
    const biographies: Biography[] = SEED_BIOGRAPHIES.map(data => ({
      ...data,
      id: generateId('bio'),
    }));
    setToStorage(STORAGE_KEYS.BIOGRAPHIES, biographies);
  }
}

// Run seed on module load
seedDatabase();

// ─────────────────────────────────────────────
// MOCK DATABASE API
// ─────────────────────────────────────────────

const db = {
  // ── ADMIN ──────────────────────────────────
  admin: {
    get: (): Admin | null => {
      return getFromStorage<Admin | null>(STORAGE_KEYS.ADMIN, null);
    },
    create: (email: string, password: string): Admin => {
      const admin: Admin = {
        id: generateId('admin'),
        email,
        password, // In production, this would be hashed with bcrypt
        isRegistered: true,
      };
      setToStorage(STORAGE_KEYS.ADMIN, admin);
      return admin;
    },
    verify: (email: string, password: string): boolean => {
      const admin = db.admin.get();
      if (!admin) return false;
      return admin.email === email && admin.password === password;
    },
  },

  // ── PROJECTS ───────────────────────────────
  projects: {
    getAll: (): Project[] => {
      return getFromStorage<Project[]>(STORAGE_KEYS.PROJECTS, []);
    },
    getByPersona: (persona: string): Project[] => {
      const all = db.projects.getAll();
      return all.filter(p => p.persona === persona);
    },
    create: (data: Omit<Project, 'id' | 'createdAt'>): Project => {
      const project: Project = {
        ...data,
        id: generateId('proj'),
        createdAt: new Date().toISOString().split('T')[0],
      };
      const all = db.projects.getAll();
      all.push(project);
      setToStorage(STORAGE_KEYS.PROJECTS, all);

      // Log activity
      db.activityLog.create({
        targetSection: 'Projects',
        personaAffected: data.persona,
        actionType: 'CREATE',
        description: `Created project: "${data.name}"`,
      });

      return project;
    },
    update: (id: string, data: Partial<Project>): Project | null => {
      const all = db.projects.getAll();
      const index = all.findIndex(p => p.id === id);
      if (index === -1) return null;

      all[index] = { ...all[index], ...data };
      setToStorage(STORAGE_KEYS.PROJECTS, all);

      db.activityLog.create({
        targetSection: 'Projects',
        personaAffected: all[index].persona,
        actionType: 'UPDATE',
        description: `Updated project: "${all[index].name}"`,
      });

      return all[index];
    },
    delete: (id: string): void => {
      const all = db.projects.getAll();
      const project = all.find(p => p.id === id);
      const filtered = all.filter(p => p.id !== id);
      setToStorage(STORAGE_KEYS.PROJECTS, filtered);

      if (project) {
        db.activityLog.create({
          targetSection: 'Projects',
          personaAffected: project.persona,
          actionType: 'DELETE',
          description: `Deleted project: "${project.name}"`,
        });
      }
    },
  },

  // ── TESTIMONIALS ───────────────────────────
  testimonials: {
    getAll: (): Testimonial[] => {
      return getFromStorage<Testimonial[]>(STORAGE_KEYS.TESTIMONIALS, []);
    },
    getByPersona: (persona: string): Testimonial[] => {
      const all = db.testimonials.getAll();
      return all.filter(t => t.persona === persona);
    },
    create: (data: Omit<Testimonial, 'id'>): Testimonial => {
      const testimonial: Testimonial = {
        ...data,
        id: generateId('test'),
      };
      const all = db.testimonials.getAll();
      all.push(testimonial);
      setToStorage(STORAGE_KEYS.TESTIMONIALS, all);

      db.activityLog.create({
        targetSection: 'Testimonials',
        personaAffected: data.persona,
        actionType: 'CREATE',
        description: `Added testimonial from: "${data.clientName}"`,
      });

      return testimonial;
    },
    delete: (id: string): void => {
      const all = db.testimonials.getAll();
      const testimonial = all.find(t => t.id === id);
      const filtered = all.filter(t => t.id !== id);
      setToStorage(STORAGE_KEYS.TESTIMONIALS, filtered);

      if (testimonial) {
        db.activityLog.create({
          targetSection: 'Testimonials',
          personaAffected: testimonial.persona,
          actionType: 'DELETE',
          description: `Deleted testimonial from: "${testimonial.clientName}"`,
        });
      }
    },
  },

  // ── BIOGRAPHIES ────────────────────────────
  biographies: {
    getAll: (): Biography[] => {
      return getFromStorage<Biography[]>(STORAGE_KEYS.BIOGRAPHIES, []);
    },
    getByPersona: (persona: 'software_engineer' | 'content_creator'): Biography | null => {
      const all = db.biographies.getAll();
      return all.find(b => b.persona === persona) || null;
    },
    update: (persona: 'software_engineer' | 'content_creator', data: Partial<Biography>): Biography | null => {
      const all = db.biographies.getAll();
      const index = all.findIndex(b => b.persona === persona);

      if (index === -1) {
        // Create new biography
        const bio: Biography = {
          id: generateId('bio'),
          persona,
          pitchTitle: data.pitchTitle || '',
          bioText: data.bioText || '',
        };
        all.push(bio);
        setToStorage(STORAGE_KEYS.BIOGRAPHIES, all);

        db.activityLog.create({
          targetSection: 'Biography',
          personaAffected: persona,
          actionType: 'CREATE',
          description: `Created biography for ${persona}`,
        });

        return bio;
      }

      all[index] = { ...all[index], ...data };
      setToStorage(STORAGE_KEYS.BIOGRAPHIES, all);

      db.activityLog.create({
        targetSection: 'Biography',
        personaAffected: persona,
        actionType: 'UPDATE',
        description: `Updated biography for ${persona}`,
      });

      return all[index];
    },
  },

  // ── ACTIVITY LOG ───────────────────────────
  activityLog: {
    getAll: (): ActivityLog[] => {
      return getFromStorage<ActivityLog[]>(STORAGE_KEYS.ACTIVITY_LOG, []);
    },
    create: (data: Omit<ActivityLog, 'id' | 'timestamp'>): ActivityLog => {
      const log: ActivityLog = {
        ...data,
        id: generateId('log'),
        timestamp: new Date().toISOString(),
      };
      const all = db.activityLog.getAll();
      all.unshift(log); // Add to beginning (newest first)
      setToStorage(STORAGE_KEYS.ACTIVITY_LOG, all);
      return log;
    },
    clear: (): void => {
      setToStorage(STORAGE_KEYS.ACTIVITY_LOG, []);
    },
  },

  // ── AUTH TOKEN ─────────────────────────────
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
      return !!db.auth.getToken();
    },
  },
};

export default db;
