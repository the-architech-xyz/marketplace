-- Migration: 001_organization_billing.sql
-- Description: Create organization billing tables for Stripe integration
-- Created: {{new Date().toISOString()}}

-- ============================================================================
-- ORGANIZATION STRIPE CUSTOMERS
-- ============================================================================

CREATE TABLE IF NOT EXISTS organization_stripe_customers (
    id TEXT PRIMARY KEY,
    organization_id TEXT NOT NULL,
    stripe_customer_id TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL,
    name TEXT NOT NULL,
    address JSONB,
    tax_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- ORGANIZATION SUBSCRIPTIONS
-- ============================================================================

CREATE TABLE IF NOT EXISTS organization_subscriptions (
    id TEXT PRIMARY KEY,
    organization_id TEXT NOT NULL,
    stripe_subscription_id TEXT NOT NULL UNIQUE,
    stripe_customer_id TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('active', 'trialing', 'past_due', 'canceled', 'unpaid')),
    plan_id TEXT NOT NULL,
    plan_name TEXT NOT NULL,
    plan_amount INTEGER NOT NULL,
    plan_interval TEXT NOT NULL CHECK (plan_interval IN ('month', 'year')),
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
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- SEAT HISTORY (AUDIT TRAIL)
-- ============================================================================

CREATE TABLE IF NOT EXISTS organization_seat_history (
    id TEXT PRIMARY KEY,
    organization_id TEXT NOT NULL,
    subscription_id TEXT NOT NULL,
    previous_seats INTEGER NOT NULL,
    new_seats INTEGER NOT NULL,
    changed_by TEXT NOT NULL,
    reason TEXT NOT NULL CHECK (reason IN ('member_added', 'manual_increase', 'manual_decrease', 'plan_change')),
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- ORGANIZATION USAGE TRACKING
-- ============================================================================

CREATE TABLE IF NOT EXISTS organization_usage (
    id TEXT PRIMARY KEY,
    organization_id TEXT NOT NULL,
    team_id TEXT,
    metric TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    period TEXT NOT NULL,
    stripe_usage_record_id TEXT,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- ORGANIZATION BILLING INFO
-- ============================================================================

CREATE TABLE IF NOT EXISTS organization_billing_info (
    id TEXT PRIMARY KEY,
    organization_id TEXT NOT NULL UNIQUE,
    stripe_customer_id TEXT NOT NULL,
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

-- ============================================================================
-- ORGANIZATION INVOICES
-- ============================================================================

CREATE TABLE IF NOT EXISTS organization_invoices (
    id TEXT PRIMARY KEY,
    organization_id TEXT NOT NULL,
    stripe_invoice_id TEXT NOT NULL UNIQUE,
    stripe_subscription_id TEXT,
    status TEXT NOT NULL CHECK (status IN ('draft', 'open', 'paid', 'void', 'uncollectible')),
    amount INTEGER NOT NULL,
    amount_paid INTEGER NOT NULL DEFAULT 0,
    amount_due INTEGER NOT NULL,
    subtotal INTEGER NOT NULL,
    tax INTEGER DEFAULT 0,
    discount INTEGER DEFAULT 0,
    currency TEXT NOT NULL DEFAULT 'usd',
    description TEXT,
    due_date TIMESTAMP WITH TIME ZONE NOT NULL,
    paid_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- ORGANIZATION INVOICE LINE ITEMS
-- ============================================================================

CREATE TABLE IF NOT EXISTS organization_invoice_line_items (
    id TEXT PRIMARY KEY,
    invoice_id TEXT NOT NULL,
    stripe_line_item_id TEXT,
    description TEXT NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    unit_amount INTEGER NOT NULL,
    total_amount INTEGER NOT NULL,
    tax_rate DECIMAL(5,4),
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- ORGANIZATION PAYMENT METHODS
-- ============================================================================

CREATE TABLE IF NOT EXISTS organization_payment_methods (
    id TEXT PRIMARY KEY,
    organization_id TEXT NOT NULL,
    stripe_payment_method_id TEXT NOT NULL UNIQUE,
    type TEXT NOT NULL,
    last4 TEXT,
    brand TEXT,
    exp_month INTEGER,
    exp_year INTEGER,
    is_default BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- ORGANIZATION REFUNDS
-- ============================================================================

CREATE TABLE IF NOT EXISTS organization_refunds (
    id TEXT PRIMARY KEY,
    organization_id TEXT NOT NULL,
    stripe_refund_id TEXT NOT NULL UNIQUE,
    stripe_payment_intent_id TEXT NOT NULL,
    amount INTEGER NOT NULL,
    currency TEXT NOT NULL DEFAULT 'usd',
    status TEXT NOT NULL CHECK (status IN ('succeeded', 'pending', 'failed', 'canceled')),
    reason TEXT NOT NULL CHECK (reason IN ('duplicate', 'fraudulent', 'requested_by_customer', 'other')),
    description TEXT,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    processed_at TIMESTAMP WITH TIME ZONE
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

-- Organization Stripe Customers indexes
CREATE INDEX IF NOT EXISTS idx_organization_stripe_customers_org_id ON organization_stripe_customers(organization_id);
CREATE INDEX IF NOT EXISTS idx_organization_stripe_customers_stripe_id ON organization_stripe_customers(stripe_customer_id);

-- Organization Subscriptions indexes
CREATE INDEX IF NOT EXISTS idx_organization_subscriptions_org_id ON organization_subscriptions(organization_id);
CREATE INDEX IF NOT EXISTS idx_organization_subscriptions_stripe_id ON organization_subscriptions(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_organization_subscriptions_status ON organization_subscriptions(status);

-- Seat History indexes
CREATE INDEX IF NOT EXISTS idx_organization_seat_history_org_id ON organization_seat_history(organization_id);
CREATE INDEX IF NOT EXISTS idx_organization_seat_history_subscription_id ON organization_seat_history(subscription_id);
CREATE INDEX IF NOT EXISTS idx_organization_seat_history_changed_by ON organization_seat_history(changed_by);

-- Organization Usage indexes
CREATE INDEX IF NOT EXISTS idx_organization_usage_org_id ON organization_usage(organization_id);
CREATE INDEX IF NOT EXISTS idx_organization_usage_team_id ON organization_usage(team_id);
CREATE INDEX IF NOT EXISTS idx_organization_usage_period ON organization_usage(period);
CREATE INDEX IF NOT EXISTS idx_organization_usage_metric ON organization_usage(metric);

-- Organization Billing Info indexes
CREATE INDEX IF NOT EXISTS idx_organization_billing_info_org_id ON organization_billing_info(organization_id);
CREATE INDEX IF NOT EXISTS idx_organization_billing_info_stripe_id ON organization_billing_info(stripe_customer_id);

-- Organization Invoices indexes
CREATE INDEX IF NOT EXISTS idx_organization_invoices_org_id ON organization_invoices(organization_id);
CREATE INDEX IF NOT EXISTS idx_organization_invoices_stripe_id ON organization_invoices(stripe_invoice_id);
CREATE INDEX IF NOT EXISTS idx_organization_invoices_status ON organization_invoices(status);

-- Organization Invoice Line Items indexes
CREATE INDEX IF NOT EXISTS idx_organization_invoice_line_items_invoice_id ON organization_invoice_line_items(invoice_id);

-- Organization Payment Methods indexes
CREATE INDEX IF NOT EXISTS idx_organization_payment_methods_org_id ON organization_payment_methods(organization_id);
CREATE INDEX IF NOT EXISTS idx_organization_payment_methods_stripe_id ON organization_payment_methods(stripe_payment_method_id);

-- Organization Refunds indexes
CREATE INDEX IF NOT EXISTS idx_organization_refunds_org_id ON organization_refunds(organization_id);
CREATE INDEX IF NOT EXISTS idx_organization_refunds_stripe_id ON organization_refunds(stripe_refund_id);

-- ============================================================================
-- FOREIGN KEY CONSTRAINTS (if organizations and users tables exist)
-- ============================================================================

-- Note: These foreign key constraints should be added if the referenced tables exist
-- Uncomment and modify table names as needed for your specific schema

-- ALTER TABLE organization_stripe_customers 
-- ADD CONSTRAINT fk_organization_stripe_customers_org_id 
-- FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE;

-- ALTER TABLE organization_subscriptions 
-- ADD CONSTRAINT fk_organization_subscriptions_org_id 
-- FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE;

-- ALTER TABLE organization_seat_history 
-- ADD CONSTRAINT fk_organization_seat_history_org_id 
-- FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE;

-- ALTER TABLE organization_seat_history 
-- ADD CONSTRAINT fk_organization_seat_history_subscription_id 
-- FOREIGN KEY (subscription_id) REFERENCES organization_subscriptions(id) ON DELETE CASCADE;

-- ALTER TABLE organization_seat_history 
-- ADD CONSTRAINT fk_organization_seat_history_changed_by 
-- FOREIGN KEY (changed_by) REFERENCES users(id) ON DELETE CASCADE;

-- ALTER TABLE organization_usage 
-- ADD CONSTRAINT fk_organization_usage_org_id 
-- FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE;

-- ALTER TABLE organization_billing_info 
-- ADD CONSTRAINT fk_organization_billing_info_org_id 
-- FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE;

-- ALTER TABLE organization_invoices 
-- ADD CONSTRAINT fk_organization_invoices_org_id 
-- FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE;

-- ALTER TABLE organization_payment_methods 
-- ADD CONSTRAINT fk_organization_payment_methods_org_id 
-- FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE;

-- ALTER TABLE organization_refunds 
-- ADD CONSTRAINT fk_organization_refunds_org_id 
-- FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE;
