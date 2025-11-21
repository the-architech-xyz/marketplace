/**
 * Project API Route - Get, Update, Delete
 * 
 * GET /api/projects/[id] - Get project
 * PATCH /api/projects/[id] - Update project
 * DELETE /api/projects/[id] - Delete project
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '<%= importPath(paths.db) %>db';
import { projects } from '<%= importPath(paths.db) %>db/schema/projects';
import { UpdateProjectDataSchema } from '<%= importPath(paths.lib) %>projects/schemas';
import { eq } from 'drizzle-orm';

/**
 * GET /api/projects/[id]
 * Get single project
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // TODO: Get userId from auth
    const userId = 'user-id'; // Replace with actual auth
    
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
    
    return NextResponse.json({ project });
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/projects/[id]
 * Update project
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // TODO: Get userId from auth
    const userId = 'user-id'; // Replace with actual auth
    
    const body = await request.json();
    const validatedData = UpdateProjectDataSchema.parse(body);
    
    const [updatedProject] = await db
      .update(projects)
      .set(validatedData)
      .where(and(eq(projects.id, params.id), eq(projects.userId, userId)))
      .returning();
    
    if (!updatedProject) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ project: updatedProject, success: true });
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/projects/[id]
 * Delete project
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // TODO: Get userId from auth
    const userId = 'user-id'; // Replace with actual auth
    
    await db
      .delete(projects)
      .where(and(eq(projects.id, params.id), eq(projects.userId, userId)));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}

