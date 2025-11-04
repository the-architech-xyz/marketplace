/**
 * RevenueCat Backend Integration
 * 
 * Backend webhook handler for RevenueCat subscription management
 */

export interface FeaturesPaymentsBackendRevenuecatParams {

  /** RevenueCat webhook secret for HMAC verification */
  webhookSecret: string;
}

export interface FeaturesPaymentsBackendRevenuecatFeatures {}

// 🚀 Auto-discovered artifacts with ownership info
export declare const FeaturesPaymentsBackendRevenuecatArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type FeaturesPaymentsBackendRevenuecatCreates = typeof FeaturesPaymentsBackendRevenuecatArtifacts.creates[number];
export type FeaturesPaymentsBackendRevenuecatEnhances = typeof FeaturesPaymentsBackendRevenuecatArtifacts.enhances[number];
