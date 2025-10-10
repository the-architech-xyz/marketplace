# 🏛️ Marketplace Architecture

> **Complete architectural documentation for The Architech's marketplace modules**

## 📋 Table of Contents

1. [Overview](#overview)
2. [Constitutional Architecture Principles](#constitutional-architecture-principles)
3. [Module Types](#module-types)
4. [Capability System](#capability-system)
5. [Dynamic Blueprint System](#dynamic-blueprint-system)
6. [Template System](#template-system)
7. [Dependency Resolution](#dependency-resolution)
8. [Module Development](#module-development)
9. [Best Practices](#best-practices)

## 🎯 Overview

The Architech's marketplace implements a revolutionary **Constitutional Architecture** that organizes modules around business capabilities rather than technical implementation. This creates a more intuitive, maintainable, and powerful system for both users and developers.

### Key Principles

- **🏛️ Constitutional Architecture** - Organize around business capabilities
- **🤖 Intelligent Defaults** - Define sensible defaults, users only specify overrides
- **⚡ Dynamic Blueprints** - Blueprints are TypeScript functions that adapt to configuration
- **🎨 Intelligent Templates** - Templates receive rich context for conditional rendering
- **🔗 Capability Dependencies** - Define prerequisites and resolve conflicts automatically

## 🏛️ Constitutional Architecture Principles

### 1. "Defaults are Implicit, Overrides are Explicit"

Users only specify what they want to change. Everything else uses sensible defaults defined by the module.

```typescript
// ✅ User only specifies overrides
{
  id: 'feature:auth-ui/shadcn',
  parameters: {
    mfa: true,  // ← Only specify what you want to change
    socialLogins: ['github', 'google']
    // passwordReset: true (already default)
    // profileManagement: true (already default)
  }
}
```

### 2. Business Capability Hierarchy

Modules are organized around what they do, not how they do it.

```json
{
  "provides": ["authentication", "user-management", "security"],
  "internal_structure": {
    "core": ["loginForm", "signupForm"],
    "optional": {
      "passwordReset": {
        "prerequisites": ["core"],
        "provides": ["password-reset"]
      }
    }
  }
}
```

### 3. Intelligent Dependency Resolution

The system automatically resolves prerequisites and conflicts.

```typescript
// System automatically ensures:
// 1. 'core' capabilities are always available
// 2. 'passwordReset' requires 'core' to be available first
// 3. No conflicts between modules providing the same capability
```

## 🏗️ Module Types

### Adapters (Technical Capabilities)

**Purpose**: Single technology implementation
**Location**: `marketplace/adapters/{category}/{name}/`
**Examples**: Database, Email, State Management, UI Components

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
  }
}
```

### Features (Business Capabilities)

**Purpose**: Complete business functionality
**Location**: `marketplace/features/{name}/{frontend|backend}/{framework}/`
**Examples**: Authentication, Payments, Teams, AI Chat

```json
{
  "id": "feature:auth-ui/shadcn",
  "provides": ["authentication", "user-management", "security"],
  "parameters": {
    "features": {
      "passwordReset": { "default": true },
      "mfa": { "default": false },
      "socialLogins": { "default": false }
    }
  }
}
```

### Connectors (Integration Capabilities)

**Purpose**: Connect multiple technologies
**Location**: `marketplace/connectors/{requester}-{provider}/`
**Examples**: Zustand-NextJS, RHF-Zod-Shadcn, Vitest-NextJS

```json
{
  "id": "connector:zustand-nextjs",
  "provides": ["state-management", "ssr", "hydration"],
  "enhances": ["adapter:state/zustand"]
}
```

## 🔗 Capability System

### Capability Definition

Each module defines what capabilities it provides:

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
// Multiple modules providing the same capability
const conflicts = [
  {
    type: 'duplicate_capability',
    message: 'Multiple modules provide "database" capability',
    affectedCapabilities: ['database'],
    conflictingModules: ['adapter:database/drizzle', 'adapter:database/prisma']
  }
];
```

## ⚡ Dynamic Blueprint System

### Blueprint Functions

Blueprints are now TypeScript functions that generate actions based on configuration:

```typescript
import { BlueprintAction, MergedConfiguration } from '@thearchitech.xyz/types';

export default function generateBlueprint(
  config: MergedConfiguration
): BlueprintAction[] {
  const actions: BlueprintAction[] = [];
  
  // Always generate core actions
  actions.push(...generateCoreActions());
  
  // Conditionally generate feature-specific actions
  if (config.activeFeatures.includes('migrations')) {
    actions.push(...generateMigrationsActions());
  }
  
  if (config.activeFeatures.includes('studio')) {
    actions.push(...generateStudioActions());
  }
  
  return actions;
}
```

### Configuration Merging

The system automatically merges user overrides with module defaults:

```typescript
// User genome
{
  id: 'adapter:database/drizzle',
  parameters: {
    studio: true,
    seeding: true
  }
}

// Merged configuration
{
  activeFeatures: ['core', 'migrations', 'studio', 'seeding'],
  resolvedCapabilities: ['database', 'orm', 'migration-system', 'database-studio', 'seeding-system'],
  executionOrder: ['core', 'migrations', 'studio', 'seeding'],
  conflicts: []
}
```

### Action Generation

```typescript
function generateCoreActions(): BlueprintAction[] {
  return [
    {
      type: 'CREATE_FILE',
      path: 'src/lib/db/schema.ts',
      template: 'templates/schema.ts.tpl',
      context: { features: ['core'] }
    },
    {
      type: 'INSTALL_PACKAGES',
      packages: ['drizzle-orm', 'drizzle-kit']
    }
  ];
}

function generateMigrationsActions(): BlueprintAction[] {
  return [
    {
      type: 'CREATE_FILE',
      path: 'src/lib/db/migrate.ts',
      template: 'templates/migrate.ts.tpl',
      context: { 
        features: ['migrations'],
        hasMigrations: true 
      }
    }
  ];
}
```

## 🎨 Template System

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

### Template Organization

```
templates/
├── core/
│   ├── schema.ts.tpl
│   └── client.ts.tpl
├── migrations/
│   ├── migration-files.ts.tpl
│   └── migration-config.ts.tpl
├── studio/
│   └── studio-config.ts.tpl
└── seeding/
    ├── seed-files.ts.tpl
    └── seed-config.ts.tpl
```

## 🔗 Dependency Resolution

### Prerequisite Resolution

The system automatically resolves prerequisites:

```typescript
// Example: Seeding requires migrations
if (config.activeFeatures.includes('seeding')) {
  if (!config.activeFeatures.includes('migrations')) {
    throw new Error('Seeding requires migrations to be enabled');
  }
  actions.push(...generateSeedingActions());
}
```

### Conflict Detection

```typescript
// Detect capability conflicts
const conflicts = detectCapabilityConflicts(modules);

if (conflicts.length > 0) {
  for (const conflict of conflicts) {
    console.warn(`Conflict detected: ${conflict.message}`);
  }
}
```

### Execution Order

The system uses topological sorting to determine execution order:

```typescript
// Example execution order
const executionOrder = [
  'core',        // Always first
  'migrations',  // Requires core
  'studio',      // Requires core
  'seeding'      // Requires core and migrations
];
```

## 🚀 Module Development

### Creating a New Module

#### 1. Define Capabilities

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

#### 2. Create Blueprint Function

```typescript
export default function generateBlueprint(config: MergedConfiguration): BlueprintAction[] {
  const actions: BlueprintAction[] = [];
  
  actions.push(...generateCoreActions());
  
  if (config.activeFeatures.includes('templates')) {
    actions.push(...generateTemplatesActions());
  }
  
  return actions;
}
```

#### 3. Create Templates

```handlebars
{{!-- templates/email-client.ts.tpl --}}
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

## 🎯 Best Practices

### 1. Design for Business Value

```json
// ✅ Good - Business capabilities
{
  "provides": ["authentication", "user-management", "security"]
}

// ❌ Avoid - Technical implementation
{
  "provides": ["jwt-tokens", "bcrypt-hashing", "session-storage"]
}
```

### 2. Use Sensible Defaults

```json
{
  "parameters": {
    "features": {
      "passwordReset": { "default": true },    // Most users want this
      "mfa": { "default": false },             // Advanced feature
      "socialLogins": { "default": false }     // Optional feature
    }
  }
}
```

### 3. Define Clear Prerequisites

```json
{
  "seeding": {
    "prerequisites": ["core", "migrations"],
    "provides": ["seeding-system"]
  }
}
```

### 4. Provide Rich Context

```typescript
{
  type: 'CREATE_FILE',
  path: 'src/components/auth/LoginForm.tsx',
  template: 'templates/LoginForm.tsx.tpl',
  context: {
    features: ['passwordReset', 'socialLogins'],
    hasPasswordReset: true,
    hasSocialLogins: true,
    socialProviders: ['github', 'google']
  }
}
```

### 5. Organize Templates by Capability

```
templates/
├── core/
│   ├── client.ts.tpl
│   └── types.ts.tpl
├── templates/
│   ├── template-service.ts.tpl
│   └── template-types.ts.tpl
└── analytics/
    ├── analytics-service.ts.tpl
    └── analytics-types.ts.tpl
```

### 6. Handle Dependencies Gracefully

```typescript
// Check prerequisites before generating actions
if (config.activeFeatures.includes('seeding')) {
  const requiredFeatures = ['core', 'migrations'];
  const missingFeatures = requiredFeatures.filter(
    feature => !config.activeFeatures.includes(feature)
  );
  
  if (missingFeatures.length > 0) {
    throw new Error(`Seeding requires: ${missingFeatures.join(', ')}`);
  }
  
  actions.push(...generateSeedingActions());
}
```

## 📚 Additional Resources

- **[Constitutional Architecture Guide](../../Architech/docs/CONSTITUTIONAL_ARCHITECTURE.md)** - Deep dive into the architecture
- **[Adapter Development Guide](./ADAPTER_DEVELOPMENT_GUIDE.md)** - Creating adapters
- **[Feature Development Guide](./FEATURE_GUIDE.md)** - Creating features
- **[Authoring Guide](./AUTHORING_GUIDE.md)** - Complete module development guide
- **[Template Development Guide](./TEMPLATE_DEVELOPMENT_GUIDE.md)** - Advanced template techniques

---

**The Constitutional Architecture** - Transforming module development from technical complexity to business clarity.

*For more information about the CLI and user experience, see the [CLI documentation](../../Architech/docs/).*