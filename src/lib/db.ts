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
