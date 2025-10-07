import { useState, useEffect, useCallback, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export interface CartItem {
  id: string;
  productId: string;
  variantId?: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    compareAtPrice?: number;
    images: string[];
    sku?: string;
  };
  variant?: {
    id: string;
    name: string;
    price: number;
    compareAtPrice?: number;
    sku?: string;
    options: Record<string, string>;
  };
  addedAt: string;
  updatedAt: string;
}

export interface Cart {
  id: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  currency: string;
  itemCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface AddToCartData {
  productId: string;
  variantId?: string;
  quantity: number;
}

export interface UpdateCartItemData {
  itemId: string;
  quantity: number;
}

export interface UseCartOptions {
  enabled?: boolean;
  refetchInterval?: number;
}

export function useCartItems(options: UseCartOptions = {}) {
  const queryClient = useQueryClient();
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on the client side for localStorage
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Get cart ID from localStorage or create new one
  const getCartId = useCallback((): string | null => {
    if (!isClient) return null;
    return localStorage.getItem('cartId');
  }, [isClient]);

  const setCartId = useCallback((cartId: string) => {
    if (!isClient) return;
    localStorage.setItem('cartId', cartId);
  }, [isClient]);

  // Fetch cart
  const {
    data: cart,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['cart', getCartId()],
    queryFn: async (): Promise<Cart | null> => {
      const cartId = getCartId();
      if (!cartId) return null;

      const response = await fetch(`/api/cart/${cartId}`);
      if (response.status === 404) {
        return null; // Cart not found
      }
      if (!response.ok) {
        throw new Error('Failed to fetch cart');
      }
      return response.json();
    },
    enabled: options.enabled !== false && isClient,
    refetchInterval: options.refetchInterval,
    staleTime: 30 * 1000, // 30 seconds
  });

  // Create cart mutation
  const createCartMutation = useMutation({
    mutationFn: async (): Promise<Cart> => {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        throw new Error('Failed to create cart');
      }
      const newCart = await response.json();
      setCartId(newCart.id);
      return newCart;
    },
    onSuccess: (newCart) => {
      queryClient.setQueryData(['cart', newCart.id], newCart);
    },
  });

  // Add item to cart mutation
  const addToCartMutation = useMutation({
    mutationFn: async (data: AddToCartData): Promise<Cart> => {
      const cartId = getCartId();
      if (!cartId) {
        // Create cart first
        const newCart = await createCartMutation.mutateAsync();
        const response = await fetch(`/api/cart/${newCart.id}/items`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          throw new Error('Failed to add item to cart');
        }
        return response.json();
      }

      const response = await fetch(`/api/cart/${cartId}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }
      return response.json();
    },
    onSuccess: (updatedCart) => {
      queryClient.setQueryData(['cart', updatedCart.id], updatedCart);
    },
  });

  // Update cart item mutation
  const updateCartItemMutation = useMutation({
    mutationFn: async (data: UpdateCartItemData): Promise<Cart> => {
      const cartId = getCartId();
      if (!cartId) throw new Error('No cart found');

      const response = await fetch(`/api/cart/${cartId}/items/${data.itemId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: data.quantity }),
      });
      if (!response.ok) {
        throw new Error('Failed to update cart item');
      }
      return response.json();
    },
    onSuccess: (updatedCart) => {
      queryClient.setQueryData(['cart', updatedCart.id], updatedCart);
    },
  });

  // Remove cart item mutation
  const removeCartItemMutation = useMutation({
    mutationFn: async (itemId: string): Promise<Cart> => {
      const cartId = getCartId();
      if (!cartId) throw new Error('No cart found');

      const response = await fetch(`/api/cart/${cartId}/items/${itemId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to remove cart item');
      }
      return response.json();
    },
    onSuccess: (updatedCart) => {
      queryClient.setQueryData(['cart', updatedCart.id], updatedCart);
    },
  });

  // Clear cart mutation
  const clearCartMutation = useMutation({
    mutationFn: async (): Promise<Cart> => {
      const cartId = getCartId();
      if (!cartId) throw new Error('No cart found');

      const response = await fetch(`/api/cart/${cartId}/items`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to clear cart');
      }
      return response.json();
    },
    onSuccess: (updatedCart) => {
      queryClient.setQueryData(['cart', updatedCart.id], updatedCart);
    },
  });

  // Helper functions
  const addToCart = useCallback(async (data: AddToCartData) => {
    try {
      await addToCartMutation.mutateAsync(data);
    } catch (error) {
      console.error('Failed to add to cart:', error);
      throw error;
    }
  }, [addToCartMutation]);

  const updateQuantity = useCallback(async (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeCartItemMutation.mutateAsync(itemId);
    } else {
      await updateCartItemMutation.mutateAsync({ itemId, quantity });
    }
  }, [updateCartItemMutation, removeCartItemMutation]);

  const removeItem = useCallback(async (itemId: string) => {
    await removeCartItemMutation.mutateAsync(itemId);
  }, [removeCartItemMutation]);

  const clearCart = useCallback(async () => {
    await clearCartMutation.mutateAsync();
  }, [clearCartMutation]);

  const incrementQuantity = useCallback(async (itemId: string) => {
    const item = cart?.items.find(i => i.id === itemId);
    if (item) {
      await updateQuantity(itemId, item.quantity + 1);
    }
  }, [cart, updateQuantity]);

  const decrementQuantity = useCallback(async (itemId: string) => {
    const item = cart?.items.find(i => i.id === itemId);
    if (item) {
      await updateQuantity(itemId, item.quantity - 1);
    }
  }, [cart, updateQuantity]);

  const getItemQuantity = useCallback((productId: string, variantId?: string): number => {
    if (!cart) return 0;
    
    const item = cart.items.find(i => 
      i.productId === productId && 
      (variantId ? i.variantId === variantId : !i.variantId)
    );
    return item?.quantity || 0;
  }, [cart]);

  const isInCart = useCallback((productId: string, variantId?: string): boolean => {
    return getItemQuantity(productId, variantId) > 0;
  }, [getItemQuantity]);

  // Computed values
  const items = cart?.items || [];
  const itemCount = cart?.itemCount || 0;
  const subtotal = cart?.subtotal || 0;
  const tax = cart?.tax || 0;
  const shipping = cart?.shipping || 0;
  const discount = cart?.discount || 0;
  const total = cart?.total || 0;
  const currency = cart?.currency || 'USD';
  const isEmpty = itemCount === 0;

  // Loading states
  const isAdding = addToCartMutation.isPending;
  const isUpdating = updateCartItemMutation.isPending;
  const isRemoving = removeCartItemMutation.isPending;
  const isClearing = clearCartMutation.isPending;

  // Errors
  const addError = addToCartMutation.error;
  const updateError = updateCartItemMutation.error;
  const removeError = removeCartItemMutation.error;
  const clearError = clearCartMutation.error;

  return {
    // Data
    cart,
    items,
    itemCount,
    subtotal,
    tax,
    shipping,
    discount,
    total,
    currency,
    isEmpty,
    
    // Loading states
    isLoading,
    isAdding,
    isUpdating,
    isRemoving,
    isClearing,
    
    // Errors
    error,
    addError,
    updateError,
    removeError,
    clearError,
    
    // Actions
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    incrementQuantity,
    decrementQuantity,
    getItemQuantity,
    isInCart,
    refetch,
  };
}