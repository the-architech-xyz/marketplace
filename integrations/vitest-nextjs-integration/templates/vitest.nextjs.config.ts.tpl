/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

/**
 * Next.js-specific Vitest configuration
 * Extends the base Vitest config with Next.js optimizations
 */
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./test-utils/nextjs-test-setup.ts'],
    // Next.js-specific test patterns
    include: [
      'tests/unit/nextjs/**/*.{test,spec}.{js,ts,jsx,tsx}',
      'tests/integration/nextjs/**/*.{test,spec}.{js,ts,jsx,tsx}',
      'tests/e2e/nextjs/**/*.{test,spec}.{js,ts,jsx,tsx}'
    ],
    exclude: [
      'node_modules',
      'dist',
      '.next',
      'coverage',
      'tests/unit/**/*.test.{js,ts,jsx,tsx}', // Exclude non-Next.js tests
      'tests/integration/**/*.test.{js,ts,jsx,tsx}',
      'tests/e2e/**/*.spec.{js,ts,jsx,tsx}'
    ],
    // Next.js-specific coverage settings
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: ['src/**/*.{js,ts,jsx,tsx}'],
      exclude: [
        'src/**/*.d.ts',
        'src/**/*.stories.{js,ts,jsx,tsx}',
        'src/**/*.test.{js,ts,jsx,tsx}',
        'src/**/*.spec.{js,ts,jsx,tsx}',
        'src/**/__tests__/**',
        'src/**/__mocks__/**'
      ]
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // Next.js-specific aliases
      '@/components': path.resolve(__dirname, './src/components'),
      '@/lib': path.resolve(__dirname, './src/lib'),
      '@/app': path.resolve(__dirname, './src/app'),
      '@/pages': path.resolve(__dirname, './src/pages'),
      '@/styles': path.resolve(__dirname, './src/styles')
    }
  }
})
