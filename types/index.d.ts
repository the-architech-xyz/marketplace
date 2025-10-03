/**
 * The Architech Marketplace Types
 * 
 * Auto-generated TypeScript definitions with artifact discovery
 */

// Import base types from the types package
import { Recipe, Module, ProjectConfig, ModuleArtifacts as ModuleArtifactsType } from '@thearchitech.xyz/types';

export * from './adapters/ai/vercel-ai-sdk';
export * from './adapters/auth/better-auth';
export * from './adapters/blockchain/web3';
export * from './adapters/content/next-intl';
export * from './adapters/core/forms';
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
export * from './adapters/state/zustand';
export * from './adapters/testing/vitest';
export * from './adapters/ui/react-flow';
export * from './adapters/ui/shadcn-ui';
export * from './adapters/ui/tailwind';
export * from './integrations/features/.template';
export * from './integrations/features/auth-ui/shadcn';
export * from './integrations/features/ecommerce-core';
export * from './integrations/features/email-management/nextjs-shadcn';
export * from './integrations/features/payment-management/nextjs-shadcn';
export * from './integrations/features/project-kanban/nextjs-shadcn';
export * from './integrations/features/teams-dashboard/nextjs-shadcn';
export * from './integrations/features/teams-dashboard/shadcn';
export * from './integrations/features/teams-data/drizzle';
export * from './integrations/features/user-profile/nextjs-shadcn';
export * from './integrations/better-auth-nextjs-integration';
export * from './integrations/docker-drizzle-integration';
export * from './integrations/docker-nextjs-integration';
export * from './integrations/drizzle-nextjs-integration';
export * from './integrations/prisma-nextjs-integration';
export * from './integrations/resend-nextjs-integration';
export * from './integrations/resend-shadcn-integration';
export * from './integrations/rhf-zod-shadcn-integration';
export * from './integrations/sentry-nextjs-integration';
export * from './integrations/stripe-nextjs-integration';
export * from './integrations/stripe-shadcn-integration';
export * from './integrations/tanstack-query-nextjs-integration';
export * from './integrations/vitest-nextjs-integration';
export * from './integrations/web3-nextjs-integration';
export * from './integrations/web3-shadcn-integration';
export * from './integrations/zustand-nextjs-integration';

// 🚀 Auto-discovered module artifacts
export declare const ModuleArtifacts: {
  [key: string]: () => Promise<ModuleArtifactsType>;
};

export type ModuleId = keyof typeof ModuleArtifacts;

// 🧬 Genome Type - Extended Recipe with marketplace-specific features
export interface Genome extends Recipe {
  version: string;
  project: ProjectConfig & {
    framework: string;
    path?: string;
  };
  modules: Module[];
}

// Re-export base types for convenience
export { Recipe, Module, ProjectConfig } from '@thearchitech.xyz/types';
