/**
 * Waitlist Database Schema (Database-Agnostic)
 * 
 * This schema stores waitlist users, referrals, position tracking, and analytics.
 * Works with any database (Postgres, MySQL, SQLite, etc.)
 */

import { pgTable, text, timestamp, integer, pgEnum } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';

// ============================================================================
// ENUMS
// ============================================================================

export const waitlistStatusEnum = pgEnum('waitlist_status', [
  'pending',    // User signed up, waiting
  'joined',     // User got access
  'invited',    // User invited but not signed up yet
  'declined',   // User declined invitation
  'removed'     // Removed from waitlist
]);

export const referralSourceEnum = pgEnum('referral_source', [
  'direct',     // Direct signup
  'referral',   // Referred by someone
  'social'      // Social media campaign
]);

export const referralStatusEnum = pgEnum('referral_status', [
  'pending',    // Referral created but not completed
  'completed'   // Referred user has signed up
]);

// ============================================================================
// WAITLIST USERS
// ============================================================================

/**
 * Waitlist Users Table
 * 
 * Stores users who joined the waitlist.
 * Tracks position, referral code, and bonuses.
 */
export const waitlistUsers = pgTable('waitlist_users', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  
  // User details
  email: text('email').notNull().unique(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  
  // Status
  status: waitlistStatusEnum('status').notNull().default('pending'),
  
  // Position tracking
  position: integer('position').notNull(),
  referralBonus: integer('referral_bonus').notNull().default(0),
  
  // Referral system
  referralCode: text('referral_code').notNull().unique(),
  referredByCode: text('referred_by_code'),
  referralCount: integer('referral_count').notNull().default(0),
  
  // Source tracking
  source: referralSourceEnum('source').notNull().default('direct'),
  
  // Metadata
  metadata: text('metadata').$type<Record<string, any>>(),
  
  // Timestamps
  joinedAt: timestamp('joined_at').notNull().defaultNow(),
  invitedAt: timestamp('invited_at'),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ============================================================================
// WAITLIST REFERRALS
// ============================================================================

/**
 * Waitlist Referrals Table
 * 
 * Tracks referral relationships between users.
 * Records when someone refers another person.
 */
export const waitlistReferrals = pgTable('waitlist_referrals', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  
  // Referral relationship
  referrerId: text('referrer_id').notNull(), // User who made the referral
  refereeId: text('referee_id').notNull(),   // User who was referred
  referrerCode: text('referrer_code').notNull(),
  
  // Status
  status: referralStatusEnum('status').notNull().default('pending'),
  
  // Bonus tracking
  bonusAwarded: integer('bonus_awarded').notNull().default(0),
  
  // Timestamps
  createdAt: timestamp('created_at').notNull().defaultNow(),
  completedAt: timestamp('completed_at'),
});

// ============================================================================
// INDEXES (for performance)
// ============================================================================

export const waitlistUsersIndexes = {
  email: waitlistUsers.email,
  referralCode: waitlistUsers.referralCode,
  referredByCode: waitlistUsers.referredByCode,
  status: waitlistUsers.status,
  position: waitlistUsers.position,
  source: waitlistUsers.source,
  joinedAt: waitlistUsers.joinedAt,
};

export const waitlistReferralsIndexes = {
  referrerId: waitlistReferrals.referrerId,
  refereeId: waitlistReferrals.refereeId,
  referrerCode: waitlistReferrals.referrerCode,
  status: waitlistReferrals.status,
  createdAt: waitlistReferrals.createdAt,
};


