/**
 * Marketplace-Generated Genome Types
 * 
 * Auto-generated type definitions for type-safe genome authoring.
 */

import { Genome } from '@thearchitech.xyz/types';

// Generated ModuleId union type
export type ModuleId = 
  | 'ai/vercel-ai-sdk'
  | 'analytics/ab-testing-core'
  | 'analytics/seo-core'
  | 'auth/better-auth'
  | 'backend/api-hono'
  | 'blockchain/web3'
  | 'content/i18n-expo'
  | 'content/i18n-nextjs'
  | 'core/dependencies'
  | 'core/forms'
  | 'core/git'
  | 'core/golden-stack'
  | 'data-fetching/tanstack-query'
  | 'data-fetching/trpc'
  | 'database/drizzle'
  | 'database/prisma'
  | 'database/sequelize'
  | 'database/typeorm'
  | 'deployment/docker'
  | 'deployment/vercel'
  | 'email/resend'
  | 'framework/expo'
  | 'framework/hono'
  | 'framework/nextjs'
  | 'framework/react-native'
  | 'jobs/bullmq'
  | 'jobs/inngest'
  | 'monorepo/nx'
  | 'monorepo/turborepo'
  | 'observability/posthog'
  | 'observability/sentry'
  | 'payment/stripe'
  | 'services/github-api'
  | 'storage/s3-compatible'
  | 'ui/shadcn-ui'
  | 'ui/tailwind'
  | 'ui/tamagui'
  | 'connectors/ai/vercel-ai-nextjs'
  | 'connectors/analytics/ab-vercel-nextjs'
  | 'connectors/analytics/posthog-nextjs'
  | 'connectors/auth/better-auth-nextjs'
  | 'connectors/cms/payload-nextjs'
  | 'connectors/database/drizzle-postgres-docker'
  | 'connectors/deployment/docker-nextjs'
  | 'connectors/email/resend-nextjs'
  | 'connectors/infrastructure/rhf-zod-shadcn'
  | 'connectors/infrastructure/tanstack-query-nextjs'
  | 'connectors/infrastructure/zustand-nextjs'
  | 'connectors/integrations/better-auth-github'
  | 'connectors/monitoring/sentry-nextjs'
  | 'connectors/nextjs-trpc-router'
  | 'connectors/revenuecat-expo'
  | 'connectors/revenuecat-react-native'
  | 'connectors/revenuecat-web'
  | 'connectors/revenuecat-webhook'
  | 'connectors/seo/seo-nextjs'
  | 'connectors/testing/vitest-nextjs'
  | 'connectors/trpc-hono'
  | 'connectors/ui/tamagui-expo'
  | 'connectors/ui/tamagui-nextjs'
  | 'features/_shared/tech-stack/overrides/trpc'
  | 'features/ai-chat/backend/nextjs'
  | 'features/ai-chat/database/drizzle'
  | 'features/ai-chat/frontend'
  | 'features/ai-chat/tech-stack'
  | 'features/architech-welcome'
  | 'features/auth/frontend'
  | 'features/auth/tech-stack'
  | 'features/auth/tech-stack/overrides/better-auth'
  | 'features/emailing/backend/resend-nextjs'
  | 'features/emailing/frontend'
  | 'features/emailing/tech-stack'
  | 'features/monitoring/shadcn'
  | 'features/monitoring/tech-stack'
  | 'features/payments/backend/revenuecat'
  | 'features/payments/backend/stripe-nextjs'
  | 'features/payments/database/drizzle'
  | 'features/payments/frontend'
  | 'features/payments/tech-stack'
  | 'features/payments/tech-stack/overrides/revenuecat'
  | 'features/projects/backend/nextjs'
  | 'features/projects/database/drizzle'
  | 'features/projects/frontend'
  | 'features/projects/tech-stack'
  | 'features/semantic-search/pgvector/backend/hono'
  | 'features/semantic-search/pgvector/database/drizzle'
  | 'features/semantic-search/pgvector/jobs/inngest'
  | 'features/semantic-search/pgvector/tech-stack'
  | 'features/synap/capture/backend/hono'
  | 'features/synap/capture/frontend/tamagui'
  | 'features/synap/capture/jobs/inngest'
  | 'features/synap/capture/tech-stack'
  | 'features/teams-management/backend/nextjs'
  | 'features/teams-management/database/drizzle'
  | 'features/teams-management/frontend'
  | 'features/teams-management/tech-stack'
  | 'features/waitlist/backend/nextjs'
  | 'features/waitlist/database/drizzle'
  | 'features/waitlist/tech-stack'
  | 'features/web3/shadcn'
  | 'scripts/lib';

export type ModuleParameters = {

};


export interface ModuleSourceInfo {
  root: string;
  marketplace?: string;
}

export interface ModuleManifestInfo {
  file: string;
}

export interface ModuleBlueprintInfo {
  file: string;
  runtime: 'source' | 'compiled';
}

export interface ModuleTemplateInfo {
  file: string;
  target?: string;
}

export interface ModuleMarketplaceInfo {
  name: string;
  root?: string;
}

export interface ModuleResolvedPathsInfo {
  root: string;
  manifest: string;
  blueprint: string;
  templates: string[];
}

export interface ModuleMetadata {
  source?: ModuleSourceInfo;
  manifest?: ModuleManifestInfo;
  blueprint?: ModuleBlueprintInfo;
  templates?: ModuleTemplateInfo[];
  marketplace?: ModuleMarketplaceInfo;
  resolved?: ModuleResolvedPathsInfo;
}


// Discriminated union for better IDE support
export type TypedGenomeModule = never;

export interface TypedGenome {
  version: string;
  project: {
    name: string;
    framework: string;
    path?: string;
    description?: string;
    version?: string;
    author?: string;
    license?: string;
    structure?: 'monorepo' | 'single-app';
    monorepo?: {
      tool: 'turborepo' | 'nx' | 'pnpm' | 'yarn';
      packages: {
        api?: string;
        web?: string;
        mobile?: string;
        shared?: string;
        [key: string]: string | undefined;
      };
    };
  };
  modules: TypedGenomeModule[];
  options?: Record<string, any>;
}

// Re-export for convenience
export { Genome } from '@thearchitech.xyz/types';
