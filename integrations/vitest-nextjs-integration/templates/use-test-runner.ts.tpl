import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { testingApi } from '../lib/testing-api';

export function useTestRuns() {
  return useQuery({
    queryKey: ['test-runs'],
    queryFn: testingApi.runs.list,
  });
}

export function useTestRun(runId: string) {
  return useQuery({
    queryKey: ['test-run', runId],
    queryFn: () => testingApi.runs.get(runId),
    enabled: !!runId,
  });
}

export function useRunTests() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (options: { pattern?: string; watch?: boolean }) => 
      testingApi.runs.execute(options),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['test-runs'] });
    },
  });
}

export function useStopTestRun() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (runId: string) => testingApi.runs.stop(runId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['test-runs'] });
    },
  });
}

export function useTestResults() {
  return useQuery({
    queryKey: ['test-results'],
    queryFn: testingApi.results.get,
    refetchInterval: 5000, // Refetch every 5 seconds when tests are running
  });
}
