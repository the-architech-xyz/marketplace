/**
 * The Architech Marketplace Types - Constitutional Architecture
 * 
 * Auto-generated TypeScript definitions with Constitutional Architecture support
 */

// Import base types from the types package
import { Module, ProjectConfig, ModuleArtifacts as ModuleArtifactsType } from '@thearchitech.xyz/types';

export * from './adapters/ai/vercel-ai-sdk';
export * from './adapters/auth/better-auth';
export * from './adapters/blockchain/web3';
export * from './adapters/content/next-intl';
export * from './adapters/core/dependencies';
export * from './adapters/core/forms';
export * from './adapters/core/git';
export * from './adapters/data-fetching/tanstack-query';
export * from './adapters/database/drizzle';
export * from './adapters/database/prisma';
export * from './adapters/database/sequelize';
export * from './adapters/database/typeorm';
export * from './adapters/deployment/docker';
export * from './adapters/deployment/vercel';
export * from './adapters/email/resend';
export * from './adapters/framework/nextjs';
export * from './adapters/observability/sentry';
export * from './adapters/payment/stripe';
export * from './adapters/quality/eslint';
export * from './adapters/quality/prettier';
export * from './adapters/services/github-api';
export * from './adapters/state/zustand';
export * from './adapters/testing/vitest';
export * from './adapters/ui/shadcn-ui';
export * from './adapters/ui/tailwind';
export * from './connectors/better-auth-github';
export * from './connectors/docker-drizzle';
export * from './connectors/docker-nextjs';
export * from './connectors/rhf-zod-shadcn';
export * from './connectors/sentry/nextjs';
export * from './connectors/sentry/react';
export * from './connectors/sentry-nextjs';
export * from './connectors/stripe/nextjs-drizzle';
export * from './connectors/tanstack-query-nextjs';
export * from './connectors/vitest-nextjs';
export * from './connectors/zustand-nextjs';
export * from './features/ai-chat/backend/vercel-ai-nextjs';
export * from './features/ai-chat/frontend/shadcn';
export * from './features/architech-welcome/shadcn';
export * from './features/auth/backend/better-auth-nextjs';
export * from './features/auth/frontend/shadcn';
export * from './features/email/react-email-templates';
export * from './features/emailing/backend/resend-nextjs';
export * from './features/emailing/frontend/shadcn';
export * from './features/graph-visualizer/shadcn';
export * from './features/monitoring/shadcn';
export * from './features/observability/sentry-shadcn';
export * from './features/payments/backend/stripe-nextjs';
export * from './features/payments/frontend/shadcn';
export * from './features/project-management/shadcn';
export * from './features/repo-analyzer/shadcn';
export * from './features/social-profile/shadcn';
export * from './features/teams-management/backend/better-auth-nextjs';
export * from './features/teams-management/frontend/shadcn';
export * from './features/web3/shadcn';

// 🎯 Cohesive Contract Exports
export * from './contracts/ai-chat';
export * from './contracts/auth';
export * from './contracts/emailing';
export * from './contracts/payments';
export * from './contracts/teams-management';

// 🚀 Auto-discovered module artifacts
export declare const ModuleArtifacts: {
  [key: string]: () => Promise<ModuleArtifactsType>;
};

export type ModuleId = keyof typeof ModuleArtifacts;

// Re-export base types for convenience
export { Module, ProjectConfig } from '@thearchitech.xyz/types';

// Re-export Genome type from shared types package
export { Genome } from '@thearchitech.xyz/types';

// Re-export defineGenome function
export * from './define-genome';
