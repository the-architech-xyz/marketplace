# Missing Templates Analysis & Recommendation

## 🔍 Problem Statement

**Missing Templates** (3):
1. `templates/use-subscriptions.ts.tpl`
2. `templates/use-invoices.ts.tpl`
3. `templates/use-transactions.ts.tpl`

**Location**: `marketplace/features/payments/tech-stack/blueprint.ts` (lines 86-114)

**Current Status**: Blueprint references these templates, but they don't exist.

---

## 📊 Current Architecture Analysis

### What Exists

1. **`hooks.ts.tpl`** - Contains all individual TanStack Query hooks:
   - ✅ `useSubscriptionsList`, `useSubscription`, `useSubscriptionsCreate`, `useSubscriptionsUpdate`, `useSubscriptionsCancel`, `useSubscriptionsPause`, `useSubscriptionsResume`
   - ✅ `useInvoicesList`, `useInvoice`, `useInvoicesCreate`, `useInvoicesUpdate`, `useInvoicesDelete`
   - ✅ `usePaymentsList`, `usePayment`, `usePaymentsCreate`, etc.
   - ✅ All hooks are direct TanStack Query hooks (best practice pattern)

2. **`index.ts.tpl`** - Exports everything:
   - ✅ `export * from './hooks';` - Exports all individual hooks
   - ✅ No exports for `use-subscriptions`, `use-invoices`, `use-transactions`

3. **Contract (`contract.ts`)** - Defines `IPaymentService` interface:
   - ✅ `useSubscriptions()` - Cohesive service returning `{ list, get, create, update, cancel }`
   - ✅ `useInvoices()` - Cohesive service returning `{ list, get, create, update }`
   - ✅ `usePayments()` - Cohesive service returning `{ list, get, create, update, delete, refund }`
   - ❌ **No `useTransactions()`** - Transactions don't exist as a separate entity

### What's Missing

The blueprint wants to create **convenience wrapper files** that group related hooks together, matching the contract's cohesive service pattern.

---

## 🎯 Options Analysis

### Option 1: Create the Templates ✅ **RECOMMENDED**

**Approach**: Create the 3 missing template files that implement cohesive service wrappers.

**Implementation**:
- `use-subscriptions.ts.tpl` → Groups all subscription hooks into `useSubscriptions()` service
- `use-invoices.ts.tpl` → Groups all invoice hooks into `useInvoices()` service
- `use-transactions.ts.tpl` → Groups payment hooks (payments are transactions) into `useTransactions()` service

**Pros**:
- ✅ Matches the contract pattern (`IPaymentService`)
- ✅ Provides cohesive API (better DX)
- ✅ Allows users to choose: individual hooks OR cohesive services
- ✅ Follows the architecture intent (blueprint explicitly wants these)
- ✅ Better for complex use cases (grouped operations)

**Cons**:
- ⚠️ Adds 3 new files (but they're convenience wrappers, not duplicate functionality)
- ⚠️ Requires implementation effort

**Template Structure Example**:
```typescript
// use-subscriptions.ts.tpl
import {
  useSubscriptionsList,
  useSubscription,
  useSubscriptionsCreate,
  useSubscriptionsUpdate,
  useSubscriptionsCancel,
  useSubscriptionsPause,
  useSubscriptionsResume
} from './hooks';

export const useSubscriptions = () => {
  const list = useSubscriptionsList();
  const create = useSubscriptionsCreate();
  const update = useSubscriptionsUpdate();
  const cancel = useSubscriptionsCancel();
  const pause = useSubscriptionsPause();
  const resume = useSubscriptionsResume();
  
  return {
    list,
    get: (id: string) => useSubscription(id),
    create,
    update,
    cancel,
    pause,
    resume
  };
};
```

---

### Option 2: Remove from Blueprint ❌

**Approach**: Remove the 3 convenience wrapper file creations from the blueprint.

**Pros**:
- ✅ Simple - removes missing template references
- ✅ No new code to maintain
- ✅ Users can still use individual hooks from `hooks.ts`

**Cons**:
- ❌ **Breaks contract compliance** - `IPaymentService` interface expects `useSubscriptions()`, `useInvoices()`
- ❌ **Inconsistent architecture** - Contract defines cohesive services, but implementation doesn't provide them
- ❌ **Worse developer experience** - Users have to import multiple hooks instead of one service
- ❌ **Doesn't match blueprint intent** - Blueprint explicitly wants these (line 85: "Convenience hook wrappers for common use cases")

---

### Option 3: Hybrid - Remove `use-transactions`, Create Others ⚠️

**Approach**: 
- Remove `use-transactions.ts` (transactions don't exist as separate entity)
- Create `use-subscriptions.ts` and `use-invoices.ts`

**Pros**:
- ✅ Addresses the real issue (transactions confusion)
- ✅ Creates what makes sense

**Cons**:
- ⚠️ Still requires implementation
- ⚠️ Incomplete - doesn't fully solve the contract compliance issue

---

## 🎯 Recommendation: **Option 1 (Create the Templates)**

### Why This Option?

1. **Contract Compliance** ✅
   - The `IPaymentService` contract defines cohesive services
   - These templates implement that contract
   - Without them, the contract is not fulfilled

2. **Architecture Intent** ✅
   - Blueprint explicitly wants "Convenience hook wrappers for common use cases" (line 85)
   - This matches the contract's cohesive service pattern
   - Provides better abstraction for complex use cases

3. **Developer Experience** ✅
   - Users can choose between:
     - Individual hooks: `useSubscriptionsList()`, `useSubscription(id)`, etc.
     - Cohesive service: `useSubscriptions().list`, `useSubscriptions().get(id)`, etc.
   - Better for complex components that need multiple operations

4. **Consistency** ✅
   - Matches the pattern defined in the contract
   - Provides both granular and cohesive APIs (best of both worlds)
   - Follows React ecosystem patterns (hooks composition)

5. **No Functionality Loss** ✅
   - Individual hooks remain available
   - These are convenience wrappers, not replacements
   - Users can choose the pattern that fits their needs

### Implementation Plan

1. **Create `use-subscriptions.ts.tpl`**:
   - Groups all subscription hooks
   - Returns cohesive service object matching `IPaymentService.useSubscriptions()`

2. **Create `use-invoices.ts.tpl`**:
   - Groups all invoice hooks
   - Returns cohesive service object matching `IPaymentService.useInvoices()`

3. **Create `use-transactions.ts.tpl`**:
   - Groups payment hooks (payments are transactions)
   - Returns cohesive service object matching `IPaymentService.usePayments()`
   - **Note**: Could rename to `use-payments.ts` for clarity, but `use-transactions` is more user-friendly

4. **Update `index.ts.tpl`**:
   - Export the new convenience wrappers
   - Keep individual hooks exports
   - Document both usage patterns

---

## 📋 Implementation Details

### Template Structure

Each template should:
1. Import the relevant hooks from `./hooks`
2. Export a cohesive service hook that groups them
3. Match the contract interface
4. Provide type safety

### Example: `use-subscriptions.ts.tpl`

```typescript
/**
 * Subscriptions - Cohesive Service Hook
 * 
 * Provides a cohesive interface for all subscription operations.
 * Groups related queries and mutations into a single service object.
 * 
 * USAGE:
 * ```tsx
 * const subscriptions = useSubscriptions();
 * const { data: list } = subscriptions.list;
 * const { mutate: create } = subscriptions.create;
 * const subscription = subscriptions.get(subscriptionId);
 * ```
 */

import {
  useSubscriptionsList,
  useSubscription,
  useSubscriptionsCreate,
  useSubscriptionsUpdate,
  useSubscriptionsCancel,
  useSubscriptionsPause,
  useSubscriptionsResume
} from './hooks';

export const useSubscriptions = () => {
  const list = useSubscriptionsList();
  const create = useSubscriptionsCreate();
  const update = useSubscriptionsUpdate();
  const cancel = useSubscriptionsCancel();
  const pause = useSubscriptionsPause();
  const resume = useSubscriptionsResume();
  
  return {
    // Query operations
    list,
    get: (id: string) => useSubscription(id),
    
    // Mutation operations
    create,
    update,
    cancel,
    pause,
    resume
  };
};
```

---

## ✅ Final Recommendation

**Create the 3 templates** because:
1. ✅ Matches contract compliance requirements
2. ✅ Follows architecture intent
3. ✅ Better developer experience
4. ✅ No functionality loss (individual hooks still available)
5. ✅ Provides both granular and cohesive APIs

**Action**: Implement the 3 template files with cohesive service wrappers.

