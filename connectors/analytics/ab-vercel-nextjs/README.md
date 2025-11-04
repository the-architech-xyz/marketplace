# A/B Testing Vercel Next.js Connector

A/B testing implementation for Next.js with Vercel Edge Config, middleware-based variant assignment, and React components.

## Overview

This connector enhances the A/B testing adapter with Next.js-specific features:

- ✅ **Edge Middleware**: Assign variants at the edge for performance
- ✅ **Vercel Edge Config**: Manage experiments from Vercel Dashboard
- ✅ **React Components**: `<Experiment>` and `<Variant>` components
- ✅ **React Hooks**: `useExperiment()`, `useIsInVariant()`
- ✅ **Cookie Persistence**: Sticky variant assignments

## Installation

This connector requires the A/B testing adapter:

```typescript
{
  id: 'analytics/ab-testing-core',
  parameters: {
    features: {
      experimentManagement: true,
      variantAssignment: true,
    },
  },
},
{
  id: 'connectors/analytics/ab-vercel-nextjs',
  requires: ['analytics/ab-testing-core'],
  parameters: {
    middleware: true,
    components: true,
    hooks: true,
    edgeConfig: true,
  },
}
```

## Features

### Middleware-Based Assignment

Variants are assigned at the edge using Next.js Middleware:

```tsx
// middleware.ts
import { abTestingMiddleware } from './middleware/ab-testing';

export function middleware(request: NextRequest) {
  return abTestingMiddleware(request);
}
```

### Experiment Component

Easy-to-use component for displaying variants:

```tsx
<Experiment experimentId="homepage-cta">
  <Variant name="control">
    <button>Sign Up</button>
  </Variant>
  <Variant name="variant-a">
    <button className="primary">Get Started</button>
  </Variant>
</Experiment>
```

### React Hooks

Access variants in your components:

```tsx
const { variant } = useExperiment('homepage-cta');
const isVariantA = useIsInVariant('homepage-cta', 'variant-a');
```

## Parameters

- `middleware` (boolean): Add A/B testing middleware (default: `true`)
- `components` (boolean): Generate Experiment/Variant components (default: `true`)
- `hooks` (boolean): Generate React hooks (default: `true`)
- `edgeConfig` (boolean): Configure Vercel Edge Config (default: `true`)
- `analytics` (boolean): Enable analytics integration (default: `false`)

## Generated Files

- `middleware/ab-testing.ts` - A/B testing middleware
- `lib/ab-testing/edge-config.ts` - Edge Config client
- `hooks/use-experiment.ts` - Experiment hooks
- `hooks/use-variant.ts` - Variant hooks
- `components/ab-testing/Experiment.tsx` - Experiment component
- `components/ab-testing/Variant.tsx` - Variant component
- `docs/ab-testing-setup.md` - Setup guide

## Requirements

- `framework/nextjs`
- `analytics/ab-testing-core`

## Dependencies

- `@vercel/edge-config` - Vercel Edge Config client
- `react-cookie` - Cookie management (optional, for hooks)

## Setup

1. Configure Vercel Edge Config in dashboard
2. Add experiments to Edge Config
3. Set `EDGE_CONFIG` environment variable
4. Integrate middleware into your `middleware.ts`
5. Use `<Experiment>` components in your pages

## Next Steps

See `docs/ab-testing-setup.md` for detailed setup instructions.




