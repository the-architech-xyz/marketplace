/**
 * Generated TypeScript definitions for The Architech Marketplace
 * This file provides a type-safe interface for working with genomes
 */

import { TailwindUiParams, TailwindUiFeatures } from './adapters/ui/tailwind';
import { Shadcn_uiUiParams, Shadcn_uiUiFeatures } from './adapters/ui/shadcn-ui';
import { FormsUiParams, FormsUiFeatures } from './adapters/ui/forms';
import { Dev_toolsToolingParams, Dev_toolsToolingFeatures } from './adapters/tooling/dev-tools';
import { VitestTestingParams, VitestTestingFeatures } from './adapters/testing/vitest';
import { ZustandStateParams, ZustandStateFeatures } from './adapters/state/zustand';
import { StripePaymentParams, StripePaymentFeatures } from './adapters/payment/stripe';
import { SentryObservabilityParams, SentryObservabilityFeatures } from './adapters/observability/sentry';
import { NextjsFrameworkParams, NextjsFrameworkFeatures } from './adapters/framework/nextjs';
import { ResendEmailParams, ResendEmailFeatures } from './adapters/email/resend';
import { DockerDeploymentParams, DockerDeploymentFeatures } from './adapters/deployment/docker';
import { TypeormDatabaseParams, TypeormDatabaseFeatures } from './adapters/database/typeorm';
import { SequelizeDatabaseParams, SequelizeDatabaseFeatures } from './adapters/database/sequelize';
import { PrismaDatabaseParams, PrismaDatabaseFeatures } from './adapters/database/prisma';
import { DrizzleDatabaseParams, DrizzleDatabaseFeatures } from './adapters/database/drizzle';
import { Next_intlContentParams, Next_intlContentFeatures } from './adapters/content/next-intl';
import { Web3BlockchainParams, Web3BlockchainFeatures } from './adapters/blockchain/web3';
import { Better_authAuthParams, Better_authAuthFeatures } from './adapters/auth/better-auth';
import { Zustand_nextjs_integrationIntegrationParams, Zustand_nextjs_integrationIntegrationFeatures } from './integrations/integration/zustand-nextjs-integration';
import { Web3_shadcn_nextjs_integrationIntegrationParams, Web3_shadcn_nextjs_integrationIntegrationFeatures } from './integrations/integration/web3-shadcn-nextjs-integration';
import { Web3_shadcn_integrationIntegrationParams, Web3_shadcn_integrationIntegrationFeatures } from './integrations/integration/web3-shadcn-integration';
import { Web3_nextjs_integrationIntegrationParams, Web3_nextjs_integrationIntegrationFeatures } from './integrations/integration/web3-nextjs-integration';
import { Vitest_zustand_integrationIntegrationParams, Vitest_zustand_integrationIntegrationFeatures } from './integrations/integration/vitest-zustand-integration';
import { Vitest_nextjs_integrationIntegrationParams, Vitest_nextjs_integrationIntegrationFeatures } from './integrations/integration/vitest-nextjs-integration';
import { Stripe_shadcn_integrationIntegrationParams, Stripe_shadcn_integrationIntegrationFeatures } from './integrations/integration/stripe-shadcn-integration';
import { Stripe_nextjs_integrationIntegrationParams, Stripe_nextjs_integrationIntegrationFeatures } from './integrations/integration/stripe-nextjs-integration';
import { Stripe_drizzle_integrationIntegrationParams, Stripe_drizzle_integrationIntegrationFeatures } from './integrations/integration/stripe-drizzle-integration';
import { Shadcn_zustand_integrationIntegrationParams, Shadcn_zustand_integrationIntegrationFeatures } from './integrations/integration/shadcn-zustand-integration';
import { Shadcn_nextjs_integrationIntegrationParams, Shadcn_nextjs_integrationIntegrationFeatures } from './integrations/integration/shadcn-nextjs-integration';
import { Sentry_nextjs_integrationIntegrationParams, Sentry_nextjs_integrationIntegrationFeatures } from './integrations/integration/sentry-nextjs-integration';
import { Sentry_drizzle_nextjs_integrationIntegrationParams, Sentry_drizzle_nextjs_integrationIntegrationFeatures } from './integrations/integration/sentry-drizzle-nextjs-integration';
import { Resend_shadcn_integrationIntegrationParams, Resend_shadcn_integrationIntegrationFeatures } from './integrations/integration/resend-shadcn-integration';
import { Resend_nextjs_integrationIntegrationParams, Resend_nextjs_integrationIntegrationFeatures } from './integrations/integration/resend-nextjs-integration';
import { Prisma_nextjs_integrationIntegrationParams, Prisma_nextjs_integrationIntegrationFeatures } from './integrations/integration/prisma-nextjs-integration';
import { Drizzle_nextjs_integrationIntegrationParams, Drizzle_nextjs_integrationIntegrationFeatures } from './integrations/integration/drizzle-nextjs-integration';
import { Docker_nextjs_integrationIntegrationParams, Docker_nextjs_integrationIntegrationFeatures } from './integrations/integration/docker-nextjs-integration';
import { Docker_drizzle_integrationIntegrationParams, Docker_drizzle_integrationIntegrationFeatures } from './integrations/integration/docker-drizzle-integration';
import { Better_auth_nextjs_integrationIntegrationParams, Better_auth_nextjs_integrationIntegrationFeatures } from './integrations/integration/better-auth-nextjs-integration';
import { Better_auth_drizzle_integrationIntegrationParams, Better_auth_drizzle_integrationIntegrationFeatures } from './integrations/integration/better-auth-drizzle-integration';

/**
 * Module configuration type
 */
export type ModuleConfig =
  | { id: 'ui/tailwind'; parameters?: TailwindUiParams; features?: TailwindUiFeatures }
  | { id: 'ui/shadcn-ui'; parameters?: Shadcn_uiUiParams; features?: Shadcn_uiUiFeatures }
  | { id: 'ui/forms'; parameters?: FormsUiParams; features?: FormsUiFeatures }
  | { id: 'tooling/dev-tools'; parameters?: Dev_toolsToolingParams; features?: Dev_toolsToolingFeatures }
  | { id: 'testing/vitest'; parameters?: VitestTestingParams; features?: VitestTestingFeatures }
  | { id: 'state/zustand'; parameters?: ZustandStateParams; features?: ZustandStateFeatures }
  | { id: 'payment/stripe'; parameters?: StripePaymentParams; features?: StripePaymentFeatures }
  | { id: 'observability/sentry'; parameters?: SentryObservabilityParams; features?: SentryObservabilityFeatures }
  | { id: 'framework/nextjs'; parameters?: NextjsFrameworkParams; features?: NextjsFrameworkFeatures }
  | { id: 'email/resend'; parameters?: ResendEmailParams; features?: ResendEmailFeatures }
  | { id: 'deployment/docker'; parameters?: DockerDeploymentParams; features?: DockerDeploymentFeatures }
  | { id: 'database/typeorm'; parameters?: TypeormDatabaseParams; features?: TypeormDatabaseFeatures }
  | { id: 'database/sequelize'; parameters?: SequelizeDatabaseParams; features?: SequelizeDatabaseFeatures }
  | { id: 'database/prisma'; parameters?: PrismaDatabaseParams; features?: PrismaDatabaseFeatures }
  | { id: 'database/drizzle'; parameters?: DrizzleDatabaseParams; features?: DrizzleDatabaseFeatures }
  | { id: 'content/next-intl'; parameters?: Next_intlContentParams; features?: Next_intlContentFeatures }
  | { id: 'blockchain/web3'; parameters?: Web3BlockchainParams; features?: Web3BlockchainFeatures }
  | { id: 'auth/better-auth'; parameters?: Better_authAuthParams; features?: Better_authAuthFeatures }
  | { id: 'zustand-nextjs-integration'; parameters?: Zustand_nextjs_integrationIntegrationParams; features?: Zustand_nextjs_integrationIntegrationFeatures }
  | { id: 'web3-shadcn-nextjs-integration'; parameters?: Web3_shadcn_nextjs_integrationIntegrationParams; features?: Web3_shadcn_nextjs_integrationIntegrationFeatures }
  | { id: 'web3-shadcn-integration'; parameters?: Web3_shadcn_integrationIntegrationParams; features?: Web3_shadcn_integrationIntegrationFeatures }
  | { id: 'web3-nextjs-integration'; parameters?: Web3_nextjs_integrationIntegrationParams; features?: Web3_nextjs_integrationIntegrationFeatures }
  | { id: 'vitest-zustand-integration'; parameters?: Vitest_zustand_integrationIntegrationParams; features?: Vitest_zustand_integrationIntegrationFeatures }
  | { id: 'vitest-nextjs-integration'; parameters?: Vitest_nextjs_integrationIntegrationParams; features?: Vitest_nextjs_integrationIntegrationFeatures }
  | { id: 'stripe-shadcn-integration'; parameters?: Stripe_shadcn_integrationIntegrationParams; features?: Stripe_shadcn_integrationIntegrationFeatures }
  | { id: 'stripe-nextjs-integration'; parameters?: Stripe_nextjs_integrationIntegrationParams; features?: Stripe_nextjs_integrationIntegrationFeatures }
  | { id: 'stripe-drizzle-integration'; parameters?: Stripe_drizzle_integrationIntegrationParams; features?: Stripe_drizzle_integrationIntegrationFeatures }
  | { id: 'shadcn-zustand-integration'; parameters?: Shadcn_zustand_integrationIntegrationParams; features?: Shadcn_zustand_integrationIntegrationFeatures }
  | { id: 'shadcn-nextjs-integration'; parameters?: Shadcn_nextjs_integrationIntegrationParams; features?: Shadcn_nextjs_integrationIntegrationFeatures }
  | { id: 'sentry-nextjs-integration'; parameters?: Sentry_nextjs_integrationIntegrationParams; features?: Sentry_nextjs_integrationIntegrationFeatures }
  | { id: 'sentry-drizzle-nextjs-integration'; parameters?: Sentry_drizzle_nextjs_integrationIntegrationParams; features?: Sentry_drizzle_nextjs_integrationIntegrationFeatures }
  | { id: 'resend-shadcn-integration'; parameters?: Resend_shadcn_integrationIntegrationParams; features?: Resend_shadcn_integrationIntegrationFeatures }
  | { id: 'resend-nextjs-integration'; parameters?: Resend_nextjs_integrationIntegrationParams; features?: Resend_nextjs_integrationIntegrationFeatures }
  | { id: 'prisma-nextjs-integration'; parameters?: Prisma_nextjs_integrationIntegrationParams; features?: Prisma_nextjs_integrationIntegrationFeatures }
  | { id: 'drizzle-nextjs-integration'; parameters?: Drizzle_nextjs_integrationIntegrationParams; features?: Drizzle_nextjs_integrationIntegrationFeatures }
  | { id: 'docker-nextjs-integration'; parameters?: Docker_nextjs_integrationIntegrationParams; features?: Docker_nextjs_integrationIntegrationFeatures }
  | { id: 'docker-drizzle-integration'; parameters?: Docker_drizzle_integrationIntegrationParams; features?: Docker_drizzle_integrationIntegrationFeatures }
  | { id: 'better-auth-nextjs-integration'; parameters?: Better_auth_nextjs_integrationIntegrationParams; features?: Better_auth_nextjs_integrationIntegrationFeatures }
  | { id: 'better-auth-drizzle-integration'; parameters?: Better_auth_drizzle_integrationIntegrationParams; features?: Better_auth_drizzle_integrationIntegrationFeatures };

/**
 * Genome type for The Architech
 */
export interface Genome {
  version: string;
  project: {
    name: string;
    description?: string;
    version?: string;
    framework: string;
    path?: string;
  };
  modules: ModuleConfig[];
}

/**
 * Extract parameters for a specific module
 */
export type ParamsFor<T extends ModuleConfig['id']> = 
  Extract<ModuleConfig, { id: T }>['parameters'];

/**
 * Extract features for a specific module
 */
export type FeaturesFor<T extends ModuleConfig['id']> = 
  Extract<ModuleConfig, { id: T }>['features'];
