/**
 * Teams Management API - Pure Server Functions
 * 
 * This file contains ONLY server-side logic for teams management.
 * NO TanStack Query, NO Zustand, NO client-side libraries.
 * 
 * These functions are called by Next.js API routes and wrapped by
 * the tech-stack layer for client-side consumption.
 */

import { db } from '@/lib/db';
import { teams, teamMembers, teamInvitations } from '@/db/schema';
import { eq, and, desc, sql } from 'drizzle-orm';
import type {
  Team, TeamMember, TeamInvitation, TeamActivity, TeamAnalytics,
  CreateTeamData, UpdateTeamData, InviteMemberData, UpdateMemberData,
  AcceptInvitationData, DeclineInvitationData,
  TeamFilters, MemberFilters, InvitationFilters, ActivityFilters,
  Permission
} from '@/features/teams-management/contract';

// ============================================================================
// TEAM CRUD OPERATIONS (Pure Server Functions)
// ============================================================================

/**
 * Get all teams with optional filters
 * Pure database query - NO TanStack Query
 */
export async function apiGetTeams(filters?: TeamFilters): Promise<Team[]> {
  let query = db.select().from(teams);
  
  // Apply filters
  if (filters?.status && filters.status.length > 0) {
    query = query.where(sql`${teams.status} = ANY(${filters.status})`);
  }
  
  if (filters?.ownerId) {
    query = query.where(eq(teams.ownerId, filters.ownerId));
  }
  
  if (filters?.search) {
    query = query.where(sql`${teams.name} ILIKE ${'%' + filters.search + '%'}`);
  }
  
  if (filters?.createdAfter) {
    query = query.where(sql`${teams.createdAt} >= ${filters.createdAfter}`);
  }
  
  if (filters?.createdBefore) {
    query = query.where(sql`${teams.createdAt} <= ${filters.createdBefore}`);
  }
  
  return await query.orderBy(desc(teams.createdAt));
}

/**
 * Get single team by ID
 */
export async function apiGetTeam(id: string): Promise<Team | null> {
  const [team] = await db.select().from(teams).where(eq(teams.id, id)).limit(1);
  return team || null;
}

/**
 * Create a new team
 * Includes server-side validation
 */
export async function apiCreateTeam(data: CreateTeamData): Promise<Team> {
  // Server-side validation
  if (data.name.length < 3) {
    throw new Error('Team name must be at least 3 characters');
  }
  
  // Database insert
  const [team] = await db.insert(teams).values({
      name: data.name,
      description: data.description,
    status: 'active',
    ownerId: data.ownerId || 'current-user-id', // Get from session
    memberCount: 1,
    settings: data.settings || {
      allowInvites: true,
      requireApproval: false,
      defaultRole: 'member',
      permissions: ['read', 'write']
    },
    metadata: data.metadata,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }).returning();
  
    return team;
}

/**
 * Update an existing team
 */
export async function apiUpdateTeam(id: string, data: UpdateTeamData): Promise<Team> {
  const [updated] = await db
    .update(teams)
    .set({
      ...data,
      updatedAt: new Date().toISOString()
    })
    .where(eq(teams.id, id))
    .returning();
  
  if (!updated) {
    throw new Error('Team not found');
  }
  
  return updated;
}

/**
 * Delete a team
 */
export async function apiDeleteTeam(id: string): Promise<void> {
  // Delete team members first (cascade)
  await db.delete(teamMembers).where(eq(teamMembers.teamId, id));
  
  // Delete team invitations
  await db.delete(teamInvitations).where(eq(teamInvitations.teamId, id));
  
  // Delete team
  await db.delete(teams).where(eq(teams.id, id));
}

/**
 * Leave a team (remove current user as member)
 */
export async function apiLeaveTeam(teamId: string, userId: string): Promise<void> {
  await db
    .delete(teamMembers)
    .where(and(
      eq(teamMembers.teamId, teamId),
      eq(teamMembers.userId, userId)
    ));
}

// ============================================================================
// MEMBER OPERATIONS
// ============================================================================

/**
 * Get team members
 */
export async function apiGetTeamMembers(teamId: string, filters?: MemberFilters): Promise<TeamMember[]> {
  let query = db
    .select()
    .from(teamMembers)
    .where(eq(teamMembers.teamId, teamId));
  
  if (filters?.role && filters.role.length > 0) {
    query = query.where(sql`${teamMembers.role} = ANY(${filters.role})`);
  }
  
  if (filters?.status && filters.status.length > 0) {
    query = query.where(sql`${teamMembers.status} = ANY(${filters.status})`);
  }
  
  return await query.orderBy(desc(teamMembers.joinedAt));
}

/**
 * Get single team member
 */
export async function apiGetTeamMember(teamId: string, userId: string): Promise<TeamMember | null> {
  const [member] = await db
    .select()
    .from(teamMembers)
    .where(and(
      eq(teamMembers.teamId, teamId),
      eq(teamMembers.userId, userId)
    ))
    .limit(1);
  
  return member || null;
}

/**
 * Update team member
 */
export async function apiUpdateTeamMember(
  teamId: string,
  userId: string,
  data: UpdateMemberData
): Promise<TeamMember> {
  const [updated] = await db
    .update(teamMembers)
    .set(data)
    .where(and(
      eq(teamMembers.teamId, teamId),
      eq(teamMembers.userId, userId)
    ))
    .returning();
  
  if (!updated) {
    throw new Error('Team member not found');
  }
  
  return updated;
}

/**
 * Remove team member
 */
export async function apiRemoveTeamMember(teamId: string, userId: string): Promise<void> {
  await db
    .delete(teamMembers)
    .where(and(
      eq(teamMembers.teamId, teamId),
      eq(teamMembers.userId, userId)
    ));
}

/**
 * Bulk remove team members
 */
export async function apiBulkRemoveTeamMembers(teamId: string, userIds: string[]): Promise<void> {
  await db
    .delete(teamMembers)
    .where(and(
      eq(teamMembers.teamId, teamId),
      sql`${teamMembers.userId} = ANY(${userIds})`
    ));
}

// ============================================================================
// INVITATION OPERATIONS
// ============================================================================

/**
 * Get team invitations
 */
export async function apiGetTeamInvitations(
  teamId?: string,
  filters?: InvitationFilters
): Promise<TeamInvitation[]> {
  let query = db.select().from(teamInvitations);
  
  if (teamId) {
    query = query.where(eq(teamInvitations.teamId, teamId));
  }
  
  if (filters?.status && filters.status.length > 0) {
    query = query.where(sql`${teamInvitations.status} = ANY(${filters.status})`);
  }
  
  return await query.orderBy(desc(teamInvitations.createdAt));
}

/**
 * Get single invitation
 */
export async function apiGetTeamInvitation(id: string): Promise<TeamInvitation | null> {
  const [invitation] = await db
    .select()
    .from(teamInvitations)
    .where(eq(teamInvitations.id, id))
    .limit(1);
  
  return invitation || null;
}

/**
 * Invite team member
 */
export async function apiInviteTeamMember(
  teamId: string,
  data: InviteMemberData
): Promise<TeamInvitation> {
  const [invitation] = await db.insert(teamInvitations).values({
    teamId,
    email: data.email,
    role: data.role,
    status: 'pending',
    invitedBy: 'current-user-id', // Get from session
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }).returning();
  
  // TODO: Send invitation email
  
  return invitation;
}

/**
 * Accept team invitation
 */
export async function apiAcceptTeamInvitation(
  data: AcceptInvitationData
): Promise<{ member: TeamMember; team: Team }> {
  // Get invitation
  const invitation = await apiGetTeamInvitation(data.invitationId);
  if (!invitation) {
    throw new Error('Invitation not found');
  }
  
  if (invitation.status !== 'pending') {
    throw new Error('Invitation is not pending');
  }
  
  // Create team member
  const [member] = await db.insert(teamMembers).values({
    teamId: invitation.teamId,
    userId: data.userId,
    role: invitation.role,
    status: 'active',
    joinedAt: new Date().toISOString(),
    permissions: [],
    invitedBy: invitation.invitedBy
  }).returning();
  
  // Update invitation status
  await db
    .update(teamInvitations)
    .set({ 
      status: 'accepted',
      acceptedAt: new Date().toISOString()
    })
    .where(eq(teamInvitations.id, data.invitationId));
  
  // Get team
  const team = await apiGetTeam(invitation.teamId);
  if (!team) throw new Error('Team not found');
  
  return { member, team };
}

/**
 * Decline team invitation
 */
export async function apiDeclineTeamInvitation(data: DeclineInvitationData): Promise<void> {
  await db
    .update(teamInvitations)
    .set({
      status: 'declined',
      declinedAt: new Date().toISOString()
    })
    .where(eq(teamInvitations.id, data.invitationId));
}

/**
 * Cancel team invitation
 */
export async function apiCancelTeamInvitation(id: string): Promise<void> {
  await db.delete(teamInvitations).where(eq(teamInvitations.id, id));
}

/**
 * Resend team invitation
 */
export async function apiResendTeamInvitation(id: string): Promise<TeamInvitation> {
  const [updated] = await db
    .update(teamInvitations)
    .set({
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString()
    })
    .where(eq(teamInvitations.id, id))
    .returning();
  
  if (!updated) {
    throw new Error('Invitation not found');
  }
  
  // TODO: Resend invitation email
  
  return updated;
}

// ============================================================================
// ANALYTICS OPERATIONS
// ============================================================================

/**
 * Get team analytics
 */
export async function apiGetTeamAnalytics(teamId: string): Promise<TeamAnalytics> {
  // Get member count
  const members = await apiGetTeamMembers(teamId);
  const activeMembers = members.filter(m => m.status === 'active');
  
  // Get pending invitations
  const invitations = await apiGetTeamInvitations(teamId);
  const pendingInvitations = invitations.filter(i => i.status === 'pending');
  
  // TODO: Get activities from activity log
  
  return {
    teamId,
    memberCount: members.length,
    activeMembers: activeMembers.length,
    pendingInvitations: pendingInvitations.length,
    activitiesThisWeek: 0, // TODO: Calculate from activity log
    activitiesThisMonth: 0, // TODO: Calculate from activity log
    mostActiveMembers: [], // TODO: Calculate from activity log
    recentActivities: [] // TODO: Get from activity log
  };
}

/**
 * Get team activities
 */
export async function apiGetTeamActivities(
  teamId: string,
  filters?: ActivityFilters
): Promise<TeamActivity[]> {
  // TODO: Implement activity log retrieval
  return [];
}

// ============================================================================
// PERMISSION OPERATIONS
// ============================================================================

/**
 * Get user permissions for a team
 */
export async function apiGetUserPermissions(teamId: string, userId: string): Promise<Permission[]> {
  const member = await apiGetTeamMember(teamId, userId);
  return member?.permissions || [];
}

/**
 * Check if user has specific permission
 */
export async function apiHasPermission(
  teamId: string,
  userId: string,
  permission: Permission
): Promise<boolean> {
  const permissions = await apiGetUserPermissions(teamId, userId);
  return permissions.includes(permission);
}
