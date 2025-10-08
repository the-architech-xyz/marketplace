export const testingApi = {
  suites: {
    list: async () => {
      // Mock implementation - replace with actual API calls
      return [
        { id: '1', name: 'Unit Tests', status: 'passed', duration: 1200 },
        { id: '2', name: 'Integration Tests', status: 'running', duration: 0 },
        { id: '3', name: 'E2E Tests', status: 'failed', duration: 3400 },
      ];
    },
    get: async (id: string) => {
      return { id, name: `Test Suite ${id}`, status: 'passed', duration: 1200 };
    },
    create: async (data: any) => {
      return { id: Date.now().toString(), ...data, status: 'created' };
    },
    run: async (id: string) => {
      return { id, status: 'running', startedAt: new Date().toISOString() };
    },
    delete: async (id: string) => {
      return { id, deleted: true };
    },
  },
  runs: {
    list: async () => {
      return [
        { id: '1', suiteId: '1', status: 'completed', duration: 1200, passed: 15, failed: 0 },
        { id: '2', suiteId: '2', status: 'running', duration: 600, passed: 8, failed: 2 },
      ];
    },
    get: async (id: string) => {
      return { id, status: 'completed', duration: 1200, passed: 15, failed: 0 };
    },
    execute: async (options: { pattern?: string; watch?: boolean }) => {
      return { id: Date.now().toString(), status: 'running', options };
    },
    stop: async (id: string) => {
      return { id, status: 'stopped' };
    },
  },
  results: {
    get: async () => {
      return {
        total: 25,
        passed: 23,
        failed: 2,
        skipped: 0,
        duration: 3400,
        suites: 3,
      };
    },
  },
  coverage: {
    get: async () => {
      return {
        lines: { total: 1000, covered: 850, percentage: 85 },
        functions: { total: 200, covered: 180, percentage: 90 },
        branches: { total: 300, covered: 240, percentage: 80 },
        statements: { total: 1200, covered: 1000, percentage: 83.33 },
      };
    },
    report: async () => {
      return {
        summary: { lines: 85, functions: 90, branches: 80, statements: 83.33 },
        files: [
          { name: 'src/utils.ts', lines: 95, functions: 100, branches: 85, statements: 90 },
          { name: 'src/components/Button.tsx', lines: 80, functions: 90, branches: 75, statements: 85 },
        ],
      };
    },
    generate: async (options: { threshold?: number; include?: string[] }) => {
      return { success: true, options };
    },
    getThreshold: async () => {
      return { lines: 80, functions: 80, branches: 80, statements: 80 };
    },
    setThreshold: async (threshold: any) => {
      return { success: true, threshold };
    },
  },
  mocks: {
    list: async () => {
      return [
        { id: '1', name: 'API Mock', type: 'http', status: 'active' },
        { id: '2', name: 'Database Mock', type: 'database', status: 'inactive' },
      ];
    },
    get: async (id: string) => {
      return { id, name: `Mock ${id}`, type: 'http', status: 'active' };
    },
    create: async (data: any) => {
      return { id: Date.now().toString(), ...data, status: 'created' };
    },
    update: async (id: string, data: any) => {
      return { id, ...data, status: 'updated' };
    },
    delete: async (id: string) => {
      return { id, deleted: true };
    },
    getData: async () => {
      return {
        users: [{ id: 1, name: 'John Doe', email: 'john@example.com' }],
        products: [{ id: 1, name: 'Product 1', price: 99.99 }],
      };
    },
  },
};
