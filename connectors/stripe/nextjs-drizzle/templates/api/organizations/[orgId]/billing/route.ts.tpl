/**
 * Organization Billing API Route
 * 
 * Handles organization billing information and subscription management
 */

import { NextRequest, NextResponse } from 'next/server';
import { getOrgBillingService } from '@/lib/services/org-billing';

export async function GET(
  request: NextRequest,
  { params }: { params: { orgId: string } }
) {
  try {
    const billingService = getOrgBillingService();
    const billing = await billingService.getBilling(params.orgId);
    
    return NextResponse.json(billing);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch billing' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { orgId: string } }
) {
  try {
    const data = await request.json();
    const billingService = getOrgBillingService();
    const billing = await billingService.updateBilling(params.orgId, data);
    
    return NextResponse.json(billing);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update billing' },
      { status: 500 }
    );
  }
}
