import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    name: 'e2e',
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: [
      'tests/e2e/**/*.{test,spec}.{js,ts,jsx,tsx}'
    ],
    exclude: [
      'tests/unit/**/*',
      'tests/integration/**/*',
      'node_modules/**',
      'dist/**',
      '.next/**'
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/**',
        'tests/**',
        '**/*.d.ts',
        '**/*.config.{js,ts}',
        '**/coverage/**',
        '**/.next/**',
        '**/dist/**'
      ],
      thresholds: {
        global: {
          branches: 60,
          functions: 60,
          lines: 60,
          statements: 60
        }
      }
    },
    // E2E test configuration
    pool: 'forks',
    poolOptions: {
      forks: {
        singleFork: true
      }
    },
    // Longer timeout for E2E tests
    testTimeout: 30000,
    hookTimeout: 30000,
    teardownTimeout: 30000,
    // Sequential execution for E2E tests
    sequence: {
      concurrent: false
    },
    // Mock external services
    mockReset: true,
    clearMocks: true,
    restoreMocks: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '~': path.resolve(__dirname, './'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/lib': path.resolve(__dirname, './src/lib'),
      '@/hooks': path.resolve(__dirname, './src/hooks'),
      '@/utils': path.resolve(__dirname, './src/utils'),
      '@/types': path.resolve(__dirname, './src/types')
    }
  }
});
