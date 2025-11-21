/**
 * Generate Project API Route
 * 
 * POST /api/projects/[id]/generate - Trigger project generation
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '<%= importPath(paths.db) %>db';
import { projects, projectGenerations } from '<%= importPath(paths.db) %>db/schema/projects';
import { GenerateProjectDataSchema } from '<%= importPath(paths.lib) %>projects/schemas';
import { addJob } from '<%= importPath(paths.jobs) %>jobs/bullmq';
import { eq, and } from 'drizzle-orm';
import { createId } from '@paralleldrive/cuid2';

/**
 * POST /api/projects/[id]/generate
 * Trigger project generation
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // TODO: Get userId from auth
    const userId = 'user-id'; // Replace with actual auth
    
    const body = await request.json();
    const validatedData = GenerateProjectDataSchema.parse({ ...body, projectId: params.id });
    
    // Get project
    const [project] = await db
      .select()
      .from(projects)
      .where(and(eq(projects.id, params.id), eq(projects.userId, userId)))
      .limit(1);
    
    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }
    
    // Create generation record
    const generationId = createId();
    const [generation] = await db
      .insert(projectGenerations)
      .values({
        id: generationId,
        projectId: params.id,
        status: 'generating',
      })
      .returning();
    
    // Add job to BullMQ queue
    const jobId = await addJob(
      'project-generation',
      'generate-project',
      {
        projectId: params.id,
        generationId: generationId,
        genomeJson: project.genomeJson,
        regenerate: validatedData.regenerate,
      },
      {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 2000,
        },
      }
    );
    
    // Update generation with job ID
    await db
      .update(projectGenerations)
      .set({ jobId })
      .where(eq(projectGenerations.id, generationId));
    
    // Update project status
    await db
      .update(projects)
      .set({ status: 'generating' })
      .where(eq(projects.id, params.id));
    
    return NextResponse.json({
      project,
      generation: { ...generation, jobId },
      success: true,
      jobId,
    });
  } catch (error) {
    console.error('Error generating project:', error);
    return NextResponse.json(
      { error: 'Failed to generate project' },
      { status: 500 }
    );
  }
}

