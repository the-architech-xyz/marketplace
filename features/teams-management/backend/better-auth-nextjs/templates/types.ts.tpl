/**
 * Teams Management Types
 * 
 * Comprehensive type definitions for the team management system
 */

export interface Team {
  id: string;
  name: string;
  description?: string;
  slug: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
  ownerId: string;
  settings: TeamSettings;
  memberCount: number;
  isActive: boolean;
}

export interface TeamMember {
  id: string;
  teamId: string;
  userId: string;
  role: TeamRole;
  joinedAt: Date;
  invitedAt?: Date;
  invitedBy?: string;
  isActive: boolean;
  permissions: TeamPermission[];
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
}

export interface TeamSettings {
  allowMemberInvites: boolean;
  requireApprovalForJoins: boolean;
  allowPublicVisibility: boolean;
  maxMembers?: number;
  defaultRole: TeamRole;
  customFields?: Record<string, unknown>;
  notifications: {
    email: boolean;
    inApp: boolean;
    weeklyDigest: boolean;
  };
}

export type TeamRole = 
  | 'owner'
  | 'admin'
  | 'member'
  | 'viewer'
  | 'guest';

export type TeamPermission = 
  | 'team:read'
  | 'team:write'
  | 'team:delete'
  | 'members:read'
  | 'members:invite'
  | 'members:remove'
  | 'settings:read'
  | 'settings:write'
  | 'billing:read'
  | 'billing:write'
  | 'analytics:read';

export interface TeamInvitation {
  id: string;
  teamId: string;
  email: string;
  role: TeamRole;
  invitedBy: string;
  invitedAt: Date;
  expiresAt: Date;
  acceptedAt?: Date;
  isActive: boolean;
  token: string;
}

export interface TeamAnalytics {
  teamId: string;
  period: 'week' | 'month' | 'quarter' | 'year';
  memberCount: number;
  activeMembers: number;
  newMembers: number;
  activityScore: number;
  topContributors: Array<{
    userId: string;
    userName: string;
    contributionScore: number;
  }>;
  recentActivity: Array<{
    id: string;
    type: 'member_joined' | 'member_left' | 'role_changed' | 'settings_updated';
    userId: string;
    userName: string;
    timestamp: Date;
    details?: Record<string, unknown>;
  }>;
}

export interface TeamBilling {
  teamId: string;
  plan: 'free' | 'pro' | 'enterprise';
  status: 'active' | 'past_due' | 'canceled' | 'trialing';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  memberLimit: number;
  usedMembers: number;
  pricePerMonth: number;
  nextBillingDate: Date;
  paymentMethod?: {
    type: 'card' | 'bank_account';
    last4: string;
    brand?: string;
  };
}

// API Request/Response types
export interface CreateTeamRequest {
  name: string;
  description?: string;
  slug?: string;
  avatar?: string;
  settings?: Partial<TeamSettings>;
}

export interface UpdateTeamRequest {
  id: string;
  name?: string;
  description?: string;
  slug?: string;
  avatar?: string;
  settings?: Partial<TeamSettings>;
}

export interface InviteMemberRequest {
  teamId: string;
  email: string;
  role: TeamRole;
  message?: string;
}

export interface UpdateMemberRoleRequest {
  teamId: string;
  userId: string;
  role: TeamRole;
}

export interface TeamListResponse {
  teams: Team[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface MemberListResponse {
  members: TeamMember[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Hook return types
export interface UseTeamsReturn {
  teams: Team[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
  hasMore: boolean;
  loadMore: () => void;
}

export interface UseTeamMembersReturn {
  members: TeamMember[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
  hasMore: boolean;
  loadMore: () => void;
}

export interface UseTeamAnalyticsReturn {
  analytics: TeamAnalytics | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

// Form validation types
export interface CreateTeamFormData {
  name: string;
  description: string;
  slug: string;
  allowMemberInvites: boolean;
  requireApprovalForJoins: boolean;
  allowPublicVisibility: boolean;
  maxMembers?: number;
}

export interface InviteMemberFormData {
  email: string;
  role: TeamRole;
  message: string;
}

// Error types
export interface TeamApiError {
  message: string;
  code: string;
  details?: Record<string, unknown>;
}

// Role and permission mappings
export const ROLE_PERMISSIONS: Record<TeamRole, TeamPermission[]> = {
  owner: [
    'team:read', 'team:write', 'team:delete',
    'members:read', 'members:invite', 'members:remove',
    'settings:read', 'settings:write',
    'billing:read', 'billing:write',
    'analytics:read'
  ],
  admin: [
    'team:read', 'team:write',
    'members:read', 'members:invite', 'members:remove',
    'settings:read', 'settings:write',
    'analytics:read'
  ],
  member: [
    'team:read',
    'members:read',
    'settings:read'
  ],
  viewer: [
    'team:read',
    'members:read'
  ],
  guest: [
    'team:read'
  ]
};

export const ROLE_HIERARCHY: Record<TeamRole, number> = {
  owner: 5,
  admin: 4,
  member: 3,
  viewer: 2,
  guest: 1
};
