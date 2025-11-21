/**
 * pgvector Helper Functions
 * 
 * Utilities for working with pgvector in Drizzle
 */

// Example helper for adding vector column to a table
// This should be used in your schema definition

// import { pgTable, text, vector } from 'drizzle-orm/pg-core';
// 
// export const <%= params.tableName || 'documents' %> = pgTable('<%= params.tableName || 'documents' %>', {
//   id: text('id').primaryKey(),
//   content: text('content').notNull(),
//   embedding: vector('embedding', { dimensions: 1536 }), // OpenAI text-embedding-3-small uses 1536 dimensions
//   // ... other columns
// });

// For similarity search, use SQL with cosine distance operator (<=>)
// Example:
// SELECT *, 1 - (embedding <=> query_embedding::vector) as similarity
// FROM documents
// ORDER BY similarity DESC
// LIMIT 10;



