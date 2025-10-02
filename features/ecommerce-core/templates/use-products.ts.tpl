/**
 * Products Hook - HEADLESS E-COMMERCE LOGIC
 * 
 * Pure business logic for product management
 * NO UI DEPENDENCIES - Works with ANY UI library!
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { ecommerceApi } from './api';
import type { Product, CreateProductData, UpdateProductData, ProductFilter, EcommerceError } from './types';

// Get all products
export function useProducts(filters?: ProductFilter) {
  return useQuery({
    queryKey: queryKeys.products.all(filters || {}),
    queryFn: () => ecommerceApi.getProducts(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get product by ID
export function useProduct(productId: string) {
  return useQuery({
    queryKey: queryKeys.products.one(productId),
    queryFn: () => ecommerceApi.getProduct(productId),
    enabled: !!productId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Get featured products
export function useFeaturedProducts() {
  return useQuery({
    queryKey: queryKeys.products.featured(),
    queryFn: () => ecommerceApi.getFeaturedProducts(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Get products by category
export function useProductsByCategory(categoryId: string) {
  return useQuery({
    queryKey: queryKeys.products.byCategory(categoryId),
    queryFn: () => ecommerceApi.getProductsByCategory(categoryId),
    enabled: !!categoryId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Search products
export function useProductSearch(query: string, filters?: ProductFilter) {
  return useQuery({
    queryKey: queryKeys.products.search(query, filters || {}),
    queryFn: () => ecommerceApi.searchProducts(query, filters),
    enabled: !!query && query.length > 2,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

// Get product recommendations
export function useProductRecommendations(productId: string) {
  return useQuery({
    queryKey: queryKeys.products.recommendations(productId),
    queryFn: () => ecommerceApi.getProductRecommendations(productId),
    enabled: !!productId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Get related products
export function useRelatedProducts(productId: string) {
  return useQuery({
    queryKey: queryKeys.products.related(productId),
    queryFn: () => ecommerceApi.getRelatedProducts(productId),
    enabled: !!productId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Get product variants
export function useProductVariants(productId: string) {
  return useQuery({
    queryKey: queryKeys.products.variants(productId),
    queryFn: () => ecommerceApi.getProductVariants(productId),
    enabled: !!productId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Get product reviews
export function useProductReviews(productId: string) {
  return useQuery({
    queryKey: queryKeys.products.reviews(productId),
    queryFn: () => ecommerceApi.getProductReviews(productId),
    enabled: !!productId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get product analytics
export function useProductAnalytics(productId: string) {
  return useQuery({
    queryKey: queryKeys.products.analytics(productId),
    queryFn: () => ecommerceApi.getProductAnalytics(productId),
    enabled: !!productId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Create product
export function useCreateProduct() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateProductData) => ecommerceApi.createProduct(data),
    onSuccess: (product: Product) => {
      // Invalidate products queries
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all() });
      queryClient.invalidateQueries({ queryKey: queryKeys.products.featured() });
      
      // Add the new product to cache
      queryClient.setQueryData(queryKeys.products.one(product.id), product);
    },
    onError: (error: EcommerceError) => {
      console.error('Create product failed:', error);
    },
  });
}

// Update product
export function useUpdateProduct() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ productId, data }: { productId: string; data: UpdateProductData }) => 
      ecommerceApi.updateProduct(productId, data),
    onSuccess: (product: Product) => {
      // Update product in cache
      queryClient.setQueryData(queryKeys.products.one(product.id), product);
      
      // Invalidate products list
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all() });
    },
    onError: (error: EcommerceError) => {
      console.error('Update product failed:', error);
    },
  });
}

// Delete product
export function useDeleteProduct() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (productId: string) => ecommerceApi.deleteProduct(productId),
    onSuccess: (_, productId) => {
      // Remove product from cache
      queryClient.removeQueries({ queryKey: queryKeys.products.one(productId) });
      
      // Invalidate products list
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all() });
    },
    onError: (error: EcommerceError) => {
      console.error('Delete product failed:', error);
    },
  });
}

// Toggle product availability
export function useToggleProductAvailability() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (productId: string) => ecommerceApi.toggleProductAvailability(productId),
    onSuccess: (product: Product) => {
      // Update product in cache
      queryClient.setQueryData(queryKeys.products.one(product.id), product);
      
      // Invalidate products list
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all() });
    },
    onError: (error: EcommerceError) => {
      console.error('Toggle product availability failed:', error);
    },
  });
}

// Update product stock
export function useUpdateProductStock() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ productId, stock }: { productId: string; stock: number }) => 
      ecommerceApi.updateProductStock(productId, stock),
    onSuccess: (product: Product) => {
      // Update product in cache
      queryClient.setQueryData(queryKeys.products.one(product.id), product);
      
      // Invalidate products list
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all() });
    },
    onError: (error: EcommerceError) => {
      console.error('Update product stock failed:', error);
    },
  });
}

// Update product price
export function useUpdateProductPrice() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ productId, price }: { productId: string; price: number }) => 
      ecommerceApi.updateProductPrice(productId, price),
    onSuccess: (product: Product) => {
      // Update product in cache
      queryClient.setQueryData(queryKeys.products.one(product.id), product);
      
      // Invalidate products list
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all() });
    },
    onError: (error: EcommerceError) => {
      console.error('Update product price failed:', error);
    },
  });
}

// Get product statistics
export function useProductStats(productId: string) {
  return useQuery({
    queryKey: queryKeys.products.stats(productId),
    queryFn: () => ecommerceApi.getProductStats(productId),
    enabled: !!productId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get product trends
export function useProductTrends(productId: string) {
  return useQuery({
    queryKey: queryKeys.products.trends(productId),
    queryFn: () => ecommerceApi.getProductTrends(productId),
    enabled: !!productId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get product performance
export function useProductPerformance(productId: string) {
  return useQuery({
    queryKey: queryKeys.products.performance(productId),
    queryFn: () => ecommerceApi.getProductPerformance(productId),
    enabled: !!productId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get product insights
export function useProductInsights(productId: string) {
  return useQuery({
    queryKey: queryKeys.products.insights(productId),
    queryFn: () => ecommerceApi.getProductInsights(productId),
    enabled: !!productId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Get product comparison
export function useProductComparison(productIds: string[]) {
  return useQuery({
    queryKey: queryKeys.products.comparison(productIds),
    queryFn: () => ecommerceApi.getProductComparison(productIds),
    enabled: productIds.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get product wishlist
export function useProductWishlist(userId: string) {
  return useQuery({
    queryKey: queryKeys.products.wishlist(userId),
    queryFn: () => ecommerceApi.getProductWishlist(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Add to wishlist
export function useAddToWishlist() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ userId, productId }: { userId: string; productId: string }) => 
      ecommerceApi.addToWishlist(userId, productId),
    onSuccess: (_, { userId }) => {
      // Invalidate wishlist
      queryClient.invalidateQueries({ queryKey: queryKeys.products.wishlist(userId) });
    },
    onError: (error: EcommerceError) => {
      console.error('Add to wishlist failed:', error);
    },
  });
}

// Remove from wishlist
export function useRemoveFromWishlist() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ userId, productId }: { userId: string; productId: string }) => 
      ecommerceApi.removeFromWishlist(userId, productId),
    onSuccess: (_, { userId }) => {
      // Invalidate wishlist
      queryClient.invalidateQueries({ queryKey: queryKeys.products.wishlist(userId) });
    },
    onError: (error: EcommerceError) => {
      console.error('Remove from wishlist failed:', error);
    },
  });
}
