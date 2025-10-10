# 📝 Blueprint Authoring Guide

> **Complete guide to creating modules with Constitutional Architecture**

## 📋 Table of Contents

1. [Overview](#overview)
2. [Constitutional Architecture Principles](#constitutional-architecture-principles)
3. [Creating Your First Module](#creating-your-first-module)
4. [Dynamic Blueprint Functions](#dynamic-blueprint-functions)
5. [Template Development](#template-development)
6. [Capability Design](#capability-design)
7. [Testing Your Module](#testing-your-module)
8. [Publishing Your Module](#publishing-your-module)
9. [Best Practices](#best-practices)

## 🎯 Overview

This guide walks you through creating modules (adapters and features) using The Architech's Constitutional Architecture. You'll learn how to create dynamic blueprint functions, design business capabilities, and develop intelligent templates.

### Key Concepts

- **🏛️ Constitutional Architecture** - Organize around business capabilities
- **🤖 Intelligent Defaults** - Define sensible defaults, users only specify overrides
- **⚡ Dynamic Blueprints** - Blueprints are TypeScript functions that adapt to configuration
- **🎨 Intelligent Templates** - Templates receive rich context for conditional rendering
- **🔗 Capability Dependencies** - Define prerequisites and resolve conflicts automatically

## 🏛️ Constitutional Architecture Principles

### 1. "Defaults are Implicit, Overrides are Explicit"

Users only specify what they want to change. Everything else uses sensible defaults.

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

Organize modules around what they do, not how they do it.

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

## 🚀 Creating Your First Module

### Step 1: Choose Module Type

#### Adapter (Technical Capability)
- **Purpose**: Single technology implementation
- **Examples**: Database, Email, State Management
- **Location**: `marketplace/adapters/{category}/{name}/`

#### Feature (Business Capability)
- **Purpose**: Complete business functionality
- **Examples**: Authentication, Payments, Teams
- **Location**: `marketplace/features/{name}/{frontend|backend}/{framework}/`

### Step 2: Create Directory Structure

#### For an Adapter
```
marketplace/adapters/{category}/{adapter-name}/
├── adapter.json              # Capability definition
├── blueprint.ts              # Dynamic blueprint function
└── templates/
    ├── core-feature.ts.tpl   # Core functionality
    └── optional-feature.ts.tpl # Optional features
```

#### For a Feature
```
marketplace/features/{feature-name}/
├── contract.ts               # Business contracts
├── frontend/{ui-framework}/
│   ├── feature.json         # Frontend capabilities
│   ├── blueprint.ts         # Frontend blueprint
│   └── templates/
└── backend/{technology-stack}/
    ├── feature.json         # Backend capabilities
    ├── blueprint.ts         # Backend blueprint
    └── templates/
```

### Step 3: Define Capabilities

#### Adapter Example
```json
{
  "id": "adapter:email/resend",
  "name": "Resend Email Service",
  "description": "Transactional email service with templates and analytics",
  "version": "1.0.0",
  "category": "email",
  "provides": ["email", "transactions", "templates", "analytics"],
  "parameters": {
    "features": {
      "templates": {
        "default": true,
        "description": "Email template management",
        "type": "boolean"
      },
      "analytics": {
        "default": false,
        "description": "Email analytics and tracking",
        "type": "boolean"
      },
      "campaigns": {
        "default": false,
        "description": "Email campaign management",
        "type": "boolean"
      }
    }
  },
  "internal_structure": {
    "core": ["client", "send-email"],
    "optional": {
      "templates": {
        "prerequisites": ["core"],
        "provides": ["template-management"],
        "templates": ["template-service.ts.tpl"]
      },
      "analytics": {
        "prerequisites": ["core"],
        "provides": ["email-analytics"],
        "templates": ["analytics-service.ts.tpl"]
      }
    }
  }
}
```

#### Feature Example
```json
{
  "id": "feature:auth-ui/shadcn",
  "name": "Authentication UI Components",
  "description": "Complete authentication UI with Shadcn/UI components",
  "version": "1.0.0",
  "category": "feature",
  "provides": ["authentication", "user-management", "security"],
  "parameters": {
    "features": {
      "passwordReset": {
        "default": true,
        "description": "Password reset functionality",
        "type": "boolean"
      },
      "mfa": {
        "default": false,
        "description": "Multi-factor authentication",
        "type": "boolean"
      },
      "socialLogins": {
        "default": false,
        "description": "Social login providers",
        "type": "array",
        "items": {
          "type": "string",
          "enum": ["github", "google", "microsoft"]
        }
      }
    }
  },
  "internal_structure": {
    "core": ["loginForm", "signupForm", "profileManagement"],
    "optional": {
      "passwordReset": {
        "prerequisites": ["core"],
        "provides": ["password-reset"],
        "templates": ["password-reset-form.tsx.tpl"]
      },
      "mfa": {
        "prerequisites": ["core"],
        "provides": ["multi-factor-auth"],
        "templates": ["mfa-setup.tsx.tpl"]
      }
    }
  }
}
```

## ⚡ Dynamic Blueprint Functions

### Function Signature

```typescript
import { BlueprintAction, MergedConfiguration } from '@thearchitech.xyz/types';

export default function generateBlueprint(
  config: MergedConfiguration
): BlueprintAction[] {
  const actions: BlueprintAction[] = [];
  
  // Your blueprint logic here
  
  return actions;
}
```

### Configuration Object

```typescript
interface MergedConfiguration {
  activeFeatures: string[];        // Features enabled by user
  resolvedCapabilities: string[];  // Capabilities this module provides
  executionOrder: string[];        // Order of capability execution
  conflicts: ConfigurationConflict[]; // Any conflicts detected
  templateContext?: Record<string, any>; // Global template context
}
```

### Basic Blueprint Pattern

```typescript
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

### Advanced Blueprint Pattern

```typescript
export default function generateBlueprint(config: MergedConfiguration): BlueprintAction[] {
  const actions: BlueprintAction[] = [];
  
  // Core functionality
  actions.push(...generateCoreActions());
  
  // Feature-specific functionality
  for (const feature of config.activeFeatures) {
    switch (feature) {
      case 'templates':
        actions.push(...generateTemplatesActions());
        break;
      case 'analytics':
        actions.push(...generateAnalyticsActions());
        break;
      case 'campaigns':
        actions.push(...generateCampaignsActions());
        break;
    }
  }
  
  // API routes (for features)
  if (config.resolvedCapabilities.includes('api')) {
    actions.push(...generateAPIActions());
  }
  
  return actions;
}
```

## 🎨 Template Development

### Template Context

Templates receive rich context for conditional rendering:

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

{{#if context.hasAnalytics}}
// Analytics functionality
export async function trackEmailEvent({
  emailId,
  event,
  data
}: {
  emailId: string;
  event: string;
  data: Record<string, any>;
}) {
  // Analytics tracking logic
}
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
│   ├── client.ts.tpl
│   └── types.ts.tpl
├── templates/
│   ├── template-service.ts.tpl
│   └── template-types.ts.tpl
├── analytics/
│   ├── analytics-service.ts.tpl
│   └── analytics-types.ts.tpl
└── campaigns/
    ├── campaign-service.ts.tpl
    └── campaign-types.ts.tpl
```

## 🔗 Capability Design

### Designing Effective Capabilities

#### 1. Think Business Value

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

#### 2. Define Clear Prerequisites

```json
{
  "internal_structure": {
    "core": ["client", "send-email"],
    "optional": {
      "templates": {
        "prerequisites": ["core"],
        "provides": ["template-management"]
      },
      "analytics": {
        "prerequisites": ["core"],
        "provides": ["email-analytics"]
      }
    }
  }
}
```

#### 3. Use Sensible Defaults

```json
{
  "parameters": {
    "features": {
      "templates": { "default": true },    // Most users want this
      "analytics": { "default": false },   // Advanced feature
      "campaigns": { "default": false }    // Optional feature
    }
  }
}
```

### Capability Dependencies

#### Simple Dependencies

```json
{
  "templates": {
    "prerequisites": ["core"],
    "provides": ["template-management"]
  }
}
```

#### Complex Dependencies

```json
{
  "campaigns": {
    "prerequisites": ["core", "templates", "analytics"],
    "provides": ["campaign-management"]
  }
}
```

#### Circular Dependencies (Avoid)

```json
// ❌ Avoid - Circular dependencies
{
  "featureA": {
    "prerequisites": ["featureB"]
  },
  "featureB": {
    "prerequisites": ["featureA"]
  }
}
```

## 🧪 Testing Your Module

### Test Blueprint Function

```typescript
// test/blueprint.test.ts
import { describe, it, expect } from 'vitest';
import generateBlueprint from '../blueprint';

describe('Module Blueprint', () => {
  it('should generate core actions by default', () => {
    const config = {
      activeFeatures: ['core'],
      resolvedCapabilities: ['email'],
      executionOrder: ['core'],
      conflicts: []
    };
    
    const actions = generateBlueprint(config);
    
    expect(actions).toHaveLength(2);
    expect(actions[0].type).toBe('CREATE_FILE');
    expect(actions[1].type).toBe('INSTALL_PACKAGES');
  });
  
  it('should generate template actions when enabled', () => {
    const config = {
      activeFeatures: ['core', 'templates'],
      resolvedCapabilities: ['email', 'template-management'],
      executionOrder: ['core', 'templates'],
      conflicts: []
    };
    
    const actions = generateBlueprint(config);
    
    expect(actions.some(a => a.path?.includes('templates'))).toBe(true);
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
    const template = 'templates/email-client.ts.tpl';
    const context = {
      features: ['core'],
      hasTemplates: false,
      hasAnalytics: false
    };
    
    const result = await renderTemplate(template, context);
    
    expect(result).toContain('export async function sendEmail');
    expect(result).not.toContain('// Template functionality');
    expect(result).not.toContain('// Analytics functionality');
  });
  
  it('should render with templates when enabled', async () => {
    const template = 'templates/email-client.ts.tpl';
    const context = {
      features: ['core', 'templates'],
      hasTemplates: true,
      hasAnalytics: false
    };
    
    const result = await renderTemplate(template, context);
    
    expect(result).toContain('// Template functionality');
    expect(result).toContain('sendTemplateEmail');
  });
});
```

## 📦 Publishing Your Module

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
  },
  "features": {
    "feature:auth-ui/shadcn": {
      "version": "1.0.0",
      "path": "features/auth/frontend/shadcn",
      "capabilities": ["authentication", "user-management"]
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

// types/features/auth.ts
export interface AuthFeature {
  id: 'feature:auth-ui/shadcn';
  parameters: {
    features: {
      passwordReset: boolean;
      mfa: boolean;
      socialLogins: string[];
    };
  };
}
```

### 3. Test Integration

```bash
# Test your module
architech new test-genome.ts --dry-run

# Verify capability resolution
architech new test-genome.ts --verbose
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

### 2. Use Clear Prerequisites

```json
{
  "campaigns": {
    "prerequisites": ["core", "templates", "analytics"],
    "provides": ["campaign-management"]
  }
}
```

### 3. Provide Rich Context

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

### 4. Organize Templates by Capability

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

### 5. Handle Dependencies Gracefully

```typescript
// Check prerequisites before generating actions
if (config.activeFeatures.includes('campaigns')) {
  const requiredFeatures = ['core', 'templates', 'analytics'];
  const missingFeatures = requiredFeatures.filter(
    feature => !config.activeFeatures.includes(feature)
  );
  
  if (missingFeatures.length > 0) {
    throw new Error(`Campaigns requires: ${missingFeatures.join(', ')}`);
  }
  
  actions.push(...generateCampaignsActions());
}
```

### 6. Use Type Safety

```typescript
// ✅ Good - Type-safe configuration
interface ModuleConfig {
  features: {
    templates: boolean;
    analytics: boolean;
    campaigns: boolean;
  };
}

export default function generateBlueprint(
  config: MergedConfiguration
): BlueprintAction[] {
  // TypeScript will validate the configuration
  const { features } = config as { features: ModuleConfig['features'] };
  
  // Your blueprint logic here
}
```

## 📚 Additional Resources

- **[Constitutional Architecture Guide](../../Architech/docs/CONSTITUTIONAL_ARCHITECTURE.md)** - Deep dive into the architecture
- **[Adapter Development Guide](./ADAPTER_DEVELOPMENT_GUIDE.md)** - Creating adapters
- **[Feature Development Guide](./FEATURE_GUIDE.md)** - Creating features
- **[Template Development Guide](./TEMPLATE_DEVELOPMENT_GUIDE.md)** - Advanced template techniques
- **[Testing Guide](./TESTING_GUIDE.md)** - Comprehensive testing strategies

---

**Happy module development! 📝**

*For more information about the Constitutional Architecture, see the [CLI documentation](../../Architech/docs/).*