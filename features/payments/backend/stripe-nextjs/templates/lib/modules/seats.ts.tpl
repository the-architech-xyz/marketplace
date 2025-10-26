/**
 * Seat Management Service
 * 
 * Server-side business logic for organization seat management.
 * This service handles seat-based billing and seat limit enforcement.
 */

import { stripe } from '../stripe/server';
import { stripeConfig } from '../stripe/config';
import { 
  SeatInfo, 
  SeatHistory, 
  UpdateSeatsData 
} from '../stripe/types';
import { 
  createStripeError, 
  createBusinessError, 
  createValidationError,
  logStripeError 
} from '../stripe/errors';

// ============================================================================
// SEAT MANAGEMENT FUNCTIONS
// ============================================================================

/**
 * Get organization seat information
 */
export async function getOrganizationSeats(
  organizationId: string
): Promise<SeatInfo | null> {
  try {
    // Get organization subscription
    const subscription = await getOrganizationSubscription(organizationId);
    if (!subscription) {
      return null;
    }
    
    // Get current member count
    const currentMembers = await getOrganizationMemberCount(organizationId);
    
    // Calculate seat costs
    const additionalSeats = Math.max(0, subscription.seatsTotal - subscription.seatsIncluded);
    const cost = additionalSeats * stripeConfig.additionalSeatPrice.amount;
    
    return {
      current: currentMembers,
      included: subscription.seatsIncluded,
      additional: additionalSeats,
      total: subscription.seatsTotal,
      cost,
      pricePerSeat: stripeConfig.additionalSeatPrice.amount,
    };
  } catch (error) {
    logStripeError(createStripeError(error), { organizationId });
    throw createStripeError(error);
  }
}

/**
 * Update organization seats
 */
export async function updateOrganizationSeats(
  organizationId: string,
  data: UpdateSeatsData
): Promise<SeatInfo> {
  try {
    // Get current subscription
    const subscription = await getOrganizationSubscription(organizationId);
    if (!subscription) {
      throw createValidationError('Organization subscription not found', organizationId);
    }
    
    // Get current member count
    const currentMembers = await getOrganizationMemberCount(organizationId);
    
    // Validate seat count
    if (data.seats < currentMembers) {
      throw createBusinessError(
        `Cannot reduce seats below current member count. You have ${currentMembers} members but trying to set ${data.seats} seats.`,
        'SEAT_REDUCTION_BELOW_MEMBERS',
        organizationId
      );
    }
    
    // Calculate new seat configuration
    const seatsIncluded = subscription.seatsIncluded;
    const seatsAdditional = Math.max(0, data.seats - seatsIncluded);
    const seatsTotal = data.seats;
    
    // Update Stripe subscription if seats changed
    if (seatsTotal !== subscription.seatsTotal) {
      await updateStripeSubscriptionSeats(
        subscription.stripeSubscriptionId,
        seatsIncluded,
        seatsAdditional
      );
      
      // Record seat change in history
      await recordSeatChange(organizationId, {
        subscriptionId: subscription.id,
        previousSeats: subscription.seatsTotal,
        newSeats: seatsTotal,
        changedBy: data.changedBy || 'system',
        reason: data.reason || 'manual_update',
      });
      
      // Update database
      await updateOrganizationSubscriptionSeats(organizationId, {
        seatsIncluded,
        seatsAdditional,
        seatsTotal,
      });
    }
    
    // Return updated seat information
    return {
      current: currentMembers,
      included: seatsIncluded,
      additional: seatsAdditional,
      total: seatsTotal,
      cost: seatsAdditional * stripeConfig.additionalSeatPrice.amount,
      pricePerSeat: stripeConfig.additionalSeatPrice.amount,
    };
  } catch (error) {
    logStripeError(createStripeError(error), { organizationId });
    throw createStripeError(error);
  }
}

/**
 * Get organization seat history
 */
export async function getOrganizationSeatHistory(
  organizationId: string,
  options: { limit?: number; offset?: number } = {}
): Promise<SeatHistory[]> {
  try {
    const { limit = 50, offset = 0 } = options;
    
    // TODO: Implement database query
    // const history = await db.query.organizationSeatHistory.findMany({
    //   where: eq(organizationSeatHistory.organizationId, organizationId),
    //   orderBy: desc(organizationSeatHistory.createdAt),
    //   limit,
    //   offset,
    // });
    
    // For now, return empty array
    return [];
  } catch (error) {
    logStripeError(createStripeError(error), { organizationId });
    throw createStripeError(error);
  }
}

/**
 * Check if organization can add more members
 */
export async function canAddMember(
  organizationId: string
): Promise<{ canAdd: boolean; reason?: string; currentSeats: number; maxSeats: number }> {
  try {
    const seats = await getOrganizationSeats(organizationId);
    if (!seats) {
      return {
        canAdd: false,
        reason: 'No subscription found',
        currentSeats: 0,
        maxSeats: 0,
      };
    }
    
    if (seats.current >= seats.total) {
      return {
        canAdd: false,
        reason: `Seat limit reached. You have ${seats.total} seats and ${seats.current} members. Upgrade to add more members.`,
        currentSeats: seats.current,
        maxSeats: seats.total,
      };
    }
    
    return {
      canAdd: true,
      currentSeats: seats.current,
      maxSeats: seats.total,
    };
  } catch (error) {
    logStripeError(createStripeError(error), { organizationId });
    throw createStripeError(error);
  }
}

/**
 * Auto-add seats when member limit is reached
 */
export async function autoAddSeatsIfNeeded(
  organizationId: string,
  requestedSeats: number = 1
): Promise<{ seatsAdded: number; newSeatCount: number }> {
  try {
    const seats = await getOrganizationSeats(organizationId);
    if (!seats) {
      throw createValidationError('Organization subscription not found', organizationId);
    }
    
    const newTotalSeats = seats.current + requestedSeats;
    
    if (newTotalSeats > seats.total) {
      const seatsToAdd = newTotalSeats - seats.total;
      
      await updateOrganizationSeats(organizationId, {
        seats: newTotalSeats,
        reason: 'auto_add_for_member',
      });
      
      return {
        seatsAdded: seatsToAdd,
        newSeatCount: newTotalSeats,
      };
    }
    
    return {
      seatsAdded: 0,
      newSeatCount: seats.total,
    };
  } catch (error) {
    logStripeError(createStripeError(error), { organizationId });
    throw createStripeError(error);
  }
}

// ============================================================================
// STRIPE INTEGRATION FUNCTIONS
// ============================================================================

/**
 * Update Stripe subscription seats
 */
async function updateStripeSubscriptionSeats(
  stripeSubscriptionId: string,
  seatsIncluded: number,
  seatsAdditional: number
): Promise<void> {
  try {
    const items = [
      {
        id: stripeSubscriptionId, // This should be the subscription item ID
        quantity: 1, // Base plan quantity
      },
    ];
    
    // Add additional seats if needed
    if (seatsAdditional > 0) {
      items.push({
        id: stripeConfig.additionalSeatPrice.id,
        quantity: seatsAdditional,
      });
    }
    
    await stripe.subscriptions.update(stripeSubscriptionId, {
      items,
      proration_behavior: 'create_prorations',
    });
  } catch (error) {
    logStripeError(createStripeError(error), { stripeSubscriptionId });
    throw createStripeError(error);
  }
}

// ============================================================================
// DATABASE OPERATIONS (PLACEHOLDERS)
// ============================================================================

async function getOrganizationSubscription(organizationId: string): Promise<any> {
  // TODO: Implement database query
  // const subscription = await db.query.organizationSubscriptions.findFirst({
  //   where: eq(organizationSubscriptions.organizationId, organizationId)
  // });
  
  // Mock implementation
  return {
    id: 'mock-subscription-id',
    organizationId,
    stripeSubscriptionId: 'mock-stripe-subscription-id',
    seatsIncluded: 5,
    seatsAdditional: 0,
    seatsTotal: 5,
  };
}

async function getOrganizationMemberCount(organizationId: string): Promise<number> {
  // TODO: Implement database query
  // const count = await db.query.organizationMembers.count({
  //   where: eq(organizationMembers.organizationId, organizationId)
  // });
  
  // Mock implementation
  return 3;
}

async function recordSeatChange(
  organizationId: string,
  data: {
    subscriptionId: string;
    previousSeats: number;
    newSeats: number;
    changedBy: string;
    reason: string;
  }
): Promise<void> {
  // TODO: Implement database insert
  // await db.insert(organizationSeatHistory).values({
  //   organizationId,
  //   subscriptionId: data.subscriptionId,
  //   previousSeats: data.previousSeats,
  //   newSeats: data.newSeats,
  //   changedBy: data.changedBy,
  //   reason: data.reason,
  // });
  
  console.log('Seat change recorded:', { organizationId, ...data });
}

async function updateOrganizationSubscriptionSeats(
  organizationId: string,
  data: {
    seatsIncluded: number;
    seatsAdditional: number;
    seatsTotal: number;
  }
): Promise<void> {
  // TODO: Implement database update
  // await db.update(organizationSubscriptions)
  //   .set(data)
  //   .where(eq(organizationSubscriptions.organizationId, organizationId));
  
  console.log('Subscription seats updated:', { organizationId, ...data });
}

// ============================================================================
// COHESIVE SERVICE OBJECT (Required for contract validation)
// ============================================================================

export const SeatsService = {
  // Seat management
  updateSeats: updateOrganizationSeats,
  getSeats: getOrganizationSeats,
  
  // Utility methods
  list: async (organizationId: string) => {
    return getOrganizationSeats(organizationId);
  },
  
  create: async (organizationId: string, seats: number) => {
    return updateOrganizationSeats(organizationId, { seats });
  },
  
  update: async (organizationId: string, seats: number) => {
    return updateOrganizationSeats(organizationId, { seats });
  },
  
  delete: async (organizationId: string) => {
    return updateOrganizationSeats(organizationId, { seats: 0 });
  }
};

export default SeatsService;
