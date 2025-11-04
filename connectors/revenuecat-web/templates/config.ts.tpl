/**
 * RevenueCat Configuration for Web
 * 
 * Initialize RevenueCat SDK for web browser subscriptions.
 */

import Purchases from '@revenuecat/purchases-js';

const REVENUECAT_API_KEY = process.env.NEXT_PUBLIC_REVENUECAT_API_KEY || '<%= module.parameters.apiKey %>';

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
      logLevel: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
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

