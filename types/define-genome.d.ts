/**
 * Define Genome with Full Type Safety
 * 
 * This function provides complete type safety for genome definitions,
 * including autocompletion for module IDs and parameter validation.
 */

import { Genome } from '@thearchitech.xyz/types';

// Generated ModuleId union type
export type ModuleId = 'ai/vercel-ai-sdk' | 'auth/better-auth' | 'blockchain/web3' | 'content/next-intl' | 'core/dependencies' | 'core/forms' | 'core/git' | 'data-fetching/tanstack-query' | 'database/drizzle' | 'database/prisma' | 'database/sequelize' | 'database/typeorm' | 'deployment/docker' | 'deployment/vercel' | 'email/resend' | 'framework/nextjs' | 'observability/sentry' | 'payment/stripe' | 'quality/eslint' | 'quality/prettier' | 'services/github-api' | 'state/zustand' | 'testing/vitest' | 'ui/shadcn-ui' | 'ui/tailwind' | 'connectors/better-auth-github' | 'connectors/docker-drizzle' | 'connectors/docker-nextjs' | 'connectors/rhf-zod-shadcn' | 'connectors/sentry/nextjs' | 'connectors/sentry/react' | 'connectors/sentry-nextjs' | 'connectors/stripe/nextjs-drizzle' | 'connectors/tanstack-query-nextjs' | 'connectors/vitest-nextjs' | 'connectors/zustand-nextjs' | 'features/ai-chat/backend/vercel-ai-nextjs' | 'features/ai-chat/frontend/shadcn' | 'features/architech-welcome/shadcn' | 'features/auth/backend/better-auth-nextjs' | 'features/auth/frontend/shadcn' | 'features/email/react-email-templates' | 'features/emailing/backend/resend-nextjs' | 'features/emailing/frontend/shadcn' | 'features/graph-visualizer/shadcn' | 'features/monitoring/shadcn' | 'features/observability/sentry-shadcn' | 'features/payments/backend/stripe-nextjs' | 'features/payments/frontend/shadcn' | 'features/project-management/shadcn' | 'features/repo-analyzer/shadcn' | 'features/social-profile/shadcn' | 'features/teams-management/backend/better-auth-nextjs' | 'features/teams-management/frontend/shadcn' | 'features/web3/shadcn';

export type ModuleParameters = {
  'ai/vercel-ai-sdk': {

    /** AI providers to include */
    providers: string[];
  /** Constitutional Architecture features configuration */
  features?: {

    /** Essential AI functionality (chat, text generation) */
    core: boolean;

    /** Real-time streaming responses */
    streaming: boolean;

    /** Advanced AI features (image generation, embeddings, function calling) */
    advanced: boolean;

    /** Enterprise features (caching, edge runtime, tool use) */
    enterprise: boolean;
  };

    /** Default AI model */
    defaultModel: 'gpt-3.5-turbo' | 'gpt-4' | 'gpt-4-turbo' | 'claude-3-sonnet' | 'claude-3-opus';

    /** Maximum tokens for generation */
    maxTokens: number;

    /** Temperature for generation */
    temperature: number;
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
    networks: string[];

    /** Enable WalletConnect support */
    walletConnect?: boolean;

    /** Smart contract addresses */
    contracts?: string[];
  };
  'content/next-intl': {

    /** Supported locales */
    locales: string[];

    /** Default locale */
    defaultLocale: string;

    /** Enable locale-based routing */
    routing?: boolean;

    /** Enable SEO optimization */
    seo?: boolean;
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
  };
  'database/drizzle': {

    /** Database provider */
    provider?: 'neon' | 'planetscale' | 'supabase' | 'local';

    /** Database type to use */
    databaseType: 'postgresql' | 'mysql' | 'sqlite';
  /** Constitutional Architecture features configuration */
  features?: {

    /** Essential database functionality (schema, queries, types) */
    core: boolean;

    /** Database schema migrations and versioning */
    migrations: boolean;

    /** Visual database browser and query interface */
    studio: boolean;

    /** Advanced relationship management and queries */
    relations: boolean;

    /** Data seeding and fixtures management */
    seeding: boolean;
  };
  };
  'database/prisma': {

    /** Database provider */
    provider: 'postgresql' | 'mysql' | 'sqlite' | 'mongodb';

    /** Enable Prisma Studio */
    studio?: boolean;

    /** Enable database migrations */
    migrations?: boolean;

    /** Database type */
    databaseType: 'postgresql' | 'mysql' | 'sqlite' | 'mongodb';
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
    databaseName: string;

    /** Enable SQL logging */
    logging?: boolean;

    /** Enable connection pooling */
    pool?: boolean;

    /** Database type */
    databaseType: 'postgresql' | 'mysql' | 'sqlite' | 'mariadb' | 'mssql';
  };
  'database/typeorm': {

    /** Enable schema synchronization */
    synchronize?: boolean;

    /** Enable query logging */
    logging?: boolean;

    /** Database type */
    databaseType: 'postgresql' | 'mysql' | 'sqlite' | 'mongodb';
  };
  'deployment/docker': {

    /** Node.js version for Docker image */
    nodeVersion?: string;

    /** Enable production optimizations */
    optimization?: boolean;

    /** Enable health check endpoint */
    healthCheck?: boolean;
  };
  'deployment/vercel': {

    /** Target framework */
    framework: 'nextjs' | 'react' | 'vue' | 'svelte' | 'angular';

    /** Build command to run */
    buildCommand: string;

    /** Output directory for build */
    outputDirectory: string;

    /** Install command */
    installCommand: string;

    /** Development command */
    devCommand: string;

    /** Environment variables to configure */
    envVars: string[];

    /** Serverless function configuration */
    functions: Record<string, any>;
  };
  'email/resend': {

    /** Resend API key */
    apiKey: string;

    /** Default from email address */
    fromEmail: string;
  /** Constitutional Architecture features configuration */
  features?: {

    /** Essential email functionality (sending, basic templates) */
    core: boolean;

    /** Advanced email template system */
    templates: boolean;

    /** Email analytics and tracking */
    analytics: boolean;

    /** Batch sending and campaign management */
    campaigns: boolean;
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
  };
  'observability/sentry': {

    /** Sentry DSN */
    dsn: string;

    /** Environment name */
    environment?: string;
  /** Constitutional Architecture features configuration */
  features?: {

    /** Essential monitoring (error tracking, basic performance) */
    core: boolean;

    /** Advanced performance monitoring */
    performance: boolean;

    /** Custom alerts and dashboard */
    alerts: boolean;

    /** Enterprise features (profiling, custom metrics) */
    enterprise: boolean;
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
    core: boolean;

    /** Code coverage reporting */
    coverage: boolean;

    /** Interactive test runner UI */
    ui: boolean;

    /** End-to-end testing support */
    e2e: boolean;
  };
  };
  'ui/shadcn-ui': {

    /** Components to install (comprehensive set by default) */
    components?: Array<'button' | 'input' | 'card' | 'dialog' | 'form' | 'table' | 'badge' | 'avatar' | 'dropdown-menu' | 'sonner' | 'sheet' | 'tabs' | 'accordion' | 'carousel' | 'calendar' | 'date-picker' | 'alert-dialog' | 'checkbox' | 'collapsible' | 'context-menu' | 'hover-card' | 'menubar' | 'navigation-menu' | 'popover' | 'progress' | 'radio-group' | 'scroll-area' | 'slider' | 'toggle' | 'toggle-group'>;
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
    validation: boolean;

    /** Form accessibility features */
    accessibility: boolean;

    /** React Hook Form DevTools */
    devtools: boolean;
  };
  'connectors/stripe/nextjs-drizzle': {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Enable organization-level billing features */
    organizationBilling: boolean;

    /** Enable seat-based billing */
    seatManagement: boolean;

    /** Enable usage-based billing tracking */
    usageTracking: boolean;

    /** Enable Stripe webhook handling */
    webhooks: boolean;
  };
  };
  'connectors/tanstack-query-nextjs': {

    /** SSR support for TanStack Query */
    ssr: boolean;

    /** Client-side hydration support */
    hydration: boolean;

    /** Error boundary for query errors */
    errorBoundary: boolean;

    /** TanStack Query DevTools integration */
    devtools: boolean;
  };
  'connectors/zustand-nextjs': {

    /** State persistence support */
    persistence: boolean;

    /** Zustand DevTools integration */
    devtools: boolean;

    /** Server-side rendering support */
    ssr: boolean;
  };
  'features/ai-chat/backend/vercel-ai-nextjs': {

    /** Real-time message streaming */
    streaming: boolean;

    /** File upload capabilities */
    fileUpload: boolean;

    /** Voice input capabilities */
    voiceInput: boolean;

    /** Voice output capabilities */
    voiceOutput: boolean;

    /** Chat export and import capabilities */
    exportImport: boolean;
  };
  'features/ai-chat/frontend/shadcn': {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Essential chat functionality (interface, message history) */
    core: boolean;

    /** File upload and media support */
    media: boolean;

    /** Voice input and output */
    voice: boolean;

    /** Advanced features (custom prompts, export/import) */
    advanced: boolean;
  };

    /** UI theme variant */
    theme?: 'default' | 'dark' | 'light' | 'minimal';
  };
  'features/architech-welcome/shadcn': {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Show technology stack visualization */
    techStack: boolean;

    /** Show interactive component library showcase */
    componentShowcase: boolean;

    /** Show project structure and architecture */
    projectStructure: boolean;

    /** Show quick start guide */
    quickStart: boolean;

    /** Show Architech branding and links */
    architechBranding: boolean;
  };

    /** Custom welcome page title */
    customTitle: string;

    /** Custom welcome page description */
    customDescription: string;

    /** Primary color theme for the welcome page */
    primaryColor: string;
  };
  'features/auth/backend/better-auth-nextjs': {

    /** Next.js API routes for authentication endpoints */
    apiRoutes: boolean;

    /** Next.js middleware for authentication and route protection */
    middleware: boolean;

    /** Admin API routes for user management */
    adminPanel: boolean;

    /** Email verification API routes and components */
    emailVerification: boolean;

    /** MFA API routes and components */
    mfa: boolean;

    /** Password reset API routes and components */
    passwordReset: boolean;
  };
  'features/auth/frontend/shadcn': {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Enables password reset functionality (forms and pages) */
    passwordReset: boolean;

    /** Enables Multi-Factor Authentication setup and verification */
    mfa: boolean;

    /** Enables UI for Google, GitHub, etc. logins */
    socialLogins: boolean;

    /** Generates a full page for managing account settings */
    accountSettingsPage: boolean;

    /** Enables advanced profile management features */
    profileManagement: boolean;
  };

    /** UI theme variant */
    theme?: 'default' | 'dark' | 'light' | 'minimal';
  };
  'features/email/react-email-templates': {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Core email templates (welcome, notifications) */
    core: boolean;

    /** Authentication email templates (password reset, verification, 2FA) */
    auth: boolean;

    /** Payment email templates (confirmation, receipts) */
    payments: boolean;

    /** Organization email templates (invitations, updates) */
    organizations: boolean;
  };

    /** Primary brand color for email templates */
    brandColor: string;

    /** URL to company logo for email headers */
    logo: string;
  };
  'features/emailing/backend/resend-nextjs': {

    /** Bulk email sending capabilities */
    bulkEmail: boolean;

    /** Email template management */
    templates: boolean;

    /** Email delivery and engagement analytics */
    analytics: boolean;

    /** Email event webhooks */
    webhooks: boolean;

    /** Enable organization-scoped email management */
    organizations: boolean;

    /** Enable team-scoped email management */
    teams: boolean;
  };
  'features/emailing/frontend/shadcn': {
  /** Constitutional Architecture features configuration */
  features?: {

    type: boolean;

    default: boolean;

    description: boolean;

    required: boolean;
  };

    /** UI theme variant */
    theme?: 'default' | 'dark' | 'light' | 'minimal';
  };
  'features/graph-visualizer/shadcn': {

    /** Backend implementation for graph data management */
    backend: any;

    /** Frontend implementation for graph visualization */
    frontend: any;
  /** Constitutional Architecture features configuration */
  features?: {

    type: boolean;

    default: boolean;

    description: boolean;

    required: boolean;
  };
  };
  'features/monitoring/shadcn': {

    /** Backend implementation for monitoring services */
    backend: any;

    /** Frontend implementation for monitoring UI */
    frontend: any;
  /** Constitutional Architecture features configuration */
  features?: {

    /** Essential monitoring (error tracking, basic performance) */
    core: boolean;

    /** Advanced performance monitoring */
    performance: boolean;

    /** User feedback collection */
    feedback: boolean;

    /** Monitoring analytics and reporting */
    analytics: boolean;
  };

    /** Environments to monitor */
    environments?: string[];
  };
  'features/observability/sentry-shadcn': {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Main Sentry dashboard with overview */
    dashboard: boolean;

    /** Browse and filter captured errors */
    errorBrowser: boolean;

    /** Performance metrics and charts */
    performance: boolean;

    /** Alert configuration UI */
    alerts: boolean;
  };

    /** Path to mount the Sentry dashboard */
    dashboardPath: string;

    /** Auto-refresh interval (ms) for dashboard data */
    refreshInterval: number;
  };
  'features/payments/backend/stripe-nextjs': {

    /** Stripe webhook handlers for payment events */
    webhooks: boolean;

    /** Stripe Checkout integration for payments */
    checkout: boolean;

    /** Subscription management and billing */
    subscriptions: boolean;

    /** Invoice generation and management */
    invoices: boolean;

    /** Refund processing and management */
    refunds: boolean;
  };
  'features/payments/frontend/shadcn': {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Essential payment functionality (forms, checkout, transactions) */
    core: boolean;

    /** Subscription management and billing */
    subscriptions: boolean;

    /** Invoice generation and management */
    invoicing: boolean;

    /** Payment webhook handling */
    webhooks: boolean;

    /** Payment analytics and reporting */
    analytics: boolean;
  };

    /** UI theme variant */
    theme?: 'default' | 'dark' | 'light' | 'minimal';
  };
  'features/project-management/shadcn': {

    /** UI theme variant */
    theme?: 'default' | 'dark' | 'light';
  /** Constitutional Architecture features configuration */
  features?: {

    type: boolean;

    default: boolean;

    description: boolean;

    required: boolean;
  };
  };
  'features/repo-analyzer/shadcn': {

    /** Enable visual architecture diagram */
    enableVisualization?: boolean;

    /** Enable genome export functionality */
    enableExport?: boolean;

    /** Minimum confidence threshold for suggestions */
    confidenceThreshold?: number;
  };
  'features/social-profile/shadcn': {

    /** Backend implementation for social profile */
    backend: any;

    /** Frontend implementation for social profile UI */
    frontend: any;
  /** Constitutional Architecture features configuration */
  features?: {

    type: boolean;

    default: boolean;

    description: boolean;

    required: boolean;
  };
  };
  'features/teams-management/backend/better-auth-nextjs': {

    /** Team invitation system */
    invites: boolean;

    /** Granular role-based permissions */
    permissions: boolean;

    /** Team performance analytics */
    analytics: boolean;

    /** Team billing and subscription management */
    billing: boolean;
  };
  'features/teams-management/frontend/shadcn': {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Basic team management (list, creation, member management) */
    core: boolean;

    /** Advanced team features (settings, permissions, dashboard) */
    advanced: boolean;

    /** Team analytics and reporting */
    analytics: boolean;

    /** Team billing and usage tracking */
    billing: boolean;
  };

    /** UI theme variant */
    theme?: 'default' | 'dark' | 'light' | 'minimal';
  };
  'features/web3/shadcn': {
  /** Constitutional Architecture features configuration */
  features?: {

    type: boolean;

    default: boolean;

    description: boolean;

    required: boolean;
  };

    /** UI theme variant */
    theme?: string;
  };
};

// Discriminated union for better IDE support
export type TypedGenomeModule = 
  | { id: 'ai/vercel-ai-sdk'; parameters?: {

    /** AI providers to include */
    providers: string[];
  /** Constitutional Architecture features configuration */
  features?: {

    /** Essential AI functionality (chat, text generation) */
    core: boolean;

    /** Real-time streaming responses */
    streaming: boolean;

    /** Advanced AI features (image generation, embeddings, function calling) */
    advanced: boolean;

    /** Enterprise features (caching, edge runtime, tool use) */
    enterprise: boolean;
  };

    /** Default AI model */
    defaultModel: 'gpt-3.5-turbo' | 'gpt-4' | 'gpt-4-turbo' | 'claude-3-sonnet' | 'claude-3-opus';

    /** Maximum tokens for generation */
    maxTokens: number;

    /** Temperature for generation */
    temperature: number;
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
    networks: string[];

    /** Enable WalletConnect support */
    walletConnect?: boolean;

    /** Smart contract addresses */
    contracts?: string[];
  }; }
  | { id: 'content/next-intl'; parameters?: {

    /** Supported locales */
    locales: string[];

    /** Default locale */
    defaultLocale: string;

    /** Enable locale-based routing */
    routing?: boolean;

    /** Enable SEO optimization */
    seo?: boolean;
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
  }; }
  | { id: 'database/drizzle'; parameters?: {

    /** Database provider */
    provider?: 'neon' | 'planetscale' | 'supabase' | 'local';

    /** Database type to use */
    databaseType: 'postgresql' | 'mysql' | 'sqlite';
  /** Constitutional Architecture features configuration */
  features?: {

    /** Essential database functionality (schema, queries, types) */
    core: boolean;

    /** Database schema migrations and versioning */
    migrations: boolean;

    /** Visual database browser and query interface */
    studio: boolean;

    /** Advanced relationship management and queries */
    relations: boolean;

    /** Data seeding and fixtures management */
    seeding: boolean;
  };
  }; }
  | { id: 'database/prisma'; parameters?: {

    /** Database provider */
    provider: 'postgresql' | 'mysql' | 'sqlite' | 'mongodb';

    /** Enable Prisma Studio */
    studio?: boolean;

    /** Enable database migrations */
    migrations?: boolean;

    /** Database type */
    databaseType: 'postgresql' | 'mysql' | 'sqlite' | 'mongodb';
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
    databaseName: string;

    /** Enable SQL logging */
    logging?: boolean;

    /** Enable connection pooling */
    pool?: boolean;

    /** Database type */
    databaseType: 'postgresql' | 'mysql' | 'sqlite' | 'mariadb' | 'mssql';
  }; }
  | { id: 'database/typeorm'; parameters?: {

    /** Enable schema synchronization */
    synchronize?: boolean;

    /** Enable query logging */
    logging?: boolean;

    /** Database type */
    databaseType: 'postgresql' | 'mysql' | 'sqlite' | 'mongodb';
  }; }
  | { id: 'deployment/docker'; parameters?: {

    /** Node.js version for Docker image */
    nodeVersion?: string;

    /** Enable production optimizations */
    optimization?: boolean;

    /** Enable health check endpoint */
    healthCheck?: boolean;
  }; }
  | { id: 'deployment/vercel'; parameters?: {

    /** Target framework */
    framework: 'nextjs' | 'react' | 'vue' | 'svelte' | 'angular';

    /** Build command to run */
    buildCommand: string;

    /** Output directory for build */
    outputDirectory: string;

    /** Install command */
    installCommand: string;

    /** Development command */
    devCommand: string;

    /** Environment variables to configure */
    envVars: string[];

    /** Serverless function configuration */
    functions: Record<string, any>;
  }; }
  | { id: 'email/resend'; parameters?: {

    /** Resend API key */
    apiKey: string;

    /** Default from email address */
    fromEmail: string;
  /** Constitutional Architecture features configuration */
  features?: {

    /** Essential email functionality (sending, basic templates) */
    core: boolean;

    /** Advanced email template system */
    templates: boolean;

    /** Email analytics and tracking */
    analytics: boolean;

    /** Batch sending and campaign management */
    campaigns: boolean;
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
  }; }
  | { id: 'observability/sentry'; parameters?: {

    /** Sentry DSN */
    dsn: string;

    /** Environment name */
    environment?: string;
  /** Constitutional Architecture features configuration */
  features?: {

    /** Essential monitoring (error tracking, basic performance) */
    core: boolean;

    /** Advanced performance monitoring */
    performance: boolean;

    /** Custom alerts and dashboard */
    alerts: boolean;

    /** Enterprise features (profiling, custom metrics) */
    enterprise: boolean;
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
    core: boolean;

    /** Code coverage reporting */
    coverage: boolean;

    /** Interactive test runner UI */
    ui: boolean;

    /** End-to-end testing support */
    e2e: boolean;
  };
  }; }
  | { id: 'ui/shadcn-ui'; parameters?: {

    /** Components to install (comprehensive set by default) */
    components?: Array<'button' | 'input' | 'card' | 'dialog' | 'form' | 'table' | 'badge' | 'avatar' | 'dropdown-menu' | 'sonner' | 'sheet' | 'tabs' | 'accordion' | 'carousel' | 'calendar' | 'date-picker' | 'alert-dialog' | 'checkbox' | 'collapsible' | 'context-menu' | 'hover-card' | 'menubar' | 'navigation-menu' | 'popover' | 'progress' | 'radio-group' | 'scroll-area' | 'slider' | 'toggle' | 'toggle-group'>;
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
    validation: boolean;

    /** Form accessibility features */
    accessibility: boolean;

    /** React Hook Form DevTools */
    devtools: boolean;
  }; }
  | { id: 'connectors/stripe/nextjs-drizzle'; parameters?: {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Enable organization-level billing features */
    organizationBilling: boolean;

    /** Enable seat-based billing */
    seatManagement: boolean;

    /** Enable usage-based billing tracking */
    usageTracking: boolean;

    /** Enable Stripe webhook handling */
    webhooks: boolean;
  };
  }; }
  | { id: 'connectors/tanstack-query-nextjs'; parameters?: {

    /** SSR support for TanStack Query */
    ssr: boolean;

    /** Client-side hydration support */
    hydration: boolean;

    /** Error boundary for query errors */
    errorBoundary: boolean;

    /** TanStack Query DevTools integration */
    devtools: boolean;
  }; }
  | { id: 'connectors/zustand-nextjs'; parameters?: {

    /** State persistence support */
    persistence: boolean;

    /** Zustand DevTools integration */
    devtools: boolean;

    /** Server-side rendering support */
    ssr: boolean;
  }; }
  | { id: 'features/ai-chat/backend/vercel-ai-nextjs'; parameters?: {

    /** Real-time message streaming */
    streaming: boolean;

    /** File upload capabilities */
    fileUpload: boolean;

    /** Voice input capabilities */
    voiceInput: boolean;

    /** Voice output capabilities */
    voiceOutput: boolean;

    /** Chat export and import capabilities */
    exportImport: boolean;
  }; }
  | { id: 'features/ai-chat/frontend/shadcn'; parameters?: {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Essential chat functionality (interface, message history) */
    core: boolean;

    /** File upload and media support */
    media: boolean;

    /** Voice input and output */
    voice: boolean;

    /** Advanced features (custom prompts, export/import) */
    advanced: boolean;
  };

    /** UI theme variant */
    theme?: 'default' | 'dark' | 'light' | 'minimal';
  }; }
  | { id: 'features/architech-welcome/shadcn'; parameters?: {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Show technology stack visualization */
    techStack: boolean;

    /** Show interactive component library showcase */
    componentShowcase: boolean;

    /** Show project structure and architecture */
    projectStructure: boolean;

    /** Show quick start guide */
    quickStart: boolean;

    /** Show Architech branding and links */
    architechBranding: boolean;
  };

    /** Custom welcome page title */
    customTitle: string;

    /** Custom welcome page description */
    customDescription: string;

    /** Primary color theme for the welcome page */
    primaryColor: string;
  }; }
  | { id: 'features/auth/backend/better-auth-nextjs'; parameters?: {

    /** Next.js API routes for authentication endpoints */
    apiRoutes: boolean;

    /** Next.js middleware for authentication and route protection */
    middleware: boolean;

    /** Admin API routes for user management */
    adminPanel: boolean;

    /** Email verification API routes and components */
    emailVerification: boolean;

    /** MFA API routes and components */
    mfa: boolean;

    /** Password reset API routes and components */
    passwordReset: boolean;
  }; }
  | { id: 'features/auth/frontend/shadcn'; parameters?: {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Enables password reset functionality (forms and pages) */
    passwordReset: boolean;

    /** Enables Multi-Factor Authentication setup and verification */
    mfa: boolean;

    /** Enables UI for Google, GitHub, etc. logins */
    socialLogins: boolean;

    /** Generates a full page for managing account settings */
    accountSettingsPage: boolean;

    /** Enables advanced profile management features */
    profileManagement: boolean;
  };

    /** UI theme variant */
    theme?: 'default' | 'dark' | 'light' | 'minimal';
  }; }
  | { id: 'features/email/react-email-templates'; parameters?: {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Core email templates (welcome, notifications) */
    core: boolean;

    /** Authentication email templates (password reset, verification, 2FA) */
    auth: boolean;

    /** Payment email templates (confirmation, receipts) */
    payments: boolean;

    /** Organization email templates (invitations, updates) */
    organizations: boolean;
  };

    /** Primary brand color for email templates */
    brandColor: string;

    /** URL to company logo for email headers */
    logo: string;
  }; }
  | { id: 'features/emailing/backend/resend-nextjs'; parameters?: {

    /** Bulk email sending capabilities */
    bulkEmail: boolean;

    /** Email template management */
    templates: boolean;

    /** Email delivery and engagement analytics */
    analytics: boolean;

    /** Email event webhooks */
    webhooks: boolean;

    /** Enable organization-scoped email management */
    organizations: boolean;

    /** Enable team-scoped email management */
    teams: boolean;
  }; }
  | { id: 'features/emailing/frontend/shadcn'; parameters?: {
  /** Constitutional Architecture features configuration */
  features?: {

    type: boolean;

    default: boolean;

    description: boolean;

    required: boolean;
  };

    /** UI theme variant */
    theme?: 'default' | 'dark' | 'light' | 'minimal';
  }; }
  | { id: 'features/graph-visualizer/shadcn'; parameters?: {

    /** Backend implementation for graph data management */
    backend: any;

    /** Frontend implementation for graph visualization */
    frontend: any;
  /** Constitutional Architecture features configuration */
  features?: {

    type: boolean;

    default: boolean;

    description: boolean;

    required: boolean;
  };
  }; }
  | { id: 'features/monitoring/shadcn'; parameters?: {

    /** Backend implementation for monitoring services */
    backend: any;

    /** Frontend implementation for monitoring UI */
    frontend: any;
  /** Constitutional Architecture features configuration */
  features?: {

    /** Essential monitoring (error tracking, basic performance) */
    core: boolean;

    /** Advanced performance monitoring */
    performance: boolean;

    /** User feedback collection */
    feedback: boolean;

    /** Monitoring analytics and reporting */
    analytics: boolean;
  };

    /** Environments to monitor */
    environments?: string[];
  }; }
  | { id: 'features/observability/sentry-shadcn'; parameters?: {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Main Sentry dashboard with overview */
    dashboard: boolean;

    /** Browse and filter captured errors */
    errorBrowser: boolean;

    /** Performance metrics and charts */
    performance: boolean;

    /** Alert configuration UI */
    alerts: boolean;
  };

    /** Path to mount the Sentry dashboard */
    dashboardPath: string;

    /** Auto-refresh interval (ms) for dashboard data */
    refreshInterval: number;
  }; }
  | { id: 'features/payments/backend/stripe-nextjs'; parameters?: {

    /** Stripe webhook handlers for payment events */
    webhooks: boolean;

    /** Stripe Checkout integration for payments */
    checkout: boolean;

    /** Subscription management and billing */
    subscriptions: boolean;

    /** Invoice generation and management */
    invoices: boolean;

    /** Refund processing and management */
    refunds: boolean;
  }; }
  | { id: 'features/payments/frontend/shadcn'; parameters?: {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Essential payment functionality (forms, checkout, transactions) */
    core: boolean;

    /** Subscription management and billing */
    subscriptions: boolean;

    /** Invoice generation and management */
    invoicing: boolean;

    /** Payment webhook handling */
    webhooks: boolean;

    /** Payment analytics and reporting */
    analytics: boolean;
  };

    /** UI theme variant */
    theme?: 'default' | 'dark' | 'light' | 'minimal';
  }; }
  | { id: 'features/project-management/shadcn'; parameters?: {

    /** UI theme variant */
    theme?: 'default' | 'dark' | 'light';
  /** Constitutional Architecture features configuration */
  features?: {

    type: boolean;

    default: boolean;

    description: boolean;

    required: boolean;
  };
  }; }
  | { id: 'features/repo-analyzer/shadcn'; parameters?: {

    /** Enable visual architecture diagram */
    enableVisualization?: boolean;

    /** Enable genome export functionality */
    enableExport?: boolean;

    /** Minimum confidence threshold for suggestions */
    confidenceThreshold?: number;
  }; }
  | { id: 'features/social-profile/shadcn'; parameters?: {

    /** Backend implementation for social profile */
    backend: any;

    /** Frontend implementation for social profile UI */
    frontend: any;
  /** Constitutional Architecture features configuration */
  features?: {

    type: boolean;

    default: boolean;

    description: boolean;

    required: boolean;
  };
  }; }
  | { id: 'features/teams-management/backend/better-auth-nextjs'; parameters?: {

    /** Team invitation system */
    invites: boolean;

    /** Granular role-based permissions */
    permissions: boolean;

    /** Team performance analytics */
    analytics: boolean;

    /** Team billing and subscription management */
    billing: boolean;
  }; }
  | { id: 'features/teams-management/frontend/shadcn'; parameters?: {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Basic team management (list, creation, member management) */
    core: boolean;

    /** Advanced team features (settings, permissions, dashboard) */
    advanced: boolean;

    /** Team analytics and reporting */
    analytics: boolean;

    /** Team billing and usage tracking */
    billing: boolean;
  };

    /** UI theme variant */
    theme?: 'default' | 'dark' | 'light' | 'minimal';
  }; }
  | { id: 'features/web3/shadcn'; parameters?: {
  /** Constitutional Architecture features configuration */
  features?: {

    type: boolean;

    default: boolean;

    description: boolean;

    required: boolean;
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

/**
 * Define a genome with full type safety
 * 
 * @param genome - The genome configuration with type safety
 * @returns The genome with validated types
 * 
 * @example
 * ```typescript
 * import { defineGenome } from '@thearchitech.xyz/marketplace-types';
 * 
 * const genome = defineGenome({
 *   version: '1.0',
 *   project: {
 *     name: 'my-app',
 *     framework: 'nextjs'
 *   },
 *   modules: [
 *     {
 *       id: 'framework/nextjs', // ✅ Autocompletion works
 *       parameters: {
 *         appRouter: true, // ✅ Type-safe parameters
 *         srcDir: true,    // ✅ Only boolean allowed
 *         importAlias: '@/'
 *       }
 *     },
 *     {
 *       id: 'ui/shadcn-ui', // ✅ Autocompletion works
 *       parameters: {
 *         components: ['button', 'input'], // ✅ Only valid components allowed
 *       }
 *     }
 *   ]
 * });
 * ```
 */
export declare function defineGenome<T extends TypedGenome>(genome: T): T;

// Re-export for convenience
export { Genome } from '@thearchitech.xyz/types';
