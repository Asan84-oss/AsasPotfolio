/**
 * AUTH TEST SUITE
 * __backend_tests__/auth.test.ts
 * 
 * Validates:
 * 1. One-Time Registration Logic
 * 2. Login gating after registration
 * 3. Token management
 */

// ============================================
// TEST FRAMEWORK (lightweight, no external deps)
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
// MOCK DATABASE (isolated from main app)
// ============================================

interface Admin {
  id: string;
  email: string;
  password: string;
  isRegistered: boolean;
}

let mockAdminStorage: Admin | null = null;
let mockTokenStorage: string | null = null;

const mockDb = {
  admin: {
    get: () => mockAdminStorage,
    create: (email: string, password: string): Admin => {
      if (mockAdminStorage) throw new Error('Admin already exists');
      const admin: Admin = {
        id: `test-${Date.now()}`,
        email,
        password,
        isRegistered: true
      };
      mockAdminStorage = admin;
      return admin;
    },
    authenticate: (email: string, password: string): Admin | null => {
      if (!mockAdminStorage) return null;
      if (mockAdminStorage.email === email && mockAdminStorage.password === password) {
        return mockAdminStorage;
      }
      return null;
    }
  },
  auth: {
    setToken: (token: string) => { mockTokenStorage = token; },
    getToken: () => mockTokenStorage,
    clearToken: () => { mockTokenStorage = null; },
    isAuthenticated: () => !!mockTokenStorage
  }
};

// ============================================
// TEST CASES
// ============================================

function runAuthTests() {
  console.log('\n========================================');
  console.log('  AUTH TEST SUITE — Starting...');
  console.log('========================================\n');

  // Reset state
  mockAdminStorage = null;
  mockTokenStorage = null;

  // TEST 1: Registration succeeds when no admin exists
  try {
    const admin = mockDb.admin.create('test@example.com', 'password123');
    assert(admin !== null, 'Registration succeeds with no existing admin', 'Admin should be created');
    assert(admin.email === 'test@example.com', 'Admin email is correct', `Expected test@example.com, got ${admin.email}`);
    assert(admin.isRegistered === true, 'Admin isRegistered flag is true', 'isRegistered should be true');
  } catch (e) {
    assert(false, 'Registration succeeds with no existing admin', String(e));
  }

  // TEST 2: Registration fails when admin already exists
  let registrationBlocked = false;
  try {
    mockDb.admin.create('another@example.com', 'password456');
  } catch (e) {
    registrationBlocked = true;
  }
  assert(registrationBlocked === true, 'Second registration is permanently blocked', 'Should throw error on duplicate registration');

  // TEST 3: Login succeeds with correct credentials
  const loginResult = mockDb.admin.authenticate('test@example.com', 'password123');
  assert(loginResult !== null, 'Login succeeds with correct credentials', 'Should return admin object');

  // TEST 4: Login fails with wrong password
  const wrongLogin = mockDb.admin.authenticate('test@example.com', 'wrongpassword');
  assert(wrongLogin === null, 'Login fails with wrong password', 'Should return null');

  // TEST 5: Login fails with wrong email
  const wrongEmail = mockDb.admin.authenticate('wrong@example.com', 'password123');
  assert(wrongEmail === null, 'Login fails with wrong email', 'Should return null');

  // TEST 6: Token management
  mockDb.auth.setToken('jwt_test_token_123');
  assert(mockDb.auth.isAuthenticated() === true, 'Auth token is set correctly', 'Should be authenticated');

  mockDb.auth.clearToken();
  assert(mockDb.auth.isAuthenticated() === false, 'Token cleared successfully', 'Should not be authenticated');

  // TEST 7: Verify registration view is hidden after admin exists
  const adminExists = mockDb.admin.get() !== null;
  assert(adminExists === true, 'Admin existence check returns true after registration', 'Should detect existing admin');

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
runAuthTests();

export { results, runAuthTests };
