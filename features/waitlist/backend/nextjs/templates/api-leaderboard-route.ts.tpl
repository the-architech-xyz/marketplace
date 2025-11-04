import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { waitlistUsers } from '@/lib/db/schema/waitlist';
import { desc, gt } from 'drizzle-orm';

/**
 * GET /api/waitlist/leaderboard
 * Get top referrers ranked by referral count
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    
    // Get top referrers
    const topReferrers = await db
      .select()
      .from(waitlistUsers)
      .where(gt(waitlistUsers.referralCount, 0))
      .orderBy(desc(waitlistUsers.referralCount))
      .limit(limit);
    
    // Format response
    const leaderboard = topReferrers.map((user, index) => ({
      rank: index + 1,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        referralCount: user.referralCount,
        referralBonus: user.referralBonus,
        position: user.position,
        joinedAt: user.joinedAt.toISOString(),
      }
    }));
    
    return NextResponse.json(leaderboard);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leaderboard' },
      { status: 500 }
    );
  }
}


