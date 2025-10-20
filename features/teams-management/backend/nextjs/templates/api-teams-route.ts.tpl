import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { CreateTeamDataSchema as CreateTeamSchema } from '@/lib/teams-management';

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers
    });

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    // Get teams for the current user
    const teams = [];

    return NextResponse.json(teams);
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
    const session = await auth.api.getSession({
      headers: request.headers
    });

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    
    // Validate input using shared schema from tech-stack
    const validatedData = CreateTeamSchema.parse(body);
    
    // Create new team
    const newTeam = {
      id: 'team-' + Date.now(),
      ...validatedData,
      status: 'active',
      ownerId: session.user.id,
      memberCount: 1,
      settings: {
        allowInvites: true,
        requireApproval: false,
        defaultRole: 'member',
        permissions: ['read', 'write']
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json(newTeam, { status: 201 });
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation failed', details: error.message },
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
