/**
 * Semantic Search Feature Contract (pgvector)
 * 
 * Generic feature for semantic search using pgvector
 */

export interface SemanticSearchResult {
  id: string;
  content: string;
  similarity: number; // Cosine similarity score (0-1)
  metadata?: Record<string, unknown>;
}

export interface SemanticSearchOptions {
  limit?: number;
  threshold?: number; // Minimum similarity threshold
  metadata?: Record<string, unknown>; // Filter by metadata
}



