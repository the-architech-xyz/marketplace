/**
 * Teams Management Feature Schemas - Zod Validation Schemas
 * 
 * This file contains all Zod validation schemas for the Teams Management feature.
 * These schemas provide runtime type checking and validation for all data structures.
 * 
 * Generated from: features/teams-management/contract.ts
 */

import { z } from 'zod';

// ============================================================================
// ENUM SCHEMAS
// ============================================================================

export const TeamRoleSchema = z.enum([
  'owner',
  'admin',
  'member',
  'viewer'
]);

export const TeamStatusSchema = z.enum([
  'active',
  'inactive',
  'suspended',
  'archived'
]);

export const InvitationStatusSchema = z.enum([
  'pending',
  'accepted',
  'declined'
]);

export const PermissionSchema = z.enum([
  'read',
  'write',
  'delete',
  'admin',
  'invite',
  'billing'
]);

// ============================================================================
// CORE DATA SCHEMAS
// ============================================================================

export const TeamSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  description: z.string().optional(),
  status: TeamStatusSchema,
  ownerId: z.string(),
  memberCount: z.number().nonnegative(),
  maxMembers: z.number().positive().optional(),
  settings: z.object({
    allowInvites: z.boolean(),
    requireApproval: z.boolean(),
    defaultRole: TeamRoleSchema,
    permissions: z.array(PermissionSchema)
  }),
  metadata: z.record(z.any()).optional(),
  createdAt: z.string(),
  updatedAt: z.string()
});

export const TeamMemberSchema = z.object({
  id: z.string(),
  teamId: z.string(),
  userId: z.string(),
  role: TeamRoleSchema,
  status: z.enum(['active', 'inactive', 'pending']),
  joinedAt: z.string(),
  invitedBy: z.string().optional(),
  permissions: z.array(PermissionSchema),
  metadata: z.record(z.any()).optional(),
  user: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    image: z.string().url().optional()
  })
});

export const TeamInvitationSchema = z.object({
  id: z.string(),
  teamId: z.string(),
  email: z.string().email(),
  role: TeamRoleSchema,
  status: InvitationStatusSchema,
  invitedBy: z.string(),
  expiresAt: z.string(),
  acceptedAt: z.string().optional(),
  declinedAt: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  team: z.object({
    id: z.string(),
    name: z.string()
  }),
  inviter: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email()
  })
});

export const TeamActivitySchema = z.object({
  id: z.string(),
  teamId: z.string(),
  userId: z.string(),
  action: z.string(),
  description: z.string(),
  metadata: z.record(z.any()).optional(),
  createdAt: z.string(),
  user: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email()
  })
});

export const TeamAnalyticsSchema = z.object({
  teamId: z.string(),
  memberCount: z.number().nonnegative(),
  activeMembers: z.number().nonnegative(),
  pendingInvitations: z.number().nonnegative(),
  activitiesThisWeek: z.number().nonnegative(),
  activitiesThisMonth: z.number().nonnegative(),
  mostActiveMembers: z.array(z.object({
    userId: z.string(),
    name: z.string(),
    activityCount: z.number().nonnegative()
  })),
  recentActivities: z.array(TeamActivitySchema)
});

// ============================================================================
// INPUT SCHEMAS
// ============================================================================

export const CreateTeamDataSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  settings: z.object({
    allowInvites: z.boolean().optional(),
    requireApproval: z.boolean().optional(),
    defaultRole: TeamRoleSchema.optional(),
    permissions: z.array(PermissionSchema).optional()
  }).optional(),
  metadata: z.record(z.any()).optional()
});

export const UpdateTeamDataSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  status: TeamStatusSchema.optional(),
  settings: z.object({
    allowInvites: z.boolean().optional(),
    requireApproval: z.boolean().optional(),
    defaultRole: TeamRoleSchema.optional(),
    permissions: z.array(PermissionSchema).optional()
  }).optional(),
  metadata: z.record(z.any()).optional()
});

export const InviteMemberDataSchema = z.object({
  email: z.string().email(),
  role: TeamRoleSchema,
  message: z.string().optional()
});

export const UpdateMemberDataSchema = z.object({
  role: TeamRoleSchema.optional(),
  permissions: z.array(PermissionSchema).optional(),
  status: z.enum(['active', 'inactive']).optional()
});

export const AcceptInvitationDataSchema = z.object({
  invitationId: z.string(),
  userId: z.string()
});

export const DeclineInvitationDataSchema = z.object({
  invitationId: z.string(),
  reason: z.string().optional()
});

// ============================================================================
// RESULT SCHEMAS
// ============================================================================

export const TeamResultSchema = z.object({
  team: TeamSchema,
  success: z.boolean(),
  message: z.string().optional()
});

export const MemberResultSchema = z.object({
  member: TeamMemberSchema,
  success: z.boolean(),
  message: z.string().optional()
});

export const InvitationResultSchema = z.object({
  invitation: TeamInvitationSchema,
  success: z.boolean(),
  message: z.string().optional()
});

export const AcceptInvitationResultSchema = z.object({
  member: TeamMemberSchema,
  team: TeamSchema,
  success: z.boolean(),
  message: z.string().optional()
});

// ============================================================================
// FILTER SCHEMAS
// ============================================================================

export const TeamFiltersSchema = z.object({
  status: z.array(TeamStatusSchema).optional(),
  ownerId: z.string().optional(),
  search: z.string().optional(),
  createdAfter: z.string().optional(),
  createdBefore: z.string().optional()
});

export const MemberFiltersSchema = z.object({
  role: z.array(TeamRoleSchema).optional(),
  status: z.array(z.enum(['active', 'inactive', 'pending'])).optional(),
  search: z.string().optional(),
  joinedAfter: z.string().optional(),
  joinedBefore: z.string().optional()
});

export const InvitationFiltersSchema = z.object({
  status: z.array(InvitationStatusSchema).optional(),
  role: z.array(TeamRoleSchema).optional(),
  search: z.string().optional(),
  invitedAfter: z.string().optional(),
  invitedBefore: z.string().optional()
});

export const ActivityFiltersSchema = z.object({
  userId: z.string().optional(),
  action: z.string().optional(),
  after: z.string().optional(),
  before: z.string().optional(),
  limit: z.number().positive().optional()
});

// ============================================================================
// ERROR SCHEMAS
// ============================================================================

export const TeamsManagementErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  type: z.enum(['validation_error', 'permission_error', 'not_found_error', 'conflict_error']),
  field: z.string().optional(),
  details: z.record(z.any()).optional()
});

// ============================================================================
// CONFIGURATION SCHEMAS
// ============================================================================

export const TeamsManagementConfigSchema = z.object({
  features: z.object({
    invitations: z.boolean(),
    analytics: z.boolean(),
    activityLogging: z.boolean(),
    roleManagement: z.boolean(),
    permissionSystem: z.boolean()
  }),
  limits: z.object({
    maxTeamsPerUser: z.number().positive(),
    maxMembersPerTeam: z.number().positive(),
    maxInvitationsPerTeam: z.number().positive(),
    invitationExpiryDays: z.number().positive()
  }),
  security: z.object({
    requireEmailVerification: z.boolean(),
    allowSelfInvite: z.boolean(),
    requireApprovalForInvites: z.boolean()
  })
});

// ============================================================================
// FORM SCHEMAS
// ============================================================================

export const TeamFormDataSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  settings: z.object({
    allowInvites: z.boolean(),
    requireApproval: z.boolean(),
    defaultRole: TeamRoleSchema,
    permissions: z.array(PermissionSchema)
  })
});

export const InvitationFormDataSchema = z.object({
  email: z.string().email(),
  role: TeamRoleSchema,
  message: z.string().optional()
});

// ============================================================================
// UTILITY SCHEMAS
// ============================================================================

export const TeamListItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  status: TeamStatusSchema,
  ownerId: z.string(),
  memberCount: z.number().nonnegative(),
  maxMembers: z.number().positive().optional(),
  createdAt: z.string(),
  updatedAt: z.string()
});

export const MemberListItemSchema = z.object({
  id: z.string(),
  teamId: z.string(),
  userId: z.string(),
  role: TeamRoleSchema,
  status: z.enum(['active', 'inactive', 'pending']),
  joinedAt: z.string(),
  invitedBy: z.string().optional(),
  permissions: z.array(PermissionSchema),
  user: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    image: z.string().url().optional()
  })
});

export const InvitationListItemSchema = z.object({
  id: z.string(),
  teamId: z.string(),
  email: z.string().email(),
  role: TeamRoleSchema,
  status: InvitationStatusSchema,
  invitedBy: z.string(),
  expiresAt: z.string(),
  acceptedAt: z.string().optional(),
  declinedAt: z.string().optional(),
  createdAt: z.string(),
  team: z.object({
    id: z.string(),
    name: z.string()
  }),
  inviter: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email()
  })
});

export const ActivityListItemSchema = z.object({
  id: z.string(),
  teamId: z.string(),
  userId: z.string(),
  action: z.string(),
  description: z.string(),
  metadata: z.record(z.any()).optional(),
  createdAt: z.string(),
  user: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email()
  })
});

export const TeamStatsSchema = z.object({
  totalTeams: z.number().nonnegative(),
  activeTeams: z.number().nonnegative(),
  totalMembers: z.number().nonnegative(),
  activeMembers: z.number().nonnegative(),
  pendingInvitations: z.number().nonnegative(),
  totalActivities: z.number().nonnegative(),
  activitiesThisWeek: z.number().nonnegative(),
  activitiesThisMonth: z.number().nonnegative(),
  averageMembersPerTeam: z.number().nonnegative(),
  mostActiveTeam: z.object({
    id: z.string(),
    name: z.string(),
    activityCount: z.number().nonnegative()
  }).optional()
});

export const MemberStatsSchema = z.object({
  totalMembers: z.number().nonnegative(),
  activeMembers: z.number().nonnegative(),
  pendingMembers: z.number().nonnegative(),
  inactiveMembers: z.number().nonnegative(),
  owners: z.number().nonnegative(),
  admins: z.number().nonnegative(),
  members: z.number().nonnegative(),
  viewers: z.number().nonnegative(),
  newMembersThisWeek: z.number().nonnegative(),
  newMembersThisMonth: z.number().nonnegative(),
  mostActiveMember: z.object({
    id: z.string(),
    name: z.string(),
    activityCount: z.number().nonnegative()
  }).optional()
});

export const InvitationStatsSchema = z.object({
  totalInvitations: z.number().nonnegative(),
  pendingInvitations: z.number().nonnegative(),
  acceptedInvitations: z.number().nonnegative(),
  declinedInvitations: z.number().nonnegative(),
  expiredInvitations: z.number().nonnegative(),
  invitationsThisWeek: z.number().nonnegative(),
  invitationsThisMonth: z.number().nonnegative(),
  acceptanceRate: z.number().min(0).max(1),
  averageResponseTime: z.number().nonnegative()
});

export const TeamSettingsSchema = z.object({
  allowInvites: z.boolean(),
  requireApproval: z.boolean(),
  defaultRole: TeamRoleSchema,
  permissions: z.array(PermissionSchema),
  maxMembers: z.number().positive().optional(),
  allowSelfInvite: z.boolean(),
  requireEmailVerification: z.boolean(),
  invitationExpiryDays: z.number().positive(),
  allowRoleChanges: z.boolean(),
  allowMemberRemoval: z.boolean(),
  allowTeamDeletion: z.boolean(),
  activityLogging: z.boolean(),
  analyticsEnabled: z.boolean()
});

export const UserTeamMembershipSchema = z.object({
  teamId: z.string(),
  teamName: z.string(),
  role: TeamRoleSchema,
  status: z.enum(['active', 'inactive', 'pending']),
  joinedAt: z.string(),
  permissions: z.array(PermissionSchema),
  isOwner: z.boolean(),
  isAdmin: z.boolean(),
  canInvite: z.boolean(),
  canManageMembers: z.boolean(),
  canManageSettings: z.boolean()
});

export const InvitationTemplateSchema = z.object({
  id: z.string(),
  name: z.string(),
  subject: z.string(),
  message: z.string(),
  isDefault: z.boolean(),
  variables: z.array(z.string()),
  createdAt: z.string(),
  updatedAt: z.string()
});

export const RoleConfigSchema = z.object({
  role: TeamRoleSchema,
  name: z.string(),
  description: z.string(),
  permissions: z.array(PermissionSchema),
  isDefault: z.boolean(),
  canBeAssigned: z.boolean(),
  canBeChanged: z.boolean(),
  order: z.number()
});

export const PermissionConfigSchema = z.object({
  permission: PermissionSchema,
  name: z.string(),
  description: z.string(),
  category: z.string(),
  isDangerous: z.boolean(),
  requiresApproval: z.boolean()
});

export const ActivitySummarySchema = z.object({
  teamId: z.string(),
  period: z.object({
    start: z.string(),
    end: z.string()
  }),
  totalActivities: z.number().nonnegative(),
  uniqueUsers: z.number().nonnegative(),
  topActions: z.array(z.object({
    action: z.string(),
    count: z.number().nonnegative()
  })),
  topUsers: z.array(z.object({
    userId: z.string(),
    name: z.string(),
    activityCount: z.number().nonnegative()
  })),
  activityTrend: z.array(z.object({
    date: z.string(),
    count: z.number().nonnegative()
  }))
});

export const ExportConfigSchema = z.object({
  format: z.enum(['csv', 'xlsx', 'pdf']),
  includeMembers: z.boolean(),
  includeInvitations: z.boolean(),
  includeActivities: z.boolean(),
  includeAnalytics: z.boolean(),
  dateRange: z.object({
    start: z.string(),
    end: z.string()
  }).optional(),
  filters: TeamFiltersSchema.optional()
});

export const ImportConfigSchema = z.object({
  format: z.enum(['csv', 'xlsx']),
  mapping: z.object({
    name: z.string(),
    description: z.string().optional(),
    email: z.string(),
    role: z.string().optional()
  }),
  options: z.object({
    skipDuplicates: z.boolean(),
    sendInvitations: z.boolean(),
    defaultRole: TeamRoleSchema,
    requireApproval: z.boolean()
  })
});

export const NotificationSettingsSchema = z.object({
  emailNotifications: z.object({
    memberJoined: z.boolean(),
    memberLeft: z.boolean(),
    invitationSent: z.boolean(),
    invitationAccepted: z.boolean(),
    invitationDeclined: z.boolean(),
    roleChanged: z.boolean(),
    teamDeleted: z.boolean()
  }),
  inAppNotifications: z.object({
    enabled: z.boolean(),
    memberJoined: z.boolean(),
    memberLeft: z.boolean(),
    invitationReceived: z.boolean(),
    roleChanged: z.boolean()
  }),
  webhookNotifications: z.object({
    enabled: z.boolean(),
    url: z.string().url().optional(),
    events: z.array(z.string())
  })
});

export const SecuritySettingsSchema = z.object({
  requireEmailVerification: z.boolean(),
  allowSelfInvite: z.boolean(),
  requireApprovalForInvites: z.boolean(),
  maxInvitationsPerDay: z.number().positive(),
  invitationExpiryDays: z.number().positive(),
  allowRoleChanges: z.boolean(),
  requireOwnerApproval: z.boolean(),
  sessionTimeout: z.number().positive(),
  requireTwoFactor: z.boolean(),
  allowedDomains: z.array(z.string()),
  blockedDomains: z.array(z.string())
});

export const IntegrationStatusSchema = z.object({
  provider: z.string(),
  status: z.enum(['connected', 'disconnected', 'error', 'pending']),
  lastSync: z.string().optional(),
  errorMessage: z.string().optional(),
  supportedFeatures: z.array(z.string()),
  configuration: z.record(z.any())
});

export const DashboardWidgetSchema = z.object({
  id: z.string(),
  type: z.enum(['stats', 'members', 'activities', 'invitations', 'analytics']),
  title: z.string(),
  position: z.object({
    x: z.number(),
    y: z.number(),
    w: z.number(),
    h: z.number()
  }),
  config: z.object({
    teamId: z.string().optional(),
    dateRange: z.string().optional(),
    filters: z.any().optional(),
    chartType: z.enum(['line', 'bar', 'pie', 'area']).optional(),
    showTrend: z.boolean().optional(),
    showComparison: z.boolean().optional()
  }),
  isVisible: z.boolean(),
  refreshInterval: z.number().positive()
});

export const TeamSearchResultSchema = z.object({
  teams: z.array(TeamListItemSchema),
  members: z.array(MemberListItemSchema),
  invitations: z.array(InvitationListItemSchema),
  activities: z.array(ActivityListItemSchema),
  totalResults: z.number().nonnegative(),
  hasMore: z.boolean(),
  nextCursor: z.string().optional()
});

export const BulkOperationResultSchema = z.object({
  success: z.boolean(),
  processed: z.number().nonnegative(),
  succeeded: z.number().nonnegative(),
  failed: z.number().nonnegative(),
  errors: z.array(z.object({
    item: z.string(),
    error: z.string()
  })),
  results: z.array(z.any())
});
