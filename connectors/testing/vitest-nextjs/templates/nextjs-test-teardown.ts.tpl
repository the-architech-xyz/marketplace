import { afterAll } from 'vitest'

// Next.js-specific test teardown
afterAll(() => {
  // Clear all mocks
  vi.clearAllMocks()
  
  // Reset modules
  vi.resetModules()
  
  // Clear any timers
  vi.clearAllTimers()
  
  // Reset DOM
  document.body.innerHTML = ''
})
