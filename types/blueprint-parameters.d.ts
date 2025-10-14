/**
 * Generated Blueprint Parameter Types
 * 
 * These types provide type safety for blueprint parameters based on module schemas.
 * Import these types in your blueprints for full type safety.
 */

export interface AiVercelAiSdkParameters {
  features: {
    core: boolean;
    streaming: boolean;
    tools: boolean;
    embeddings: boolean;
    advanced: boolean;
    enterprise: boolean;
  };
  providers: string[];
  defaultModel: 'gpt-3.5-turbo' | 'gpt-4' | 'gpt-4-turbo' | 'claude-3-sonnet' | 'claude-3-opus';
  maxTokens: number;
  temperature: number;
}

export interface AuthBetterAuthParameters {
  providers?: string[];
  session?: any;
  csrf?: boolean;
  rateLimit?: boolean;
}

export interface BlockchainWeb3Parameters {
  features: {
    walletConnect: boolean;
    smartContracts: boolean;
    transactions: boolean;
    events: boolean;
    ens: boolean;
    nft: boolean;
  };
  networks: string[];
  walletConnect?: boolean;
  contracts?: string[];
}

export interface ContentNextIntlParameters {
  features: {
    routing: boolean;
    dateFormatting: boolean;
    numberFormatting: boolean;
  };
  locales: string[];
  defaultLocale: string;
  routing?: boolean;
  seo?: boolean;
}

export interface CoreFormsParameters {
  zod?: boolean;
  reactHookForm?: boolean;
  resolvers?: boolean;
  accessibility?: boolean;
  devtools?: boolean;
  advancedValidation?: boolean;
}

export interface CoreGitParameters {
  userName?: string;
  userEmail?: string;
  defaultBranch?: string;
  autoInit?: boolean;
}

export interface DataFetchingTanstackQueryParameters {
  features: {
    core: boolean;
    infinite: boolean;
    optimistic: boolean;
    offline: boolean;
  };
  devtools?: boolean;
  defaultOptions?: Record<string, any>;
  suspense?: boolean;
}

export interface DatabaseDrizzleParameters {
  features: {
    core: boolean;
    migrations: boolean;
    studio: boolean;
    relations: boolean;
    seeding: boolean;
  };
  provider?: 'neon' | 'planetscale' | 'supabase' | 'local';
  databaseType: 'postgresql' | 'mysql' | 'sqlite';
}

export interface DatabasePrismaParameters {
  provider: 'postgresql' | 'mysql' | 'sqlite' | 'mongodb';
  studio?: boolean;
  migrations?: boolean;
  databaseType: 'postgresql' | 'mysql' | 'sqlite' | 'mongodb';
}

export interface DatabaseSequelizeParameters {
  host?: string;
  port?: number;
  username?: string;
  password?: string;
  databaseName: string;
  logging?: boolean;
  pool?: boolean;
  databaseType: 'postgresql' | 'mysql' | 'sqlite' | 'mariadb' | 'mssql';
}

export interface DatabaseTypeormParameters {
  synchronize?: boolean;
  logging?: boolean;
  databaseType: 'postgresql' | 'mysql' | 'sqlite' | 'mongodb';
}

export interface DeploymentDockerParameters {
  features: {
    development: boolean;
    production: boolean;
    compose: boolean;
  };
  nodeVersion?: string;
  optimization?: boolean;
  healthCheck?: boolean;
}

export interface DeploymentVercelParameters {
  framework: 'nextjs' | 'react' | 'vue' | 'svelte' | 'angular';
  buildCommand: string;
  outputDirectory: string;
  installCommand: string;
  devCommand: string;
  envVars: string[];
  functions: Record<string, any>;
  analytics?: boolean;
  speedInsights?: boolean;
}

export interface EmailResendParameters {
  features: {
    core: boolean;
    templates: boolean;
    analytics: boolean;
    campaigns: boolean;
  };
  apiKey: string;
  fromEmail: string;
}

export interface FrameworkNextjsParameters {
  features: {
    seo: boolean;
    imageOptimization: boolean;
    mdx: boolean;
    performance: boolean;
    streaming: boolean;
    i18n: boolean;
  };
  typescript?: boolean;
  tailwind?: boolean;
  eslint?: boolean;
  appRouter?: boolean;
  srcDir?: boolean;
  importAlias?: string;
  reactVersion?: string;
}

export interface ObservabilitySentryParameters {
  features: {
    core: boolean;
    errorTracking: boolean;
    performance: boolean;
    alerts: boolean;
    enterprise: boolean;
    replay: boolean;
  };
  dsn: string;
  environment?: string;
  release?: string;
}

export interface PaymentStripeParameters {
  currency?: any;
  mode?: any;
  webhooks?: boolean;
  dashboard?: boolean;
}

export interface QualityEslintParameters {
  typescript?: boolean;
  react?: boolean;
  nextjs?: boolean;
  nodejs?: boolean;
  accessibility?: boolean;
  imports?: boolean;
  strict?: boolean;
  format?: boolean;
}

export interface QualityPrettierParameters {
  semi?: boolean;
  singleQuote?: boolean;
  tabWidth?: number;
  useTabs?: boolean;
  trailingComma?: 'none' | 'es5' | 'all';
  printWidth?: number;
  bracketSpacing?: boolean;
  arrowParens?: 'avoid' | 'always';
  endOfLine?: 'lf' | 'crlf' | 'cr' | 'auto';
  plugins?: string[];
  tailwind?: boolean;
  organizeImports?: boolean;
}

export interface ServicesGithubApiParameters {
  token: string;
  baseUrl?: string;
  userAgent?: string;
}

export interface StateZustandParameters {
  persistence?: boolean;
  devtools?: boolean;
  immer?: boolean;
  middleware?: string[];
}

export interface TestingVitestParameters {
  features: {
    core: boolean;
    unitTests: boolean;
    coverage: boolean;
    ui: boolean;
    e2e: boolean;
    integrationTests: boolean;
  };
  environment?: 'jsdom' | 'node' | 'happy-dom';
}

export interface UiShadcnUiParameters {
  theme?: 'default' | 'dark' | 'light' | 'minimal';
  components?: Array<'alert' | 'alert-dialog' | 'accordion' | 'avatar' | 'badge' | 'button' | 'calendar' | 'card' | 'carousel' | 'checkbox' | 'collapsible' | 'context-menu' | 'date-picker' | 'dialog' | 'dropdown-menu' | 'form' | 'hover-card' | 'input' | 'label' | 'menubar' | 'navigation-menu' | 'pagination' | 'popover' | 'progress' | 'radio-group' | 'scroll-area' | 'separator' | 'sheet' | 'slider' | 'sonner' | 'switch' | 'table' | 'tabs' | 'textarea' | 'toggle' | 'toggle-group'>;
}

export interface UiTailwindParameters {
  typography?: boolean;
  forms?: boolean;
  aspectRatio?: boolean;
  darkMode?: boolean;
}

export interface ConnectorsBetterAuthGithubParameters {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scopes?: string[];
  encryptionKey: string;
}

export interface ConnectorsRhfZodShadcnParameters {
  validation: boolean;
  accessibility: boolean;
  devtools: boolean;
}

export interface ConnectorsSentryNextjsParameters {
  features: {
    core: boolean;
    performance: boolean;
    alerts: boolean;
    enterprise: boolean;
  };
  dsn: string;
  environment?: string;
  release?: string;
}

export interface ConnectorsSentryReactParameters {
  features: {
    core: boolean;
    performance: boolean;
    'error-boundary': boolean;
  };
  dsn: string;
  environment?: string;
  release?: string;
}

export interface ConnectorsStripeNextjsDrizzleParameters {
  features: {
    organizationBilling: boolean;
    seats: boolean;
    usage: boolean;
    webhooks: boolean;
    seatManagement: boolean;
    usageTracking: boolean;
  };
}

export interface ConnectorsTanstackQueryNextjsParameters {
  ssr: boolean;
  hydration: boolean;
  errorBoundary: boolean;
  devtools: boolean;
}

export interface ConnectorsZustandNextjsParameters {
  persistence: boolean;
  devtools: boolean;
  ssr: boolean;
}

export interface FeaturesAiChatBackendVercelAiNextjsParameters {
  streaming: boolean;
  fileUpload: boolean;
  voiceInput: boolean;
  voiceOutput: boolean;
  exportImport: boolean;
}

export interface FeaturesAiChatFrontendShadcnParameters {
  features: {
    core: boolean;
    media: boolean;
    voice: boolean;
    advanced: boolean;
  };
  theme?: 'default' | 'dark' | 'light' | 'minimal';
}

export interface FeaturesArchitechWelcomeShadcnParameters {
  features: {
    techStack: boolean;
    componentShowcase: boolean;
    projectStructure: boolean;
    quickStart: boolean;
    architechBranding: boolean;
  };
  customTitle: string;
  customDescription: string;
  primaryColor: string;
  showTechStack: boolean;
  showComponents: boolean;
  showProjectStructure: boolean;
  showQuickStart: boolean;
  showArchitechBranding: boolean;
}

export interface FeaturesAuthBackendBetterAuthNextjsParameters {
  features: {
    emailPassword: boolean;
    emailVerification: boolean;
    passwordReset: boolean;
    sessions: boolean;
    organizations: boolean;
    twoFactor: boolean;
  };
  apiRoutes: boolean;
  middleware: boolean;
  adminPanel: boolean;
  emailVerification: boolean;
  mfa: boolean;
  passwordReset: boolean;
}

export interface FeaturesAuthFrontendShadcnParameters {
  features: {
    signIn: boolean;
    signUp: boolean;
    passwordReset: boolean;
    profile: boolean;
    mfa: boolean;
    socialLogins: boolean;
    accountSettingsPage: boolean;
    profileManagement: boolean;
    twoFactor: boolean;
    organizationManagement: boolean;
  };
  theme?: 'default' | 'dark' | 'light' | 'minimal';
}

export interface FeaturesEmailReactEmailTemplatesParameters {
  features: {
    core: boolean;
    auth: boolean;
    payments: boolean;
    organizations: boolean;
  };
  brandColor: string;
  logo: string;
}

export interface FeaturesEmailingBackendResendNextjsParameters {
  bulkEmail: boolean;
  templates: boolean;
  analytics: boolean;
  webhooks: boolean;
  organizations: boolean;
  teams: boolean;
}

export interface FeaturesEmailingFrontendShadcnParameters {
  features: {
    emailComposer: boolean;
    emailList: boolean;
    templates: boolean;
    analytics: boolean;
    campaigns: boolean;
    scheduling: boolean;
    advancedTemplates: boolean;
  };
  theme?: 'default' | 'dark' | 'light' | 'minimal';
}

export interface FeaturesGraphVisualizerShadcnParameters {
  features: {
    interactiveGraph: boolean;
    nodeTypes: boolean;
    minimap: boolean;
    export: boolean;
    edgeTypes: boolean;
    controls: boolean;
    background: boolean;
    selection: boolean;
    dragging: boolean;
    zooming: boolean;
    panning: boolean;
    import: boolean;
  };
  backend: any;
  frontend: any;
}

export interface FeaturesMonitoringShadcnParameters {
  features: {
    core: boolean;
    performance: boolean;
    errors: boolean;
    feedback: boolean;
    analytics: boolean;
  };
  backend: any;
  frontend: any;
  environments?: string[];
}

export interface FeaturesObservabilitySentryShadcnParameters {
  features: {
    dashboard: boolean;
    errorBrowser: boolean;
    performance: boolean;
    alerts: boolean;
  };
  dashboardPath: string;
  refreshInterval: number;
}

export interface FeaturesPaymentsBackendStripeNextjsParameters {
  webhooks: boolean;
  checkout: boolean;
  subscriptions: boolean;
  invoices: boolean;
  refunds: boolean;
  paymentMethods: boolean;
  analytics: boolean;
  organizationBilling: boolean;
}

export interface FeaturesPaymentsFrontendShadcnParameters {
  features: {
    core: boolean;
    checkout: boolean;
    subscriptions: boolean;
    invoices: boolean;
    paymentMethods: boolean;
    billingPortal: boolean;
    invoicing: boolean;
    webhooks: boolean;
    analytics: boolean;
  };
  theme?: 'default' | 'dark' | 'light' | 'minimal';
}

export interface FeaturesProjectManagementShadcnParameters {
  features: {
    kanban: boolean;
    timeline: boolean;
    sprint: boolean;
    kanbanBoard: boolean;
    taskCreation: boolean;
    taskManagement: boolean;
    projectOrganization: boolean;
    teamCollaboration: boolean;
    basicAnalytics: boolean;
  };
  theme?: 'default' | 'dark' | 'light';
}

export interface FeaturesRepoAnalyzerShadcnParameters {
  enableVisualization?: boolean;
  enableExport?: boolean;
  confidenceThreshold?: number;
}

export interface FeaturesSocialProfileShadcnParameters {
  features: {
    walletProfile: boolean;
    web3Social: boolean;
    achievements: boolean;
    profileManagement: boolean;
    socialConnections: boolean;
    activityFeeds: boolean;
    notifications: boolean;
    privacyControls: boolean;
    socialSettings: boolean;
    avatarUpload: boolean;
    blocking: boolean;
    reporting: boolean;
  };
  backend: any;
  frontend: any;
}

export interface FeaturesTeamsManagementBackendBetterAuthNextjsParameters {
  features: {
    teams: boolean;
    invitations: boolean;
    roles: boolean;
    permissions: boolean;
  };
  invites: boolean;
  permissions: boolean;
  analytics: boolean;
  billing: boolean;
}

export interface FeaturesTeamsManagementFrontendShadcnParameters {
  features: {
    core: boolean;
    teams: boolean;
    members: boolean;
    invitations: boolean;
    roles: boolean;
    billing: boolean;
    analytics: boolean;
    advanced: boolean;
  };
  theme?: 'default' | 'dark' | 'light' | 'minimal';
}

export interface FeaturesWeb3ShadcnParameters {
  features: {
    walletConnect: boolean;
    networkSwitch: boolean;
    transactionHistory: boolean;
    tokenBalances: boolean;
    nftGallery: boolean;
    walletConnection: boolean;
    defiIntegration: boolean;
    stakingInterface: boolean;
  };
  theme?: string;
}
