/**
 * Waitlist Backend (Next.js)
 * 
 * Complete waitlist backend with viral referral system for Next.js
 */

export interface FeaturesWaitlistBackendNextjsParams {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Enable viral referral system */
    viralReferral?: boolean;

    /** Enable position tracking in waitlist */
    positionTracking?: boolean;

    /** Enable referral bonus system */
    bonusSystem?: boolean;

    /** Send welcome email with referral code */
    welcomeEmail?: boolean;

    /** Enable analytics tracking */
    analytics?: boolean;
  };

  /** Position boost per referral */
  referralBonus?: number;

  /** Maximum total bonus per user */
  maxBonusPerUser?: number;
}

export interface FeaturesWaitlistBackendNextjsFeatures {

  /** Enable viral referral system */
  viralReferral: boolean;

  /** Enable position tracking in waitlist */
  positionTracking: boolean;

  /** Enable referral bonus system */
  bonusSystem: boolean;

  /** Send welcome email with referral code */
  welcomeEmail: boolean;

  /** Enable analytics tracking */
  analytics: boolean;
}

// 🚀 Auto-discovered artifacts with ownership info
export declare const FeaturesWaitlistBackendNextjsArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type FeaturesWaitlistBackendNextjsCreates = typeof FeaturesWaitlistBackendNextjsArtifacts.creates[number];
export type FeaturesWaitlistBackendNextjsEnhances = typeof FeaturesWaitlistBackendNextjsArtifacts.enhances[number];
