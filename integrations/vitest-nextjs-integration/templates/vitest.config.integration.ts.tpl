import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    name: 'integration',
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: [
      'tests/integration/**/*.{test,spec}.{js,ts,jsx,tsx}'
    ],
    exclude: [
      'tests/unit/**/*',
      'tests/e2e/**/*',
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
          branches: 70,
          functions: 70,
          lines: 70,
          statements: 70
        }
      }
    },
    // Integration test configuration
    pool: 'forks',
    poolOptions: {
      forks: {
        singleFork: true
      }
    },
    // Longer timeout for integration tests
    testTimeout: 10000,
    hookTimeout: 10000,
    teardownTimeout: 10000,
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
