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
  | 'framework/nextjs'
  | 'framework/react-native'
  | 'monorepo/nx'
  | 'monorepo/turborepo'
  | 'observability/posthog'
  | 'observability/sentry'
  | 'payment/stripe'
  | 'services/github-api'
  | 'ui/shadcn-ui'
  | 'ui/tailwind'
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
  | 'features/teams-management/backend/nextjs'
  | 'features/teams-management/database/drizzle'
  | 'features/teams-management/frontend'
  | 'features/teams-management/tech-stack'
  | 'features/waitlist/backend/nextjs'
  | 'features/waitlist/database/drizzle'
  | 'features/waitlist/tech-stack'
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
  'analytics/ab-testing-core': {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Essential A/B testing utilities and types */
    core?: boolean;

    /** Experiment configuration and management */
    experimentManagement?: boolean;

    /** Variant assignment logic */
    variantAssignment?: boolean;

    /** Analytics integration for tracking experiment results */
    analytics?: boolean;
  };
  };
  'analytics/seo-core': {

  /** Base URL of the site (or set NEXT_PUBLIC_SITE_URL env var) */
  siteUrl?: string;

  /** Site name for Open Graph and structured data */
  siteName?: string;

  /** Default locale for the site */
  defaultLocale?: string;
  /** Constitutional Architecture features configuration */
  features?: {

    /** Essential SEO utilities and types */
    core?: boolean;

    /** Structured data (JSON-LD) schemas */
    structuredData?: boolean;

    /** Metadata generation helpers */
    metadataHelpers?: boolean;

    /** Sitemap generation utilities */
    sitemap?: boolean;
  };
  };
  'auth/better-auth': {

  /** Enable email/password authentication */
  emailPassword?: boolean;

  /** Enable email verification */
  emailVerification?: boolean;

  /** Enabled OAuth providers */
  oauthProviders?: string[];

  /** Enable two-factor authentication */
  twoFactor?: boolean;

  /** Enable organization support */
  organizations?: boolean;

  /** Enable team support within organizations */
  teams?: boolean;

  /** Session expiry time in seconds (default: 7 days) */
  sessionExpiry?: number;
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
  'content/i18n-expo': {

  /** Supported locales */
  locales?: string[];

  /** Default locale */
  defaultLocale?: string;
  /** Constitutional Architecture features configuration */
  features?: {

    /** Auto-detect device locale */
    deviceLocale?: boolean;

    /** Use native date/number formatting */
    nativeFormatting?: boolean;

    /** Enable pluralization support */
    pluralization?: boolean;
  };
  };
  'content/i18n-nextjs': {

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
  'core/golden-stack': {

  zustand: any;

  vitest: any;

  eslint: any;

  prettier: any;
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
  'data-fetching/trpc': {

  /** Data transformer for complex types (Date, Map, Set) */
  transformer?: 'superjson' | 'devalue' | 'none';

  /** Abort requests on component unmount */
  abortOnUnmount?: boolean;

  /** Enable request batching for better performance */
  batchingEnabled?: boolean;
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

  /** Resend API key (or set RESEND_API_KEY env var) */
  apiKey?: string;

  /** Default from email address (or set FROM_EMAIL env var) */
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
  'framework/expo': {

  /** Enable TypeScript support */
  typescript?: boolean;

  /** Use src/ directory */
  srcDir?: boolean;

  /** Import alias for absolute imports */
  importAlias?: string;

  /** React version to use */
  reactVersion?: string;

  /** Use Expo Router for navigation */
  expoRouter?: boolean;

  platforms: any;
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
  'framework/react-native': {

  /** Enable TypeScript support */
  typescript?: boolean;

  /** Use src/ directory */
  srcDir?: boolean;

  /** Import alias for absolute imports */
  importAlias?: string;

  /** React version to use */
  reactVersion?: string;

  platforms: any;
  };
  'monorepo/nx': {

  /** Package manager (npm, yarn, pnpm) */
  packageManager?: string;

  /** Enable Nx Cloud for distributed caching */
  nxCloud?: boolean;
  };
  'monorepo/turborepo': {

  /** Package manager (npm, yarn, pnpm, bun) */
  packageManager?: string;

  /** Enable remote caching with Vercel */
  remoteCaching?: boolean;
  };
  'observability/posthog': {

  /** PostHog API key (or set POSTHOG_API_KEY env var) */
  apiKey?: string;

  /** PostHog API host URL */
  apiHost?: string;

  /** Environment name */
  environment?: string;
  /** Constitutional Architecture features configuration */
  features?: {

    /** Essential analytics (event tracking, user identification) */
    core?: boolean;

    /** Event tracking and analytics */
    eventTracking?: boolean;

    /** Session replay recording */
    sessionReplay?: boolean;

    /** Feature flags management */
    featureFlags?: boolean;

    /** A/B testing and experiments */
    experiments?: boolean;

    /** Auto-capture user interactions */
    autocapture?: boolean;

    /** Surveys and feedback collection */
    surveys?: boolean;
  };

  /** Person profiles creation mode */
  personProfiles?: 'identified_only' | 'always' | 'never';
  };
  'observability/sentry': {

  /** Sentry DSN (or set SENTRY_DSN env var) */
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
  'services/github-api': {

  /** GitHub Personal Access Token or OAuth access token */
  token: string;

  /** GitHub API base URL (for GitHub Enterprise) */
  baseUrl?: string;

  /** User agent string for API requests */
  userAgent?: string;
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
  'connectors/ai/vercel-ai-nextjs': {

  /** Enabled AI providers */
  providers?: string[];

  /** Enable streaming responses */
  streaming?: boolean;
  };
  'connectors/analytics/ab-vercel-nextjs': {

  /** Add A/B testing middleware for variant assignment */
  middleware?: boolean;

  /** Generate Experiment and Variant components */
  components?: boolean;

  /** Generate React hooks for accessing variants */
  hooks?: boolean;

  /** Configure Vercel Edge Config for experiments */
  edgeConfig?: boolean;

  /** Track experiment views and conversions */
  analytics?: boolean;
  };
  'connectors/analytics/posthog-nextjs': {

  /** Add PostHogProvider to app root */
  provider?: boolean;

  /** Automatically capture page views on route changes */
  capturePageviews?: boolean;

  /** Automatically capture button clicks and interactions */
  captureClicks?: boolean;

  /** Add Next.js middleware for pageview tracking */
  middleware?: boolean;

  /** Enable event tracking hooks and utilities */
  eventTracking?: boolean;

  /** Enable feature flags hooks */
  featureFlags?: boolean;

  /** Enable A/B testing and experiments hooks */
  experiments?: boolean;

  /** Enable session replay recording */
  sessionReplay?: boolean;
  };
  'connectors/auth/better-auth-nextjs': {

  /** Enable email verification */
  emailVerification?: boolean;

  /** Enabled OAuth providers */
  oauthProviders?: string[];

  /** Enable two-factor authentication */
  twoFactor?: boolean;

  /** Enable organization support */
  organizations?: boolean;

  /** Enable team support */
  teams?: boolean;
  };
  'connectors/cms/payload-nextjs': {

  /** Generate default collections (Pages, Posts, Media) */
  collections?: boolean;

  /** Enable media/upload collection */
  media?: boolean;

  /** Enable Payload authentication */
  auth?: boolean;

  /** Enable Payload admin panel */
  adminPanel?: boolean;

  /** Configure local API for server components */
  localApi?: boolean;

  /** Enable draft preview functionality */
  draftPreview?: boolean;

  /** Enable live preview (beta) */
  livePreview?: boolean;
  };
  'connectors/database/drizzle-postgres-docker': {

  /** PostgreSQL database service with Docker */
  postgresService?: boolean;

  /** Drizzle migration service with Docker */
  migrationService?: boolean;

  /** Database backup and restore service */
  backupService?: boolean;

  /** Database monitoring with Prometheus and Grafana */
  monitoringService?: boolean;

  /** Database seeding with sample data */
  seedData?: boolean;

  /** SSL/TLS encryption for database connections */
  sslSupport?: boolean;

  /** Database replication setup */
  replication?: boolean;

  /** Database clustering configuration */
  clustering?: boolean;

  /** Database performance optimization */
  performanceTuning?: boolean;

  /** Database security hardening and best practices */
  securityHardening?: boolean;

  /** Docker volumes for database persistence */
  volumeManagement?: boolean;

  /** Database networking and service discovery */
  networking?: boolean;
  };
  'connectors/deployment/docker-nextjs': {

  /** Optimized multi-stage Docker builds for production */
  multiStageBuild?: boolean;

  /** Docker setup for development with hot reloading */
  developmentMode?: boolean;

  /** Production-ready Docker configuration with optimization */
  productionMode?: boolean;

  /** Nginx configuration for reverse proxy and static file serving */
  nginxReverseProxy?: boolean;

  /** SSL/TLS configuration and certificate management */
  sslSupport?: boolean;

  /** Docker health checks and monitoring endpoints */
  healthChecks?: boolean;

  /** Environment-specific configuration management */
  environmentConfig?: boolean;

  /** Docker volumes for persistent data and logs */
  volumeManagement?: boolean;

  /** Docker networking configuration and service discovery */
  networking?: boolean;

  /** Docker monitoring with Prometheus and Grafana */
  monitoring?: boolean;

  /** Backup and restore scripts for data persistence */
  backupRestore?: boolean;

  /** Security hardening and best practices */
  securityHardening?: boolean;
  };
  'connectors/email/resend-nextjs': {

  /** Resend API key */
  apiKey: string;
  };
  'connectors/infrastructure/rhf-zod-shadcn': {

  /** Zod schema validation */
  validation?: boolean;

  /** Form accessibility features */
  accessibility?: boolean;

  /** React Hook Form DevTools */
  devtools?: boolean;
  };
  'connectors/infrastructure/tanstack-query-nextjs': {

  /** SSR support for TanStack Query */
  ssr?: boolean;

  /** Client-side hydration support */
  hydration?: boolean;

  /** Error boundary for query errors */
  errorBoundary?: boolean;

  /** TanStack Query DevTools integration */
  devtools?: boolean;
  };
  'connectors/infrastructure/zustand-nextjs': {

  /** State persistence support */
  persistence?: boolean;

  /** Zustand DevTools integration */
  devtools?: boolean;

  /** Server-side rendering support */
  ssr?: boolean;
  };
  'connectors/integrations/better-auth-github': {

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
  'connectors/monitoring/sentry-nextjs': {

  /** Comprehensive error tracking with breadcrumbs and context */
  errorTracking?: boolean;

  /** Web vitals, transactions, and performance tracking */
  performanceMonitoring?: boolean;

  /** User feedback collection and error reporting */
  userFeedback?: boolean;

  /** Sentry middleware for automatic error capture */
  middleware?: boolean;

  /** Performance profiling and analysis */
  profiling?: boolean;

  /** Custom alerts and monitoring dashboard */
  alerts?: boolean;

  /** Release tracking and deployment monitoring */
  releaseTracking?: boolean;

  /** User session recording and replay for debugging */
  sessionReplay?: boolean;

  /** Custom business metrics and KPIs tracking */
  customMetrics?: boolean;

  /** Advanced error grouping and deduplication */
  errorGrouping?: boolean;

  /** Detailed crash reports with stack traces */
  crashReporting?: boolean;

  /** User action breadcrumbs for error context */
  breadcrumbs?: boolean;

  /** Source map support for better error debugging */
  sourceMaps?: boolean;

  /** Integrations with Slack, Discord, PagerDuty, etc. */
  integrations?: boolean;

  /** Custom tagging and filtering for errors and performance */
  customTags?: boolean;

  /** Intelligent sampling for high-volume applications */
  sampling?: boolean;

  /** Data privacy controls and PII scrubbing */
  privacy?: boolean;

  /** Webhook notifications for critical errors */
  webhooks?: boolean;

  /** Advanced analytics and reporting features */
  analytics?: boolean;

  /** Testing utilities and mock Sentry for development */
  testing?: boolean;
  };
  'connectors/nextjs-trpc-router': {

  /** Template context with project structure information */
  templateContext?: Record<string, any>;
  };
  'connectors/seo/seo-nextjs': {

  /** Generate sitemap.xml automatically */
  sitemap?: boolean;

  /** Generate robots.txt automatically */
  robots?: boolean;

  /** Enable JSON-LD structured data helpers */
  structuredData?: boolean;

  /** Add default metadata to root layout */
  defaultMetadata?: boolean;

  /** Generate dynamic metadata helpers */
  dynamicMetadata?: boolean;

  /** Generate Open Graph metadata */
  openGraph?: boolean;

  /** Generate Twitter Card metadata */
  twitter?: boolean;
  };
  'connectors/testing/vitest-nextjs': {

  /** Unit tests for components, hooks, and utilities */
  unitTesting?: boolean;

  /** Integration tests for pages and API routes */
  integrationTesting?: boolean;

  /** End-to-end tests with Playwright */
  e2eTesting?: boolean;

  /** Code coverage reporting with HTML and LCOV reports */
  coverageReporting?: boolean;

  /** Watch mode for development testing */
  watchMode?: boolean;

  /** Vitest UI for interactive testing */
  uiMode?: boolean;

  /** Mock utilities for Next.js, APIs, and external services */
  mocking?: boolean;

  /** Snapshot testing for components */
  snapshots?: boolean;

  /** Parallel test execution for faster runs */
  parallelTesting?: boolean;

  /** Full TypeScript support for tests */
  typescriptSupport?: boolean;
  };
  'features/ai-chat/backend/nextjs': {

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
  'features/ai-chat/database/drizzle': {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Enable custom prompt library */
    promptLibrary?: boolean;

    /** Enable usage tracking and analytics */
    usageTracking?: boolean;

    /** Enable conversation sharing via links */
    conversationSharing?: boolean;
  };
  };
  'features/ai-chat/frontend': {
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
  'features/architech-welcome': {
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
  };
  'features/auth/frontend': {
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
  'features/auth/tech-stack': {

  /** The name of the feature (e.g., 'auth') */
  featureName?: string;

  /** The path to the feature (e.g., 'auth') */
  featurePath?: string;

  /** Whether to generate TypeScript types */
  hasTypes?: boolean;

  /** Whether to generate Zod schemas */
  hasSchemas?: boolean;

  /** Whether to generate TanStack Query hooks */
  hasHooks?: boolean;

  /** Whether to generate Zustand stores */
  hasStores?: boolean;

  /** Whether to generate API routes */
  hasApiRoutes?: boolean;

  /** Whether to generate validation layer */
  hasValidation?: boolean;
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
  'features/emailing/frontend': {
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
  'features/emailing/tech-stack': {

  type: any;

  properties: any;

  required: any;
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
  'features/monitoring/tech-stack': {

  type: any;

  properties: any;

  required: any;
  };
  'features/payments/backend/revenuecat': {

  /** RevenueCat webhook secret for HMAC verification */
  webhookSecret: string;
  };
  'features/payments/backend/stripe-nextjs': {
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
  'features/payments/database/drizzle': {};
  'features/payments/frontend': {
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
  'features/payments/tech-stack': {

  type: any;

  properties: any;

  required: any;
  };
  'features/teams-management/backend/nextjs': {

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
  'features/teams-management/database/drizzle': {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Enable activity tracking and audit trail */
    activityTracking?: boolean;
  };
  };
  'features/teams-management/frontend': {
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
  'features/teams-management/tech-stack': {

  type: any;

  properties: any;

  required: any;
  };
  'features/waitlist/backend/nextjs': {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Enable viral referral system */
    viralReferral?: boolean;

    /** Enable position tracking in waitlist */
    positionTracking?: boolean;

    /** Enable referral bonus system */
    bonusSystem?: boolean;

    /** Send welcome email with referral code */
    welcomeEmail?: boolean;

    /** Enable analytics tracking */
    analytics?: boolean;
  };

  /** Position boost per referral */
  referralBonus?: number;

  /** Maximum total bonus per user */
  maxBonusPerUser?: number;
  };
  'features/waitlist/database/drizzle': {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Enable viral referral system */
    viralReferral?: boolean;

    /** Enable position tracking in waitlist */
    positionTracking?: boolean;

    /** Enable referral bonus system */
    bonusSystem?: boolean;

    /** Enable analytics tracking */
    analytics?: boolean;
  };
  };
  'features/waitlist/tech-stack': {

  type: any;

  properties: any;

  required: any;
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
  | { id: 'analytics/ab-testing-core'; parameters?: {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Essential A/B testing utilities and types */
    core?: boolean;

    /** Experiment configuration and management */
    experimentManagement?: boolean;

    /** Variant assignment logic */
    variantAssignment?: boolean;

    /** Analytics integration for tracking experiment results */
    analytics?: boolean;
  };
  }; }
  | { id: 'analytics/seo-core'; parameters?: {

  /** Base URL of the site (or set NEXT_PUBLIC_SITE_URL env var) */
  siteUrl?: string;

  /** Site name for Open Graph and structured data */
  siteName?: string;

  /** Default locale for the site */
  defaultLocale?: string;
  /** Constitutional Architecture features configuration */
  features?: {

    /** Essential SEO utilities and types */
    core?: boolean;

    /** Structured data (JSON-LD) schemas */
    structuredData?: boolean;

    /** Metadata generation helpers */
    metadataHelpers?: boolean;

    /** Sitemap generation utilities */
    sitemap?: boolean;
  };
  }; }
  | { id: 'auth/better-auth'; parameters?: {

  /** Enable email/password authentication */
  emailPassword?: boolean;

  /** Enable email verification */
  emailVerification?: boolean;

  /** Enabled OAuth providers */
  oauthProviders?: string[];

  /** Enable two-factor authentication */
  twoFactor?: boolean;

  /** Enable organization support */
  organizations?: boolean;

  /** Enable team support within organizations */
  teams?: boolean;

  /** Session expiry time in seconds (default: 7 days) */
  sessionExpiry?: number;
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
  | { id: 'content/i18n-expo'; parameters?: {

  /** Supported locales */
  locales?: string[];

  /** Default locale */
  defaultLocale?: string;
  /** Constitutional Architecture features configuration */
  features?: {

    /** Auto-detect device locale */
    deviceLocale?: boolean;

    /** Use native date/number formatting */
    nativeFormatting?: boolean;

    /** Enable pluralization support */
    pluralization?: boolean;
  };
  }; }
  | { id: 'content/i18n-nextjs'; parameters?: {

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
  | { id: 'core/golden-stack'; parameters?: {

  zustand: any;

  vitest: any;

  eslint: any;

  prettier: any;
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
  | { id: 'data-fetching/trpc'; parameters?: {

  /** Data transformer for complex types (Date, Map, Set) */
  transformer?: 'superjson' | 'devalue' | 'none';

  /** Abort requests on component unmount */
  abortOnUnmount?: boolean;

  /** Enable request batching for better performance */
  batchingEnabled?: boolean;
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

  /** Resend API key (or set RESEND_API_KEY env var) */
  apiKey?: string;

  /** Default from email address (or set FROM_EMAIL env var) */
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
  | { id: 'framework/expo'; parameters?: {

  /** Enable TypeScript support */
  typescript?: boolean;

  /** Use src/ directory */
  srcDir?: boolean;

  /** Import alias for absolute imports */
  importAlias?: string;

  /** React version to use */
  reactVersion?: string;

  /** Use Expo Router for navigation */
  expoRouter?: boolean;

  platforms: any;
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
  | { id: 'framework/react-native'; parameters?: {

  /** Enable TypeScript support */
  typescript?: boolean;

  /** Use src/ directory */
  srcDir?: boolean;

  /** Import alias for absolute imports */
  importAlias?: string;

  /** React version to use */
  reactVersion?: string;

  platforms: any;
  }; }
  | { id: 'monorepo/nx'; parameters?: {

  /** Package manager (npm, yarn, pnpm) */
  packageManager?: string;

  /** Enable Nx Cloud for distributed caching */
  nxCloud?: boolean;
  }; }
  | { id: 'monorepo/turborepo'; parameters?: {

  /** Package manager (npm, yarn, pnpm, bun) */
  packageManager?: string;

  /** Enable remote caching with Vercel */
  remoteCaching?: boolean;
  }; }
  | { id: 'observability/posthog'; parameters?: {

  /** PostHog API key (or set POSTHOG_API_KEY env var) */
  apiKey?: string;

  /** PostHog API host URL */
  apiHost?: string;

  /** Environment name */
  environment?: string;
  /** Constitutional Architecture features configuration */
  features?: {

    /** Essential analytics (event tracking, user identification) */
    core?: boolean;

    /** Event tracking and analytics */
    eventTracking?: boolean;

    /** Session replay recording */
    sessionReplay?: boolean;

    /** Feature flags management */
    featureFlags?: boolean;

    /** A/B testing and experiments */
    experiments?: boolean;

    /** Auto-capture user interactions */
    autocapture?: boolean;

    /** Surveys and feedback collection */
    surveys?: boolean;
  };

  /** Person profiles creation mode */
  personProfiles?: 'identified_only' | 'always' | 'never';
  }; }
  | { id: 'observability/sentry'; parameters?: {

  /** Sentry DSN (or set SENTRY_DSN env var) */
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
  | { id: 'services/github-api'; parameters?: {

  /** GitHub Personal Access Token or OAuth access token */
  token: string;

  /** GitHub API base URL (for GitHub Enterprise) */
  baseUrl?: string;

  /** User agent string for API requests */
  userAgent?: string;
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
  | { id: 'connectors/ai/vercel-ai-nextjs'; parameters?: {

  /** Enabled AI providers */
  providers?: string[];

  /** Enable streaming responses */
  streaming?: boolean;
  }; }
  | { id: 'connectors/analytics/ab-vercel-nextjs'; parameters?: {

  /** Add A/B testing middleware for variant assignment */
  middleware?: boolean;

  /** Generate Experiment and Variant components */
  components?: boolean;

  /** Generate React hooks for accessing variants */
  hooks?: boolean;

  /** Configure Vercel Edge Config for experiments */
  edgeConfig?: boolean;

  /** Track experiment views and conversions */
  analytics?: boolean;
  }; }
  | { id: 'connectors/analytics/posthog-nextjs'; parameters?: {

  /** Add PostHogProvider to app root */
  provider?: boolean;

  /** Automatically capture page views on route changes */
  capturePageviews?: boolean;

  /** Automatically capture button clicks and interactions */
  captureClicks?: boolean;

  /** Add Next.js middleware for pageview tracking */
  middleware?: boolean;

  /** Enable event tracking hooks and utilities */
  eventTracking?: boolean;

  /** Enable feature flags hooks */
  featureFlags?: boolean;

  /** Enable A/B testing and experiments hooks */
  experiments?: boolean;

  /** Enable session replay recording */
  sessionReplay?: boolean;
  }; }
  | { id: 'connectors/auth/better-auth-nextjs'; parameters?: {

  /** Enable email verification */
  emailVerification?: boolean;

  /** Enabled OAuth providers */
  oauthProviders?: string[];

  /** Enable two-factor authentication */
  twoFactor?: boolean;

  /** Enable organization support */
  organizations?: boolean;

  /** Enable team support */
  teams?: boolean;
  }; }
  | { id: 'connectors/cms/payload-nextjs'; parameters?: {

  /** Generate default collections (Pages, Posts, Media) */
  collections?: boolean;

  /** Enable media/upload collection */
  media?: boolean;

  /** Enable Payload authentication */
  auth?: boolean;

  /** Enable Payload admin panel */
  adminPanel?: boolean;

  /** Configure local API for server components */
  localApi?: boolean;

  /** Enable draft preview functionality */
  draftPreview?: boolean;

  /** Enable live preview (beta) */
  livePreview?: boolean;
  }; }
  | { id: 'connectors/database/drizzle-postgres-docker'; parameters?: {

  /** PostgreSQL database service with Docker */
  postgresService?: boolean;

  /** Drizzle migration service with Docker */
  migrationService?: boolean;

  /** Database backup and restore service */
  backupService?: boolean;

  /** Database monitoring with Prometheus and Grafana */
  monitoringService?: boolean;

  /** Database seeding with sample data */
  seedData?: boolean;

  /** SSL/TLS encryption for database connections */
  sslSupport?: boolean;

  /** Database replication setup */
  replication?: boolean;

  /** Database clustering configuration */
  clustering?: boolean;

  /** Database performance optimization */
  performanceTuning?: boolean;

  /** Database security hardening and best practices */
  securityHardening?: boolean;

  /** Docker volumes for database persistence */
  volumeManagement?: boolean;

  /** Database networking and service discovery */
  networking?: boolean;
  }; }
  | { id: 'connectors/deployment/docker-nextjs'; parameters?: {

  /** Optimized multi-stage Docker builds for production */
  multiStageBuild?: boolean;

  /** Docker setup for development with hot reloading */
  developmentMode?: boolean;

  /** Production-ready Docker configuration with optimization */
  productionMode?: boolean;

  /** Nginx configuration for reverse proxy and static file serving */
  nginxReverseProxy?: boolean;

  /** SSL/TLS configuration and certificate management */
  sslSupport?: boolean;

  /** Docker health checks and monitoring endpoints */
  healthChecks?: boolean;

  /** Environment-specific configuration management */
  environmentConfig?: boolean;

  /** Docker volumes for persistent data and logs */
  volumeManagement?: boolean;

  /** Docker networking configuration and service discovery */
  networking?: boolean;

  /** Docker monitoring with Prometheus and Grafana */
  monitoring?: boolean;

  /** Backup and restore scripts for data persistence */
  backupRestore?: boolean;

  /** Security hardening and best practices */
  securityHardening?: boolean;
  }; }
  | { id: 'connectors/email/resend-nextjs'; parameters?: {

  /** Resend API key */
  apiKey: string;
  }; }
  | { id: 'connectors/infrastructure/rhf-zod-shadcn'; parameters?: {

  /** Zod schema validation */
  validation?: boolean;

  /** Form accessibility features */
  accessibility?: boolean;

  /** React Hook Form DevTools */
  devtools?: boolean;
  }; }
  | { id: 'connectors/infrastructure/tanstack-query-nextjs'; parameters?: {

  /** SSR support for TanStack Query */
  ssr?: boolean;

  /** Client-side hydration support */
  hydration?: boolean;

  /** Error boundary for query errors */
  errorBoundary?: boolean;

  /** TanStack Query DevTools integration */
  devtools?: boolean;
  }; }
  | { id: 'connectors/infrastructure/zustand-nextjs'; parameters?: {

  /** State persistence support */
  persistence?: boolean;

  /** Zustand DevTools integration */
  devtools?: boolean;

  /** Server-side rendering support */
  ssr?: boolean;
  }; }
  | { id: 'connectors/integrations/better-auth-github'; parameters?: {

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
  | { id: 'connectors/monitoring/sentry-nextjs'; parameters?: {

  /** Comprehensive error tracking with breadcrumbs and context */
  errorTracking?: boolean;

  /** Web vitals, transactions, and performance tracking */
  performanceMonitoring?: boolean;

  /** User feedback collection and error reporting */
  userFeedback?: boolean;

  /** Sentry middleware for automatic error capture */
  middleware?: boolean;

  /** Performance profiling and analysis */
  profiling?: boolean;

  /** Custom alerts and monitoring dashboard */
  alerts?: boolean;

  /** Release tracking and deployment monitoring */
  releaseTracking?: boolean;

  /** User session recording and replay for debugging */
  sessionReplay?: boolean;

  /** Custom business metrics and KPIs tracking */
  customMetrics?: boolean;

  /** Advanced error grouping and deduplication */
  errorGrouping?: boolean;

  /** Detailed crash reports with stack traces */
  crashReporting?: boolean;

  /** User action breadcrumbs for error context */
  breadcrumbs?: boolean;

  /** Source map support for better error debugging */
  sourceMaps?: boolean;

  /** Integrations with Slack, Discord, PagerDuty, etc. */
  integrations?: boolean;

  /** Custom tagging and filtering for errors and performance */
  customTags?: boolean;

  /** Intelligent sampling for high-volume applications */
  sampling?: boolean;

  /** Data privacy controls and PII scrubbing */
  privacy?: boolean;

  /** Webhook notifications for critical errors */
  webhooks?: boolean;

  /** Advanced analytics and reporting features */
  analytics?: boolean;

  /** Testing utilities and mock Sentry for development */
  testing?: boolean;
  }; }
  | { id: 'connectors/nextjs-trpc-router'; parameters?: {

  /** Template context with project structure information */
  templateContext?: Record<string, any>;
  }; }
  | { id: 'connectors/seo/seo-nextjs'; parameters?: {

  /** Generate sitemap.xml automatically */
  sitemap?: boolean;

  /** Generate robots.txt automatically */
  robots?: boolean;

  /** Enable JSON-LD structured data helpers */
  structuredData?: boolean;

  /** Add default metadata to root layout */
  defaultMetadata?: boolean;

  /** Generate dynamic metadata helpers */
  dynamicMetadata?: boolean;

  /** Generate Open Graph metadata */
  openGraph?: boolean;

  /** Generate Twitter Card metadata */
  twitter?: boolean;
  }; }
  | { id: 'connectors/testing/vitest-nextjs'; parameters?: {

  /** Unit tests for components, hooks, and utilities */
  unitTesting?: boolean;

  /** Integration tests for pages and API routes */
  integrationTesting?: boolean;

  /** End-to-end tests with Playwright */
  e2eTesting?: boolean;

  /** Code coverage reporting with HTML and LCOV reports */
  coverageReporting?: boolean;

  /** Watch mode for development testing */
  watchMode?: boolean;

  /** Vitest UI for interactive testing */
  uiMode?: boolean;

  /** Mock utilities for Next.js, APIs, and external services */
  mocking?: boolean;

  /** Snapshot testing for components */
  snapshots?: boolean;

  /** Parallel test execution for faster runs */
  parallelTesting?: boolean;

  /** Full TypeScript support for tests */
  typescriptSupport?: boolean;
  }; }
  | { id: 'features/ai-chat/backend/nextjs'; parameters?: {

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
  | { id: 'features/ai-chat/database/drizzle'; parameters?: {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Enable custom prompt library */
    promptLibrary?: boolean;

    /** Enable usage tracking and analytics */
    usageTracking?: boolean;

    /** Enable conversation sharing via links */
    conversationSharing?: boolean;
  };
  }; }
  | { id: 'features/ai-chat/frontend'; parameters?: {
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
  | { id: 'features/architech-welcome'; parameters?: {
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
  }; }
  | { id: 'features/auth/frontend'; parameters?: {
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
  | { id: 'features/auth/tech-stack'; parameters?: {

  /** The name of the feature (e.g., 'auth') */
  featureName?: string;

  /** The path to the feature (e.g., 'auth') */
  featurePath?: string;

  /** Whether to generate TypeScript types */
  hasTypes?: boolean;

  /** Whether to generate Zod schemas */
  hasSchemas?: boolean;

  /** Whether to generate TanStack Query hooks */
  hasHooks?: boolean;

  /** Whether to generate Zustand stores */
  hasStores?: boolean;

  /** Whether to generate API routes */
  hasApiRoutes?: boolean;

  /** Whether to generate validation layer */
  hasValidation?: boolean;
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
  | { id: 'features/emailing/frontend'; parameters?: {
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
  | { id: 'features/emailing/tech-stack'; parameters?: {

  type: any;

  properties: any;

  required: any;
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
  | { id: 'features/monitoring/tech-stack'; parameters?: {

  type: any;

  properties: any;

  required: any;
  }; }
  | { id: 'features/payments/backend/revenuecat'; parameters?: {

  /** RevenueCat webhook secret for HMAC verification */
  webhookSecret: string;
  }; }
  | { id: 'features/payments/backend/stripe-nextjs'; parameters?: {
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
  | { id: 'features/payments/database/drizzle'; parameters?: {}; }
  | { id: 'features/payments/frontend'; parameters?: {
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
  | { id: 'features/payments/tech-stack'; parameters?: {

  type: any;

  properties: any;

  required: any;
  }; }
  | { id: 'features/teams-management/backend/nextjs'; parameters?: {

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
  | { id: 'features/teams-management/database/drizzle'; parameters?: {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Enable activity tracking and audit trail */
    activityTracking?: boolean;
  };
  }; }
  | { id: 'features/teams-management/frontend'; parameters?: {
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
  | { id: 'features/teams-management/tech-stack'; parameters?: {

  type: any;

  properties: any;

  required: any;
  }; }
  | { id: 'features/waitlist/backend/nextjs'; parameters?: {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Enable viral referral system */
    viralReferral?: boolean;

    /** Enable position tracking in waitlist */
    positionTracking?: boolean;

    /** Enable referral bonus system */
    bonusSystem?: boolean;

    /** Send welcome email with referral code */
    welcomeEmail?: boolean;

    /** Enable analytics tracking */
    analytics?: boolean;
  };

  /** Position boost per referral */
  referralBonus?: number;

  /** Maximum total bonus per user */
  maxBonusPerUser?: number;
  }; }
  | { id: 'features/waitlist/database/drizzle'; parameters?: {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Enable viral referral system */
    viralReferral?: boolean;

    /** Enable position tracking in waitlist */
    positionTracking?: boolean;

    /** Enable referral bonus system */
    bonusSystem?: boolean;

    /** Enable analytics tracking */
    analytics?: boolean;
  };
  }; }
  | { id: 'features/waitlist/tech-stack'; parameters?: {

  type: any;

  properties: any;

  required: any;
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
