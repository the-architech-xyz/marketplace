-- Drizzle-specific database seeding
-- This script seeds the database with initial data for Drizzle ORM

-- Use the database
\c <%= project.name %>_drizzle;

-- Example seed data (customize based on your schema)
-- INSERT INTO users (id, email, name, created_at) VALUES 
--   ('<%= uuid %>', 'admin@<%= project.name %>.com', 'Admin User', NOW()),
--   ('<%= uuid %>', 'user@<%= project.name %>.com', 'Regular User', NOW());

-- INSERT INTO posts (id, title, content, author_id, created_at) VALUES
--   ('<%= uuid %>', 'Welcome to <%= project.name %>', 'This is your first post!', '<%= uuid %>', NOW());

-- Add your seed data here based on your Drizzle schema
