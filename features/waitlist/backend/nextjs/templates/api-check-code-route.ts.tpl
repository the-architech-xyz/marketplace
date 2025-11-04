import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { waitlistUsers } from '@/lib/db/schema/waitlist';
import { eq } from 'drizzle-orm';

/**
 * GET /api/waitlist/check-code/[code]
 * Check if a referral code is valid and return referrer info
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const user = await db
      .select()
      .from(waitlistUsers)
      .where(eq(waitlistUsers.referralCode, params.code))
      .limit(1);
    
    if (!user || user.length === 0) {
      return NextResponse.json({
        valid: false
      });
    }
    
    const waitlistUser = user[0];
    
    return NextResponse.json({
      valid: true,
      referrer: {
        email: waitlistUser.email,
        firstName: waitlistUser.firstName,
        lastName: waitlistUser.lastName,
        referralCount: waitlistUser.referralCount
      }
    });
  } catch (error) {
    console.error('Error checking referral code:', error);
    return NextResponse.json(
      { error: 'Failed to check referral code' },
      { status: 500 }
    );
  }
}


