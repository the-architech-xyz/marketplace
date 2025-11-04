/**
 * Waitlist Database Layer (Drizzle)
 * 
 * Database schema for waitlist feature with viral referral system using Drizzle ORM. Stores users, referrals, and analytics.
 */

export interface FeaturesWaitlistDatabaseDrizzleParams {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Enable viral referral system */
    viralReferral?: boolean;

    /** Enable position tracking in waitlist */
    positionTracking?: boolean;

    /** Enable referral bonus system */
    bonusSystem?: boolean;

    /** Enable analytics tracking */
    analytics?: boolean;
  };
}

export interface FeaturesWaitlistDatabaseDrizzleFeatures {

  /** Enable viral referral system */
  viralReferral: boolean;

  /** Enable position tracking in waitlist */
  positionTracking: boolean;

  /** Enable referral bonus system */
  bonusSystem: boolean;

  /** Enable analytics tracking */
  analytics: boolean;
}

// 🚀 Auto-discovered artifacts with ownership info
export declare const FeaturesWaitlistDatabaseDrizzleArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type FeaturesWaitlistDatabaseDrizzleCreates = typeof FeaturesWaitlistDatabaseDrizzleArtifacts.creates[number];
export type FeaturesWaitlistDatabaseDrizzleEnhances = typeof FeaturesWaitlistDatabaseDrizzleArtifacts.enhances[number];
