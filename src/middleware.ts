/**
 * AUTH MIDDLEWARE
 * 
 * In production (Next.js on Vercel):
 *   This would be src/middleware.ts using Next.js middleware API
 *   to protect /admin/dashboard/* routes with JWT validation.
 * 
 * In this Vite SPA:
 *   This module exports a checkAuth function used by the
 *   admin dashboard component to gate access.
 */

import db from './lib/db';

/**
 * Check if the current user is authenticated.
 * Returns true if a valid auth token exists in localStorage.
 */
export function checkAuth(): boolean {
  return db.auth.isAuthenticated();
}

/**
 * Get the current admin's email from the token.
 * In production, this would decode the JWT.
 */
export function getCurrentAdmin(): string | null {
  const token = db.auth.getToken();
  if (!token) return null;
  
  try {
    const decoded = atob(token);
    const email = decoded.split(':')[0];
    return email || null;
  } catch {
    return null;
  }
}

/**
 * Middleware configuration for Next.js production deployment.
 * This object would be used in a real Next.js middleware.ts file.
 */
export const config = {
  matcher: ['/admin/dashboard/:path*'],
};
