# PostHog Analytics Adapter

Tech-agnostic PostHog SDK configuration for product analytics, feature flags, session replay, and experiments.

## Overview

This adapter provides the core PostHog SDK setup that works with any framework. Framework-specific integrations are handled by connectors (e.g., `connectors/analytics/posthog-nextjs`).

## Features

- ✅ **Event Tracking**: Track custom events and user actions
- ✅ **User Identification**: Identify users and track user properties
- ✅ **Session Replay**: Record and replay user sessions (optional)
- ✅ **Feature Flags**: Manage feature flags and gradual rollouts
- ✅ **Experiments**: Run A/B tests and experiments
- ✅ **Autocapture**: Automatically capture user interactions

## Installation

This adapter is automatically installed when included in your genome:

```typescript
{
  id: 'observability/posthog',
  parameters: {
    apiKey: process.env.POSTHOG_API_KEY,
    features: {
      sessionReplay: true,
      featureFlags: true,
      experiments: true,
    },
  },
}
```

## Configuration

### Environment Variables

```bash
POSTHOG_API_KEY=your_api_key
POSTHOG_API_HOST=https://app.posthog.com  # Optional, defaults to PostHog Cloud
POSTHOG_ENABLED=true
POSTHOG_SESSION_REPLAY=true  # Optional
POSTHOG_FEATURE_FLAGS=true   # Optional
POSTHOG_EXPERIMENTS=true     # Optional
```

### Parameters

- `apiKey` (string): PostHog project API key
- `apiHost` (string): PostHog API host URL (default: `https://app.posthog.com`)
- `environment` (string): Environment name (default: `development`)
- `features` (object):
  - `core` (boolean): Essential analytics (default: `true`)
  - `eventTracking` (boolean): Event tracking (default: `true`)
  - `sessionReplay` (boolean): Session replay (default: `false`)
  - `featureFlags` (boolean): Feature flags (default: `false`)
  - `experiments` (boolean): A/B testing (default: `false`)
  - `autocapture` (boolean): Auto-capture interactions (default: `true`)
  - `surveys` (boolean): Surveys collection (default: `false`)

## Usage

This adapter is framework-agnostic and provides base configuration. For React/Next.js usage, use the connector:

```typescript
{
  id: 'connectors/analytics/posthog-nextjs',
  requires: ['observability/posthog'],
}
```

## Generated Files

- `lib/analytics/posthog/config.ts` - Configuration
- `lib/analytics/posthog/client.ts` - Browser SDK setup
- `lib/analytics/posthog/server.ts` - Node.js SDK setup
- `lib/analytics/posthog/analytics.ts` - Analytics API
- `lib/analytics/posthog/event-tracking.ts` - Event tracking utilities
- `lib/analytics/posthog/user-tracking.ts` - User identification utilities
- `lib/analytics/posthog/session-replay.ts` - Session replay utilities (if enabled)
- `lib/analytics/posthog/feature-flags.ts` - Feature flags utilities (if enabled)
- `lib/analytics/posthog/experiments.ts` - Experiments utilities (if enabled)

## Dependencies

- `posthog-js` - Browser SDK
- `posthog-node` - Node.js SDK

## Limitations

- Tech-agnostic core only. Requires connector for framework-specific implementation.
- Browser SDK initialization must be handled by connector (to prevent SSR issues).
- Server-side tracking requires connector setup.

## Next Steps

After installing this adapter, add the framework connector:

- **Next.js**: `connectors/analytics/posthog-nextjs`
- More connectors coming soon...


