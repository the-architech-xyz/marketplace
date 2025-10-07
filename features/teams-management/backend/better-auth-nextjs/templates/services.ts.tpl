/**
 * Teams Management Services
 * 
 * Business logic and data access for team management
 */

import { 
  Team, 
  TeamMember, 
  TeamInvitation, 
  TeamAnalytics, 
  TeamBilling,
  CreateTeamRequest,
  UpdateTeamRequest,
  InviteMemberRequest,
  UpdateMemberRoleRequest,
  TeamListResponse,
  MemberListResponse,
  TeamRole,
  TeamPermission,
  ROLE_PERMISSIONS
} from './types';

// Mock data store (in real implementation, this would be a database)
let teams: Team[] = [];
let members: TeamMember[] = [];
let invitations: TeamInvitation[] = [];

// Utility functions
function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function hasPermission(userRole: TeamRole, requiredPermission: TeamPermission): boolean {
  const userPermissions = ROLE_PERMISSIONS[userRole] || [];
  return userPermissions.includes(requiredPermission);
}

// Team Services
export class TeamService {
  static async createTeam(data: CreateTeamRequest, ownerId: string): Promise<Team> {
    const team: Team = {
      id: generateId(),
      name: data.name,
      description: data.description,
      slug: data.slug || generateSlug(data.name),
      avatar: data.avatar,
      createdAt: new Date(),
      updatedAt: new Date(),
      ownerId,
      memberCount: 1,
      isActive: true,
      settings: {
        allowMemberInvites: data.settings?.allowMemberInvites ?? true,
        requireApprovalForJoins: data.settings?.requireApprovalForJoins ?? false,
        allowPublicVisibility: data.settings?.allowPublicVisibility ?? false,
        maxMembers: data.settings?.maxMembers,
        defaultRole: 'member',
        customFields: data.settings?.customFields,
        notifications: {
          email: true,
          inApp: true,
          weeklyDigest: false,
          ...data.settings?.notifications
        }
      }
    };

    teams.push(team);

    // Add owner as first member
    await TeamMemberService.addMember(team.id, ownerId, 'owner');

    return team;
  }

  static async getTeam(id: string): Promise<Team | null> {
    return teams.find(team => team.id === id) || null;
  }

  static async getTeamBySlug(slug: string): Promise<Team | null> {
    return teams.find(team => team.slug === slug) || null;
  }

  static async updateTeam(id: string, data: UpdateTeamRequest): Promise<Team | null> {
    const teamIndex = teams.findIndex(team => team.id === id);
    if (teamIndex === -1) return null;

    const team = teams[teamIndex];
    const updatedTeam: Team = {
      ...team,
      ...data,
      updatedAt: new Date()
    };

    teams[teamIndex] = updatedTeam;
    return updatedTeam;
  }

  static async deleteTeam(id: string): Promise<boolean> {
    const teamIndex = teams.findIndex(team => team.id === id);
    if (teamIndex === -1) return false;

    teams.splice(teamIndex, 1);
    
    // Remove all members
    members = members.filter(member => member.teamId !== id);
    
    // Remove all invitations
    invitations = invitations.filter(invitation => invitation.teamId !== id);

    return true;
  }

  static async getUserTeams(userId: string, page = 1, limit = 20): Promise<TeamListResponse> {
    const userTeamIds = members
      .filter(member => member.userId === userId && member.isActive)
      .map(member => member.teamId);

    const userTeams = teams
      .filter(team => userTeamIds.includes(team.id))
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedTeams = userTeams.slice(startIndex, endIndex);

    return {
      teams: paginatedTeams,
      total: userTeams.length,
      page,
      limit,
      hasMore: endIndex < userTeams.length
    };
  }

  static async searchTeams(query: string, page = 1, limit = 20): Promise<TeamListResponse> {
    const searchTerm = query.toLowerCase();
    const matchingTeams = teams
      .filter(team => 
        team.isActive &&
        (team.name.toLowerCase().includes(searchTerm) ||
         team.description?.toLowerCase().includes(searchTerm) ||
         team.slug.toLowerCase().includes(searchTerm))
      )
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedTeams = matchingTeams.slice(startIndex, endIndex);

    return {
      teams: paginatedTeams,
      total: matchingTeams.length,
      page,
      limit,
      hasMore: endIndex < matchingTeams.length
    };
  }
}

// Team Member Services
export class TeamMemberService {
  static async addMember(teamId: string, userId: string, role: TeamRole): Promise<TeamMember> {
    const member: TeamMember = {
      id: generateId(),
      teamId,
      userId,
      role,
      joinedAt: new Date(),
      isActive: true,
      permissions: ROLE_PERMISSIONS[role] || [],
      user: {
        id: userId,
        name: `User ${userId}`, // In real implementation, fetch from user service
        email: `user${userId}@example.com`,
        avatar: undefined
      }
    };

    members.push(member);

    // Update team member count
    const team = teams.find(t => t.id === teamId);
    if (team) {
      team.memberCount = members.filter(m => m.teamId === teamId && m.isActive).length;
    }

    return member;
  }

  static async removeMember(teamId: string, userId: string): Promise<boolean> {
    const memberIndex = members.findIndex(
      member => member.teamId === teamId && member.userId === userId
    );

    if (memberIndex === -1) return false;

    members[memberIndex].isActive = false;

    // Update team member count
    const team = teams.find(t => t.id === teamId);
    if (team) {
      team.memberCount = members.filter(m => m.teamId === teamId && m.isActive).length;
    }

    return true;
  }

  static async updateMemberRole(teamId: string, userId: string, role: TeamRole): Promise<TeamMember | null> {
    const member = members.find(
      m => m.teamId === teamId && m.userId === userId && m.isActive
    );

    if (!member) return null;

    member.role = role;
    member.permissions = ROLE_PERMISSIONS[role] || [];

    return member;
  }

  static async getTeamMembers(teamId: string, page = 1, limit = 20): Promise<MemberListResponse> {
    const teamMembers = members
      .filter(member => member.teamId === teamId && member.isActive)
      .sort((a, b) => b.joinedAt.getTime() - a.joinedAt.getTime());

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedMembers = teamMembers.slice(startIndex, endIndex);

    return {
      members: paginatedMembers,
      total: teamMembers.length,
      page,
      limit,
      hasMore: endIndex < teamMembers.length
    };
  }

  static async getUserRole(teamId: string, userId: string): Promise<TeamRole | null> {
    const member = members.find(
      m => m.teamId === teamId && m.userId === userId && m.isActive
    );

    return member?.role || null;
  }

  static async hasPermission(teamId: string, userId: string, permission: TeamPermission): Promise<boolean> {
    const role = await this.getUserRole(teamId, userId);
    if (!role) return false;

    return hasPermission(role, permission);
  }
}

// Team Invitation Services
export class TeamInvitationService {
  static async createInvitation(data: InviteMemberRequest, invitedBy: string): Promise<TeamInvitation> {
    const invitation: TeamInvitation = {
      id: generateId(),
      teamId: data.teamId,
      email: data.email,
      role: data.role,
      invitedBy,
      invitedAt: new Date(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      isActive: true,
      token: generateId()
    };

    invitations.push(invitation);
    return invitation;
  }

  static async getInvitation(token: string): Promise<TeamInvitation | null> {
    return invitations.find(inv => inv.token === token && inv.isActive) || null;
  }

  static async acceptInvitation(token: string, userId: string): Promise<TeamMember | null> {
    const invitation = await this.getInvitation(token);
    if (!invitation || invitation.expiresAt < new Date()) return null;

    // Add member to team
    const member = await TeamMemberService.addMember(
      invitation.teamId,
      userId,
      invitation.role
    );

    // Mark invitation as accepted
    invitation.acceptedAt = new Date();
    invitation.isActive = false;

    return member;
  }

  static async cancelInvitation(token: string): Promise<boolean> {
    const invitation = invitations.find(inv => inv.token === token);
    if (!invitation) return false;

    invitation.isActive = false;
    return true;
  }
}

// Team Analytics Services
export class TeamAnalyticsService {
  static async getTeamAnalytics(teamId: string, period: 'week' | 'month' | 'quarter' | 'year' = 'month'): Promise<TeamAnalytics> {
    const team = teams.find(t => t.id === teamId);
    if (!team) throw new Error('Team not found');

    const teamMembers = members.filter(m => m.teamId === teamId && m.isActive);
    const activeMembers = teamMembers.length; // Simplified: all members are "active"

    return {
      teamId,
      period,
      memberCount: team.memberCount,
      activeMembers,
      newMembers: teamMembers.filter(m => {
        const daysSinceJoined = (Date.now() - m.joinedAt.getTime()) / (1000 * 60 * 60 * 24);
        return daysSinceJoined <= 30; // New in last 30 days
      }).length,
      activityScore: Math.floor(Math.random() * 100), // Mock data
      topContributors: teamMembers.slice(0, 5).map(member => ({
        userId: member.userId,
        userName: member.user.name,
        contributionScore: Math.floor(Math.random() * 100)
      })),
      recentActivity: [
        {
          id: generateId(),
          type: 'member_joined',
          userId: teamMembers[0]?.userId || '',
          userName: teamMembers[0]?.user.name || '',
          timestamp: new Date(),
          details: { role: teamMembers[0]?.role }
        }
      ]
    };
  }
}

// Team Billing Services
export class TeamBillingService {
  static async getTeamBilling(teamId: string): Promise<TeamBilling> {
    const team = teams.find(t => t.id === teamId);
    if (!team) throw new Error('Team not found');

    return {
      teamId,
      plan: 'pro',
      status: 'active',
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      memberLimit: team.settings.maxMembers || 50,
      usedMembers: team.memberCount,
      pricePerMonth: 29.99,
      nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      paymentMethod: {
        type: 'card',
        last4: '4242',
        brand: 'visa'
      }
    };
  }
}
