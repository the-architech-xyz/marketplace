/**
 * Organization Seats API Route
 * 
 * Handles organization seat management operations.
 * This route provides seat management for organization billing.
 */

import { NextRequest, NextResponse } from 'next/server';
import { 
  getOrganizationSeats,
  updateOrganizationSeats,
  getOrganizationSeatHistory
} from '@/lib/services/seats';
import { requireBillingPermission } from '@/lib/services/permissions';
import { getErrorResponse } from '@/lib/stripe/errors';
import { auth } from '@/lib/auth'; // Assuming auth is available

// ============================================================================
// GET /api/organizations/[orgId]/seats
// ============================================================================

export async function GET(
  request: NextRequest,
  { params }: { params: { orgId: string } }
) {
  try {
    // 1. Authenticate user
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Authentication required' } },
        { status: 401 }
      );
    }

    // 2. Check permission
    await requireBillingPermission(params.orgId, session.user.id, 'manage_seats');

    // 3. Get organization seats
    const seats = await getOrganizationSeats(params.orgId);

    if (!seats) {
      return NextResponse.json(
        { error: { code: 'SEATS_NOT_FOUND', message: 'No seat information found for this organization' } },
        { status: 404 }
      );
    }

    return NextResponse.json(seats);
  } catch (error) {
    console.error('Error fetching organization seats:', error);
    
    if (error.code === 'BILLING_PERMISSION_DENIED') {
      return NextResponse.json(
        getErrorResponse(error),
        { status: 403 }
      );
    }
    
    return NextResponse.json(
      getErrorResponse(error),
      { status: 500 }
    );
  }
}

// ============================================================================
// PUT /api/organizations/[orgId]/seats
// ============================================================================

export async function PUT(
  request: NextRequest,
  { params }: { params: { orgId: string } }
) {
  try {
    // 1. Authenticate user
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Authentication required' } },
        { status: 401 }
      );
    }

    // 2. Check permission
    await requireBillingPermission(params.orgId, session.user.id, 'manage_seats');

    // 3. Parse request body
    const body = await request.json();
    const { seats, reason } = body;

    // 4. Validate required fields
    if (typeof seats !== 'number' || seats < 1) {
      return NextResponse.json(
        { error: { code: 'VALIDATION_ERROR', message: 'seats must be a positive number' } },
        { status: 400 }
      );
    }

    // 5. Update organization seats
    const updatedSeats = await updateOrganizationSeats(params.orgId, {
      seats,
      reason: reason || 'manual_update',
      changedBy: session.user.id,
    });

    return NextResponse.json(updatedSeats);
  } catch (error) {
    console.error('Error updating organization seats:', error);
    
    if (error.code === 'BILLING_PERMISSION_DENIED') {
      return NextResponse.json(
        getErrorResponse(error),
        { status: 403 }
      );
    }
    
    if (error.code === 'BILLING_VALIDATION_ERROR') {
      return NextResponse.json(
        getErrorResponse(error),
        { status: 400 }
      );
    }
    
    if (error.code === 'BILLING_BUSINESS_ERROR') {
      return NextResponse.json(
        getErrorResponse(error),
        { status: 422 }
      );
    }
    
    return NextResponse.json(
      getErrorResponse(error),
      { status: 500 }
    );
  }
}

// ============================================================================
// GET /api/organizations/[orgId]/seats/history
// ============================================================================

export async function GET_HISTORY(
  request: NextRequest,
  { params }: { params: { orgId: string } }
) {
  try {
    // 1. Authenticate user
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Authentication required' } },
        { status: 401 }
      );
    }

    // 2. Check permission
    await requireBillingPermission(params.orgId, session.user.id, 'manage_seats');

    // 3. Parse query parameters
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // 4. Get organization seat history
    const history = await getOrganizationSeatHistory(params.orgId, {
      limit,
      offset,
    });

    return NextResponse.json(history);
  } catch (error) {
    console.error('Error fetching organization seat history:', error);
    
    if (error.code === 'BILLING_PERMISSION_DENIED') {
      return NextResponse.json(
        getErrorResponse(error),
        { status: 403 }
      );
    }
    
    return NextResponse.json(
      getErrorResponse(error),
      { status: 500 }
    );
  }
}
