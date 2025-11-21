/**
 * Payments Feature Technology Stack Blueprint
 * 
 * This blueprint automatically adds the technology-agnostic stack layer
 * (types, schemas, hooks, stores) to any Payments implementation.
 * 
 * This ensures consistency across all frontend/backend technologies.
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'features/payments/tech-stack'>
): BlueprintAction[] {
  const actions: BlueprintAction[] = [];
  
  // Extract module parameters for cleaner access
  const { params, features } = extractTypedModuleParameters(config);
  
  // ============================================================================
  // TECHNOLOGY STACK LAYER DEPENDENCIES
  // ============================================================================
  
  // Install tech-stack layer dependencies
  actions.push({
    type: BlueprintActionType.INSTALL_PACKAGES,
    packages: [
      'zod',
      '@tanstack/react-query',
      'zustand',
      'immer',
      'sonner'
    ]
  });
  
  // ============================================================================
  // TECHNOLOGY STACK LAYER FILES
  // ============================================================================
  
  // Types - Re-exported from contract (single source of truth)
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.packages.shared.src}payments/types.ts',
    content: `/**
 * Payments Types
 * Re-exported from contract for convenience
 */
export type { 
  Payment, Subscription, Invoice, PaymentMethodData, PaymentIntent, Refund, PaymentAnalytics,
  CreatePaymentData, CreateSubscriptionData, CreateInvoiceData,
  UpdatePaymentData, UpdateSubscriptionData, PaymentFilters,
  PaymentStatus, PaymentMethod, Currency, SubscriptionStatus, InvoiceStatus,
  IPaymentService
} from '@/features/payments/contract';
`,
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });
  
  // Schemas - Zod validation schemas
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.packages.shared.src}payments/schemas.ts',
    template: 'templates/schemas.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });
  
  // Hooks - Direct TanStack Query hooks (best practice pattern)
  // UI components use individual hooks directly (e.g., useSubscriptionsList, useInvoicesList)
  // with aliases for cleaner names (e.g., useSubscriptionsList as useSubscriptions)
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.packages.shared.src}payments/hooks.ts',
    template: 'templates/hooks.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.REPLACE,
      priority: 1
    }
  });
  
  // Stores - Zustand state management
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.packages.shared.src}payments/stores.ts',
    template: 'templates/stores.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });
      
  // ============================================================================
  // UTILITY FILES
  // ============================================================================
      
  // Index file for easy imports (from template)
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.packages.shared.src}payments/index.ts',
    template: 'templates/index.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.REPLACE,
      priority: 1
    }
  });
      
  // ============================================================================
  // DOCUMENTATION
  // ============================================================================
      
  // README for the tech stack layer
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.packages.shared.src}payments/README.md',
    content: `# Payments Feature - Technology Stack Layer

This directory contains the technology-agnostic stack layer for the Payments feature. These files provide consistent types, validation, data fetching, and state management across all implementations.

## Files

### \`types.ts\`
- Technology-agnostic TypeScript type definitions
- Generated from the feature contract
- Used by all frontend/backend implementations

### \`schemas.ts\`
- Zod validation schemas for runtime type checking
- Provides safe data validation and parsing
- Used for API request/response validation

### \`hooks.ts\`
- TanStack Query hooks for data fetching
- Provides consistent data fetching patterns
- Handles caching, loading states, and error handling

### \`stores.ts\`
- Zustand stores for state management
- Provides consistent state patterns
- Handles UI state, data state, and computed values

### \`index.ts\`
- Centralized exports for easy importing
- Re-exports commonly used types, schemas, hooks, and stores

## Usage

\`\`\`typescript
// Import types
import type { Payment, Subscription, Invoice } from '@/lib/payments';

// Import schemas for validation
import { PaymentSchema, SubscriptionSchema } from '@/lib/payments';

// Import hooks for data fetching
import { usePayments, useSubscriptions, useCreatePayment } from '@/lib/payments';

// Import stores for state management
import { usePaymentStore, useSubscriptionStore } from '@/lib/payments';
\`\`\`

## Technology Integration

This tech stack layer is designed to work with any frontend or backend technology:

- **Frontend**: React, Vue, Svelte, etc.
- **Backend**: Node.js, Python, Go, etc.
- **State Management**: Zustand, Redux, Pinia, etc.
- **Data Fetching**: TanStack Query, SWR, Apollo, etc.
- **Validation**: Zod, Yup, Joi, etc.

## Contract Compliance

All files in this layer are generated from and comply with the feature contract (\`contract.ts\`). Any changes to the contract should be reflected in these files to maintain consistency.

## Contributing

When modifying this tech stack layer:

1. Ensure all changes comply with the feature contract
2. Update types, schemas, hooks, and stores consistently
3. Test with multiple technology implementations
4. Update documentation as needed
`,
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });
  
  return actions;
}
