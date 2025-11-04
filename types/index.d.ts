/**
 * The Architech Marketplace Types - Constitutional Architecture
 * 
 * Auto-generated TypeScript definitions with Constitutional Architecture support
 */

// Import base types from the types package
import { Module, ProjectConfig, ModuleArtifacts as ModuleArtifactsType } from '@thearchitech.xyz/types';

export * from './adapters/ai/vercel-ai-sdk';
export * from './adapters/analytics/ab-testing-core';
export * from './adapters/analytics/seo-core';
export * from './adapters/auth/better-auth';
export * from './adapters/blockchain/web3';
export * from './adapters/content/i18n-expo';
export * from './adapters/content/i18n-nextjs';
export * from './adapters/core/dependencies';
export * from './adapters/core/forms';
export * from './adapters/core/git';
export * from './adapters/core/golden-stack';
export * from './adapters/data-fetching/tanstack-query';
export * from './adapters/data-fetching/trpc';
export * from './adapters/database/drizzle';
export * from './adapters/database/prisma';
export * from './adapters/database/sequelize';
export * from './adapters/database/typeorm';
export * from './adapters/deployment/docker';
export * from './adapters/deployment/vercel';
export * from './adapters/email/resend';
export * from './adapters/framework/expo';
export * from './adapters/framework/nextjs';
export * from './adapters/framework/react-native';
export * from './adapters/monorepo/nx';
export * from './adapters/monorepo/turborepo';
export * from './adapters/observability/posthog';
export * from './adapters/observability/sentry';
export * from './adapters/payment/stripe';
export * from './adapters/services/github-api';
export * from './adapters/ui/shadcn-ui';
export * from './adapters/ui/tailwind';
export * from './connectors/ai/vercel-ai-nextjs';
export * from './connectors/analytics/ab-vercel-nextjs';
export * from './connectors/analytics/posthog-nextjs';
export * from './connectors/auth/better-auth-nextjs';
export * from './connectors/cms/payload-nextjs';
export * from './connectors/database/drizzle-postgres-docker';
export * from './connectors/deployment/docker-nextjs';
export * from './connectors/email/resend-nextjs';
export * from './connectors/infrastructure/rhf-zod-shadcn';
export * from './connectors/infrastructure/tanstack-query-nextjs';
export * from './connectors/infrastructure/zustand-nextjs';
export * from './connectors/integrations/better-auth-github';
export * from './connectors/monitoring/sentry-nextjs';
export * from './connectors/nextjs-trpc-router';
export * from './connectors/revenuecat-expo';
export * from './connectors/revenuecat-react-native';
export * from './connectors/revenuecat-web';
export * from './connectors/revenuecat-webhook';
export * from './connectors/seo/seo-nextjs';
export * from './connectors/testing/vitest-nextjs';
export * from './features/_shared/tech-stack/overrides/trpc';
export * from './features/ai-chat/backend/nextjs';
export * from './features/ai-chat/database/drizzle';
export * from './features/ai-chat/frontend';
export * from './features/ai-chat/tech-stack';
export * from './features/architech-welcome';
export * from './features/auth/frontend';
export * from './features/auth/tech-stack';
export * from './features/auth/tech-stack/overrides/better-auth';
export * from './features/emailing/backend/resend-nextjs';
export * from './features/emailing/frontend';
export * from './features/emailing/tech-stack';
export * from './features/monitoring/shadcn';
export * from './features/monitoring/tech-stack';
export * from './features/payments/backend/revenuecat';
export * from './features/payments/backend/stripe-nextjs';
export * from './features/payments/database/drizzle';
export * from './features/payments/frontend';
export * from './features/payments/tech-stack';
export * from './features/payments/tech-stack/overrides/revenuecat';
export * from './features/teams-management/backend/nextjs';
export * from './features/teams-management/database/drizzle';
export * from './features/teams-management/frontend';
export * from './features/teams-management/tech-stack';
export * from './features/waitlist/backend/nextjs';
export * from './features/waitlist/database/drizzle';
export * from './features/waitlist/tech-stack';
export * from './features/web3/shadcn';

// 🎯 Cohesive Contract Exports
export * from './contracts/ai-chat';
export * from './contracts/auth';
export * from './contracts/emailing';
export * from './contracts/monitoring';
export * from './contracts/payments';
export * from './contracts/teams-management';
export * from './contracts/waitlist';

// 🚀 Auto-discovered module artifacts
export declare const ModuleArtifacts: {
  [key: string]: () => Promise<ModuleArtifactsType>;
};

export type ModuleId = keyof typeof ModuleArtifacts;

// Re-export base types for convenience
export { Module, ProjectConfig } from '@thearchitech.xyz/types';

// Re-export Genome type from shared types package
export { Genome } from '@thearchitech.xyz/types';

// Re-export defineGenome function (module-focused)
export * from './define-genome';

// Re-export capability types (capability-focused)
export * from './capability-types';
