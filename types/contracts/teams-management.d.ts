/**
 * teams-management Contract Types
 * 
 * Auto-generated from contract.ts
 */
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
export interface TeamsManagementError {
  code: string;
  message: string;
  type: 'validation_error' | 'permission_error' | 'not_found_error' | 'conflict_error';
  field?: string;
  details?: Record<string, any>;
}
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
export interface ITeamsService {
  useTeams: () => {
    list: any; // UseQueryResult<Team[], Error>
    get: (id: string) => any; // UseQueryResult<Team, Error>
    create: any; // UseMutationResult<TeamResult, Error, CreateTeamData>
    update: any; // UseMutationResult<TeamResult, Error, { id: string; data: UpdateTeamData }>
    delete: any; // UseMutationResult<void, Error, string>
    leave: any; // UseMutationResult<void, Error, string>
  };
  useMembers: () => {
    list: (teamId: string) => any; // UseQueryResult<TeamMember[], Error>
    get: (teamId: string, userId: string) => any; // UseQueryResult<TeamMember, Error>
    update: any; // UseMutationResult<MemberResult, Error, { teamId: string; userId: string; data: UpdateMemberData }>
    remove: any; // UseMutationResult<void, Error, { teamId: string; userId: string }>
    bulkRemove: any; // UseMutationResult<void, Error, { teamId: string; userIds: string[] }>
  };
  useInvitations: () => {
    list: (teamId?: string) => any; // UseQueryResult<TeamInvitation[], Error>
    get: (id: string) => any; // UseQueryResult<TeamInvitation, Error>
    invite: any; // UseMutationResult<InvitationResult, Error, { teamId: string; data: InviteMemberData }>
    bulkInvite: any; // UseMutationResult<InvitationResult[], Error, { teamId: string; data: InviteMemberData[] }>
    accept: any; // UseMutationResult<AcceptInvitationResult, Error, AcceptInvitationData>
    decline: any; // UseMutationResult<void, Error, DeclineInvitationData>
    cancel: any; // UseMutationResult<void, Error, string>
    resend: any; // UseMutationResult<InvitationResult, Error, string>
  };
  useAnalytics: () => {
    getTeamAnalytics: (teamId: string) => any; // UseQueryResult<TeamAnalytics, Error>
    getActivities: (teamId: string, filters?: ActivityFilters) => any; // UseQueryResult<TeamActivity[], Error>
  };
  usePermissions: () => {
    getPermissions: (teamId: string, userId: string) => any; // UseQueryResult<Permission[], Error>
    hasPermission: (teamId: string, userId: string, permission: Permission) => any; // UseQueryResult<boolean, Error>
  };
}