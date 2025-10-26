# Payments Database Layer (Drizzle)

## 🎯 **Overview**

This is the **provider-agnostic database layer** for the Payments feature. It defines a standardized schema that works with **ANY payment provider** (Stripe, Paddle, LemonSqueezy, custom API, etc.).

## 🔑 **Key Principle**

**The database represents the FEATURE (payments), not the PROVIDER (Stripe).**

This means:
- ✅ Table names are generic (`payment_customers`, not `stripe_customers`)
- ✅ Provider identification via `paymentProvider` field
- ✅ Provider-specific IDs stored in `provider*Id` fields
- ✅ Same schema works for Stripe, Paddle, custom backends

---

## 📊 **Database Schema**

### **Tables**

1. **`payment_customers`**
   - Billing customer information
   - One record per organization per payment provider
   - Fields: `paymentProvider`, `providerCustomerId`, `email`, `name`, etc.

2. **`payment_subscriptions`**
   - Subscription records for any provider
   - Links to `payment_customers`
   - Fields: `paymentProvider`, `providerSubscriptionId`, `status`, `planId`, etc.

3. **`seat_history`**
   - Audit trail for seat allocation changes
   - Provider-agnostic tracking

4. **`usage_tracking`**
   - Usage metrics for metered billing
   - Can report to provider or stay local

5. **`billing_info`**
   - Consolidated billing information per organization
   - Payment method details

6. **`invoices`**
   - Invoice records from any provider
   - Links to subscriptions

7. **`invoice_line_items`**
   - Individual line items for invoices

8. **`payment_methods`**
   - Saved payment methods for organizations

9. **`refunds`**
   - Refund records from any provider

10. **`transactions`**
    - Unified transaction audit trail
    - All payment attempts (successful and failed)

---

## 🔄 **How It Works with Different Providers**

### **Example 1: Stripe**

```typescript
// When creating a Stripe customer
await db.insert(paymentCustomers).values({
  organizationId: 'org_123',
  paymentProvider: 'stripe',                    // ← Identifies provider
  providerCustomerId: 'cus_abc123',             // ← Stripe customer ID
  email: 'billing@company.com',
  name: 'Acme Corp',
});
```

### **Example 2: Paddle**

```typescript
// When creating a Paddle customer
await db.insert(paymentCustomers).values({
  organizationId: 'org_123',
  paymentProvider: 'paddle',                    // ← Different provider
  providerCustomerId: 'ctm_xyz789',             // ← Paddle customer ID
  email: 'billing@company.com',
  name: 'Acme Corp',
});
```

### **Example 3: Custom API**

```typescript
// When using a custom billing system
await db.insert(paymentCustomers).values({
  organizationId: 'org_123',
  paymentProvider: 'custom',                    // ← Custom backend
  providerCustomerId: null,                     // ← No external provider
  email: 'billing@company.com',
  name: 'Acme Corp',
});
```

---

## 💡 **Benefits**

1. **✅ Provider Flexibility**
   - Switch from Stripe to Paddle without database migration
   - Use multiple providers simultaneously
   - Migrate smoothly between providers

2. **✅ Unified Data Model**
   - Consistent schema across all providers
   - Easy to query and report
   - Single source of truth

3. **✅ Future-Proof**
   - New payment providers just set `paymentProvider` field
   - No schema changes needed
   - Maximum reusability

4. **✅ Clean Separation**
   - Database layer is independent of backend implementation
   - Backend implementations just use the schema
   - Maximum testability

---

## 🎨 **Usage by Backend Implementations**

Backend implementations (like `features/payments/backend/stripe-nextjs/`) use this schema through their service layer:

```typescript
// In backend service (e.g., Stripe implementation)
import { paymentCustomers, paymentSubscriptions } from '@/lib/db/schema/payments';

// Create a customer (Stripe-specific logic)
const stripeCustomer = await stripe.customers.create({ ... });

// Save to provider-agnostic database
const customer = await db.insert(paymentCustomers).values({
  organizationId,
  paymentProvider: 'stripe',
  providerCustomerId: stripeCustomer.id,  // Stripe's ID
  // ... rest of the fields
});
```

---

## 📁 **Files**

- **`feature.json`**: Module metadata
- **`blueprint.ts`**: Blueprint for generating schema and migrations
- **`templates/schema.ts.tpl`**: Drizzle schema definition
- **`templates/migration.sql.tpl`**: SQL migration file

---

## 🔄 **Relation to Other Modules**

```
features/payments/database/drizzle/     ← YOU ARE HERE
  ↓ provides schema
features/payments/backend/stripe-nextjs/ ← Uses the schema
  ↓ provides API routes
features/payments/tech-stack/            ← Generic hooks
  ↓ provides UI hooks
features/payments/frontend/shadcn/       ← UI components
```

---

## 🚀 **Adding a New Provider**

To add a new payment provider (e.g., Paddle):

1. **Database Layer:** ✅ Already supports it! No changes needed.
2. **Backend Implementation:** Create `features/payments/backend/paddle-nextjs/`
3. **Service Layer:** Implement Paddle-specific logic, use this schema
4. **Set Fields:**
   - `paymentProvider: 'paddle'`
   - `providerCustomerId: paddleCustomer.id`
   - etc.

That's it! The schema automatically supports any provider.

---

**Document Version:** 1.0  
**Created:** January 2025


