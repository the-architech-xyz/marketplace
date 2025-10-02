-- Add constraints migration
-- Version: 003
-- Description: Add additional constraints for data integrity

-- Users table constraints
ALTER TABLE users
  ADD CONSTRAINT users_email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$'),
  ADD CONSTRAINT users_name_not_empty CHECK (name <> ''),
  ADD CONSTRAINT users_role_valid CHECK (role IN ('user', 'admin', 'moderator'));

-- Posts table constraints
ALTER TABLE posts
  ADD CONSTRAINT posts_title_not_empty CHECK (title <> ''),
  ADD CONSTRAINT posts_content_not_empty CHECK (content <> ''),
  ADD CONSTRAINT posts_slug_format CHECK (slug ~* '^[a-z0-9-]+$'),
  ADD CONSTRAINT posts_published_at_when_published CHECK (
    (published = TRUE AND published_at IS NOT NULL) OR 
    (published = FALSE)
  );

-- Comments table constraints
ALTER TABLE comments
  ADD CONSTRAINT comments_content_not_empty CHECK (content <> ''),
  ADD CONSTRAINT comments_moderated_at_when_moderated CHECK (
    (moderated = TRUE AND moderated_at IS NOT NULL) OR 
    (moderated = FALSE)
  );

-- Add foreign key constraint for comment replies
ALTER TABLE comments
  ADD CONSTRAINT comments_parent_id_fkey 
  FOREIGN KEY (parent_id) REFERENCES comments(id) ON DELETE CASCADE;
