/**
 * Teams API Route
 * 
 * Handles team CRUD operations
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { TeamService } from '@/lib/teams/services';
import { CreateTeamRequest } from '@/lib/teams/types';

const createTeamSchema = z.object({
  name: z.string().min(1, 'Team name is required'),
  description: z.string().optional(),
  slug: z.string().optional(),
  avatar: z.string().url().optional(),
  settings: z.object({
    allowMemberInvites: z.boolean().optional(),
    requireApprovalForJoins: z.boolean().optional(),
    allowPublicVisibility: z.boolean().optional(),
    maxMembers: z.number().positive().optional(),
    customFields: z.record(z.unknown()).optional(),
    notifications: z.object({
      email: z.boolean().optional(),
      inApp: z.boolean().optional(),
      weeklyDigest: z.boolean().optional(),
    }).optional(),
  }).optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const filters = {
      userId: userId || undefined,
      search: search || undefined,
    };

    const result = await TeamService.getUserTeams(userId || '', page, limit);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching teams:', error);
    return NextResponse.json(
      { error: 'Failed to fetch teams' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createTeamSchema.parse(body);

    // In a real implementation, you would get the user ID from the session
    const userId = 'current-user-id'; // This should come from your auth system

    const team = await TeamService.createTeam(validatedData, userId);

    return NextResponse.json(team, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Error creating team:', error);
    return NextResponse.json(
      { error: 'Failed to create team' },
      { status: 500 }
    );
  }
}
