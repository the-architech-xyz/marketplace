-- Migration: 001_ai_chat.sql
-- Description: Create AI Chat tables for conversations, messages, prompts, and usage tracking
-- Created: <%= new Date().toISOString() %>

-- ============================================================================
-- ENUMS
-- ============================================================================

CREATE TYPE message_role AS ENUM ('user', 'assistant', 'system', 'function');
CREATE TYPE conversation_status AS ENUM ('active', 'archived', 'deleted');
CREATE TYPE prompt_visibility AS ENUM ('private', 'team', 'public');

-- ============================================================================
-- AI CONVERSATIONS
-- ============================================================================

CREATE TABLE IF NOT EXISTS ai_conversations (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    title TEXT NOT NULL,
    status conversation_status NOT NULL DEFAULT 'active',
    model TEXT NOT NULL,
    provider TEXT NOT NULL DEFAULT 'openai',
    temperature INTEGER,
    max_tokens INTEGER,
    system_prompt TEXT,
    total_messages INTEGER NOT NULL DEFAULT 0,
    total_tokens INTEGER NOT NULL DEFAULT 0,
    estimated_cost INTEGER NOT NULL DEFAULT 0,
    settings JSONB,
    last_message_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_ai_conversations_user ON ai_conversations(user_id);
CREATE INDEX idx_ai_conversations_status ON ai_conversations(status);
CREATE INDEX idx_ai_conversations_last_message ON ai_conversations(last_message_at);
CREATE INDEX idx_ai_conversations_provider ON ai_conversations(provider);
CREATE INDEX idx_ai_conversations_model ON ai_conversations(model);
CREATE INDEX idx_ai_conversations_user_status ON ai_conversations(user_id, status);

COMMENT ON TABLE ai_conversations IS 'AI chat conversations - stores chat sessions with configuration and statistics';
COMMENT ON COLUMN ai_conversations.temperature IS 'Temperature scaled by 100 (0-200 for 0.0-2.0)';
COMMENT ON COLUMN ai_conversations.estimated_cost IS 'Estimated cost in cents';

-- ============================================================================
-- AI MESSAGES
-- ============================================================================

CREATE TABLE IF NOT EXISTS ai_messages (
    id TEXT PRIMARY KEY,
    conversation_id TEXT NOT NULL REFERENCES ai_conversations(id) ON DELETE CASCADE,
    role message_role NOT NULL,
    content TEXT NOT NULL,
    tokens INTEGER,
    model TEXT,
    cost INTEGER,
    attachments JSONB,
    function_call JSONB,
    tool_use JSONB,
    error TEXT,
    error_code TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_ai_messages_conversation ON ai_messages(conversation_id);
CREATE INDEX idx_ai_messages_role ON ai_messages(role);
CREATE INDEX idx_ai_messages_created ON ai_messages(created_at);
CREATE INDEX idx_ai_messages_conversation_created ON ai_messages(conversation_id, created_at);

COMMENT ON TABLE ai_messages IS 'Individual messages within AI conversations';
COMMENT ON COLUMN ai_messages.cost IS 'Cost for this message in cents';
COMMENT ON COLUMN ai_messages.attachments IS 'Array of attachments (images, files, code)';
COMMENT ON COLUMN ai_messages.function_call IS 'Function calling metadata';
COMMENT ON COLUMN ai_messages.tool_use IS 'Tool use metadata';

-- ============================================================================
-- AI PROMPTS (Custom Prompt Library)
-- ============================================================================

CREATE TABLE IF NOT EXISTS ai_prompts (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    team_id TEXT,
    name TEXT NOT NULL,
    description TEXT,
    prompt TEXT NOT NULL,
    system_prompt TEXT,
    visibility prompt_visibility NOT NULL DEFAULT 'private',
    category TEXT,
    tags JSONB,
    config JSONB,
    use_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_ai_prompts_user ON ai_prompts(user_id);
CREATE INDEX idx_ai_prompts_team ON ai_prompts(team_id);
CREATE INDEX idx_ai_prompts_visibility ON ai_prompts(visibility);
CREATE INDEX idx_ai_prompts_category ON ai_prompts(category);
CREATE INDEX idx_ai_prompts_user_visibility ON ai_prompts(user_id, visibility);

COMMENT ON TABLE ai_prompts IS 'Custom prompt library for users';
COMMENT ON COLUMN ai_prompts.visibility IS 'private (user only), team (team members), or public (everyone)';
COMMENT ON COLUMN ai_prompts.config IS 'Optional configuration (model, temperature, maxTokens)';

-- ============================================================================
-- AI USAGE TRACKING
-- ============================================================================

CREATE TABLE IF NOT EXISTS ai_usage (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    conversation_id TEXT REFERENCES ai_conversations(id) ON DELETE SET NULL,
    model TEXT NOT NULL,
    provider TEXT NOT NULL,
    prompt_tokens INTEGER NOT NULL,
    completion_tokens INTEGER NOT NULL,
    total_tokens INTEGER NOT NULL,
    cost INTEGER NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_ai_usage_user ON ai_usage(user_id);
CREATE INDEX idx_ai_usage_conversation ON ai_usage(conversation_id);
CREATE INDEX idx_ai_usage_provider ON ai_usage(provider);
CREATE INDEX idx_ai_usage_model ON ai_usage(model);
CREATE INDEX idx_ai_usage_created ON ai_usage(created_at);
CREATE INDEX idx_ai_usage_user_created ON ai_usage(user_id, created_at);

COMMENT ON TABLE ai_usage IS 'AI usage tracking for analytics and billing';
COMMENT ON COLUMN ai_usage.cost IS 'Cost in cents';
COMMENT ON COLUMN ai_usage.metadata IS 'Request metadata (endpoint, duration, errors)';

-- ============================================================================
-- AI CONVERSATION SHARES
-- ============================================================================

CREATE TABLE IF NOT EXISTS ai_conversation_shares (
    id TEXT PRIMARY KEY,
    conversation_id TEXT NOT NULL REFERENCES ai_conversations(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL,
    share_token TEXT NOT NULL UNIQUE,
    title TEXT,
    description TEXT,
    is_public BOOLEAN NOT NULL DEFAULT FALSE,
    require_auth BOOLEAN NOT NULL DEFAULT FALSE,
    allow_comments BOOLEAN NOT NULL DEFAULT FALSE,
    view_count INTEGER NOT NULL DEFAULT 0,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_ai_conversation_shares_conversation ON ai_conversation_shares(conversation_id);
CREATE INDEX idx_ai_conversation_shares_token ON ai_conversation_shares(share_token);
CREATE INDEX idx_ai_conversation_shares_user ON ai_conversation_shares(user_id);
CREATE INDEX idx_ai_conversation_shares_public ON ai_conversation_shares(is_public);

COMMENT ON TABLE ai_conversation_shares IS 'Shareable links for AI conversations';
COMMENT ON COLUMN ai_conversation_shares.share_token IS 'Unique token for sharing';
COMMENT ON COLUMN ai_conversation_shares.expires_at IS 'Optional expiration date';

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_ai_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for conversations
CREATE TRIGGER update_ai_conversations_updated_at BEFORE UPDATE ON ai_conversations
    FOR EACH ROW EXECUTE FUNCTION update_ai_updated_at_column();

-- Trigger for prompts
CREATE TRIGGER update_ai_prompts_updated_at BEFORE UPDATE ON ai_prompts
    FOR EACH ROW EXECUTE FUNCTION update_ai_updated_at_column();

-- Trigger for shares
CREATE TRIGGER update_ai_shares_updated_at BEFORE UPDATE ON ai_conversation_shares
    FOR EACH ROW EXECUTE FUNCTION update_ai_updated_at_column();

-- ============================================================================
-- POLICIES (Optional: Row Level Security)
-- ============================================================================

-- Example RLS policies (uncomment if using Supabase or Postgres RLS)

-- -- Enable RLS
-- ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE ai_messages ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE ai_prompts ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE ai_usage ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE ai_conversation_shares ENABLE ROW LEVEL SECURITY;

-- -- Users can view their own conversations
-- CREATE POLICY "Users can view their conversations" ON ai_conversations
--     FOR SELECT USING (user_id = auth.uid());

-- -- Users can create their own conversations
-- CREATE POLICY "Users can create conversations" ON ai_conversations
--     FOR INSERT WITH CHECK (user_id = auth.uid());

-- -- Users can update their own conversations
-- CREATE POLICY "Users can update their conversations" ON ai_conversations
--     FOR UPDATE USING (user_id = auth.uid());

-- -- Users can view messages in their conversations
-- CREATE POLICY "Users can view their messages" ON ai_messages
--     FOR SELECT USING (
--         EXISTS (
--             SELECT 1 FROM ai_conversations
--             WHERE ai_conversations.id = ai_messages.conversation_id
--             AND ai_conversations.user_id = auth.uid()
--         )
--     );


