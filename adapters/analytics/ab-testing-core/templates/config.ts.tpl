// A/B Testing configuration
export const AB_TESTING_CONFIG = {
  enabled: process.env.AB_TESTING_ENABLED !== 'false',
  cookieName: process.env.AB_TESTING_COOKIE_NAME || 'ab_variant',
  cookieMaxAge: parseInt(process.env.AB_TESTING_COOKIE_MAX_AGE || '31536000', 10), // 1 year default
  defaultTrafficSplit: {
    control: 0.5, // 50% control
    variant: 0.5, // 50% variant
  },
  sessionStorageKey: 'ab_test_variants',
};

// Default experiment configuration
export const DEFAULT_EXPERIMENT_CONFIG = {
  enabled: true,
  trafficSplit: AB_TESTING_CONFIG.defaultTrafficSplit,
  sticky: true, // Users stay in same variant
  allowOverride: false, // Allow manual variant override via query param
};




