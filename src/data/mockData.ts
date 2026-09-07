/**
 * MOCK DATA — Type Definitions & Initial Seed Data
 * 
 * These types are used throughout the application.
 * In production with PostgreSQL, these map directly to Prisma models.
 * The actual data is managed via src/lib/db.ts (localStorage fallback).
 */

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

// ── PERSONAL DATA (Hardcoded) ──
export const PERSONAL_DATA = {
  fullName: 'Asa Samuel Bless',
  location: 'Douala, Cameroon',
  email: 'asa746090@gmail.com',
  whatsapp: '+237 670713584',
  github: 'https://github.com/Asan84-oss',
  linkedin: 'https://www.linkedin.com/in/asa-bless-a48070415',
  tiktok: ['@lordsprayer11', '@graceatwork07', 'glorious.god472'],
};
