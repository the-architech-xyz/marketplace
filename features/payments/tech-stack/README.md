# Payments Tech-Stack Layer

## Architecture Overview

The payments tech-stack layer follows a **standard + optional override** pattern:

```
tech-stack/payments/
├── standard/              # Generic TanStack Query hooks (Priority: 1)
│   └── templates/
│       ├── hooks.ts.tpl   # fetch-based hooks (DEFAULT)
│       ├── schemas.ts.tpl # Zod schemas
│       └── stores.ts.tpl  # Zustand stores
└── overrides/             # SDK-specific hooks (Priority: 2) - OPTIONAL
    └── stripe-elements/   # Stripe Elements (for embedded payment forms)
        └── templates/
            ├── client.ts.tpl
            └── hooks.ts.tpl
```

## Current Architecture

### ✅ Payments is Hybrid: Server + Optional Client

Unlike auth (client SDK required) or email (server-only), payments has **two valid patterns**:

#### **Pattern 1: Server-Only (Standard - Recommended)**
```typescript
// Frontend: Standard TanStack Query hooks
import { useCheckoutCreate } from '@/lib/payments/hooks';

const { mutate: createCheckout } = useCheckoutCreate();
createCheckout({ priceId: 'price_xxx' });

// Backend: Stripe SDK creates checkout session
// Redirects to Stripe Checkout (hosted)
// ✅ Simpler, more secure
// ✅ PCI compliance handled by Stripe
```

#### **Pattern 2: Embedded Forms (Optional Override)**
```typescript
// Frontend: Stripe Elements hooks
import { useStripe, useElements } from '@/lib/payments/hooks';

const stripe = useStripe();
const elements = useElements();

// Embedded payment form in your app
// ⚠️ More complex
// ⚠️ PCI compliance considerations
// ✅ Better UX (no redirect)
```

---

## How It Works

### 1. Standard Layer (Priority: 1) - DEFAULT ✅

Generic TanStack Query hooks for **hosted Stripe Checkout**:

```typescript
// Standard hooks (fetch-based)
export const useCheckoutCreate = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await fetch('/api/checkout/sessions', {
        method: 'POST',
        body: JSON.stringify(data)
      });
      return res.json();
    }
  });
};

// Backend creates checkout session, returns URL
// Frontend redirects to Stripe Checkout
// ✅ Simple, secure, PCI compliant
```

### 2. Override Layer (Priority: 2) - OPTIONAL

Stripe Elements hooks for **embedded payment forms**:

```typescript
// Stripe Elements hooks
export { useStripe, useElements, Elements } from '@stripe/react-stripe-js';

// Use in component
const stripe = useStripe();
const elements = useElements();

const handleSubmit = async () => {
  const { error } = await stripe.confirmPayment({
    elements,
    confirmParams: { return_url: '/success' }
  });
};

// ✅ Embedded in your app
// ⚠️ More complex setup
```

### 3. Connector Layer - Server-Side

Framework-specific server integration:

```typescript
connectors/payment/stripe-nextjs-drizzle/
├── config.ts.tpl           # Stripe config
├── server.ts.tpl           # Stripe server instance
├── webhooks.ts.tpl         # Webhook handling
├── api/
│   ├── checkout/           # Checkout API routes
│   ├── subscriptions/      # Subscription API routes
│   └── webhooks/           # Webhook endpoints
└── services/
    ├── org-billing.ts      # Organization billing service
    ├── seats.ts            # Seat management service
    └── usage.ts            # Usage tracking service
```

---

## File Generation Flow

### Default (Standard Pattern)

1. **Standard layer generates** (hosted checkout):
   - `@/lib/payments/hooks.ts` (fetch-based)
   - `@/lib/payments/schemas.ts` (Zod)
   - `@/lib/payments/stores.ts` (Zustand)

2. **Connector adds** (server-side):
   - `@/lib/stripe/server.ts` (Stripe SDK)
   - `@/lib/stripe/config.ts` (Stripe config)
   - `app/api/checkout/sessions/route.ts` (Create session)
   - `app/api/webhooks/stripe/route.ts` (Webhooks)

### With Stripe Elements Override (Embedded Forms)

1. **Override replaces** (embedded forms):
   - `@/lib/payments/hooks.ts` (Stripe Elements hooks)
   - `@/lib/payments/client.ts` (Stripe Elements setup)

2. **Connector adds** (same server-side):
   - Same as default pattern

---

## Comparison with Other Capabilities

| Capability | Client SDK | Override Needed | Default Pattern |
|------------|-----------|-----------------|-----------------|
| **Auth** | ✅ Required | ✅ Yes | SDK-based |
| **Email** | ❌ None | ❌ No | Server-only |
| **Payments** | ⚠️ Optional | ⚠️ Optional | Server-only (hosted) |

---

## Decision: Standard vs Override

### ✅ Recommendation: Use Standard (Hosted Checkout)

**Why:**
1. **Simpler** - No client-side SDK complexity
2. **More Secure** - PCI compliance handled by Stripe
3. **Easier Maintenance** - Less code to maintain
4. **Better Performance** - Smaller bundle size
5. **Stripe Recommended** - Official best practice

### ⚠️ When to Use Override (Embedded Forms)

Only if you **absolutely need**:
- Embedded payment forms in your app
- Custom payment form UI
- Multi-step payment flows
- Advanced payment customization

**Trade-offs:**
- ❌ More complex setup
- ❌ PCI compliance considerations
- ❌ Larger bundle size
- ❌ More maintenance

---

## Current State Analysis

### ✅ Already Optimal

The current structure is **already perfect**:
- ✅ Standard hooks in tech-stack (fetch-based)
- ✅ Connector is server-side only
- ✅ Frontend installs `@stripe/react-stripe-js` (optional, not enforced)
- ✅ No override needed by default

**No restructuring needed!** Just document the optional override pattern.

---

## Future: Optional Stripe Elements Override

If a user **wants** embedded forms:

```
tech-stack/payments/overrides/stripe-elements/
├── override.json
├── blueprint.ts
└── templates/
    ├── client.ts.tpl       # Stripe Elements setup
    └── hooks.ts.tpl        # Re-export Stripe Elements hooks
```

**Usage:**
```bash
# Default (hosted checkout)
architech new my-app --genome saas-platform
# Uses standard hooks

# With embedded forms
architech new my-app --genome saas-platform --payments-embedded
# Applies Stripe Elements override
```

---

## Benefits

### ✅ Simple by Default
- Standard fetch-based hooks
- Hosted Stripe Checkout
- No client-side SDK complexity

### ✅ Powerful When Needed
- Optional Stripe Elements override
- Embedded payment forms
- Advanced customization

### ✅ Framework Agnostic
```typescript
// Same standard hooks work with:
- Stripe ✅
- Paddle ✅
- LemonSqueezy ✅
- Any payment provider ✅

// All use same pattern:
import { useCheckoutCreate } from '@/lib/payments/hooks';
```

---

## Usage Examples

### Default: Hosted Checkout
```typescript
import { useCheckoutCreate } from '@/lib/payments/hooks';

function CheckoutButton() {
  const { mutate: createCheckout, isPending } = useCheckoutCreate();
  
  const handleCheckout = () => {
    createCheckout({
      priceId: 'price_xxx',
      successUrl: '/success',
      cancelUrl: '/cancel'
    }, {
      onSuccess: (data) => {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      }
    });
  };
  
  return <button onClick={handleCheckout} disabled={isPending}>Checkout</button>;
}
```

### Optional: Embedded Forms (with override)
```typescript
import { useStripe, useElements, Elements } from '@/lib/payments/hooks';
import { PaymentElement } from '@stripe/react-stripe-js';

function EmbeddedCheckout() {
  const stripe = useStripe();
  const elements = useElements();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: '/success'
      }
    });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit">Pay</button>
    </form>
  );
}

// Wrapped in Elements provider
function CheckoutPage() {
  return (
    <Elements stripe={stripePromise}>
      <EmbeddedCheckout />
    </Elements>
  );
}
```

---

## Architecture Validation

### ✅ Follows Principles
1. **Tech-stack is contract** - Standard hooks define data layer
2. **Simple by default** - Hosted checkout (no client SDK)
3. **Powerful when needed** - Optional override for embedded forms
4. **UI imports centralized** - Always `@/lib/payments/hooks`

### ✅ Optimal Structure
```typescript
// Frontend (default)
import { useCheckoutCreate } from '@/lib/payments/hooks';
// Uses standard TanStack Query hooks

// Backend (server-side)
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// Uses Stripe SDK
```

---

## Migration Notes

**No migration needed!** The current structure is already optimal:
- ✅ Standard hooks in tech-stack
- ✅ Server SDK in connector
- ✅ Optional client SDK for advanced use cases

**Future:** Create Stripe Elements override for users who need embedded forms.

---

**Status:** ✅ **PAYMENTS ARCHITECTURE ALREADY OPTIMAL**

**No changes needed!** Payments follows best practices by default.

**Optional Future Enhancement:** Add Stripe Elements override for embedded payment forms.

---

**Document Version:** 1.0  
**Last Updated:** January 2025


