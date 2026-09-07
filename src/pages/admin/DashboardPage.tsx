import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import db from '../../lib/db';
import type { Project, Testimonial, Biography, ActivityLog } from '../../data/mockData';

type Tab = 'home' | 'workspace';
type Persona = 'software_engineer' | 'content_creator';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [biographies, setBiographies] = useState<Biography[]>([]);
  const [activityLog, setActivityLog] = useState<ActivityLog[]>([]);

  // Project form state
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectImage, setNewProjectImage] = useState('');
  const [newProjectUrl, setNewProjectUrl] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');
  const [newProjectPersona, setNewProjectPersona] = useState<Persona>('software_engineer');

  // Testimonial form state
  const [newTestName, setNewTestName] = useState('');
  const [newTestCompany, setNewTestCompany] = useState('');
  const [newTestImage, setNewTestImage] = useState('');
  const [newTestReview, setNewTestReview] = useState('');
  const [newTestPersona, setNewTestPersona] = useState<Persona>('software_engineer');

  // Biography form state
  const [editBioPersona, setEditBioPersona] = useState<Persona>('software_engineer');
  const [editBioTitle, setEditBioTitle] = useState('');
  const [editBioText, setEditBioText] = useState('');

  useEffect(() => {
    // Check auth
    if (!db.auth.isAuthenticated()) {
      navigate('/admin/auth');
      return;
    }
    loadData();
  }, [navigate]);

  const loadData = () => {
    setProjects(db.projects.getAll());
    setTestimonials(db.testimonials.getAll());
    setBiographies(db.biographies.getAll());
    setActivityLog(db.activityLog.getAll());
  };

  const handleLogout = () => {
    db.activityLog.create({
      targetSection: 'Auth',
      personaAffected: 'system',
      actionType: 'DELETE',
      description: 'Admin logged out',
    });
    db.auth.clearToken();
    navigate('/');
  };

  // ── PROJECT CRUD ──
  const handleCreateProject = () => {
    if (!newProjectName || !newProjectDesc) return;
    db.projects.create({
      persona: newProjectPersona,
      name: newProjectName,
      imageUrl: newProjectImage || 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600',
      projectUrl: newProjectUrl || '#',
      description: newProjectDesc,
    });
    setNewProjectName('');
    setNewProjectImage('');
    setNewProjectUrl('');
    setNewProjectDesc('');
    loadData();
  };

  const handleDeleteProject = (id: string) => {
    db.projects.delete(id);
    loadData();
  };

  // ── TESTIMONIAL CRUD ──
  const handleCreateTestimonial = () => {
    if (!newTestName || !newTestReview) return;
    db.testimonials.create({
      persona: newTestPersona,
      clientName: newTestName,
      clientImageUrl: newTestImage || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      reviewText: newTestReview,
      company: newTestCompany,
    });
    setNewTestName('');
    setNewTestCompany('');
    setNewTestImage('');
    setNewTestReview('');
    loadData();
  };

  const handleDeleteTestimonial = (id: string) => {
    db.testimonials.delete(id);
    loadData();
  };

  // ── BIOGRAPHY UPDATE ──
  const handleUpdateBiography = () => {
    if (!editBioTitle && !editBioText) return;
    db.biographies.update(editBioPersona, {
      pitchTitle: editBioTitle,
      bioText: editBioText,
    });
    setEditBioTitle('');
    setEditBioText('');
    loadData();
  };

  return (
    <div
      className="min-h-screen flex"
      style={{
        background: '#0a0a0f',
        fontFamily: "'Fira Code', monospace",
        color: '#00FF00'
      }}
    >
      {/* ── SIDEBAR ── */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            className="fixed left-0 top-0 bottom-0 w-64 z-40 flex flex-col"
            style={{
              background: 'rgba(10, 10, 15, 0.98)',
              borderRight: '1px solid rgba(0, 255, 0, 0.15)',
              backdropFilter: 'blur(20px)'
            }}
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            exit={{ x: -260 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Sidebar Header */}
            <div className="p-6" style={{ borderBottom: '1px solid rgba(0, 255, 0, 0.1)' }}>
              <h2 className="text-sm font-bold" style={{ color: '#00FF00' }}>
                ◈ ADMIN PANEL
              </h2>
              <p className="text-xs mt-1" style={{ color: 'rgba(0, 255, 0, 0.4)' }}>
                Asa Samuel Bless
              </p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              <button
                onClick={() => setActiveTab('home')}
                className="w-full text-left px-4 py-3 rounded text-sm transition-all"
                style={{
                  background: activeTab === 'home' ? 'rgba(0, 255, 0, 0.1)' : 'transparent',
                  color: activeTab === 'home' ? '#00FF00' : 'rgba(0, 255, 0, 0.5)',
                  border: activeTab === 'home' ? '1px solid rgba(0, 255, 0, 0.2)' : '1px solid transparent'
                }}
              >
                ◈ Dashboard Home
              </button>

              <a
                href="/?persona=engineer"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-3 rounded text-sm transition-all"
                style={{ color: 'rgba(0, 255, 0, 0.5)' }}
              >
                ⚡ Preview: Engineer
              </a>

              <a
                href="/?persona=creator"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-3 rounded text-sm transition-all"
                style={{ color: 'rgba(0, 255, 0, 0.5)' }}
              >
                ✦ Preview: Creator
              </a>

              <button
                onClick={() => setActiveTab('workspace')}
                className="w-full text-left px-4 py-3 rounded text-sm transition-all"
                style={{
                  background: activeTab === 'workspace' ? 'rgba(0, 255, 0, 0.1)' : 'transparent',
                  color: activeTab === 'workspace' ? '#00FF00' : 'rgba(0, 255, 0, 0.5)',
                  border: activeTab === 'workspace' ? '1px solid rgba(0, 255, 0, 0.2)' : '1px solid transparent'
                }}
              >
                ⌘ Edit Workspace
              </button>
            </nav>

            {/* Logout */}
            <div className="p-4" style={{ borderTop: '1px solid rgba(0, 255, 0, 0.1)' }}>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-3 rounded text-sm transition-all"
                style={{
                  background: 'rgba(255, 0, 110, 0.05)',
                  color: '#FF006E',
                  border: '1px solid rgba(255, 0, 110, 0.2)'
                }}
              >
                ⏻ Logout
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ── MAIN CONTENT ── */}
      <div
        className="flex-1 transition-all duration-300"
        style={{ marginLeft: sidebarOpen ? '256px' : '0' }}
      >
        {/* Top Bar */}
        <header
          className="sticky top-0 z-30 px-6 py-4 flex items-center justify-between"
          style={{
            background: 'rgba(10, 10, 15, 0.9)',
            borderBottom: '1px solid rgba(0, 255, 0, 0.1)',
            backdropFilter: 'blur(20px)'
          }}
        >
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="px-3 py-2 rounded text-sm"
            style={{
              border: '1px solid rgba(0, 255, 0, 0.2)',
              color: '#00FF00'
            }}
          >
            {sidebarOpen ? '◁' : '▷'}
          </button>
          <h1 className="text-sm" style={{ color: 'rgba(0, 255, 0, 0.6)' }}>
            {activeTab === 'home' ? '> activity_matrix' : '> edit_workspace'}
          </h1>
          <span className="text-xs" style={{ color: 'rgba(0, 255, 0, 0.3)' }}>
            asa746090@gmail.com
          </span>
        </header>

        {/* Content Area */}
        <main className="p-6">
          {activeTab === 'home' ? (
            /* ── ACTIVITY MATRIX ── */
            <div>
              <h2 className="text-lg font-bold mb-6" style={{ color: '#00FF00' }}>
                ◈ Activity Matrix
              </h2>
              <div
                className="rounded-lg overflow-hidden"
                style={{
                  border: '1px solid rgba(0, 255, 0, 0.15)',
                  background: 'rgba(10, 10, 15, 0.5)'
                }}
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr style={{ background: 'rgba(0, 255, 0, 0.05)' }}>
                        <th className="text-left px-4 py-3" style={{ color: 'rgba(0, 255, 0, 0.6)' }}>Timestamp</th>
                        <th className="text-left px-4 py-3" style={{ color: 'rgba(0, 255, 0, 0.6)' }}>Section</th>
                        <th className="text-left px-4 py-3" style={{ color: 'rgba(0, 255, 0, 0.6)' }}>Persona</th>
                        <th className="text-left px-4 py-3" style={{ color: 'rgba(0, 255, 0, 0.6)' }}>Action</th>
                        <th className="text-left px-4 py-3" style={{ color: 'rgba(0, 255, 0, 0.6)' }}>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activityLog.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-4 py-8 text-center" style={{ color: 'rgba(0, 255, 0, 0.3)' }}>
                            No activity recorded yet.
                          </td>
                        </tr>
                      ) : (
                        activityLog.map((log, i) => (
                          <motion.tr
                            key={log.id}
                            className="transition-colors"
                            style={{ borderTop: '1px solid rgba(0, 255, 0, 0.05)' }}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                          >
                            <td className="px-4 py-3" style={{ color: 'rgba(0, 255, 0, 0.5)' }}>
                              {new Date(log.timestamp).toLocaleString()}
                            </td>
                            <td className="px-4 py-3" style={{ color: '#00FF00' }}>{log.targetSection}</td>
                            <td className="px-4 py-3" style={{ color: 'rgba(0, 255, 0, 0.5)' }}>
                              {log.personaAffected === 'software_engineer' ? '⚡ Engineer' :
                               log.personaAffected === 'content_creator' ? '✦ Creator' :
                               log.personaAffected}
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className="px-2 py-1 rounded text-[10px] font-bold"
                                style={{
                                  background: log.actionType === 'CREATE' ? 'rgba(0, 255, 0, 0.1)' :
                                             log.actionType === 'UPDATE' ? 'rgba(255, 165, 0, 0.1)' :
                                             'rgba(255, 0, 110, 0.1)',
                                  color: log.actionType === 'CREATE' ? '#00FF00' :
                                        log.actionType === 'UPDATE' ? '#FFA500' :
                                        '#FF006E',
                                  border: log.actionType === 'CREATE' ? '1px solid rgba(0, 255, 0, 0.2)' :
                                         log.actionType === 'UPDATE' ? '1px solid rgba(255, 165, 0, 0.2)' :
                                         '1px solid rgba(255, 0, 110, 0.2)'
                                }}
                              >
                                {log.actionType}
                              </span>
                            </td>
                            <td className="px-4 py-3" style={{ color: 'rgba(0, 255, 0, 0.5)' }}>
                              {log.description}
                            </td>
                          </motion.tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            /* ── EDIT WORKSPACE ── */
            <div className="space-y-10">
              {/* BIOGRAPHY EDITOR */}
              <section>
                <h3 className="text-sm font-bold mb-4" style={{ color: '#FF006E' }}>
                  ⌘ Biography Editor
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-xs cursor-pointer" style={{ color: 'rgba(0, 255, 0, 0.6)' }}>
                      <input
                        type="radio"
                        name="bioPersona"
                        checked={editBioPersona === 'software_engineer'}
                        onChange={() => setEditBioPersona('software_engineer')}
                      />
                      ⚡ Engineer
                    </label>
                    <label className="flex items-center gap-2 text-xs cursor-pointer" style={{ color: 'rgba(0, 255, 0, 0.6)' }}>
                      <input
                        type="radio"
                        name="bioPersona"
                        checked={editBioPersona === 'content_creator'}
                        onChange={() => setEditBioPersona('content_creator')}
                      />
                      ✦ Creator
                    </label>
                  </div>
                  <input
                    type="text"
                    placeholder="Pitch Title"
                    value={editBioTitle}
                    onChange={(e) => setEditBioTitle(e.target.value)}
                    className="w-full px-4 py-3 rounded text-xs"
                    style={{
                      background: 'rgba(0, 255, 0, 0.03)',
                      border: '1px solid rgba(0, 255, 0, 0.2)',
                      color: '#00FF00'
                    }}
                  />
                  <textarea
                    placeholder="Bio text..."
                    value={editBioText}
                    onChange={(e) => setEditBioText(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 rounded text-xs resize-none"
                    style={{
                      background: 'rgba(0, 255, 0, 0.03)',
                      border: '1px solid rgba(0, 255, 0, 0.2)',
                      color: '#00FF00'
                    }}
                  />
                  <button
                    onClick={handleUpdateBiography}
                    className="px-6 py-2 rounded text-xs font-bold"
                    style={{
                      background: 'rgba(0, 255, 0, 0.1)',
                      border: '1px solid rgba(0, 255, 0, 0.3)',
                      color: '#00FF00'
                    }}
                  >
                    $ update --biography
                  </button>
                </div>
              </section>

              {/* PROJECTS CRUD */}
              <section>
                <h3 className="text-sm font-bold mb-4" style={{ color: '#FF006E' }}>
                  ⌘ Projects Manager
                </h3>
                <div className="space-y-4 mb-6">
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-xs cursor-pointer" style={{ color: 'rgba(0, 255, 0, 0.6)' }}>
                      <input type="radio" name="projPersona" checked={newProjectPersona === 'software_engineer'} onChange={() => setNewProjectPersona('software_engineer')} />
                      ⚡ Engineer
                    </label>
                    <label className="flex items-center gap-2 text-xs cursor-pointer" style={{ color: 'rgba(0, 255, 0, 0.6)' }}>
                      <input type="radio" name="projPersona" checked={newProjectPersona === 'content_creator'} onChange={() => setNewProjectPersona('content_creator')} />
                      ✦ Creator
                    </label>
                  </div>
                  <input type="text" placeholder="Project Name" value={newProjectName} onChange={(e) => setNewProjectName(e.target.value)} className="w-full px-4 py-3 rounded text-xs" style={{ background: 'rgba(0, 255, 0, 0.03)', border: '1px solid rgba(0, 255, 0, 0.2)', color: '#00FF00' }} />
                  <input type="text" placeholder="Image URL" value={newProjectImage} onChange={(e) => setNewProjectImage(e.target.value)} className="w-full px-4 py-3 rounded text-xs" style={{ background: 'rgba(0, 255, 0, 0.03)', border: '1px solid rgba(0, 255, 0, 0.2)', color: '#00FF00' }} />
                  <input type="text" placeholder="Project URL" value={newProjectUrl} onChange={(e) => setNewProjectUrl(e.target.value)} className="w-full px-4 py-3 rounded text-xs" style={{ background: 'rgba(0, 255, 0, 0.03)', border: '1px solid rgba(0, 255, 0, 0.2)', color: '#00FF00' }} />
                  <textarea placeholder="Description" value={newProjectDesc} onChange={(e) => setNewProjectDesc(e.target.value)} rows={3} className="w-full px-4 py-3 rounded text-xs resize-none" style={{ background: 'rgba(0, 255, 0, 0.03)', border: '1px solid rgba(0, 255, 0, 0.2)', color: '#00FF00' }} />
                  <button onClick={handleCreateProject} className="px-6 py-2 rounded text-xs font-bold" style={{ background: 'rgba(0, 255, 0, 0.1)', border: '1px solid rgba(0, 255, 0, 0.3)', color: '#00FF00' }}>
                    $ create --project
                  </button>
                </div>

                {/* Project List */}
                <div className="space-y-2">
                  {projects.map(p => (
                    <div key={p.id} className="flex items-center justify-between px-4 py-3 rounded" style={{ background: 'rgba(0, 255, 0, 0.03)', border: '1px solid rgba(0, 255, 0, 0.1)' }}>
                      <div>
                        <span className="text-xs font-bold" style={{ color: '#00FF00' }}>{p.name}</span>
                        <span className="ml-2 text-[10px]" style={{ color: p.persona === 'software_engineer' ? '#00FF00' : '#FF006E' }}>
                          [{p.persona === 'software_engineer' ? '⚡ ENG' : '✦ CRE'}]
                        </span>
                      </div>
                      <button onClick={() => handleDeleteProject(p.id)} className="text-xs px-2 py-1 rounded" style={{ color: '#FF006E', border: '1px solid rgba(255, 0, 110, 0.3)' }}>
                        🗑
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              {/* TESTIMONIALS CRUD */}
              <section>
                <h3 className="text-sm font-bold mb-4" style={{ color: '#FF006E' }}>
                  ⌘ Testimonials Manager
                </h3>
                <div className="space-y-4 mb-6">
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-xs cursor-pointer" style={{ color: 'rgba(0, 255, 0, 0.6)' }}>
                      <input type="radio" name="testPersona" checked={newTestPersona === 'software_engineer'} onChange={() => setNewTestPersona('software_engineer')} />
                      ⚡ Engineer
                    </label>
                    <label className="flex items-center gap-2 text-xs cursor-pointer" style={{ color: 'rgba(0, 255, 0, 0.6)' }}>
                      <input type="radio" name="testPersona" checked={newTestPersona === 'content_creator'} onChange={() => setNewTestPersona('content_creator')} />
                      ✦ Creator
                    </label>
                  </div>
                  <input type="text" placeholder="Client Name" value={newTestName} onChange={(e) => setNewTestName(e.target.value)} className="w-full px-4 py-3 rounded text-xs" style={{ background: 'rgba(0, 255, 0, 0.03)', border: '1px solid rgba(0, 255, 0, 0.2)', color: '#00FF00' }} />
                  <input type="text" placeholder="Company" value={newTestCompany} onChange={(e) => setNewTestCompany(e.target.value)} className="w-full px-4 py-3 rounded text-xs" style={{ background: 'rgba(0, 255, 0, 0.03)', border: '1px solid rgba(0, 255, 0, 0.2)', color: '#00FF00' }} />
                  <input type="text" placeholder="Avatar URL" value={newTestImage} onChange={(e) => setNewTestImage(e.target.value)} className="w-full px-4 py-3 rounded text-xs" style={{ background: 'rgba(0, 255, 0, 0.03)', border: '1px solid rgba(0, 255, 0, 0.2)', color: '#00FF00' }} />
                  <textarea placeholder="Review text" value={newTestReview} onChange={(e) => setNewTestReview(e.target.value)} rows={3} className="w-full px-4 py-3 rounded text-xs resize-none" style={{ background: 'rgba(0, 255, 0, 0.03)', border: '1px solid rgba(0, 255, 0, 0.2)', color: '#00FF00' }} />
                  <button onClick={handleCreateTestimonial} className="px-6 py-2 rounded text-xs font-bold" style={{ background: 'rgba(0, 255, 0, 0.1)', border: '1px solid rgba(0, 255, 0, 0.3)', color: '#00FF00' }}>
                    $ create --testimonial
                  </button>
                </div>

                {/* Testimonial List */}
                <div className="space-y-2">
                  {testimonials.map(t => (
                    <div key={t.id} className="flex items-center justify-between px-4 py-3 rounded" style={{ background: 'rgba(0, 255, 0, 0.03)', border: '1px solid rgba(0, 255, 0, 0.1)' }}>
                      <div>
                        <span className="text-xs font-bold" style={{ color: '#00FF00' }}>{t.clientName}</span>
                        <span className="ml-2 text-[10px]" style={{ color: 'rgba(0, 255, 0, 0.4)' }}>({t.company})</span>
                        <span className="ml-2 text-[10px]" style={{ color: t.persona === 'software_engineer' ? '#00FF00' : '#FF006E' }}>
                          [{t.persona === 'software_engineer' ? '⚡ ENG' : '✦ CRE'}]
                        </span>
                      </div>
                      <button onClick={() => handleDeleteTestimonial(t.id)} className="text-xs px-2 py-1 rounded" style={{ color: '#FF006E', border: '1px solid rgba(255, 0, 110, 0.3)' }}>
                        🗑
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
