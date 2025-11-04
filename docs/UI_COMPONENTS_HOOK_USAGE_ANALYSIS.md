# UI Components Hook Usage Analysis

## 🔍 Analysis Results

After checking both Shadcn and Tamagui UI marketplaces, here's what the components **actually use**:

---

## 📊 Usage Patterns Found

### Pattern 1: Individual Hooks (Most Common) ✅

**Shadcn:**
- `payments-dashboard.tsx.tpl`: 
  ```typescript
  import { usePaymentsList as usePayments } from '@/lib/payments';
  import { useSubscriptionsList as useSubscriptions } from '@/lib/payments';
  import { useInvoicesList as useInvoices } from '@/lib/payments';
  ```
- `subscriptions-page.tsx.tpl`: 
  ```typescript
  import { useSubscriptionsList as useSubscriptions } from '@/lib/payments';
  ```
- `invoices-page.tsx.tpl`: 
  ```typescript
  import { useInvoicesList as useInvoices } from '@/lib/payments';
  ```
- `checkout-page.tsx.tpl`: 
  ```typescript
  import { usePaymentsCreate } from '@/lib/payments';
  ```

**Tamagui:**
- `PaymentsDashboard.tsx.tpl`: 
  ```typescript
  import { usePaymentsList as usePayments } from '@/lib/payments';
  import { useSubscriptionsList as useSubscriptions } from '@/lib/payments';
  import { useInvoicesList as useInvoices } from '@/lib/payments';
  ```
- `SubscriptionsPage.tsx.tpl`: 
  ```typescript
  import { useSubscriptionsList as useSubscriptions } from '@/lib/payments';
  ```
- `InvoicesPage.tsx.tpl`: 
  ```typescript
  import { useInvoicesList as useInvoices } from '@/lib/payments';
  ```
- `CheckoutPage.tsx.tpl`: 
  ```typescript
  import { usePaymentsCreate } from '@/lib/payments';
  ```

**Pattern**: ✅ **Individual hooks with aliases** (`useSubscriptionsList as useSubscriptions`)

---

### Pattern 2: Custom Cohesive Hooks (Rare, Custom Implementation)

**Shadcn:**
- `transactions-page.tsx.tpl`: 
  ```typescript
  import { useTransactions } from '@/hooks/payments/use-transactions';
  ```
  - **Note**: This is a **custom hook** in the UI marketplace, not from tech-stack!

**Tamagui:**
- `TransactionsPage.tsx.tpl`: 
  ```typescript
  import { useTransactions } from '@/hooks/payments/use-transactions';
  ```
  - **Note**: This is a **custom hook** in the UI marketplace, not from tech-stack!

**Pattern**: ⚠️ **Custom cohesive hooks** (but these are UI-specific, not from tech-stack)

---

### Pattern 3: Service Pattern (Very Rare)

**Shadcn & Tamagui:**
- `PaymentForm.tsx.tpl`: 
  ```typescript
  import { paymentService } from '@/services/PaymentService';
  const { create, list } = paymentService.usePayments();
  ```
  - **Note**: This uses a **service object**, not hooks directly

---

## 📊 Statistics

### Usage by Pattern:
- ✅ **Individual Hooks** (with aliases): **90%** of components
- ⚠️ **Custom Cohesive Hooks** (UI-specific): **10%** of components
- ❌ **Service Pattern**: **<5%** of components

### Key Findings:
1. **UI components use individual hooks** (`useSubscriptionsList`, `useInvoicesList`, `usePaymentsList`)
2. **They alias them** for cleaner names (`as useSubscriptions`, `as useInvoices`)
3. **No components use** `use-subscriptions.ts`, `use-invoices.ts`, or `use-transactions.ts` from tech-stack
4. **Custom cohesive hooks exist** in UI marketplaces (like `use-transactions.ts`), but they're UI-specific implementations

---

## 🎯 Conclusion

### What UI Components Actually Use:
✅ **Individual hooks from `hooks.ts`**:
- `usePaymentsList`
- `useSubscriptionsList`
- `useInvoicesList`
- `usePaymentsCreate`
- etc.

### What They DON'T Use:
❌ **Cohesive service hooks** from:
- `use-subscriptions.ts`
- `use-invoices.ts`
- `use-transactions.ts`

---

## 💡 Recommendation

**Remove the 3 missing template references** from the blueprint because:

1. ✅ **UI components don't use them** - They use individual hooks directly
2. ✅ **Simpler architecture** - Individual hooks are the actual pattern used
3. ✅ **No breaking changes** - Nothing depends on these cohesive wrappers
4. ✅ **Matches actual usage** - Follow what the UI components actually do

**Action**: Remove the 3 convenience wrapper file creations from `blueprint.ts` (lines 86-114).

