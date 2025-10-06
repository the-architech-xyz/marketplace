import { useQuery } from '@tanstack/react-query';
import { authApi } from '@/lib/auth/api';
import type { AuthUser } from '@/types/auth';

export const useAuth = () => {
  return useQuery({
    queryKey: ['auth', 'user'],
    queryFn: () => authApi.getCurrentUser(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
