/**
 * Email Context Hook
 * 
 * Provides user context for email operations by integrating with auth
 */

import { useAuthService } from '@/features/auth/hooks/useAuthService';
import { UserContext } from '@/features/emailing/backend/resend-nextjs/permissions';

export function useEmailContext(): {
  userContext: UserContext | null;
  isLoading: boolean;
  error: Error | null;
  isAuthenticated: boolean;
  canSendEmails: boolean;
  canManageTemplates: boolean;
  canManageCampaigns: boolean;
  canViewAnalytics: boolean;
  canSendBulkEmails: boolean;
  canManageOrgSettings: boolean;
} {
  const auth = useAuthService();
  const { session, isLoading, error } = auth.session.useSession();

  // Build user context from auth session
  const userContext: UserContext | null = session ? {
    userId: session.user.id,
    <% if (module.parameters.hasOrganizations) { %>
    organizationId: session.activeOrganizationId,
    role: session.user.role as 'owner' | 'admin' | 'member' | undefined,
    <% } %>
    <% if (module.parameters.hasTeams) { %>
    teamId: session.activeTeamId,
    teamRole: session.user.teamRole as 'owner' | 'admin' | 'member' | undefined
    <% } %>
  } : null;

  // Check permissions
  const canSendEmails = userContext ? true : false; // All authenticated users can send emails
  const canManageTemplates = userContext ? 
    (userContext.role === 'owner' || userContext.role === 'admin' || !userContext.organizationId) : false;
  const canManageCampaigns = userContext ? 
    (userContext.role === 'owner' || userContext.role === 'admin') : false;
  const canViewAnalytics = userContext ? 
    (userContext.role === 'owner' || userContext.role === 'admin') : false;
  const canSendBulkEmails = userContext ? 
    (userContext.role === 'owner' || userContext.role === 'admin') : false;
  const canManageOrgSettings = userContext ? 
    (userContext.role === 'owner') : false;

  return {
    userContext,
    isLoading,
    error: error as Error | null,
    isAuthenticated: !!session,
    canSendEmails,
    canManageTemplates,
    canManageCampaigns,
    canViewAnalytics,
    canSendBulkEmails,
    canManageOrgSettings
  };
}
