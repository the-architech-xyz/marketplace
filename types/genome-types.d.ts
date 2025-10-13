/**
 * Marketplace-Generated Genome Types
 * 
 * Auto-generated type definitions for type-safe genome authoring.
 */

import { Genome } from '@thearchitech.xyz/types';

// Generated ModuleId union type
export type ModuleId = 'ai/vercel-ai-sdk' | 'auth/better-auth' | 'blockchain/web3' | 'content/next-intl' | 'core/dependencies' | 'core/forms' | 'core/git' | 'data-fetching/tanstack-query' | 'database/drizzle' | 'database/prisma' | 'database/sequelize' | 'database/typeorm' | 'deployment/docker' | 'deployment/vercel' | 'email/resend' | 'framework/nextjs' | 'observability/sentry' | 'payment/stripe' | 'quality/eslint' | 'quality/prettier' | 'services/github-api' | 'state/zustand' | 'testing/vitest' | 'ui/shadcn-ui' | 'ui/tailwind' | 'connectors/better-auth-github' | 'connectors/docker-drizzle' | 'connectors/docker-nextjs' | 'connectors/rhf-zod-shadcn' | 'connectors/sentry/nextjs' | 'connectors/sentry/react' | 'connectors/sentry-nextjs' | 'connectors/stripe/nextjs-drizzle' | 'connectors/tanstack-query-nextjs' | 'connectors/vitest-nextjs' | 'connectors/zustand-nextjs' | 'features/ai-chat/backend/vercel-ai-nextjs' | 'features/ai-chat/frontend/shadcn' | 'features/architech-welcome/shadcn' | 'features/auth/backend/better-auth-nextjs' | 'features/auth/frontend/shadcn' | 'features/email/react-email-templates' | 'features/emailing/backend/resend-nextjs' | 'features/emailing/frontend/shadcn' | 'features/graph-visualizer/shadcn' | 'features/monitoring/shadcn' | 'features/observability/sentry-shadcn' | 'features/payments/backend/stripe-nextjs' | 'features/payments/frontend/shadcn' | 'features/project-management/shadcn' | 'features/repo-analyzer/shadcn' | 'features/social-profile/shadcn' | 'features/teams-management/backend/better-auth-nextjs' | 'features/teams-management/frontend/shadcn' | 'features/web3/shadcn';

export type ModuleParameters = {
  'ai/vercel-ai-sdk': {

    /** AI providers to include */
    providers?: any;
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
    defaultModel?: any;

    /** Maximum tokens for generation */
    maxTokens?: any;

    /** Temperature for generation */
    temperature?: any;
  };
  'auth/better-auth': {

    /** Authentication providers to enable */
    providers?: any;

    /** Session management strategy */
    session?: any;

    /** Enable CSRF protection */
    csrf?: any;

    /** Enable rate limiting */
    rateLimit?: any;
  };
  'blockchain/web3': {

    /** Supported blockchain networks */
    networks?: any;

    /** Enable WalletConnect support */
    walletConnect?: any;

    /** Smart contract addresses */
    contracts?: any;
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
    locales?: any;

    /** Default locale */
    defaultLocale?: any;

    /** Enable locale-based routing */
    routing?: any;

    /** Enable SEO optimization */
    seo?: any;
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
    zod?: any;

    /** Enable React Hook Form for form handling */
    reactHookForm?: any;

    /** Enable @hookform/resolvers for Zod integration */
    resolvers?: any;

    /** Enable accessibility features */
    accessibility?: any;

    /** Enable React Hook Form DevTools */
    devtools?: any;
  };
  'core/git': {

    /** Git user name for commits */
    userName?: any;

    /** Git user email for commits */
    userEmail?: any;

    /** Default branch name for new repositories */
    defaultBranch?: any;

    /** Automatically initialize git repository after project creation */
    autoInit?: any;
  };
  'data-fetching/tanstack-query': {

    /** Enable TanStack Query DevTools */
    devtools?: any;

    /** Default query and mutation options */
    defaultOptions?: any;

    /** Enable Suspense mode for queries */
    suspense?: any;
  };
  'database/drizzle': {

    /** Database provider */
    provider?: any;

    /** Database type to use */
    databaseType?: any;
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
    provider?: any;

    /** Enable Prisma Studio */
    studio?: any;

    /** Enable database migrations */
    migrations?: any;

    /** Database type */
    databaseType?: any;
  };
  'database/sequelize': {

    /** Database host */
    host?: any;

    /** Database port */
    port?: any;

    /** Database username */
    username?: any;

    /** Database password */
    password?: any;

    /** Database name */
    databaseName?: any;

    /** Enable SQL logging */
    logging?: any;

    /** Enable connection pooling */
    pool?: any;

    /** Database type */
    databaseType?: any;
  };
  'database/typeorm': {

    /** Enable schema synchronization */
    synchronize?: any;

    /** Enable query logging */
    logging?: any;

    /** Database type */
    databaseType?: any;
  };
  'deployment/docker': {

    /** Node.js version for Docker image */
    nodeVersion?: any;

    /** Enable production optimizations */
    optimization?: any;

    /** Enable health check endpoint */
    healthCheck?: any;
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
    framework?: any;

    /** Build command to run */
    buildCommand?: any;

    /** Output directory for build */
    outputDirectory?: any;

    /** Install command */
    installCommand?: any;

    /** Development command */
    devCommand?: any;

    /** Environment variables to configure */
    envVars?: any;

    /** Serverless function configuration */
    functions: any;

    /** Enable Vercel Analytics */
    analytics?: any;

    /** Enable Vercel Speed Insights */
    speedInsights?: any;
  };
  'email/resend': {

    /** Resend API key */
    apiKey?: any;

    /** Default from email address */
    fromEmail?: any;
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
    typescript?: any;

    /** Enable Tailwind CSS */
    tailwind?: any;

    /** Enable ESLint */
    eslint?: any;

    /** Use App Router (recommended) */
    appRouter?: any;

    /** Use src/ directory */
    srcDir?: any;

    /** Import alias for absolute imports */
    importAlias?: any;

    /** React version to use (18 for Radix UI compatibility, 19 for latest, or specify exact version like '18.2.0') */
    reactVersion?: any;
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
    dsn?: any;

    /** Environment name */
    environment?: any;
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
    release?: any;
  };
  'payment/stripe': {

    /** Default currency for payments */
    currency?: any;

    /** Stripe mode (test or live) */
    mode?: any;

    /** Enable webhook handling */
    webhooks?: any;

    /** Enable Stripe Dashboard integration */
    dashboard?: any;
  };
  'quality/eslint': {

    /** Enable TypeScript support */
    typescript?: any;

    /** Enable React support */
    react?: any;

    /** Enable Next.js specific rules */
    nextjs?: any;

    /** Enable Node.js specific rules */
    nodejs?: any;

    /** Enable accessibility rules */
    accessibility?: any;

    /** Enable import/export rules */
    imports?: any;

    /** Enable strict mode rules */
    strict?: any;

    /** Enable formatting rules */
    format?: any;
  };
  'quality/prettier': {

    /** Add semicolons at the end of statements */
    semi?: any;

    /** Use single quotes instead of double quotes */
    singleQuote?: any;

    /** Number of spaces per indentation level */
    tabWidth?: any;

    /** Use tabs instead of spaces for indentation */
    useTabs?: any;

    /** Print trailing commas where valid in ES5 */
    trailingComma?: any;

    /** Wrap lines that exceed this length */
    printWidth?: any;

    /** Print spaces between brackets in object literals */
    bracketSpacing?: any;

    /** Include parentheses around a sole arrow function parameter */
    arrowParens?: any;

    /** Line ending style */
    endOfLine?: any;

    /** Prettier plugins to use */
    plugins?: any;

    /** Enable Tailwind CSS class sorting plugin */
    tailwind?: any;

    /** Enable import organization */
    organizeImports?: any;
  };
  'services/github-api': {

    /** GitHub Personal Access Token or OAuth access token */
    token: any;

    /** GitHub API base URL (for GitHub Enterprise) */
    baseUrl?: any;

    /** User agent string for API requests */
    userAgent?: any;
  };
  'state/zustand': {

    /** Enable state persistence */
    persistence?: any;

    /** Enable Redux DevTools */
    devtools?: any;

    /** Enable Immer for immutable updates */
    immer?: any;

    /** Middleware to use */
    middleware?: any;
  };
  'testing/vitest': {

    /** Test environment */
    environment?: any;
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
    theme?: any;

    /** Components to install (comprehensive set by default) */
    components?: any;
  };
  'ui/tailwind': {

    /** Enable @tailwindcss/typography plugin */
    typography?: any;

    /** Enable @tailwindcss/forms plugin */
    forms?: any;

    /** Enable @tailwindcss/aspect-ratio plugin */
    aspectRatio?: any;

    /** Enable dark mode support */
    darkMode?: any;
  };
  'connectors/better-auth-github': {

    /** GitHub OAuth App Client ID */
    clientId: any;

    /** GitHub OAuth App Client Secret */
    clientSecret: any;

    /** OAuth redirect URI */
    redirectUri: any;

    /** GitHub OAuth scopes */
    scopes?: any;

    /** Encryption key for storing tokens securely */
    encryptionKey: any;
  };
  'connectors/rhf-zod-shadcn': {

    /** Zod schema validation */
    validation?: any;

    /** Form accessibility features */
    accessibility?: any;

    /** React Hook Form DevTools */
    devtools?: any;
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
    ssr?: any;

    /** Client-side hydration support */
    hydration?: any;

    /** Error boundary for query errors */
    errorBoundary?: any;

    /** TanStack Query DevTools integration */
    devtools?: any;
  };
  'connectors/zustand-nextjs': {

    /** State persistence support */
    persistence?: any;

    /** Zustand DevTools integration */
    devtools?: any;

    /** Server-side rendering support */
    ssr?: any;
  };
  'features/ai-chat/backend/vercel-ai-nextjs': {

    /** Real-time message streaming */
    streaming?: any;

    /** File upload capabilities */
    fileUpload?: any;

    /** Voice input capabilities */
    voiceInput?: any;

    /** Voice output capabilities */
    voiceOutput?: any;

    /** Chat export and import capabilities */
    exportImport?: any;
  };
  'features/ai-chat/frontend/shadcn': {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Essential chat functionality (interface, message history) */
    core?: boolean;

    /** File upload and media support */
    media?: boolean;

    /** Voice input and output */
    voice?: boolean;

    /** Advanced features (custom prompts, export/import) */
    advanced?: boolean;
  };

    /** UI theme variant */
    theme?: any;
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
    customTitle?: any;

    /** Custom welcome page description */
    customDescription?: any;

    /** Primary color theme for the welcome page */
    primaryColor?: any;

    /** Show technology stack visualization */
    showTechStack?: any;

    /** Show interactive component library showcase */
    showComponents?: any;

    /** Show project structure and architecture */
    showProjectStructure?: any;

    /** Show quick start guide */
    showQuickStart?: any;

    /** Show Architech branding and links */
    showArchitechBranding?: any;
  };
  'features/auth/backend/better-auth-nextjs': {

    /** Next.js API routes for authentication endpoints */
    apiRoutes?: any;

    /** Next.js middleware for authentication and route protection */
    middleware?: any;

    /** Admin API routes for user management */
    adminPanel?: any;

    /** Email verification API routes and components */
    emailVerification?: any;

    /** MFA API routes and components */
    mfa?: any;

    /** Password reset API routes and components */
    passwordReset?: any;
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
    theme?: any;
  };
  'features/email/react-email-templates': {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Core email templates (welcome, notifications) */
    core?: boolean;

    /** Authentication email templates (password reset, verification, 2FA) */
    auth?: boolean;

    /** Payment email templates (confirmation, receipts) */
    payments?: boolean;

    /** Organization email templates (invitations, updates) */
    organizations?: boolean;
  };

    /** Primary brand color for email templates */
    brandColor?: any;

    /** URL to company logo for email headers */
    logo?: any;
  };
  'features/emailing/backend/resend-nextjs': {

    /** Bulk email sending capabilities */
    bulkEmail?: any;

    /** Email template management */
    templates?: any;

    /** Email delivery and engagement analytics */
    analytics?: any;

    /** Email event webhooks */
    webhooks?: any;

    /** Enable organization-scoped email management */
    organizations?: any;

    /** Enable team-scoped email management */
    teams?: any;
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
    theme?: any;
  };
  'features/graph-visualizer/shadcn': {

    /** Backend implementation for graph data management */
    backend?: any;

    /** Frontend implementation for graph visualization */
    frontend?: any;
  /** Constitutional Architecture features configuration */
  features?: {

    /** Enable interactive graph functionality */
    interactiveGraph?: boolean;

    /** Enable different node types */
    nodeTypes?: boolean;

    /** Enable minimap navigation */
    minimap?: boolean;

    /** Enable graph export functionality */
    export?: boolean;

    /** Enable different edge types */
    edgeTypes?: boolean;

    /** Enable graph controls */
    controls?: boolean;

    /** Enable background grid */
    background?: boolean;

    /** Enable node/edge selection */
    selection?: boolean;

    /** Enable node dragging */
    dragging?: boolean;

    /** Enable zoom functionality */
    zooming?: boolean;

    /** Enable pan functionality */
    panning?: boolean;

    /** Enable graph import functionality */
    import?: boolean;
  };
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
    environments?: any;
  };
  'features/observability/sentry-shadcn': {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Main Sentry dashboard with overview */
    dashboard?: boolean;

    /** Browse and filter captured errors */
    errorBrowser?: boolean;

    /** Performance metrics and charts */
    performance?: boolean;

    /** Alert configuration UI */
    alerts?: boolean;
  };

    /** Path to mount the Sentry dashboard */
    dashboardPath?: any;

    /** Auto-refresh interval (ms) for dashboard data */
    refreshInterval?: any;
  };
  'features/payments/backend/stripe-nextjs': {

    /** Stripe webhook handlers for payment events */
    webhooks?: any;

    /** Stripe Checkout integration for payments */
    checkout?: any;

    /** Subscription management and billing */
    subscriptions?: any;

    /** Invoice generation and management */
    invoices?: any;

    /** Refund processing and management */
    refunds?: any;

    /** Payment methods management */
    paymentMethods?: any;

    /** Payment analytics and reporting */
    analytics?: any;

    /** Organization-level billing features */
    organizationBilling?: any;
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
    theme?: any;
  };
  'features/project-management/shadcn': {

    /** UI theme variant */
    theme?: any;
  /** Constitutional Architecture features configuration */
  features?: {

    /** Enable kanban board functionality */
    kanban?: boolean;

    /** Enable timeline view */
    timeline?: boolean;

    /** Enable sprint management */
    sprint?: boolean;

    /** Enable kanban board functionality */
    kanbanBoard?: boolean;

    /** Enable task creation */
    taskCreation?: boolean;

    /** Enable task management */
    taskManagement?: boolean;

    /** Enable project organization */
    projectOrganization?: boolean;

    /** Enable team collaboration */
    teamCollaboration?: boolean;

    /** Enable basic analytics */
    basicAnalytics?: boolean;
  };
  };
  'features/repo-analyzer/shadcn': {

    /** Enable visual architecture diagram */
    enableVisualization?: any;

    /** Enable genome export functionality */
    enableExport?: any;

    /** Minimum confidence threshold for suggestions */
    confidenceThreshold?: any;
  };
  'features/social-profile/shadcn': {

    /** Backend implementation for social profile */
    backend?: any;

    /** Frontend implementation for social profile UI */
    frontend?: any;
  /** Constitutional Architecture features configuration */
  features?: {

    /** Enable wallet profile features */
    walletProfile?: boolean;

    /** Enable Web3 social features */
    web3Social?: boolean;

    /** Enable achievements and badges */
    achievements?: boolean;

    /** Enable profile management */
    profileManagement?: boolean;

    /** Enable social connections */
    socialConnections?: boolean;

    /** Enable activity feeds */
    activityFeeds?: boolean;

    /** Enable notifications */
    notifications?: boolean;

    /** Enable privacy controls */
    privacyControls?: boolean;

    /** Enable social settings */
    socialSettings?: boolean;

    /** Enable avatar upload */
    avatarUpload?: boolean;

    /** Enable user blocking */
    blocking?: boolean;

    /** Enable user reporting */
    reporting?: boolean;
  };
  };
  'features/teams-management/backend/better-auth-nextjs': {

    /** Team invitation system */
    invites?: any;

    /** Granular role-based permissions */
    permissions?: any;

    /** Team performance analytics */
    analytics?: any;

    /** Team billing and subscription management */
    billing?: any;
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
    theme?: any;
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
    theme?: any;
  };
};

// Discriminated union for better IDE support
export type TypedGenomeModule = 
  | { id: 'ai/vercel-ai-sdk'; parameters?: {

    /** AI providers to include */
    providers?: any;
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
    defaultModel?: any;

    /** Maximum tokens for generation */
    maxTokens?: any;

    /** Temperature for generation */
    temperature?: any;
  }; }
  | { id: 'auth/better-auth'; parameters?: {

    /** Authentication providers to enable */
    providers?: any;

    /** Session management strategy */
    session?: any;

    /** Enable CSRF protection */
    csrf?: any;

    /** Enable rate limiting */
    rateLimit?: any;
  }; }
  | { id: 'blockchain/web3'; parameters?: {

    /** Supported blockchain networks */
    networks?: any;

    /** Enable WalletConnect support */
    walletConnect?: any;

    /** Smart contract addresses */
    contracts?: any;
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
    locales?: any;

    /** Default locale */
    defaultLocale?: any;

    /** Enable locale-based routing */
    routing?: any;

    /** Enable SEO optimization */
    seo?: any;
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
    zod?: any;

    /** Enable React Hook Form for form handling */
    reactHookForm?: any;

    /** Enable @hookform/resolvers for Zod integration */
    resolvers?: any;

    /** Enable accessibility features */
    accessibility?: any;

    /** Enable React Hook Form DevTools */
    devtools?: any;
  }; }
  | { id: 'core/git'; parameters?: {

    /** Git user name for commits */
    userName?: any;

    /** Git user email for commits */
    userEmail?: any;

    /** Default branch name for new repositories */
    defaultBranch?: any;

    /** Automatically initialize git repository after project creation */
    autoInit?: any;
  }; }
  | { id: 'data-fetching/tanstack-query'; parameters?: {

    /** Enable TanStack Query DevTools */
    devtools?: any;

    /** Default query and mutation options */
    defaultOptions?: any;

    /** Enable Suspense mode for queries */
    suspense?: any;
  }; }
  | { id: 'database/drizzle'; parameters?: {

    /** Database provider */
    provider?: any;

    /** Database type to use */
    databaseType?: any;
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
    provider?: any;

    /** Enable Prisma Studio */
    studio?: any;

    /** Enable database migrations */
    migrations?: any;

    /** Database type */
    databaseType?: any;
  }; }
  | { id: 'database/sequelize'; parameters?: {

    /** Database host */
    host?: any;

    /** Database port */
    port?: any;

    /** Database username */
    username?: any;

    /** Database password */
    password?: any;

    /** Database name */
    databaseName?: any;

    /** Enable SQL logging */
    logging?: any;

    /** Enable connection pooling */
    pool?: any;

    /** Database type */
    databaseType?: any;
  }; }
  | { id: 'database/typeorm'; parameters?: {

    /** Enable schema synchronization */
    synchronize?: any;

    /** Enable query logging */
    logging?: any;

    /** Database type */
    databaseType?: any;
  }; }
  | { id: 'deployment/docker'; parameters?: {

    /** Node.js version for Docker image */
    nodeVersion?: any;

    /** Enable production optimizations */
    optimization?: any;

    /** Enable health check endpoint */
    healthCheck?: any;
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
    framework?: any;

    /** Build command to run */
    buildCommand?: any;

    /** Output directory for build */
    outputDirectory?: any;

    /** Install command */
    installCommand?: any;

    /** Development command */
    devCommand?: any;

    /** Environment variables to configure */
    envVars?: any;

    /** Serverless function configuration */
    functions: any;

    /** Enable Vercel Analytics */
    analytics?: any;

    /** Enable Vercel Speed Insights */
    speedInsights?: any;
  }; }
  | { id: 'email/resend'; parameters?: {

    /** Resend API key */
    apiKey?: any;

    /** Default from email address */
    fromEmail?: any;
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
    typescript?: any;

    /** Enable Tailwind CSS */
    tailwind?: any;

    /** Enable ESLint */
    eslint?: any;

    /** Use App Router (recommended) */
    appRouter?: any;

    /** Use src/ directory */
    srcDir?: any;

    /** Import alias for absolute imports */
    importAlias?: any;

    /** React version to use (18 for Radix UI compatibility, 19 for latest, or specify exact version like '18.2.0') */
    reactVersion?: any;
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
    dsn?: any;

    /** Environment name */
    environment?: any;
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
    release?: any;
  }; }
  | { id: 'payment/stripe'; parameters?: {

    /** Default currency for payments */
    currency?: any;

    /** Stripe mode (test or live) */
    mode?: any;

    /** Enable webhook handling */
    webhooks?: any;

    /** Enable Stripe Dashboard integration */
    dashboard?: any;
  }; }
  | { id: 'quality/eslint'; parameters?: {

    /** Enable TypeScript support */
    typescript?: any;

    /** Enable React support */
    react?: any;

    /** Enable Next.js specific rules */
    nextjs?: any;

    /** Enable Node.js specific rules */
    nodejs?: any;

    /** Enable accessibility rules */
    accessibility?: any;

    /** Enable import/export rules */
    imports?: any;

    /** Enable strict mode rules */
    strict?: any;

    /** Enable formatting rules */
    format?: any;
  }; }
  | { id: 'quality/prettier'; parameters?: {

    /** Add semicolons at the end of statements */
    semi?: any;

    /** Use single quotes instead of double quotes */
    singleQuote?: any;

    /** Number of spaces per indentation level */
    tabWidth?: any;

    /** Use tabs instead of spaces for indentation */
    useTabs?: any;

    /** Print trailing commas where valid in ES5 */
    trailingComma?: any;

    /** Wrap lines that exceed this length */
    printWidth?: any;

    /** Print spaces between brackets in object literals */
    bracketSpacing?: any;

    /** Include parentheses around a sole arrow function parameter */
    arrowParens?: any;

    /** Line ending style */
    endOfLine?: any;

    /** Prettier plugins to use */
    plugins?: any;

    /** Enable Tailwind CSS class sorting plugin */
    tailwind?: any;

    /** Enable import organization */
    organizeImports?: any;
  }; }
  | { id: 'services/github-api'; parameters?: {

    /** GitHub Personal Access Token or OAuth access token */
    token: any;

    /** GitHub API base URL (for GitHub Enterprise) */
    baseUrl?: any;

    /** User agent string for API requests */
    userAgent?: any;
  }; }
  | { id: 'state/zustand'; parameters?: {

    /** Enable state persistence */
    persistence?: any;

    /** Enable Redux DevTools */
    devtools?: any;

    /** Enable Immer for immutable updates */
    immer?: any;

    /** Middleware to use */
    middleware?: any;
  }; }
  | { id: 'testing/vitest'; parameters?: {

    /** Test environment */
    environment?: any;
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
    theme?: any;

    /** Components to install (comprehensive set by default) */
    components?: any;
  }; }
  | { id: 'ui/tailwind'; parameters?: {

    /** Enable @tailwindcss/typography plugin */
    typography?: any;

    /** Enable @tailwindcss/forms plugin */
    forms?: any;

    /** Enable @tailwindcss/aspect-ratio plugin */
    aspectRatio?: any;

    /** Enable dark mode support */
    darkMode?: any;
  }; }
  | { id: 'connectors/better-auth-github'; parameters?: {

    /** GitHub OAuth App Client ID */
    clientId: any;

    /** GitHub OAuth App Client Secret */
    clientSecret: any;

    /** OAuth redirect URI */
    redirectUri: any;

    /** GitHub OAuth scopes */
    scopes?: any;

    /** Encryption key for storing tokens securely */
    encryptionKey: any;
  }; }
  | { id: 'connectors/rhf-zod-shadcn'; parameters?: {

    /** Zod schema validation */
    validation?: any;

    /** Form accessibility features */
    accessibility?: any;

    /** React Hook Form DevTools */
    devtools?: any;
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
    ssr?: any;

    /** Client-side hydration support */
    hydration?: any;

    /** Error boundary for query errors */
    errorBoundary?: any;

    /** TanStack Query DevTools integration */
    devtools?: any;
  }; }
  | { id: 'connectors/zustand-nextjs'; parameters?: {

    /** State persistence support */
    persistence?: any;

    /** Zustand DevTools integration */
    devtools?: any;

    /** Server-side rendering support */
    ssr?: any;
  }; }
  | { id: 'features/ai-chat/backend/vercel-ai-nextjs'; parameters?: {

    /** Real-time message streaming */
    streaming?: any;

    /** File upload capabilities */
    fileUpload?: any;

    /** Voice input capabilities */
    voiceInput?: any;

    /** Voice output capabilities */
    voiceOutput?: any;

    /** Chat export and import capabilities */
    exportImport?: any;
  }; }
  | { id: 'features/ai-chat/frontend/shadcn'; parameters?: {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Essential chat functionality (interface, message history) */
    core?: boolean;

    /** File upload and media support */
    media?: boolean;

    /** Voice input and output */
    voice?: boolean;

    /** Advanced features (custom prompts, export/import) */
    advanced?: boolean;
  };

    /** UI theme variant */
    theme?: any;
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
    customTitle?: any;

    /** Custom welcome page description */
    customDescription?: any;

    /** Primary color theme for the welcome page */
    primaryColor?: any;

    /** Show technology stack visualization */
    showTechStack?: any;

    /** Show interactive component library showcase */
    showComponents?: any;

    /** Show project structure and architecture */
    showProjectStructure?: any;

    /** Show quick start guide */
    showQuickStart?: any;

    /** Show Architech branding and links */
    showArchitechBranding?: any;
  }; }
  | { id: 'features/auth/backend/better-auth-nextjs'; parameters?: {

    /** Next.js API routes for authentication endpoints */
    apiRoutes?: any;

    /** Next.js middleware for authentication and route protection */
    middleware?: any;

    /** Admin API routes for user management */
    adminPanel?: any;

    /** Email verification API routes and components */
    emailVerification?: any;

    /** MFA API routes and components */
    mfa?: any;

    /** Password reset API routes and components */
    passwordReset?: any;
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
    theme?: any;
  }; }
  | { id: 'features/email/react-email-templates'; parameters?: {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Core email templates (welcome, notifications) */
    core?: boolean;

    /** Authentication email templates (password reset, verification, 2FA) */
    auth?: boolean;

    /** Payment email templates (confirmation, receipts) */
    payments?: boolean;

    /** Organization email templates (invitations, updates) */
    organizations?: boolean;
  };

    /** Primary brand color for email templates */
    brandColor?: any;

    /** URL to company logo for email headers */
    logo?: any;
  }; }
  | { id: 'features/emailing/backend/resend-nextjs'; parameters?: {

    /** Bulk email sending capabilities */
    bulkEmail?: any;

    /** Email template management */
    templates?: any;

    /** Email delivery and engagement analytics */
    analytics?: any;

    /** Email event webhooks */
    webhooks?: any;

    /** Enable organization-scoped email management */
    organizations?: any;

    /** Enable team-scoped email management */
    teams?: any;
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
    theme?: any;
  }; }
  | { id: 'features/graph-visualizer/shadcn'; parameters?: {

    /** Backend implementation for graph data management */
    backend?: any;

    /** Frontend implementation for graph visualization */
    frontend?: any;
  /** Constitutional Architecture features configuration */
  features?: {

    /** Enable interactive graph functionality */
    interactiveGraph?: boolean;

    /** Enable different node types */
    nodeTypes?: boolean;

    /** Enable minimap navigation */
    minimap?: boolean;

    /** Enable graph export functionality */
    export?: boolean;

    /** Enable different edge types */
    edgeTypes?: boolean;

    /** Enable graph controls */
    controls?: boolean;

    /** Enable background grid */
    background?: boolean;

    /** Enable node/edge selection */
    selection?: boolean;

    /** Enable node dragging */
    dragging?: boolean;

    /** Enable zoom functionality */
    zooming?: boolean;

    /** Enable pan functionality */
    panning?: boolean;

    /** Enable graph import functionality */
    import?: boolean;
  };
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
    environments?: any;
  }; }
  | { id: 'features/observability/sentry-shadcn'; parameters?: {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Main Sentry dashboard with overview */
    dashboard?: boolean;

    /** Browse and filter captured errors */
    errorBrowser?: boolean;

    /** Performance metrics and charts */
    performance?: boolean;

    /** Alert configuration UI */
    alerts?: boolean;
  };

    /** Path to mount the Sentry dashboard */
    dashboardPath?: any;

    /** Auto-refresh interval (ms) for dashboard data */
    refreshInterval?: any;
  }; }
  | { id: 'features/payments/backend/stripe-nextjs'; parameters?: {

    /** Stripe webhook handlers for payment events */
    webhooks?: any;

    /** Stripe Checkout integration for payments */
    checkout?: any;

    /** Subscription management and billing */
    subscriptions?: any;

    /** Invoice generation and management */
    invoices?: any;

    /** Refund processing and management */
    refunds?: any;

    /** Payment methods management */
    paymentMethods?: any;

    /** Payment analytics and reporting */
    analytics?: any;

    /** Organization-level billing features */
    organizationBilling?: any;
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
    theme?: any;
  }; }
  | { id: 'features/project-management/shadcn'; parameters?: {

    /** UI theme variant */
    theme?: any;
  /** Constitutional Architecture features configuration */
  features?: {

    /** Enable kanban board functionality */
    kanban?: boolean;

    /** Enable timeline view */
    timeline?: boolean;

    /** Enable sprint management */
    sprint?: boolean;

    /** Enable kanban board functionality */
    kanbanBoard?: boolean;

    /** Enable task creation */
    taskCreation?: boolean;

    /** Enable task management */
    taskManagement?: boolean;

    /** Enable project organization */
    projectOrganization?: boolean;

    /** Enable team collaboration */
    teamCollaboration?: boolean;

    /** Enable basic analytics */
    basicAnalytics?: boolean;
  };
  }; }
  | { id: 'features/repo-analyzer/shadcn'; parameters?: {

    /** Enable visual architecture diagram */
    enableVisualization?: any;

    /** Enable genome export functionality */
    enableExport?: any;

    /** Minimum confidence threshold for suggestions */
    confidenceThreshold?: any;
  }; }
  | { id: 'features/social-profile/shadcn'; parameters?: {

    /** Backend implementation for social profile */
    backend?: any;

    /** Frontend implementation for social profile UI */
    frontend?: any;
  /** Constitutional Architecture features configuration */
  features?: {

    /** Enable wallet profile features */
    walletProfile?: boolean;

    /** Enable Web3 social features */
    web3Social?: boolean;

    /** Enable achievements and badges */
    achievements?: boolean;

    /** Enable profile management */
    profileManagement?: boolean;

    /** Enable social connections */
    socialConnections?: boolean;

    /** Enable activity feeds */
    activityFeeds?: boolean;

    /** Enable notifications */
    notifications?: boolean;

    /** Enable privacy controls */
    privacyControls?: boolean;

    /** Enable social settings */
    socialSettings?: boolean;

    /** Enable avatar upload */
    avatarUpload?: boolean;

    /** Enable user blocking */
    blocking?: boolean;

    /** Enable user reporting */
    reporting?: boolean;
  };
  }; }
  | { id: 'features/teams-management/backend/better-auth-nextjs'; parameters?: {

    /** Team invitation system */
    invites?: any;

    /** Granular role-based permissions */
    permissions?: any;

    /** Team performance analytics */
    analytics?: any;

    /** Team billing and subscription management */
    billing?: any;
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
    theme?: any;
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
    theme?: any;
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
