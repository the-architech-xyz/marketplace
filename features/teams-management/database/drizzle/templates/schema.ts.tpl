/**
 * Teams Management Database Schema (Database-Agnostic)
 * 
 * This schema represents the TEAMS feature, independent of any specific implementation.
 * Works with any database (Postgres, MySQL, SQLite, etc.)
 */

import { pgTable, text, timestamp, pgEnum } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';

// ============================================================================
// ENUMS
// ============================================================================

export const teamRoleEnum = pgEnum('team_role', ['owner', 'admin', 'member']);
export const invitationStatusEnum = pgEnum('invitation_status', ['pending', 'accepted', 'rejected', 'expired']);

// ============================================================================
// TEAMS
// ============================================================================

/**
 * Teams Table
 * 
 * Stores team information.
 * A team is a collaborative workspace with multiple members.
 */
export const teams = pgTable('teams', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  
  // Team details
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  avatar: text('avatar'), // URL to team avatar
  
  // Ownership
  ownerId: text('owner_id').notNull(), // References users.id
  
  // Settings
  settings: text('settings').$type<{
    allowInvites?: boolean;
    requireApproval?: boolean;
    defaultRole?: 'member' | 'admin';
    permissions?: string[];
  }>(),
  
  // Timestamps
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ============================================================================
// TEAM MEMBERS
// ============================================================================

/**
 * Team Members Table
 * 
 * Tracks team memberships and roles.
 * Links users to teams with specific roles.
 */
export const teamMembers = pgTable('team_members', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  
  // Relationships
  teamId: text('team_id').notNull(), // References teams.id
  userId: text('user_id').notNull(), // References users.id
  
  // Role
  role: teamRoleEnum('role').notNull().default('member'),
  
  // Timestamps
  joinedAt: timestamp('joined_at').notNull().defaultNow(),
  leftAt: timestamp('left_at'), // When member left/was removed
});

// ============================================================================
// TEAM INVITATIONS
// ============================================================================

/**
 * Team Invitations Table
 * 
 * Tracks pending and processed invitations to teams.
 * Supports email-based invitations.
 */
export const teamInvitations = pgTable('team_invitations', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  
  // Team
  teamId: text('team_id').notNull(), // References teams.id
  
  // Invitee
  email: text('email').notNull(),
  userId: text('user_id'), // References users.id (if user exists)
  
  // Invitation details
  role: teamRoleEnum('role').notNull().default('member'),
  invitedBy: text('invited_by').notNull(), // References users.id
  status: invitationStatusEnum('status').notNull().default('pending'),
  
  // Token for accepting invitation
  token: text('token').notNull().unique(),
  
  // Timestamps
  expiresAt: timestamp('expires_at').notNull(),
  acceptedAt: timestamp('accepted_at'),
  rejectedAt: timestamp('rejected_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ============================================================================
// TEAM ACTIVITY
// ============================================================================

/**
 * Team Activity Table
 * 
 * Audit trail of team actions.
 * Optional: Can be enabled for compliance/tracking.
 */
export const teamActivity = pgTable('team_activity', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  
  // Team
  teamId: text('team_id').notNull(), // References teams.id
  
  // Actor
  userId: text('user_id').notNull(), // References users.id
  
  // Action
  action: text('action').notNull(), // 'created', 'updated', 'deleted', 'member_added', 'member_removed', etc.
  entityType: text('entity_type').notNull(), // 'team', 'member', 'invitation'
  entityId: text('entity_id'), // ID of affected entity
  
  // Details
  metadata: text('metadata').$type<Record<string, any>>(), // JSON with additional details
  
  // Timestamp
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ============================================================================
// INDEXES (for performance)
// ============================================================================

// Teams indexes
export const teamsIndexes = {
  slug: teams.slug,
  ownerId: teams.ownerId,
};

// Team members indexes
export const teamMembersIndexes = {
  teamId: teamMembers.teamId,
  userId: teamMembers.userId,
  // Compound index for unique constraint
  teamIdUserId: [teamMembers.teamId, teamMembers.userId],
};

// Team invitations indexes
export const teamInvitationsIndexes = {
  teamId: teamInvitations.teamId,
  email: teamInvitations.email,
  token: teamInvitations.token,
  status: teamInvitations.status,
  // Compound index for queries
  teamIdEmailStatus: [teamInvitations.teamId, teamInvitations.email, teamInvitations.status],
};

// Team activity indexes
export const teamActivityIndexes = {
  teamId: teamActivity.teamId,
  userId: teamActivity.userId,
  action: teamActivity.action,
  createdAt: teamActivity.createdAt,
};



