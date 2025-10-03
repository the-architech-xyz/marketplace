import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { testingApi } from '../lib/testing-api';

export function useTestSuites() {
  return useQuery({
    queryKey: ['test-suites'],
    queryFn: testingApi.suites.list,
  });
}

export function useTestSuite(suiteId: string) {
  return useQuery({
    queryKey: ['test-suite', suiteId],
    queryFn: () => testingApi.suites.get(suiteId),
    enabled: !!suiteId,
  });
}

export function useCreateTestSuite() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: testingApi.suites.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['test-suites'] });
    },
  });
}

export function useRunTestSuite() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (suiteId: string) => testingApi.suites.run(suiteId),
    onSuccess: (_, suiteId) => {
      queryClient.invalidateQueries({ queryKey: ['test-suite', suiteId] });
      queryClient.invalidateQueries({ queryKey: ['test-suites'] });
    },
  });
}

export function useDeleteTestSuite() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (suiteId: string) => testingApi.suites.delete(suiteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['test-suites'] });
    },
  });
}
