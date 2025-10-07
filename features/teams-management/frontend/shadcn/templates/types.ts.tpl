/**
 * Teams Management Types (Frontend)
 * 
 * Type definitions for the team management UI components
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

// Form types
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

export interface TeamSettingsFormData {
  name: string;
  description: string;
  allowMemberInvites: boolean;
  requireApprovalForJoins: boolean;
  allowPublicVisibility: boolean;
  maxMembers?: number;
  notifications: {
    email: boolean;
    inApp: boolean;
    weeklyDigest: boolean;
  };
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

// Role configuration
export const ROLE_CONFIG = {
  owner: {
    label: 'Owner',
    description: 'Full access to team and all settings',
    color: 'bg-red-100 text-red-800',
    icon: '👑'
  },
  admin: {
    label: 'Admin',
    description: 'Manage team and members, cannot delete team',
    color: 'bg-blue-100 text-blue-800',
    icon: '⚡'
  },
  member: {
    label: 'Member',
    description: 'Standard team member access',
    color: 'bg-green-100 text-green-800',
    icon: '👤'
  },
  viewer: {
    label: 'Viewer',
    description: 'Read-only access to team content',
    color: 'bg-gray-100 text-gray-800',
    icon: '👁️'
  },
  guest: {
    label: 'Guest',
    description: 'Limited access to specific team areas',
    color: 'bg-yellow-100 text-yellow-800',
    icon: '🎭'
  }
} as const;

// Permission configuration
export const PERMISSION_CONFIG = {
  'team:read': {
    label: 'View Team',
    description: 'View team information and settings'
  },
  'team:write': {
    label: 'Edit Team',
    description: 'Modify team information and settings'
  },
  'team:delete': {
    label: 'Delete Team',
    description: 'Delete the team permanently'
  },
  'members:read': {
    label: 'View Members',
    description: 'View team member list and details'
  },
  'members:invite': {
    label: 'Invite Members',
    description: 'Invite new members to the team'
  },
  'members:remove': {
    label: 'Remove Members',
    description: 'Remove members from the team'
  },
  'settings:read': {
    label: 'View Settings',
    description: 'View team settings and configuration'
  },
  'settings:write': {
    label: 'Edit Settings',
    description: 'Modify team settings and configuration'
  },
  'billing:read': {
    label: 'View Billing',
    description: 'View billing information and usage'
  },
  'billing:write': {
    label: 'Manage Billing',
    description: 'Modify billing settings and payment methods'
  },
  'analytics:read': {
    label: 'View Analytics',
    description: 'View team analytics and reports'
  }
} as const;
