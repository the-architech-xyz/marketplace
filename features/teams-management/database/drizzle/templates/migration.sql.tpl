-- Migration: 001_teams.sql
-- Description: Create teams management tables (database-agnostic)
-- Created: <%= new Date().toISOString() %>

-- ============================================================================
-- ENUMS
-- ============================================================================

CREATE TYPE team_role AS ENUM ('owner', 'admin', 'member');
CREATE TYPE invitation_status AS ENUM ('pending', 'accepted', 'rejected', 'expired');

-- ============================================================================
-- TEAMS
-- ============================================================================

CREATE TABLE IF NOT EXISTS teams (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    avatar TEXT,
    owner_id TEXT NOT NULL,
    settings JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_teams_slug ON teams(slug);
CREATE INDEX idx_teams_owner ON teams(owner_id);

COMMENT ON TABLE teams IS 'Teams - Collaborative workspaces with multiple members';
COMMENT ON COLUMN teams.settings IS 'Team settings (allowInvites, requireApproval, defaultRole, permissions)';

-- ============================================================================
-- TEAM MEMBERS
-- ============================================================================

CREATE TABLE IF NOT EXISTS team_members (
    id TEXT PRIMARY KEY,
    team_id TEXT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL,
    role team_role NOT NULL DEFAULT 'member',
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    left_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(team_id, user_id)
);

CREATE INDEX idx_team_members_team ON team_members(team_id);
CREATE INDEX idx_team_members_user ON team_members(user_id);
CREATE INDEX idx_team_members_team_user ON team_members(team_id, user_id);

COMMENT ON TABLE team_members IS 'Team members - Links users to teams with specific roles';
COMMENT ON COLUMN team_members.left_at IS 'When member left or was removed from the team';

-- ============================================================================
-- TEAM INVITATIONS
-- ============================================================================

CREATE TABLE IF NOT EXISTS team_invitations (
    id TEXT PRIMARY KEY,
    team_id TEXT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    user_id TEXT,
    role team_role NOT NULL DEFAULT 'member',
    invited_by TEXT NOT NULL,
    status invitation_status NOT NULL DEFAULT 'pending',
    token TEXT NOT NULL UNIQUE,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    accepted_at TIMESTAMP WITH TIME ZONE,
    rejected_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_team_invitations_team ON team_invitations(team_id);
CREATE INDEX idx_team_invitations_email ON team_invitations(email);
CREATE INDEX idx_team_invitations_token ON team_invitations(token);
CREATE INDEX idx_team_invitations_status ON team_invitations(status);
CREATE INDEX idx_team_invitations_team_email_status ON team_invitations(team_id, email, status);

COMMENT ON TABLE team_invitations IS 'Team invitations - Tracks pending and processed invitations';
COMMENT ON COLUMN team_invitations.token IS 'Unique token for accepting invitation';
COMMENT ON COLUMN team_invitations.user_id IS 'User ID if invitee is an existing user';

-- ============================================================================
-- TEAM ACTIVITY
-- ============================================================================

CREATE TABLE IF NOT EXISTS team_activity (
    id TEXT PRIMARY KEY,
    team_id TEXT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL,
    action TEXT NOT NULL CHECK (action IN ('created', 'updated', 'deleted', 'member_added', 'member_removed', 'member_role_changed', 'invitation_sent', 'invitation_accepted', 'invitation_rejected', 'settings_updated')),
    entity_type TEXT NOT NULL CHECK (entity_type IN ('team', 'member', 'invitation', 'settings')),
    entity_id TEXT,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_team_activity_team ON team_activity(team_id);
CREATE INDEX idx_team_activity_user ON team_activity(user_id);
CREATE INDEX idx_team_activity_action ON team_activity(action);
CREATE INDEX idx_team_activity_created ON team_activity(created_at);

COMMENT ON TABLE team_activity IS 'Team activity - Audit trail of team actions';
COMMENT ON COLUMN team_activity.metadata IS 'Additional details about the action (JSON)';

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for teams table
CREATE TRIGGER update_teams_updated_at BEFORE UPDATE ON teams
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- POLICIES (Optional: Row Level Security)
-- ============================================================================

-- Example RLS policies (uncomment if using Supabase or Postgres RLS)

-- -- Enable RLS
-- ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE team_invitations ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE team_activity ENABLE ROW LEVEL SECURITY;

-- -- Users can view teams they are members of
-- CREATE POLICY "Users can view their teams" ON teams
--     FOR SELECT USING (
--         EXISTS (
--             SELECT 1 FROM team_members
--             WHERE team_members.team_id = teams.id
--             AND team_members.user_id = auth.uid()
--             AND team_members.left_at IS NULL
--         )
--     );

-- -- Users can update teams they own
-- CREATE POLICY "Users can update their teams" ON teams
--     FOR UPDATE USING (
--         owner_id = auth.uid()
--     );



