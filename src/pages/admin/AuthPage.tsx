import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import db from '../../lib/db';

export default function AdminAuth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [adminExists, setAdminExists] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if admin already exists
    const existingAdmin = db.admin.get();
    if (existingAdmin && existingAdmin.isRegistered) {
      setAdminExists(true);
      setMode('login');
    } else {
      setMode('register');
    }
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (adminExists) {
      setError('Registration is permanently closed. An admin account already exists.');
      setLoading(false);
      return;
    }

    if (!email || !password) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      setLoading(false);
      return;
    }

    try {
      db.admin.create(email, password);
      const token = btoa(`${email}:${Date.now()}`);
      db.auth.setToken(token);
      
      db.activityLog.create({
        targetSection: 'Auth',
        personaAffected: 'system',
        actionType: 'CREATE',
        description: `Admin account created: ${email}`,
      });

      setLoading(false);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Registration failed. Please try again.');
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }

    try {
      const isValid = db.admin.verify(email, password);
      if (!isValid) {
        setError('Invalid credentials. Please check your email and password.');
        setLoading(false);
        return;
      }

      const token = btoa(`${email}:${Date.now()}`);
      db.auth.setToken(token);

      db.activityLog.create({
        targetSection: 'Auth',
        personaAffected: 'system',
        actionType: 'CREATE',
        description: `Admin logged in: ${email}`,
      });

      setLoading(false);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Login failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: '#0a0a0f',
        fontFamily: "'Fira Code', monospace"
      }}
    >
      {/* Background grid */}
      <div className="fixed inset-0 opacity-5" style={{
        backgroundImage: `
          linear-gradient(rgba(0, 255, 0, 0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 255, 0, 0.3) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px'
      }} />

      <motion.div
        className="relative w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Terminal Window */}
        <div
          className="rounded-lg overflow-hidden"
          style={{
            background: 'rgba(10, 10, 15, 0.95)',
            border: '1px solid rgba(0, 255, 0, 0.2)',
            boxShadow: '0 0 40px rgba(0, 255, 0, 0.1)'
          }}
        >
          {/* Terminal Header */}
          <div
            className="px-4 py-3 flex items-center gap-2"
            style={{ borderBottom: '1px solid rgba(0, 255, 0, 0.15)' }}
          >
            <div className="w-3 h-3 rounded-full" style={{ background: '#FF5F56' }} />
            <div className="w-3 h-3 rounded-full" style={{ background: '#FFBD2E' }} />
            <div className="w-3 h-3 rounded-full" style={{ background: '#27C93F' }} />
            <span className="ml-4 text-xs" style={{ color: 'rgba(0, 255, 0, 0.5)' }}>
              admin@asa-portfolio:~$ {mode === 'register' ? 'register --new' : 'auth --login'}
            </span>
          </div>

          {/* Terminal Body */}
          <div className="p-8">
            <h1
              className="text-xl font-bold mb-2"
              style={{ color: '#00FF00' }}
            >
              {adminExists ? '> SYSTEM.LOGIN' : '> SYSTEM.REGISTER'}
            </h1>
            <p className="text-xs mb-8" style={{ color: 'rgba(0, 255, 0, 0.4)' }}>
              {adminExists
                ? '// Registration permanently locked. Enter credentials.'
                : '// Create the administrator account. This action is one-time only.'}
            </p>

            <form onSubmit={mode === 'register' ? handleRegister : handleLogin} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-xs mb-2" style={{ color: 'rgba(0, 255, 0, 0.6)' }}>
                  $ email_address:
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded text-sm outline-none"
                  style={{
                    background: 'rgba(0, 255, 0, 0.03)',
                    border: '1px solid rgba(0, 255, 0, 0.2)',
                    color: '#00FF00',
                    fontFamily: "'Fira Code', monospace"
                  }}
                  placeholder="admin@portfolio.dev"
                  disabled={loading}
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs mb-2" style={{ color: 'rgba(0, 255, 0, 0.6)' }}>
                  $ secret_key:
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded text-sm outline-none"
                  style={{
                    background: 'rgba(0, 255, 0, 0.03)',
                    border: '1px solid rgba(0, 255, 0, 0.2)',
                    color: '#00FF00',
                    fontFamily: "'Fira Code', monospace"
                  }}
                  placeholder="••••••••"
                  disabled={loading}
                />
              </div>

              {/* Error */}
              {error && (
                <motion.div
                  className="px-4 py-3 rounded text-xs"
                  style={{
                    background: 'rgba(255, 0, 110, 0.1)',
                    border: '1px solid rgba(255, 0, 110, 0.3)',
                    color: '#FF006E'
                  }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  ✗ {error}
                </motion.div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded text-sm font-bold tracking-wider uppercase transition-all"
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 255, 0, 0.15), rgba(255, 0, 110, 0.15))',
                  border: '1px solid rgba(0, 255, 0, 0.3)',
                  color: '#00FF00',
                  fontFamily: "'Fira Code', monospace",
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                {loading
                  ? '> processing...'
                  : mode === 'register'
                    ? '$ admin --create'
                    : '$ admin --login'}
              </button>
            </form>

            {/* Footer info */}
            <div className="mt-8 pt-6 text-center" style={{ borderTop: '1px solid rgba(0, 255, 0, 0.1)' }}>
              <p className="text-xs" style={{ color: 'rgba(0, 255, 0, 0.3)' }}>
                Asa Samuel Bless — Portfolio Admin System v1.0
              </p>
              <p className="text-xs mt-1" style={{ color: 'rgba(0, 255, 0, 0.2)' }}>
                Douala, Cameroon
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
