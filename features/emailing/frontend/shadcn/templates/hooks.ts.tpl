/**
 * Email Management Hooks
 * 
 * React hooks for email management functionality using TanStack Query
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Email, 
  EmailTemplate, 
  EmailAnalytics, 
  EmailListFilters,
  EmailSendRequest,
  TemplateCreateRequest,
  TemplateUpdateRequest,
  EmailListResponse,
  TemplateListResponse,
  UseEmailsReturn,
  UseTemplatesReturn,
  UseEmailAnalyticsReturn
} from './types';

// Query keys for consistent caching
export const emailKeys = {
  all: ['emails'] as const,
  lists: () => [...emailKeys.all, 'list'] as const,
  list: (filters: EmailListFilters) => [...emailKeys.lists(), filters] as const,
  details: () => [...emailKeys.all, 'detail'] as const,
  detail: (id: string) => [...emailKeys.details(), id] as const,
  analytics: () => [...emailKeys.all, 'analytics'] as const,
};

export const templateKeys = {
  all: ['templates'] as const,
  lists: () => [...templateKeys.all, 'list'] as const,
  list: (filters: { isActive?: boolean; category?: string }) => [...templateKeys.lists(), filters] as const,
  details: () => [...templateKeys.all, 'detail'] as const,
  detail: (id: string) => [...templateKeys.details(), id] as const,
};

// API functions (these would be implemented in your API layer)
const emailApi = {
  getEmails: async (filters: EmailListFilters, page = 1, limit = 20): Promise<EmailListResponse> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(filters.status && { status: filters.status }),
      ...(filters.templateId && { templateId: filters.templateId }),
      ...(filters.dateFrom && { dateFrom: filters.dateFrom.toISOString() }),
      ...(filters.dateTo && { dateTo: filters.dateTo.toISOString() }),
      ...(filters.search && { search: filters.search }),
    });

    const response = await fetch(`/api/emails?${params}`);
    if (!response.ok) throw new Error('Failed to fetch emails');
    return response.json();
  },

  getEmail: async (id: string): Promise<Email> => {
    const response = await fetch(`/api/emails/${id}`);
    if (!response.ok) throw new Error('Failed to fetch email');
    return response.json();
  },

  sendEmail: async (data: EmailSendRequest): Promise<{ success: boolean; emailId?: string }> => {
    const response = await fetch('/api/emails/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to send email');
    return response.json();
  },

  getAnalytics: async (): Promise<EmailAnalytics> => {
    const response = await fetch('/api/emails/analytics');
    if (!response.ok) throw new Error('Failed to fetch analytics');
    return response.json();
  },
};

const templateApi = {
  getTemplates: async (filters: { isActive?: boolean; category?: string } = {}): Promise<TemplateListResponse> => {
    const params = new URLSearchParams();
    if (filters.isActive !== undefined) params.append('isActive', filters.isActive.toString());
    if (filters.category) params.append('category', filters.category);

    const response = await fetch(`/api/templates?${params}`);
    if (!response.ok) throw new Error('Failed to fetch templates');
    return response.json();
  },

  getTemplate: async (id: string): Promise<EmailTemplate> => {
    const response = await fetch(`/api/templates/${id}`);
    if (!response.ok) throw new Error('Failed to fetch template');
    return response.json();
  },

  createTemplate: async (data: TemplateCreateRequest): Promise<EmailTemplate> => {
    const response = await fetch('/api/templates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create template');
    return response.json();
  },

  updateTemplate: async (data: TemplateUpdateRequest): Promise<EmailTemplate> => {
    const response = await fetch(`/api/templates/${data.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update template');
    return response.json();
  },

  deleteTemplate: async (id: string): Promise<void> => {
    const response = await fetch(`/api/templates/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete template');
  },
};

// Email hooks
export function useEmails(filters: EmailListFilters = {}, page = 1, limit = 20): UseEmailsReturn {
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    error,
    refetch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useQuery({
    queryKey: emailKeys.list(filters),
    queryFn: ({ pageParam = page }) => emailApi.getEmails(filters, pageParam, limit),
    getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.page + 1 : undefined,
  });

  const emails = data?.pages.flatMap(page => page.emails) ?? [];
  const hasMore = hasNextPage ?? false;

  const loadMore = () => {
    if (hasMore && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return {
    emails,
    isLoading,
    error: error as Error | null,
    refetch,
    hasMore,
    loadMore,
  };
}

export function useEmail(id: string) {
  return useQuery({
    queryKey: emailKeys.detail(id),
    queryFn: () => emailApi.getEmail(id),
    enabled: !!id,
  });
}

export function useSendEmail() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: emailApi.sendEmail,
    onSuccess: () => {
      // Invalidate email lists to refresh data
      queryClient.invalidateQueries({ queryKey: emailKeys.lists() });
      queryClient.invalidateQueries({ queryKey: emailKeys.analytics() });
    },
  });
}

export function useEmailAnalytics(): UseEmailAnalyticsReturn {
  const {
    data: analytics,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: emailKeys.analytics(),
    queryFn: emailApi.getAnalytics,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    analytics: analytics ?? null,
    isLoading,
    error: error as Error | null,
    refetch,
  };
}

// Template hooks
export function useTemplates(filters: { isActive?: boolean; category?: string } = {}): UseTemplatesReturn {
  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: templateKeys.list(filters),
    queryFn: () => templateApi.getTemplates(filters),
  });

  return {
    templates: data?.templates ?? [],
    isLoading,
    error: error as Error | null,
    refetch,
  };
}

export function useTemplate(id: string) {
  return useQuery({
    queryKey: templateKeys.detail(id),
    queryFn: () => templateApi.getTemplate(id),
    enabled: !!id,
  });
}

export function useCreateTemplate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: templateApi.createTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: templateKeys.lists() });
    },
  });
}

export function useUpdateTemplate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: templateApi.updateTemplate,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: templateKeys.lists() });
      queryClient.invalidateQueries({ queryKey: templateKeys.detail(data.id) });
    },
  });
}

export function useDeleteTemplate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: templateApi.deleteTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: templateKeys.lists() });
    },
  });
}
