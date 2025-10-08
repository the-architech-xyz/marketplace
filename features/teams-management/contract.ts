/**
 * Teams Management Feature Contract - Cohesive Business Hook Services
 * 
 * This is the single source of truth for the Teams Management feature.
 * All backend implementations must implement the ITeamsService interface.
 * All frontend implementations must consume the ITeamsService interface.
 * 
 * The contract defines cohesive business services, not individual hooks.
 */

// Note: TanStack Query types are imported by the implementing service, not the contract

// ============================================================================
// CORE TYPES
// ============================================================================

export type TeamRole = 
  | 'owner' 
  | 'admin' 
  | 'member' 
  | 'viewer';

export type TeamStatus = 
  | 'active' 
  | 'inactive' 
  | 'suspended' 
  | 'archived';

export type InvitationStatus = 
  | 'pending' 
  | 'accepted' 
  | 'declined';

export type Permission = 
  | 'read' 
  | 'write' 
  | 'delete' 
  | 'admin' 
  | 'invite' 
  | 'billing';

// ============================================================================
// DATA TYPES
// ============================================================================

export interface Team {
  id: string;
  name: string;
  description?: string;
  status: TeamStatus;
  ownerId: string;
  memberCount: number;
  maxMembers?: number;
  settings: {
    allowInvites: boolean;
    requireApproval: boolean;
    defaultRole: TeamRole;
    permissions: Permission[];
  };
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  id: string;
  teamId: string;
  userId: string;
  role: TeamRole;
  status: 'active' | 'inactive' | 'pending';
  joinedAt: string;
  invitedBy?: string;
  permissions: Permission[];
  metadata?: Record<string, any>;
  user: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
}

export interface TeamInvitation {
  id: string;
  teamId: string;
  email: string;
  role: TeamRole;
  status: InvitationStatus;
  invitedBy: string;
  expiresAt: string;
  acceptedAt?: string;
  declinedAt?: string;
  createdAt: string;
  updatedAt: string;
  team: {
    id: string;
    name: string;
  };
  inviter: {
    id: string;
    name: string;
    email: string;
  };
}

export interface TeamActivity {
  id: string;
  teamId: string;
  userId: string;
  action: string;
  description: string;
  metadata?: Record<string, any>;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface TeamAnalytics {
  teamId: string;
  memberCount: number;
  activeMembers: number;
  pendingInvitations: number;
  activitiesThisWeek: number;
  activitiesThisMonth: number;
  mostActiveMembers: Array<{
    userId: string;
    name: string;
    activityCount: number;
  }>;
  recentActivities: TeamActivity[];
}

// ============================================================================
// INPUT TYPES
// ============================================================================

export interface CreateTeamData {
  name: string;
  description?: string;
  settings?: {
    allowInvites?: boolean;
    requireApproval?: boolean;
    defaultRole?: TeamRole;
    permissions?: Permission[];
  };
  metadata?: Record<string, any>;
}

export interface UpdateTeamData {
  name?: string;
  description?: string;
  status?: TeamStatus;
  settings?: {
    allowInvites?: boolean;
    requireApproval?: boolean;
    defaultRole?: TeamRole;
    permissions?: Permission[];
  };
  metadata?: Record<string, any>;
}

export interface InviteMemberData {
  email: string;
  role: TeamRole;
  message?: string;
}

export interface UpdateMemberData {
  role?: TeamRole;
  permissions?: Permission[];
  status?: 'active' | 'inactive';
}

export interface AcceptInvitationData {
  invitationId: string;
  userId: string;
}

export interface DeclineInvitationData {
  invitationId: string;
  reason?: string;
}

// ============================================================================
// RESULT TYPES
// ============================================================================

export interface TeamResult {
  team: Team;
  success: boolean;
  message?: string;
}

export interface MemberResult {
  member: TeamMember;
  success: boolean;
  message?: string;
}

export interface InvitationResult {
  invitation: TeamInvitation;
  success: boolean;
  message?: string;
}

export interface AcceptInvitationResult {
  member: TeamMember;
  team: Team;
  success: boolean;
  message?: string;
}

// ============================================================================
// FILTER TYPES
// ============================================================================

export interface TeamFilters {
  status?: TeamStatus[];
  ownerId?: string;
  search?: string;
  createdAfter?: string;
  createdBefore?: string;
}

export interface MemberFilters {
  role?: TeamRole[];
  status?: ('active' | 'inactive' | 'pending')[];
  search?: string;
  joinedAfter?: string;
  joinedBefore?: string;
}

export interface InvitationFilters {
  status?: InvitationStatus[];
  role?: TeamRole[];
  search?: string;
  invitedAfter?: string;
  invitedBefore?: string;
}

export interface ActivityFilters {
  userId?: string;
  action?: string;
  after?: string;
  before?: string;
  limit?: number;
}

// ============================================================================
// ERROR TYPES
// ============================================================================

export interface TeamsManagementError {
  code: string;
  message: string;
  type: 'validation_error' | 'permission_error' | 'not_found_error' | 'conflict_error';
  field?: string;
  details?: Record<string, any>;
}

// ============================================================================
// CONFIGURATION TYPES
// ============================================================================

export interface TeamsManagementConfig {
  features: {
    invitations: boolean;
    analytics: boolean;
    activityLogging: boolean;
    roleManagement: boolean;
    permissionSystem: boolean;
  };
  limits: {
    maxTeamsPerUser: number;
    maxMembersPerTeam: number;
    maxInvitationsPerTeam: number;
    invitationExpiryDays: number;
  };
  security: {
    requireEmailVerification: boolean;
    allowSelfInvite: boolean;
    requireApprovalForInvites: boolean;
  };
}

// ============================================================================
// COHESIVE BUSINESS HOOK SERVICES
// ============================================================================

/**
 * Teams Service Contract - Cohesive Business Hook Services
 * 
 * This interface defines cohesive business services that group related functionality.
 * Each service method returns an object containing all related queries and mutations.
 * 
 * Backend implementations must provide this service.
 * Frontend implementations must consume this service.
 */
export interface ITeamsService {
  /**
   * Team Management Service
   * Provides all team-related operations in a cohesive interface
   */
  useTeams: () => {
    // Query operations
    list: any; // UseQueryResult<Team[], Error>
    get: (id: string) => any; // UseQueryResult<Team, Error>
    
    // Mutation operations
    create: any; // UseMutationResult<TeamResult, Error, CreateTeamData>
    update: any; // UseMutationResult<TeamResult, Error, { id: string; data: UpdateTeamData }>
    delete: any; // UseMutationResult<void, Error, string>
    leave: any; // UseMutationResult<void, Error, string>
  };

  /**
   * Member Management Service
   * Provides all team member-related operations in a cohesive interface
   */
  useMembers: () => {
    // Query operations
    list: (teamId: string) => any; // UseQueryResult<TeamMember[], Error>
    get: (teamId: string, userId: string) => any; // UseQueryResult<TeamMember, Error>
    
    // Mutation operations
    update: any; // UseMutationResult<MemberResult, Error, { teamId: string; userId: string; data: UpdateMemberData }>
    remove: any; // UseMutationResult<void, Error, { teamId: string; userId: string }>
    bulkRemove: any; // UseMutationResult<void, Error, { teamId: string; userIds: string[] }>
  };

  /**
   * Invitation Management Service
   * Provides all team invitation-related operations in a cohesive interface
   */
  useInvitations: () => {
    // Query operations
    list: (teamId?: string) => any; // UseQueryResult<TeamInvitation[], Error>
    get: (id: string) => any; // UseQueryResult<TeamInvitation, Error>
    
    // Mutation operations
    invite: any; // UseMutationResult<InvitationResult, Error, { teamId: string; data: InviteMemberData }>
    bulkInvite: any; // UseMutationResult<InvitationResult[], Error, { teamId: string; data: InviteMemberData[] }>
    accept: any; // UseMutationResult<AcceptInvitationResult, Error, AcceptInvitationData>
    decline: any; // UseMutationResult<void, Error, DeclineInvitationData>
    cancel: any; // UseMutationResult<void, Error, string>
    resend: any; // UseMutationResult<InvitationResult, Error, string>
  };

  /**
   * Analytics Service
   * Provides team analytics and reporting
   */
  useAnalytics: () => {
    // Query operations
    getTeamAnalytics: (teamId: string) => any; // UseQueryResult<TeamAnalytics, Error>
    getActivities: (teamId: string, filters?: ActivityFilters) => any; // UseQueryResult<TeamActivity[], Error>
  };

  /**
   * Permissions Service
   * Provides permission checking and management
   */
  usePermissions: () => {
    // Query operations
    getPermissions: (teamId: string, userId: string) => any; // UseQueryResult<Permission[], Error>
    hasPermission: (teamId: string, userId: string, permission: Permission) => any; // UseQueryResult<boolean, Error>
  };
}