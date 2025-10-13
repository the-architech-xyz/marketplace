/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup/setup.ts'],
    // Coverage configuration (uncomment if using coverage feature)
    // coverage: {
    //   provider: 'v8',
    //   reporter: ['text', 'json', 'html'],
    //   exclude: [
    //     'node_modules/',
    //     'tests/',
    //     '**/*.d.ts',
    //     '**/*.config.*',
    //   ],
    // },
    // E2E testing with Playwright (uncomment if using e2e feature)
    // testTimeout: 30000,
    // hookTimeout: 30000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})


