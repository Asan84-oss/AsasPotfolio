/**
 * CRUD TEST SUITE
 * __backend_tests__/crud.test.ts
 * 
 * Validates:
 * 1. Project creation and deletion
 * 2. Cross-persona tag filtering
 * 3. Testimonial CRUD operations
 * 4. Activity log recording
 */

// ============================================
// TEST FRAMEWORK
// ============================================

interface TestResult {
  name: string;
  passed: boolean;
  message: string;
  timestamp: string;
}

const results: TestResult[] = [];

function assert(condition: boolean, testName: string, failMessage: string) {
  if (condition) {
    results.push({ name: testName, passed: true, message: '✓ PASS', timestamp: new Date().toISOString() });
  } else {
    results.push({ name: testName, passed: false, message: `✗ FAIL: ${failMessage}`, timestamp: new Date().toISOString() });
  }
}

// ============================================
// MOCK DATABASE (isolated state)
// ============================================

interface Project {
  id: string;
  persona: 'software_engineer' | 'content_creator';
  name: string;
  imageUrl: string;
  projectUrl: string;
  description: string;
  createdAt: string;
}

interface Testimonial {
  id: string;
  persona: 'software_engineer' | 'content_creator';
  clientName: string;
  clientImageUrl: string;
  reviewText: string;
  company: string;
}

interface ActivityLog {
  id: string;
  timestamp: string;
  targetSection: string;
  personaAffected: string;
  actionType: 'CREATE' | 'UPDATE' | 'DELETE';
  description: string;
}

let mockProjects: Project[] = [];
let mockTestimonials: Testimonial[] = [];
let mockActivityLog: ActivityLog[] = [];

let idCounter = 0;
function generateId(prefix: string): string {
  idCounter++;
  return `${prefix}-${idCounter}`;
}

const mockDb = {
  projects: {
    getAll: () => [...mockProjects],
    getByPersona: (persona: string) => mockProjects.filter(p => p.persona === persona),
    create: (data: Omit<Project, 'id' | 'createdAt'>): Project => {
      const project: Project = {
        ...data,
        id: generateId('proj'),
        createdAt: new Date().toISOString().split('T')[0]
      };
      mockProjects.push(project);
      mockActivityLog.push({
        id: generateId('log'),
        timestamp: new Date().toISOString(),
        targetSection: 'Projects',
        personaAffected: data.persona,
        actionType: 'CREATE',
        description: `Created project: "${data.name}"`
      });
      return project;
    },
    delete: (id: string): void => {
      const project = mockProjects.find(p => p.id === id);
      mockProjects = mockProjects.filter(p => p.id !== id);
      if (project) {
        mockActivityLog.push({
          id: generateId('log'),
          timestamp: new Date().toISOString(),
          targetSection: 'Projects',
          personaAffected: project.persona,
          actionType: 'DELETE',
          description: `Deleted project: "${project.name}"`
        });
      }
    }
  },
  testimonials: {
    getAll: () => [...mockTestimonials],
    getByPersona: (persona: string) => mockTestimonials.filter(t => t.persona === persona),
    create: (data: Omit<Testimonial, 'id'>): Testimonial => {
      const testimonial: Testimonial = { ...data, id: generateId('test') };
      mockTestimonials.push(testimonial);
      mockActivityLog.push({
        id: generateId('log'),
        timestamp: new Date().toISOString(),
        targetSection: 'Testimonials',
        personaAffected: data.persona,
        actionType: 'CREATE',
        description: `Added testimonial from: "${data.clientName}"`
      });
      return testimonial;
    },
    delete: (id: string): void => {
      const testimonial = mockTestimonials.find(t => t.id === id);
      mockTestimonials = mockTestimonials.filter(t => t.id !== id);
      if (testimonial) {
        mockActivityLog.push({
          id: generateId('log'),
          timestamp: new Date().toISOString(),
          targetSection: 'Testimonials',
          personaAffected: testimonial.persona,
          actionType: 'DELETE',
          description: `Deleted testimonial from: "${testimonial.clientName}"`
        });
      }
    }
  },
  activityLog: {
    getAll: () => [...mockActivityLog]
  }
};

// ============================================
// TEST CASES
// ============================================

function runCrudTests() {
  console.log('\n========================================');
  console.log('  CRUD TEST SUITE — Starting...');
  console.log('========================================\n');

  // Reset state
  mockProjects = [];
  mockTestimonials = [];
  mockActivityLog = [];
  idCounter = 0;

  // ---- PROJECT TESTS ----

  // TEST 1: Create an engineer project
  const engProject = mockDb.projects.create({
    persona: 'software_engineer',
    name: 'Test API Server',
    imageUrl: 'https://example.com/img.jpg',
    projectUrl: 'https://example.com',
    description: 'A test Node.js API server'
  });
  assert(engProject.id !== undefined, 'Engineer project created with ID', 'Should have an ID');
  assert(engProject.persona === 'software_engineer', 'Engineer project has correct persona', `Expected software_engineer, got ${engProject.persona}`);
  assert(engProject.name === 'Test API Server', 'Engineer project has correct name', `Expected "Test API Server", got "${engProject.name}"`);

  // TEST 2: Create a creator project
  const creatorProject = mockDb.projects.create({
    persona: 'content_creator',
    name: 'Viral TikTok Campaign',
    imageUrl: 'https://example.com/tiktok.jpg',
    projectUrl: 'https://tiktok.com/test',
    description: 'A viral content campaign'
  });
  assert(creatorProject.persona === 'content_creator', 'Creator project has correct persona', `Expected content_creator, got ${creatorProject.persona}`);

  // TEST 3: Cross-Persona Tag Filtering — CRITICAL TEST
  const engineerProjects = mockDb.projects.getByPersona('software_engineer');
  const creatorProjects = mockDb.projects.getByPersona('content_creator');

  assert(
    engineerProjects.length === 1,
    'Engineer view shows ONLY engineer projects',
    `Expected 1 engineer project, got ${engineerProjects.length}`
  );
  assert(
    creatorProjects.length === 1,
    'Creator view shows ONLY creator projects',
    `Expected 1 creator project, got ${creatorProjects.length}`
  );

  // TEST 4: Verify cross-persona isolation
  const engineerViewHasCreatorProject = engineerProjects.some(p => p.persona === 'content_creator');
  assert(
    engineerViewHasCreatorProject === false,
    'Content creator project does NOT render in engineer view',
    'Cross-persona leak detected!'
  );

  const creatorViewHasEngineerProject = creatorProjects.some(p => p.persona === 'software_engineer');
  assert(
    creatorViewHasEngineerProject === false,
    'Engineer project does NOT render in creator view',
    'Cross-persona leak detected!'
  );

  // TEST 5: getAll returns all projects
  const allProjects = mockDb.projects.getAll();
  assert(allProjects.length === 2, 'getAll returns all projects regardless of persona', `Expected 2, got ${allProjects.length}`);

  // TEST 6: Delete project
  mockDb.projects.delete(engProject.id);
  const afterDelete = mockDb.projects.getAll();
  assert(afterDelete.length === 1, 'Project deleted successfully', `Expected 1 after delete, got ${afterDelete.length}`);
  assert(
    afterDelete[0].id === creatorProject.id,
    'Correct project was deleted',
    'Wrong project was deleted'
  );

  // ---- TESTIMONIAL TESTS ----

  // TEST 7: Create testimonial
  const testimonial = mockDb.testimonials.create({
    persona: 'software_engineer',
    clientName: 'John Doe',
    clientImageUrl: 'https://example.com/avatar.jpg',
    reviewText: 'Great work!',
    company: 'Test Corp'
  });
  assert(testimonial.id !== undefined, 'Testimonial created with ID', 'Should have an ID');
  assert(testimonial.clientName === 'John Doe', 'Testimonial has correct client name', `Expected "John Doe", got "${testimonial.clientName}"`);

  // TEST 8: Testimonial persona filtering
  const engTestimonials = mockDb.testimonials.getByPersona('software_engineer');
  const creatTestimonials = mockDb.testimonials.getByPersona('content_creator');
  assert(engTestimonials.length === 1, 'Engineer testimonials filtered correctly', `Expected 1, got ${engTestimonials.length}`);
  assert(creatTestimonials.length === 0, 'Creator testimonials empty (no creator testimonials added)', `Expected 0, got ${creatTestimonials.length}`);

  // TEST 9: Delete testimonial
  mockDb.testimonials.delete(testimonial.id);
  assert(mockDb.testimonials.getAll().length === 0, 'Testimonial deleted successfully', 'Should be empty after delete');

  // ---- ACTIVITY LOG TESTS ----

  // TEST 10: Activity log records all actions
  const logs = mockDb.activityLog.getAll();
  assert(logs.length >= 4, 'Activity log records all CRUD operations', `Expected at least 4 logs, got ${logs.length}`);

  // TEST 11: Activity log has correct action types
  const createLogs = logs.filter(l => l.actionType === 'CREATE');
  const deleteLogs = logs.filter(l => l.actionType === 'DELETE');
  assert(createLogs.length >= 3, 'CREATE actions logged', `Expected at least 3 CREATE logs, got ${createLogs.length}`);
  assert(deleteLogs.length >= 2, 'DELETE actions logged', `Expected at least 2 DELETE logs, got ${deleteLogs.length}`);

  // TEST 12: Activity log has timestamps
  const allHaveTimestamps = logs.every(l => l.timestamp !== undefined && l.timestamp.length > 0);
  assert(allHaveTimestamps, 'All activity logs have timestamps', 'Some logs missing timestamps');

  // Print results
  printResults();
}

function printResults() {
  console.log('\n--- RESULTS ---\n');
  let passed = 0;
  let failed = 0;

  results.forEach(r => {
    console.log(`  ${r.message}  ${r.name}`);
    if (r.passed) passed++;
    else failed++;
  });

  console.log(`\n  Total: ${results.length} | Passed: ${passed} | Failed: ${failed}`);
  console.log('\n========================================\n');
}

// Execute
runCrudTests();

export { results, runCrudTests };
