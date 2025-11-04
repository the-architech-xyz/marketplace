import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { waitlistUsers } from '@/lib/db/schema/waitlist';
import { eq, count } from 'drizzle-orm';

/**
 * GET /api/waitlist/user/[userId]
 * Get user's waitlist status and stats
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    // Get user by email or ID
    const user = await db
      .select()
      .from(waitlistUsers)
      .where(eq(waitlistUsers.email, params.userId))
      .limit(1);
    
    if (!user || user.length === 0) {
      return NextResponse.json(
        { 
          success: false,
          error: 'User not found' 
        },
        { status: 404 }
      );
    }
    
    const waitlistUser = user[0];
    
    // Get overall stats
    const [totalResult] = await db
      .select({ count: count() })
      .from(waitlistUsers);
    
    const [pendingResult] = await db
      .select({ count: count() })
      .from(waitlistUsers)
      .where(eq(waitlistUsers.status, 'pending'));
    
    const [invitedResult] = await db
      .select({ count: count() })
      .from(waitlistUsers)
      .where(eq(waitlistUsers.status, 'joined'));
    
    const totalUsers = totalResult?.count || 0;
    const pendingUsers = pendingResult?.count || 0;
    const invitedUsers = invitedResult?.count || 0;
    
    // Calculate stats
    const stats = {
      totalUsers,
      pendingUsers,
      invitedUsers,
      totalReferrals: 0, // TODO: Calculate from referrals table
      avgReferralsPerUser: 0,
      topReferrers: [],
      growthRate: 0
    };
    
    const response = {
      user: {
        id: waitlistUser.id,
        email: waitlistUser.email,
        firstName: waitlistUser.firstName,
        lastName: waitlistUser.lastName,
        status: waitlistUser.status,
        position: waitlistUser.position,
        referralCode: waitlistUser.referralCode,
        referredByCode: waitlistUser.referredByCode,
        referralCount: waitlistUser.referralCount,
        referralBonus: waitlistUser.referralBonus,
        source: waitlistUser.source,
        joinedAt: waitlistUser.joinedAt.toISOString(),
        invitedAt: waitlistUser.invitedAt?.toISOString(),
        updatedAt: waitlistUser.updatedAt.toISOString(),
      },
      stats,
      success: true
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching waitlist user:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch waitlist user' 
      },
      { status: 500 }
    );
  }
}


