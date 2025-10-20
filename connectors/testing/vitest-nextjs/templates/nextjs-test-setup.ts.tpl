import { beforeAll, afterEach, afterAll } from 'vitest'
import { cleanup } from '@testing-library/react'
import { mockRouter } from './mock-next-router'

// Mock Next.js router
beforeAll(() => {
  // Mock Next.js router
  vi.mock('next/router', () => ({
    useRouter: () => mockRouter,
  }))

  // Mock Next.js navigation
  vi.mock('next/navigation', () => ({
    useRouter: () => mockRouter,
    usePathname: () => '/',
    useSearchParams: () => new URLSearchParams(),
  }))
})

// Clean up after each test
afterEach(() => {
  cleanup()
})

// Global test setup
afterAll(() => {
  vi.clearAllMocks()
})
