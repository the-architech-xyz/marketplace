/**
 * RevenueCat Client Configuration
 */

import Purchases from 'react-native-purchases';

export const revenueCatClient = {
  configure: (apiKey: string) => {
    Purchases.configure({
      apiKey,
      appUserID: undefined, // Let RevenueCat generate anonymous user ID
    });
  },
  
  setUserId: (userId: string) => {
    Purchases.logIn(userId);
  },
  
  getOfferings: async () => {
    return Purchases.getOfferings();
  },
  
  getPackages: async () => {
    const offerings = await Purchases.getOfferings();
    return offerings.current?.availablePackages || [];
  }
};