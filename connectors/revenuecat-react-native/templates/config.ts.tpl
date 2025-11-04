/**
 * RevenueCat Configuration for React Native
 * 
 * Initialize RevenueCat SDK for cross-platform subscription management.
 * This connects to your standardized backend for data sync.
 */

import Purchases from 'react-native-purchases';

const REVENUECAT_API_KEY = process.env.REVENUECAT_API_KEY || '<%= module.parameters.apiKey %>';

/**
 * Initialize RevenueCat SDK
 * 
 * Call this in your app initialization (e.g., App.tsx or _layout.tsx)
 */
export async function initializeRevenueCat(userId?: string) {
  try {
    // Configure SDK
    await Purchases.configure({
      apiKey: REVENUECAT_API_KEY,
      <% if (module.parameters.userId) { %>
      appUserID: '<%= module.parameters.userId %>',
      <% } else if (userId) { %>
      appUserID: userId, // From your auth system
      <% } %>
    });

    console.log('RevenueCat SDK initialized successfully');
    return true;
  } catch (error) {
    console.error('Failed to initialize RevenueCat:', error);
    return false;
  }
}

/**
 * Set app user ID for authenticated users
 * 
 * Call this after user logs in
 */
export async function setRevenueCatUserId(userId: string) {
  try {
    await Purchases.logIn(userId);
    console.log(`RevenueCat user ID set: ${userId}`);
    return true;
  } catch (error) {
    console.error('Failed to set RevenueCat user ID:', error);
    return false;
  }
}

/**
 * Log out user
 * 
 * Call this when user logs out
 */
export async function logOutRevenueCatUser() {
  try {
    const result = await Purchases.logOut();
    console.log('RevenueCat user logged out');
    return result;
  } catch (error) {
    console.error('Failed to log out RevenueCat user:', error);
    return null;
  }
}

/**
 * Get RevenueCat instance for direct SDK calls
 */
export function getRevenueCatInstance() {
  return Purchases;
}

