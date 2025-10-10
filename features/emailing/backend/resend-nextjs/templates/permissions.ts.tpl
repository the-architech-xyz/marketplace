/**
 * Email Permissions System
 * 
 * Handles role-based access control for email operations
 */

export interface UserContext {
  userId: string;
  organizationId?: string;
  role?: 'owner' | 'admin' | 'member';
  teamId?: string;
  teamRole?: 'owner' | 'admin' | 'member';
}

export interface EmailPermission {
  action: string;
  resource: string;
  allowed: boolean;
  reason?: string;
}

export class EmailPermissions {
  /**
   * Check if user can send emails
   */
  static canSendEmail(userContext: UserContext): EmailPermission {
    // Basic check - all authenticated users can send emails
    if (!userContext.userId) {
      return {
        action: 'send_email',
        resource: 'email',
        allowed: false,
        reason: 'User not authenticated'
      };
    }

    return {
      action: 'send_email',
      resource: 'email',
      allowed: true
    };
  }

  /**
   * Check if user can manage email templates
   */
  static canManageTemplates(userContext: UserContext): EmailPermission {
    if (!userContext.userId) {
      return {
        action: 'manage_templates',
        resource: 'email_templates',
        allowed: false,
        reason: 'User not authenticated'
      };
    }

    // Organization admins and owners can manage templates
    if (userContext.organizationId) {
      if (userContext.role === 'owner' || userContext.role === 'admin') {
        return {
          action: 'manage_templates',
          resource: 'email_templates',
          allowed: true
        };
      }
    }

    // For now, allow all authenticated users to manage templates
    // In production, you might want stricter rules
    return {
      action: 'manage_templates',
      resource: 'email_templates',
      allowed: true
    };
  }

  /**
   * Check if user can manage email campaigns
   */
  static canManageCampaigns(userContext: UserContext): EmailPermission {
    if (!userContext.userId) {
      return {
        action: 'manage_campaigns',
        resource: 'email_campaigns',
        allowed: false,
        reason: 'User not authenticated'
      };
    }

    // Organization admins and owners can manage campaigns
    if (userContext.organizationId) {
      if (userContext.role === 'owner' || userContext.role === 'admin') {
        return {
          action: 'manage_campaigns',
          resource: 'email_campaigns',
          allowed: true
        };
      }
    }

    return {
      action: 'manage_campaigns',
      resource: 'email_campaigns',
      allowed: false,
      reason: 'Insufficient permissions for campaign management'
    };
  }

  /**
   * Check if user can view email analytics
   */
  static canViewAnalytics(userContext: UserContext): EmailPermission {
    if (!userContext.userId) {
      return {
        action: 'view_analytics',
        resource: 'email_analytics',
        allowed: false,
        reason: 'User not authenticated'
      };
    }

    // Organization admins and owners can view analytics
    if (userContext.organizationId) {
      if (userContext.role === 'owner' || userContext.role === 'admin') {
        return {
          action: 'view_analytics',
          resource: 'email_analytics',
          allowed: true
        };
      }
    }

    return {
      action: 'view_analytics',
      resource: 'email_analytics',
      allowed: false,
      reason: 'Insufficient permissions for analytics access'
    };
  }

  /**
   * Check if user can send bulk emails
   */
  static canSendBulkEmails(userContext: UserContext): EmailPermission {
    if (!userContext.userId) {
      return {
        action: 'send_bulk_emails',
        resource: 'email',
        allowed: false,
        reason: 'User not authenticated'
      };
    }

    // Only organization admins and owners can send bulk emails
    if (userContext.organizationId) {
      if (userContext.role === 'owner' || userContext.role === 'admin') {
        return {
          action: 'send_bulk_emails',
          resource: 'email',
          allowed: true
        };
      }
    }

    return {
      action: 'send_bulk_emails',
      resource: 'email',
      allowed: false,
      reason: 'Insufficient permissions for bulk email sending'
    };
  }

  /**
   * Check if user can manage organization email settings
   */
  static canManageOrganizationEmailSettings(userContext: UserContext): EmailPermission {
    if (!userContext.userId) {
      return {
        action: 'manage_org_email_settings',
        resource: 'organization_email_settings',
        allowed: false,
        reason: 'User not authenticated'
      };
    }

    // Only organization owners can manage email settings
    if (userContext.organizationId && userContext.role === 'owner') {
      return {
        action: 'manage_org_email_settings',
        resource: 'organization_email_settings',
        allowed: true
      };
    }

    return {
      action: 'manage_org_email_settings',
      resource: 'organization_email_settings',
      allowed: false,
      reason: 'Only organization owners can manage email settings'
    };
  }

  /**
   * Check multiple permissions at once
   */
  static checkPermissions(
    userContext: UserContext,
    actions: string[]
  ): Record<string, EmailPermission> {
    const permissions: Record<string, EmailPermission> = {};

    actions.forEach(action => {
      switch (action) {
        case 'send_email':
          permissions[action] = this.canSendEmail(userContext);
          break;
        case 'manage_templates':
          permissions[action] = this.canManageTemplates(userContext);
          break;
        case 'manage_campaigns':
          permissions[action] = this.canManageCampaigns(userContext);
          break;
        case 'view_analytics':
          permissions[action] = this.canViewAnalytics(userContext);
          break;
        case 'send_bulk_emails':
          permissions[action] = this.canSendBulkEmails(userContext);
          break;
        case 'manage_org_email_settings':
          permissions[action] = this.canManageOrganizationEmailSettings(userContext);
          break;
        default:
          permissions[action] = {
            action,
            resource: 'unknown',
            allowed: false,
            reason: 'Unknown permission'
          };
      }
    });

    return permissions;
  }

  /**
   * Check if user has any of the required permissions
   */
  static hasAnyPermission(
    userContext: UserContext,
    actions: string[]
  ): boolean {
    const permissions = this.checkPermissions(userContext, actions);
    return Object.values(permissions).some(permission => permission.allowed);
  }

  /**
   * Check if user has all required permissions
   */
  static hasAllPermissions(
    userContext: UserContext,
    actions: string[]
  ): boolean {
    const permissions = this.checkPermissions(userContext, actions);
    return Object.values(permissions).every(permission => permission.allowed);
  }
}
