/**
 * PostHog Next.js Connector
 * 
 * Enhances PostHog adapter with NextJS App Router integration, provider, hooks, and analytics utilities
 */

export interface ConnectorsAnalyticsPosthogNextjsParams {

  /** Add PostHogProvider to app root */
  provider?: boolean;

  /** Automatically capture page views on route changes */
  capturePageviews?: boolean;

  /** Automatically capture button clicks and interactions */
  captureClicks?: boolean;

  /** Add Next.js middleware for pageview tracking */
  middleware?: boolean;

  /** Enable event tracking hooks and utilities */
  eventTracking?: boolean;

  /** Enable feature flags hooks */
  featureFlags?: boolean;

  /** Enable A/B testing and experiments hooks */
  experiments?: boolean;

  /** Enable session replay recording */
  sessionReplay?: boolean;
}

export interface ConnectorsAnalyticsPosthogNextjsFeatures {}

// 🚀 Auto-discovered artifacts with ownership info
export declare const ConnectorsAnalyticsPosthogNextjsArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type ConnectorsAnalyticsPosthogNextjsCreates = typeof ConnectorsAnalyticsPosthogNextjsArtifacts.creates[number];
export type ConnectorsAnalyticsPosthogNextjsEnhances = typeof ConnectorsAnalyticsPosthogNextjsArtifacts.enhances[number];
