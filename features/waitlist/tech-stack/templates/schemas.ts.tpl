/**
 * Waitlist Feature Schemas - Zod Validation Schemas
 * 
 * This file contains all Zod validation schemas for the Waitlist feature.
 * These schemas provide runtime type checking and validation for all data structures.
 * 
 * Generated from: features/waitlist/contract.ts
 */

import { z } from 'zod';

// ============================================================================
// ENUM SCHEMAS
// ============================================================================

export const WaitlistStatusSchema = z.enum([
  'pending',
  'joined',
  'invited',
  'declined',
  'removed'
]);

export const ReferralSourceSchema = z.enum([
  'direct',
  'referral',
  'social'
]);

export const ReferralStatusSchema = z.enum([
  'pending',
  'completed'
]);

// ============================================================================
// CORE DATA SCHEMAS
// ============================================================================

export const WaitlistUserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  status: WaitlistStatusSchema,
  position: z.number().nonnegative(),
  referralCode: z.string(),
  referredByCode: z.string().optional(),
  referralCount: z.number().nonnegative(),
  referralBonus: z.number().nonnegative(),
  source: ReferralSourceSchema,
  metadata: z.record(z.any()).optional(),
  joinedAt: z.string(),
  invitedAt: z.string().optional(),
  updatedAt: z.string()
});

export const WaitlistReferralSchema = z.object({
  id: z.string(),
  referrerId: z.string(),
  refereeId: z.string(),
  referrerCode: z.string(),
  status: ReferralStatusSchema,
  bonusAwarded: z.number().nonnegative(),
  createdAt: z.string(),
  completedAt: z.string().optional()
});

export const WaitlistStatsSchema = z.object({
  totalUsers: z.number().nonnegative(),
  pendingUsers: z.number().nonnegative(),
  invitedUsers: z.number().nonnegative(),
  totalReferrals: z.number().nonnegative(),
  avgReferralsPerUser: z.number().nonnegative(),
  topReferrers: z.array(z.object({
    userId: z.string(),
    email: z.string().email(),
    referralCount: z.number().nonnegative(),
    bonusAwarded: z.number().nonnegative()
  })),
  growthRate: z.number()
});

// ============================================================================
// INPUT SCHEMAS
// ============================================================================

export const JoinWaitlistDataSchema = z.object({
  email: z.string().email(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  referredByCode: z.string().optional(),
  metadata: z.record(z.any()).optional()
});

export const UpdateWaitlistUserDataSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  status: WaitlistStatusSchema.optional(),
  metadata: z.record(z.any()).optional()
});

// ============================================================================
// RESULT SCHEMAS
// ============================================================================

export const JoinWaitlistResultSchema = z.object({
  user: WaitlistUserSchema,
  success: z.boolean(),
  message: z.string().optional()
});

export const GetWaitlistUserResultSchema = z.object({
  user: WaitlistUserSchema,
  stats: WaitlistStatsSchema,
  success: z.boolean()
});

// ============================================================================
// FILTER SCHEMAS
// ============================================================================

export const WaitlistFiltersSchema = z.object({
  status: z.array(WaitlistStatusSchema).optional(),
  source: z.array(ReferralSourceSchema).optional(),
  referredByCode: z.string().optional(),
  search: z.string().optional(),
  joinedAfter: z.string().optional(),
  joinedBefore: z.string().optional(),
  minReferralCount: z.number().optional()
});

// ============================================================================
// CONFIGURATION SCHEMAS
// ============================================================================

export const WaitlistConfigSchema = z.object({
  features: z.object({
    viralReferral: z.boolean(),
    positionTracking: z.boolean(),
    bonusSystem: z.boolean(),
    inviteSystem: z.boolean(),
    analytics: z.boolean()
  }),
  limits: z.object({
    referralBonus: z.number(),
    maxBonusPerUser: z.number(),
    referralExpiryDays: z.number()
  }),
  social: z.object({
    platforms: z.array(z.string()),
    customMessage: z.string().optional()
  })
});


