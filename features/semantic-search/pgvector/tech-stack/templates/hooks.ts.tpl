/**
 * Semantic Search Hooks
 */

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import type { SemanticSearchResult, SemanticSearchOptions } from '<%= importPath(paths.features) %>semantic-search/pgvector/contract';

export const useSemanticSearch = (
  query: string,
  options?: SemanticSearchOptions,
  queryOptions?: Omit<UseQueryOptions<SemanticSearchResult[]>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['semantic-search', query, options],
    queryFn: async () => {
      const params = new URLSearchParams({
        q: query,
        ...(options?.limit && { limit: options.limit.toString() }),
        ...(options?.threshold && { threshold: options.threshold.toString() }),
      });
      
      const res = await fetch(`/api/search/semantic?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to perform semantic search');
      return res.json();
    },
    enabled: !!query && query.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...queryOptions
  });
};



