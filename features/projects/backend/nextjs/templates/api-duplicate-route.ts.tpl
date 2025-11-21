/**
 * Duplicate Project API Route
 * 
 * POST /api/projects/[id]/duplicate - Duplicate project
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '<%= importPath(paths.db) %>db';
import { projects } from '<%= importPath(paths.db) %>db/schema/projects';
import { eq, and } from 'drizzle-orm';
import { createId } from '@paralleldrive/cuid2';

/**
 * POST /api/projects/[id]/duplicate
 * Duplicate project
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // TODO: Get userId from auth
    const userId = 'user-id'; // Replace with actual auth
    
    // Get original project
    const [originalProject] = await db
      .select()
      .from(projects)
      .where(and(eq(projects.id, params.id), eq(projects.userId, userId)))
      .limit(1);
    
    if (!originalProject) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }
    
    // Create duplicate
    const [duplicatedProject] = await db
      .insert(projects)
      .values({
        id: createId(),
        name: `${originalProject.name} (Copy)`,
        description: originalProject.description,
        userId,
        organizationId: originalProject.organizationId,
        teamId: originalProject.teamId,
        genomeJson: originalProject.genomeJson,
        status: 'draft',
        version: originalProject.version,
        visibility: originalProject.visibility,
        metadata: originalProject.metadata,
      })
      .returning();
    
    return NextResponse.json({
      project: duplicatedProject,
      success: true,
    });
  } catch (error) {
    console.error('Error duplicating project:', error);
    return NextResponse.json(
      { error: 'Failed to duplicate project' },
      { status: 500 }
    );
  }
}

