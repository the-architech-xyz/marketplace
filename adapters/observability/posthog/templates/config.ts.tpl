// PostHog configuration
export const POSTHOG_CONFIG = {
  apiKey: process.env.POSTHOG_API_KEY || process.env.NEXT_PUBLIC_POSTHOG_KEY || '',
  apiHost: process.env.POSTHOG_API_HOST || process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
  environment: process.env.NODE_ENV || 'development',
  personProfiles: process.env.POSTHOG_PERSON_PROFILES || 'identified_only',
  enabled: process.env.NODE_ENV === 'production' || process.env.POSTHOG_ENABLED === 'true',
};

// Feature flags configuration
export const POSTHOG_FEATURES = {
  eventTracking: process.env.POSTHOG_EVENT_TRACKING !== 'false',
  sessionReplay: process.env.POSTHOG_SESSION_REPLAY === 'true',
  featureFlags: process.env.POSTHOG_FEATURE_FLAGS === 'true',
  experiments: process.env.POSTHOG_EXPERIMENTS === 'true',
  autocapture: process.env.POSTHOG_AUTOCAPTURE !== 'false',
  surveys: process.env.POSTHOG_SURVEYS === 'true',
};

// Client-side initialization options
export const POSTHOG_CLIENT_OPTIONS = {
  api_host: POSTHOG_CONFIG.apiHost,
  autocapture: POSTHOG_FEATURES.autocapture,
  capture_pageview: true,
  capture_pageleave: true,
  session_recording: {
    maskAllInputs: true,
    maskInputOptions: {
      password: true,
      email: true,
    },
    recordCrossOriginIframes: false,
  },
  loaded: (posthog: any) => {
    // Optional: Custom initialization callback
    if (process.env.NODE_ENV === 'development') {
      console.log('PostHog initialized', { apiHost: POSTHOG_CONFIG.apiHost });
    }
  },
};

// Server-side initialization options
export const POSTHOG_SERVER_OPTIONS = {
  host: POSTHOG_CONFIG.apiHost,
  flushAt: 20,
  flushInterval: 10000,
};


