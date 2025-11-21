/**
 * Projects Database Schema (Drizzle)
 * 
 * This schema stores projects (genomes), generations, and metadata.
 */

import { pgTable, text, timestamp, pgEnum, jsonb, integer } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';

// ============================================================================
// ENUMS
// ============================================================================

export const projectStatusEnum = pgEnum('project_status', [
  'draft',          // Project created but not yet generated
  'generating',     // Generation in progress
  'ready',          // Generation completed successfully
  'error'           // Generation failed
]);

export const projectVisibilityEnum = pgEnum('project_visibility', [
  'private',        // Only owner can see
  'team',           // Visible to team members
  'organization'   // Visible to organization members
]);

// ============================================================================
// PROJECTS
// ============================================================================

/**
 * Projects Table
 * 
 * Stores projects (genomes) with their metadata and generation status.
 */
export const projects = pgTable('projects', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  
  // Project details
  name: text('name').notNull(),
  description: text('description'),
  
  // Ownership
  userId: text('user_id').notNull(),
  organizationId: text('organization_id'),
  teamId: text('team_id'),
  
  // Genome data
  genomeJson: text('genome_json').notNull(),
  
  // Status
  status: projectStatusEnum('status').notNull().default('draft'),
  version: text('version').notNull().default('1.0.0'),
  visibility: projectVisibilityEnum('visibility').notNull().default('private'),
  
  // Metadata
  metadata: jsonb('metadata').$type<{
    framework?: string;
    structure?: string;
    modules?: string[];
    generatedAt?: string;
    generatedUrl?: string;
    errorMessage?: string;
    [key: string]: any;
  }>(),
  
  // Timestamps
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ============================================================================
// PROJECT GENERATIONS
// ============================================================================

/**
 * Project Generations Table
 * 
 * Tracks individual generation attempts for projects.
 * Stores job IDs, progress, and errors.
 */
export const projectGenerations = pgTable('project_generations', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  projectId: text('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  
  // Generation status
  status: projectStatusEnum('status').notNull().default('generating'),
  jobId: text('job_id'),              // BullMQ job ID
  
  // Progress tracking
  progress: integer('progress'),       // 0-100
  
  // Error tracking
  errorMessage: text('error_message'),
  
  // Metadata
  metadata: jsonb('metadata').$type<Record<string, any>>(),
  
  // Timestamps
  startedAt: timestamp('started_at').defaultNow(),
  completedAt: timestamp('completed_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ============================================================================
// INDEXES
// ============================================================================

export const projectsIndexes = {
  userId: projects.userId,
  organizationId: projects.organizationId,
  teamId: projects.teamId,
  status: projects.status,
  visibility: projects.visibility,
  createdAt: projects.createdAt,
};

export const projectGenerationsIndexes = {
  projectId: projectGenerations.projectId,
  jobId: projectGenerations.jobId,
  status: projectGenerations.status,
};

