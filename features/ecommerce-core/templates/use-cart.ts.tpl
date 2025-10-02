/**
 * Shopping Cart Hook - HEADLESS E-COMMERCE LOGIC
 * 
 * Pure business logic for shopping cart management
 * NO UI DEPENDENCIES - Works with ANY UI library!
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { ecommerceApi } from './api';
import type { Cart, CartItem, AddToCartData, UpdateCartItemData, EcommerceError } from './types';

// Get cart
export function useCart(userId: string) {
  return useQuery({
    queryKey: queryKeys.cart.one(userId),
    queryFn: () => ecommerceApi.getCart(userId),
    enabled: !!userId,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
}

// Get cart items
export function useCartItems(userId: string) {
  return useQuery({
    queryKey: queryKeys.cart.items(userId),
    queryFn: () => ecommerceApi.getCartItems(userId),
    enabled: !!userId,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
}

// Get cart summary
export function useCartSummary(userId: string) {
  return useQuery({
    queryKey: queryKeys.cart.summary(userId),
    queryFn: () => ecommerceApi.getCartSummary(userId),
    enabled: !!userId,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
}

// Get cart calculations
export function useCartCalculations(userId: string) {
  return useQuery({
    queryKey: queryKeys.cart.calculations(userId),
    queryFn: () => ecommerceApi.getCartCalculations(userId),
    enabled: !!userId,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
}

// Add item to cart
export function useAddToCart() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ userId, data }: { userId: string; data: AddToCartData }) => 
      ecommerceApi.addToCart(userId, data),
    onSuccess: (cart: Cart, { userId }) => {
      // Update cart in cache
      queryClient.setQueryData(queryKeys.cart.one(userId), cart);
      
      // Invalidate cart-related queries
      queryClient.invalidateQueries({ queryKey: queryKeys.cart.items(userId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.cart.summary(userId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.cart.calculations(userId) });
    },
    onError: (error: EcommerceError) => {
      console.error('Add to cart failed:', error);
    },
  });
}

// Update cart item
export function useUpdateCartItem() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ userId, itemId, data }: { userId: string; itemId: string; data: UpdateCartItemData }) => 
      ecommerceApi.updateCartItem(userId, itemId, data),
    onSuccess: (cart: Cart, { userId }) => {
      // Update cart in cache
      queryClient.setQueryData(queryKeys.cart.one(userId), cart);
      
      // Invalidate cart-related queries
      queryClient.invalidateQueries({ queryKey: queryKeys.cart.items(userId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.cart.summary(userId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.cart.calculations(userId) });
    },
    onError: (error: EcommerceError) => {
      console.error('Update cart item failed:', error);
    },
  });
}

// Remove item from cart
export function useRemoveFromCart() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ userId, itemId }: { userId: string; itemId: string }) => 
      ecommerceApi.removeFromCart(userId, itemId),
    onSuccess: (cart: Cart, { userId }) => {
      // Update cart in cache
      queryClient.setQueryData(queryKeys.cart.one(userId), cart);
      
      // Invalidate cart-related queries
      queryClient.invalidateQueries({ queryKey: queryKeys.cart.items(userId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.cart.summary(userId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.cart.calculations(userId) });
    },
    onError: (error: EcommerceError) => {
      console.error('Remove from cart failed:', error);
    },
  });
}

// Clear cart
export function useClearCart() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (userId: string) => ecommerceApi.clearCart(userId),
    onSuccess: (_, userId) => {
      // Remove cart from cache
      queryClient.removeQueries({ queryKey: queryKeys.cart.one(userId) });
      queryClient.removeQueries({ queryKey: queryKeys.cart.items(userId) });
      queryClient.removeQueries({ queryKey: queryKeys.cart.summary(userId) });
      queryClient.removeQueries({ queryKey: queryKeys.cart.calculations(userId) });
    },
    onError: (error: EcommerceError) => {
      console.error('Clear cart failed:', error);
    },
  });
}

// Apply coupon to cart
export function useApplyCoupon() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ userId, couponCode }: { userId: string; couponCode: string }) => 
      ecommerceApi.applyCoupon(userId, couponCode),
    onSuccess: (cart: Cart, { userId }) => {
      // Update cart in cache
      queryClient.setQueryData(queryKeys.cart.one(userId), cart);
      
      // Invalidate cart calculations
      queryClient.invalidateQueries({ queryKey: queryKeys.cart.calculations(userId) });
    },
    onError: (error: EcommerceError) => {
      console.error('Apply coupon failed:', error);
    },
  });
}

// Remove coupon from cart
export function useRemoveCoupon() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (userId: string) => ecommerceApi.removeCoupon(userId),
    onSuccess: (cart: Cart, userId) => {
      // Update cart in cache
      queryClient.setQueryData(queryKeys.cart.one(userId), cart);
      
      // Invalidate cart calculations
      queryClient.invalidateQueries({ queryKey: queryKeys.cart.calculations(userId) });
    },
    onError: (error: EcommerceError) => {
      console.error('Remove coupon failed:', error);
    },
  });
}

// Get cart shipping options
export function useCartShippingOptions(userId: string) {
  return useQuery({
    queryKey: queryKeys.cart.shippingOptions(userId),
    queryFn: () => ecommerceApi.getCartShippingOptions(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Update cart shipping
export function useUpdateCartShipping() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ userId, shippingOptionId }: { userId: string; shippingOptionId: string }) => 
      ecommerceApi.updateCartShipping(userId, shippingOptionId),
    onSuccess: (cart: Cart, { userId }) => {
      // Update cart in cache
      queryClient.setQueryData(queryKeys.cart.one(userId), cart);
      
      // Invalidate cart calculations
      queryClient.invalidateQueries({ queryKey: queryKeys.cart.calculations(userId) });
    },
    onError: (error: EcommerceError) => {
      console.error('Update cart shipping failed:', error);
    },
  });
}

// Get cart tax calculation
export function useCartTaxCalculation(userId: string) {
  return useQuery({
    queryKey: queryKeys.cart.taxCalculation(userId),
    queryFn: () => ecommerceApi.getCartTaxCalculation(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get cart validation
export function useCartValidation(userId: string) {
  return useQuery({
    queryKey: queryKeys.cart.validation(userId),
    queryFn: () => ecommerceApi.getCartValidation(userId),
    enabled: !!userId,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
}

// Get cart recommendations
export function useCartRecommendations(userId: string) {
  return useQuery({
    queryKey: queryKeys.cart.recommendations(userId),
    queryFn: () => ecommerceApi.getCartRecommendations(userId),
    enabled: !!userId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Get cart analytics
export function useCartAnalytics(userId: string) {
  return useQuery({
    queryKey: queryKeys.cart.analytics(userId),
    queryFn: () => ecommerceApi.getCartAnalytics(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get cart abandonment
export function useCartAbandonment(userId: string) {
  return useQuery({
    queryKey: queryKeys.cart.abandonment(userId),
    queryFn: () => ecommerceApi.getCartAbandonment(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Save cart for later
export function useSaveCartForLater() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (userId: string) => ecommerceApi.saveCartForLater(userId),
    onSuccess: (_, userId) => {
      // Invalidate cart queries
      queryClient.invalidateQueries({ queryKey: queryKeys.cart.one(userId) });
    },
    onError: (error: EcommerceError) => {
      console.error('Save cart for later failed:', error);
    },
  });
}

// Restore saved cart
export function useRestoreSavedCart() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (userId: string) => ecommerceApi.restoreSavedCart(userId),
    onSuccess: (cart: Cart, userId) => {
      // Update cart in cache
      queryClient.setQueryData(queryKeys.cart.one(userId), cart);
      
      // Invalidate cart-related queries
      queryClient.invalidateQueries({ queryKey: queryKeys.cart.items(userId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.cart.summary(userId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.cart.calculations(userId) });
    },
    onError: (error: EcommerceError) => {
      console.error('Restore saved cart failed:', error);
    },
  });
}

// Get cart history
export function useCartHistory(userId: string) {
  return useQuery({
    queryKey: queryKeys.cart.history(userId),
    queryFn: () => ecommerceApi.getCartHistory(userId),
    enabled: !!userId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Get cart insights
export function useCartInsights(userId: string) {
  return useQuery({
    queryKey: queryKeys.cart.insights(userId),
    queryFn: () => ecommerceApi.getCartInsights(userId),
    enabled: !!userId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}
