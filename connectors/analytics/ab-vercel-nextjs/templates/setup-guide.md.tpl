# A/B Testing Setup Guide

## Overview

This module implements A/B testing using Vercel Edge Config and Next.js Middleware for efficient variant assignment at the edge.

## Setup Instructions

### 1. Configure Vercel Edge Config

1. Go to your Vercel Dashboard
2. Navigate to **Storage** > **Edge Config**
3. Create a new Edge Config (or use existing)
4. Add your experiments configuration:

```json
{
  "ab_experiments": {
    "homepage-cta": {
      "id": "homepage-cta",
      "name": "Homepage CTA Test",
      "enabled": true,
      "variants": ["control", "variant-a", "variant-b"],
      "trafficSplit": {
        "control": 0.5,
        "variant-a": 0.25,
        "variant-b": 0.25
      },
      "sticky": true,
      "allowOverride": false
    }
  }
}
```

### 2. Add Environment Variables

Add to `.env.local` and Vercel:

```bash
EDGE_CONFIG=your-edge-config-connection-string
AB_TESTING_ENABLED=true
```

### 3. Integrate Middleware

Edit `middleware.ts` in your project root:

```ts
import { NextRequest, NextResponse } from 'next/server';
import { abTestingMiddleware } from './middleware/ab-testing';

export function middleware(request: NextRequest) {
  // Run A/B testing middleware
  const response = abTestingMiddleware(request);
  
  // Add your other middleware logic here
  
  return response;
}

export const config = {
  matcher: [
    // Match all request paths except:
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
```

### 4. Use in Components

#### Basic Usage with Experiment Component

```tsx
'use client';

import { Experiment, Variant } from '@/components/ab-testing/Experiment';

export function Homepage() {
  return (
    <div>
      <h1>Welcome</h1>
      <Experiment experimentId="homepage-cta" fallback={<DefaultCTA />}>
        <Variant name="control">
          <button>Sign Up</button>
        </Variant>
        <Variant name="variant-a">
          <button className="primary">Get Started</button>
        </Variant>
        <Variant name="variant-b">
          <button className="secondary">Join Now</button>
        </Variant>
      </Experiment>
    </div>
  );
}
```

#### Using Hooks

```tsx
'use client';

import { useExperiment, useIsInVariant } from '@/hooks/use-experiment';

export function Homepage() {
  const { variant, isLoading } = useExperiment('homepage-cta');
  const isVariantA = useIsInVariant('homepage-cta', 'variant-a');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isVariantA ? (
        <CustomCTA variant="a" />
      ) : (
        <DefaultCTA />
      )}
    </div>
  );
}
```

### 5. Server-Side Variant Access

In Server Components or API routes:

```tsx
import { cookies } from 'next/headers';
import { parseVariantCookie } from '@/lib/ab-testing/utils';
import { AB_TESTING_CONFIG } from '@/lib/ab-testing/config';

export default async function HomePage() {
  const cookieStore = cookies();
  const experimentCookie = cookieStore.get(`${AB_TESTING_CONFIG.cookieName}_homepage-cta`);
  
  let variant = 'control'; // default
  
  if (experimentCookie) {
    const parsed = parseVariantCookie(experimentCookie.value);
    if (parsed) {
      variant = parsed.variant;
    }
  }

  return (
    <div>
      {variant === 'variant-a' ? <VariantAContent /> : <DefaultContent />}
    </div>
  );
}
```

## Features

- ✅ **Edge-Based Assignment**: Variants assigned at the edge for performance
- ✅ **Sticky Variants**: Users stay in the same variant (cookie-based)
- ✅ **Override Support**: Test variants via query param (if enabled)
- ✅ **Type Safety**: Full TypeScript support
- ✅ **React Components**: Easy-to-use Experiment/Variant components
- ✅ **Hooks**: React hooks for accessing variants

## Testing Variants

### Manual Override

Add `?variant=variant-a` to URL (if `allowOverride: true`):

```
https://example.com?variant=variant-a
```

### Debug Mode

In development, variants are exposed in response headers:

```
X-AB-Variants: {"homepage-cta":"variant-a"}
```

## Best Practices

1. **Start Small**: Test with 50/50 split initially
2. **Set Clear Goals**: Define what you're testing and success metrics
3. **Run for Sufficient Time**: Allow enough time to collect data
4. **Monitor Performance**: Track conversion rates, not just views
5. **Document Experiments**: Keep track of what you're testing and why

## Analytics Integration

To track experiment performance, integrate with your analytics:

```tsx
import { useExperiment } from '@/hooks/use-experiment';
import { useEffect } from 'react';

export function TrackedExperiment({ experimentId }: { experimentId: string }) {
  const { variant } = useExperiment(experimentId);

  useEffect(() => {
    if (variant) {
      // Track experiment view
      analytics.track('experiment_viewed', {
        experimentId,
        variant,
      });
    }
  }, [variant, experimentId]);

  return <Experiment experimentId={experimentId}>...</Experiment>;
}
```




