import { create } from 'zustand';

// Next.js SSR utilities for Zustand
export async function initializeStores() {
  // Initialize stores on the server side
  console.log('Initializing Zustand stores for SSR');
}

export function getServerState() {
  // Get server-side state for hydration
  return {};
}
