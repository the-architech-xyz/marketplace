/**
 * Generation Status API Route
 * 
 * GET /api/projects/[id]/generation/status - Get generation status
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '<%= importPath(paths.db) %>db';
import { projects, projectGenerations } from '<%= importPath(paths.db) %>db/schema/projects';
import { eq, and, desc } from 'drizzle-orm';

/**
 * GET /api/projects/[id]/generation/status
 * Get latest generation status for project
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // TODO: Get userId from auth
    const userId = 'user-id'; // Replace with actual auth
    
    // Verify project ownership
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
    
    // Get latest generation
    const [generation] = await db
      .select()
      .from(projectGenerations)
      .where(eq(projectGenerations.projectId, params.id))
      .orderBy(desc(projectGenerations.createdAt))
      .limit(1);
    
    return NextResponse.json({ generation: generation || null });
  } catch (error) {
    console.error('Error fetching generation status:', error);
    return NextResponse.json(
      { error: 'Failed to fetch generation status' },
      { status: 500 }
    );
  }
}

