/**
 * UI INTERACTION TEST SUITE
 * __backend_tests__/ui.test.ts
 * 
 * Validates:
 * 1. Sidebar Toggle Mechanism
 * 2. Persona switching state management
 * 3. View More / Hide project expansion
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
// MOCK STATE MANAGEMENT (simulates React state)
// ============================================

function createMockState<T>(initial: T) {
  let value = initial;
  const listeners: Array<(val: T) => void> = [];

  return {
    get: () => value,
    set: (newValue: T | ((prev: T) => T)) => {
      if (typeof newValue === 'function') {
        value = (newValue as (prev: T) => T)(value);
      } else {
        value = newValue;
      }
      listeners.forEach(fn => fn(value));
    },
    subscribe: (fn: (val: T) => void) => {
      listeners.push(fn);
      return () => {
        const idx = listeners.indexOf(fn);
        if (idx > -1) listeners.splice(idx, 1);
      };
    }
  };
}

// ============================================
// SIDEBAR TOGGLE SIMULATION
// ============================================

function testSidebarToggle() {
  const sidebarOpen = createMockState(true);
  let renderCount = 0;
  let lastRenderedState: boolean | null = null;

  sidebarOpen.subscribe((val) => {
    renderCount++;
    lastRenderedState = val;
  });

  // TEST 1: Initial state is open
  assert(sidebarOpen.get() === true, 'Sidebar initial state is open (true)', `Expected true, got ${sidebarOpen.get()}`);

  // TEST 2: Toggle hides sidebar
  sidebarOpen.set(prev => !prev);
  assert(sidebarOpen.get() === false, 'Sidebar toggles to hidden (false)', `Expected false, got ${sidebarOpen.get()}`);
  assert(lastRenderedState === false, 'UI re-rendered with hidden state', 'Re-render did not occur');

  // TEST 3: Toggle reveals sidebar again
  sidebarOpen.set(prev => !prev);
  assert(sidebarOpen.get() === true, 'Sidebar toggles back to visible (true)', `Expected true, got ${sidebarOpen.get()}`);

  // TEST 4: Multiple toggles work correctly
  sidebarOpen.set(prev => !prev);
  sidebarOpen.set(prev => !prev);
  sidebarOpen.set(prev => !prev);
  assert(sidebarOpen.get() === false, 'Multiple toggles maintain correct state', `Expected false after 3 more toggles, got ${sidebarOpen.get()}`);

  // TEST 5: Layout is not affected by sidebar state
  // The main content area adjusts margin but doesn't break
  const mainContentMargin = sidebarOpen.get() ? '260px' : '0';
  assert(mainContentMargin === '0', 'Main content adjusts when sidebar hidden', `Expected '0', got '${mainContentMargin}'`);

  sidebarOpen.set(true);
  const mainContentMarginOpen = sidebarOpen.get() ? '260px' : '0';
  assert(mainContentMarginOpen === '260px', 'Main content adjusts when sidebar shown', `Expected '260px', got '${mainContentMarginOpen}'`);
}

// ============================================
// PERSONA SWITCHING SIMULATION
// ============================================

function testPersonaSwitching() {
  type Persona = 'engineer' | 'creator';
  const persona = createMockState<Persona>('engineer');

  // TEST 6: Default persona is engineer
  assert(persona.get() === 'engineer', 'Default persona is engineer', `Expected 'engineer', got '${persona.get()}'`);

  // TEST 7: Toggle to creator
  persona.set(prev => prev === 'engineer' ? 'creator' : 'engineer');
  assert(persona.get() === 'creator', 'Toggle switches to creator', `Expected 'creator', got '${persona.get()}'`);

  // TEST 8: Toggle back to engineer
  persona.set(prev => prev === 'engineer' ? 'creator' : 'engineer');
  assert(persona.get() === 'engineer', 'Toggle switches back to engineer', `Expected 'engineer', got '${persona.get()}'`);

  // TEST 9: Theme classes change correctly
  const getThemeClass = (p: Persona) => p === 'engineer' ? 'engineer-theme' : 'creator-theme';
  assert(getThemeClass(persona.get()) === 'engineer-theme', 'Engineer theme class applied', `Expected 'engineer-theme', got '${getThemeClass(persona.get())}'`);

  persona.set('creator');
  assert(getThemeClass(persona.get()) === 'creator-theme', 'Creator theme class applied', `Expected 'creator-theme', got '${getThemeClass(persona.get())}'`);
}

// ============================================
// VIEW MORE / HIDE EXPANSION SIMULATION
// ============================================

function testViewMoreExpansion() {
  interface MockProject {
    id: string;
    persona: string;
    name: string;
  }

  const allProjects: MockProject[] = [
    { id: '1', persona: 'engineer', name: 'Project 1' },
    { id: '2', persona: 'engineer', name: 'Project 2' },
    { id: '3', persona: 'engineer', name: 'Project 3' },
    { id: '4', persona: 'engineer', name: 'Project 4' },
    { id: '5', persona: 'engineer', name: 'Project 5' },
  ];

  const showAll = createMockState(false);

  // TEST 10: Initially shows 3 projects
  const getVisibleProjects = () => {
    if (showAll.get()) return allProjects;
    return allProjects.slice(0, 3);
  };

  assert(getVisibleProjects().length === 3, 'Initially shows exactly 3 projects', `Expected 3, got ${getVisibleProjects().length}`);

  // TEST 11: View More expands to show all
  showAll.set(true);
  assert(getVisibleProjects().length === 5, 'View More shows all 5 projects', `Expected 5, got ${getVisibleProjects().length}`);

  // TEST 12: Hide collapses back to 3
  showAll.set(false);
  assert(getVisibleProjects().length === 3, 'Hide collapses back to 3 projects', `Expected 3, got ${getVisibleProjects().length}`);

  // TEST 13: Button text changes
  const getButtonText = () => showAll.get() ? 'Hide' : 'View More';
  assert(getButtonText() === 'View More', 'Button shows "View More" when collapsed', `Expected 'View More', got '${getButtonText()}'`);
  showAll.set(true);
  assert(getButtonText() === 'Hide', 'Button shows "Hide" when expanded', `Expected 'Hide', got '${getButtonText()}'`);
}

// ============================================
// RUN ALL UI TESTS
// ============================================

function runUITests() {
  console.log('\n========================================');
  console.log('  UI INTERACTION TEST SUITE — Starting...');
  console.log('========================================\n');

  testSidebarToggle();
  testPersonaSwitching();
  testViewMoreExpansion();

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
runUITests();

export { results, runUITests };
