import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

// Billing Portal Configuration
export interface BillingPortalConfig {
  business_profile: {
    headline?: string;
    privacy_policy_url?: string;
    terms_of_service_url?: string;
  };
  features: {
    customer_update?: {
      enabled: boolean;
      allowed_updates: string[];
    };
    invoice_history?: {
      enabled: boolean;
    };
    payment_method_update?: {
      enabled: boolean;
    };
    subscription_cancel?: {
      enabled: boolean;
      mode: 'at_period_end' | 'immediately';
    };
    subscription_pause?: {
      enabled: boolean;
    };
  };
}

// Billing Portal Manager
export class BillingPortalManager {
  static async createPortalSession(
    customerId: string,
    returnUrl: string,
    config?: Partial<BillingPortalConfig>
  ) {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
      ...config,
    });

    return session;
  }

  static async createPortalConfiguration(config: BillingPortalConfig) {
    const configuration = await stripe.billingPortal.configurations.create(config);
    return configuration;
  }

  static async updatePortalConfiguration(
    configurationId: string,
    config: Partial<BillingPortalConfig>
  ) {
    const configuration = await stripe.billingPortal.configurations.update(
      configurationId,
      config
    );
    return configuration;
  }

  static async listPortalConfigurations() {
    const configurations = await stripe.billingPortal.configurations.list();
    return configurations;
  }
}
    },
    {
