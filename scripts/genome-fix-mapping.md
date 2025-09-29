# Genome Fix Mapping

## Valid Parameters by Adapter

### UI Adapters

#### shadcn-ui
**Valid Parameters:**
- `components?: Array<'button' | 'input' | 'card' | ...>`

**Valid Features:**
- `theming?: boolean`
- `accessibility?: boolean`

**Remove:**
- `theme`, `darkMode` (not in schema)

#### forms
**Valid Parameters:**
- `zod?: boolean`
- `reactHookForm?: boolean`
- `resolvers?: boolean`

**Valid Features:**
- (empty - no features in schema)

**Remove:**
- `validation`, `components`, `errorHandling` (not in schema)

#### tailwind
**Valid Parameters:**
- `typography?: boolean`
- `forms?: boolean`
- `aspectRatio?: boolean`
- `darkMode?: boolean`

**Valid Features:**
- (empty - no features in schema)

**Remove:**
- `config`, `plugins` (not in schema)

### Database Adapters

#### drizzle
**Valid Parameters:**
- `provider?: 'neon' | 'planetscale' | 'supabase' | 'local'`
- `migrations?: boolean`
- `studio?: boolean`
- `databaseType?: 'postgresql' | 'mysql' | 'sqlite'`

**Valid Features:**
- `migrations?: boolean`
- `studio?: boolean`
- `queryOptimization?: boolean`

**Remove:**
- `relations`, `seeding` (not in schema)

### Auth Adapters

#### better-auth
**Valid Parameters:**
- `providers?: Array<'email'>` (only email supported)
- `session?: 'jwt' | 'database'`
- `csrf?: boolean`
- `rateLimit?: boolean`

**Valid Features:**
- `'oauth-providers'?: boolean`
- `'session-management'?: boolean`
- `'email-verification'?: boolean`
- `'password-reset'?: boolean`
- `'multi-factor'?: boolean`
- `'admin-panel'?: boolean`

**Remove:**
- `emailVerification`, `passwordReset`, `multiFactor` (not in parameters)

### Payment Adapters

#### stripe
**Valid Parameters:**
- `currency?: 'usd'`
- `mode?: 'test'`
- `webhooks?: boolean`
- `dashboard?: boolean`

**Valid Features:**
- `'one-time-payments'?: boolean`
- `subscriptions?: boolean`
- `marketplace?: boolean`
- `invoicing?: boolean`

**Remove:**
- `subscriptions`, `oneTimePayments`, `marketplace`, `connect` (not in parameters)

### Email Adapters

#### resend
**Valid Parameters:**
- `apiKey: string`
- `fromEmail: string`
- `webhooks?: boolean`
- `analytics?: boolean`

**Valid Features:**
- `templates?: boolean`
- `analytics?: boolean`
- `'batch-sending'?: boolean`

**Remove:**
- `templates`, `batchSending` (not in parameters)

### Content Adapters

#### next-intl
**Valid Parameters:**
- `locales: Array<'en' | 'fr'>` (only en, fr supported)
- `defaultLocale: string`
- `routing?: boolean`
- `seo?: boolean`

**Valid Features:**
- `routing?: boolean`
- `'seo-optimization'?: boolean`
- `'dynamic-imports'?: boolean`

**Remove:**
- `timezone` (not in schema)

### Testing Adapters

#### vitest
**Valid Parameters:**
- `coverage?: boolean`
- `watch?: boolean`
- `ui?: boolean`
- `jsx?: boolean`
- `environment?: string`

**Valid Features:**
- `coverage?: boolean`
- `ui?: boolean`

**Remove:**
- `e2e`, `componentTesting`, `mockServiceWorker` (not in schema)

### Observability Adapters

#### sentry
**Valid Parameters:**
- `dsn: string`
- `environment?: string`
- `performance?: boolean`
- `release?: string`

**Valid Features:**
- `'performance-monitoring'?: boolean`
- `'error-tracking'?: boolean`
- `'alerts-dashboard'?: boolean`

**Remove:**
- `errorTracking`, `sessionReplay`, `alerts`, `profiling` (not in parameters)

### Blockchain Adapters

#### web3
**Valid Parameters:**
- `networks: Array<'mainnet' | 'polygon' | 'arbitrum'>`
- `walletConnect?: boolean`
- `contracts?: Array<''>`

**Valid Features:**
- `'smart-contracts'?: boolean`
- `'wallet-integration'?: boolean`
- `'nft-management'?: boolean`
- `'defi-integration'?: boolean`

**Remove:**
- `walletIntegration`, `smartContracts`, `nftSupport`, `defiSupport` (not in parameters)

### Deployment Adapters

#### docker
**Valid Parameters:**
- `nodeVersion?: string`
- `optimization?: boolean`
- `healthCheck?: boolean`

**Valid Features:**
- `'multi-stage'?: boolean`
- `'production-ready'?: boolean`

**Remove:**
- `multiStage`, `productionReady`, `healthChecks` (not in parameters)

### Tooling Adapters

#### dev-tools
**Valid Parameters:**
- `prettier?: boolean`
- `husky?: boolean`
- `lintStaged?: boolean`
- `commitlint?: boolean`
- `eslint?: boolean`

**Valid Features:**
- (empty - no features in schema)

**Remove:**
- `linting`, `formatting`, `gitHooks`, `debugging` (not in schema)

## Fix Pattern

For each genome file:

1. **Remove all invalid parameters** (not in adapter.json)
2. **Keep only valid parameters** (from adapter.json)
3. **Move capabilities to features** where appropriate
4. **Use correct parameter names** (from generated types)
5. **Use correct feature names** (from generated types)
6. **Use correct parameter values** (matching enum constraints)
