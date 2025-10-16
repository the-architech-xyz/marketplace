/**
 * Teams Management Feature Index - Centralized Exports
 * 
 * This file provides centralized exports for the Teams Management feature.
 * Import commonly used types, schemas, hooks, and stores from this file.
 * 
 * Generated from: features/teams-management/contract.ts
 */

// ============================================================================
// TYPES
// ============================================================================

export type {
  // Core types
  TeamRole,
  TeamStatus,
  InvitationStatus,
  Permission,
  Team,
  TeamMember,
  TeamInvitation,
  TeamActivity,
  TeamAnalytics,
  
  // Input types
  CreateTeamData,
  UpdateTeamData,
  InviteMemberData,
  UpdateMemberData,
  AcceptInvitationData,
  DeclineInvitationData,
  
  // Result types
  TeamResult,
  MemberResult,
  InvitationResult,
  AcceptInvitationResult,
  
  // Filter types
  TeamFilters,
  MemberFilters,
  InvitationFilters,
  ActivityFilters,
  
  // Error types
  TeamsManagementError,
  
  // Configuration types
  TeamsManagementConfig,
  
  // Service interface
  ITeamsService,
  
  // Additional utility types
  TeamFormData,
  InvitationFormData,
  TeamListItem,
  MemberListItem,
  InvitationListItem,
  ActivityListItem,
  TeamStats,
  MemberStats,
  InvitationStats,
  TeamSettings,
  UserTeamMembership,
  InvitationTemplate,
  RoleConfig,
  PermissionConfig,
  ActivitySummary,
  ExportConfig,
  ImportConfig,
  NotificationSettings,
  SecuritySettings,
  IntegrationStatus,
  DashboardWidget,
  TeamSearchResult,
  BulkOperationResult
} from './types';

// ============================================================================
// SCHEMAS
// ============================================================================

export {
  // Enum schemas
  TeamRoleSchema,
  TeamStatusSchema,
  InvitationStatusSchema,
  PermissionSchema,
  
  // Core data schemas
  TeamSchema,
  TeamMemberSchema,
  TeamInvitationSchema,
  TeamActivitySchema,
  TeamAnalyticsSchema,
  
  // Input schemas
  CreateTeamDataSchema,
  UpdateTeamDataSchema,
  InviteMemberDataSchema,
  UpdateMemberDataSchema,
  AcceptInvitationDataSchema,
  DeclineInvitationDataSchema,
  
  // Result schemas
  TeamResultSchema,
  MemberResultSchema,
  InvitationResultSchema,
  AcceptInvitationResultSchema,
  
  // Filter schemas
  TeamFiltersSchema,
  MemberFiltersSchema,
  InvitationFiltersSchema,
  ActivityFiltersSchema,
  
  // Error schemas
  TeamsManagementErrorSchema,
  
  // Configuration schemas
  TeamsManagementConfigSchema,
  
  // Form schemas
  TeamFormDataSchema,
  InvitationFormDataSchema,
  
  // Utility schemas
  TeamListItemSchema,
  MemberListItemSchema,
  InvitationListItemSchema,
  ActivityListItemSchema,
  TeamStatsSchema,
  MemberStatsSchema,
  InvitationStatsSchema,
  TeamSettingsSchema,
  UserTeamMembershipSchema,
  InvitationTemplateSchema,
  RoleConfigSchema,
  PermissionConfigSchema,
  ActivitySummarySchema,
  ExportConfigSchema,
  ImportConfigSchema,
  NotificationSettingsSchema,
  SecuritySettingsSchema,
  IntegrationStatusSchema,
  DashboardWidgetSchema,
  TeamSearchResultSchema,
  BulkOperationResultSchema
} from './schemas';

// ============================================================================
// HOOKS
// ============================================================================

export {
  // Query keys
  teamsQueryKeys,
  
  // Team hooks
  useTeams,
  useTeam,
  useCreateTeam,
  useUpdateTeam,
  useDeleteTeam,
  useLeaveTeam,
  
  // Member hooks
  useTeamMembers,
  useTeamMember,
  useUpdateTeamMember,
  useRemoveTeamMember,
  useBulkRemoveTeamMembers,
  
  // Invitation hooks
  useTeamInvitations,
  useTeamInvitation,
  useInviteTeamMember,
  useBulkInviteTeamMembers,
  useAcceptTeamInvitation,
  useDeclineTeamInvitation,
  useCancelTeamInvitation,
  useResendTeamInvitation,
  
  // Activity hooks
  useTeamActivities,
  
  // Analytics hooks
  useTeamAnalytics,
  
  // Stats hooks
  useTeamStats,
  useMemberStats,
  useInvitationStats,
  
  // User membership hooks
  useUserTeamMemberships,
  
  // Permission hooks
  useUserPermissions,
  useHasPermission
} from './hooks';

// ============================================================================
// STORES
// ============================================================================

export {
  // Individual stores
  useTeamStore,
  useMemberStore,
  useInvitationStore,
  useActivityStore,
  useStatsStore,
  useUserMembershipStore,
  usePermissionStore,
  useUIStore,
  
  // Combined selectors
  useTeamState,
  useMemberState,
  useInvitationState,
  useActivityState,
  useStatsState,
  useUserMembershipState,
  usePermissionState,
  useUIState
} from './stores';

// ============================================================================
// CONVENIENCE EXPORTS
// ============================================================================

/**
 * Common team roles for UI components
 */
export const TEAM_ROLES = {
  OWNER: 'owner' as const,
  ADMIN: 'admin' as const,
  MEMBER: 'member' as const,
  VIEWER: 'viewer' as const
} as const;

/**
 * Common team statuses for UI components
 */
export const TEAM_STATUSES = {
  ACTIVE: 'active' as const,
  INACTIVE: 'inactive' as const,
  SUSPENDED: 'suspended' as const,
  ARCHIVED: 'archived' as const
} as const;

/**
 * Common invitation statuses for UI components
 */
export const INVITATION_STATUSES = {
  PENDING: 'pending' as const,
  ACCEPTED: 'accepted' as const,
  DECLINED: 'declined' as const
} as const;

/**
 * Common permissions for UI components
 */
export const PERMISSIONS = {
  READ: 'read' as const,
  WRITE: 'write' as const,
  DELETE: 'delete' as const,
  ADMIN: 'admin' as const,
  INVITE: 'invite' as const,
  BILLING: 'billing' as const
} as const;

/**
 * Default team form data
 */
export const DEFAULT_TEAM_FORM_DATA = {
  name: '',
  description: '',
  settings: {
    allowInvites: true,
    requireApproval: false,
    defaultRole: 'member' as const,
    permissions: ['read', 'write'] as const[]
  }
} as const;

/**
 * Default invitation form data
 */
export const DEFAULT_INVITATION_FORM_DATA = {
  email: '',
  role: 'member' as const,
  message: ''
} as const;

/**
 * Default filters for different views
 */
export const DEFAULT_FILTERS = {
  team: {},
  member: {},
  invitation: {},
  activity: {}
} as const;

/**
 * Common team actions for activity logging
 */
export const TEAM_ACTIONS = {
  TEAM_CREATED: 'team.created',
  TEAM_UPDATED: 'team.updated',
  TEAM_DELETED: 'team.deleted',
  MEMBER_JOINED: 'member.joined',
  MEMBER_LEFT: 'member.left',
  MEMBER_REMOVED: 'member.removed',
  MEMBER_ROLE_CHANGED: 'member.role_changed',
  INVITATION_SENT: 'invitation.sent',
  INVITATION_ACCEPTED: 'invitation.accepted',
  INVITATION_DECLINED: 'invitation.declined',
  INVITATION_CANCELLED: 'invitation.cancelled',
  INVITATION_RESENT: 'invitation.resent',
  SETTINGS_UPDATED: 'settings.updated',
  PERMISSIONS_UPDATED: 'permissions.updated'
} as const;

/**
 * Common team settings categories
 */
export const TEAM_SETTINGS_CATEGORIES = {
  GENERAL: 'general',
  MEMBERS: 'members',
  INVITATIONS: 'invitations',
  PERMISSIONS: 'permissions',
  SECURITY: 'security',
  NOTIFICATIONS: 'notifications',
  INTEGRATIONS: 'integrations',
  BILLING: 'billing'
} as const;

/**
 * Common invitation templates
 */
export const INVITATION_TEMPLATES = {
  DEFAULT: 'default',
  WELCOME: 'welcome',
  COLLABORATION: 'collaboration',
  PROJECT: 'project',
  CUSTOM: 'custom'
} as const;

/**
 * Common export formats
 */
export const EXPORT_FORMATS = {
  CSV: 'csv' as const,
  XLSX: 'xlsx' as const,
  PDF: 'pdf' as const
} as const;

/**
 * Common import formats
 */
export const IMPORT_FORMATS = {
  CSV: 'csv' as const,
  XLSX: 'xlsx' as const
} as const;

/**
 * Common notification types
 */
export const NOTIFICATION_TYPES = {
  EMAIL: 'email' as const,
  IN_APP: 'in_app' as const,
  WEBHOOK: 'webhook' as const
} as const;

/**
 * Common dashboard widget types
 */
export const DASHBOARD_WIDGET_TYPES = {
  STATS: 'stats' as const,
  MEMBERS: 'members' as const,
  ACTIVITIES: 'activities' as const,
  INVITATIONS: 'invitations' as const,
  ANALYTICS: 'analytics' as const
} as const;

/**
 * Common chart types for analytics
 */
export const CHART_TYPES = {
  LINE: 'line' as const,
  BAR: 'bar' as const,
  PIE: 'pie' as const,
  AREA: 'area' as const
} as const;

/**
 * Common date ranges for analytics
 */
export const DATE_RANGES = {
  TODAY: 'today',
  YESTERDAY: 'yesterday',
  LAST_7_DAYS: 'last_7_days',
  LAST_30_DAYS: 'last_30_days',
  LAST_90_DAYS: 'last_90_days',
  THIS_MONTH: 'this_month',
  LAST_MONTH: 'last_month',
  THIS_YEAR: 'this_year',
  LAST_YEAR: 'last_year',
  CUSTOM: 'custom'
} as const;

/**
 * Common integration providers
 */
export const INTEGRATION_PROVIDERS = {
  SLACK: 'slack',
  MICROSOFT_TEAMS: 'microsoft_teams',
  DISCORD: 'discord',
  GOOGLE_WORKSPACE: 'google_workspace',
  ZOOM: 'zoom',
  CALENDLY: 'calendly',
  TRELLO: 'trello',
  ASANA: 'asana',
  JIRA: 'jira',
  GITHUB: 'github',
  GITLAB: 'gitlab',
  BITBUCKET: 'bitbucket'
} as const;

/**
 * Common security levels
 */
export const SECURITY_LEVELS = {
  BASIC: 'basic' as const,
  STANDARD: 'standard' as const,
  HIGH: 'high' as const,
  ENTERPRISE: 'enterprise' as const
} as const;

/**
 * Common permission categories
 */
export const PERMISSION_CATEGORIES = {
  TEAM_MANAGEMENT: 'team_management',
  MEMBER_MANAGEMENT: 'member_management',
  INVITATION_MANAGEMENT: 'invitation_management',
  SETTINGS_MANAGEMENT: 'settings_management',
  BILLING_MANAGEMENT: 'billing_management',
  ANALYTICS_ACCESS: 'analytics_access',
  INTEGRATION_MANAGEMENT: 'integration_management'
} as const;

/**
 * Common role hierarchies
 */
export const ROLE_HIERARCHIES = {
  OWNER: 4,
  ADMIN: 3,
  MEMBER: 2,
  VIEWER: 1
} as const;

/**
 * Common team limits
 */
export const TEAM_LIMITS = {
  MAX_TEAMS_PER_USER: 10,
  MAX_MEMBERS_PER_TEAM: 100,
  MAX_INVITATIONS_PER_TEAM: 50,
  INVITATION_EXPIRY_DAYS: 7,
  MAX_INVITATIONS_PER_DAY: 20
} as const;

/**
 * Common team features
 */
export const TEAM_FEATURES = {
  INVITATIONS: 'invitations',
  ANALYTICS: 'analytics',
  ACTIVITY_LOGGING: 'activity_logging',
  ROLE_MANAGEMENT: 'role_management',
  PERMISSION_SYSTEM: 'permission_system',
  BULK_OPERATIONS: 'bulk_operations',
  EXPORT_IMPORT: 'export_import',
  INTEGRATIONS: 'integrations',
  WEBHOOKS: 'webhooks',
  API_ACCESS: 'api_access'
} as const;
