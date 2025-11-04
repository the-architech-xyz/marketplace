-- Migration: 001_waitlist.sql
-- Description: Create waitlist tables with viral referral system (database-agnostic)
-- Created: <%= new Date().toISOString() %>

-- ============================================================================
-- ENUMS
-- ============================================================================

CREATE TYPE waitlist_status AS ENUM ('pending', 'joined', 'invited', 'declined', 'removed');
CREATE TYPE referral_source AS ENUM ('direct', 'referral', 'social');
CREATE TYPE referral_status AS ENUM ('pending', 'completed');

-- ============================================================================
-- WAITLIST USERS
-- ============================================================================

CREATE TABLE IF NOT EXISTS waitlist_users (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    first_name TEXT,
    last_name TEXT,
    status waitlist_status NOT NULL DEFAULT 'pending',
    position INTEGER NOT NULL,
    referral_bonus INTEGER NOT NULL DEFAULT 0,
    referral_code TEXT NOT NULL UNIQUE,
    referred_by_code TEXT,
    referral_count INTEGER NOT NULL DEFAULT 0,
    source referral_source NOT NULL DEFAULT 'direct',
    metadata JSONB,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    invited_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_waitlist_users_email ON waitlist_users(email);
CREATE INDEX idx_waitlist_users_referral_code ON waitlist_users(referral_code);
CREATE INDEX idx_waitlist_users_referred_by_code ON waitlist_users(referred_by_code);
CREATE INDEX idx_waitlist_users_status ON waitlist_users(status);
CREATE INDEX idx_waitlist_users_position ON waitlist_users(position);
CREATE INDEX idx_waitlist_users_source ON waitlist_users(source);

COMMENT ON TABLE waitlist_users IS 'Waitlist users - Tracks users who joined the waitlist';
COMMENT ON COLUMN waitlist_users.position IS 'User position in the waitlist queue';
COMMENT ON COLUMN waitlist_users.referral_bonus IS 'Position boost from referrals';
COMMENT ON COLUMN waitlist_users.referral_code IS 'Unique code for this user to refer others';
COMMENT ON COLUMN waitlist_users.referred_by_code IS 'Code of the person who referred them';

-- ============================================================================
-- WAITLIST REFERRALS
-- ============================================================================

CREATE TABLE IF NOT EXISTS waitlist_referrals (
    id TEXT PRIMARY KEY,
    referrer_id TEXT NOT NULL,
    referee_id TEXT NOT NULL,
    referrer_code TEXT NOT NULL,
    status referral_status NOT NULL DEFAULT 'pending',
    bonus_awarded INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE,
    FOREIGN KEY (referrer_id) REFERENCES waitlist_users(id) ON DELETE CASCADE,
    FOREIGN KEY (referee_id) REFERENCES waitlist_users(id) ON DELETE CASCADE
);

CREATE INDEX idx_waitlist_referrals_referrer ON waitlist_referrals(referrer_id);
CREATE INDEX idx_waitlist_referrals_referee ON waitlist_referrals(referee_id);
CREATE INDEX idx_waitlist_referrals_code ON waitlist_referrals(referrer_code);
CREATE INDEX idx_waitlist_referrals_status ON waitlist_referrals(status);

COMMENT ON TABLE waitlist_referrals IS 'Waitlist referrals - Tracks referral relationships';
COMMENT ON COLUMN waitlist_referrals.referrer_id IS 'User who made the referral';
COMMENT ON COLUMN waitlist_referrals.referee_id IS 'User who was referred';
COMMENT ON COLUMN waitlist_referrals.bonus_awarded IS 'Position boost awarded to referrer';

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_waitlist_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for waitlist_users table
CREATE TRIGGER update_waitlist_users_updated_at BEFORE UPDATE ON waitlist_users
    FOR EACH ROW EXECUTE FUNCTION update_waitlist_updated_at();

-- Auto-increment referral count when referral completed
CREATE OR REPLACE FUNCTION increment_referral_count()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'completed' AND OLD.status = 'pending' THEN
        UPDATE waitlist_users
        SET referral_count = referral_count + 1,
            referral_bonus = referral_bonus + NEW.bonus_awarded
        WHERE id = NEW.referrer_id;
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for referral completion
CREATE TRIGGER auto_increment_referral_count BEFORE UPDATE ON waitlist_referrals
    FOR EACH ROW EXECUTE FUNCTION increment_referral_count();

-- ============================================================================
-- POLICIES (Optional: Row Level Security)
-- ============================================================================

-- Example RLS policies (uncomment if using Supabase or Postgres RLS)

-- -- Enable RLS
-- ALTER TABLE waitlist_users ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE waitlist_referrals ENABLE ROW LEVEL SECURITY;

-- -- Users can view their own data
-- CREATE POLICY "Users can view their waitlist data" ON waitlist_users
--     FOR SELECT USING (auth.uid()::text = id);

-- -- Users can view referrals they made
-- CREATE POLICY "Users can view their referrals" ON waitlist_referrals
--     FOR SELECT USING (auth.uid()::text = referrer_id);


