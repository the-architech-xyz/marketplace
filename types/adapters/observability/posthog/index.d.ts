/**
 * PostHog Core (Tech-Agnostic)
 * 
 * Tech-agnostic PostHog analytics SDK configuration. Framework-specific implementations handled by Connectors.
 */

export interface ObservabilityPosthogParams {

  /** PostHog API key (or set POSTHOG_API_KEY env var) */
  apiKey?: string;

  /** PostHog API host URL */
  apiHost?: string;

  /** Environment name */
  environment?: string;
  /** Constitutional Architecture features configuration */
  features?: {

    /** Essential analytics (event tracking, user identification) */
    core?: boolean;

    /** Event tracking and analytics */
    eventTracking?: boolean;

    /** Session replay recording */
    sessionReplay?: boolean;

    /** Feature flags management */
    featureFlags?: boolean;

    /** A/B testing and experiments */
    experiments?: boolean;

    /** Auto-capture user interactions */
    autocapture?: boolean;

    /** Surveys and feedback collection */
    surveys?: boolean;
  };

  /** Person profiles creation mode */
  personProfiles?: 'identified_only' | 'always' | 'never';
}

export interface ObservabilityPosthogFeatures {

  /** Essential analytics (event tracking, user identification) */
  core: boolean;

  /** Event tracking and analytics */
  eventTracking: boolean;

  /** Session replay recording */
  sessionReplay: boolean;

  /** Feature flags management */
  featureFlags: boolean;

  /** A/B testing and experiments */
  experiments: boolean;

  /** Auto-capture user interactions */
  autocapture: boolean;

  /** Surveys and feedback collection */
  surveys: boolean;
}

// 🚀 Auto-discovered artifacts
export declare const ObservabilityPosthogArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type ObservabilityPosthogCreates = typeof ObservabilityPosthogArtifacts.creates[number];
export type ObservabilityPosthogEnhances = typeof ObservabilityPosthogArtifacts.enhances[number];
