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

export interface Admin {
  id: string;
  email: string;
  password: string;
  isRegistered: boolean;
}

// Default data
export const defaultProjects: Project[] = [
  {
    id: 'p1',
    persona: 'software_engineer',
    name: 'Centralized Customer Complaint Tracking System for UBA Bank',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    projectUrl: '#',
    description: 'A comprehensive HTML, CSS, and JavaScript analytics dashboard designed to track, categorize, and resolve financial grievances in real-time. Built with data visualization pipelines for UBA Bank\'s customer service operations.',
    createdAt: '2024-09-15'
  },
  {
    id: 'p2',
    persona: 'software_engineer',
    name: 'Voice-Cloned AI Assistant Project',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
    projectUrl: '#',
    description: 'An autonomous AI assistant featuring voice-cloning pipelines that stream natural interactions over WhatsApp. Integrates DeepSeek and custom LLM fine-tuning for context-aware conversational AI.',
    createdAt: '2025-01-20'
  },
  {
    id: 'p3',
    persona: 'software_engineer',
    name: 'Transactional Architecture Microservices',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbd3154?w=600&h=400&fit=crop',
    projectUrl: '#',
    description: 'Scalable Node.js microservices architecture handling high-volume financial transactions with ACID compliance, event-driven messaging, and real-time monitoring dashboards.',
    createdAt: '2024-11-08'
  },
  {
    id: 'p4',
    persona: 'software_engineer',
    name: 'Autonomous Code Review Agent',
    imageUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop',
    projectUrl: '#',
    description: 'AI-powered code review agent that autonomously analyzes pull requests, identifies bugs, suggests optimizations, and enforces coding standards across distributed development teams.',
    createdAt: '2025-02-14'
  },
  {
    id: 'p5',
    persona: 'content_creator',
    name: 'TikTok Community: 0 → 50,000+ Organic Followers',
    imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop',
    projectUrl: '#',
    description: 'A comprehensive case study on scaling a primary TikTok community from zero to 50,000+ followers in just 3 months using algorithmic content strategies, trend-jacking frameworks, and data-driven posting schedules.',
    createdAt: '2024-12-01'
  },
  {
    id: 'p6',
    persona: 'content_creator',
    name: 'Backup Asset: 4,000+ Followers in 30 Days',
    imageUrl: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=600&h=400&fit=crop',
    projectUrl: '#',
    description: 'Built a secondary content asset from scratch to 4,000+ active followers in 30 days using advanced CapCut editing suites, viral hook frameworks, and cross-platform repurposing strategies.',
    createdAt: '2025-01-10'
  },
  {
    id: 'p7',
    persona: 'content_creator',
    name: 'Brand Campaign: Viral Short-Form Video Series',
    imageUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&h=400&fit=crop',
    projectUrl: '#',
    description: 'Produced a viral short-form video campaign for a lifestyle brand, translating brand messaging into 15 high-engagement video assets that collectively generated 2M+ views across platforms.',
    createdAt: '2025-03-05'
  }
];

export const defaultTestimonials: Testimonial[] = [
  {
    id: 't1',
    persona: 'software_engineer',
    clientName: 'Emmanuel Okoro',
    clientImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    reviewText: 'Asa delivered a robust complaint tracking system that reduced our resolution time by 60%. His understanding of transactional architecture and data pipelines is exceptional. He doesn\'t just write code — he engineers solutions.',
    company: 'UBA Bank — Digital Innovation'
  },
  {
    id: 't2',
    persona: 'software_engineer',
    clientName: 'Dr. Amina Bello',
    clientImageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face',
    reviewText: 'The AI voice assistant Asa built for our WhatsApp integration is production-grade. His ability to merge autonomous agents with real-time voice cloning pipelines is rare. Highly recommend for any complex backend project.',
    company: 'NeuralFlow Labs'
  },
  {
    id: 't3',
    persona: 'content_creator',
    clientName: 'Chioma Nwosu',
    clientImageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face',
    reviewText: 'Asa scaled our TikTok presence from nothing to 50K followers in 3 months. His understanding of the algorithm is unmatched. Every piece of content was strategically crafted for maximum reach and engagement.',
    company: 'Luxe Lifestyle Brand'
  },
  {
    id: 't4',
    persona: 'content_creator',
    clientName: 'Tunde Adeyemi',
    clientImageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    reviewText: 'The short-form video campaign Asa produced generated over 2 million views. His editing skills in CapCut combined with his trend-jacking instincts make him a powerhouse content creator. Absolute professional.',
    company: 'Viral Media Group'
  }
];

export const defaultBiographies: Biography[] = [
  {
    id: 'b1',
    persona: 'software_engineer',
    pitchTitle: 'Engineering Systems That Scale',
    bioText: 'Data-driven Software Engineer specializing in full-stack applications, autonomous AI coding agents, and robust transactional architectures. I eliminate system bottlenecks and scale backend infrastructure seamlessly. Based in Douala, Cameroon — building the future of intelligent software, one deployment at a time.'
  },
  {
    id: 'b2',
    persona: 'content_creator',
    pitchTitle: 'Stories That Move Millions',
    bioText: 'Algorithm-focused Digital Marketer and Content Creator. Scaled an organic TikTok community to 50,000+ followers in 3 months. I translate brand messages into viral short-form video assets using clean visual storytelling. Every frame is intentional. Every hook is engineered.'
  }
];

// Local storage helper functions (simulates database)
const STORAGE_KEYS = {
  projects: 'asa_projects',
  testimonials: 'asa_testimonials',
  biographies: 'asa_biographies',
  activityLog: 'asa_activity_log',
  admin: 'asa_admin',
  authToken: 'asa_auth_token'
};

export function getProjects(): Project[] {
  const stored = localStorage.getItem(STORAGE_KEYS.projects);
  if (stored) return JSON.parse(stored);
  localStorage.setItem(STORAGE_KEYS.projects, JSON.stringify(defaultProjects));
  return defaultProjects;
}

export function saveProjects(projects: Project[]): void {
  localStorage.setItem(STORAGE_KEYS.projects, JSON.stringify(projects));
}

export function getTestimonials(): Testimonial[] {
  const stored = localStorage.getItem(STORAGE_KEYS.testimonials);
  if (stored) return JSON.parse(stored);
  localStorage.setItem(STORAGE_KEYS.testimonials, JSON.stringify(defaultTestimonials));
  return defaultTestimonials;
}

export function saveTestimonials(testimonials: Testimonial[]): void {
  localStorage.setItem(STORAGE_KEYS.testimonials, JSON.stringify(testimonials));
}

export function getBiographies(): Biography[] {
  const stored = localStorage.getItem(STORAGE_KEYS.biographies);
  if (stored) return JSON.parse(stored);
  localStorage.setItem(STORAGE_KEYS.biographies, JSON.stringify(defaultBiographies));
  return defaultBiographies;
}

export function saveBiographies(bios: Biography[]): void {
  localStorage.setItem(STORAGE_KEYS.biographies, JSON.stringify(bios));
}

export function getActivityLog(): ActivityLog[] {
  const stored = localStorage.getItem(STORAGE_KEYS.activityLog);
  if (stored) return JSON.parse(stored);
  return [];
}

export function addActivityLog(entry: Omit<ActivityLog, 'id' | 'timestamp'>): void {
  const logs = getActivityLog();
  logs.unshift({
    ...entry,
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString()
  });
  localStorage.setItem(STORAGE_KEYS.activityLog, JSON.stringify(logs));
}

export function getAdmin(): Admin | null {
  const stored = localStorage.getItem(STORAGE_KEYS.admin);
  if (stored) return JSON.parse(stored);
  return null;
}

export function saveAdmin(admin: Admin): void {
  localStorage.setItem(STORAGE_KEYS.admin, JSON.stringify(admin));
}

export function getAuthToken(): string | null {
  return localStorage.getItem(STORAGE_KEYS.authToken);
}

export function setAuthToken(token: string): void {
  localStorage.setItem(STORAGE_KEYS.authToken, token);
}

export function clearAuthToken(): void {
  localStorage.removeItem(STORAGE_KEYS.authToken);
}

export function isAuthenticated(): boolean {
  return !!getAuthToken();
}
