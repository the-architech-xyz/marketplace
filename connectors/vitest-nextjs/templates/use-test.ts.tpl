/**
 * Consolidated Testing Hooks
 * 
 * Next.js-specific testing utilities for Vitest
 */

import { useState, useEffect, useCallback } from 'react';

// Test execution hook
export function useTestExecution() {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const runTests = useCallback(async (testPattern?: string) => {
    setIsRunning(true);
    setError(null);
    
    try {
      // This would integrate with Vitest's programmatic API
      // For now, we'll simulate the interface
      const response = await fetch('/api/test/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pattern: testPattern }),
      });
      
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Test execution failed');
    } finally {
      setIsRunning(false);
    }
  }, []);

  return {
    isRunning,
    results,
    error,
    runTests,
  };
}

// Test coverage hook
export function useTestCoverage() {
  const [coverage, setCoverage] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateCoverage = useCallback(async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/test/coverage');
      const data = await response.json();
      setCoverage(data);
    } catch (err) {
      console.error('Failed to generate coverage:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    coverage,
    isLoading,
    generateCoverage,
  };
}

// Test mocking utilities
export function useTestMocks() {
  const [mocks, setMocks] = useState<Record<string, any>>({});

  const addMock = useCallback((key: string, mock: any) => {
    setMocks(prev => ({ ...prev, [key]: mock }));
  }, []);

  const removeMock = useCallback((key: string) => {
    setMocks(prev => {
      const { [key]: removed, ...rest } = prev;
      return rest;
    });
  }, []);

  const clearMocks = useCallback(() => {
    setMocks({});
  }, []);

  return {
    mocks,
    addMock,
    removeMock,
    clearMocks,
  };
}

// Next.js specific test utilities
export function useNextJSTestUtils() {
  const [isSSR, setIsSSR] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsSSR(typeof window === 'undefined');
    setIsHydrated(typeof window !== 'undefined');
  }, []);

  const waitForHydration = useCallback(async () => {
    return new Promise<void>((resolve) => {
      if (isHydrated) {
        resolve();
        return;
      }
      
      const checkHydration = () => {
        if (typeof window !== 'undefined') {
          setIsHydrated(true);
          resolve();
        } else {
          setTimeout(checkHydration, 100);
        }
      };
      
      checkHydration();
    });
  }, [isHydrated]);

  return {
    isSSR,
    isHydrated,
    waitForHydration,
  };
}

// Test suite management
export function useTestSuite() {
  const [suites, setSuites] = useState<string[]>([]);
  const [activeSuite, setActiveSuite] = useState<string | null>(null);

  const addSuite = useCallback((suiteName: string) => {
    setSuites(prev => [...prev, suiteName]);
  }, []);

  const removeSuite = useCallback((suiteName: string) => {
    setSuites(prev => prev.filter(name => name !== suiteName));
    if (activeSuite === suiteName) {
      setActiveSuite(null);
    }
  }, [activeSuite]);

  const setActive = useCallback((suiteName: string) => {
    setActiveSuite(suiteName);
  }, []);

  return {
    suites,
    activeSuite,
    addSuite,
    removeSuite,
    setActive,
  };
}

// Consolidated test runner hook
export function useTestRunner() {
  const execution = useTestExecution();
  const coverage = useTestCoverage();
  const mocks = useTestMocks();
  const nextjsUtils = useNextJSTestUtils();
  const suite = useTestSuite();

  return {
    ...execution,
    ...coverage,
    ...mocks,
    ...nextjsUtils,
    ...suite,
  };
}

export default useTestRunner;