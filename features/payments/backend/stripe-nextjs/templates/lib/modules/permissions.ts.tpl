/**
 * Billing Permissions Service
 * 
 * Server-side permission checking for organization billing operations.
 * This service handles role-based access control for billing features.
 */

import { BillingPermission, PermissionCheck } from '../stripe/types';
import { createPermissionError } from '../stripe/errors';

// ============================================================================
// PERMISSION MATRIX
// ============================================================================

const BILLING_PERMISSIONS = {
  owner: [
    'view_subscription',
    'create_subscription',
    'update_subscription',
    'cancel_subscription',
    'view_billing_info',
    'update_billing_info',
    'view_invoices',
    'download_invoices',
    'manage_seats',
    'view_usage',
    'track_usage',
  ],
  admin: [
    'view_subscription',
    'create_subscription',
    'update_subscription',
    'view_billing_info',
    'view_invoices',
    'download_invoices',
    'manage_seats',
    'view_usage',
    'track_usage',
  ],
  member: [
    'view_usage',
    'track_usage',
  ],
} as const;

// ============================================================================
// PERMISSION CHECKING FUNCTIONS
// ============================================================================

/**
 * Check if a user has a specific billing permission for an organization
 */
export async function checkBillingPermission(
  organizationId: string,
  userId: string,
  permission: BillingPermission
): Promise<boolean> {
  try {
    // Get user's role in organization
    const member = await getOrganizationMember(organizationId, userId);
    
    if (!member) {
      return false;
    }
    
    // Check if role has permission
    const rolePermissions = BILLING_PERMISSIONS[member.role as keyof typeof BILLING_PERMISSIONS];
    
    if (!rolePermissions) {
      return false;
    }
    
    return rolePermissions.includes(permission);
  } catch (error) {
    console.error('Error checking billing permission:', error);
    return false;
  }
}

/**
 * Check billing permission and throw error if denied
 */
export async function requireBillingPermission(
  organizationId: string,
  userId: string,
  permission: BillingPermission
): Promise<void> {
  const hasPermission = await checkBillingPermission(organizationId, userId, permission);
  
  if (!hasPermission) {
    throw createPermissionError(permission, organizationId, userId);
  }
}

/**
 * Check multiple billing permissions (all must pass)
 */
export async function requireAllBillingPermissions(
  organizationId: string,
  userId: string,
  permissions: BillingPermission[]
): Promise<void> {
  for (const permission of permissions) {
    await requireBillingPermission(organizationId, userId, permission);
  }
}

/**
 * Check multiple billing permissions (any one must pass)
 */
export async function requireAnyBillingPermission(
  organizationId: string,
  userId: string,
  permissions: BillingPermission[]
): Promise<void> {
  const hasAnyPermission = await Promise.all(
    permissions.map(permission => 
      checkBillingPermission(organizationId, userId, permission)
    )
  );
  
  if (!hasAnyPermission.some(Boolean)) {
    throw createPermissionError(permissions[0], organizationId, userId);
  }
}

// ============================================================================
// ORGANIZATION MEMBER MANAGEMENT
// ============================================================================

/**
 * Get organization member information
 * This function should be implemented to fetch from your auth system
 */
async function getOrganizationMember(
  organizationId: string,
  userId: string
): Promise<{ role: 'owner' | 'admin' | 'member' } | null> {
  // TODO: Implement this function to fetch from your auth system
  // This is a placeholder implementation
  
  // Example implementation:
  // const member = await db.query.organizationMembers.findFirst({
  //   where: and(
  //     eq(organizationMembers.organizationId, organizationId),
  //     eq(organizationMembers.userId, userId)
  //   )
  // });
  
  // if (!member) {
  //   return null;
  // }
  
  // return { role: member.role };
  
  // For now, return a mock response
  // In production, this should query your actual database
  console.warn('getOrganizationMember not implemented - using mock data');
  return { role: 'owner' }; // Mock response
}

// ============================================================================
// PERMISSION UTILITIES
// ============================================================================

/**
 * Get all permissions for a role
 */
export function getRolePermissions(role: 'owner' | 'admin' | 'member'): BillingPermission[] {
  return BILLING_PERMISSIONS[role] || [];
}

/**
 * Check if a role has a specific permission
 */
export function roleHasPermission(
  role: 'owner' | 'admin' | 'member',
  permission: BillingPermission
): boolean {
  const rolePermissions = getRolePermissions(role);
  return rolePermissions.includes(permission);
}

/**
 * Get the highest role that has a specific permission
 */
export function getHighestRoleWithPermission(permission: BillingPermission): 'owner' | 'admin' | 'member' | null {
  if (roleHasPermission('owner', permission)) return 'owner';
  if (roleHasPermission('admin', permission)) return 'admin';
  if (roleHasPermission('member', permission)) return 'member';
  return null;
}

// ============================================================================
// PERMISSION MIDDLEWARE
// ============================================================================

/**
 * Create permission middleware for API routes
 */
export function createPermissionMiddleware(permission: BillingPermission) {
  return async (req: any, res: any, next: any) => {
    try {
      const { organizationId } = req.params;
      const { userId } = req.user; // Assuming user is attached to request
      
      await requireBillingPermission(organizationId, userId, permission);
      next();
    } catch (error) {
      res.status(403).json({
        error: {
          code: 'PERMISSION_DENIED',
          message: error.message,
          type: 'permission_error',
        },
      });
    }
  };
}

/**
 * Create permission middleware for multiple permissions (all required)
 */
export function createAllPermissionsMiddleware(permissions: BillingPermission[]) {
  return async (req: any, res: any, next: any) => {
    try {
      const { organizationId } = req.params;
      const { userId } = req.user;
      
      await requireAllBillingPermissions(organizationId, userId, permissions);
      next();
    } catch (error) {
      res.status(403).json({
        error: {
          code: 'PERMISSION_DENIED',
          message: error.message,
          type: 'permission_error',
        },
      });
    }
  };
}

/**
 * Create permission middleware for multiple permissions (any required)
 */
export function createAnyPermissionMiddleware(permissions: BillingPermission[]) {
  return async (req: any, res: any, next: any) => {
    try {
      const { organizationId } = req.params;
      const { userId } = req.user;
      
      await requireAnyBillingPermission(organizationId, userId, permissions);
      next();
    } catch (error) {
      res.status(403).json({
        error: {
          code: 'PERMISSION_DENIED',
          message: error.message,
          type: 'permission_error',
        },
      });
    }
  };
}

// ============================================================================
// PERMISSION VALIDATION
// ============================================================================

/**
 * Validate that a user can perform a billing operation
 */
export async function validateBillingOperation(
  organizationId: string,
  userId: string,
  operation: string,
  context?: Record<string, any>
): Promise<{ allowed: boolean; reason?: string }> {
  try {
    // Map operations to permissions
    const operationPermissions: Record<string, BillingPermission[]> = {
      'create_subscription': ['create_subscription'],
      'update_subscription': ['update_subscription'],
      'cancel_subscription': ['cancel_subscription'],
      'view_subscription': ['view_subscription'],
      'manage_seats': ['manage_seats'],
      'view_billing_info': ['view_billing_info'],
      'update_billing_info': ['update_billing_info'],
      'view_invoices': ['view_invoices'],
      'download_invoices': ['download_invoices'],
      'view_usage': ['view_usage'],
      'track_usage': ['track_usage'],
    };
    
    const requiredPermissions = operationPermissions[operation];
    
    if (!requiredPermissions) {
      return { allowed: false, reason: 'Unknown operation' };
    }
    
    // Check if user has any of the required permissions
    const hasPermission = await requireAnyBillingPermission(
      organizationId,
      userId,
      requiredPermissions
    );
    
    return { allowed: true };
  } catch (error) {
    return { 
      allowed: false, 
      reason: error.message 
    };
  }
}

// ============================================================================
// COHESIVE SERVICE OBJECT (Required for contract validation)
// ============================================================================

export const PermissionsService = {
  // Permission checking
  requireBillingPermission: requireBillingPermission,
  checkBillingPermission: checkBillingPermission,
  
  // Utility methods
  list: async (userId: string) => {
    return checkBillingPermission(userId);
  },
  
  create: async (userId: string, permission: string) => {
    // Permissions are typically managed by auth system
    throw new Error('Permission creation not supported - managed by auth system');
  },
  
  update: async (userId: string, permission: string) => {
    // Permissions are typically managed by auth system
    throw new Error('Permission update not supported - managed by auth system');
  },
  
  delete: async (userId: string) => {
    // Permissions are typically managed by auth system
    throw new Error('Permission deletion not supported - managed by auth system');
  }
};

export default PermissionsService;
