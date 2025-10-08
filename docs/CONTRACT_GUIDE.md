# Contract Development Guide

## Overview

The Cohesive Contract Architecture is the foundation of The Architech Marketplace. It provides a standardized way to define business capabilities through TypeScript interfaces that serve as contracts between backend implementations and frontend consumers.

## 🎯 Core Principles

### 1. Contract as Single Source of Truth
Every feature defines a `contract.ts` file that serves as the authoritative definition of its API.

### 2. Cohesive Business Services
Instead of individual hooks, contracts define cohesive services that group related functionality.

### 3. Technology Agnostic
Contracts are pure TypeScript interfaces that work with any technology stack.

### 4. Backend Implements, Frontend Consumes
Backend implementations provide the service, frontend implementations consume it.

## 📁 Contract Structure

```
features/
└── feature-name/
    ├── contract.ts              # Contract definition
    ├── backend/
    │   └── technology-stack/
    │       ├── blueprint.ts     # Generates service implementation
    │       └── templates/
    │           └── ServiceName.ts.tpl
    └── frontend/
        └── ui-framework/
            ├── blueprint.ts     # Generates UI components
            └── templates/
                └── *.tsx.tpl
```

## 🔧 Creating a Contract

### 1. Define Core Types

```typescript
// features/payments/contract.ts

// Core business types
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';
export type PaymentMethod = 'card' | 'bank_transfer' | 'paypal';

// Data types
export interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  method: PaymentMethod;
  createdAt: string;
  updatedAt: string;
}

// Input types
export interface CreatePaymentData {
  amount: number;
  currency: string;
  method: PaymentMethod;
  customerId: string;
}

// Result types
export interface PaymentResult {
  payment: Payment;
  success: boolean;
  message?: string;
}
```

### 2. Define the Service Interface

```typescript
export interface IPaymentService {
  /**
   * Payment Management Service
   * Provides all payment-related operations in a cohesive interface
   */
  usePayments: () => {
    // Query operations
    list: any; // UseQueryResult<Payment[], Error>
    get: (id: string) => any; // UseQueryResult<Payment, Error>
    
    // Mutation operations
    create: any; // UseMutationResult<Payment, Error, CreatePaymentData>
    update: any; // UseMutationResult<Payment, Error, { id: string; data: UpdatePaymentData }>
    delete: any; // UseMutationResult<void, Error, string>
    refund: any; // UseMutationResult<Refund, Error, { paymentId: string; amount?: number }>
  };

  /**
   * Subscription Management Service
   * Provides all subscription-related operations in a cohesive interface
   */
  useSubscriptions: () => {
    // Query operations
    list: any; // UseQueryResult<Subscription[], Error>
    get: (id: string) => any; // UseQueryResult<Subscription, Error>
    
    // Mutation operations
    create: any; // UseMutationResult<Subscription, Error, CreateSubscriptionData>
    update: any; // UseMutationResult<Subscription, Error, { id: string; data: UpdateSubscriptionData }>
    cancel: any; // UseMutationResult<Subscription, Error, string>
  };

  // ... other cohesive services
}
```

## 🏗️ Backend Implementation

### 1. Create Service Template

```typescript
// templates/PaymentService.ts.tpl
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  IPaymentService, 
  Payment, CreatePaymentData, UpdatePaymentData, Refund
} from '@/features/payments/contract';
import { paymentApi } from '@/lib/payment/api';

export const PaymentService: IPaymentService = {
  usePayments: () => {
    const queryClient = useQueryClient();

    // Query operations
    const list = (filters?: PaymentFilters) => useQuery<Payment[], Error>({
      queryKey: ['payments', filters],
      queryFn: () => paymentApi.getPayments(filters),
    });

    const get = (id: string) => useQuery<Payment, Error>({
      queryKey: ['payment', id],
      queryFn: () => paymentApi.getPayment(id),
    });

    // Mutation operations
    const create = () => useMutation<Payment, Error, CreatePaymentData>({
      mutationFn: paymentApi.createPayment,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['payments'] });
      },
    });

    const update = () => useMutation<Payment, Error, { id: string; data: UpdatePaymentData }>({
      mutationFn: ({ id, data }) => paymentApi.updatePayment(id, data),
      onSuccess: (_, { id }) => {
        queryClient.invalidateQueries({ queryKey: ['payment', id] });
        queryClient.invalidateQueries({ queryKey: ['payments'] });
      },
    });

    const del = () => useMutation<void, Error, string>({
      mutationFn: paymentApi.deletePayment,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['payments'] });
      },
    });

    const refund = () => useMutation<Refund, Error, { paymentId: string; amount?: number }>({
      mutationFn: paymentApi.refundPayment,
    });

    return { list, get, create, update, delete: del, refund };
  },

  useSubscriptions: () => {
    // ... similar pattern for subscriptions
  },

  // ... other services
};
```

### 2. Update Blueprint

```typescript
// blueprint.ts
export const blueprint: Blueprint = {
  id: 'payments/backend/stripe-nextjs',
  name: 'Stripe Next.js Payments Backend',
  description: 'Backend implementation for Payments feature using Stripe and Next.js, providing IPaymentService.',
  version: '1.0.0',
  actions: [
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/services/PaymentService.ts',
      template: 'templates/PaymentService.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    // ... other actions
  ]
};
```

## 🎨 Frontend Implementation

### 1. Create UI Components

```typescript
// templates/PaymentForm.tsx.tpl
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PaymentService } from '@/features/payments/backend/stripe-nextjs/PaymentService';

export function PaymentForm() {
  const { create } = PaymentService.usePayments();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const result = await create.mutateAsync({
      amount: 100,
      currency: 'USD',
      method: 'card',
      customerId: 'customer_123'
    });
    console.log('Payment created:', result);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-2">
        <label htmlFor="amount">Amount</label>
        <Input id="amount" type="number" placeholder="100.00" />
      </div>
      <Button type="submit">Process Payment</Button>
    </form>
  );
}
```

## ✅ Contract Validation

The marketplace includes a comprehensive validation system that ensures:

1. **Template Content Validation**: Actually reads and validates template files
2. **Contract Compliance Checking**: Verifies cohesive service implementation
3. **Technology Module Separation**: Validates each backend/frontend separately
4. **Type Safety**: Ensures proper TypeScript usage

### Running Validation

```bash
# Validate all features
npm run validate:correctness

# Validate only changed features (optimization)
npm run validate:correctness:changed
```

## 🎯 Best Practices

### 1. Cohesive Service Design
- Group related functionality together
- Each service should have a clear business purpose
- Keep services focused and not too large

### 2. Consistent Naming
- Use `I{FeatureName}Service` for service interfaces
- Use `use{FeatureName}` for service methods
- Use descriptive names for operations (list, get, create, update, delete)

### 3. Type Safety
- Define all types in the contract
- Use proper TypeScript types
- Avoid `any` in production code (use comments for TanStack Query types)

### 4. Error Handling
- Include error types in contracts
- Handle errors consistently across implementations
- Provide meaningful error messages

### 5. Documentation
- Document all service methods
- Include usage examples
- Explain business logic and requirements

## 🚀 Examples

### Complete Feature Example

See the following features for complete examples:
- `features/payments/` - Payment processing with Stripe
- `features/auth/` - Authentication with Better Auth
- `features/teams-management/` - Team management
- `features/emailing/` - Email sending with Resend
- `features/ai-chat/` - AI chat with Vercel AI SDK

Each feature demonstrates the complete contract-driven development pattern with cohesive business services.
