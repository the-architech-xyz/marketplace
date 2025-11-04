import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { waitlistUsers } from '@/lib/db/schema/waitlist';
import { eq } from 'drizzle-orm';

/**
 * GET /api/waitlist/referral-link/[userId]
 * Get user's referral link
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
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    const waitlistUser = user[0];
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const referralLink = `${baseUrl}/waitlist?ref=${waitlistUser.referralCode}`;
    
    return NextResponse.json({
      link: referralLink,
      code: waitlistUser.referralCode
    });
  } catch (error) {
    console.error('Error fetching referral link:', error);
    return NextResponse.json(
      { error: 'Failed to fetch referral link' },
      { status: 500 }
    );
  }
}


