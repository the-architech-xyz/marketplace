# PostHog Integration Guide

## Setup Instructions

### 1. Add PostHogProvider to Root Layout

Edit `app/layout.tsx`:

```tsx
import { PostHogProvider } from '@/components/analytics/PostHogProvider';
import { TrackPageviews } from '@/hooks/use-pageview';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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

Add to `.env.local`:

```bash
NEXT_PUBLIC_POSTHOG_KEY=your_api_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

### 3. Usage in Components

```tsx
'use client';

import { useAnalytics } from '@/hooks/use-analytics';

export function MyComponent() {
  const analytics = useAnalytics();

  const handleClick = () => {
    analytics.track('button_click', { button_name: 'CTA' });
  };

  return <button onClick={handleClick}>Click me</button>;
}
```

### 4. Feature Flags

```tsx
'use client';

import { useFeatureEnabled } from '@/hooks/use-feature-flags';

export function FeatureComponent() {
  const isEnabled = useFeatureEnabled('new-feature');

  if (!isEnabled) return null;

  return <div>New Feature</div>;
}
```

### 5. Experiments

```tsx
'use client';

import { useExperiment } from '@/hooks/use-experiments';

export function ExperimentComponent() {
  const variant = useExperiment('homepage-cta');

  if (variant === 'variant-a') {
    return <CTA variant="primary" />;
  }

  return <CTA variant="secondary" />;
}
```

## Documentation

- [PostHog Docs](https://posthog.com/docs)
- [Next.js Integration](https://posthog.com/docs/integrate/nextjs)


