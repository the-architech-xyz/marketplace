/**
 * Projects Zod Schemas
 * 
 * Validation schemas for Projects feature
 */

import { z } from 'zod';

// Project status enum
export const ProjectStatusSchema = z.enum(['draft', 'generating', 'ready', 'error']);

// Project visibility enum
export const ProjectVisibilitySchema = z.enum(['private', 'team', 'organization']);

// Create project schema
export const CreateProjectDataSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  genomeJson: z.string().min(1),
  organizationId: z.string().optional(),
  teamId: z.string().optional(),
  visibility: ProjectVisibilitySchema.optional().default('private'),
  metadata: z.record(z.any()).optional(),
});

// Update project schema
export const UpdateProjectDataSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  description: z.string().max(1000).optional(),
  genomeJson: z.string().min(1).optional(),
  visibility: ProjectVisibilitySchema.optional(),
  metadata: z.record(z.any()).optional(),
});

// Generate project schema
export const GenerateProjectDataSchema = z.object({
  projectId: z.string().min(1),
  regenerate: z.boolean().optional().default(false),
});

// Project filters schema
export const ProjectFiltersSchema = z.object({
  status: z.array(ProjectStatusSchema).optional(),
  organizationId: z.string().optional(),
  teamId: z.string().optional(),
  visibility: z.array(ProjectVisibilitySchema).optional(),
  search: z.string().optional(),
  createdAfter: z.string().optional(),
  createdBefore: z.string().optional(),
});

