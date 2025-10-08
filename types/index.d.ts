/**
 * The Architech Marketplace Types
 * 
 * Auto-generated TypeScript definitions with artifact discovery
 */

// Export base types
export * from './base';

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
export * from './adapters/ui/react-flow';
export * from './adapters/ui/shadcn-ui';
export * from './adapters/ui/tailwind';
export * from './connectors/connectors/better-auth-github';
export * from './connectors/connectors/docker-drizzle';
export * from './connectors/connectors/docker-nextjs';
export * from './connectors/connectors/rhf-zod-shadcn';
export * from './connectors/connectors/sentry-nextjs';
export * from './connectors/connectors/tanstack-query-nextjs';
export * from './connectors/connectors/vitest-nextjs';
export * from './connectors/connectors/zustand-nextjs';
export * from './features/features/ai-chat/backend/vercel-ai-nextjs';
export * from './features/features/ai-chat/frontend/shadcn';
export * from './features/features/architech-welcome/shadcn';
export * from './features/features/auth/backend/better-auth-nextjs';
export * from './features/features/auth/frontend/shadcn';
export * from './features/features/emailing/backend/resend-nextjs';
export * from './features/features/emailing/frontend/shadcn';
export * from './features/features/graph-visualizer/shadcn';
export * from './features/features/monitoring/shadcn';
export * from './features/features/payments/backend/stripe-nextjs';
export * from './features/features/payments/frontend/shadcn';
export * from './features/features/project-management/shadcn';
export * from './features/features/repo-analyzer/shadcn';
export * from './features/features/social-profile/shadcn';
export * from './features/features/teams-management/backend/better-auth-nextjs';
export * from './features/features/teams-management/frontend/shadcn';
export * from './features/features/web3/shadcn';

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
export { Module, ProjectConfig } from '@thearchitech.xyz/marketplace/types';

// Re-export Genome type from shared types package
export { Genome } from '@thearchitech.xyz/marketplace/types';
