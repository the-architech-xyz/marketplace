/**
 * Semantic Search Schemas
 */

import { z } from 'zod';

export const SemanticSearchResultSchema = z.object({
  id: z.string(),
  content: z.string(),
  similarity: z.number().min(0).max(1),
  metadata: z.record(z.unknown()).optional(),
});

export const SemanticSearchOptionsSchema = z.object({
  limit: z.number().positive().optional(),
  threshold: z.number().min(0).max(1).optional(),
  metadata: z.record(z.unknown()).optional(),
});



