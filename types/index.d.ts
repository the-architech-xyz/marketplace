/**
 * The Architech Marketplace Types
 * 
 * Auto-generated TypeScript definitions with artifact discovery
 */

// Import base types from the types package
import { Recipe, Module, ProjectConfig, ModuleArtifacts as ModuleArtifactsType } from '@thearchitech.xyz/types';

export * from './adapters/auth/better-auth';
export * from './adapters/blockchain/web3';
export * from './adapters/content/next-intl';
export * from './adapters/database/drizzle';
export * from './adapters/database/prisma';
export * from './adapters/database/sequelize';
export * from './adapters/database/typeorm';
export * from './adapters/deployment/docker';
export * from './adapters/email/resend';
export * from './adapters/framework/nextjs';
export * from './adapters/observability/sentry';
export * from './adapters/payment/stripe';
export * from './adapters/state/zustand';
export * from './adapters/testing/vitest';
export * from './adapters/tooling/dev-tools';
export * from './adapters/ui/forms';
export * from './adapters/ui/shadcn-ui';
export * from './adapters/ui/tailwind';
export * from './integrations/better-auth-drizzle-integration';
export * from './integrations/better-auth-nextjs-integration';
export * from './integrations/docker-drizzle-integration';
export * from './integrations/docker-nextjs-integration';
export * from './integrations/drizzle-nextjs-integration';
export * from './integrations/prisma-nextjs-integration';
export * from './integrations/resend-nextjs-integration';
export * from './integrations/resend-shadcn-integration';
export * from './integrations/sentry-drizzle-nextjs-integration';
export * from './integrations/sentry-nextjs-integration';
export * from './integrations/shadcn-nextjs-integration';
export * from './integrations/shadcn-zustand-integration';
export * from './integrations/stripe-drizzle-integration';
export * from './integrations/stripe-nextjs-integration';
export * from './integrations/stripe-shadcn-integration';
export * from './integrations/vitest-nextjs-integration';
export * from './integrations/vitest-zustand-integration';
export * from './integrations/web3-nextjs-integration';
export * from './integrations/web3-shadcn-integration';
export * from './integrations/web3-shadcn-nextjs-integration';
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
