/**
 * Synap Capture Schemas - Zod Validation
 */

import { z } from 'zod';

// Enums
export const ThoughtTypeSchema = z.enum(['text', 'audio', 'image', 'link']);
export const ThoughtStatusSchema = z.enum(['draft', 'analyzing', 'analyzed', 'archived']);
export const IntentTypeSchema = z.enum(['note', 'task', 'list', 'reminder', 'idea', 'question', 'unknown']);

// Entity Schema
export const EntitySchema = z.object({
  type: z.enum(['person', 'place', 'organization', 'date', 'time', 'other']),
  value: z.string(),
  confidence: z.number().optional(),
});

// Thought Schema
export const ThoughtSchema = z.object({
  id: z.string(),
  userId: z.string(),
  content: z.string(),
  type: ThoughtTypeSchema,
  status: ThoughtStatusSchema,
  tags: z.array(z.string()).optional(),
  entities: z.array(EntitySchema).optional(),
  intent: IntentTypeSchema.optional(),
  embedding: z.array(z.number()).optional(),
  audioUrl: z.string().optional(),
  imageUrl: z.string().optional(),
  linkUrl: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  analyzedAt: z.string().optional(),
});

// Input Schemas
export const CreateThoughtDataSchema = z.object({
  content: z.string().min(1, 'Content is required'),
  type: ThoughtTypeSchema,
  audioUrl: z.string().optional(),
  imageUrl: z.string().optional(),
  linkUrl: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const UpdateThoughtDataSchema = z.object({
  content: z.string().optional(),
  tags: z.array(z.string()).optional(),
  status: ThoughtStatusSchema.optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Result Schemas
export const CreateThoughtResultSchema = z.object({
  thought: ThoughtSchema,
  success: z.boolean(),
  message: z.string().optional(),
});

// Type exports
export type ThoughtType = z.infer<typeof ThoughtTypeSchema>;
export type ThoughtStatus = z.infer<typeof ThoughtStatusSchema>;
export type IntentType = z.infer<typeof IntentTypeSchema>;
export type Entity = z.infer<typeof EntitySchema>;
export type Thought = z.infer<typeof ThoughtSchema>;
export type CreateThoughtData = z.infer<typeof CreateThoughtDataSchema>;
export type UpdateThoughtData = z.infer<typeof UpdateThoughtDataSchema>;



