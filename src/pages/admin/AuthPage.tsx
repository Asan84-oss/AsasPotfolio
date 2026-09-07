import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getAdmin, saveAdmin, setAuthToken, isAuthenticated } from '../../data/mockData';

export default function AdminAuth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [adminExists, setAdminExists] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if already authenticated
    if (isAuthenticated()) {
      navigate('/admin/dashboard');
      return;
    }
    // Check if admin exists
    const admin = getAdmin();
    setAdminExists(admin !== null && admin.isRegistered);
    setLoading(false);
  }, [navigate]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('All fields are required');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // Check if admin already exists (double-check)
    if (adminExists) {
      setError('Admin account already exists. Please login.');
      return;
    }

    // Create admin account
    const admin = {
      id: crypto.randomUUID(),
      email,
      password, // In production, this would be hashed with bcrypt
      isRegistered: true
    };
    saveAdmin(admin);
    setAuthToken(`token_${admin.id}_${Date.now()}`);
    navigate('/admin/dashboard');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('All fields are required');
      return;
    }

    const admin = getAdmin();
    if (!admin) {
      setError('No admin account found');
      return;
    }

    if (admin.email !== email || admin.password !== password) {
      setError('Invalid credentials');
      return;
    }

    setAuthToken(`token_${admin.id}_${Date.now()}`);
    navigate('/admin/dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
        <div className="animate-pulse text-green-400 font-mono text-sm">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[#0a0a0f] relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,255,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,0,0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <motion.div
        className="relative w-full max-w-md p-8 rounded-xl"
        style={{
          background: 'rgba(10, 10, 15, 0.9)',
          border: '1px solid rgba(0, 255, 0, 0.15)',
          boxShadow: '0 0 60px rgba(0, 255, 0, 0.05)'
        }}
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Terminal header */}
        <div className="flex items-center gap-2 mb-6 pb-4" style={{ borderBottom: '1px solid rgba(0, 255, 0, 0.1)' }}>
          <span className="w-3 h-3 rounded-full" style={{ background: '#FF006E' }} />
          <span className="w-3 h-3 rounded-full" style={{ background: '#FFD700' }} />
          <span className="w-3 h-3 rounded-full" style={{ background: '#00FF00' }} />
          <span
            className="ml-4 text-xs"
            style={{ fontFamily: "'Fira Code', monospace", color: 'rgba(0, 255, 0, 0.4)' }}
          >
            {adminExists ? '~/admin/login' : '~/admin/register'}
          </span>
        </div>

        {/* Title */}
        <h1
          className="text-xl font-bold mb-2"
          style={{ fontFamily: "'Fira Code', monospace", color: '#00FF00' }}
        >
          {adminExists ? '> System Login' : '> Create Admin Account'}
        </h1>
        <p
          className="text-xs mb-8"
          style={{ fontFamily: "'Fira Code', monospace", color: 'rgba(0, 255, 0, 0.4)' }}
        >
          {adminExists
            ? '// Authenticate to access the dashboard'
            : '// First-time setup — this account cannot be changed later'
          }
        </p>

        {/* Form */}
        <form onSubmit={adminExists ? handleLogin : handleRegister} className="space-y-5">
          <div>
            <label
              className="block text-xs mb-2"
              style={{ fontFamily: "'Fira Code', monospace", color: 'rgba(0, 255, 0, 0.5)' }}
            >
              {'> email:'}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all focus:ring-1"
              style={{
                fontFamily: "'Fira Code', monospace",
                background: 'rgba(0, 255, 0, 0.03)',
                border: '1px solid rgba(0, 255, 0, 0.15)',
                color: '#00FF00',
              }}
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label
              className="block text-xs mb-2"
              style={{ fontFamily: "'Fira Code', monospace", color: 'rgba(0, 255, 0, 0.5)' }}
            >
              {'> password:'}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all focus:ring-1"
              style={{
                fontFamily: "'Fira Code', monospace",
                background: 'rgba(0, 255, 0, 0.03)',
                border: '1px solid rgba(0, 255, 0, 0.15)',
                color: '#00FF00',
              }}
              placeholder="••••••••"
            />
          </div>

          {error && (
            <motion.p
              className="text-xs px-3 py-2 rounded"
              style={{
                fontFamily: "'Fira Code', monospace",
                color: '#FF006E',
                background: 'rgba(255, 0, 110, 0.05)',
                border: '1px solid rgba(255, 0, 110, 0.2)'
              }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {'// ERROR: '}{error}
            </motion.p>
          )}

          <motion.button
            type="submit"
            className="w-full py-3 rounded-lg text-sm font-bold tracking-wider uppercase mt-4"
            style={{
              fontFamily: "'Fira Code', monospace",
              background: 'linear-gradient(135deg, rgba(0, 255, 0, 0.15), rgba(255, 0, 110, 0.15))',
              color: '#00FF00',
              border: '1px solid rgba(0, 255, 0, 0.3)',
              boxShadow: '0 0 20px rgba(0, 255, 0, 0.1)'
            }}
            whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(0, 255, 0, 0.2)' }}
            whileTap={{ scale: 0.98 }}
          >
            {adminExists ? '$ authenticate' : '$ create_admin'}
          </motion.button>
        </form>

        {/* Back link */}
        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-xs"
            style={{ fontFamily: "'Fira Code', monospace", color: 'rgba(0, 255, 0, 0.3)' }}
          >
            {'← return_to_portfolio()'}
          </a>
        </div>
      </motion.div>
    </div>
  );
}
