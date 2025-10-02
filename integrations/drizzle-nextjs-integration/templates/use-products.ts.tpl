/**
 * Products Hooks
 * 
 * Standardized TanStack Query hooks for products
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { productsApi } from '@/lib/api/products';
import type { Product, CreateProductData, UpdateProductData } from '@/types/api';

// Get all products
export function useProducts(filters?: { category?: string; search?: string }) {
  return useQuery({
    queryKey: queryKeys.products.list(filters || {}),
    queryFn: () => productsApi.getAll(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get product by ID
export function useProduct(id: string) {
  return useQuery({
    queryKey: queryKeys.products.detail(id),
    queryFn: () => productsApi.getById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Create product
export function useCreateProduct() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateProductData) => productsApi.create(data),
    onSuccess: (newProduct) => {
      // Invalidate and refetch products list
      queryClient.invalidateQueries({ queryKey: queryKeys.products.lists() });
      
      // Add the new product to the cache
      queryClient.setQueryData(
        queryKeys.products.detail(newProduct.id),
        newProduct
      );
    },
    onError: (error) => {
      console.error('Failed to create product:', error);
    },
  });
}

// Update product
export function useUpdateProduct() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProductData }) => 
      productsApi.update(id, data),
    onSuccess: (updatedProduct) => {
      // Update the product in cache
      queryClient.setQueryData(
        queryKeys.products.detail(updatedProduct.id),
        updatedProduct
      );
      
      // Invalidate products list to refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.products.lists() });
    },
    onError: (error) => {
      console.error('Failed to update product:', error);
    },
  });
}

// Delete product
export function useDeleteProduct() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => productsApi.delete(id),
    onSuccess: (_, deletedId) => {
      // Remove the product from cache
      queryClient.removeQueries({ queryKey: queryKeys.products.detail(deletedId) });
      
      // Invalidate products list to refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.products.lists() });
    },
    onError: (error) => {
      console.error('Failed to delete product:', error);
    },
  });
}

// Bulk operations
export function useBulkDeleteProducts() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (ids: string[]) => productsApi.bulkDelete(ids),
    onSuccess: (_, deletedIds) => {
      // Remove products from cache
      deletedIds.forEach(id => {
        queryClient.removeQueries({ queryKey: queryKeys.products.detail(id) });
      });
      
      // Invalidate products list to refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.products.lists() });
    },
    onError: (error) => {
      console.error('Failed to bulk delete products:', error);
    },
  });
}

// Search products
export function useSearchProducts(query: string) {
  return useQuery({
    queryKey: queryKeys.products.list({ search: query }),
    queryFn: () => productsApi.search(query),
    enabled: !!query && query.length > 2,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

// Get products by category
export function useProductsByCategory(category: string) {
  return useQuery({
    queryKey: queryKeys.products.list({ category }),
    queryFn: () => productsApi.getByCategory(category),
    enabled: !!category,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Get featured products
export function useFeaturedProducts() {
  return useQuery({
    queryKey: queryKeys.products.list({ featured: true }),
    queryFn: () => productsApi.getFeatured(),
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
}

// Get product statistics
export function useProductStats() {
  return useQuery({
    queryKey: queryKeys.products.details(),
    queryFn: () => productsApi.getStats(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
