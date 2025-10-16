/**
 * Marketplace-Generated Genome Types
 * 
 * Auto-generated type definitions for type-safe genome authoring.
 */

import { Genome } from '@thearchitech.xyz/types';

// Generated ModuleId union type
export type ModuleId = 
  | 'ai/vercel-ai-sdk'
  | 'auth/better-auth'
  | 'blockchain/web3'
  | 'content/next-intl'
  | 'core/dependencies'
  | 'core/forms'
  | 'core/git'
  | 'data-fetching/tanstack-query'
  | 'database/drizzle'
  | 'database/prisma'
  | 'database/sequelize'
  | 'database/typeorm'
  | 'deployment/docker'
  | 'deployment/vercel'
  | 'email/resend'
  | 'framework/nextjs'
  | 'observability/sentry'
  | 'payment/stripe'
  | 'quality/eslint'
  | 'quality/prettier'
  | 'services/github-api'
  | 'state/zustand'
  | 'testing/vitest'
  | 'ui/shadcn-ui'
  | 'ui/tailwind'
  | 'connectors/better-auth-github'
  | 'connectors/docker-drizzle'
  | 'connectors/docker-nextjs'
  | 'connectors/rhf-zod-shadcn'
  | 'connectors/sentry/nextjs'
  | 'connectors/sentry/react'
  | 'connectors/sentry-nextjs'
  | 'connectors/stripe/nextjs-drizzle'
  | 'connectors/tanstack-query-nextjs'
  | 'connectors/vitest-nextjs'
  | 'connectors/zustand-nextjs'
  | 'features/ai-chat/backend/vercel-ai-nextjs'
  | 'features/ai-chat/frontend/shadcn'
  | 'features/ai-chat/tech-stack'
  | 'features/architech-welcome/shadcn'
  | 'features/auth/backend/better-auth-nextjs'
  | 'features/auth/frontend/shadcn'
  | 'features/auth/tech-stack'
  | 'features/emailing/backend/resend-nextjs'
  | 'features/emailing/frontend/shadcn'
  | 'features/emailing/tech-stack'
  | 'features/monitoring/shadcn'
  | 'features/monitoring/tech-stack'
  | 'features/payments/backend/stripe-nextjs'
  | 'features/payments/frontend/shadcn'
  | 'features/payments/tech-stack'
  | 'features/teams-management/backend/better-auth-nextjs'
  | 'features/teams-management/frontend/shadcn'
  | 'features/teams-management/tech-stack'
  | 'features/web3/shadcn';

export type ModuleParameters = {
  'ai/vercel-ai-sdk': {

  /** AI providers to include */
  providers?: string[];
  /** Constitutional Architecture features configuration */
  features?: {

    /** Essential AI functionality (chat, text generation) */
    core?: boolean;

    /** Real-time streaming responses */
    streaming?: boolean;

    /** Function calling and tool use */
    tools?: boolean;

    /** Text embeddings functionality */
    embeddings?: boolean;

    /** Advanced AI features (image generation, embeddings, function calling) */
    advanced?: boolean;

    /** Enterprise features (caching, edge runtime, tool use) */
    enterprise?: boolean;
  };

  /** Default AI model */
  defaultModel?: 'gpt-3.5-turbo' | 'gpt-4' | 'gpt-4-turbo' | 'claude-3-sonnet' | 'claude-3-opus';

  /** Maximum tokens for generation */
  maxTokens?: number;

  /** Temperature for generation */
  temperature?: number;
  };
  'auth/better-auth': {

  /** Authentication providers to enable */
  providers?: string[];

  /** Session management strategy */
  session?: any;

  /** Enable CSRF protection */
  csrf?: boolean;

  /** Enable rate limiting */
  rateLimit?: boolean;
  };
  'blockchain/web3': {

  /** Supported blockchain networks */
  networks?: string[];

  /** Enable WalletConnect support */
  walletConnect?: boolean;

  /** Smart contract addresses */
  contracts?: string[];
  /** Constitutional Architecture features configuration */
  features?: {

    /** Enable wallet connection */
    walletConnect?: boolean;

    /** Enable smart contract interactions */
    smartContracts?: boolean;

    /** Enable transaction management */
    transactions?: boolean;

    /** Enable blockchain event listening */
    events?: boolean;

    /** Enable ENS name resolution */
    ens?: boolean;

    /** Enable NFT functionality */
    nft?: boolean;
  };
  };
  'content/next-intl': {

  /** Supported locales */
  locales?: string[];

  /** Default locale */
  defaultLocale?: string;

  /** Enable locale-based routing */
  routing?: boolean;

  /** Enable SEO optimization */
  seo?: boolean;
  /** Constitutional Architecture features configuration */
  features?: {

    /** Enable locale-based routing */
    routing?: boolean;

    /** Enable date formatting features */
    dateFormatting?: boolean;

    /** Enable number formatting features */
    numberFormatting?: boolean;
  };
  };
  'core/forms': {

  /** Enable Zod for schema validation */
  zod?: boolean;

  /** Enable React Hook Form for form handling */
  reactHookForm?: boolean;

  /** Enable @hookform/resolvers for Zod integration */
  resolvers?: boolean;

  /** Enable accessibility features */
  accessibility?: boolean;

  /** Enable React Hook Form DevTools */
  devtools?: boolean;

  /** Enable advanced validation features */
  advancedValidation?: boolean;
  };
  'core/git': {

  /** Git user name for commits */
  userName?: string;

  /** Git user email for commits */
  userEmail?: string;

  /** Default branch name for new repositories */
  defaultBranch?: string;

  /** Automatically initialize git repository after project creation */
  autoInit?: boolean;
  };
  'data-fetching/tanstack-query': {

  /** Enable TanStack Query DevTools */
  devtools?: boolean;

  /** Default query and mutation options */
  defaultOptions?: Record<string, any>;

  /** Enable Suspense mode for queries */
  suspense?: boolean;
  /** Constitutional Architecture features configuration */
  features?: {

    /** Basic query and mutation functionality */
    core?: boolean;

    /** Infinite scrolling and pagination support */
    infinite?: boolean;

    /** Optimistic UI updates for better UX */
    optimistic?: boolean;

    /** Offline-first data synchronization */
    offline?: boolean;
  };
  };
  'database/drizzle': {

  /** Database provider */
  provider?: 'neon' | 'planetscale' | 'supabase' | 'local';

  /** Database type to use */
  databaseType?: 'postgresql' | 'mysql' | 'sqlite';
  /** Constitutional Architecture features configuration */
  features?: {

    /** Essential database functionality (schema, queries, types) */
    core?: boolean;

    /** Database schema migrations and versioning */
    migrations?: boolean;

    /** Visual database browser and query interface */
    studio?: boolean;

    /** Advanced relationship management and queries */
    relations?: boolean;

    /** Data seeding and fixtures management */
    seeding?: boolean;
  };
  };
  'database/prisma': {

  /** Database provider */
  provider?: 'postgresql' | 'mysql' | 'sqlite' | 'mongodb';

  /** Enable Prisma Studio */
  studio?: boolean;

  /** Enable database migrations */
  migrations?: boolean;

  /** Database type */
  databaseType?: 'postgresql' | 'mysql' | 'sqlite' | 'mongodb';
  };
  'database/sequelize': {

  /** Database host */
  host?: string;

  /** Database port */
  port?: number;

  /** Database username */
  username?: string;

  /** Database password */
  password?: string;

  /** Database name */
  databaseName?: string;

  /** Enable SQL logging */
  logging?: boolean;

  /** Enable connection pooling */
  pool?: boolean;

  /** Database type */
  databaseType?: 'postgresql' | 'mysql' | 'sqlite' | 'mariadb' | 'mssql';
  };
  'database/typeorm': {

  /** Enable schema synchronization */
  synchronize?: boolean;

  /** Enable query logging */
  logging?: boolean;

  /** Database type */
  databaseType?: 'postgresql' | 'mysql' | 'sqlite' | 'mongodb';
  };
  'deployment/docker': {

  /** Node.js version for Docker image */
  nodeVersion?: string;

  /** Enable production optimizations */
  optimization?: boolean;

  /** Enable health check endpoint */
  healthCheck?: boolean;
  /** Constitutional Architecture features configuration */
  features?: {

    /** Enable development environment */
    development?: boolean;

    /** Enable production environment */
    production?: boolean;

    /** Enable docker-compose setup */
    compose?: boolean;
  };
  };
  'deployment/vercel': {

  /** Target framework */
  framework?: 'nextjs' | 'react' | 'vue' | 'svelte' | 'angular';

  /** Build command to run */
  buildCommand?: string;

  /** Output directory for build */
  outputDirectory?: string;

  /** Install command */
  installCommand?: string;

  /** Development command */
  devCommand?: string;

  /** Environment variables to configure */
  envVars?: string[];

  /** Serverless function configuration */
  functions: Record<string, any>;

  /** Enable Vercel Analytics */
  analytics?: boolean;

  /** Enable Vercel Speed Insights */
  speedInsights?: boolean;
  };
  'email/resend': {

  /** Resend API key */
  apiKey?: string;

  /** Default from email address */
  fromEmail?: string;
  /** Constitutional Architecture features configuration */
  features?: {

    /** Essential email functionality (sending, basic templates) */
    core?: boolean;

    /** Advanced email template system */
    templates?: boolean;

    /** Email analytics and tracking */
    analytics?: boolean;

    /** Batch sending and campaign management */
    campaigns?: boolean;
  };
  };
  'framework/nextjs': {

  /** Enable TypeScript support */
  typescript?: boolean;

  /** Enable Tailwind CSS */
  tailwind?: boolean;

  /** Enable ESLint */
  eslint?: boolean;

  /** Use App Router (recommended) */
  appRouter?: boolean;

  /** Use src/ directory */
  srcDir?: boolean;

  /** Import alias for absolute imports */
  importAlias?: string;

  /** React version to use (18 for Radix UI compatibility, 19 for latest, or specify exact version like '18.2.0') */
  reactVersion?: string;
  /** Constitutional Architecture features configuration */
  features?: {

    /** Enable SEO optimization features */
    seo?: boolean;

    /** Enable Next.js image optimization */
    imageOptimization?: boolean;

    /** Enable MDX support for markdown content */
    mdx?: boolean;

    /** Enable performance optimization features */
    performance?: boolean;

    /** Enable streaming features */
    streaming?: boolean;

    /** Enable internationalization features */
    i18n?: boolean;
  };
  };
  'observability/sentry': {

  /** Sentry DSN */
  dsn?: string;

  /** Environment name */
  environment?: string;
  /** Constitutional Architecture features configuration */
  features?: {

    /** Essential monitoring (error tracking, basic performance) */
    core?: boolean;

    /** Error tracking and reporting */
    errorTracking?: boolean;

    /** Advanced performance monitoring */
    performance?: boolean;

    /** Custom alerts and dashboard */
    alerts?: boolean;

    /** Enterprise features (profiling, custom metrics) */
    enterprise?: boolean;

    /** Session replay for debugging */
    replay?: boolean;
  };

  /** Release version */
  release?: string;
  };
  'payment/stripe': {

  /** Default currency for payments */
  currency?: any;

  /** Stripe mode (test or live) */
  mode?: any;

  /** Enable webhook handling */
  webhooks?: boolean;

  /** Enable Stripe Dashboard integration */
  dashboard?: boolean;
  };
  'quality/eslint': {

  /** Enable TypeScript support */
  typescript?: boolean;

  /** Enable React support */
  react?: boolean;

  /** Enable Next.js specific rules */
  nextjs?: boolean;

  /** Enable Node.js specific rules */
  nodejs?: boolean;

  /** Enable accessibility rules */
  accessibility?: boolean;

  /** Enable import/export rules */
  imports?: boolean;

  /** Enable strict mode rules */
  strict?: boolean;

  /** Enable formatting rules */
  format?: boolean;
  };
  'quality/prettier': {

  /** Add semicolons at the end of statements */
  semi?: boolean;

  /** Use single quotes instead of double quotes */
  singleQuote?: boolean;

  /** Number of spaces per indentation level */
  tabWidth?: number;

  /** Use tabs instead of spaces for indentation */
  useTabs?: boolean;

  /** Print trailing commas where valid in ES5 */
  trailingComma?: 'none' | 'es5' | 'all';

  /** Wrap lines that exceed this length */
  printWidth?: number;

  /** Print spaces between brackets in object literals */
  bracketSpacing?: boolean;

  /** Include parentheses around a sole arrow function parameter */
  arrowParens?: 'avoid' | 'always';

  /** Line ending style */
  endOfLine?: 'lf' | 'crlf' | 'cr' | 'auto';

  /** Prettier plugins to use */
  plugins?: string[];

  /** Enable Tailwind CSS class sorting plugin */
  tailwind?: boolean;

  /** Enable import organization */
  organizeImports?: boolean;
  };
  'services/github-api': {

  /** GitHub Personal Access Token or OAuth access token */
  token: string;

  /** GitHub API base URL (for GitHub Enterprise) */
  baseUrl?: string;

  /** User agent string for API requests */
  userAgent?: string;
  };
  'state/zustand': {

  /** Enable state persistence */
  persistence?: boolean;

  /** Enable Redux DevTools */
  devtools?: boolean;

  /** Enable Immer for immutable updates */
  immer?: boolean;

  /** Middleware to use */
  middleware?: string[];
  };
  'testing/vitest': {

  /** Test environment */
  environment?: 'jsdom' | 'node' | 'happy-dom';
  /** Constitutional Architecture features configuration */
  features?: {

    /** Basic testing setup (config, setup, utils) */
    core?: boolean;

    /** Unit testing capabilities */
    unitTests?: boolean;

    /** Code coverage reporting */
    coverage?: boolean;

    /** Interactive test runner UI */
    ui?: boolean;

    /** End-to-end testing support */
    e2e?: boolean;

    /** Integration testing support */
    integrationTests?: boolean;
  };
  };
  'ui/shadcn-ui': {

  /** UI theme variant */
  theme?: 'default' | 'dark' | 'light' | 'minimal';

  /** Components to install (comprehensive set by default) */
  components?: Array<'alert' | 'alert-dialog' | 'accordion' | 'avatar' | 'badge' | 'button' | 'calendar' | 'card' | 'carousel' | 'checkbox' | 'collapsible' | 'context-menu' | 'dialog' | 'dropdown-menu' | 'form' | 'hover-card' | 'input' | 'label' | 'menubar' | 'navigation-menu' | 'pagination' | 'popover' | 'progress' | 'radio-group' | 'scroll-area' | 'separator' | 'sheet' | 'slider' | 'sonner' | 'switch' | 'table' | 'tabs' | 'textarea' | 'toggle' | 'toggle-group'>;
  };
  'ui/tailwind': {

  /** Enable @tailwindcss/typography plugin */
  typography?: boolean;

  /** Enable @tailwindcss/forms plugin */
  forms?: boolean;

  /** Enable @tailwindcss/aspect-ratio plugin */
  aspectRatio?: boolean;

  /** Enable dark mode support */
  darkMode?: boolean;
  };
  'connectors/better-auth-github': {

  /** GitHub OAuth App Client ID */
  clientId: string;

  /** GitHub OAuth App Client Secret */
  clientSecret: string;

  /** OAuth redirect URI */
  redirectUri: string;

  /** GitHub OAuth scopes */
  scopes?: string[];

  /** Encryption key for storing tokens securely */
  encryptionKey: string;
  };
  'connectors/rhf-zod-shadcn': {

  /** Zod schema validation */
  validation?: boolean;

  /** Form accessibility features */
  accessibility?: boolean;

  /** React Hook Form DevTools */
  devtools?: boolean;
  };
  'connectors/sentry/nextjs': {

  /** Sentry DSN */
  dsn?: string;

  /** Environment name */
  environment?: string;
  /** Constitutional Architecture features configuration */
  features?: {

    /** Essential Next.js Sentry integration */
    core?: boolean;

    /** Next.js performance monitoring */
    performance?: boolean;

    /** Next.js alerts and dashboard */
    alerts?: boolean;

    /** Next.js enterprise features */
    enterprise?: boolean;
  };

  /** Release version */
  release?: string;
  };
  'connectors/sentry/react': {

  /** Sentry DSN */
  dsn?: string;

  /** Environment name */
  environment?: string;
  /** Constitutional Architecture features configuration */
  features?: {

    /** Essential React Sentry integration */
    core?: boolean;

    /** React performance monitoring */
    performance?: boolean;

    /** React Error Boundary components */
    'error-boundary'?: boolean;
  };

  /** Release version */
  release?: string;
  };
  'connectors/stripe/nextjs-drizzle': {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Enable organization-level billing features */
    organizationBilling?: boolean;

    /** Enable seat-based billing */
    seats?: boolean;

    /** Enable usage-based billing */
    usage?: boolean;

    /** Enable Stripe webhook handling */
    webhooks?: boolean;

    /** Enable seat-based billing */
    seatManagement?: boolean;

    /** Enable usage-based billing tracking */
    usageTracking?: boolean;
  };
  };
  'connectors/tanstack-query-nextjs': {

  /** SSR support for TanStack Query */
  ssr?: boolean;

  /** Client-side hydration support */
  hydration?: boolean;

  /** Error boundary for query errors */
  errorBoundary?: boolean;

  /** TanStack Query DevTools integration */
  devtools?: boolean;
  };
  'connectors/zustand-nextjs': {

  /** State persistence support */
  persistence?: boolean;

  /** Zustand DevTools integration */
  devtools?: boolean;

  /** Server-side rendering support */
  ssr?: boolean;
  };
  'features/ai-chat/backend/vercel-ai-nextjs': {

  /** Real-time message streaming */
  streaming?: boolean;

  /** File upload capabilities */
  fileUpload?: boolean;

  /** Voice input capabilities */
  voiceInput?: boolean;

  /** Voice output capabilities */
  voiceOutput?: boolean;

  /** Chat export and import capabilities */
  exportImport?: boolean;
  };
  'features/ai-chat/frontend/shadcn': {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Essential chat interface with basic messaging */
    core?: boolean;

    /** Chat context and provider management */
    context?: boolean;

    /** File upload and media preview capabilities */
    media?: boolean;

    /** Voice input and output functionality */
    voice?: boolean;

    /** Advanced conversation history and management */
    history?: boolean;

    /** Advanced message input with features */
    input?: boolean;

    /** Chat toolbar and controls */
    toolbar?: boolean;

    /** Chat settings and configuration */
    settings?: boolean;

    /** Custom prompts and templates */
    prompts?: boolean;

    /** Chat export and import functionality */
    export?: boolean;

    /** Chat analytics and insights */
    analytics?: boolean;

    /** Project-based chat organization */
    projects?: boolean;

    /** Chat middleware and routing */
    middleware?: boolean;

    /** AI chat service utilities */
    services?: boolean;

    /** Text completion and generation */
    completion?: boolean;
  };

  /** UI theme variant */
  theme?: 'default' | 'dark' | 'light' | 'minimal';
  };
  'features/architech-welcome/shadcn': {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Show technology stack visualization */
    techStack?: boolean;

    /** Show interactive component library showcase */
    componentShowcase?: boolean;

    /** Show project structure and architecture */
    projectStructure?: boolean;

    /** Show quick start guide */
    quickStart?: boolean;

    /** Show Architech branding and links */
    architechBranding?: boolean;
  };

  /** Custom welcome page title */
  customTitle?: string;

  /** Custom welcome page description */
  customDescription?: string;

  /** Primary color theme for the welcome page */
  primaryColor?: string;

  /** Show technology stack visualization */
  showTechStack?: boolean;

  /** Show interactive component library showcase */
  showComponents?: boolean;

  /** Show project structure and architecture */
  showProjectStructure?: boolean;

  /** Show quick start guide */
  showQuickStart?: boolean;

  /** Show Architech branding and links */
  showArchitechBranding?: boolean;
  };
  'features/auth/backend/better-auth-nextjs': {

  /** Next.js API routes for authentication endpoints */
  apiRoutes?: boolean;

  /** Next.js middleware for authentication and route protection */
  middleware?: boolean;

  /** Admin API routes for user management */
  adminPanel?: boolean;

  /** Email verification API routes and components */
  emailVerification?: boolean;

  /** MFA API routes and components */
  mfa?: boolean;

  /** Password reset API routes and components */
  passwordReset?: boolean;
  /** Constitutional Architecture features configuration */
  features?: {

    /** Enable email/password authentication */
    emailPassword?: boolean;

    /** Enable email verification */
    emailVerification?: boolean;

    /** Enable password reset functionality */
    passwordReset?: boolean;

    /** Enable session management */
    sessions?: boolean;

    /** Enable organization/team management */
    organizations?: boolean;

    /** Enable two-factor authentication */
    twoFactor?: boolean;
  };
  };
  'features/auth/frontend/shadcn': {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Enable sign-in UI components */
    signIn?: boolean;

    /** Enable sign-up UI components */
    signUp?: boolean;

    /** Enables password reset functionality (forms and pages) */
    passwordReset?: boolean;

    /** Enable profile management UI components */
    profile?: boolean;

    /** Enables Multi-Factor Authentication setup and verification */
    mfa?: boolean;

    /** Enables UI for Google, GitHub, etc. logins */
    socialLogins?: boolean;

    /** Generates a full page for managing account settings */
    accountSettingsPage?: boolean;

    /** Enables advanced profile management features */
    profileManagement?: boolean;

    /** Enable two-factor authentication UI */
    twoFactor?: boolean;

    /** Enable organization management UI */
    organizationManagement?: boolean;
  };

  /** UI theme variant */
  theme?: 'default' | 'dark' | 'light' | 'minimal';
  };
  'features/emailing/backend/resend-nextjs': {

  /** Bulk email sending capabilities */
  bulkEmail?: boolean;

  /** Email template management */
  templates?: boolean;

  /** Email delivery and engagement analytics */
  analytics?: boolean;

  /** Email event webhooks */
  webhooks?: boolean;

  /** Enable organization-scoped email management */
  organizations?: boolean;

  /** Enable team-scoped email management */
  teams?: boolean;
  };
  'features/emailing/frontend/shadcn': {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Enable email composer UI */
    emailComposer?: boolean;

    /** Enable email list UI */
    emailList?: boolean;

    /** Enable email templates UI */
    templates?: boolean;

    /** Enable email analytics UI */
    analytics?: boolean;

    /** Enable email campaigns UI */
    campaigns?: boolean;

    /** Enable email scheduling UI */
    scheduling?: boolean;

    /** Enable advanced email templates UI */
    advancedTemplates?: boolean;
  };

  /** UI theme variant */
  theme?: 'default' | 'dark' | 'light' | 'minimal';
  };
  'features/monitoring/shadcn': {

  /** Backend implementation for monitoring services */
  backend?: any;

  /** Frontend implementation for monitoring UI */
  frontend?: any;
  /** Constitutional Architecture features configuration */
  features?: {

    /** Essential monitoring (error tracking, basic performance) */
    core?: boolean;

    /** Advanced performance monitoring */
    performance?: boolean;

    /** Error tracking and reporting */
    errors?: boolean;

    /** User feedback collection */
    feedback?: boolean;

    /** Monitoring analytics and reporting */
    analytics?: boolean;
  };

  /** Environments to monitor */
  environments?: string[];
  };
  'features/payments/backend/stripe-nextjs': {

  /** Stripe webhook handlers for payment events */
  webhooks?: boolean;

  /** Stripe Checkout integration for payments */
  checkout?: boolean;

  /** Subscription management and billing */
  subscriptions?: boolean;

  /** Invoice generation and management */
  invoices?: boolean;

  /** Refund processing and management */
  refunds?: boolean;

  /** Payment methods management */
  paymentMethods?: boolean;

  /** Payment analytics and reporting */
  analytics?: boolean;

  /** Organization-level billing features */
  organizationBilling?: boolean;
  };
  'features/payments/frontend/shadcn': {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Essential payment functionality (forms, checkout, transactions) */
    core?: boolean;

    /** Enable checkout UI components */
    checkout?: boolean;

    /** Subscription management and billing */
    subscriptions?: boolean;

    /** Invoice generation and management */
    invoices?: boolean;

    /** Payment methods management UI */
    paymentMethods?: boolean;

    /** Billing portal UI */
    billingPortal?: boolean;

    /** Invoice generation and management */
    invoicing?: boolean;

    /** Payment webhook handling */
    webhooks?: boolean;

    /** Payment analytics and reporting */
    analytics?: boolean;
  };

  /** UI theme variant */
  theme?: 'default' | 'dark' | 'light' | 'minimal';
  };
  'features/teams-management/backend/better-auth-nextjs': {

  /** Team invitation system */
  invites?: boolean;

  /** Granular role-based permissions */
  permissions?: boolean;

  /** Team performance analytics */
  analytics?: boolean;

  /** Team billing and subscription management */
  billing?: boolean;
  /** Constitutional Architecture features configuration */
  features?: {

    /** Enable team management */
    teams?: boolean;

    /** Enable team invitations */
    invitations?: boolean;

    /** Enable role-based access control */
    roles?: boolean;

    /** Enable granular permissions */
    permissions?: boolean;
  };
  };
  'features/teams-management/frontend/shadcn': {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Basic team management (list, creation, member management) */
    core?: boolean;

    /** Enable team management UI */
    teams?: boolean;

    /** Enable member management UI */
    members?: boolean;

    /** Enable team invitations UI */
    invitations?: boolean;

    /** Enable role management UI */
    roles?: boolean;

    /** Team billing and usage tracking */
    billing?: boolean;

    /** Team analytics and reporting */
    analytics?: boolean;

    /** Advanced team features (settings, permissions, dashboard) */
    advanced?: boolean;
  };

  /** UI theme variant */
  theme?: 'default' | 'dark' | 'light' | 'minimal';
  };
  'features/web3/shadcn': {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Enable wallet connection UI */
    walletConnect?: boolean;

    /** Enable network switching UI */
    networkSwitch?: boolean;

    /** Enable transaction history UI */
    transactionHistory?: boolean;

    /** Enable token balances UI */
    tokenBalances?: boolean;

    /** Enable NFT gallery UI */
    nftGallery?: boolean;

    /** Enable wallet connection UI */
    walletConnection?: boolean;

    /** Enable DeFi integration UI */
    defiIntegration?: boolean;

    /** Enable staking interface UI */
    stakingInterface?: boolean;
  };

  /** UI theme variant */
  theme?: string;
  };
};

// Discriminated union for better IDE support
export type TypedGenomeModule = 
  | { id: 'ai/vercel-ai-sdk'; parameters?: {

  /** AI providers to include */
  providers?: string[];
  /** Constitutional Architecture features configuration */
  features?: {

    /** Essential AI functionality (chat, text generation) */
    core?: boolean;

    /** Real-time streaming responses */
    streaming?: boolean;

    /** Function calling and tool use */
    tools?: boolean;

    /** Text embeddings functionality */
    embeddings?: boolean;

    /** Advanced AI features (image generation, embeddings, function calling) */
    advanced?: boolean;

    /** Enterprise features (caching, edge runtime, tool use) */
    enterprise?: boolean;
  };

  /** Default AI model */
  defaultModel?: 'gpt-3.5-turbo' | 'gpt-4' | 'gpt-4-turbo' | 'claude-3-sonnet' | 'claude-3-opus';

  /** Maximum tokens for generation */
  maxTokens?: number;

  /** Temperature for generation */
  temperature?: number;
  }; }
  | { id: 'auth/better-auth'; parameters?: {

  /** Authentication providers to enable */
  providers?: string[];

  /** Session management strategy */
  session?: any;

  /** Enable CSRF protection */
  csrf?: boolean;

  /** Enable rate limiting */
  rateLimit?: boolean;
  }; }
  | { id: 'blockchain/web3'; parameters?: {

  /** Supported blockchain networks */
  networks?: string[];

  /** Enable WalletConnect support */
  walletConnect?: boolean;

  /** Smart contract addresses */
  contracts?: string[];
  /** Constitutional Architecture features configuration */
  features?: {

    /** Enable wallet connection */
    walletConnect?: boolean;

    /** Enable smart contract interactions */
    smartContracts?: boolean;

    /** Enable transaction management */
    transactions?: boolean;

    /** Enable blockchain event listening */
    events?: boolean;

    /** Enable ENS name resolution */
    ens?: boolean;

    /** Enable NFT functionality */
    nft?: boolean;
  };
  }; }
  | { id: 'content/next-intl'; parameters?: {

  /** Supported locales */
  locales?: string[];

  /** Default locale */
  defaultLocale?: string;

  /** Enable locale-based routing */
  routing?: boolean;

  /** Enable SEO optimization */
  seo?: boolean;
  /** Constitutional Architecture features configuration */
  features?: {

    /** Enable locale-based routing */
    routing?: boolean;

    /** Enable date formatting features */
    dateFormatting?: boolean;

    /** Enable number formatting features */
    numberFormatting?: boolean;
  };
  }; }
  | { id: 'core/forms'; parameters?: {

  /** Enable Zod for schema validation */
  zod?: boolean;

  /** Enable React Hook Form for form handling */
  reactHookForm?: boolean;

  /** Enable @hookform/resolvers for Zod integration */
  resolvers?: boolean;

  /** Enable accessibility features */
  accessibility?: boolean;

  /** Enable React Hook Form DevTools */
  devtools?: boolean;

  /** Enable advanced validation features */
  advancedValidation?: boolean;
  }; }
  | { id: 'core/git'; parameters?: {

  /** Git user name for commits */
  userName?: string;

  /** Git user email for commits */
  userEmail?: string;

  /** Default branch name for new repositories */
  defaultBranch?: string;

  /** Automatically initialize git repository after project creation */
  autoInit?: boolean;
  }; }
  | { id: 'data-fetching/tanstack-query'; parameters?: {

  /** Enable TanStack Query DevTools */
  devtools?: boolean;

  /** Default query and mutation options */
  defaultOptions?: Record<string, any>;

  /** Enable Suspense mode for queries */
  suspense?: boolean;
  /** Constitutional Architecture features configuration */
  features?: {

    /** Basic query and mutation functionality */
    core?: boolean;

    /** Infinite scrolling and pagination support */
    infinite?: boolean;

    /** Optimistic UI updates for better UX */
    optimistic?: boolean;

    /** Offline-first data synchronization */
    offline?: boolean;
  };
  }; }
  | { id: 'database/drizzle'; parameters?: {

  /** Database provider */
  provider?: 'neon' | 'planetscale' | 'supabase' | 'local';

  /** Database type to use */
  databaseType?: 'postgresql' | 'mysql' | 'sqlite';
  /** Constitutional Architecture features configuration */
  features?: {

    /** Essential database functionality (schema, queries, types) */
    core?: boolean;

    /** Database schema migrations and versioning */
    migrations?: boolean;

    /** Visual database browser and query interface */
    studio?: boolean;

    /** Advanced relationship management and queries */
    relations?: boolean;

    /** Data seeding and fixtures management */
    seeding?: boolean;
  };
  }; }
  | { id: 'database/prisma'; parameters?: {

  /** Database provider */
  provider?: 'postgresql' | 'mysql' | 'sqlite' | 'mongodb';

  /** Enable Prisma Studio */
  studio?: boolean;

  /** Enable database migrations */
  migrations?: boolean;

  /** Database type */
  databaseType?: 'postgresql' | 'mysql' | 'sqlite' | 'mongodb';
  }; }
  | { id: 'database/sequelize'; parameters?: {

  /** Database host */
  host?: string;

  /** Database port */
  port?: number;

  /** Database username */
  username?: string;

  /** Database password */
  password?: string;

  /** Database name */
  databaseName?: string;

  /** Enable SQL logging */
  logging?: boolean;

  /** Enable connection pooling */
  pool?: boolean;

  /** Database type */
  databaseType?: 'postgresql' | 'mysql' | 'sqlite' | 'mariadb' | 'mssql';
  }; }
  | { id: 'database/typeorm'; parameters?: {

  /** Enable schema synchronization */
  synchronize?: boolean;

  /** Enable query logging */
  logging?: boolean;

  /** Database type */
  databaseType?: 'postgresql' | 'mysql' | 'sqlite' | 'mongodb';
  }; }
  | { id: 'deployment/docker'; parameters?: {

  /** Node.js version for Docker image */
  nodeVersion?: string;

  /** Enable production optimizations */
  optimization?: boolean;

  /** Enable health check endpoint */
  healthCheck?: boolean;
  /** Constitutional Architecture features configuration */
  features?: {

    /** Enable development environment */
    development?: boolean;

    /** Enable production environment */
    production?: boolean;

    /** Enable docker-compose setup */
    compose?: boolean;
  };
  }; }
  | { id: 'deployment/vercel'; parameters?: {

  /** Target framework */
  framework?: 'nextjs' | 'react' | 'vue' | 'svelte' | 'angular';

  /** Build command to run */
  buildCommand?: string;

  /** Output directory for build */
  outputDirectory?: string;

  /** Install command */
  installCommand?: string;

  /** Development command */
  devCommand?: string;

  /** Environment variables to configure */
  envVars?: string[];

  /** Serverless function configuration */
  functions: Record<string, any>;

  /** Enable Vercel Analytics */
  analytics?: boolean;

  /** Enable Vercel Speed Insights */
  speedInsights?: boolean;
  }; }
  | { id: 'email/resend'; parameters?: {

  /** Resend API key */
  apiKey?: string;

  /** Default from email address */
  fromEmail?: string;
  /** Constitutional Architecture features configuration */
  features?: {

    /** Essential email functionality (sending, basic templates) */
    core?: boolean;

    /** Advanced email template system */
    templates?: boolean;

    /** Email analytics and tracking */
    analytics?: boolean;

    /** Batch sending and campaign management */
    campaigns?: boolean;
  };
  }; }
  | { id: 'framework/nextjs'; parameters?: {

  /** Enable TypeScript support */
  typescript?: boolean;

  /** Enable Tailwind CSS */
  tailwind?: boolean;

  /** Enable ESLint */
  eslint?: boolean;

  /** Use App Router (recommended) */
  appRouter?: boolean;

  /** Use src/ directory */
  srcDir?: boolean;

  /** Import alias for absolute imports */
  importAlias?: string;

  /** React version to use (18 for Radix UI compatibility, 19 for latest, or specify exact version like '18.2.0') */
  reactVersion?: string;
  /** Constitutional Architecture features configuration */
  features?: {

    /** Enable SEO optimization features */
    seo?: boolean;

    /** Enable Next.js image optimization */
    imageOptimization?: boolean;

    /** Enable MDX support for markdown content */
    mdx?: boolean;

    /** Enable performance optimization features */
    performance?: boolean;

    /** Enable streaming features */
    streaming?: boolean;

    /** Enable internationalization features */
    i18n?: boolean;
  };
  }; }
  | { id: 'observability/sentry'; parameters?: {

  /** Sentry DSN */
  dsn?: string;

  /** Environment name */
  environment?: string;
  /** Constitutional Architecture features configuration */
  features?: {

    /** Essential monitoring (error tracking, basic performance) */
    core?: boolean;

    /** Error tracking and reporting */
    errorTracking?: boolean;

    /** Advanced performance monitoring */
    performance?: boolean;

    /** Custom alerts and dashboard */
    alerts?: boolean;

    /** Enterprise features (profiling, custom metrics) */
    enterprise?: boolean;

    /** Session replay for debugging */
    replay?: boolean;
  };

  /** Release version */
  release?: string;
  }; }
  | { id: 'payment/stripe'; parameters?: {

  /** Default currency for payments */
  currency?: any;

  /** Stripe mode (test or live) */
  mode?: any;

  /** Enable webhook handling */
  webhooks?: boolean;

  /** Enable Stripe Dashboard integration */
  dashboard?: boolean;
  }; }
  | { id: 'quality/eslint'; parameters?: {

  /** Enable TypeScript support */
  typescript?: boolean;

  /** Enable React support */
  react?: boolean;

  /** Enable Next.js specific rules */
  nextjs?: boolean;

  /** Enable Node.js specific rules */
  nodejs?: boolean;

  /** Enable accessibility rules */
  accessibility?: boolean;

  /** Enable import/export rules */
  imports?: boolean;

  /** Enable strict mode rules */
  strict?: boolean;

  /** Enable formatting rules */
  format?: boolean;
  }; }
  | { id: 'quality/prettier'; parameters?: {

  /** Add semicolons at the end of statements */
  semi?: boolean;

  /** Use single quotes instead of double quotes */
  singleQuote?: boolean;

  /** Number of spaces per indentation level */
  tabWidth?: number;

  /** Use tabs instead of spaces for indentation */
  useTabs?: boolean;

  /** Print trailing commas where valid in ES5 */
  trailingComma?: 'none' | 'es5' | 'all';

  /** Wrap lines that exceed this length */
  printWidth?: number;

  /** Print spaces between brackets in object literals */
  bracketSpacing?: boolean;

  /** Include parentheses around a sole arrow function parameter */
  arrowParens?: 'avoid' | 'always';

  /** Line ending style */
  endOfLine?: 'lf' | 'crlf' | 'cr' | 'auto';

  /** Prettier plugins to use */
  plugins?: string[];

  /** Enable Tailwind CSS class sorting plugin */
  tailwind?: boolean;

  /** Enable import organization */
  organizeImports?: boolean;
  }; }
  | { id: 'services/github-api'; parameters?: {

  /** GitHub Personal Access Token or OAuth access token */
  token: string;

  /** GitHub API base URL (for GitHub Enterprise) */
  baseUrl?: string;

  /** User agent string for API requests */
  userAgent?: string;
  }; }
  | { id: 'state/zustand'; parameters?: {

  /** Enable state persistence */
  persistence?: boolean;

  /** Enable Redux DevTools */
  devtools?: boolean;

  /** Enable Immer for immutable updates */
  immer?: boolean;

  /** Middleware to use */
  middleware?: string[];
  }; }
  | { id: 'testing/vitest'; parameters?: {

  /** Test environment */
  environment?: 'jsdom' | 'node' | 'happy-dom';
  /** Constitutional Architecture features configuration */
  features?: {

    /** Basic testing setup (config, setup, utils) */
    core?: boolean;

    /** Unit testing capabilities */
    unitTests?: boolean;

    /** Code coverage reporting */
    coverage?: boolean;

    /** Interactive test runner UI */
    ui?: boolean;

    /** End-to-end testing support */
    e2e?: boolean;

    /** Integration testing support */
    integrationTests?: boolean;
  };
  }; }
  | { id: 'ui/shadcn-ui'; parameters?: {

  /** UI theme variant */
  theme?: 'default' | 'dark' | 'light' | 'minimal';

  /** Components to install (comprehensive set by default) */
  components?: Array<'alert' | 'alert-dialog' | 'accordion' | 'avatar' | 'badge' | 'button' | 'calendar' | 'card' | 'carousel' | 'checkbox' | 'collapsible' | 'context-menu' | 'dialog' | 'dropdown-menu' | 'form' | 'hover-card' | 'input' | 'label' | 'menubar' | 'navigation-menu' | 'pagination' | 'popover' | 'progress' | 'radio-group' | 'scroll-area' | 'separator' | 'sheet' | 'slider' | 'sonner' | 'switch' | 'table' | 'tabs' | 'textarea' | 'toggle' | 'toggle-group'>;
  }; }
  | { id: 'ui/tailwind'; parameters?: {

  /** Enable @tailwindcss/typography plugin */
  typography?: boolean;

  /** Enable @tailwindcss/forms plugin */
  forms?: boolean;

  /** Enable @tailwindcss/aspect-ratio plugin */
  aspectRatio?: boolean;

  /** Enable dark mode support */
  darkMode?: boolean;
  }; }
  | { id: 'connectors/better-auth-github'; parameters?: {

  /** GitHub OAuth App Client ID */
  clientId: string;

  /** GitHub OAuth App Client Secret */
  clientSecret: string;

  /** OAuth redirect URI */
  redirectUri: string;

  /** GitHub OAuth scopes */
  scopes?: string[];

  /** Encryption key for storing tokens securely */
  encryptionKey: string;
  }; }
  | { id: 'connectors/rhf-zod-shadcn'; parameters?: {

  /** Zod schema validation */
  validation?: boolean;

  /** Form accessibility features */
  accessibility?: boolean;

  /** React Hook Form DevTools */
  devtools?: boolean;
  }; }
  | { id: 'connectors/sentry/nextjs'; parameters?: {

  /** Sentry DSN */
  dsn?: string;

  /** Environment name */
  environment?: string;
  /** Constitutional Architecture features configuration */
  features?: {

    /** Essential Next.js Sentry integration */
    core?: boolean;

    /** Next.js performance monitoring */
    performance?: boolean;

    /** Next.js alerts and dashboard */
    alerts?: boolean;

    /** Next.js enterprise features */
    enterprise?: boolean;
  };

  /** Release version */
  release?: string;
  }; }
  | { id: 'connectors/sentry/react'; parameters?: {

  /** Sentry DSN */
  dsn?: string;

  /** Environment name */
  environment?: string;
  /** Constitutional Architecture features configuration */
  features?: {

    /** Essential React Sentry integration */
    core?: boolean;

    /** React performance monitoring */
    performance?: boolean;

    /** React Error Boundary components */
    'error-boundary'?: boolean;
  };

  /** Release version */
  release?: string;
  }; }
  | { id: 'connectors/stripe/nextjs-drizzle'; parameters?: {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Enable organization-level billing features */
    organizationBilling?: boolean;

    /** Enable seat-based billing */
    seats?: boolean;

    /** Enable usage-based billing */
    usage?: boolean;

    /** Enable Stripe webhook handling */
    webhooks?: boolean;

    /** Enable seat-based billing */
    seatManagement?: boolean;

    /** Enable usage-based billing tracking */
    usageTracking?: boolean;
  };
  }; }
  | { id: 'connectors/tanstack-query-nextjs'; parameters?: {

  /** SSR support for TanStack Query */
  ssr?: boolean;

  /** Client-side hydration support */
  hydration?: boolean;

  /** Error boundary for query errors */
  errorBoundary?: boolean;

  /** TanStack Query DevTools integration */
  devtools?: boolean;
  }; }
  | { id: 'connectors/zustand-nextjs'; parameters?: {

  /** State persistence support */
  persistence?: boolean;

  /** Zustand DevTools integration */
  devtools?: boolean;

  /** Server-side rendering support */
  ssr?: boolean;
  }; }
  | { id: 'features/ai-chat/backend/vercel-ai-nextjs'; parameters?: {

  /** Real-time message streaming */
  streaming?: boolean;

  /** File upload capabilities */
  fileUpload?: boolean;

  /** Voice input capabilities */
  voiceInput?: boolean;

  /** Voice output capabilities */
  voiceOutput?: boolean;

  /** Chat export and import capabilities */
  exportImport?: boolean;
  }; }
  | { id: 'features/ai-chat/frontend/shadcn'; parameters?: {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Essential chat interface with basic messaging */
    core?: boolean;

    /** Chat context and provider management */
    context?: boolean;

    /** File upload and media preview capabilities */
    media?: boolean;

    /** Voice input and output functionality */
    voice?: boolean;

    /** Advanced conversation history and management */
    history?: boolean;

    /** Advanced message input with features */
    input?: boolean;

    /** Chat toolbar and controls */
    toolbar?: boolean;

    /** Chat settings and configuration */
    settings?: boolean;

    /** Custom prompts and templates */
    prompts?: boolean;

    /** Chat export and import functionality */
    export?: boolean;

    /** Chat analytics and insights */
    analytics?: boolean;

    /** Project-based chat organization */
    projects?: boolean;

    /** Chat middleware and routing */
    middleware?: boolean;

    /** AI chat service utilities */
    services?: boolean;

    /** Text completion and generation */
    completion?: boolean;
  };

  /** UI theme variant */
  theme?: 'default' | 'dark' | 'light' | 'minimal';
  }; }
  | { id: 'features/architech-welcome/shadcn'; parameters?: {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Show technology stack visualization */
    techStack?: boolean;

    /** Show interactive component library showcase */
    componentShowcase?: boolean;

    /** Show project structure and architecture */
    projectStructure?: boolean;

    /** Show quick start guide */
    quickStart?: boolean;

    /** Show Architech branding and links */
    architechBranding?: boolean;
  };

  /** Custom welcome page title */
  customTitle?: string;

  /** Custom welcome page description */
  customDescription?: string;

  /** Primary color theme for the welcome page */
  primaryColor?: string;

  /** Show technology stack visualization */
  showTechStack?: boolean;

  /** Show interactive component library showcase */
  showComponents?: boolean;

  /** Show project structure and architecture */
  showProjectStructure?: boolean;

  /** Show quick start guide */
  showQuickStart?: boolean;

  /** Show Architech branding and links */
  showArchitechBranding?: boolean;
  }; }
  | { id: 'features/auth/backend/better-auth-nextjs'; parameters?: {

  /** Next.js API routes for authentication endpoints */
  apiRoutes?: boolean;

  /** Next.js middleware for authentication and route protection */
  middleware?: boolean;

  /** Admin API routes for user management */
  adminPanel?: boolean;

  /** Email verification API routes and components */
  emailVerification?: boolean;

  /** MFA API routes and components */
  mfa?: boolean;

  /** Password reset API routes and components */
  passwordReset?: boolean;
  /** Constitutional Architecture features configuration */
  features?: {

    /** Enable email/password authentication */
    emailPassword?: boolean;

    /** Enable email verification */
    emailVerification?: boolean;

    /** Enable password reset functionality */
    passwordReset?: boolean;

    /** Enable session management */
    sessions?: boolean;

    /** Enable organization/team management */
    organizations?: boolean;

    /** Enable two-factor authentication */
    twoFactor?: boolean;
  };
  }; }
  | { id: 'features/auth/frontend/shadcn'; parameters?: {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Enable sign-in UI components */
    signIn?: boolean;

    /** Enable sign-up UI components */
    signUp?: boolean;

    /** Enables password reset functionality (forms and pages) */
    passwordReset?: boolean;

    /** Enable profile management UI components */
    profile?: boolean;

    /** Enables Multi-Factor Authentication setup and verification */
    mfa?: boolean;

    /** Enables UI for Google, GitHub, etc. logins */
    socialLogins?: boolean;

    /** Generates a full page for managing account settings */
    accountSettingsPage?: boolean;

    /** Enables advanced profile management features */
    profileManagement?: boolean;

    /** Enable two-factor authentication UI */
    twoFactor?: boolean;

    /** Enable organization management UI */
    organizationManagement?: boolean;
  };

  /** UI theme variant */
  theme?: 'default' | 'dark' | 'light' | 'minimal';
  }; }
  | { id: 'features/emailing/backend/resend-nextjs'; parameters?: {

  /** Bulk email sending capabilities */
  bulkEmail?: boolean;

  /** Email template management */
  templates?: boolean;

  /** Email delivery and engagement analytics */
  analytics?: boolean;

  /** Email event webhooks */
  webhooks?: boolean;

  /** Enable organization-scoped email management */
  organizations?: boolean;

  /** Enable team-scoped email management */
  teams?: boolean;
  }; }
  | { id: 'features/emailing/frontend/shadcn'; parameters?: {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Enable email composer UI */
    emailComposer?: boolean;

    /** Enable email list UI */
    emailList?: boolean;

    /** Enable email templates UI */
    templates?: boolean;

    /** Enable email analytics UI */
    analytics?: boolean;

    /** Enable email campaigns UI */
    campaigns?: boolean;

    /** Enable email scheduling UI */
    scheduling?: boolean;

    /** Enable advanced email templates UI */
    advancedTemplates?: boolean;
  };

  /** UI theme variant */
  theme?: 'default' | 'dark' | 'light' | 'minimal';
  }; }
  | { id: 'features/monitoring/shadcn'; parameters?: {

  /** Backend implementation for monitoring services */
  backend?: any;

  /** Frontend implementation for monitoring UI */
  frontend?: any;
  /** Constitutional Architecture features configuration */
  features?: {

    /** Essential monitoring (error tracking, basic performance) */
    core?: boolean;

    /** Advanced performance monitoring */
    performance?: boolean;

    /** Error tracking and reporting */
    errors?: boolean;

    /** User feedback collection */
    feedback?: boolean;

    /** Monitoring analytics and reporting */
    analytics?: boolean;
  };

  /** Environments to monitor */
  environments?: string[];
  }; }
  | { id: 'features/payments/backend/stripe-nextjs'; parameters?: {

  /** Stripe webhook handlers for payment events */
  webhooks?: boolean;

  /** Stripe Checkout integration for payments */
  checkout?: boolean;

  /** Subscription management and billing */
  subscriptions?: boolean;

  /** Invoice generation and management */
  invoices?: boolean;

  /** Refund processing and management */
  refunds?: boolean;

  /** Payment methods management */
  paymentMethods?: boolean;

  /** Payment analytics and reporting */
  analytics?: boolean;

  /** Organization-level billing features */
  organizationBilling?: boolean;
  }; }
  | { id: 'features/payments/frontend/shadcn'; parameters?: {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Essential payment functionality (forms, checkout, transactions) */
    core?: boolean;

    /** Enable checkout UI components */
    checkout?: boolean;

    /** Subscription management and billing */
    subscriptions?: boolean;

    /** Invoice generation and management */
    invoices?: boolean;

    /** Payment methods management UI */
    paymentMethods?: boolean;

    /** Billing portal UI */
    billingPortal?: boolean;

    /** Invoice generation and management */
    invoicing?: boolean;

    /** Payment webhook handling */
    webhooks?: boolean;

    /** Payment analytics and reporting */
    analytics?: boolean;
  };

  /** UI theme variant */
  theme?: 'default' | 'dark' | 'light' | 'minimal';
  }; }
  | { id: 'features/teams-management/backend/better-auth-nextjs'; parameters?: {

  /** Team invitation system */
  invites?: boolean;

  /** Granular role-based permissions */
  permissions?: boolean;

  /** Team performance analytics */
  analytics?: boolean;

  /** Team billing and subscription management */
  billing?: boolean;
  /** Constitutional Architecture features configuration */
  features?: {

    /** Enable team management */
    teams?: boolean;

    /** Enable team invitations */
    invitations?: boolean;

    /** Enable role-based access control */
    roles?: boolean;

    /** Enable granular permissions */
    permissions?: boolean;
  };
  }; }
  | { id: 'features/teams-management/frontend/shadcn'; parameters?: {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Basic team management (list, creation, member management) */
    core?: boolean;

    /** Enable team management UI */
    teams?: boolean;

    /** Enable member management UI */
    members?: boolean;

    /** Enable team invitations UI */
    invitations?: boolean;

    /** Enable role management UI */
    roles?: boolean;

    /** Team billing and usage tracking */
    billing?: boolean;

    /** Team analytics and reporting */
    analytics?: boolean;

    /** Advanced team features (settings, permissions, dashboard) */
    advanced?: boolean;
  };

  /** UI theme variant */
  theme?: 'default' | 'dark' | 'light' | 'minimal';
  }; }
  | { id: 'features/web3/shadcn'; parameters?: {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Enable wallet connection UI */
    walletConnect?: boolean;

    /** Enable network switching UI */
    networkSwitch?: boolean;

    /** Enable transaction history UI */
    transactionHistory?: boolean;

    /** Enable token balances UI */
    tokenBalances?: boolean;

    /** Enable NFT gallery UI */
    nftGallery?: boolean;

    /** Enable wallet connection UI */
    walletConnection?: boolean;

    /** Enable DeFi integration UI */
    defiIntegration?: boolean;

    /** Enable staking interface UI */
    stakingInterface?: boolean;
  };

  /** UI theme variant */
  theme?: string;
  }; };

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
  };
  modules: TypedGenomeModule[];
  options?: Record<string, any>;
}

// Re-export for convenience
export { Genome } from '@thearchitech.xyz/types';
