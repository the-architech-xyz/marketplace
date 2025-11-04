/**
 * RevenueCat SDK Hooks
 * 
 * ARCHITECTURE NOTE:
 * These hooks use RevenueCat SDK instead of TanStack Query
 * Same interface as standard hooks, RevenueCat implementation
 */

import { 
  useCustomerInfo as useRevenueCatCustomerInfo,
  usePurchasePackage as useRevenueCatPurchasePackage,
  useRestorePurchases as useRevenueCatRestorePurchases
} from '@revenuecat/purchases-react-native';

// ============================================================================
// SUBSCRIPTION HOOKS
// ============================================================================

/**
 * Get customer info (RevenueCat SDK)
 */
export const useCustomerInfo = (options?: any) => {
  const { data: customerInfo, isLoading, error } = useRevenueCatCustomerInfo();
  
  return {
    data: customerInfo,
    isLoading,
    error,
    isSubscribed: customerInfo?.entitlements?.active?.length > 0
  };
};

/**
 * Purchase package (RevenueCat SDK)
 */
export const usePurchasePackage = (options?: any) => {
  const { purchasePackage, isLoading, error } = useRevenueCatPurchasePackage();
  
  const mutate = async (packageToPurchase: any) => {
    return purchasePackage(packageToPurchase);
  };

  return {
    mutate,
    isLoading,
    error
  };
};

/**
 * Restore purchases (RevenueCat SDK)
 */
export const useRestorePurchases = (options?: any) => {
  const { restorePurchases, isLoading, error } = useRevenueCatRestorePurchases();
  
  const mutate = async () => {
    return restorePurchases();
  };

  return {
    mutate,
    isLoading,
    error
  };
};

// ============================================================================
// COMPATIBILITY HOOKS (Same Interface as Standard)
// ============================================================================

/**
 * Get subscriptions (RevenueCat SDK)
 * Same interface as standard useSubscriptions
 */
export const useSubscriptions = (options?: any) => {
  const { data: customerInfo, isLoading, error } = useRevenueCatCustomerInfo();
  
  const subscriptions = customerInfo?.entitlements?.active || [];
  
  return {
    data: subscriptions,
    isLoading,
    error
  };
};

/**
 * Create subscription (RevenueCat SDK)
 * Same interface as standard useSubscriptionsCreate
 */
export const useSubscriptionsCreate = (options?: any) => {
  const { purchasePackage, isLoading, error } = useRevenueCatPurchasePackage();
  
  const mutate = async (packageToPurchase: any) => {
    return purchasePackage(packageToPurchase);
  };

  return {
    mutate,
    isLoading,
    error
  };
};

// ============================================================================
// PAYMENT HOOKS (RevenueCat doesn't have direct payments)
// ============================================================================

/**
 * Get payments (RevenueCat SDK)
 * RevenueCat doesn't have direct payments - throws informative error
 */
export const usePaymentsList = (filters?: any, options?: any) => {
  return {
    data: [],
    isLoading: false,
    error: new Error('Direct payments not supported with RevenueCat. Use subscriptions instead.')
  };
};

/**
 * Create payment (RevenueCat SDK)
 * RevenueCat doesn't have direct payments - throws informative error
 */
export const usePaymentsCreate = (options?: any) => {
  const mutate = async (data: any) => {
    throw new Error('Direct payments not supported with RevenueCat. Use subscriptions instead.');
  };

  return {
    mutate,
    isLoading: false,
    error: new Error('Direct payments not supported with RevenueCat. Use subscriptions instead.')
  };
};