/**
 * Seat History API Route
 * 
 * Handles fetching seat usage history for organizations
 */

import { NextRequest, NextResponse } from 'next/server';
import { getOrganizationSeatHistory } from '@/lib/services/seats';

export async function GET(
  request: NextRequest,
  { params }: { params: { orgId: string } }
) {
  try {
    const history = await getOrganizationSeatHistory(params.orgId);
    
    return NextResponse.json(history);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch seat history' },
      { status: 500 }
    );
  }
}
