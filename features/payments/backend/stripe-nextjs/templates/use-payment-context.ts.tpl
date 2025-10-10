/**
 * Payment Context Hook
 * 
 * Provides organization and team context for payment operations.
 * This hook integrates with the auth system to get current organization/team IDs.
 */

import { useAuthService } from '@/features/auth/backend/better-auth-nextjs';
import { useMemo } from 'react';

export interface PaymentContext {
  organizationId: string | null;
  teamId: string | null;
  isOwner: boolean;
  isAdmin: boolean;
  canManageBilling: boolean;
  canViewBilling: boolean;
  canManageSeats: boolean;
  canTrackUsage: boolean;
}

/**
 * Hook to get payment context from current auth session
 */
export function usePaymentContext(): PaymentContext {
  const { session } = useAuthService().session.useSession();
  
  return useMemo(() => {
    if (!session) {
      return {
        organizationId: null,
        teamId: null,
        isOwner: false,
        isAdmin: false,
        canManageBilling: false,
        canViewBilling: false,
        canManageSeats: false,
        canTrackUsage: false,
      };
    }
    
    const organizationId = session.activeOrganizationId || null;
    const teamId = session.activeTeamId || null;
    
    // Determine user role and permissions
    // This would typically come from the session or organization membership
    const isOwner = session.user.role === 'owner' || session.user.role === 'admin';
    const isAdmin = session.user.role === 'admin' || session.user.role === 'owner';
    
    // Permission matrix based on role
    const canManageBilling = isOwner;
    const canViewBilling = isOwner || isAdmin;
    const canManageSeats = isOwner || isAdmin;
    const canTrackUsage = true; // All authenticated users can track usage
    
    return {
      organizationId,
      teamId,
      isOwner,
      isAdmin,
      canManageBilling,
      canViewBilling,
      canManageSeats,
      canTrackUsage,
    };
  }, [session]);
}

/**
 * Hook to get organization-specific payment context
 */
export function useOrganizationPaymentContext(organizationId: string): PaymentContext {
  const context = usePaymentContext();
  
  return useMemo(() => {
    if (!context.organizationId || context.organizationId !== organizationId) {
      return {
        organizationId: null,
        teamId: null,
        isOwner: false,
        isAdmin: false,
        canManageBilling: false,
        canViewBilling: false,
        canManageSeats: false,
        canTrackUsage: false,
      };
    }
    
    return context;
  }, [context, organizationId]);
}

/**
 * Hook to get team-specific payment context
 */
export function useTeamPaymentContext(organizationId: string, teamId: string): PaymentContext {
  const context = useOrganizationPaymentContext(organizationId);
  
  return useMemo(() => {
    if (!context.teamId || context.teamId !== teamId) {
      return {
        ...context,
        teamId: null,
        canTrackUsage: false, // Can't track usage for different team
      };
    }
    
    return context;
  }, [context, teamId]);
}

/**
 * Hook to check if user can perform a specific billing operation
 */
export function useBillingPermission(operation: string): boolean {
  const context = usePaymentContext();
  
  return useMemo(() => {
    if (!context.organizationId) return false;
    
    switch (operation) {
      case 'view_subscription':
      case 'view_billing_info':
      case 'view_invoices':
        return context.canViewBilling;
      
      case 'create_subscription':
      case 'update_subscription':
      case 'cancel_subscription':
      case 'update_billing_info':
        return context.canManageBilling;
      
      case 'manage_seats':
        return context.canManageSeats;
      
      case 'track_usage':
        return context.canTrackUsage;
      
      default:
        return false;
    }
  }, [context, operation]);
}

/**
 * Hook to get organization billing with automatic context
 */
export function useOrganizationBillingWithContext() {
  const context = usePaymentContext();
  const { useOrganizationBilling } = require('./PaymentService').PaymentService;
  
  if (!context.organizationId) {
    return {
      subscription: { data: null, loading: false, error: new Error('No organization selected') },
      createSubscription: { mutate: () => {}, isLoading: false, error: null },
      updateSubscription: { mutate: () => {}, isLoading: false, error: null },
      cancelSubscription: { mutate: () => {}, isLoading: false, error: null },
      seats: { data: null, loading: false, error: new Error('No organization selected') },
      updateSeats: { mutate: () => {}, isLoading: false, error: null },
      usage: { data: null, loading: false },
      trackUsage: { mutate: () => {}, isLoading: false, error: null },
      billingInfo: { data: null, loading: false },
      updateBillingInfo: { mutate: () => {}, isLoading: false, error: null },
      invoices: { data: null, loading: false },
      downloadInvoice: () => Promise.reject(new Error('No organization selected')),
      createPortalSession: () => Promise.reject(new Error('No organization selected')),
    };
  }
  
  return useOrganizationBilling(context.organizationId);
}

/**
 * Hook to get team usage with automatic context
 */
export function useTeamUsageWithContext() {
  const context = usePaymentContext();
  const { useTeamUsage } = require('./PaymentService').PaymentService;
  
  if (!context.organizationId || !context.teamId) {
    return {
      usage: { data: null, loading: false },
      trackUsage: { mutate: () => {}, isLoading: false, error: null },
    };
  }
  
  return useTeamUsage(context.organizationId, context.teamId);
}
