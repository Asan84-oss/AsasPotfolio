import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import db, { Project, Testimonial, Biography, ActivityLog } from '../../lib/db';
import { checkAuth } from '../../middleware';

type Tab = 'home' | 'workspace';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Data states
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [biographies, setBiographies] = useState<Biography[]>([]);

  // Form states
  const [newProject, setNewProject] = useState({
    persona: 'software_engineer' as const,
    name: '', imageUrl: '', projectUrl: '', description: ''
  });
  const [newTestimonial, setNewTestimonial] = useState({
    persona: 'software_engineer' as const,
    clientName: '', clientImageUrl: '', reviewText: '', company: ''
  });
  const [editingBio, setEditingBio] = useState<{ [key: string]: { pitchTitle: string; bioText: string } }>({});

  // Auth guard
  useEffect(() => {
    const result = checkAuth();
    if (!result.allowed) {
      navigate('/admin/auth');
    }
  }, [navigate]);

  // Load data
  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    setActivityLogs(db.activityLog.getAll());
    setProjects(db.projects.getAll());
    setTestimonials(db.testimonials.getAll());
    const bios = db.biographies.getAll();
    setBiographies(bios);
    const editState: typeof editingBio = {};
    bios.forEach(b => {
      editState[b.persona] = { pitchTitle: b.pitchTitle, bioText: b.bioText };
    });
    setEditingBio(editState);
  };

  const handleLogout = () => {
    db.auth.clearToken();
    db.activityLog.create({
      targetSection: 'Authentication',
      personaAffected: 'system',
      actionType: 'DELETE',
      description: 'Admin logged out'
    });
    navigate('/');
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.name || !newProject.description) return;
    db.projects.create(newProject);
    setNewProject({ persona: 'software_engineer', name: '', imageUrl: '', projectUrl: '', description: '' });
    refreshData();
  };

  const handleDeleteProject = (id: string) => {
    db.projects.delete(id);
    refreshData();
  };

  const handleAddTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestimonial.clientName || !newTestimonial.reviewText) return;
    db.testimonials.create(newTestimonial);
    setNewTestimonial({ persona: 'software_engineer', clientName: '', clientImageUrl: '', reviewText: '', company: '' });
    refreshData();
  };

  const handleDeleteTestimonial = (id: string) => {
    db.testimonials.delete(id);
    refreshData();
  };

  const handleUpdateBio = (persona: string) => {
    const bio = biographies.find(b => b.persona === persona);
    if (!bio || !editingBio[persona]) return;
    db.biographies.update(bio.id, editingBio[persona]);
    refreshData();
  };

  return (
    <div className="min-h-screen flex" style={{ background: '#0a0a0f', color: '#00FF00' }}>
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            className="fixed left-0 top-0 h-full z-50 flex flex-col"
            style={{
              width: '260px',
              background: 'rgba(10, 10, 15, 0.98)',
              borderRight: '1px solid rgba(0, 255, 0, 0.1)',
              backdropFilter: 'blur(20px)'
            }}
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            exit={{ x: -260 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Sidebar header */}
            <div className="p-5" style={{ borderBottom: '1px solid rgba(0, 255, 0, 0.08)' }}>
              <h2
                className="text-sm font-bold tracking-wider"
                style={{ fontFamily: "'Fira Code', monospace", color: '#00FF00' }}
              >
                ◈ ADMIN PANEL
              </h2>
              <p
                className="text-[10px] mt-1"
                style={{ fontFamily: "'Fira Code', monospace", color: 'rgba(0, 255, 0, 0.3)' }}
              >
                DB: {db.status.mode}
              </p>
            </div>

            {/* Nav items */}
            <nav className="flex-1 p-4 space-y-2">
              <SidebarButton
                active={activeTab === 'home'}
                onClick={() => setActiveTab('home')}
                icon="◈"
                label="Dashboard Home"
              />
              <SidebarButton
                onClick={() => window.open('/?persona=engineer', '_blank')}
                icon="⚡"
                label="Preview: Engineer"
              />
              <SidebarButton
                onClick={() => window.open('/?persona=creator', '_blank')}
                icon="✦"
                label="Preview: Creator"
              />
              <SidebarButton
                active={activeTab === 'workspace'}
                onClick={() => setActiveTab('workspace')}
                icon="⌘"
                label="Edit Workspace"
              />

              <div className="pt-4 mt-4" style={{ borderTop: '1px solid rgba(0, 255, 0, 0.08)' }}>
                <SidebarButton
                  onClick={handleLogout}
                  icon="⏻"
                  label="Logout"
                  danger
                />
              </div>
            </nav>

            {/* Sidebar footer */}
            <div className="p-4" style={{ borderTop: '1px solid rgba(0, 255, 0, 0.08)' }}>
              <a
                href="/"
                className="text-[10px] block text-center hover:underline"
                style={{ fontFamily: "'Fira Code', monospace", color: 'rgba(0, 255, 0, 0.3)' }}
              >
                ← back to portfolio
              </a>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main content area */}
      <div
        className="flex-1 transition-all duration-300"
        style={{ marginLeft: sidebarOpen ? '260px' : '0' }}
      >
        {/* Top bar */}
        <div
          className="sticky top-0 z-40 flex items-center justify-between px-6 py-4"
          style={{
            background: 'rgba(10, 10, 15, 0.9)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(0, 255, 0, 0.08)'
          }}
        >
          <div className="flex items-center gap-4">
            <motion.button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-8 h-8 flex items-center justify-center rounded"
              style={{
                border: '1px solid rgba(0, 255, 0, 0.2)',
                background: 'rgba(0, 255, 0, 0.05)',
                color: '#00FF00',
                cursor: 'pointer',
                fontFamily: "'Fira Code', monospace",
                fontSize: '14px'
              }}
              whileHover={{ background: 'rgba(0, 255, 0, 0.1)' }}
              whileTap={{ scale: 0.9 }}
            >
              {sidebarOpen ? '◁' : '▷'}
            </motion.button>
            <h1
              className="text-sm font-bold"
              style={{ fontFamily: "'Fira Code', monospace", color: '#00FF00' }}
            >
              {activeTab === 'home' ? '// ACTIVITY MATRIX' : '// EDIT WORKSPACE'}
            </h1>
          </div>
          <span
            className="text-[10px]"
            style={{ fontFamily: "'Fira Code', monospace", color: 'rgba(0, 255, 0, 0.3)' }}
          >
            {new Date().toLocaleTimeString()}
          </span>
        </div>

        {/* Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {activeTab === 'home' ? (
              <motion.div
                key="home"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <ActivityMatrix logs={activityLogs} />
              </motion.div>
            ) : (
              <motion.div
                key="workspace"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <EditWorkspace
                  projects={projects}
                  testimonials={testimonials}
                  biographies={biographies}
                  editingBio={editingBio}
                  setEditingBio={setEditingBio}
                  newProject={newProject}
                  setNewProject={setNewProject}
                  newTestimonial={newTestimonial}
                  setNewTestimonial={setNewTestimonial}
                  onAddProject={handleAddProject}
                  onDeleteProject={handleDeleteProject}
                  onAddTestimonial={handleAddTestimonial}
                  onDeleteTestimonial={handleDeleteTestimonial}
                  onUpdateBio={handleUpdateBio}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ============================================
// SUB-COMPONENTS
// ============================================

function SidebarButton({ active, onClick, icon, label, danger }: {
  active?: boolean;
  onClick: () => void;
  icon: string;
  label: string;
  danger?: boolean;
}) {
  return (
    <motion.button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3 rounded text-left text-xs transition-all"
      style={{
        fontFamily: "'Fira Code', monospace",
        background: active ? 'rgba(0, 255, 0, 0.08)' : 'transparent',
        border: active ? '1px solid rgba(0, 255, 0, 0.15)' : '1px solid transparent',
        color: danger ? '#FF006E' : active ? '#00FF00' : 'rgba(0, 255, 0, 0.5)',
        cursor: 'pointer'
      }}
      whileHover={{
        background: danger ? 'rgba(255, 0, 110, 0.05)' : 'rgba(0, 255, 0, 0.05)',
        x: 4
      }}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </motion.button>
  );
}

function ActivityMatrix({ logs }: { logs: ActivityLog[] }) {
  return (
    <div>
      <div className="mb-6">
        <h2
          className="text-lg font-bold mb-1"
          style={{ fontFamily: "'Fira Code', monospace", color: '#00FF00' }}
        >
          Activity Log
        </h2>
        <p
          className="text-xs"
          style={{ fontFamily: "'Fira Code', monospace", color: 'rgba(0, 255, 0, 0.4)' }}
        >
          {logs.length} entries recorded
        </p>
      </div>

      <div
        className="rounded-lg overflow-hidden"
        style={{ border: '1px solid rgba(0, 255, 0, 0.1)' }}
      >
        <table className="w-full text-xs" style={{ fontFamily: "'Fira Code', monospace" }}>
          <thead>
            <tr style={{ background: 'rgba(0, 255, 0, 0.05)' }}>
              <th className="px-4 py-3 text-left" style={{ color: 'rgba(0, 255, 0, 0.6)' }}>Timestamp</th>
              <th className="px-4 py-3 text-left" style={{ color: 'rgba(0, 255, 0, 0.6)' }}>Section</th>
              <th className="px-4 py-3 text-left" style={{ color: 'rgba(0, 255, 0, 0.6)' }}>Persona</th>
              <th className="px-4 py-3 text-left" style={{ color: 'rgba(0, 255, 0, 0.6)' }}>Action</th>
              <th className="px-4 py-3 text-left" style={{ color: 'rgba(0, 255, 0, 0.6)' }}>Description</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center" style={{ color: 'rgba(0, 255, 0, 0.3)' }}>
                  No activity recorded yet.
                </td>
              </tr>
            ) : (
              logs.map((log, i) => (
                <motion.tr
                  key={log.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  style={{ borderTop: '1px solid rgba(0, 255, 0, 0.05)' }}
                >
                  <td className="px-4 py-3" style={{ color: 'rgba(0, 255, 0, 0.5)' }}>
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="px-4 py-3" style={{ color: 'rgba(0, 255, 0, 0.7)' }}>{log.targetSection}</td>
                  <td className="px-4 py-3" style={{ color: 'rgba(0, 255, 0, 0.7)' }}>{log.personaAffected}</td>
                  <td className="px-4 py-3">
                    <span
                      className="px-2 py-1 rounded text-[10px] font-bold"
                      style={{
                        background: log.actionType === 'CREATE' ? 'rgba(0, 255, 0, 0.1)' :
                          log.actionType === 'UPDATE' ? 'rgba(255, 165, 0, 0.1)' :
                          'rgba(255, 0, 110, 0.1)',
                        color: log.actionType === 'CREATE' ? '#00FF00' :
                          log.actionType === 'UPDATE' ? '#FFA500' : '#FF006E',
                        border: `1px solid ${log.actionType === 'CREATE' ? 'rgba(0, 255, 0, 0.2)' :
                          log.actionType === 'UPDATE' ? 'rgba(255, 165, 0, 0.2)' :
                          'rgba(255, 0, 110, 0.2)'}`
                      }}
                    >
                      {log.actionType}
                    </span>
                  </td>
                  <td className="px-4 py-3" style={{ color: 'rgba(0, 255, 0, 0.5)' }}>{log.description}</td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EditWorkspace({
  projects, testimonials, biographies, editingBio, setEditingBio,
  newProject, setNewProject, newTestimonial, setNewTestimonial,
  onAddProject, onDeleteProject, onAddTestimonial, onDeleteTestimonial, onUpdateBio
}: {
  projects: Project[];
  testimonials: Testimonial[];
  biographies: Biography[];
  editingBio: { [key: string]: { pitchTitle: string; bioText: string } };
  setEditingBio: React.Dispatch<React.SetStateAction<{ [key: string]: { pitchTitle: string; bioText: string } }>>;
  newProject: any;
  setNewProject: React.Dispatch<React.SetStateAction<any>>;
  newTestimonial: any;
  setNewTestimonial: React.Dispatch<React.SetStateAction<any>>;
  onAddProject: (e: React.FormEvent) => void;
  onDeleteProject: (id: string) => void;
  onAddTestimonial: (e: React.FormEvent) => void;
  onDeleteTestimonial: (id: string) => void;
  onUpdateBio: (persona: string) => void;
}) {
  const inputStyle = {
    fontFamily: "'Fira Code', monospace",
    background: 'rgba(0, 255, 0, 0.03)',
    border: '1px solid rgba(0, 255, 0, 0.15)',
    color: '#00FF00',
    fontSize: '12px'
  };

  return (
    <div className="space-y-10">
      {/* Biography Editor */}
      <section>
        <h3
          className="text-sm font-bold mb-4"
          style={{ fontFamily: "'Fira Code', monospace", color: '#00FF00' }}
        >
          {'> '}Biographies
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {biographies.map(bio => (
            <div
              key={bio.id}
              className="p-5 rounded-lg"
              style={{ border: '1px solid rgba(0, 255, 0, 0.1)', background: 'rgba(0, 255, 0, 0.02)' }}
            >
              <p
                className="text-[10px] mb-3 uppercase tracking-wider"
                style={{ fontFamily: "'Fira Code', monospace", color: 'rgba(0, 255, 0, 0.4)' }}
              >
                {bio.persona === 'software_engineer' ? '⚡ Engineer' : '✦ Creator'}
              </p>
              <input
                className="w-full px-3 py-2 rounded mb-3 outline-none"
                style={inputStyle}
                value={editingBio[bio.persona]?.pitchTitle || ''}
                onChange={(e) => setEditingBio(prev => ({
                  ...prev,
                  [bio.persona]: { ...prev[bio.persona], pitchTitle: e.target.value }
                }))}
                placeholder="Pitch Title"
              />
              <textarea
                className="w-full px-3 py-2 rounded mb-3 outline-none resize-none"
                style={{ ...inputStyle, minHeight: '80px' }}
                value={editingBio[bio.persona]?.bioText || ''}
                onChange={(e) => setEditingBio(prev => ({
                  ...prev,
                  [bio.persona]: { ...prev[bio.persona], bioText: e.target.value }
                }))}
                placeholder="Biography text"
              />
              <button
                onClick={() => onUpdateBio(bio.persona)}
                className="px-4 py-2 rounded text-[10px] font-bold uppercase tracking-wider"
                style={{
                  fontFamily: "'Fira Code', monospace",
                  background: 'rgba(0, 255, 0, 0.1)',
                  border: '1px solid rgba(0, 255, 0, 0.2)',
                  color: '#00FF00',
                  cursor: 'pointer'
                }}
              >
                Save Changes
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Projects CRUD */}
      <section>
        <h3
          className="text-sm font-bold mb-4"
          style={{ fontFamily: "'Fira Code', monospace", color: '#00FF00' }}
        >
          {'> '}Projects ({projects.length})
        </h3>

        {/* Add form */}
        <form
          onSubmit={onAddProject}
          className="p-5 rounded-lg mb-4"
          style={{ border: '1px solid rgba(0, 255, 0, 0.1)', background: 'rgba(0, 255, 0, 0.02)' }}
        >
          <p
            className="text-[10px] mb-3 uppercase tracking-wider"
            style={{ fontFamily: "'Fira Code', monospace", color: 'rgba(0, 255, 0, 0.4)' }}
          >
            + Add New Project
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <input
              className="px-3 py-2 rounded outline-none"
              style={inputStyle}
              placeholder="Project Name"
              value={newProject.name}
              onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
            />
            <input
              className="px-3 py-2 rounded outline-none"
              style={inputStyle}
              placeholder="Image URL"
              value={newProject.imageUrl}
              onChange={(e) => setNewProject({ ...newProject, imageUrl: e.target.value })}
            />
            <input
              className="px-3 py-2 rounded outline-none"
              style={inputStyle}
              placeholder="Project URL"
              value={newProject.projectUrl}
              onChange={(e) => setNewProject({ ...newProject, projectUrl: e.target.value })}
            />
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-[10px]" style={{ fontFamily: "'Fira Code', monospace", color: 'rgba(0, 255, 0, 0.6)' }}>
                <input
                  type="radio"
                  name="project-persona"
                  checked={newProject.persona === 'software_engineer'}
                  onChange={() => setNewProject({ ...newProject, persona: 'software_engineer' })}
                />
                ⚡ Engineer
              </label>
              <label className="flex items-center gap-2 text-[10px]" style={{ fontFamily: "'Fira Code', monospace", color: 'rgba(0, 255, 0, 0.6)' }}>
                <input
                  type="radio"
                  name="project-persona"
                  checked={newProject.persona === 'content_creator'}
                  onChange={() => setNewProject({ ...newProject, persona: 'content_creator' })}
                />
                ✦ Creator
              </label>
            </div>
          </div>
          <textarea
            className="w-full px-3 py-2 rounded mb-3 outline-none resize-none"
            style={{ ...inputStyle, minHeight: '60px' }}
            placeholder="Description"
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
          />
          <button
            type="submit"
            className="px-4 py-2 rounded text-[10px] font-bold uppercase tracking-wider"
            style={{
              fontFamily: "'Fira Code', monospace",
              background: 'rgba(0, 255, 0, 0.1)',
              border: '1px solid rgba(0, 255, 0, 0.2)',
              color: '#00FF00',
              cursor: 'pointer'
            }}
          >
            + Create Project
          </button>
        </form>

        {/* Project list */}
        <div className="space-y-2">
          {projects.map(project => (
            <div
              key={project.id}
              className="flex items-center justify-between p-3 rounded"
              style={{ border: '1px solid rgba(0, 255, 0, 0.06)', background: 'rgba(0, 255, 0, 0.01)' }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="text-[10px] px-2 py-1 rounded"
                  style={{
                    fontFamily: "'Fira Code', monospace",
                    background: project.persona === 'software_engineer' ? 'rgba(0, 255, 0, 0.1)' : 'rgba(255, 0, 110, 0.1)',
                    color: project.persona === 'software_engineer' ? '#00FF00' : '#FF006E',
                    border: `1px solid ${project.persona === 'software_engineer' ? 'rgba(0, 255, 0, 0.2)' : 'rgba(255, 0, 110, 0.2)'}`
                  }}
                >
                  {project.persona === 'software_engineer' ? '⚡' : '✦'}
                </span>
                <span
                  className="text-xs"
                  style={{ fontFamily: "'Fira Code', monospace", color: 'rgba(0, 255, 0, 0.7)' }}
                >
                  {project.name}
                </span>
              </div>
              <button
                onClick={() => onDeleteProject(project.id)}
                className="w-7 h-7 flex items-center justify-center rounded text-xs"
                style={{
                  background: 'rgba(255, 0, 110, 0.1)',
                  border: '1px solid rgba(255, 0, 110, 0.2)',
                  color: '#FF006E',
                  cursor: 'pointer'
                }}
                title="Delete"
              >
                🗑
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials CRUD */}
      <section>
        <h3
          className="text-sm font-bold mb-4"
          style={{ fontFamily: "'Fira Code', monospace", color: '#00FF00' }}
        >
          {'> '}Testimonials ({testimonials.length})
        </h3>

        {/* Add form */}
        <form
          onSubmit={onAddTestimonial}
          className="p-5 rounded-lg mb-4"
          style={{ border: '1px solid rgba(0, 255, 0, 0.1)', background: 'rgba(0, 255, 0, 0.02)' }}
        >
          <p
            className="text-[10px] mb-3 uppercase tracking-wider"
            style={{ fontFamily: "'Fira Code', monospace", color: 'rgba(0, 255, 0, 0.4)' }}
          >
            + Add New Testimonial
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <input
              className="px-3 py-2 rounded outline-none"
              style={inputStyle}
              placeholder="Client Name"
              value={newTestimonial.clientName}
              onChange={(e) => setNewTestimonial({ ...newTestimonial, clientName: e.target.value })}
            />
            <input
              className="px-3 py-2 rounded outline-none"
              style={inputStyle}
              placeholder="Company"
              value={newTestimonial.company}
              onChange={(e) => setNewTestimonial({ ...newTestimonial, company: e.target.value })}
            />
            <input
              className="px-3 py-2 rounded outline-none"
              style={inputStyle}
              placeholder="Avatar URL"
              value={newTestimonial.clientImageUrl}
              onChange={(e) => setNewTestimonial({ ...newTestimonial, clientImageUrl: e.target.value })}
            />
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-[10px]" style={{ fontFamily: "'Fira Code', monospace", color: 'rgba(0, 255, 0, 0.6)' }}>
                <input
                  type="radio"
                  name="testimonial-persona"
                  checked={newTestimonial.persona === 'software_engineer'}
                  onChange={() => setNewTestimonial({ ...newTestimonial, persona: 'software_engineer' })}
                />
                ⚡ Engineer
              </label>
              <label className="flex items-center gap-2 text-[10px]" style={{ fontFamily: "'Fira Code', monospace", color: 'rgba(0, 255, 0, 0.6)' }}>
                <input
                  type="radio"
                  name="testimonial-persona"
                  checked={newTestimonial.persona === 'content_creator'}
                  onChange={() => setNewTestimonial({ ...newTestimonial, persona: 'content_creator' })}
                />
                ✦ Creator
              </label>
            </div>
          </div>
          <textarea
            className="w-full px-3 py-2 rounded mb-3 outline-none resize-none"
            style={{ ...inputStyle, minHeight: '60px' }}
            placeholder="Review Text"
            value={newTestimonial.reviewText}
            onChange={(e) => setNewTestimonial({ ...newTestimonial, reviewText: e.target.value })}
          />
          <button
            type="submit"
            className="px-4 py-2 rounded text-[10px] font-bold uppercase tracking-wider"
            style={{
              fontFamily: "'Fira Code', monospace",
              background: 'rgba(0, 255, 0, 0.1)',
              border: '1px solid rgba(0, 255, 0, 0.2)',
              color: '#00FF00',
              cursor: 'pointer'
            }}
          >
            + Create Testimonial
          </button>
        </form>

        {/* Testimonial list */}
        <div className="space-y-2">
          {testimonials.map(testimonial => (
            <div
              key={testimonial.id}
              className="flex items-center justify-between p-3 rounded"
              style={{ border: '1px solid rgba(0, 255, 0, 0.06)', background: 'rgba(0, 255, 0, 0.01)' }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="text-[10px] px-2 py-1 rounded"
                  style={{
                    fontFamily: "'Fira Code', monospace",
                    background: testimonial.persona === 'software_engineer' ? 'rgba(0, 255, 0, 0.1)' : 'rgba(255, 0, 110, 0.1)',
                    color: testimonial.persona === 'software_engineer' ? '#00FF00' : '#FF006E',
                    border: `1px solid ${testimonial.persona === 'software_engineer' ? 'rgba(0, 255, 0, 0.2)' : 'rgba(255, 0, 110, 0.2)'}`
                  }}
                >
                  {testimonial.persona === 'software_engineer' ? '⚡' : '✦'}
                </span>
                <span
                  className="text-xs"
                  style={{ fontFamily: "'Fira Code', monospace", color: 'rgba(0, 255, 0, 0.7)' }}
                >
                  {testimonial.clientName} — {testimonial.company}
                </span>
              </div>
              <button
                onClick={() => onDeleteTestimonial(testimonial.id)}
                className="w-7 h-7 flex items-center justify-center rounded text-xs"
                style={{
                  background: 'rgba(255, 0, 110, 0.1)',
                  border: '1px solid rgba(255, 0, 110, 0.2)',
                  color: '#FF006E',
                  cursor: 'pointer'
                }}
                title="Delete"
              >
                🗑
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
