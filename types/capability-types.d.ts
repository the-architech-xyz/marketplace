/**
 * Capability-Driven Genome Types
 * 
 * Auto-generated type definitions for capability-driven genome authoring.
 * Provides strict type safety for capability IDs and their parameters.
 */

import { Genome } from '@thearchitech.xyz/types';

// Capability ID union type (for strict typing)
export type CapabilityId = 
  | 'teams-management'
  | 'monitoring'
  | 'payments'
  | 'emailing'
  | 'auth'
  | 'ai-chat';

// Framework parameter types (for project.apps[])
export interface ExpoFrameworkParams {
  typescript?: boolean;
  srcDir?: boolean;
  importAlias?: string;
  reactVersion?: string;
  expoRouter?: boolean;
  platforms?: any;
}

export interface NextjsFrameworkParams {
  typescript?: boolean;
  tailwind?: boolean;
  eslint?: boolean;
  appRouter?: boolean;
  srcDir?: boolean;
  importAlias?: string;
  reactVersion?: string;
}

export interface ReactFrameworkParams {
  typescript?: boolean;
  srcDir?: boolean;
  importAlias?: string;
  reactVersion?: string;
}

export interface React-nativeFrameworkParams {
  typescript?: boolean;
  srcDir?: boolean;
  importAlias?: string;
  reactVersion?: string;
  platforms?: any;
}

export type FrameworkId = 'expo' | 'nextjs' | 'react' | 'react-native';

// Discriminated app type based on framework id
export type FrameworkApp =
  | { id: string; type: 'web' | 'mobile' | 'api' | 'desktop' | 'worker'; framework: 'expo'; package?: string; router?: 'app' | 'pages'; alias?: string; parameters?: ExpoFrameworkParams; }
  | { id: string; type: 'web' | 'mobile' | 'api' | 'desktop' | 'worker'; framework: 'nextjs'; package?: string; router?: 'app' | 'pages'; alias?: string; parameters?: NextjsFrameworkParams; }
  | { id: string; type: 'web' | 'mobile' | 'api' | 'desktop' | 'worker'; framework: 'react'; package?: string; router?: 'app' | 'pages'; alias?: string; parameters?: ReactFrameworkParams; }
  | { id: string; type: 'web' | 'mobile' | 'api' | 'desktop' | 'worker'; framework: 'react-native'; package?: string; router?: 'app' | 'pages'; alias?: string; parameters?: React-nativeFrameworkParams; };

// Generated capability schema
export interface CapabilitySchema {
  'teams-management': {
    frontend?: {
      features: {
    core?: boolean;
    teams?: boolean;
    members?: boolean;
    invitations?: boolean;
    roles?: boolean;
    billing?: boolean;
    analytics?: boolean;
    advanced?: boolean;
  };
    };
    techStack?: {
  featureName?: string;
  featurePath?: string;
  hasTypes?: boolean;
  hasSchemas?: boolean;
  hasHooks?: boolean;
  hasStores?: boolean;
  hasApiRoutes?: boolean;
  hasValidation?: boolean;
  };
  };
  monitoring: {
    techStack?: {
  featureName?: string;
  featurePath?: string;
  hasTypes?: boolean;
  hasSchemas?: boolean;
  hasHooks?: boolean;
  hasStores?: boolean;
  hasApiRoutes?: boolean;
  hasValidation?: boolean;
  };
  };
  payments: {
    provider: 'stripe' | 'custom';
    adapter: {
  currency?: any;
  mode?: any;
  webhooks?: boolean;
  dashboard?: boolean;
  };
    frontend?: {
      features: {
    core?: boolean;
    checkout?: boolean;
    subscriptions?: boolean;
    invoices?: boolean;
    paymentMethods?: boolean;
    billingPortal?: boolean;
    invoicing?: boolean;
    webhooks?: boolean;
    analytics?: boolean;
  };
    };
    techStack?: {
  featureName?: string;
  featurePath?: string;
  hasTypes?: boolean;
  hasSchemas?: boolean;
  hasHooks?: boolean;
  hasStores?: boolean;
  hasApiRoutes?: boolean;
  hasValidation?: boolean;
  };
  };
  emailing: {
    provider: 'resend' | 'custom';
    adapter: {
  apiKey?: string;
  fromEmail?: string;
  features?: any;
  };
    frontend?: {
      features: {
    emailComposer?: boolean;
    emailList?: boolean;
    templates?: boolean;
    analytics?: boolean;
    campaigns?: boolean;
    scheduling?: boolean;
    advancedTemplates?: boolean;
  };
    };
    techStack?: {
  featureName?: string;
  featurePath?: string;
  hasTypes?: boolean;
  hasSchemas?: boolean;
  hasHooks?: boolean;
  hasStores?: boolean;
  hasApiRoutes?: boolean;
  hasValidation?: boolean;
  };
  };
  auth: {
    provider: 'better-auth' | 'custom';
    adapter: {
  emailPassword?: boolean;
  emailVerification?: boolean;
  oauthProviders?: any[];
  twoFactor?: boolean;
  organizations?: boolean;
  teams?: boolean;
  sessionExpiry?: number;
  };
    frontend?: {
      features: {
    signIn?: boolean;
    signUp?: boolean;
    passwordReset?: boolean;
    profile?: boolean;
    mfa?: boolean;
    socialLogins?: boolean;
    accountSettingsPage?: boolean;
    profileManagement?: boolean;
    twoFactor?: boolean;
    organizationManagement?: boolean;
  };
    };
    techStack?: {
  featureName?: string;
  featurePath?: string;
  hasTypes?: boolean;
  hasSchemas?: boolean;
  hasHooks?: boolean;
  hasStores?: boolean;
  hasApiRoutes?: boolean;
  hasValidation?: boolean;
  };
  };
  'ai-chat': {
    frontend?: {
      features: {
    core?: any;
    context?: any;
    media?: any;
    voice?: any;
    history?: any;
    input?: any;
    toolbar?: any;
    settings?: any;
    prompts?: any;
    export?: any;
    analytics?: any;
    projects?: any;
    middleware?: any;
    services?: any;
    completion?: any;
  };
    };
  };
}

// Provider-discriminated adapter unions per capability
export interface Payments_stripeAdapterParams {
  currency?: any;
  mode?: any;
  webhooks?: boolean;
  dashboard?: boolean;
}

export interface Emailing_resendAdapterParams {
  apiKey?: string;
  fromEmail?: string;
}

export interface Auth_betterAuthAdapterParams {
  emailPassword?: boolean;
  emailVerification?: boolean;
  oauthProviders?: any[];
  twoFactor?: boolean;
  organizations?: boolean;
  teams?: boolean;
  sessionExpiry?: number;
}
export type CapabilityAdapterUnion = {
  'teams-management':
  | { provider: 'custom'; adapter: Record<string, unknown> };
  'monitoring':
  | { provider: 'custom'; adapter: Record<string, unknown> };
  'payments':
  | { provider: 'stripe'; adapter: Payments_stripeAdapterParams }
  | { provider: 'custom'; adapter: Record<string, unknown> };
  'emailing':
  | { provider: 'resend'; adapter: Emailing_resendAdapterParams }
  | { provider: 'custom'; adapter: Record<string, unknown> };
  'auth':
  | { provider: 'better-auth'; adapter: Auth_betterAuthAdapterParams }
  | { provider: 'custom'; adapter: Record<string, unknown> };
  'ai-chat':
  | { provider: 'custom'; adapter: Record<string, unknown> };
};

// Capability-driven genome interface with strict typing
export interface CapabilityGenome {
  version: string;
  project: {
    name: string;
    description?: string;
    path?: string;
    structure?: 'monorepo' | 'single-app';
    // Multiple apps instead of single framework
    apps: FrameworkApp[];
    monorepo?: {
      tool: 'turborepo' | 'nx' | 'pnpm' | 'yarn';
      packages?: {
        api?: string;
        web?: string;
        mobile?: string;
        shared?: string;
        ui?: string;
        [key: string]: string | undefined;
      };
    };
  };
  // Strict typing: capability schema with provider-discriminated adapter typing
  capabilities: {
    [K in CapabilityId]?: Omit<CapabilitySchema[K], 'adapter' | 'provider'> & CapabilityAdapterUnion[K];
  };
  // Legacy support
  modules?: any[];
}

// Type-safe defineGenome function for capabilities
// Enforces strict capability ID and parameter typing
export declare function defineCapabilityGenome<T extends CapabilityGenome>(genome: T): T;

// Re-export for convenience
export type { Genome } from '@thearchitech.xyz/types';
