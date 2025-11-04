# PostHog Next.js Connector

Next.js App Router integration for PostHog analytics, feature flags, and experiments.

## Overview

This connector enhances the PostHog adapter with Next.js-specific features:

- ✅ **PostHogProvider**: React provider component for PostHog
- ✅ **React Hooks**: `usePostHog()`, `useAnalytics()`, `useFeatureFlags()`, `useExperiments()`
- ✅ **Automatic Pageview Tracking**: Tracks page views on route changes
- ✅ **SSR Support**: Safe client-side initialization
- ✅ **TypeScript Support**: Full type safety

## Installation

This connector requires the PostHog adapter:

```typescript
{
  id: 'observability/posthog',
  parameters: {
    apiKey: process.env.POSTHOG_API_KEY,
  },
},
{
  id: 'connectors/analytics/posthog-nextjs',
  requires: ['observability/posthog'],
  parameters: {
    provider: true,
    capturePageviews: true,
    featureFlags: true,
    experiments: true,
  },
}
```

## Features

### Event Tracking

```tsx
'use client';
import { useAnalytics } from '@/hooks/use-analytics';

function MyComponent() {
  const analytics = useAnalytics();

  const handleClick = () => {
    analytics.track('button_click', { button_name: 'CTA' });
  };

  return <button onClick={handleClick}>Track me</button>;
}
```

### Feature Flags

```tsx
'use client';
import { useFeatureEnabled } from '@/hooks/use-feature-flags';

function FeatureComponent() {
  const isEnabled = useFeatureEnabled('new-feature');

  if (!isEnabled) return null;

  return <div>New Feature</div>;
}
```

### A/B Testing

```tsx
'use client';
import { useExperiment } from '@/hooks/use-experiments';

function ExperimentComponent() {
  const variant = useExperiment('homepage-cta');

  return variant === 'variant-a' ? <CTA variant="primary" /> : <CTA variant="secondary" />;
}
```

## Setup

### 1. Add Provider to Root Layout

```tsx
import { PostHogProvider } from '@/components/analytics/PostHogProvider';
import { TrackPageviews } from '@/hooks/use-pageview';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <PostHogProvider>
          <TrackPageviews />
          {children}
        </PostHogProvider>
      </body>
    </html>
  );
}
```

### 2. Environment Variables

```bash
NEXT_PUBLIC_POSTHOG_KEY=your_api_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

## Parameters

- `provider` (boolean): Add PostHogProvider to app (default: `true`)
- `capturePageviews` (boolean): Auto-capture pageviews (default: `true`)
- `captureClicks` (boolean): Auto-capture clicks (default: `true`)
- `middleware` (boolean): Add middleware (default: `false`)
- `eventTracking` (boolean): Enable event tracking (default: `true`)
- `featureFlags` (boolean): Enable feature flags (default: `false`)
- `experiments` (boolean): Enable experiments (default: `false`)
- `sessionReplay` (boolean): Enable session replay (default: `false`)

## Generated Files

- `components/analytics/PostHogProvider.tsx` - React provider
- `hooks/use-posthog.ts` - Main PostHog hook
- `hooks/use-analytics.ts` - Analytics tracking hook
- `hooks/use-pageview.ts` - Pageview tracking hook
- `hooks/use-feature-flags.ts` - Feature flags hook (if enabled)
- `hooks/use-experiments.ts` - Experiments hook (if enabled)
- `middleware/posthog.ts` - Middleware (if enabled)

## Requirements

- `framework/nextjs`
- `observability/posthog`

## Dependencies

- `posthog-js/react` - React bindings for PostHog


