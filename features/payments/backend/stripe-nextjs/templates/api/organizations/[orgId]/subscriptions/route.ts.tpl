/**
 * Organization Subscriptions API Route
 * 
 * Handles organization subscription management operations.
 * This route provides CRUD operations for organization subscriptions.
 */

import { NextRequest, NextResponse } from 'next/server';
import { 
  createOrganizationSubscription,
  getOrganizationSubscription,
  updateOrganizationSubscription,
  cancelOrganizationSubscription
} from '@/lib/services/org-billing';
import { requireBillingPermission } from '@/lib/services/permissions';
import { getErrorResponse } from '@/lib/stripe/errors';
import { auth } from '@/lib/auth'; // Assuming auth is available

// ============================================================================
// GET /api/organizations/[orgId]/subscriptions
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
    await requireBillingPermission(params.orgId, session.user.id, 'view_subscription');

    // 3. Get organization subscription
    const subscription = await getOrganizationSubscription(params.orgId);

    if (!subscription) {
      return NextResponse.json(
        { error: { code: 'SUBSCRIPTION_NOT_FOUND', message: 'No subscription found for this organization' } },
        { status: 404 }
      );
    }

    return NextResponse.json(subscription);
  } catch (error) {
    console.error('Error fetching organization subscription:', error);
    
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
// POST /api/organizations/[orgId]/subscriptions
// ============================================================================

export async function POST(
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
    await requireBillingPermission(params.orgId, session.user.id, 'create_subscription');

    // 3. Parse request body
    const body = await request.json();
    const { planId, paymentMethodId, seats, trialDays, metadata } = body;

    // 4. Validate required fields
    if (!planId) {
      return NextResponse.json(
        { error: { code: 'VALIDATION_ERROR', message: 'planId is required' } },
        { status: 400 }
      );
    }

    if (!paymentMethodId) {
      return NextResponse.json(
        { error: { code: 'VALIDATION_ERROR', message: 'paymentMethodId is required' } },
        { status: 400 }
      );
    }

    // 5. Create organization subscription
    const subscription = await createOrganizationSubscription({
      organizationId: params.orgId,
      planId,
      paymentMethodId,
      seats,
      trialDays,
      metadata,
    });

    return NextResponse.json(subscription, { status: 201 });
  } catch (error) {
    console.error('Error creating organization subscription:', error);
    
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
    
    return NextResponse.json(
      getErrorResponse(error),
      { status: 500 }
    );
  }
}

// ============================================================================
// PUT /api/organizations/[orgId]/subscriptions
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
    await requireBillingPermission(params.orgId, session.user.id, 'update_subscription');

    // 3. Parse request body
    const body = await request.json();
    const { planId, cancelAtPeriodEnd, metadata } = body;

    // 4. Update organization subscription
    const subscription = await updateOrganizationSubscription(params.orgId, {
      planId,
      cancelAtPeriodEnd,
      metadata,
    });

    return NextResponse.json(subscription);
  } catch (error) {
    console.error('Error updating organization subscription:', error);
    
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
    
    return NextResponse.json(
      getErrorResponse(error),
      { status: 500 }
    );
  }
}

// ============================================================================
// DELETE /api/organizations/[orgId]/subscriptions
// ============================================================================

export async function DELETE(
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
    await requireBillingPermission(params.orgId, session.user.id, 'cancel_subscription');

    // 3. Parse query parameters
    const { searchParams } = new URL(request.url);
    const cancelAtPeriodEnd = searchParams.get('cancelAtPeriodEnd') !== 'false';

    // 4. Cancel organization subscription
    const subscription = await cancelOrganizationSubscription(params.orgId, cancelAtPeriodEnd);

    return NextResponse.json(subscription);
  } catch (error) {
    console.error('Error canceling organization subscription:', error);
    
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
    
    return NextResponse.json(
      getErrorResponse(error),
      { status: 500 }
    );
  }
}
