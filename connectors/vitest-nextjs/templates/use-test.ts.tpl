/**
 * Test Hook
 * 
 * Standardized hook for running individual tests
 * EXTERNAL API IDENTICAL ACROSS ALL TESTING FRAMEWORKS - Features work with ANY test runner!
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { testingApi } from '@/lib/testing/api';
import type { TestResult, TestOptions, TestError } from '@/lib/testing/types';

// Run a single test
export function useTest(testPath: string, options?: TestOptions) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => testingApi.runTest(testPath, options),
    onSuccess: (result: TestResult) => {
      // Invalidate test results
      queryClient.invalidateQueries({ queryKey: queryKeys.testing.results() });
      
      // Update specific test result in cache
      queryClient.setQueryData(queryKeys.testing.result(testPath), result);
    },
    onError: (error: TestError) => {
      console.error('Test failed:', error);
    },
  });
}

// Get test result
export function useTestResult(testPath: string) {
  return useQuery({
    queryKey: queryKeys.testing.result(testPath),
    queryFn: () => testingApi.getTestResult(testPath),
    enabled: !!testPath,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
}

// Run test with watch mode
export function useTestWatch(testPath: string, options?: TestOptions) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => testingApi.runTestWatch(testPath, options),
    onSuccess: (result: TestResult) => {
      // Invalidate test results
      queryClient.invalidateQueries({ queryKey: queryKeys.testing.results() });
      
      // Update specific test result in cache
      queryClient.setQueryData(queryKeys.testing.result(testPath), result);
    },
    onError: (error: TestError) => {
      console.error('Test watch failed:', error);
    },
  });
}

// Run test with debug mode
export function useTestDebug(testPath: string, options?: TestOptions) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => testingApi.runTestDebug(testPath, options),
    onSuccess: (result: TestResult) => {
      // Invalidate test results
      queryClient.invalidateQueries({ queryKey: queryKeys.testing.results() });
      
      // Update specific test result in cache
      queryClient.setQueryData(queryKeys.testing.result(testPath), result);
    },
    onError: (error: TestError) => {
      console.error('Test debug failed:', error);
    },
  });
}

// Run test with coverage
export function useTestWithCoverage(testPath: string, options?: TestOptions) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => testingApi.runTestWithCoverage(testPath, options),
    onSuccess: (result: TestResult) => {
      // Invalidate test results and coverage
      queryClient.invalidateQueries({ queryKey: queryKeys.testing.results() });
      queryClient.invalidateQueries({ queryKey: queryKeys.testing.coverage() });
      
      // Update specific test result in cache
      queryClient.setQueryData(queryKeys.testing.result(testPath), result);
    },
    onError: (error: TestError) => {
      console.error('Test with coverage failed:', error);
    },
  });
}

// Get test status
export function useTestStatus(testPath: string) {
  return useQuery({
    queryKey: queryKeys.testing.status(testPath),
    queryFn: () => testingApi.getTestStatus(testPath),
    enabled: !!testPath,
    staleTime: 30 * 1000, // 30 seconds
  });
}

// Get test logs
export function useTestLogs(testPath: string) {
  return useQuery({
    queryKey: queryKeys.testing.logs(testPath),
    queryFn: () => testingApi.getTestLogs(testPath),
    enabled: !!testPath,
    staleTime: 10 * 1000, // 10 seconds
  });
}

// Get test performance
export function useTestPerformance(testPath: string) {
  return useQuery({
    queryKey: queryKeys.testing.performance(testPath),
    queryFn: () => testingApi.getTestPerformance(testPath),
    enabled: !!testPath,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get test history
export function useTestHistory(testPath: string) {
  return useQuery({
    queryKey: queryKeys.testing.history(testPath),
    queryFn: () => testingApi.getTestHistory(testPath),
    enabled: !!testPath,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Get test dependencies
export function useTestDependencies(testPath: string) {
  return useQuery({
    queryKey: queryKeys.testing.dependencies(testPath),
    queryFn: () => testingApi.getTestDependencies(testPath),
    enabled: !!testPath,
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
}

// Get test configuration
export function useTestConfiguration(testPath: string) {
  return useQuery({
    queryKey: queryKeys.testing.configuration(testPath),
    queryFn: () => testingApi.getTestConfiguration(testPath),
    enabled: !!testPath,
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
}

// Update test configuration
export function useUpdateTestConfiguration() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ testPath, config }: { testPath: string; config: any }) => 
      testingApi.updateTestConfiguration(testPath, config),
    onSuccess: (_, { testPath }) => {
      // Invalidate test configuration
      queryClient.invalidateQueries({ queryKey: queryKeys.testing.configuration(testPath) });
    },
    onError: (error: TestError) => {
      console.error('Update test configuration failed:', error);
    },
  });
}

// Get test environment
export function useTestEnvironment(testPath: string) {
  return useQuery({
    queryKey: queryKeys.testing.environment(testPath),
    queryFn: () => testingApi.getTestEnvironment(testPath),
    enabled: !!testPath,
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
}

// Get test fixtures
export function useTestFixtures(testPath: string) {
  return useQuery({
    queryKey: queryKeys.testing.fixtures(testPath),
    queryFn: () => testingApi.getTestFixtures(testPath),
    enabled: !!testPath,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Get test mocks
export function useTestMocks(testPath: string) {
  return useQuery({
    queryKey: queryKeys.testing.mocks(testPath),
    queryFn: () => testingApi.getTestMocks(testPath),
    enabled: !!testPath,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Get test assertions
export function useTestAssertions(testPath: string) {
  return useQuery({
    queryKey: queryKeys.testing.assertions(testPath),
    queryFn: () => testingApi.getTestAssertions(testPath),
    enabled: !!testPath,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get test coverage for specific test
export function useTestCoverage(testPath: string) {
  return useQuery({
    queryKey: queryKeys.testing.testCoverage(testPath),
    queryFn: () => testingApi.getTestCoverage(testPath),
    enabled: !!testPath,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
