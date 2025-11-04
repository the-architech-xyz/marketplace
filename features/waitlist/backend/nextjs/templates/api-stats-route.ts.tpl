import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { waitlistUsers, waitlistReferrals } from '@/lib/db/schema/waitlist';
import { count, eq, gt, desc } from 'drizzle-orm';

/**
 * GET /api/waitlist/stats
 * Get overall waitlist statistics
 */
export async function GET(request: NextRequest) {
  try {
    // Total users
    const [totalResult] = await db
      .select({ count: count() })
      .from(waitlistUsers);
    
    // Pending users
    const [pendingResult] = await db
      .select({ count: count() })
      .from(waitlistUsers)
      .where(eq(waitlistUsers.status, 'pending'));
    
    // Invited users
    const [invitedResult] = await db
      .select({ count: count() })
      .from(waitlistUsers)
      .where(eq(waitlistUsers.status, 'joined'));
    
    // Total referrals
    const [referralsResult] = await db
      .select({ count: count() })
      .from(waitlistReferrals);
    
    // Top referrers
    const topReferrers = await db
      .select({
        userId: waitlistUsers.id,
        email: waitlistUsers.email,
        referralCount: waitlistUsers.referralCount,
        bonusAwarded: waitlistUsers.referralBonus,
      })
      .from(waitlistUsers)
      .where(gt(waitlistUsers.referralCount, 0))
      .orderBy(desc(waitlistUsers.referralCount))
      .limit(10);
    
    const totalUsers = totalResult?.count || 0;
    const pendingUsers = pendingResult?.count || 0;
    const invitedUsers = invitedResult?.count || 0;
    const totalReferrals = referralsResult?.count || 0;
    
    // Calculate averages and growth
    const avgReferralsPerUser = totalUsers > 0 ? totalReferrals / totalUsers : 0;
    const growthRate = 0; // TODO: Calculate from historical data
    
    const stats = {
      totalUsers,
      pendingUsers,
      invitedUsers,
      totalReferrals,
      avgReferralsPerUser: Math.round(avgReferralsPerUser * 100) / 100,
      topReferrers: topReferrers.map(user => ({
        userId: user.userId,
        email: user.email,
        referralCount: user.referralCount,
        bonusAwarded: user.bonusAwarded
      })),
      growthRate
    };
    
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}


