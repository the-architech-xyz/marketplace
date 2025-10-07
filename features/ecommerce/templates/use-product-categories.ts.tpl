import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  children?: ProductCategory[];
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryFilters {
  search?: string;
  parentId?: string;
  isActive?: boolean;
  sortBy?: 'name' | 'sortOrder' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

export interface UseProductCategoriesOptions {
  filters?: CategoryFilters;
  enabled?: boolean;
  refetchInterval?: number;
}

export interface CreateCategoryData {
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  isActive?: boolean;
  sortOrder?: number;
}

export interface UpdateCategoryData extends Partial<CreateCategoryData> {
  id: string;
}

export function useProductCategories(options: UseProductCategoriesOptions = {}) {
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState<CategoryFilters>(options.filters || {});

  // Fetch categories
  const {
    data: categories = [],
    isLoading,
    error,
    refetch,
    isFetching
  } = useQuery({
    queryKey: ['product-categories', filters],
    queryFn: async (): Promise<ProductCategory[]> => {
      const params = new URLSearchParams();
      
      if (filters.search) params.append('search', filters.search);
      if (filters.parentId) params.append('parentId', filters.parentId);
      if (filters.isActive !== undefined) params.append('isActive', String(filters.isActive));
      if (filters.sortBy) params.append('sortBy', filters.sortBy);
      if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);

      const response = await fetch(`/api/categories?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      return response.json();
    },
    enabled: options.enabled !== false,
    refetchInterval: options.refetchInterval,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Create category mutation
  const createCategoryMutation = useMutation({
    mutationFn: async (data: CreateCategoryData): Promise<ProductCategory> => {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to create category');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product-categories'] });
    },
  });

  // Update category mutation
  const updateCategoryMutation = useMutation({
    mutationFn: async (data: UpdateCategoryData): Promise<ProductCategory> => {
      const response = await fetch(`/api/categories/${data.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to update category');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product-categories'] });
    },
  });

  // Delete category mutation
  const deleteCategoryMutation = useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const response = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete category');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product-categories'] });
    },
  });

  // Helper functions
  const updateFilters = useCallback((newFilters: Partial<CategoryFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  const getCategoryById = useCallback((id: string): ProductCategory | undefined => {
    return categories.find(category => category.id === id);
  }, [categories]);

  const getCategoryBySlug = useCallback((slug: string): ProductCategory | undefined => {
    return categories.find(category => category.slug === slug);
  }, [categories]);

  const getRootCategories = useCallback((): ProductCategory[] => {
    return categories.filter(category => !category.parentId);
  }, [categories]);

  const getChildCategories = useCallback((parentId: string): ProductCategory[] => {
    return categories.filter(category => category.parentId === parentId);
  }, [categories]);

  const buildCategoryTree = useCallback((): ProductCategory[] => {
    const categoryMap = new Map<string, ProductCategory & { children: ProductCategory[] }>();
    const rootCategories: ProductCategory[] = [];

    // First pass: create map with children arrays
    categories.forEach(category => {
      categoryMap.set(category.id, { ...category, children: [] });
    });

    // Second pass: build tree structure
    categories.forEach(category => {
      const categoryWithChildren = categoryMap.get(category.id)!;
      if (category.parentId) {
        const parent = categoryMap.get(category.parentId);
        if (parent) {
          parent.children.push(categoryWithChildren);
        }
      } else {
        rootCategories.push(categoryWithChildren);
      }
    });

    return rootCategories;
  }, [categories]);

  return {
    // Data
    categories,
    categoryTree: buildCategoryTree(),
    
    // Loading states
    isLoading,
    isFetching,
    error,
    
    // Mutations
    createCategory: createCategoryMutation.mutate,
    updateCategory: updateCategoryMutation.mutate,
    deleteCategory: deleteCategoryMutation.mutate,
    
    // Mutation states
    isCreating: createCategoryMutation.isPending,
    isUpdating: updateCategoryMutation.isPending,
    isDeleting: deleteCategoryMutation.isPending,
    
    // Errors
    createError: createCategoryMutation.error,
    updateError: updateCategoryMutation.error,
    deleteError: deleteCategoryMutation.error,
    
    // Filters
    filters,
    updateFilters,
    clearFilters,
    
    // Helper functions
    getCategoryById,
    getCategoryBySlug,
    getRootCategories,
    getChildCategories,
    buildCategoryTree,
    
    // Actions
    refetch,
  };
}