-- Migration: 001_projects.sql
-- Description: Create projects and project_generations tables
-- Created: <%= new Date().toISOString() %>

-- ============================================================================
-- ENUMS
-- ============================================================================

CREATE TYPE project_status AS ENUM ('draft', 'generating', 'ready', 'error');
CREATE TYPE project_visibility AS ENUM ('private', 'team', 'organization');

-- ============================================================================
-- PROJECTS
-- ============================================================================

CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    user_id TEXT NOT NULL,
    organization_id TEXT,
    team_id TEXT,
    genome_json TEXT NOT NULL,
    status project_status NOT NULL DEFAULT 'draft',
    version TEXT NOT NULL DEFAULT '1.0.0',
    visibility project_visibility NOT NULL DEFAULT 'private',
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_projects_organization_id ON projects(organization_id);
CREATE INDEX idx_projects_team_id ON projects(team_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_visibility ON projects(visibility);
CREATE INDEX idx_projects_created_at ON projects(created_at);

COMMENT ON TABLE projects IS 'Projects - Stores user projects (genomes) with metadata';
COMMENT ON COLUMN projects.genome_json IS 'JSON string of the genome definition';
COMMENT ON COLUMN projects.status IS 'Current status of the project (draft, generating, ready, error)';
COMMENT ON COLUMN projects.visibility IS 'Visibility level of the project';

-- ============================================================================
-- PROJECT GENERATIONS
-- ============================================================================

CREATE TABLE IF NOT EXISTS project_generations (
    id TEXT PRIMARY KEY,
    project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    status project_status NOT NULL DEFAULT 'generating',
    job_id TEXT,
    progress INTEGER,
    error_message TEXT,
    metadata JSONB,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_project_generations_project_id ON project_generations(project_id);
CREATE INDEX idx_project_generations_job_id ON project_generations(job_id);
CREATE INDEX idx_project_generations_status ON project_generations(status);

COMMENT ON TABLE project_generations IS 'Project Generations - Tracks individual generation attempts';
COMMENT ON COLUMN project_generations.job_id IS 'BullMQ job ID for tracking generation progress';

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_projects_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for projects table
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_projects_updated_at();

