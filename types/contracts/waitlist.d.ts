/**
 * Waitlist Feature Contract
 * 
 * This is the single source of truth for the Waitlist feature.
 * Defines types, interfaces, and business logic for waitlist with viral referral system.
 * 
 * Key Principles:
 * - Technology agnostic (works with any backend/frontend)
 * - Contract is the source of truth
 * - All implementations must follow these types
 */

// ============================================================================
// CORE TYPES
// ============================================================================

export type WaitlistStatus = 
  | 'pending'      // User signed up, waiting
  | 'joined'       // User got access
  | 'invited'      // User invited but not signed up yet
  | 'declined'     // User declined invitation
  | 'removed';     // Removed from waitlist

export type ReferralSource = 
  | 'direct'       // Direct signup
  | 'referral'     // Referred by someone
  | 'social';      // Social media campaign

// ============================================================================
// DATA TYPES
// ============================================================================

export interface WaitlistUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  status: WaitlistStatus;
  position: number;              // Position in waitlist
  referralCode: string;          // Unique code for this user
  referredByCode?: string;       // Code of person who referred them
  referralCount: number;         // How many people they referred
  referralBonus: number;         // Their position boost from referrals
  source: ReferralSource;
  metadata?: Record<string, any>; // Custom fields
  
  // Timestamps
  joinedAt: string;              // When they first signed up
  invitedAt?: string;            // When access was granted
  updatedAt: string;
}

export interface WaitlistReferral {
  id: string;
  referrerId: string;            // User who made the referral
  refereeId: string;             // User who was referred
  referrerCode: string;          // Referral code used
  status: 'pending' | 'completed'; // Whether referee signed up
  bonusAwarded: number;          // Position boost awarded to referrer
  
  // Timestamps
  createdAt: string;
  completedAt?: string;
}

export interface WaitlistStats {
  totalUsers: number;
  pendingUsers: number;
  invitedUsers: number;
  totalReferrals: number;
  avgReferralsPerUser: number;
  topReferrers: Array<{
    userId: string;
    email: string;
    referralCount: number;
    bonusAwarded: number;
  }>;
  growthRate: number;            // Percentage growth over last week
}

// ============================================================================
// INPUT TYPES
// ============================================================================

export interface JoinWaitlistData {
  email: string;
  firstName?: string;
  lastName?: string;
  referredByCode?: string;       // Optional referral code
  metadata?: Record<string, any>;
}

export interface UpdateWaitlistUserData {
  firstName?: string;
  lastName?: string;
  status?: WaitlistStatus;
  metadata?: Record<string, any>;
}

// ============================================================================
// RESULT TYPES
// ============================================================================

export interface JoinWaitlistResult {
  user: WaitlistUser;
  success: boolean;
  message?: string;
}

export interface GetWaitlistUserResult {
  user: WaitlistUser;
  stats: WaitlistStats;
  success: boolean;
}

// ============================================================================
// FILTER TYPES
// ============================================================================

export interface WaitlistFilters {
  status?: WaitlistStatus[];
  source?: ReferralSource[];
  referredByCode?: string;
  search?: string;
  joinedAfter?: string;
  joinedBefore?: string;
  minReferralCount?: number;
}

// ============================================================================
// CONFIGURATION TYPES
// ============================================================================

export interface WaitlistConfig {
  features: {
    viralReferral: boolean;      // Enable referral system
    positionTracking: boolean;   // Show position in waitlist
    bonusSystem: boolean;        // Award position bonuses
    inviteSystem: boolean;       // Manual invite system
    analytics: boolean;          // Analytics and stats
  };
  limits: {
    referralBonus: number;       // Max position boost per referral
    maxBonusPerUser: number;     // Max total bonus per user
    referralExpiryDays: number;  // Days until referral expires
  };
  social: {
    platforms: string[];         // Social platforms to share on
    customMessage?: string;      // Custom share message
  };
}

// ============================================================================
// BUSINESS LOGIC INTERFACE
// ============================================================================

/**
 * IWaitlistService - Cohesive Business Service Interface
 * 
 * This interface defines the business operations for the waitlist feature.
 * Backend implementations must provide this service.
 * Frontend implementations must consume this service.
 */
export interface IWaitlistService {
  /**
   * Join the waitlist
   * Creates a new user in the waitlist with optional referral tracking
   */
  joinWaitlist: (data: JoinWaitlistData) => Promise<JoinWaitlistResult>;

  /**
   * Get user's waitlist status
   * Returns user info, position, referral stats, and overall stats
   */
  getWaitlistUser: (userId: string) => Promise<GetWaitlistUserResult>;

  /**
   * Get leaderboard
   * Returns top referrers ranked by referral count
   */
  getLeaderboard: (limit?: number) => Promise<Array<{
    user: WaitlistUser;
    rank: number;
    referralCount: number;
    bonusAwarded: number;
  }>>;

  /**
   * Get overall stats
   * Returns aggregate statistics about the waitlist
   */
  getStats: () => Promise<WaitlistStats>;
}

// ============================================================================
// ERROR TYPES
// ============================================================================

export interface WaitlistError {
  code: string;
  message: string;
  type: 'validation_error' | 'not_found_error' | 'conflict_error' | 'rate_limit_error';
  field?: string;
  details?: Record<string, any>;
}

