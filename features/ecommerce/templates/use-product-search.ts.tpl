import { useState, useEffect, useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from './use-debounce';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  price: number;
  compareAtPrice?: number;
  sku?: string;
  images: string[];
  categoryId: string;
  category?: {
    id: string;
    name: string;
    slug: string;
  };
  tags: string[];
  isActive: boolean;
  isFeatured: boolean;
  inventory: {
    quantity: number;
    trackQuantity: boolean;
    allowBackorder: boolean;
  };
  variants?: ProductVariant[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  sku?: string;
  images: string[];
  options: Record<string, string>;
  inventory: {
    quantity: number;
    trackQuantity: boolean;
    allowBackorder: boolean;
  };
}

export interface SearchFilters {
  query?: string;
  categoryId?: string;
  tags?: string[];
  priceMin?: number;
  priceMax?: number;
  inStock?: boolean;
  isFeatured?: boolean;
  sortBy?: 'name' | 'price' | 'createdAt' | 'relevance';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface SearchResult {
  products: Product[];
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
  facets: {
    categories: Array<{ id: string; name: string; count: number }>;
    tags: Array<{ name: string; count: number }>;
    priceRanges: Array<{ min: number; max: number; count: number }>;
  };
}

export interface UseProductSearchOptions {
  initialFilters?: Partial<SearchFilters>;
  debounceMs?: number;
  enabled?: boolean;
  refetchOnWindowFocus?: boolean;
}

export function useProductSearch(options: UseProductSearchOptions = {}) {
  const {
    initialFilters = {},
    debounceMs = 300,
    enabled = true,
    refetchOnWindowFocus = false,
  } = options;

  const [filters, setFilters] = useState<SearchFilters>({
    page: 1,
    limit: 20,
    sortBy: 'relevance',
    sortOrder: 'desc',
    ...initialFilters,
  });

  const [searchQuery, setSearchQuery] = useState(filters.query || '');
  const debouncedQuery = useDebounce(searchQuery, debounceMs);

  // Update filters when debounced query changes
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      query: debouncedQuery,
      page: 1, // Reset to first page when query changes
    }));
  }, [debouncedQuery]);

  // Search products
  const {
    data: searchResult,
    isLoading,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['product-search', filters],
    queryFn: async (): Promise<SearchResult> => {
      const params = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          if (Array.isArray(value)) {
            value.forEach(item => params.append(key, String(item)));
          } else {
            params.append(key, String(value));
          }
        }
      });

      const response = await fetch(`/api/products/search?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to search products');
      }
      return response.json();
    },
    enabled: enabled && (!!filters.query || !!filters.categoryId || !!filters.tags?.length),
    refetchOnWindowFocus,
    staleTime: 30 * 1000, // 30 seconds
  });

  // Helper functions
  const updateFilters = useCallback((newFilters: Partial<SearchFilters>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
      page: newFilters.page ?? 1, // Reset to first page unless explicitly set
    }));
  }, []);

  const updateSearchQuery = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(prev => ({
      page: 1,
      limit: prev.limit,
      sortBy: prev.sortBy,
      sortOrder: prev.sortOrder,
    }));
    setSearchQuery('');
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  const goToPage = useCallback((page: number) => {
    updateFilters({ page });
  }, [updateFilters]);

  const nextPage = useCallback(() => {
    if (searchResult && searchResult.page < searchResult.totalPages) {
      goToPage(searchResult.page + 1);
    }
  }, [searchResult, goToPage]);

  const previousPage = useCallback(() => {
    if (searchResult && searchResult.page > 1) {
      goToPage(searchResult.page - 1);
    }
  }, [searchResult, goToPage]);

  const setSorting = useCallback((sortBy: SearchFilters['sortBy'], sortOrder: SearchFilters['sortOrder'] = 'desc') => {
    updateFilters({ sortBy, sortOrder });
  }, [updateFilters]);

  const addTagFilter = useCallback((tag: string) => {
    updateFilters({
      tags: [...(filters.tags || []), tag],
    });
  }, [filters.tags, updateFilters]);

  const removeTagFilter = useCallback((tag: string) => {
    updateFilters({
      tags: filters.tags?.filter(t => t !== tag),
    });
  }, [filters.tags, updateFilters]);

  const setPriceRange = useCallback((min?: number, max?: number) => {
    updateFilters({
      priceMin: min,
      priceMax: max,
    });
  }, [updateFilters]);

  const setCategoryFilter = useCallback((categoryId?: string) => {
    updateFilters({ categoryId });
  }, [updateFilters]);

  // Computed values
  const products = searchResult?.products || [];
  const totalCount = searchResult?.totalCount || 0;
  const totalPages = searchResult?.totalPages || 0;
  const currentPage = searchResult?.page || 1;
  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;
  const isEmpty = !isLoading && products.length === 0;
  const hasActiveFilters = !!(
    filters.query ||
    filters.categoryId ||
    filters.tags?.length ||
    filters.priceMin ||
    filters.priceMax ||
    filters.inStock ||
    filters.isFeatured
  );

  // Facets for filtering
  const facets = searchResult?.facets || {
    categories: [],
    tags: [],
    priceRanges: [],
  };

  return {
    // Data
    products,
    totalCount,
    totalPages,
    currentPage,
    facets,
    
    // Loading states
    isLoading,
    isFetching,
    error,
    
    // Filters
    filters,
    searchQuery,
    hasActiveFilters,
    
    // Pagination
    hasNextPage,
    hasPreviousPage,
    isEmpty,
    
    // Actions
    updateFilters,
    updateSearchQuery,
    clearFilters,
    clearSearch,
    goToPage,
    nextPage,
    previousPage,
    setSorting,
    addTagFilter,
    removeTagFilter,
    setPriceRange,
    setCategoryFilter,
    refetch,
  };
}

// Custom hook for debouncing
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}