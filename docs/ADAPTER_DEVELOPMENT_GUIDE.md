# 🔌 Adapter Development Guide

> **Complete guide to creating adapters with Constitutional Architecture**

## 📋 Table of Contents

1. [Overview](#overview)
2. [Constitutional Architecture for Adapters](#constitutional-architecture-for-adapters)
3. [Adapter Structure](#adapter-structure)
4. [Creating Your First Adapter](#creating-your-first-adapter)
5. [Dynamic Blueprint Functions](#dynamic-blueprint-functions)
6. [Template Development](#template-development)
7. [Capability Definition](#capability-definition)
8. [Best Practices](#best-practices)
9. [Testing Your Adapter](#testing-your-adapter)
10. [Publishing Your Adapter](#publishing-your-adapter)

## 🎯 Overview

Adapters in The Architech's Constitutional Architecture are **capability-based modules** that provide specific business or technical capabilities. They use **dynamic blueprint functions** and **intelligent template context** to generate code based on user configuration.

### Key Principles

- **🏛️ Constitutional Architecture** - Organize around business capabilities
- **🤖 Intelligent Defaults** - Define sensible defaults, users only specify overrides
- **⚡ Dynamic Blueprints** - Blueprints are TypeScript functions that adapt to configuration
- **🎨 Intelligent Templates** - Templates receive rich context for conditional rendering
- **🔗 Capability Dependencies** - Define prerequisites and resolve conflicts automatically

## 🏛️ Constitutional Architecture for Adapters

### Business Capability Hierarchy

Adapters are organized around **business capabilities** rather than technical implementation:

```json
{
  "id": "adapter:database/drizzle",
  "provides": ["database", "orm", "migrations", "type-safety"],
  "parameters": {
    "features": {
      "migrations": { "default": true },
      "studio": { "default": false },
      "relations": { "default": true },
      "seeding": { "default": false }
    }
  },
  "internal_structure": {
    "core": ["schema", "client", "type-safety"],
    "optional": {
      "migrations": {
        "prerequisites": ["core"],
        "provides": ["migration-system"],
        "templates": ["migration-files.tpl", "migration-config.tpl"]
      },
      "studio": {
        "prerequisites": ["core"],
        "provides": ["database-studio"],
        "templates": ["studio-config.tpl"]
      }
    }
  }
}
```

### Capability Resolution

The system automatically resolves:
- **Prerequisites** - What capabilities must be available first
- **Conflicts** - Multiple adapters providing the same capability
- **Dependencies** - Required modules and execution order
- **Validation** - Ensures all prerequisites are met

## 🏗️ Adapter Structure

### Directory Structure

```
marketplace/adapters/{category}/{adapter-name}/
├── adapter.json              # Capability definition and configuration
├── blueprint.ts              # Dynamic blueprint function
└── templates/
    ├── core-feature.ts.tpl   # Core functionality templates
    ├── optional-feature.ts.tpl # Optional feature templates
    └── ...
```

### Adapter Configuration (`adapter.json`)

```json
{
  "id": "adapter:database/drizzle",
  "name": "Drizzle ORM",
  "description": "TypeScript-first ORM with full type safety",
  "version": "1.0.0",
  "category": "database",
  "provides": ["database", "orm", "migrations", "type-safety"],
  "parameters": {
    "features": {
      "migrations": {
        "default": true,
        "description": "Database migration system",
        "type": "boolean"
      },
      "studio": {
        "default": false,
        "description": "Database studio interface",
        "type": "boolean"
      },
      "relations": {
        "default": true,
        "description": "Database relations support",
        "type": "boolean"
      },
      "seeding": {
        "default": false,
        "description": "Database seeding functionality",
        "type": "boolean"
      }
    }
  },
  "internal_structure": {
    "core": ["schema", "client", "type-safety"],
    "optional": {
      "migrations": {
        "prerequisites": ["core"],
        "provides": ["migration-system"],
        "templates": ["migration-files.tpl", "migration-config.tpl"]
      },
      "studio": {
        "prerequisites": ["core"],
        "provides": ["database-studio"],
        "templates": ["studio-config.tpl"]
      },
      "relations": {
        "prerequisites": ["core"],
        "provides": ["relation-system"],
        "templates": ["relation-definitions.tpl"]
      },
      "seeding": {
        "prerequisites": ["core", "migrations"],
        "provides": ["seeding-system"],
        "templates": ["seed-files.tpl", "seed-config.tpl"]
      }
    }
  }
}
```

## 🚀 Creating Your First Adapter

### Step 1: Define Capabilities

Start by defining what your adapter provides:

```json
{
  "id": "adapter:email/resend",
  "provides": ["email", "transactions", "templates", "analytics"],
  "parameters": {
    "features": {
      "templates": { "default": true },
      "analytics": { "default": false },
      "campaigns": { "default": false }
    }
  }
}
```

### Step 2: Create Dynamic Blueprint Function

```typescript
// blueprint.ts
import { BlueprintAction, MergedConfiguration } from '@thearchitech.xyz/types';

export default function generateBlueprint(config: MergedConfiguration): BlueprintAction[] {
  const actions: BlueprintAction[] = [];
  
  // Always generate core actions
  actions.push(...generateCoreActions());
  
  // Conditionally generate feature-specific actions
  if (config.activeFeatures.includes('templates')) {
    actions.push(...generateTemplatesActions());
  }
  
  if (config.activeFeatures.includes('analytics')) {
    actions.push(...generateAnalyticsActions());
  }
  
  if (config.activeFeatures.includes('campaigns')) {
    actions.push(...generateCampaignsActions());
  }
  
  return actions;
}

function generateCoreActions(): BlueprintAction[] {
  return [
    {
      type: 'CREATE_FILE',
      path: 'src/lib/email/resend.ts',
      template: 'templates/resend-client.ts.tpl',
      context: { features: ['core'] }
    },
    {
      type: 'INSTALL_PACKAGES',
      packages: ['resend']
    }
  ];
}

function generateTemplatesActions(): BlueprintAction[] {
  return [
    {
      type: 'CREATE_FILE',
      path: 'src/lib/email/templates.ts',
      template: 'templates/email-templates.ts.tpl',
      context: { 
        features: ['templates'],
        hasTemplates: true 
      }
    }
  ];
}
```

### Step 3: Create Templates with Context

```handlebars
{{!-- templates/resend-client.ts.tpl --}}
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
  to,
  subject,
  html,
  from = 'noreply@{{project.name}}.com'
}: {
  to: string;
  subject: string;
  html: string;
  from?: string;
}) {
  return await resend.emails.send({
    from,
    to,
    subject,
    html
  });
}

{{#if context.hasTemplates}}
// Template functionality
export async function sendTemplateEmail({
  to,
  templateId,
  data
}: {
  to: string;
  templateId: string;
  data: Record<string, any>;
}) {
  // Template email logic
}
{{/if}}
```

## ⚡ Dynamic Blueprint Functions

### Function Signature

```typescript
export default function generateBlueprint(
  config: MergedConfiguration
): BlueprintAction[] {
  // Your blueprint logic here
}
```

### Configuration Object

The `MergedConfiguration` object contains:

```typescript
interface MergedConfiguration {
  activeFeatures: string[];        // Features enabled by user
  resolvedCapabilities: string[];  // Capabilities this adapter provides
  executionOrder: string[];        // Order of capability execution
  conflicts: ConfigurationConflict[]; // Any conflicts detected
  templateContext?: Record<string, any>; // Global template context
}
```

### Conditional Generation

Use the configuration to conditionally generate actions:

```typescript
export default function generateBlueprint(config: MergedConfiguration): BlueprintAction[] {
  const actions: BlueprintAction[] = [];
  
  // Always generate core
  actions.push(...generateCoreActions());
  
  // Conditional features
  if (config.activeFeatures.includes('migrations')) {
    actions.push(...generateMigrationsActions());
  }
  
  if (config.activeFeatures.includes('studio')) {
    actions.push(...generateStudioActions());
  }
  
  return actions;
}
```

## 🎨 Template Development

### Intelligent Template Context

Templates receive rich context for conditional rendering:

```handlebars
{{!-- templates/database-schema.ts.tpl --}}
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql);

// Core schema
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow()
});

{{#if context.hasRelations}}
// Relations
export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content'),
  authorId: integer('author_id').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow()
});

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts)
}));
{{/if}}

{{#if context.hasMigrations}}
// Migration utilities
export const migrate = async () => {
  // Migration logic
};
{{/if}}
```

### Context Properties

Templates have access to:

- **`context.features`** - Array of active features
- **`context.hasFeatureName`** - Boolean for specific features
- **`context.project`** - Project information
- **`context.module`** - Module information
- **Custom context** - Passed from blueprint actions

## 🔗 Capability Definition

### Defining Capabilities

Each adapter defines what capabilities it provides:

```json
{
  "provides": ["database", "orm", "migrations", "type-safety"],
  "internal_structure": {
    "core": ["schema", "client", "type-safety"],
    "optional": {
      "migrations": {
        "prerequisites": ["core"],
        "provides": ["migration-system"],
        "templates": ["migration-files.tpl"]
      }
    }
  }
}
```

### Prerequisites

Define what capabilities must be available first:

```json
{
  "seeding": {
    "prerequisites": ["core", "migrations"],
    "provides": ["seeding-system"],
    "templates": ["seed-files.tpl"]
  }
}
```

### Capability Conflicts

The system automatically detects and resolves conflicts:

```typescript
// Multiple adapters providing the same capability
const conflicts = [
  {
    type: 'duplicate_capability',
    message: 'Multiple adapters provide "database" capability',
    affectedCapabilities: ['database'],
    conflictingModules: ['adapter:database/drizzle', 'adapter:database/prisma']
  }
];
```

## 🎯 Best Practices

### 1. Define Clear Capabilities

```json
// ✅ Good - Clear business capabilities
{
  "provides": ["authentication", "user-management", "security"]
}

// ❌ Avoid - Technical implementation details
{
  "provides": ["jwt-tokens", "bcrypt-hashing", "session-storage"]
}
```

### 2. Use Sensible Defaults

```json
// ✅ Good - Most users want these features
{
  "features": {
    "passwordReset": { "default": true },
    "mfa": { "default": false },
    "socialLogins": { "default": false }
  }
}
```

### 3. Organize Templates by Capability

```
templates/
├── core/
│   ├── client.ts.tpl
│   └── types.ts.tpl
├── migrations/
│   ├── migration-files.ts.tpl
│   └── migration-config.ts.tpl
└── studio/
    └── studio-config.ts.tpl
```

### 4. Provide Rich Context

```typescript
// ✅ Good - Rich context for templates
{
  type: 'CREATE_FILE',
  path: 'src/lib/auth/index.ts',
  template: 'templates/auth-client.ts.tpl',
  context: {
    features: ['passwordReset', 'mfa'],
    hasPasswordReset: true,
    hasMFA: true,
    socialProviders: ['github', 'google']
  }
}
```

### 5. Handle Prerequisites Gracefully

```typescript
// ✅ Good - Check prerequisites
if (config.activeFeatures.includes('seeding')) {
  if (!config.activeFeatures.includes('migrations')) {
    throw new Error('Seeding requires migrations to be enabled');
  }
  actions.push(...generateSeedingActions());
}
```

## 🧪 Testing Your Adapter

### Test Blueprint Function

```typescript
// test/blueprint.test.ts
import { describe, it, expect } from 'vitest';
import generateBlueprint from '../blueprint';

describe('Adapter Blueprint', () => {
  it('should generate core actions by default', () => {
    const config = {
      activeFeatures: ['core'],
      resolvedCapabilities: ['database'],
      executionOrder: ['core'],
      conflicts: []
    };
    
    const actions = generateBlueprint(config);
    
    expect(actions).toHaveLength(2);
    expect(actions[0].type).toBe('CREATE_FILE');
    expect(actions[1].type).toBe('INSTALL_PACKAGES');
  });
  
  it('should generate migration actions when enabled', () => {
    const config = {
      activeFeatures: ['core', 'migrations'],
      resolvedCapabilities: ['database', 'migration-system'],
      executionOrder: ['core', 'migrations'],
      conflicts: []
    };
    
    const actions = generateBlueprint(config);
    
    expect(actions.some(a => a.path?.includes('migration'))).toBe(true);
  });
});
```

### Test Template Rendering

```typescript
// test/templates.test.ts
import { describe, it, expect } from 'vitest';
import { renderTemplate } from '@thearchitech.xyz/template-engine';

describe('Template Rendering', () => {
  it('should render core template correctly', async () => {
    const template = 'templates/database-schema.ts.tpl';
    const context = {
      features: ['core'],
      hasRelations: false,
      hasMigrations: false
    };
    
    const result = await renderTemplate(template, context);
    
    expect(result).toContain('export const db = drizzle(sql);');
    expect(result).not.toContain('// Relations');
    expect(result).not.toContain('// Migration utilities');
  });
  
  it('should render with relations when enabled', async () => {
    const template = 'templates/database-schema.ts.tpl';
    const context = {
      features: ['core', 'relations'],
      hasRelations: true,
      hasMigrations: false
    };
    
    const result = await renderTemplate(template, context);
    
    expect(result).toContain('// Relations');
    expect(result).toContain('export const usersRelations');
  });
});
```

## 📦 Publishing Your Adapter

### 1. Update Marketplace Manifest

```json
// marketplace/manifest.json
{
  "adapters": {
    "adapter:email/resend": {
      "version": "1.0.0",
      "path": "adapters/email/resend",
      "capabilities": ["email", "transactions", "templates"]
    }
  }
}
```

### 2. Add to Type Definitions

```typescript
// types/adapters/resend.ts
export interface ResendAdapter {
  id: 'adapter:email/resend';
  parameters: {
    features: {
      templates: boolean;
      analytics: boolean;
      campaigns: boolean;
    };
  };
}
```

### 3. Test Integration

```bash
# Test your adapter
architech new test-genome.ts --dry-run

# Verify capability resolution
architech new test-genome.ts --verbose
```

## 📚 Additional Resources

- **[Constitutional Architecture Guide](../../Architech/docs/CONSTITUTIONAL_ARCHITECTURE.md)** - Deep dive into the architecture
- **[Template Development Guide](./TEMPLATE_DEVELOPMENT_GUIDE.md)** - Advanced template techniques
- **[Capability Design Guide](./CAPABILITY_DESIGN_GUIDE.md)** - Designing effective capabilities
- **[Testing Guide](./TESTING_GUIDE.md)** - Comprehensive testing strategies

---

**Happy adapter development! 🔌**

*For more information about the Constitutional Architecture, see the [CLI documentation](../../Architech/docs/).*