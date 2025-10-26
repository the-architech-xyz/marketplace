-- Migration: 001_payments.sql
-- Description: Create provider-agnostic payments tables (works with Stripe, Paddle, custom, etc.)
-- Created: <%= new Date().toISOString() %>

-- ============================================================================
-- PAYMENT CUSTOMERS
-- ============================================================================

CREATE TABLE IF NOT EXISTS payment_customers (
    id TEXT PRIMARY KEY,
    organization_id TEXT NOT NULL,
    payment_provider TEXT NOT NULL,
    provider_customer_id TEXT NOT NULL,
    email TEXT NOT NULL,
    name TEXT NOT NULL,
    address JSONB,
    tax_id TEXT,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    UNIQUE(organization_id, payment_provider)
);

CREATE INDEX idx_payment_customers_org ON payment_customers(organization_id);
CREATE INDEX idx_payment_customers_provider ON payment_customers(payment_provider);
CREATE INDEX idx_payment_customers_provider_id ON payment_customers(provider_customer_id);

-- ============================================================================
-- PAYMENT SUBSCRIPTIONS
-- ============================================================================

CREATE TABLE IF NOT EXISTS payment_subscriptions (
    id TEXT PRIMARY KEY,
    organization_id TEXT NOT NULL,
    customer_id TEXT NOT NULL REFERENCES payment_customers(id) ON DELETE CASCADE,
    payment_provider TEXT NOT NULL,
    provider_subscription_id TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('active', 'trialing', 'past_due', 'canceled', 'unpaid')),
    plan_id TEXT NOT NULL,
    plan_name TEXT NOT NULL,
    plan_amount INTEGER NOT NULL,
    plan_interval TEXT NOT NULL CHECK (plan_interval IN ('month', 'year')),
    currency TEXT NOT NULL DEFAULT 'usd',
    seats_included INTEGER NOT NULL DEFAULT 5,
    seats_additional INTEGER NOT NULL DEFAULT 0,
    seats_total INTEGER NOT NULL,
    current_period_start TIMESTAMP WITH TIME ZONE NOT NULL,
    current_period_end TIMESTAMP WITH TIME ZONE NOT NULL,
    trial_start TIMESTAMP WITH TIME ZONE,
    trial_end TIMESTAMP WITH TIME ZONE,
    cancel_at_period_end BOOLEAN NOT NULL DEFAULT FALSE,
    canceled_at TIMESTAMP WITH TIME ZONE,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    UNIQUE(provider_subscription_id, payment_provider)
);

CREATE INDEX idx_payment_subscriptions_org ON payment_subscriptions(organization_id);
CREATE INDEX idx_payment_subscriptions_customer ON payment_subscriptions(customer_id);
CREATE INDEX idx_payment_subscriptions_provider ON payment_subscriptions(payment_provider);
CREATE INDEX idx_payment_subscriptions_provider_id ON payment_subscriptions(provider_subscription_id);
CREATE INDEX idx_payment_subscriptions_status ON payment_subscriptions(status);

-- ============================================================================
-- SEAT HISTORY (AUDIT TRAIL)
-- ============================================================================

CREATE TABLE IF NOT EXISTS seat_history (
    id TEXT PRIMARY KEY,
    organization_id TEXT NOT NULL,
    subscription_id TEXT NOT NULL REFERENCES payment_subscriptions(id) ON DELETE CASCADE,
    previous_seats INTEGER NOT NULL,
    new_seats INTEGER NOT NULL,
    changed_by TEXT NOT NULL,
    reason TEXT NOT NULL CHECK (reason IN ('member_added', 'manual_increase', 'manual_decrease', 'plan_change')),
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_seat_history_org ON seat_history(organization_id);
CREATE INDEX idx_seat_history_subscription ON seat_history(subscription_id);
CREATE INDEX idx_seat_history_changed_by ON seat_history(changed_by);

-- ============================================================================
-- USAGE TRACKING
-- ============================================================================

CREATE TABLE IF NOT EXISTS usage_tracking (
    id TEXT PRIMARY KEY,
    organization_id TEXT NOT NULL,
    team_id TEXT,
    subscription_id TEXT REFERENCES payment_subscriptions(id) ON DELETE SET NULL,
    metric TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    period TEXT NOT NULL,
    payment_provider TEXT,
    provider_usage_record_id TEXT,
    reported_at TIMESTAMP WITH TIME ZONE,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_usage_tracking_org ON usage_tracking(organization_id);
CREATE INDEX idx_usage_tracking_team ON usage_tracking(team_id);
CREATE INDEX idx_usage_tracking_subscription ON usage_tracking(subscription_id);
CREATE INDEX idx_usage_tracking_period ON usage_tracking(period);
CREATE INDEX idx_usage_tracking_metric ON usage_tracking(metric);

-- ============================================================================
-- BILLING INFO
-- ============================================================================

CREATE TABLE IF NOT EXISTS billing_info (
    id TEXT PRIMARY KEY,
    organization_id TEXT NOT NULL UNIQUE,
    payment_provider TEXT NOT NULL,
    provider_customer_id TEXT NOT NULL,
    payment_method_id TEXT,
    payment_method_type TEXT,
    payment_method_last4 TEXT,
    payment_method_brand TEXT,
    payment_method_expiry_month INTEGER,
    payment_method_expiry_year INTEGER,
    billing_email TEXT NOT NULL,
    billing_name TEXT NOT NULL,
    billing_address JSONB,
    tax_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_billing_info_org ON billing_info(organization_id);

-- ============================================================================
-- INVOICES
-- ============================================================================

CREATE TABLE IF NOT EXISTS invoices (
    id TEXT PRIMARY KEY,
    organization_id TEXT NOT NULL,
    subscription_id TEXT REFERENCES payment_subscriptions(id) ON DELETE SET NULL,
    payment_provider TEXT NOT NULL,
    provider_invoice_id TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('draft', 'open', 'paid', 'void', 'uncollectible')),
    amount INTEGER NOT NULL,
    amount_paid INTEGER NOT NULL DEFAULT 0,
    amount_due INTEGER NOT NULL,
    subtotal INTEGER NOT NULL,
    tax INTEGER DEFAULT 0,
    discount INTEGER DEFAULT 0,
    currency TEXT NOT NULL DEFAULT 'usd',
    description TEXT,
    invoice_number TEXT,
    due_date TIMESTAMP WITH TIME ZONE NOT NULL,
    paid_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    UNIQUE(provider_invoice_id, payment_provider)
);

CREATE INDEX idx_invoices_org ON invoices(organization_id);
CREATE INDEX idx_invoices_subscription ON invoices(subscription_id);
CREATE INDEX idx_invoices_provider ON invoices(payment_provider);
CREATE INDEX idx_invoices_provider_id ON invoices(provider_invoice_id);
CREATE INDEX idx_invoices_status ON invoices(status);

-- ============================================================================
-- INVOICE LINE ITEMS
-- ============================================================================

CREATE TABLE IF NOT EXISTS invoice_line_items (
    id TEXT PRIMARY KEY,
    invoice_id TEXT NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
    provider_line_item_id TEXT,
    description TEXT NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    unit_amount INTEGER NOT NULL,
    total_amount INTEGER NOT NULL,
    tax_rate DECIMAL(5, 4),
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_invoice_line_items_invoice ON invoice_line_items(invoice_id);

-- ============================================================================
-- PAYMENT METHODS
-- ============================================================================

CREATE TABLE IF NOT EXISTS payment_methods (
    id TEXT PRIMARY KEY,
    organization_id TEXT NOT NULL,
    payment_provider TEXT NOT NULL,
    provider_payment_method_id TEXT NOT NULL,
    type TEXT NOT NULL,
    last4 TEXT,
    brand TEXT,
    exp_month INTEGER,
    exp_year INTEGER,
    is_default BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    UNIQUE(provider_payment_method_id, payment_provider)
);

CREATE INDEX idx_payment_methods_org ON payment_methods(organization_id);
CREATE INDEX idx_payment_methods_provider ON payment_methods(payment_provider);
CREATE INDEX idx_payment_methods_is_default ON payment_methods(is_default);

-- ============================================================================
-- REFUNDS
-- ============================================================================

CREATE TABLE IF NOT EXISTS refunds (
    id TEXT PRIMARY KEY,
    organization_id TEXT NOT NULL,
    payment_provider TEXT NOT NULL,
    provider_refund_id TEXT NOT NULL,
    provider_payment_intent_id TEXT NOT NULL,
    amount INTEGER NOT NULL,
    currency TEXT NOT NULL DEFAULT 'usd',
    status TEXT NOT NULL CHECK (status IN ('succeeded', 'pending', 'failed', 'canceled')),
    reason TEXT NOT NULL CHECK (reason IN ('duplicate', 'fraudulent', 'requested_by_customer', 'other')),
    description TEXT,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    processed_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(provider_refund_id, payment_provider)
);

CREATE INDEX idx_refunds_org ON refunds(organization_id);
CREATE INDEX idx_refunds_provider ON refunds(payment_provider);
CREATE INDEX idx_refunds_status ON refunds(status);

-- ============================================================================
-- TRANSACTIONS
-- ============================================================================

CREATE TABLE IF NOT EXISTS transactions (
    id TEXT PRIMARY KEY,
    organization_id TEXT NOT NULL,
    subscription_id TEXT REFERENCES payment_subscriptions(id) ON DELETE SET NULL,
    invoice_id TEXT REFERENCES invoices(id) ON DELETE SET NULL,
    payment_provider TEXT NOT NULL,
    provider_transaction_id TEXT NOT NULL,
    provider_payment_intent_id TEXT,
    amount INTEGER NOT NULL,
    currency TEXT NOT NULL DEFAULT 'usd',
    status TEXT NOT NULL CHECK (status IN ('succeeded', 'failed', 'pending', 'canceled')),
    type TEXT NOT NULL CHECK (type IN ('subscription', 'one_time', 'refund', 'adjustment')),
    description TEXT,
    failure_code TEXT,
    failure_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    processed_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(provider_transaction_id, payment_provider)
);

CREATE INDEX idx_transactions_org ON transactions(organization_id);
CREATE INDEX idx_transactions_subscription ON transactions(subscription_id);
CREATE INDEX idx_transactions_invoice ON transactions(invoice_id);
CREATE INDEX idx_transactions_provider ON transactions(payment_provider);
CREATE INDEX idx_transactions_status ON transactions(status);
CREATE INDEX idx_transactions_type ON transactions(type);

-- ============================================================================
-- COMMENTS (for documentation)
-- ============================================================================

COMMENT ON TABLE payment_customers IS 'Stores billing customer information for any payment provider (Stripe, Paddle, custom, etc.)';
COMMENT ON TABLE payment_subscriptions IS 'Provider-agnostic subscriptions. Works with any billing system.';
COMMENT ON TABLE seat_history IS 'Audit trail for seat allocation changes';
COMMENT ON TABLE usage_tracking IS 'Tracks usage metrics for metered billing';
COMMENT ON TABLE billing_info IS 'Consolidated billing information per organization';
COMMENT ON TABLE invoices IS 'Provider-agnostic invoice records';
COMMENT ON TABLE invoice_line_items IS 'Individual line items for invoices';
COMMENT ON TABLE payment_methods IS 'Saved payment methods for organizations';
COMMENT ON TABLE refunds IS 'Refund records from any payment provider';
COMMENT ON TABLE transactions IS 'Unified transaction audit trail across all payment providers';
