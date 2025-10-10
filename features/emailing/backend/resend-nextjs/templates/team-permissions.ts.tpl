/**
 * Team Email Permissions
 * 
 * Simple permission checks for team-based email operations
 */

export interface TeamEmailContext {
  userId: string;
  teamId: string;
  teamRole?: 'owner' | 'admin' | 'member';
}

export const TeamEmailPermissions = {
  /**
   * Check if user can send emails on behalf of the team
   */
  canSendTeamEmail(context: TeamEmailContext): { allowed: boolean; reason?: string } {
    if (!context.teamRole) {
      return { allowed: false, reason: 'User is not a member of this team' };
    }
    
    // Only owners and admins can send team emails
    if (context.teamRole === 'owner' || context.teamRole === 'admin') {
      return { allowed: true };
    }
    
    return { allowed: false, reason: 'Insufficient permissions. Only team owners and admins can send team emails.' };
  },

  /**
   * Check if user can manage team email templates
   */
  canManageTeamTemplates(context: TeamEmailContext): { allowed: boolean; reason?: string } {
    if (!context.teamRole) {
      return { allowed: false, reason: 'User is not a member of this team' };
    }
    
    // Only owners and admins can manage templates
    if (context.teamRole === 'owner' || context.teamRole === 'admin') {
      return { allowed: true };
    }
    
    return { allowed: false, reason: 'Insufficient permissions. Only team owners and admins can manage templates.' };
  },

  /**
   * Check if user can view team email analytics
   */
  canViewTeamAnalytics(context: TeamEmailContext): { allowed: boolean; reason?: string } {
    if (!context.teamRole) {
      return { allowed: false, reason: 'User is not a member of this team' };
    }
    
    // All team members can view analytics
    return { allowed: true };
  }
};
