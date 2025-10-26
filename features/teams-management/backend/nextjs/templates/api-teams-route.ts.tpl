import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { eq, and, isNull } from 'drizzle-orm';
import { teams, teamMembers } from '@/lib/db/schema/teams';
import { CreateTeamDataSchema as CreateTeamSchema } from '@/lib/teams-management';

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers
    });

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    // Get teams where user is a member
    const userTeams = await db
      .select({
        team: teams,
        membership: teamMembers,
      })
      .from(teamMembers)
      .innerJoin(teams, eq(teams.id, teamMembers.teamId))
      .where(
        and(
          eq(teamMembers.userId, session.user.id),
          isNull(teamMembers.leftAt) // Only active memberships
        )
      );

    // Format response
    const formattedTeams = userTeams.map(({ team, membership }) => ({
      id: team.id,
      name: team.name,
      slug: team.slug,
      description: team.description,
      avatar: team.avatar,
      ownerId: team.ownerId,
      settings: team.settings,
      role: membership.role, // User's role in this team
      joinedAt: membership.joinedAt,
      createdAt: team.createdAt,
      updatedAt: team.updatedAt,
      // TODO: Add memberCount via aggregation
      memberCount: 1,
    }));

    return NextResponse.json(formattedTeams);
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

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    
    // Validate input using shared schema from tech-stack
    const validatedData = CreateTeamSchema.parse(body);
    
    // Create new team
    const [newTeam] = await db.insert(teams).values({
      name: validatedData.name,
      slug: validatedData.slug || validatedData.name.toLowerCase().replace(/\s+/g, '-'),
      description: validatedData.description,
      avatar: validatedData.avatar,
      ownerId: session.user.id,
      settings: {
        allowInvites: true,
        requireApproval: false,
        defaultRole: 'member',
        permissions: ['read', 'write'],
      },
    }).returning();

    // Add owner as a member with 'owner' role
    await db.insert(teamMembers).values({
      teamId: newTeam.id,
      userId: session.user.id,
      role: 'owner',
    });

    // Return created team
    const response = {
      id: newTeam.id,
      name: newTeam.name,
      slug: newTeam.slug,
      description: newTeam.description,
      avatar: newTeam.avatar,
      ownerId: newTeam.ownerId,
      settings: newTeam.settings,
      role: 'owner' as const,
      memberCount: 1,
      createdAt: newTeam.createdAt.toISOString(),
      updatedAt: newTeam.updatedAt.toISOString(),
    };

    return NextResponse.json(response, { status: 201 });
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
