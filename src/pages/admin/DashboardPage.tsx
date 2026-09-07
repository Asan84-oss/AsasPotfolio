import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  isAuthenticated, clearAuthToken,
  getProjects, saveProjects,
  getTestimonials, saveTestimonials,
  getBiographies, saveBiographies,
  getActivityLog, addActivityLog,
  type Project, type Testimonial, type Biography
} from '../../data/mockData';

type Tab = 'dashboard' | 'workspace';

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin/auth');
    }
  }, [navigate]);

  const handleLogout = () => {
    clearAuthToken();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            className="fixed left-0 top-0 h-full w-64 z-50 flex flex-col"
            style={{
              background: 'rgba(10, 10, 15, 0.95)',
              borderRight: '1px solid rgba(0, 255, 0, 0.1)',
              backdropFilter: 'blur(20px)'
            }}
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            exit={{ x: -260 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Sidebar Header */}
            <div className="p-5 border-b" style={{ borderColor: 'rgba(0, 255, 0, 0.08)' }}>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ background: '#00FF00', boxShadow: '0 0 6px rgba(0,255,0,0.5)' }} />
                <span
                  className="text-xs font-bold"
                  style={{ fontFamily: "'Fira Code', monospace", color: '#00FF00' }}
                >
                  ADMIN PANEL
                </span>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              <SidebarLink
                active={activeTab === 'dashboard'}
                onClick={() => setActiveTab('dashboard')}
                icon="◈"
                label="Dashboard Home"
              />
              <SidebarLink
                active={false}
                onClick={() => window.open('/?persona=engineer', '_blank')}
                icon="⚡"
                label="Preview: Engineer"
              />
              <SidebarLink
                active={false}
                onClick={() => window.open('/?persona=creator', '_blank')}
                icon="✦"
                label="Preview: Creator"
              />
              <SidebarLink
                active={activeTab === 'workspace'}
                onClick={() => setActiveTab('workspace')}
                icon="⌘"
                label="Edit Workspace"
              />

              <div className="pt-4 mt-4" style={{ borderTop: '1px solid rgba(0, 255, 0, 0.06)' }}>
                <SidebarLink
                  active={false}
                  onClick={handleLogout}
                  icon="⏻"
                  label="Logout"
                  isDanger
                />
              </div>
            </nav>

            {/* Sidebar Footer */}
            <div className="p-4" style={{ borderTop: '1px solid rgba(0, 255, 0, 0.06)' }}>
              <Link
                to="/"
                className="text-xs"
                style={{ fontFamily: "'Fira Code', monospace", color: 'rgba(0, 255, 0, 0.3)' }}
              >
                ← portfolio
              </Link>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Top Bar */}
        <header
          className="sticky top-0 z-40 px-6 py-4 flex items-center justify-between"
          style={{
            background: 'rgba(10, 10, 15, 0.9)',
            borderBottom: '1px solid rgba(0, 255, 0, 0.08)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <motion.button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-8 h-8 flex items-center justify-center rounded"
            style={{
              border: '1px solid rgba(0, 255, 0, 0.15)',
              color: '#00FF00'
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span style={{ fontFamily: "'Fira Code', monospace", fontSize: '14px' }}>
              {sidebarOpen ? '◁' : '▷'}
            </span>
          </motion.button>

          <h1
            className="text-sm font-bold"
            style={{ fontFamily: "'Fira Code', monospace", color: '#00FF00' }}
          >
            {activeTab === 'dashboard' ? '// Activity Matrix' : '// Edit Workspace'}
          </h1>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#00FF00', boxShadow: '0 0 6px rgba(0,255,0,0.5)' }} />
            <span
              className="text-[10px]"
              style={{ fontFamily: "'Fira Code', monospace", color: 'rgba(0, 255, 0, 0.5)' }}
            >
              ONLINE
            </span>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-6">
          {activeTab === 'dashboard' ? <ActivityMatrix /> : <EditWorkspace />}
        </main>
      </div>
    </div>
  );
}

function SidebarLink({ active, onClick, icon, label, isDanger }: {
  active: boolean;
  onClick: () => void;
  icon: string;
  label: string;
  isDanger?: boolean;
}) {
  return (
    <motion.button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all"
      style={{
        background: active ? 'rgba(0, 255, 0, 0.08)' : 'transparent',
        border: active ? '1px solid rgba(0, 255, 0, 0.15)' : '1px solid transparent',
        color: isDanger ? '#FF006E' : (active ? '#00FF00' : 'rgba(0, 255, 0, 0.5)')
      }}
      whileHover={{ x: 4, background: 'rgba(0, 255, 0, 0.05)' }}
    >
      <span style={{ fontFamily: "'Fira Code', monospace", fontSize: '12px' }}>{icon}</span>
      <span style={{ fontFamily: "'Fira Code', monospace", fontSize: '11px' }}>{label}</span>
    </motion.button>
  );
}

function ActivityMatrix() {
  const logs = getActivityLog();

  return (
    <div>
      <div className="mb-6">
        <h2
          className="text-lg font-bold mb-2"
          style={{ fontFamily: "'Fira Code', monospace", color: '#00FF00' }}
        >
          {'// Activity Log'}
        </h2>
        <p
          className="text-xs"
          style={{ fontFamily: "'Fira Code', monospace", color: 'rgba(0, 255, 0, 0.4)' }}
        >
          {logs.length === 0 ? 'No activity recorded yet. Start editing to see logs here.' : `${logs.length} entries recorded`}
        </p>
      </div>

      {logs.length > 0 ? (
        <div
          className="rounded-xl overflow-hidden"
          style={{
            border: '1px solid rgba(0, 255, 0, 0.1)',
            background: 'rgba(10, 10, 15, 0.5)'
          }}
        >
          {/* Table Header */}
          <div
            className="grid grid-cols-5 gap-4 px-4 py-3 text-[10px] uppercase tracking-wider"
            style={{
              fontFamily: "'Fira Code', monospace",
              color: 'rgba(0, 255, 0, 0.5)',
              borderBottom: '1px solid rgba(0, 255, 0, 0.08)',
              background: 'rgba(0, 255, 0, 0.02)'
            }}
          >
            <span>Timestamp</span>
            <span>Section</span>
            <span>Persona</span>
            <span>Action</span>
            <span>Description</span>
          </div>

          {/* Table Rows */}
          {logs.map((log, i) => (
            <motion.div
              key={log.id}
              className="grid grid-cols-5 gap-4 px-4 py-3 text-xs"
              style={{
                fontFamily: "'Fira Code', monospace",
                color: 'rgba(0, 255, 0, 0.6)',
                borderBottom: i < logs.length - 1 ? '1px solid rgba(0, 255, 0, 0.04)' : 'none'
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <span className="truncate">{new Date(log.timestamp).toLocaleString()}</span>
              <span>{log.targetSection}</span>
              <span
                style={{
                  color: log.personaAffected === 'engineer' ? '#00FF00' : '#FF006E'
                }}
              >
                {log.personaAffected}
              </span>
              <span>
                <span
                  className="px-2 py-0.5 rounded text-[10px]"
                  style={{
                    background: log.actionType === 'CREATE' ? 'rgba(0, 255, 0, 0.1)' :
                      log.actionType === 'UPDATE' ? 'rgba(255, 200, 0, 0.1)' :
                        'rgba(255, 0, 110, 0.1)',
                    color: log.actionType === 'CREATE' ? '#00FF00' :
                      log.actionType === 'UPDATE' ? '#FFD700' : '#FF006E',
                    border: `1px solid ${log.actionType === 'CREATE' ? 'rgba(0,255,0,0.2)' :
                      log.actionType === 'UPDATE' ? 'rgba(255,200,0,0.2)' : 'rgba(255,0,110,0.2)'}`
                  }}
                >
                  {log.actionType}
                </span>
              </span>
              <span className="truncate">{log.description}</span>
            </motion.div>
          ))}
        </div>
      ) : (
        <div
          className="p-12 rounded-xl text-center"
          style={{
            border: '1px solid rgba(0, 255, 0, 0.06)',
            background: 'rgba(10, 10, 15, 0.3)'
          }}
        >
          <p
            className="text-sm"
            style={{ fontFamily: "'Fira Code', monospace", color: 'rgba(0, 255, 0, 0.3)' }}
          >
            {'// No activity yet. Navigate to Edit Workspace to begin.'}
          </p>
        </div>
      )}
    </div>
  );
}

function EditWorkspace() {
  const [projects, setProjects] = useState<Project[]>(getProjects());
  const [testimonials, setTestimonials] = useState<Testimonial[]>(getTestimonials());
  const [biographies, setBiographies] = useState<Biography[]>(getBiographies());
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);

  // Project form state
  const [newProject, setNewProject] = useState<Partial<Project>>({
    persona: 'software_engineer',
    name: '',
    imageUrl: '',
    projectUrl: '',
    description: ''
  });

  // Testimonial form state
  const [newTestimonial, setNewTestimonial] = useState<Partial<Testimonial>>({
    persona: 'software_engineer',
    clientName: '',
    clientImageUrl: '',
    reviewText: '',
    company: ''
  });

  // Biography edit state
  const [editingBio, setEditingBio] = useState<string | null>(null);
  const [bioEditText, setBioEditText] = useState('');
  const [bioEditTitle, setBioEditTitle] = useState('');

  const handleAddProject = () => {
    if (!newProject.name || !newProject.description) return;
    const project: Project = {
      id: crypto.randomUUID(),
      persona: newProject.persona as 'software_engineer' | 'content_creator',
      name: newProject.name!,
      imageUrl: newProject.imageUrl || 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop',
      projectUrl: newProject.projectUrl || '#',
      description: newProject.description!,
      createdAt: new Date().toISOString().split('T')[0]
    };
    const updated = [...projects, project];
    setProjects(updated);
    saveProjects(updated);
    addActivityLog({
      targetSection: 'Projects',
      personaAffected: project.persona === 'software_engineer' ? 'engineer' : 'creator',
      actionType: 'CREATE',
      description: `Created project: "${project.name}"`
    });
    setNewProject({ persona: 'software_engineer', name: '', imageUrl: '', projectUrl: '', description: '' });
    setShowProjectForm(false);
  };

  const handleDeleteProject = (id: string) => {
    const project = projects.find(p => p.id === id);
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated);
    saveProjects(updated);
    addActivityLog({
      targetSection: 'Projects',
      personaAffected: project?.persona === 'software_engineer' ? 'engineer' : 'creator',
      actionType: 'DELETE',
      description: `Deleted project: "${project?.name}"`
    });
  };

  const handleAddTestimonial = () => {
    if (!newTestimonial.clientName || !newTestimonial.reviewText) return;
    const testimonial: Testimonial = {
      id: crypto.randomUUID(),
      persona: newTestimonial.persona as 'software_engineer' | 'content_creator',
      clientName: newTestimonial.clientName!,
      clientImageUrl: newTestimonial.clientImageUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      reviewText: newTestimonial.reviewText!,
      company: newTestimonial.company || 'Independent'
    };
    const updated = [...testimonials, testimonial];
    setTestimonials(updated);
    saveTestimonials(updated);
    addActivityLog({
      targetSection: 'Testimonials',
      personaAffected: testimonial.persona === 'software_engineer' ? 'engineer' : 'creator',
      actionType: 'CREATE',
      description: `Added testimonial from: "${testimonial.clientName}"`
    });
    setNewTestimonial({ persona: 'software_engineer', clientName: '', clientImageUrl: '', reviewText: '', company: '' });
    setShowTestimonialForm(false);
  };

  const handleDeleteTestimonial = (id: string) => {
    const testimonial = testimonials.find(t => t.id === id);
    const updated = testimonials.filter(t => t.id !== id);
    setTestimonials(updated);
    saveTestimonials(updated);
    addActivityLog({
      targetSection: 'Testimonials',
      personaAffected: testimonial?.persona === 'software_engineer' ? 'engineer' : 'creator',
      actionType: 'DELETE',
      description: `Deleted testimonial from: "${testimonial?.clientName}"`
    });
  };

  const handleSaveBio = (id: string) => {
    const updated = biographies.map(b =>
      b.id === id ? { ...b, pitchTitle: bioEditTitle, bioText: bioEditText } : b
    );
    setBiographies(updated);
    saveBiographies(updated);
    const bio = updated.find(b => b.id === id);
    addActivityLog({
      targetSection: 'Biography',
      personaAffected: bio?.persona === 'software_engineer' ? 'engineer' : 'creator',
      actionType: 'UPDATE',
      description: `Updated biography pitch for ${bio?.persona}`
    });
    setEditingBio(null);
  };

  return (
    <div className="space-y-10">
      {/* Biography Section */}
      <section>
        <h2
          className="text-lg font-bold mb-4"
          style={{ fontFamily: "'Fira Code', monospace", color: '#00FF00' }}
        >
          {'// Hero Pitch & Biographies'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {biographies.map((bio) => (
            <div
              key={bio.id}
              className="p-5 rounded-xl"
              style={{
                background: 'rgba(10, 10, 15, 0.5)',
                border: '1px solid rgba(0, 255, 0, 0.1)'
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className="text-xs px-2 py-1 rounded"
                  style={{
                    fontFamily: "'Fira Code', monospace",
                    background: bio.persona === 'software_engineer' ? 'rgba(0,255,0,0.1)' : 'rgba(255,0,110,0.1)',
                    color: bio.persona === 'software_engineer' ? '#00FF00' : '#FF006E',
                    border: `1px solid ${bio.persona === 'software_engineer' ? 'rgba(0,255,0,0.2)' : 'rgba(255,0,110,0.2)'}`
                  }}
                >
                  {bio.persona === 'software_engineer' ? 'Engineer' : 'Creator'}
                </span>
                {editingBio === bio.id ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSaveBio(bio.id)}
                      className="text-[10px] px-2 py-1 rounded"
                      style={{
                        fontFamily: "'Fira Code', monospace",
                        background: 'rgba(0,255,0,0.1)',
                        color: '#00FF00',
                        border: '1px solid rgba(0,255,0,0.2)'
                      }}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingBio(null)}
                      className="text-[10px] px-2 py-1 rounded"
                      style={{
                        fontFamily: "'Fira Code', monospace",
                        background: 'rgba(255,0,110,0.1)',
                        color: '#FF006E',
                        border: '1px solid rgba(255,0,110,0.2)'
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setEditingBio(bio.id);
                      setBioEditTitle(bio.pitchTitle);
                      setBioEditText(bio.bioText);
                    }}
                    className="text-[10px] px-2 py-1 rounded"
                    style={{
                      fontFamily: "'Fira Code', monospace",
                      background: 'rgba(0,255,0,0.05)',
                      color: 'rgba(0,255,0,0.6)',
                      border: '1px solid rgba(0,255,0,0.1)'
                    }}
                  >
                    Edit
                  </button>
                )}
              </div>
              {editingBio === bio.id ? (
                <div className="space-y-3">
                  <input
                    value={bioEditTitle}
                    onChange={(e) => setBioEditTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded text-xs"
                    style={{
                      fontFamily: "'Fira Code', monospace",
                      background: 'rgba(0,255,0,0.03)',
                      border: '1px solid rgba(0,255,0,0.15)',
                      color: '#00FF00'
                    }}
                    placeholder="Pitch Title"
                  />
                  <textarea
                    value={bioEditText}
                    onChange={(e) => setBioEditText(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 rounded text-xs resize-none"
                    style={{
                      fontFamily: "'Fira Code', monospace",
                      background: 'rgba(0,255,0,0.03)',
                      border: '1px solid rgba(0,255,0,0.15)',
                      color: '#00FF00'
                    }}
                    placeholder="Bio Text"
                  />
                </div>
              ) : (
                <>
                  <h4
                    className="text-sm font-bold mb-2"
                    style={{ fontFamily: "'Fira Code', monospace", color: '#00FF00' }}
                  >
                    {bio.pitchTitle}
                  </h4>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ fontFamily: "'Fira Code', monospace", color: 'rgba(0,255,0,0.5)' }}
                  >
                    {bio.bioText}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Projects CRUD */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2
            className="text-lg font-bold"
            style={{ fontFamily: "'Fira Code', monospace", color: '#00FF00' }}
          >
            {'// Projects CRUD'}
          </h2>
          <motion.button
            onClick={() => setShowProjectForm(!showProjectForm)}
            className="text-xs px-4 py-2 rounded"
            style={{
              fontFamily: "'Fira Code', monospace",
              background: 'rgba(0,255,0,0.05)',
              color: '#00FF00',
              border: '1px solid rgba(0,255,0,0.2)'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showProjectForm ? 'Cancel' : '+ Add Project'}
          </motion.button>
        </div>

        {/* Add Project Form */}
        <AnimatePresence>
          {showProjectForm && (
            <motion.div
              className="p-5 rounded-xl mb-4"
              style={{
                background: 'rgba(10, 10, 15, 0.5)',
                border: '1px solid rgba(0, 255, 0, 0.15)'
              }}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="md:col-span-2">
                  <label className="text-[10px] mb-1 block" style={{ fontFamily: "'Fira Code', monospace", color: 'rgba(0,255,0,0.4)' }}>Persona:</label>
                  <div className="flex gap-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={newProject.persona === 'software_engineer'}
                        onChange={() => setNewProject({ ...newProject, persona: 'software_engineer' })}
                        className="accent-green-400"
                      />
                      <span className="text-xs" style={{ fontFamily: "'Fira Code', monospace", color: '#00FF00' }}>Engineer</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={newProject.persona === 'content_creator'}
                        onChange={() => setNewProject({ ...newProject, persona: 'content_creator' })}
                        className="accent-pink-400"
                      />
                      <span className="text-xs" style={{ fontFamily: "'Fira Code', monospace", color: '#FF006E' }}>Creator</span>
                    </label>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="text-[10px] mb-1 block" style={{ fontFamily: "'Fira Code', monospace", color: 'rgba(0,255,0,0.4)' }}>Name:</label>
                  <input
                    value={newProject.name}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                    className="w-full px-3 py-2 rounded text-xs"
                    style={{ fontFamily: "'Fira Code', monospace", background: 'rgba(0,255,0,0.03)', border: '1px solid rgba(0,255,0,0.15)', color: '#00FF00' }}
                    placeholder="Project name"
                  />
                </div>
                <div>
                  <label className="text-[10px] mb-1 block" style={{ fontFamily: "'Fira Code', monospace", color: 'rgba(0,255,0,0.4)' }}>Image URL:</label>
                  <input
                    value={newProject.imageUrl}
                    onChange={(e) => setNewProject({ ...newProject, imageUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded text-xs"
                    style={{ fontFamily: "'Fira Code', monospace", background: 'rgba(0,255,0,0.03)', border: '1px solid rgba(0,255,0,0.15)', color: '#00FF00' }}
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="text-[10px] mb-1 block" style={{ fontFamily: "'Fira Code', monospace", color: 'rgba(0,255,0,0.4)' }}>Project URL:</label>
                  <input
                    value={newProject.projectUrl}
                    onChange={(e) => setNewProject({ ...newProject, projectUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded text-xs"
                    style={{ fontFamily: "'Fira Code', monospace", background: 'rgba(0,255,0,0.03)', border: '1px solid rgba(0,255,0,0.15)', color: '#00FF00' }}
                    placeholder="https://..."
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-[10px] mb-1 block" style={{ fontFamily: "'Fira Code', monospace", color: 'rgba(0,255,0,0.4)' }}>Description:</label>
                  <textarea
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 rounded text-xs resize-none"
                    style={{ fontFamily: "'Fira Code', monospace", background: 'rgba(0,255,0,0.03)', border: '1px solid rgba(0,255,0,0.15)', color: '#00FF00' }}
                    placeholder="Project description..."
                  />
                </div>
              </div>
              <motion.button
                onClick={handleAddProject}
                className="mt-4 px-6 py-2 rounded text-xs font-bold"
                style={{
                  fontFamily: "'Fira Code', monospace",
                  background: 'rgba(0,255,0,0.1)',
                  color: '#00FF00',
                  border: '1px solid rgba(0,255,0,0.3)'
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                $ create_project
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Projects List */}
        <div className="space-y-2">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between p-4 rounded-lg"
              style={{
                background: 'rgba(10, 10, 15, 0.4)',
                border: '1px solid rgba(0, 255, 0, 0.06)'
              }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="text-[10px] px-2 py-0.5 rounded"
                  style={{
                    fontFamily: "'Fira Code', monospace",
                    background: project.persona === 'software_engineer' ? 'rgba(0,255,0,0.1)' : 'rgba(255,0,110,0.1)',
                    color: project.persona === 'software_engineer' ? '#00FF00' : '#FF006E',
                    border: `1px solid ${project.persona === 'software_engineer' ? 'rgba(0,255,0,0.2)' : 'rgba(255,0,110,0.2)'}`
                  }}
                >
                  {project.persona === 'software_engineer' ? 'ENG' : 'CRE'}
                </span>
                <span
                  className="text-xs truncate max-w-xs"
                  style={{ fontFamily: "'Fira Code', monospace", color: 'rgba(0,255,0,0.7)' }}
                >
                  {project.name}
                </span>
              </div>
              <motion.button
                onClick={() => handleDeleteProject(project.id)}
                className="w-7 h-7 flex items-center justify-center rounded text-sm"
                style={{
                  color: '#FF006E',
                  background: 'rgba(255,0,110,0.05)',
                  border: '1px solid rgba(255,0,110,0.15)'
                }}
                whileHover={{ scale: 1.2, background: 'rgba(255,0,110,0.15)' }}
                whileTap={{ scale: 0.8 }}
                title="Delete project"
              >
                🗑
              </motion.button>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials CRUD */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2
            className="text-lg font-bold"
            style={{ fontFamily: "'Fira Code', monospace", color: '#00FF00' }}
          >
            {'// Testimonials CRUD'}
          </h2>
          <motion.button
            onClick={() => setShowTestimonialForm(!showTestimonialForm)}
            className="text-xs px-4 py-2 rounded"
            style={{
              fontFamily: "'Fira Code', monospace",
              background: 'rgba(0,255,0,0.05)',
              color: '#00FF00',
              border: '1px solid rgba(0,255,0,0.2)'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showTestimonialForm ? 'Cancel' : '+ Add Testimonial'}
          </motion.button>
        </div>

        {/* Add Testimonial Form */}
        <AnimatePresence>
          {showTestimonialForm && (
            <motion.div
              className="p-5 rounded-xl mb-4"
              style={{
                background: 'rgba(10, 10, 15, 0.5)',
                border: '1px solid rgba(0, 255, 0, 0.15)'
              }}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="md:col-span-2">
                  <label className="text-[10px] mb-1 block" style={{ fontFamily: "'Fira Code', monospace", color: 'rgba(0,255,0,0.4)' }}>Persona:</label>
                  <div className="flex gap-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={newTestimonial.persona === 'software_engineer'}
                        onChange={() => setNewTestimonial({ ...newTestimonial, persona: 'software_engineer' })}
                        className="accent-green-400"
                      />
                      <span className="text-xs" style={{ fontFamily: "'Fira Code', monospace", color: '#00FF00' }}>Engineer</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={newTestimonial.persona === 'content_creator'}
                        onChange={() => setNewTestimonial({ ...newTestimonial, persona: 'content_creator' })}
                        className="accent-pink-400"
                      />
                      <span className="text-xs" style={{ fontFamily: "'Fira Code', monospace", color: '#FF006E' }}>Creator</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="text-[10px] mb-1 block" style={{ fontFamily: "'Fira Code', monospace", color: 'rgba(0,255,0,0.4)' }}>Client Name:</label>
                  <input
                    value={newTestimonial.clientName}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, clientName: e.target.value })}
                    className="w-full px-3 py-2 rounded text-xs"
                    style={{ fontFamily: "'Fira Code', monospace", background: 'rgba(0,255,0,0.03)', border: '1px solid rgba(0,255,0,0.15)', color: '#00FF00' }}
                    placeholder="Client name"
                  />
                </div>
                <div>
                  <label className="text-[10px] mb-1 block" style={{ fontFamily: "'Fira Code', monospace", color: 'rgba(0,255,0,0.4)' }}>Company:</label>
                  <input
                    value={newTestimonial.company}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, company: e.target.value })}
                    className="w-full px-3 py-2 rounded text-xs"
                    style={{ fontFamily: "'Fira Code', monospace", background: 'rgba(0,255,0,0.03)', border: '1px solid rgba(0,255,0,0.15)', color: '#00FF00' }}
                    placeholder="Company name"
                  />
                </div>
                <div>
                  <label className="text-[10px] mb-1 block" style={{ fontFamily: "'Fira Code', monospace", color: 'rgba(0,255,0,0.4)' }}>Avatar URL:</label>
                  <input
                    value={newTestimonial.clientImageUrl}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, clientImageUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded text-xs"
                    style={{ fontFamily: "'Fira Code', monospace", background: 'rgba(0,255,0,0.03)', border: '1px solid rgba(0,255,0,0.15)', color: '#00FF00' }}
                    placeholder="https://..."
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-[10px] mb-1 block" style={{ fontFamily: "'Fira Code', monospace", color: 'rgba(0,255,0,0.4)' }}>Review:</label>
                  <textarea
                    value={newTestimonial.reviewText}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, reviewText: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 rounded text-xs resize-none"
                    style={{ fontFamily: "'Fira Code', monospace", background: 'rgba(0,255,0,0.03)', border: '1px solid rgba(0,255,0,0.15)', color: '#00FF00' }}
                    placeholder="Client review..."
                  />
                </div>
              </div>
              <motion.button
                onClick={handleAddTestimonial}
                className="mt-4 px-6 py-2 rounded text-xs font-bold"
                style={{
                  fontFamily: "'Fira Code', monospace",
                  background: 'rgba(0,255,0,0.1)',
                  color: '#00FF00',
                  border: '1px solid rgba(0,255,0,0.3)'
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                $ create_testimonial
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Testimonials List */}
        <div className="space-y-2">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex items-center justify-between p-4 rounded-lg"
              style={{
                background: 'rgba(10, 10, 15, 0.4)',
                border: '1px solid rgba(0, 255, 0, 0.06)'
              }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="text-[10px] px-2 py-0.5 rounded"
                  style={{
                    fontFamily: "'Fira Code', monospace",
                    background: testimonial.persona === 'software_engineer' ? 'rgba(0,255,0,0.1)' : 'rgba(255,0,110,0.1)',
                    color: testimonial.persona === 'software_engineer' ? '#00FF00' : '#FF006E',
                    border: `1px solid ${testimonial.persona === 'software_engineer' ? 'rgba(0,255,0,0.2)' : 'rgba(255,0,110,0.2)'}`
                  }}
                >
                  {testimonial.persona === 'software_engineer' ? 'ENG' : 'CRE'}
                </span>
                <span
                  className="text-xs truncate max-w-xs"
                  style={{ fontFamily: "'Fira Code', monospace", color: 'rgba(0,255,0,0.7)' }}
                >
                  {testimonial.clientName} — {testimonial.company}
                </span>
              </div>
              <motion.button
                onClick={() => handleDeleteTestimonial(testimonial.id)}
                className="w-7 h-7 flex items-center justify-center rounded text-sm"
                style={{
                  color: '#FF006E',
                  background: 'rgba(255,0,110,0.05)',
                  border: '1px solid rgba(255,0,110,0.15)'
                }}
                whileHover={{ scale: 1.2, background: 'rgba(255,0,110,0.15)' }}
                whileTap={{ scale: 0.8 }}
                title="Delete testimonial"
              >
                🗑
              </motion.button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
