# 🎯 Feature Development Guide

> **Complete guide to creating features with Constitutional Architecture**

## 📋 Table of Contents

1. [Overview](#overview)
2. [Constitutional Architecture for Features](#constitutional-architecture-for-features)
3. [Feature Structure](#feature-structure)
4. [Creating Your First Feature](#creating-your-first-feature)
5. [Business Capability Design](#business-capability-design)
6. [Dynamic Blueprint Functions](#dynamic-blueprint-functions)
7. [Template Development](#template-development)
8. [Frontend & Backend Integration](#frontend--backend-integration)
9. [Best Practices](#best-practices)
10. [Testing Your Feature](#testing-your-feature)
11. [Publishing Your Feature](#publishing-your-feature)

## 🎯 Overview

Features in The Architech's Constitutional Architecture are **business capability modules** that provide complete end-to-end functionality. They combine frontend UI components with backend services to deliver full business value.

### Key Principles

- **🏛️ Constitutional Architecture** - Organize around business capabilities
- **🤖 Intelligent Defaults** - Define sensible defaults, users only specify overrides
- **⚡ Dynamic Blueprints** - Blueprints are TypeScript functions that adapt to configuration
- **🎨 Intelligent Templates** - Templates receive rich context for conditional rendering
- **🔗 Capability Dependencies** - Define prerequisites and resolve conflicts automatically
- **🎯 Business-Focused** - Organize around what users need, not technical implementation

## 🏛️ Constitutional Architecture for Features

### Business Capability Hierarchy

Features are organized around **business capabilities** that provide complete end-to-end functionality:

```json
{
  "id": "feature:auth-ui/shadcn",
  "provides": ["authentication", "user-management", "security"],
  "parameters": {
    "features": {
      "passwordReset": { "default": true },
      "mfa": { "default": false },
      "socialLogins": { "default": false },
      "profileManagement": { "default": true },
      "accountSettingsPage": { "default": false }
    }
  },
  "internal_structure": {
    "core": ["loginForm", "signupForm", "profileManagement"],
    "optional": {
      "passwordReset": {
        "prerequisites": ["core"],
        "provides": ["password-reset"],
        "templates": ["password-reset-form.tpl", "password-reset-email.tpl"]
      },
      "mfa": {
        "prerequisites": ["core"],
        "provides": ["multi-factor-auth"],
        "templates": ["mfa-setup.tpl", "mfa-verify.tpl"]
      }
    }
  }
}
```

### Feature vs Adapter Distinction

| | **Features** | **Adapters** |
|---|---|---|
| **Purpose** | Complete business functionality | Technical capabilities |
| **Scope** | End-to-end user experience | Single technology domain |
| **Components** | Frontend + Backend + Integration | Single technology implementation |
| **Examples** | Authentication, Payments, Teams | Database, Email, State Management |

## 🏗️ Feature Structure

### Directory Structure

```
marketplace/features/{feature-name}/
├── contract.ts                    # Business capability contracts
├── frontend/
│   └── {ui-framework}/
│       ├── feature.json          # Frontend capability definition
│       ├── blueprint.ts          # Frontend blueprint function
│       └── templates/
│           ├── components/
│           ├── pages/
│           └── hooks/
└── backend/
    └── {technology-stack}/
        ├── feature.json          # Backend capability definition
        ├── blueprint.ts          # Backend blueprint function
        └── templates/
            ├── services/
            ├── api/
            └── types/
```

### Feature Configuration (`feature.json`)

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
          "enum": ["github", "google", "microsoft", "linkedin"]
        }
      },
      "profileManagement": {
        "default": true,
        "description": "User profile management",
        "type": "boolean"
      },
      "accountSettingsPage": {
        "default": false,
        "description": "Account settings page",
        "type": "boolean"
      }
    }
  },
  "internal_structure": {
    "core": ["loginForm", "signupForm", "profileManagement"],
    "optional": {
      "passwordReset": {
        "prerequisites": ["core"],
        "provides": ["password-reset"],
        "templates": ["password-reset-form.tpl", "password-reset-email.tpl"]
      },
      "mfa": {
        "prerequisites": ["core"],
        "provides": ["multi-factor-auth"],
        "templates": ["mfa-setup.tpl", "mfa-verify.tpl"]
      },
      "socialLogins": {
        "prerequisites": ["core"],
        "provides": ["social-auth"],
        "templates": ["social-login-buttons.tpl"]
      },
      "accountSettingsPage": {
        "prerequisites": ["core", "profileManagement"],
        "provides": ["account-settings"],
        "templates": ["account-settings-page.tpl"]
      }
    }
  }
}
```

## 🚀 Creating Your First Feature

### Step 1: Define Business Capabilities

Start by defining what business capabilities your feature provides:

```json
{
  "id": "feature:payments/frontend/shadcn",
  "provides": ["payments", "subscriptions", "invoicing", "analytics"],
  "parameters": {
    "features": {
      "subscriptions": { "default": true },
      "invoicing": { "default": false },
      "webhooks": { "default": true },
      "analytics": { "default": false }
    }
  }
}
```

### Step 2: Create Business Contracts

Define the business capabilities through TypeScript contracts:

```typescript
// contract.ts
export interface PaymentService {
  // Core payment capabilities
  createPaymentIntent(amount: number, currency: string): Promise<PaymentIntent>;
  confirmPayment(paymentIntentId: string): Promise<PaymentResult>;
  
  // Subscription capabilities
  createSubscription(priceId: string, customerId: string): Promise<Subscription>;
  cancelSubscription(subscriptionId: string): Promise<void>;
  
  // Invoice capabilities
  createInvoice(customerId: string, items: InvoiceItem[]): Promise<Invoice>;
  sendInvoice(invoiceId: string): Promise<void>;
  
  // Analytics capabilities
  getPaymentAnalytics(dateRange: DateRange): Promise<PaymentAnalytics>;
  getSubscriptionMetrics(): Promise<SubscriptionMetrics>;
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'succeeded' | 'failed';
  clientSecret: string;
}

export interface Subscription {
  id: string;
  customerId: string;
  priceId: string;
  status: 'active' | 'canceled' | 'past_due';
  currentPeriodEnd: Date;
}
```

### Step 3: Create Frontend Blueprint

```typescript
// frontend/shadcn/blueprint.ts
import { BlueprintAction, MergedConfiguration } from '@thearchitech.xyz/types';

export default function generateBlueprint(config: MergedConfiguration): BlueprintAction[] {
  const actions: BlueprintAction[] = [];
  
  // Always generate core actions
  actions.push(...generateCoreActions());
  
  // Conditionally generate feature-specific actions
  if (config.activeFeatures.includes('subscriptions')) {
    actions.push(...generateSubscriptionsActions());
  }
  
  if (config.activeFeatures.includes('invoicing')) {
    actions.push(...generateInvoicingActions());
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
      path: 'src/components/payments/PaymentForm.tsx',
      template: 'templates/components/PaymentForm.tsx.tpl',
      context: { features: ['core'] }
    },
    {
      type: 'CREATE_FILE',
      path: 'src/hooks/use-payments.ts',
      template: 'templates/hooks/use-payments.ts.tpl',
      context: { features: ['core'] }
    }
  ];
}

function generateSubscriptionsActions(): BlueprintAction[] {
  return [
    {
      type: 'CREATE_FILE',
      path: 'src/components/payments/SubscriptionForm.tsx',
      template: 'templates/components/SubscriptionForm.tsx.tpl',
      context: { 
        features: ['subscriptions'],
        hasSubscriptions: true 
      }
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/payments/SubscriptionList.tsx',
      template: 'templates/components/SubscriptionList.tsx.tpl',
      context: { 
        features: ['subscriptions'],
        hasSubscriptions: true 
      }
    }
  ];
}
```

### Step 4: Create Backend Blueprint

```typescript
// backend/stripe/blueprint.ts
import { BlueprintAction, MergedConfiguration } from '@thearchitech.xyz/types';

export default function generateBlueprint(config: MergedConfiguration): BlueprintAction[] {
  const actions: BlueprintAction[] = [];
  
  // Always generate core actions
  actions.push(...generateCoreActions());
  
  // Conditionally generate feature-specific actions
  if (config.activeFeatures.includes('subscriptions')) {
    actions.push(...generateSubscriptionsActions());
  }
  
  if (config.activeFeatures.includes('webhooks')) {
    actions.push(...generateWebhooksActions());
  }
  
  return actions;
}

function generateCoreActions(): BlueprintAction[] {
  return [
    {
      type: 'CREATE_FILE',
      path: 'src/lib/payments/stripe.ts',
      template: 'templates/services/stripe-client.ts.tpl',
      context: { features: ['core'] }
    },
    {
      type: 'CREATE_FILE',
      path: 'src/lib/payments/types.ts',
      template: 'templates/types/payment-types.ts.tpl',
      context: { features: ['core'] }
    }
  ];
}
```

## 🎯 Business Capability Design

### Designing Effective Capabilities

#### 1. Think Business Value

```json
// ✅ Good - Business-focused capabilities
{
  "provides": ["authentication", "user-management", "security"]
}

// ❌ Avoid - Technical implementation details
{
  "provides": ["jwt-tokens", "bcrypt-hashing", "session-storage"]
}
```

#### 2. Define Clear Prerequisites

```json
{
  "internal_structure": {
    "core": ["loginForm", "signupForm"],
    "optional": {
      "passwordReset": {
        "prerequisites": ["core"],
        "provides": ["password-reset"]
      },
      "accountSettingsPage": {
        "prerequisites": ["core", "profileManagement"],
        "provides": ["account-settings"]
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
      "passwordReset": { "default": true },    // Most users want this
      "mfa": { "default": false },             // Advanced feature
      "socialLogins": { "default": false }     // Optional feature
    }
  }
}
```

### Capability Dependencies

#### Simple Dependencies

```json
{
  "passwordReset": {
    "prerequisites": ["core"],
    "provides": ["password-reset"]
  }
}
```

#### Complex Dependencies

```json
{
  "accountSettingsPage": {
    "prerequisites": ["core", "profileManagement"],
    "provides": ["account-settings"]
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

## ⚡ Dynamic Blueprint Functions

### Frontend Blueprint Pattern

```typescript
export default function generateBlueprint(config: MergedConfiguration): BlueprintAction[] {
  const actions: BlueprintAction[] = [];
  
  // Core UI components
  actions.push(...generateCoreActions());
  
  // Feature-specific components
  if (config.activeFeatures.includes('passwordReset')) {
    actions.push(...generatePasswordResetActions());
  }
  
  if (config.activeFeatures.includes('mfa')) {
    actions.push(...generateMFAActions());
  }
  
  // Page components
  if (config.activeFeatures.includes('accountSettingsPage')) {
    actions.push(...generateAccountSettingsActions());
  }
  
  return actions;
}
```

### Backend Blueprint Pattern

```typescript
export default function generateBlueprint(config: MergedConfiguration): BlueprintAction[] {
  const actions: BlueprintAction[] = [];
  
  // Core services
  actions.push(...generateCoreActions());
  
  // Feature-specific services
  if (config.activeFeatures.includes('subscriptions')) {
    actions.push(...generateSubscriptionsActions());
  }
  
  if (config.activeFeatures.includes('webhooks')) {
    actions.push(...generateWebhooksActions());
  }
  
  // API routes
  actions.push(...generateAPIActions());
  
  return actions;
}
```

## 🎨 Template Development

### Frontend Templates

```handlebars
{{!-- templates/components/PaymentForm.tsx.tpl --}}
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PaymentFormProps {
  amount: number;
  onSuccess: (paymentIntent: PaymentIntent) => void;
}

export function PaymentForm({ amount, onSuccess }: PaymentFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <Input 
            type="email" 
            placeholder="Email" 
            required 
          />
          <Input 
            type="text" 
            placeholder="Card Number" 
            required 
          />
          <div className="grid grid-cols-2 gap-4">
            <Input 
              type="text" 
              placeholder="MM/YY" 
              required 
            />
            <Input 
              type="text" 
              placeholder="CVC" 
              required 
            />
          </div>
          
          {{#if context.hasSubscriptions}}
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="subscription" />
            <label htmlFor="subscription">Set up recurring payment</label>
          </div>
          {{/if}}
          
          <Button type="submit" className="w-full">
            Pay ${amount}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
```

### Backend Templates

```handlebars
{{!-- templates/services/payment-service.ts.tpl --}}
import { Stripe } from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export class PaymentService {
  async createPaymentIntent(amount: number, currency: string) {
    return await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });
  }

  {{#if context.hasSubscriptions}}
  async createSubscription(priceId: string, customerId: string) {
    return await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    });
  }
  {{/if}}

  {{#if context.hasWebhooks}}
  async handleWebhook(signature: string, payload: string) {
    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    
    switch (event.type) {
      case 'payment_intent.succeeded':
        // Handle successful payment
        break;
      {{#if context.hasSubscriptions}}
      case 'customer.subscription.created':
        // Handle subscription creation
        break;
      {{/if}}
    }
  }
  {{/if}}
}
```

## 🔗 Frontend & Backend Integration

### Contract-Based Integration

```typescript
// Frontend uses the contract
import { PaymentService } from '@/lib/payments/types';

export function usePayments() {
  const createPayment = async (amount: number, currency: string) => {
    const response = await fetch('/api/payments/create-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, currency })
    });
    
    return response.json();
  };
  
  return { createPayment };
}
```

```typescript
// Backend implements the contract
import { PaymentService } from '@/lib/payments/payment-service';

export async function POST(request: Request) {
  const { amount, currency } = await request.json();
  
  const paymentService = new PaymentService();
  const paymentIntent = await paymentService.createPaymentIntent(amount, currency);
  
  return Response.json(paymentIntent);
}
```

## 🎯 Best Practices

### 1. Design for Business Value

```json
// ✅ Good - Business capabilities
{
  "provides": ["authentication", "user-management", "security"]
}

// ❌ Avoid - Technical details
{
  "provides": ["jwt-tokens", "bcrypt-hashing", "session-storage"]
}
```

### 2. Use Clear Prerequisites

```json
{
  "accountSettingsPage": {
    "prerequisites": ["core", "profileManagement"],
    "provides": ["account-settings"]
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
│   ├── LoginForm.tsx.tpl
│   └── SignupForm.tsx.tpl
├── password-reset/
│   ├── PasswordResetForm.tsx.tpl
│   └── PasswordResetEmail.tsx.tpl
└── social-login/
    └── SocialLoginButtons.tsx.tpl
```

### 5. Handle Dependencies Gracefully

```typescript
// Check prerequisites before generating actions
if (config.activeFeatures.includes('accountSettingsPage')) {
  if (!config.activeFeatures.includes('profileManagement')) {
    throw new Error('Account settings page requires profile management');
  }
  actions.push(...generateAccountSettingsActions());
}
```

## 🧪 Testing Your Feature

### Test Blueprint Functions

```typescript
// test/blueprint.test.ts
import { describe, it, expect } from 'vitest';
import generateBlueprint from '../frontend/shadcn/blueprint';

describe('Feature Blueprint', () => {
  it('should generate core actions by default', () => {
    const config = {
      activeFeatures: ['core'],
      resolvedCapabilities: ['authentication'],
      executionOrder: ['core'],
      conflicts: []
    };
    
    const actions = generateBlueprint(config);
    
    expect(actions).toHaveLength(2);
    expect(actions[0].type).toBe('CREATE_FILE');
    expect(actions[1].type).toBe('CREATE_FILE');
  });
  
  it('should generate subscription actions when enabled', () => {
    const config = {
      activeFeatures: ['core', 'subscriptions'],
      resolvedCapabilities: ['payments', 'subscriptions'],
      executionOrder: ['core', 'subscriptions'],
      conflicts: []
    };
    
    const actions = generateBlueprint(config);
    
    expect(actions.some(a => a.path?.includes('Subscription'))).toBe(true);
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
    const template = 'templates/components/PaymentForm.tsx.tpl';
    const context = {
      features: ['core'],
      hasSubscriptions: false
    };
    
    const result = await renderTemplate(template, context);
    
    expect(result).toContain('Payment');
    expect(result).not.toContain('Set up recurring payment');
  });
  
  it('should render with subscriptions when enabled', async () => {
    const template = 'templates/components/PaymentForm.tsx.tpl';
    const context = {
      features: ['core', 'subscriptions'],
      hasSubscriptions: true
    };
    
    const result = await renderTemplate(template, context);
    
    expect(result).toContain('Set up recurring payment');
  });
});
```

## 📦 Publishing Your Feature

### 1. Update Marketplace Manifest

```json
// marketplace/manifest.json
{
  "features": {
    "feature:payments/frontend/shadcn": {
      "version": "1.0.0",
      "path": "features/payments/frontend/shadcn",
      "capabilities": ["payments", "subscriptions", "invoicing"]
    }
  }
}
```

### 2. Add to Type Definitions

```typescript
// types/features/payments.ts
export interface PaymentsFeature {
  id: 'feature:payments/frontend/shadcn';
  parameters: {
    features: {
      subscriptions: boolean;
      invoicing: boolean;
      webhooks: boolean;
      analytics: boolean;
    };
  };
}
```

### 3. Test Integration

```bash
# Test your feature
architech new test-genome.ts --dry-run

# Verify capability resolution
architech new test-genome.ts --verbose
```

## 📚 Additional Resources

- **[Constitutional Architecture Guide](../../Architech/docs/CONSTITUTIONAL_ARCHITECTURE.md)** - Deep dive into the architecture
- **[Adapter Development Guide](./ADAPTER_DEVELOPMENT_GUIDE.md)** - Creating adapters
- **[Template Development Guide](./TEMPLATE_DEVELOPMENT_GUIDE.md)** - Advanced template techniques
- **[Testing Guide](./TESTING_GUIDE.md)** - Comprehensive testing strategies

---

**Happy feature development! 🎯**

*For more information about the Constitutional Architecture, see the [CLI documentation](../../Architech/docs/).*