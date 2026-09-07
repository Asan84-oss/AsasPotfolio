import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import db from '../../lib/db';
import { checkAdminExists } from '../../middleware';

export default function AdminAuth() {
  const navigate = useNavigate();
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if admin already exists
    const adminExists = checkAdminExists();
    if (adminExists) {
      setIsLoginMode(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      if (isLoginMode) {
        // LOGIN
        const admin = db.admin.authenticate(email, password);
        if (!admin) {
          setError('Invalid credentials. Access denied.');
          setLoading(false);
          return;
        }
        // Set auth token
        const token = `jwt_${crypto.randomUUID()}`;
        db.auth.setToken(token);
        db.activityLog.create({
          targetSection: 'Authentication',
          personaAffected: 'system',
          actionType: 'CREATE',
          description: `Admin logged in: ${email}`
        });
        navigate('/admin/dashboard');
      } else {
        // REGISTER
        if (checkAdminExists()) {
          setError('Registration is permanently disabled. An admin account already exists.');
          setIsLoginMode(true);
          setLoading(false);
          return;
        }
        if (password.length < 6) {
          setError('Password must be at least 6 characters.');
          setLoading(false);
          return;
        }
        db.admin.create(email, password);
        const token = `jwt_${crypto.randomUUID()}`;
        db.auth.setToken(token);
        db.activityLog.create({
          targetSection: 'Authentication',
          personaAffected: 'system',
          actionType: 'CREATE',
          description: `Admin account created: ${email}`
        });
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: '#0a0a0f' }}>
      
      {/* Matrix background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 0, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 0, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-md mx-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Terminal window */}
        <div
          className="rounded-lg overflow-hidden"
          style={{
            background: 'rgba(10, 10, 15, 0.95)',
            border: '1px solid rgba(0, 255, 0, 0.2)',
            boxShadow: '0 0 40px rgba(0, 255, 0, 0.05)'
          }}
        >
          {/* Terminal header */}
          <div
            className="flex items-center gap-2 px-4 py-3"
            style={{ borderBottom: '1px solid rgba(0, 255, 0, 0.1)' }}
          >
            <div className="w-3 h-3 rounded-full" style={{ background: '#FF5F56' }} />
            <div className="w-3 h-3 rounded-full" style={{ background: '#FFBD2E' }} />
            <div className="w-3 h-3 rounded-full" style={{ background: '#27C93F' }} />
            <span
              className="ml-4 text-xs"
              style={{ fontFamily: "'Fira Code', monospace", color: 'rgba(0, 255, 0, 0.5)' }}
            >
              admin_auth.sys — {isLoginMode ? 'LOGIN' : 'REGISTRATION'}
            </span>
          </div>

          {/* Terminal body */}
          <div className="p-8">
            <motion.div
              className="mb-8 text-center"
              key={isLoginMode ? 'login' : 'register'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h1
                className="text-2xl font-bold mb-2"
                style={{ fontFamily: "'Fira Code', monospace", color: '#00FF00' }}
              >
                {isLoginMode ? '> system.login()' : '> admin.register()'}
              </h1>
              <p
                className="text-xs"
                style={{ fontFamily: "'Fira Code', monospace", color: 'rgba(0, 255, 0, 0.4)' }}
              >
                {isLoginMode
                  ? '// Authenticate with existing credentials'
                  : '// Create administrator account (one-time only)'}
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  className="block text-xs mb-2 tracking-wider"
                  style={{ fontFamily: "'Fira Code', monospace", color: 'rgba(0, 255, 0, 0.6)' }}
                >
                  EMAIL_ADDRESS:
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded text-sm outline-none transition-all"
                  style={{
                    fontFamily: "'Fira Code', monospace",
                    background: 'rgba(0, 255, 0, 0.03)',
                    border: '1px solid rgba(0, 255, 0, 0.15)',
                    color: '#00FF00',
                    caretColor: '#00FF00'
                  }}
                  placeholder="admin@portfolio.dev"
                />
              </div>

              <div>
                <label
                  className="block text-xs mb-2 tracking-wider"
                  style={{ fontFamily: "'Fira Code', monospace", color: 'rgba(0, 255, 0, 0.6)' }}
                >
                  PASSWORD:
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded text-sm outline-none transition-all"
                  style={{
                    fontFamily: "'Fira Code', monospace",
                    background: 'rgba(0, 255, 0, 0.03)',
                    border: '1px solid rgba(0, 255, 0, 0.15)',
                    color: '#00FF00',
                    caretColor: '#00FF00'
                  }}
                  placeholder="••••••••"
                />
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-4 py-3 rounded text-xs"
                    style={{
                      fontFamily: "'Fira Code', monospace",
                      background: 'rgba(255, 0, 110, 0.1)',
                      border: '1px solid rgba(255, 0, 110, 0.3)',
                      color: '#FF006E'
                    }}
                  >
                    ERROR: {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded text-sm font-bold tracking-wider uppercase transition-all"
                style={{
                  fontFamily: "'Fira Code', monospace",
                  background: loading
                    ? 'rgba(0, 255, 0, 0.05)'
                    : 'linear-gradient(135deg, rgba(0, 255, 0, 0.15), rgba(255, 0, 110, 0.15))',
                  border: '1px solid rgba(0, 255, 0, 0.3)',
                  color: '#00FF00',
                  cursor: loading ? 'wait' : 'pointer'
                }}
                whileHover={!loading ? { boxShadow: '0 0 20px rgba(0, 255, 0, 0.2)' } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
              >
                {loading ? 'PROCESSING...' : isLoginMode ? '$ auth --login' : '$ admin --create'}
              </motion.button>
            </form>

            {/* Status bar */}
            <div
              className="mt-6 pt-4 flex items-center justify-between"
              style={{ borderTop: '1px solid rgba(0, 255, 0, 0.08)' }}
            >
              <span
                className="text-[10px]"
                style={{ fontFamily: "'Fira Code', monospace", color: 'rgba(0, 255, 0, 0.3)' }}
              >
                DB: {db.status.mode}
              </span>
              <a
                href="/"
                className="text-[10px] hover:underline"
                style={{ fontFamily: "'Fira Code', monospace", color: 'rgba(0, 255, 0, 0.3)' }}
              >
                ← back to portfolio
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
