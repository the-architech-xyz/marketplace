/**
 * Organization Billing Portal API Route
 * 
 * Creates a Stripe Billing Portal session for self-service subscription management.
 * Users can update payment methods, view invoices, and manage their subscription.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createOrganizationBillingPortalSession } from '@/lib/services/org-billing';
import { getSession } from '@/lib/auth';

export async function POST(
  request: NextRequest,
  { params }: { params: { orgId: string } }
) {
  try {
    // Get current user
    const session = await getSession();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Create billing portal session
    const portalUrl = await createOrganizationBillingPortalSession(
      params.orgId,
      session.user.id
    );
    
    return NextResponse.json({ url: portalUrl });
  } catch (error) {
    console.error('[Billing Portal] Error creating session:', error);
    
    return NextResponse.json(
      { 
        error: error instanceof Error 
          ? error.message 
          : 'Failed to create billing portal session' 
      },
      { status: 500 }
    );
  }
}

