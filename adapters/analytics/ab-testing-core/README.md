# A/B Testing Core Adapter

Tech-agnostic A/B testing utilities, types, and experiment management.

## Overview

This adapter provides reusable A/B testing utilities that work with any framework. Framework-specific implementations (Vercel Edge Config, Next.js Middleware) are handled by connectors.

## Features

- ✅ **Experiment Types**: TypeScript interfaces for experiments, variants, and results
- ✅ **Variant Assignment**: Random, deterministic, and session-based assignment logic
- ✅ **Traffic Splitting**: Flexible traffic distribution across variants
- ✅ **Experiment Management**: Create and manage experiments programmatically
- ✅ **Cookie Management**: Utilities for storing variant assignments

## Installation

This adapter is automatically installed when included in your genome:

```typescript
{
  id: 'analytics/ab-testing-core',
  parameters: {
    features: {
      experimentManagement: true,
      variantAssignment: true,
    },
  },
}
```

## Configuration

### Environment Variables

```bash
AB_TESTING_ENABLED=true
AB_TESTING_COOKIE_NAME=ab_variant
AB_TESTING_COOKIE_MAX_AGE=31536000  # 1 year in seconds
```

### Parameters

- `features` (object):
  - `core` (boolean): Essential A/B testing utilities (default: `true`)
  - `experimentManagement` (boolean): Experiment configuration (default: `true`)
  - `variantAssignment` (boolean): Variant assignment logic (default: `true`)
  - `analytics` (boolean): Analytics integration (default: `false`)

## Usage

This adapter is framework-agnostic and provides base utilities. For Next.js usage with Vercel Edge Config, use the connector:

```typescript
{
  id: 'connectors/analytics/ab-vercel-nextjs',
  requires: ['analytics/ab-testing-core'],
}
```

## Generated Files

- `lib/ab-testing/config.ts` - A/B testing configuration
- `lib/ab-testing/types.ts` - TypeScript types
- `lib/ab-testing/utils.ts` - Utility functions
- `lib/ab-testing/experiments.ts` - Experiment management (if enabled)
- `lib/ab-testing/variant-assignment.ts` - Variant assignment logic (if enabled)

## Example Usage

```typescript
import { createExperiment, assignVariant } from '@/lib/ab-testing/experiments';

// Define an experiment
const homepageExperiment = createExperiment(
  'homepage-cta',
  'Homepage CTA Test',
  ['control', 'variant-a', 'variant-b'],
  {
    trafficSplit: {
      control: 0.5,
      'variant-a': 0.25,
      'variant-b': 0.25,
    },
    sticky: true,
  }
);

// Assign variant
const variant = assignVariant(homepageExperiment, {
  userId: 'user-123',
  cookieVariant: null,
});
```

## Dependencies

None (pure TypeScript utilities)

## Limitations

- Tech-agnostic core only. Requires connector for framework-specific implementation.
- Cookie management is framework-agnostic (returns strings, not actual cookies).
- Analytics integration requires connector setup.

## Next Steps

After installing this adapter, add the framework connector:

- **Next.js (Vercel)**: `connectors/analytics/ab-vercel-nextjs`
- More connectors coming soon...




