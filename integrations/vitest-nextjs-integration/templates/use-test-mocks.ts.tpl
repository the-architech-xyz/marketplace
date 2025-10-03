import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { testingApi } from '../lib/testing-api';

export function useTestMocks() {
  return useQuery({
    queryKey: ['test-mocks'],
    queryFn: testingApi.mocks.list,
  });
}

export function useTestMock(mockId: string) {
  return useQuery({
    queryKey: ['test-mock', mockId],
    queryFn: () => testingApi.mocks.get(mockId),
    enabled: !!mockId,
  });
}

export function useCreateTestMock() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: testingApi.mocks.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['test-mocks'] });
    },
  });
}

export function useUpdateTestMock() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, ...data }: { id: string; [key: string]: any }) => 
      testingApi.mocks.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['test-mocks'] });
      queryClient.invalidateQueries({ queryKey: ['test-mock', variables.id] });
    },
  });
}

export function useDeleteTestMock() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (mockId: string) => testingApi.mocks.delete(mockId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['test-mocks'] });
    },
  });
}

export function useMockData() {
  return useQuery({
    queryKey: ['mock-data'],
    queryFn: testingApi.mocks.getData,
  });
}
