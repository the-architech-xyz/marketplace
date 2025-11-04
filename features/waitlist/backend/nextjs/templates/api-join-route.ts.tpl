import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { waitlistUsers, waitlistReferrals } from '@/lib/db/schema/waitlist';
import { JoinWaitlistDataSchema } from '@/lib/waitlist';
import { eq, count } from 'drizzle-orm';
import { createId } from '@paralleldrive/cuid2';
import { resend } from '@/lib/resend';

/**
 * Generate unique referral code for user
 */
function generateReferralCode(email: string): string {
  // Simple hash-based code (6-8 characters)
  const hash = email.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const code = `REF${(hash % 999999).toString().padStart(6, '0')}`;
  return code;
}

/**
 * Calculate position in waitlist
 */
async function calculatePosition(): Promise<number> {
  const [result] = await db
    .select({ count: count() })
    .from(waitlistUsers);
  
  return (result?.count || 0) + 1;
}

/**
 * POST /api/waitlist/join
 * Join the waitlist with optional referral tracking
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input using shared schema from tech-stack
    const validatedData = JoinWaitlistDataSchema.parse(body);
    
    // Check if email already exists
    const existingUser = await db
      .select()
      .from(waitlistUsers)
      .where(eq(waitlistUsers.email, validatedData.email))
      .limit(1);
    
    if (existingUser.length > 0) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Already on waitlist',
          user: existingUser[0]
        },
        { status: 409 }
      );
    }
    
    // Generate referral code
    const referralCode = generateReferralCode(validatedData.email);
    
    // Calculate position
    const position = await calculatePosition();
    
    // Determine source
    const source = validatedData.referredByCode ? 'referral' : 'direct';
    
    // Calculate referral bonus for referrer (if applicable)
    let referralBonus = 0;
    let referrerId: string | undefined;
    
    if (validatedData.referredByCode && features.viralReferral) {
      // Find the referrer
      const [referrer] = await db
        .select()
        .from(waitlistUsers)
        .where(eq(waitlistUsers.referralCode, validatedData.referredByCode))
        .limit(1);
      
      if (referrer) {
        referrerId = referrer.id;
        referralBonus = <%= module.parameters.referralBonus || 3 %>; // Configurable bonus per referral
      }
    }
    
    // Create waitlist user
    const [newUser] = await db.insert(waitlistUsers).values({
      email: validatedData.email,
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      status: 'pending',
      position: position,
      referralCode: referralCode,
      referredByCode: validatedData.referredByCode,
      referralCount: 0,
      referralBonus: 0,
      source: source,
      metadata: validatedData.metadata,
    }).returning();
    
    // Create referral record if applicable
    if (referrerId) {
      await db.insert(waitlistReferrals).values({
        referrerId: referrerId,
        refereeId: newUser.id,
        referrerCode: validatedData.referredByCode,
        status: 'completed',
        bonusAwarded: referralBonus,
      });
    }
    
    // Send welcome email with referral code
    if (features.welcomeEmail && resend) {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
      const referralLink = `${baseUrl}/waitlist?ref=${referralCode}`;
      
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'noreply@example.com',
        to: validatedData.email,
        subject: 'Welcome to the Waitlist! 🎉',
        html: `
          <h1>Welcome to the Waitlist!</h1>
          <p>Thank you for joining! Your position is <strong>${position}</strong>.</p>
          <p>Share your referral link with friends to move up in the queue:</p>
          <p><a href="${referralLink}">${referralLink}</a></p>
          <p>For every friend who joins, you move up 3 spots!</p>
        `
      });
    }
    
    // Return created user
    const response = {
      user: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        status: newUser.status,
        position: newUser.position,
        referralCode: newUser.referralCode,
        referralCount: newUser.referralCount,
        referralBonus: newUser.referralBonus,
        source: newUser.source,
        joinedAt: newUser.joinedAt.toISOString(),
      },
      success: true,
      message: 'Successfully joined waitlist'
    };
    
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { 
          success: false,
          error: 'Validation failed', 
          details: error.message 
        },
        { status: 400 }
      );
    }
    
    console.error('Error joining waitlist:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to join waitlist' 
      },
      { status: 500 }
    );
  }
}


