import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { testingApi } from '../lib/testing-api';

export function useTestCoverage() {
  return useQuery({
    queryKey: ['test-coverage'],
    queryFn: testingApi.coverage.get,
  });
}

export function useCoverageReport() {
  return useQuery({
    queryKey: ['coverage-report'],
    queryFn: testingApi.coverage.report,
  });
}

export function useGenerateCoverage() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (options: { threshold?: number; include?: string[] }) => 
      testingApi.coverage.generate(options),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['test-coverage'] });
      queryClient.invalidateQueries({ queryKey: ['coverage-report'] });
    },
  });
}

export function useCoverageThreshold() {
  return useQuery({
    queryKey: ['coverage-threshold'],
    queryFn: testingApi.coverage.getThreshold,
  });
}

export function useUpdateCoverageThreshold() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (threshold: { lines?: number; functions?: number; branches?: number; statements?: number }) => 
      testingApi.coverage.setThreshold(threshold),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coverage-threshold'] });
    },
  });
}
