-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Add vector column to <%= params.tableName || 'documents' %> table
-- Note: This assumes the table exists. Adjust based on your schema.
-- ALTER TABLE <%= params.tableName || 'documents' %> ADD COLUMN IF NOT EXISTS embedding vector(1536);

-- Create index for similarity search
-- CREATE INDEX IF NOT EXISTS <%= params.tableName || 'documents' %>_embedding_idx 
-- ON <%= params.tableName || 'documents' %> 
-- USING ivfflat (embedding vector_cosine_ops)
-- WITH (lists = 100);



