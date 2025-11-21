/**
 * Projects API Route - List & Create
 * 
 * GET /api/projects - List projects with filters
 * POST /api/projects - Create new project
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '<%= importPath(paths.db) %>db';
import { projects } from '<%= importPath(paths.db) %>db/schema/projects';
import { CreateProjectDataSchema } from '<%= importPath(paths.lib) %>projects/schemas';
import { eq, and, ilike, or } from 'drizzle-orm';
import { createId } from '@paralleldrive/cuid2';

/**
 * GET /api/projects
 * List projects with filters
 */
export async function GET(request: NextRequest) {
  try {
    // TODO: Get userId from auth
    const userId = 'user-id'; // Replace with actual auth
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status')?.split(',');
    const organizationId = searchParams.get('organizationId');
    const teamId = searchParams.get('teamId');
    const search = searchParams.get('search');
    
    // Build query conditions
    const conditions = [eq(projects.userId, userId)];
    
    if (status && status.length > 0) {
      conditions.push(eq(projects.status, status[0] as any)); // Simplified
    }
    if (organizationId) {
      conditions.push(eq(projects.organizationId, organizationId));
    }
    if (teamId) {
      conditions.push(eq(projects.teamId, teamId));
    }
    if (search) {
      conditions.push(
        or(
          ilike(projects.name, `%${search}%`),
          ilike(projects.description, `%${search}%`)
        )!
      );
    }
    
    const projectsList = await db
      .select()
      .from(projects)
      .where(and(...conditions));
    
    return NextResponse.json({ projects: projectsList });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/projects
 * Create new project
 */
export async function POST(request: NextRequest) {
  try {
    // TODO: Get userId from auth
    const userId = 'user-id'; // Replace with actual auth
    
    const body = await request.json();
    const validatedData = CreateProjectDataSchema.parse(body);
    
    const [newProject] = await db
      .insert(projects)
      .values({
        id: createId(),
        userId,
        ...validatedData,
        status: 'draft',
      })
      .returning();
    
    return NextResponse.json(
      { project: newProject, success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}

