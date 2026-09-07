/**
 * Authentication Middleware
 * 
 * In Next.js: This would be src/middleware.ts running on the edge
 * In this Vite/React setup: This runs client-side to guard routes
 * 
 * Protects /admin/dashboard from unauthorized access
 */

import db from './lib/db';

export interface MiddlewareResult {
  allowed: boolean;
  redirectTo?: string;
}

/**
 * Check if user is authenticated before accessing admin routes
 */
export function checkAuth(): MiddlewareResult {
  const isAuthenticated = db.auth.isAuthenticated();
  
  if (!isAuthenticated) {
    return {
      allowed: false,
      redirectTo: '/admin/auth'
    };
  }

  return { allowed: true };
}

/**
 * Check if admin account exists (for registration gating)
 */
export function checkAdminExists(): boolean {
  const admin = db.admin.get();
  return admin !== null && admin.isRegistered === true;
}

/**
 * Protect a route — redirect if not authenticated
 */
export function protectRoute(): void {
  const result = checkAuth();
  if (!result.allowed && result.redirectTo) {
    window.location.href = result.redirectTo;
  }
}

export default { checkAuth, checkAdminExists, protectRoute };
