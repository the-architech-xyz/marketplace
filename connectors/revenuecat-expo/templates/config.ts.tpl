/**
 * RevenueCat Configuration for Expo
 * 
 * Initialize RevenueCat SDK for Expo applications.
 */

import Purchases from '@revenuecat/purchases-expo';

const REVENUECAT_API_KEY = process.env.EXPO_PUBLIC_REVENUECAT_API_KEY || '<%= module.parameters.apiKey %>';

/**
 * Initialize RevenueCat SDK
 */
export async function initializeRevenueCat(userId?: string) {
  try {
    await Purchases.configure({
      apiKey: REVENUECAT_API_KEY,
      <% if (userId) { %>
      appUserID: userId,
      <% } %>
    });

    console.log('RevenueCat SDK initialized');
    return true;
  } catch (error) {
    console.error('Failed to initialize RevenueCat:', error);
    return false;
  }
}

export function getRevenueCatInstance() {
  return Purchases;
}

