export interface TestSuite {
  id: string;
  name: string;
  status: 'passed' | 'failed' | 'running' | 'pending' | 'skipped';
  duration: number;
  tests?: TestCase[];
  createdAt?: string;
  updatedAt?: string;
}

export interface TestCase {
  id: string;
  name: string;
  status: 'passed' | 'failed' | 'running' | 'pending' | 'skipped';
  duration: number;
  error?: string;
  suiteId: string;
}

export interface TestRun {
  id: string;
  suiteId: string;
  status: 'completed' | 'running' | 'failed' | 'cancelled';
  duration: number;
  passed: number;
  failed: number;
  skipped: number;
  startedAt: string;
  completedAt?: string;
  tests?: TestCase[];
}

export interface TestResults {
  total: number;
  passed: number;
  failed: number;
  skipped: number;
  duration: number;
  suites: number;
}

export interface CoverageData {
  lines: CoverageMetric;
  functions: CoverageMetric;
  branches: CoverageMetric;
  statements: CoverageMetric;
}

export interface CoverageMetric {
  total: number;
  covered: number;
  percentage: number;
}

export interface CoverageReport {
  summary: {
    lines: number;
    functions: number;
    branches: number;
    statements: number;
  };
  files: CoverageFile[];
}

export interface CoverageFile {
  name: string;
  lines: number;
  functions: number;
  branches: number;
  statements: number;
}

export interface CoverageThreshold {
  lines: number;
  functions: number;
  branches: number;
  statements: number;
}

export interface TestMock {
  id: string;
  name: string;
  type: 'http' | 'database' | 'function' | 'module';
  status: 'active' | 'inactive';
  config: Record<string, any>;
  createdAt?: string;
  updatedAt?: string;
}

export interface MockData {
  [key: string]: any[];
}

export interface TestOptions {
  pattern?: string;
  watch?: boolean;
  coverage?: boolean;
  threshold?: CoverageThreshold;
  include?: string[];
  exclude?: string[];
}
