# The Architech Marketplace API Reference

This document provides a comprehensive API reference for The Architech Marketplace package.

## 📦 Package Exports

### Main Exports

```typescript
import { 
  Genome, 
  ModuleConfig, 
  ParamsFor, 
  FeaturesFor,
  loadAdapter,
  loadIntegration,
  getAllAdapters,
  getAllIntegrations,
  adapterExists,
  integrationExists
} from '@thearchitech.xyz/marketplace';
```

### Type Exports

```typescript
import { 
  Genome, 
  ModuleConfig, 
  ParamsFor, 
  FeaturesFor 
} from '@thearchitech.xyz/marketplace/types';
```

## 🧬 Core Types

### Genome

The main configuration interface for The Architech projects.

```typescript
interface Genome {
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
```

**Properties:**
- `version` - Genome schema version
- `project.name` - Project name (required)
- `project.description` - Project description (optional)
- `project.version` - Project version (optional)
- `project.framework` - Framework identifier (required)
- `project.path` - Project path (optional)
- `modules` - Array of module configurations

### ModuleConfig

Union type representing all available module configurations.

```typescript
type ModuleConfig = 
  | { id: 'framework/nextjs'; parameters?: NextjsFrameworkParams; features?: NextjsFrameworkFeatures }
  | { id: 'ui/shadcn-ui'; parameters?: Shadcn_uiUiParams; features?: Shadcn_uiUiFeatures }
  | { id: 'database/drizzle'; parameters?: DrizzleDatabaseParams; features?: DrizzleDatabaseFeatures }
  // ... all other modules
  ;
```

**Properties:**
- `id` - Module identifier (required)
- `parameters` - Module-specific parameters (optional)
- `features` - Module-specific features (optional)

### Utility Types

#### ParamsFor<T>

Extract parameters type for a specific module.

```typescript
type ParamsFor<T extends ModuleConfig['id']> = 
  Extract<ModuleConfig, { id: T }>['parameters'];

// Example usage
type NextjsParams = ParamsFor<'framework/nextjs'>;
type ShadcnParams = ParamsFor<'ui/shadcn-ui'>;
```

#### FeaturesFor<T>

Extract features type for a specific module.

```typescript
type FeaturesFor<T extends ModuleConfig['id']> = 
  Extract<ModuleConfig, { id: T }>['features'];

// Example usage
type NextjsFeatures = FeaturesFor<'framework/nextjs'>;
type ShadcnFeatures = FeaturesFor<'ui/shadcn-ui'>;
```

## 🔧 Utility Functions

### loadAdapter(category, adapterId)

Load an adapter configuration by category and ID.

```typescript
function loadAdapter(category: string, adapterId: string): AdapterConfig;
```

**Parameters:**
- `category` - Adapter category (e.g., 'ui', 'database')
- `adapterId` - Adapter identifier (e.g., 'shadcn-ui')

**Returns:** Adapter configuration object

**Example:**
```typescript
const adapter = loadAdapter('ui', 'shadcn-ui');
console.log(adapter.name); // "Shadcn UI"
```

### loadIntegration(integrationId)

Load an integration configuration by ID.

```typescript
function loadIntegration(integrationId: string): IntegrationConfig;
```

**Parameters:**
- `integrationId` - Integration identifier

**Returns:** Integration configuration object

**Example:**
```typescript
const integration = loadIntegration('shadcn-nextjs-integration');
console.log(integration.name); // "Shadcn Next.js Integration"
```

### getAllAdapters()

Get all available adapters.

```typescript
function getAllAdapters(): AdapterConfig[];
```

**Returns:** Array of all adapter configurations

**Example:**
```typescript
const adapters = getAllAdapters();
console.log(adapters.length); // Number of available adapters
```

### getAllIntegrations()

Get all available integrations.

```typescript
function getAllIntegrations(): IntegrationConfig[];
```

**Returns:** Array of all integration configurations

**Example:**
```typescript
const integrations = getAllIntegrations();
console.log(integrations.length); // Number of available integrations
```

### adapterExists(category, adapterId)

Check if an adapter exists.

```typescript
function adapterExists(category: string, adapterId: string): boolean;
```

**Parameters:**
- `category` - Adapter category
- `adapterId` - Adapter identifier

**Returns:** `true` if adapter exists, `false` otherwise

**Example:**
```typescript
if (adapterExists('ui', 'shadcn-ui')) {
  console.log('Shadcn UI adapter is available');
}
```

### integrationExists(integrationId)

Check if an integration exists.

```typescript
function integrationExists(integrationId: string): boolean;
```

**Parameters:**
- `integrationId` - Integration identifier

**Returns:** `true` if integration exists, `false` otherwise

**Example:**
```typescript
if (integrationExists('shadcn-nextjs-integration')) {
  console.log('Shadcn Next.js integration is available');
}
```

## 🎨 Adapter Parameters

### UI Adapters

#### Shadcn UI (`ui/shadcn-ui`)

```typescript
interface Shadcn_uiUiParams {
  /**
   * Components to install (comprehensive set by default)
   */
  components?: Array<
    'button' | 'input' | 'card' | 'dialog' | 'form' | 
    'table' | 'badge' | 'avatar' | 'dropdown-menu' | 
    'toast' | 'sheet' | 'tabs' | 'accordion' | 
    'carousel' | 'calendar' | 'date-picker' | 
    'alert-dialog' | 'checkbox' | 'collapsible' | 
    'context-menu' | 'hover-card' | 'menubar' | 
    'navigation-menu' | 'popover' | 'progress' | 
    'radio-group' | 'scroll-area' | 'slider' | 
    'toggle' | 'toggle-group'
  >;
}

interface Shadcn_uiUiFeatures {
  theming?: boolean;
  accessibility?: boolean;
  responsive?: boolean;
}
```

#### Forms (`ui/forms`)

```typescript
interface FormsUiParams {
  /**
   * Form validation library
   */
  validation?: 'zod' | 'yup' | 'joi';
  
  /**
   * Form components to include
   */
  components?: Array<'input' | 'select' | 'checkbox' | 'radio'>;
}

interface FormsUiFeatures {
  validation?: boolean;
  errorHandling?: boolean;
  accessibility?: boolean;
}
```

#### Tailwind (`ui/tailwind`)

```typescript
interface TailwindUiParams {
  /**
   * Tailwind configuration preset
   */
  preset?: 'default' | 'minimal' | 'extended';
  
  /**
   * Enable dark mode
   */
  darkMode?: boolean;
  
  /**
   * Include additional plugins
   */
  plugins?: Array<'typography' | 'forms' | 'aspect-ratio'>;
}

interface TailwindUiFeatures {
  responsive?: boolean;
  darkMode?: boolean;
  animations?: boolean;
}
```

### Database Adapters

#### Drizzle (`database/drizzle`)

```typescript
interface DrizzleDatabaseParams {
  /**
   * Database provider
   */
  provider?: 'neon' | 'postgres' | 'mysql' | 'sqlite';
  
  /**
   * Enable migrations
   */
  migrations?: boolean;
  
  /**
   * Enable Drizzle Studio
   */
  studio?: boolean;
  
  /**
   * Database type
   */
  databaseType?: 'postgresql' | 'mysql' | 'sqlite';
}

interface DrizzleDatabaseFeatures {
  migrations?: boolean;
  studio?: boolean;
  queryOptimization?: boolean;
}
```

#### Prisma (`database/prisma`)

```typescript
interface PrismaDatabaseParams {
  /**
   * Database provider
   */
  provider?: 'postgresql' | 'mysql' | 'sqlite' | 'mongodb';
  
  /**
   * Enable migrations
   */
  migrations?: boolean;
  
  /**
   * Enable Prisma Studio
   */
  studio?: boolean;
}

interface PrismaDatabaseFeatures {
  migrations?: boolean;
  studio?: boolean;
  queryOptimization?: boolean;
}
```

### Authentication Adapters

#### Better Auth (`auth/better-auth`)

```typescript
interface Better_authAuthParams {
  /**
   * Authentication providers
   */
  providers?: Array<'email' | 'github' | 'google' | 'discord'>;
  
  /**
   * Session type
   */
  session?: 'jwt' | 'database';
  
  /**
   * Enable CSRF protection
   */
  csrf?: boolean;
  
  /**
   * Enable rate limiting
   */
  rateLimit?: boolean;
}

interface Better_authAuthFeatures {
  oauth?: boolean;
  emailAuth?: boolean;
  sessionManagement?: boolean;
  adminPanel?: boolean;
}
```

### Payment Adapters

#### Stripe (`payment/stripe`)

```typescript
interface StripePaymentParams {
  /**
   * Stripe mode
   */
  mode?: 'test' | 'live';
  
  /**
   * Enable webhooks
   */
  webhooks?: boolean;
  
  /**
   * Enable one-time payments
   */
  oneTimePayments?: boolean;
  
  /**
   * Default currency
   */
  currency?: 'usd' | 'eur' | 'gbp' | 'cad' | 'aud' | 'jpy';
}

interface StripePaymentFeatures {
  webhooks?: boolean;
  subscriptions?: boolean;
  invoices?: boolean;
}
```

### Email Adapters

#### Resend (`email/resend`)

```typescript
interface ResendEmailParams {
  /**
   * Resend API key
   */
  apiKey?: string;
  
  /**
   * Enable analytics
   */
  analytics?: boolean;
  
  /**
   * Enable batch sending
   */
  batchSending?: boolean;
}

interface ResendEmailFeatures {
  templates?: boolean;
  analytics?: boolean;
  batchSending?: boolean;
}
```

### Testing Adapters

#### Vitest (`testing/vitest`)

```typescript
interface VitestTestingParams {
  /**
   * Enable coverage reporting
   */
  coverage?: boolean;
  
  /**
   * Enable UI mode
   */
  ui?: boolean;
  
  /**
   * Enable component testing
   */
  componentTesting?: boolean;
}

interface VitestTestingFeatures {
  unitTesting?: boolean;
  integrationTesting?: boolean;
  e2eTesting?: boolean;
  coverage?: boolean;
}
```

### Observability Adapters

#### Sentry (`observability/sentry`)

```typescript
interface SentryObservabilityParams {
  /**
   * Sentry DSN
   */
  dsn?: string;
  
  /**
   * Environment
   */
  environment?: 'development' | 'staging' | 'production';
  
  /**
   * Enable performance monitoring
   */
  performance?: boolean;
  
  /**
   * Enable session replay
   */
  sessionReplay?: boolean;
}

interface SentryObservabilityFeatures {
  errorTracking?: boolean;
  performanceMonitoring?: boolean;
  alertsDashboard?: boolean;
}
```

### Blockchain Adapters

#### Web3 (`blockchain/web3`)

```typescript
interface Web3BlockchainParams {
  /**
   * Supported networks
   */
  networks?: Array<'mainnet' | 'polygon' | 'arbitrum' | 'optimism' | 'base'>;
  
  /**
   * Enable smart contracts
   */
  smartContracts?: boolean;
  
  /**
   * Enable NFT support
   */
  nftSupport?: boolean;
}

interface Web3BlockchainFeatures {
  walletIntegration?: boolean;
  smartContracts?: boolean;
  nftManagement?: boolean;
}
```

### Deployment Adapters

#### Docker (`deployment/docker`)

```typescript
interface DockerDeploymentParams {
  /**
   * Enable multi-stage builds
   */
  multiStage?: boolean;
  
  /**
   * Production-ready configuration
   */
  productionReady?: boolean;
  
  /**
   * Enable health checks
   */
  healthChecks?: boolean;
}

interface DockerDeploymentFeatures {
  multiStage?: boolean;
  productionReady?: boolean;
  healthChecks?: boolean;
}
```

### Tooling Adapters

#### Dev Tools (`tooling/dev-tools`)

```typescript
interface Dev_toolsToolingParams {
  /**
   * Enable linting
   */
  linting?: boolean;
  
  /**
   * Enable formatting
   */
  formatting?: boolean;
  
  /**
   * Enable git hooks
   */
  gitHooks?: boolean;
  
  /**
   * Enable debugging tools
   */
  debugging?: boolean;
}

interface Dev_toolsToolingFeatures {
  linting?: boolean;
  formatting?: boolean;
  gitHooks?: boolean;
}
```

## 🔗 Integration Parameters

### Shadcn Next.js Integration

```typescript
interface Shadcn_nextjs_integrationIntegrationParams {
  /**
   * Enable automatic component imports
   */
  autoImports?: boolean;
  
  /**
   * Enable TypeScript support
   */
  typescript?: boolean;
}

interface Shadcn_nextjs_integrationIntegrationFeatures {
  autoImports?: boolean;
  typescript?: boolean;
}
```

### Drizzle Next.js Integration

```typescript
interface Drizzle_nextjs_integrationIntegrationParams {
  /**
   * Enable connection pooling
   */
  connectionPooling?: boolean;
  
  /**
   * Enable type safety
   */
  typeSafety?: boolean;
}

interface Drizzle_nextjs_integrationIntegrationFeatures {
  connectionPooling?: boolean;
  typeSafety?: boolean;
}
```

## 📝 Examples

### Basic Genome

```typescript
import { Genome } from '@thearchitech.xyz/marketplace';

const genome: Genome = {
  version: '1.0.0',
  project: {
    name: 'my-app',
    framework: 'nextjs',
    path: './my-app'
  },
  modules: [
    {
      id: 'framework/nextjs',
      parameters: {
        typescript: true,
        tailwind: true,
        appRouter: true
      }
    },
    {
      id: 'ui/shadcn-ui',
      parameters: {
        components: ['button', 'card', 'input']
      }
    }
  ]
};

export default genome;
```

### Type-Safe Module Configuration

```typescript
import { ModuleConfig, ParamsFor } from '@thearchitech.xyz/marketplace';

// Get specific parameter types
type NextjsParams = ParamsFor<'framework/nextjs'>;
type ShadcnParams = ParamsFor<'ui/shadcn-ui'>;

// Type-safe module configuration
const nextjsModule: ModuleConfig = {
  id: 'framework/nextjs',
  parameters: {
    typescript: true,        // ✅ Valid
    tailwind: true,         // ✅ Valid
    invalidParam: true      // ❌ TypeScript error
  }
};
```

### Runtime Validation

```typescript
import { Genome, adapterExists } from '@thearchitech.xyz/marketplace';

function validateGenome(genome: unknown): genome is Genome {
  if (typeof genome !== 'object' || genome === null) {
    return false;
  }
  
  const g = genome as any;
  
  // Check required properties
  if (!g.version || !g.project || !g.modules) {
    return false;
  }
  
  // Validate modules
  for (const module of g.modules) {
    if (!adapterExists(module.id.split('/')[0], module.id.split('/')[1])) {
      return false;
    }
  }
  
  return true;
}
```

## 🐛 Error Handling

### Common Errors

#### Type Errors

```typescript
// ❌ Wrong - parameter doesn't exist
{
  id: 'ui/shadcn-ui',
  parameters: {
    invalidParam: 'value'  // TypeScript error
  }
}

// ✅ Correct - use valid parameters
{
  id: 'ui/shadcn-ui',
  parameters: {
    components: ['button', 'card']  // Valid parameter
  }
}
```

#### Import Errors

```typescript
// ❌ Wrong - types not exported
import { Genome } from '@thearchitech.xyz/marketplace/types';

// ✅ Correct - types re-exported from main package
import { Genome } from '@thearchitech.xyz/marketplace';
```

## 📚 Additional Resources

- [README.md](./README.md) - Main documentation
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Contribution guidelines
- [DEVELOPMENT.md](./DEVELOPMENT.md) - Development workflow
- [GitHub Repository](https://github.com/the-architech-xyz/marketplace)
- [Discord Community](https://discord.gg/thearchitech)

---

**Built with ❤️ by The Architech Team**
