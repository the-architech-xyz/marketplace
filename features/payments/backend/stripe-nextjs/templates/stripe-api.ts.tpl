import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export const stripeApi = {
  customers: {
    create: (data: Stripe.CustomerCreateParams) => stripe.customers.create(data),
    retrieve: (id: string) => stripe.customers.retrieve(id),
    update: (id: string, data: Stripe.CustomerUpdateParams) => stripe.customers.update(id, data),
    del: (id: string) => stripe.customers.del(id),
    list: (params?: Stripe.CustomerListParams) => stripe.customers.list(params),
  },
  subscriptions: {
    create: (data: Stripe.SubscriptionCreateParams) => stripe.subscriptions.create(data),
    retrieve: (id: string) => stripe.subscriptions.retrieve(id),
    update: (id: string, data: Stripe.SubscriptionUpdateParams) => stripe.subscriptions.update(id, data),
    cancel: (id: string) => stripe.subscriptions.cancel(id),
    list: (params?: Stripe.SubscriptionListParams) => stripe.subscriptions.list(params),
  },
  invoices: {
    create: (data: Stripe.InvoiceCreateParams) => stripe.invoices.create(data),
    retrieve: (id: string) => stripe.invoices.retrieve(id),
    update: (id: string, data: Stripe.InvoiceUpdateParams) => stripe.invoices.update(id, data),
    pay: (id: string) => stripe.invoices.pay(id),
    list: (params?: Stripe.InvoiceListParams) => stripe.invoices.list(params),
  },
  paymentIntents: {
    create: (data: Stripe.PaymentIntentCreateParams) => stripe.paymentIntents.create(data),
    retrieve: (id: string) => stripe.paymentIntents.retrieve(id),
    update: (id: string, data: Stripe.PaymentIntentUpdateParams) => stripe.paymentIntents.update(id, data),
    confirm: (id: string, data?: Stripe.PaymentIntentConfirmParams) => stripe.paymentIntents.confirm(id, data),
  },
  products: {
    create: (data: Stripe.ProductCreateParams) => stripe.products.create(data),
    retrieve: (id: string) => stripe.products.retrieve(id),
    update: (id: string, data: Stripe.ProductUpdateParams) => stripe.products.update(id, data),
    del: (id: string) => stripe.products.del(id),
    list: (params?: Stripe.ProductListParams) => stripe.products.list(params),
  },
  prices: {
    create: (data: Stripe.PriceCreateParams) => stripe.prices.create(data),
    retrieve: (id: string) => stripe.prices.retrieve(id),
    update: (id: string, data: Stripe.PriceUpdateParams) => stripe.prices.update(id, data),
    list: (params?: Stripe.PriceListParams) => stripe.prices.list(params),
  },
};
