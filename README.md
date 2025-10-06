# The Architech Marketplace

> **Revolutionary 3-Tier Architecture for Modern Web Development**

The Architech Marketplace is a comprehensive ecosystem of Adapters, Integrators, and Features that provides type-safe, automated project generation capabilities. Built on our revolutionary 3-tier architecture, it enables developers to build modern web applications with unprecedented speed and consistency.

## 🏗️ The 3-Tier Architecture

### Tier 1: Adapters (The Raw Materials)
**Role**: Install ONE pure, self-contained technology
**Philosophy**: Foundational pillars that know nothing about each other
**Examples**: `nextjs`, `drizzle`, `shadcn-ui`, `better-auth`

### Tier 2: Integrators (The Technical Bridges)
**Role**: Connect exactly two Adapters to ensure technical compatibility
**Philosophy**: Low-level technical circuits that make things work together
**Examples**: `drizzle-nextjs-integration`, `better-auth-nextjs-integration`

### Tier 3: Features (The Business Capabilities)
**Role**: Provide high-level, end-user business capabilities
**Philosophy**: Functional appliances that consume Adapter and Integrator capabilities
**Examples**: `teams-dashboard`, `user-profile`, `payment-management`

## 🚀 Quick Start

### Installation

```bash
# Clone and build from source
git clone https://github.com/the-architech/cli.git
cd cli
npm install
npm run build

# Test the CLI
node dist/index.js --version
```

### Basic Usage

```typescript
import { Genome } from '@thearchitech.xyz/marketplace';

const genome: Genome = {
  version: '1.0.0',
  project: {
    name: 'my-app',
    description: 'My awesome application',
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
      },
      features: {
        performance: true,
        security: true
      }
    },
    {
      id: 'ui/shadcn-ui',
      parameters: {
        components: ['button', 'card', 'input', 'form']
      },
      features: {
        theming: true,
        accessibility: true
      }
    }
  ]
};

export default genome;
```

### Generate Your Project

```bash
# Test with dry run first
node dist/index.js new my-app.genome.ts --dry-run

# Create the project
node dist/index.js new my-app.genome.ts

# Navigate to project
cd my-app

# Install dependencies
npm install

# Start development
npm run dev
```

## 🏗️ Architecture Overview

### Core Components

- **📦 Adapters**: Core functionality modules (UI, Database, Auth, etc.)
- **🔗 Integrations**: Seamless connections between adapters
- **🧬 Genomes**: Type-safe project configurations
- **⚡ Blueprints**: Executable action definitions
- **🎯 Types**: Auto-generated TypeScript definitions

### Type Generation System

The marketplace uses an **automated type generation system** that creates high-fidelity TypeScript types from adapter schemas. This ensures:

- ✅ **Type Safety**: Compile-time validation of all configurations
- ✅ **IntelliSense**: Rich IDE support with autocomplete
- ✅ **Auto-sync**: Types always match current adapter capabilities
- ✅ **JSDoc Comments**: Comprehensive documentation in tooltips

## 📋 Available Adapters

### 🎨 UI Adapters
- **`ui/shadcn-ui`**: Beautiful React components with Radix UI
- **`ui/forms`**: Form handling with validation
- **`ui/tailwind`**: Tailwind CSS configuration

### 🗄️ Database Adapters
- **`database/drizzle`**: Type-safe ORM with migrations
- **`database/prisma`**: Next-generation ORM
- **`database/typeorm`**: Enterprise ORM
- **`database/sequelize`**: SQL ORM

### 🔐 Authentication Adapters
- **`auth/better-auth`**: Modern authentication with multiple providers

### 💳 Payment Adapters
- **`payment/stripe`**: Complete payment processing

### 📧 Email Adapters
- **`email/resend`**: Transactional email service

### 🌍 Content Adapters
- **`content/next-intl`**: Internationalization

### 🧪 Testing Adapters
- **`testing/vitest`**: Fast unit testing framework

### 📊 Observability Adapters
- **`observability/sentry`**: Error tracking and monitoring

### ⛓️ Blockchain Adapters
- **`blockchain/web3`**: Web3 and cryptocurrency integration

### 🚀 Deployment Adapters
- **`deployment/docker`**: Containerization

### 🛠️ Tooling Adapters
- **`tooling/dev-tools`**: Development utilities

## 🔧 Type-Safe Configuration

### High-Fidelity Types

The marketplace generates precise TypeScript types from adapter schemas:

```typescript
// Generated from adapter.json schemas
interface ShadcnUiParams {
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

interface StripePaymentParams {
  /**
   * Default currency for payments
   */
  currency?: 'usd' | 'eur' | 'gbp' | 'cad' | 'aud' | 'jpy';
  
  /**
   * Stripe mode (test or live)
   */
  mode?: 'test' | 'live';
  
  /**
   * Enable webhook handling
   */
  webhooks?: boolean;
}
```

### IntelliSense Support

Get full autocomplete and validation in your IDE:

```typescript
const genome: Genome = {
  // ... other config
  modules: [
    {
      id: 'ui/shadcn-ui',
      parameters: {
        components: [
          'button',    // ✅ Valid - autocomplete shows all options
          'invalid'    // ❌ Error - TypeScript catches invalid component
        ]
      }
    }
  ]
};
```

## 🧬 Genome Examples

### Minimal Next.js App

```typescript
import { Genome } from '@thearchitech.xyz/marketplace';

const minimalApp: Genome = {
  version: '1.0.0',
  project: {
    name: 'minimal-app',
    framework: 'nextjs',
    path: './minimal-app'
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

export default minimalApp;
```

### Full-Stack Application

```typescript
import { Genome } from '@thearchitech.xyz/marketplace';

const fullStackApp: Genome = {
  version: '1.0.0',
  project: {
    name: 'fullstack-app',
    description: 'Complete full-stack application',
    framework: 'nextjs',
    path: './fullstack-app'
  },
  modules: [
    // Framework
    {
      id: 'framework/nextjs',
      parameters: {
        typescript: true,
        tailwind: true,
        appRouter: true,
        srcDir: true
      },
      features: {
        performance: true,
        security: true,
        'server-actions': true
      }
    },
    
    // UI
    {
      id: 'ui/shadcn-ui',
      parameters: {
        components: ['button', 'card', 'input', 'dialog', 'form']
      },
      features: {
        theming: true,
        accessibility: true
      }
    },
    
    // Database
    {
      id: 'database/drizzle',
      parameters: {
        provider: 'neon',
        migrations: true,
        studio: true,
        databaseType: 'postgresql'
      },
      features: {
        migrations: true,
        studio: true
      }
    },
    
    // Authentication
    {
      id: 'auth/better-auth',
      parameters: {
        providers: ['github', 'email'],
        session: 'jwt',
        csrf: true
      },
      features: {
        'oauth-providers': true,
        'session-management': true
      }
    },
    
    // Payment
    {
      id: 'payment/stripe',
      parameters: {
        mode: 'test',
        webhooks: true
      },
      features: {
        'one-time-payments': true,
        subscriptions: true,
        invoicing: true
      }
    },
    
    // Integrations
    {
      id: 'drizzle-nextjs-integration',
      parameters: {
        connectionPooling: true,
        typeSafety: true
      }
    },
    {
      id: 'better-auth-drizzle-integration',
      parameters: {
        userSchema: true,
        adapterLogic: true,
        migrations: true
      }
    }
  ]
};

export default fullStackApp;
```

## 🔄 Development Workflow

### For Adapter Developers

#### 1. Creating a New Adapter

```bash
# Create adapter directory
mkdir -p adapters/category/adapter-name

# Create adapter.json schema
cat > adapters/category/adapter-name/adapter.json << EOF
{
  "id": "adapter-name",
  "name": "My Adapter",
  "description": "Description of my adapter",
  "category": "category",
  "version": "1.0.0",
  "blueprint": "blueprint.ts",
  "parameters": {
    "myParam": {
      "type": "string",
      "description": "My parameter description",
      "required": false,
      "default": "default-value"
    }
  },
  "features": {
    "myFeature": {
      "id": "myFeature",
      "name": "My Feature",
      "description": "My feature description"
    }
  }
}
EOF

# Create blueprint.ts
cat > adapters/category/adapter-name/blueprint.ts << EOF
import { Blueprint } from '@thearchitech.xyz/types';

const blueprint: Blueprint = {
  id: 'adapter-name-blueprint',
  name: 'My Adapter Blueprint',
  description: 'Blueprint for my adapter',
  actions: [
    {
      type: 'INSTALL_PACKAGES',
      packages: ['my-package@^1.0.0']
    }
  ]
};

export default blueprint;
EOF
```

#### 2. Schema Guidelines

**Parameter Types:**
- `string` - Text input
- `boolean` - True/false toggle
- `number` - Numeric input
- `array` - List of items
- `object` - Nested configuration
- `select` - Choose from predefined options

**Example Schema:**
```json
{
  "parameters": {
    "name": {
      "type": "string",
      "description": "Display name for the component",
      "required": true
    },
    "enabled": {
      "type": "boolean",
      "description": "Whether the feature is enabled",
      "required": false,
      "default": true
    },
    "components": {
      "type": "array",
      "description": "List of components to install",
      "required": false,
      "default": ["button", "input", "card"],
      "items": {
        "type": "string",
        "enum": ["button", "input", "card", "dialog", "form"]
      }
    },
    "mode": {
      "type": "select",
      "description": "Operation mode",
      "required": false,
      "default": "development",
      "choices": ["development", "staging", "production"]
    }
  }
}
```

#### 3. Type Generation

Types are automatically generated when you commit changes:

```bash
# Make changes to adapter.json
git add adapters/my-category/my-adapter/adapter.json

# Commit - types are automatically generated and included
git commit -m "feat: add new parameter to my-adapter"

# Types are now available in types/adapters/my-category/my-adapter/
```

### For Genome Authors

#### 1. Type-Safe Configuration

Always use the generated types for full type safety:

```typescript
import { Genome, ModuleConfig } from '@thearchitech.xyz/marketplace';

// Get specific parameter types
type NextjsParams = ParamsFor<'framework/nextjs'>;
type ShadcnParams = ParamsFor<'ui/shadcn-ui'>;

// Type-safe module configuration
const nextjsModule: ModuleConfig = {
  id: 'framework/nextjs',
  parameters: {
    typescript: true,        // ✅ TypeScript knows this is valid
    tailwind: true,         // ✅ TypeScript knows this is valid
    invalidParam: true      // ❌ TypeScript error - invalid parameter
  }
};
```

#### 2. Validation

The CLI automatically validates your genome against the type definitions:

```bash
# Run genome validation
npx architech validate my-genome.genome.ts

# Or use in CLI
npx architech new my-genome.genome.ts
```

## 🛠️ Advanced Usage

### Custom Type Extraction

```typescript
import { ParamsFor, FeaturesFor } from '@thearchitech.xyz/marketplace';

// Extract specific parameter types
type StripeParams = ParamsFor<'payment/stripe'>;
type StripeFeatures = FeaturesFor<'payment/stripe'>;

// Use in your own types
interface MyPaymentConfig extends StripeParams {
  customField: string;
}
```

### Runtime Type Checking

```typescript
import { Genome } from '@thearchitech.xyz/marketplace';

function validateGenome(genome: unknown): genome is Genome {
  // Runtime validation logic
  return typeof genome === 'object' && 
         genome !== null && 
         'modules' in genome;
}
```

## 🚨 Troubleshooting

### Common Issues

#### Type Errors in Genome

**Problem**: TypeScript errors when configuring modules
**Solution**: Check that parameter names and types match the generated types

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

#### Missing Types

**Problem**: Types not found when importing
**Solution**: Ensure you're importing from the correct package

```typescript
// ❌ Wrong - types not exported
import { Genome } from '@thearchitech.xyz/marketplace/types';

// ✅ Correct - types re-exported from main package
import { Genome } from '@thearchitech.xyz/marketplace';
```

#### Outdated Types

**Problem**: Types don't reflect latest adapter capabilities
**Solution**: Update the marketplace package

```bash
npm update @thearchitech.xyz/marketplace
```

### Development Issues

#### Pre-commit Hook Not Running

```bash
# Check husky installation
ls -la .husky/

# Reinstall husky
npm run prepare

# Check git hooks
ls -la .git/hooks/
```

#### Types Not Generated

```bash
# Run type generation manually
npm run types:generate

# Check for errors in the output
```

## 📚 API Reference

### Core Types

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

type ModuleConfig = 
  | { id: 'framework/nextjs'; parameters?: NextjsFrameworkParams; features?: NextjsFrameworkFeatures }
  | { id: 'ui/shadcn-ui'; parameters?: ShadcnUiParams; features?: ShadcnUiFeatures }
  | { id: 'database/drizzle'; parameters?: DrizzleDatabaseParams; features?: DrizzleDatabaseFeatures }
  // ... all other modules
  ;

type ParamsFor<T extends ModuleConfig['id']> = 
  Extract<ModuleConfig, { id: T }>['parameters'];

type FeaturesFor<T extends ModuleConfig['id']> = 
  Extract<ModuleConfig, { id: T }>['features'];
```

### Utility Functions

```typescript
// Get all available adapters
import { getAllAdapters } from '@thearchitech.xyz/marketplace';

const adapters = getAllAdapters();

// Check if adapter exists
import { adapterExists } from '@thearchitech.xyz/marketplace';

const exists = adapterExists('ui', 'shadcn-ui');

// Load adapter configuration
import { loadAdapter } from '@thearchitech.xyz/marketplace';

const adapter = loadAdapter('ui', 'shadcn-ui');
```

## 🤝 Contributing

### Adding New Adapters

1. Create adapter directory: `adapters/category/adapter-name/`
2. Add `adapter.json` schema file
3. Add `blueprint.ts` implementation
4. Add feature blueprints in `features/` directory
5. Add templates in `templates/` directory
6. Commit changes (types auto-generated)

### Adding New Integrations

1. Create integration directory: `integrations/integration-name/`
2. Add `integration.json` schema file
3. Add `blueprint.ts` implementation
4. Add templates in `templates/` directory
5. Commit changes (types auto-generated)

### Updating Existing Adapters

1. Modify `adapter.json` schema
2. Update `blueprint.ts` if needed
3. Commit changes (types auto-generated)

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 📚 Documentation

- [Contributor Quick Start](./docs/CONTRIBUTOR_QUICK_START.md) - **Start here for contributing**
- [Getting Started](./docs/GETTING_STARTED.md) - Quick start guide
- [Architecture](./docs/ARCHITECTURE.md) - 3-tier architecture overview
- [Adapter Guide](./docs/ADAPTER_GUIDE.md) - Creating adapters
- [Integrator Guide](./docs/INTEGRATOR_GUIDE.md) - Creating integrators
- [Feature Guide](./docs/FEATURE_GUIDE.md) - Creating features
- [Contributing](./docs/CONTRIBUTING.md) - Complete contribution guide

## 🆘 Support

- **Documentation**: [docs.thearchitech.dev](https://docs.thearchitech.dev)
- **Issues**: [GitHub Issues](https://github.com/the-architech-xyz/marketplace/issues)
- **Discussions**: [GitHub Discussions](https://github.com/the-architech-xyz/marketplace/discussions)
- **Discord**: [The Architech Community](https://discord.gg/thearchitech)

---

**Built with ❤️ by The Architech Team**
