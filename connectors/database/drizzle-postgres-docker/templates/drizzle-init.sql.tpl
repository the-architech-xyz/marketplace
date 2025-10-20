-- Drizzle-specific database initialization
-- This script sets up the database schema for Drizzle ORM

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS <%= project.name %>_drizzle;

-- Use the database
\c <%= project.name %>_drizzle;

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create drizzle_migrations table
CREATE TABLE IF NOT EXISTS drizzle_migrations (
    id SERIAL PRIMARY KEY,
    hash text NOT NULL,
    created_at bigint
);

-- Create drizzle_migrations_lock table
CREATE TABLE IF NOT EXISTS drizzle_migrations_lock (
    id SERIAL PRIMARY KEY,
    locked boolean NOT NULL DEFAULT false
);

-- Insert initial lock state
INSERT INTO drizzle_migrations_lock (locked) VALUES (false) ON CONFLICT DO NOTHING;

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE <%= project.name %>_drizzle TO drizzle_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO drizzle_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO drizzle_user;
