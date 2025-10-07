/**
 * Teams Management System Blueprint (Orchestrator)
 * 
 * This is the main orchestrator blueprint that coordinates the teams management system.
 * It includes both backend and frontend components to provide complete functionality.
 * 
 * This blueprint should be used when you want the complete teams management system.
 * For specific parts, use the individual backend or frontend blueprints.
 */

import { Blueprint, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';

export const teamsManagementBlueprint: Blueprint = {
  id: "teams-management-orchestrator",
  name: "Teams Management System (Complete)",
  description: "Complete team management system with backend and frontend components",
  actions: [
    // This orchestrator blueprint doesn't create files directly
    // Instead, it should be used to coordinate the installation of:
    // - teams-management/backend/better-auth-nextjs
    // - teams-management/frontend/shadcn
    
    // The actual implementation is handled by the individual blueprints
    // This serves as a high-level orchestrator for the complete system
  ]
};

export default teamsManagementBlueprint;