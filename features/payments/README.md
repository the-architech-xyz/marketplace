# Payments Capability

Complete payments capability with Stripe integration, subscriptions, invoices, and analytics.

## Overview

The Payments capability provides a comprehensive payment management system with support for:
- Payment processing with Stripe
- Subscription management and billing
- Customer and invoice management
- Payment analytics and reporting
- Multi-backend and multi-frontend support

## Architecture

This feature follows the Two-Headed architecture pattern:

### Backend Implementations
- **`stripe-nextjs/`** - Stripe integration with Next.js
- **`stripe-express/`** - Stripe integration with Express (planned)
- **`stripe-fastify/`** - Stripe integration with Fastify (planned)

### Frontend Implementations
- **`shadcn/`** - Shadcn/ui components
- **`mui/`** - Material-UI components (planned)
- **`chakra/`** - Chakra UI components (planned)

## Contract

The feature contract is defined in `feature.json` and includes:

### Hooks
- **Payment Hooks**: `useCreatePaymentIntent`, `useCreateCheckoutSession`, `useSendTransaction`
- **Customer Hooks**: `useCreateCustomer`, `useUpdateCustomer`, `useCustomers`, `useCustomer`
- **Subscription Hooks**: `useCreateSubscription`, `useCancelSubscription`, `useUpdateSubscription`, `useSubscriptions`
- **Plan Hooks**: `useCreatePlan`, `useUpdatePlan`, `usePlans`
- **Analytics Hooks**: `useAnalytics`, `useCustomerAnalytics`, `useSubscriptionAnalytics`

### API Endpoints
- `POST /api/payments/intent` - Create payment intent
- `POST /api/payments/checkout` - Create checkout session
- `GET /api/payments/customers` - List customers
- `POST /api/payments/customers` - Create customer
- `PATCH /api/payments/customers/:id` - Update customer
- `GET /api/payments/subscriptions` - List subscriptions
- `POST /api/payments/subscriptions` - Create subscription
- `PATCH /api/payments/subscriptions/:id` - Update subscription
- `DELETE /api/payments/subscriptions/:id` - Cancel subscription
- `GET /api/payments/plans` - List plans
- `POST /api/payments/plans` - Create plan
- `GET /api/payments/invoices` - List invoices
- `GET /api/payments/methods` - List payment methods

### Types
- `PaymentIntent` - Payment intent structure
- `CheckoutSession` - Checkout session data
- `Customer` - Customer information
- `Subscription` - Subscription details
- `Plan` - Pricing plan structure
- `Invoice` - Invoice data
- `PaymentMethod` - Payment method information
- `PaymentAnalytics` - Analytics data

## Implementation Requirements

### Backend Implementation
1. **Must implement all API endpoints** defined in the contract
2. **Must integrate with Stripe** or selected payment provider
3. **Must handle webhook events** for payment status updates
4. **Must provide subscription management** functionality
5. **Must support customer and invoice management**

### Frontend Implementation
1. **Must provide payment forms** and checkout components
2. **Must integrate with backend hooks** using TanStack Query
3. **Must handle payment processing** and error states
4. **Must provide subscription management** UI
5. **Must support the selected UI library** (Shadcn, MUI, etc.)

## Usage Example

```typescript
// Using the payments hooks
import { useCreatePaymentIntent, useCustomers } from '@/lib/payments/hooks';

function PaymentForm() {
  const createPaymentIntent = useCreatePaymentIntent();
  const { data: customers } = useCustomers();

  const handlePayment = async (paymentData) => {
    const result = await createPaymentIntent.mutateAsync(paymentData);
    // Handle payment processing
  };

  return (
    <div>
      {/* Payment form UI */}
    </div>
  );
}
```

## Configuration

The feature can be configured through the `parameters` section in `feature.json`:

- **`backend`**: Choose payment provider implementation
- **`frontend`**: Choose UI library implementation
- **`features`**: Enable/disable specific payment features

## Dependencies

### Required Adapters
- `stripe` - Payment service adapter

### Required Integrators
- `stripe-nextjs-integration` - Stripe + Next.js integration

### Required Capabilities
- `payment-service` - Payment processing capability

## Security Considerations

- **Never expose secret keys** on the frontend
- **Use secure payment methods** (Stripe Elements, etc.)
- **Validate all payment data** on the backend
- **Handle webhook verification** properly
- **Implement proper error handling** for failed payments

## Development

To add a new backend implementation:

1. Create a new directory under `backend/`
2. Implement the required API endpoints
3. Create the service layer with payment provider integration
4. Handle webhook events and payment status updates
5. Update the feature.json to include the new implementation

To add a new frontend implementation:

1. Create a new directory under `frontend/`
2. Implement payment UI components using the selected library
3. Integrate with the backend hooks
4. Handle payment processing and error states
5. Update the feature.json to include the new implementation
