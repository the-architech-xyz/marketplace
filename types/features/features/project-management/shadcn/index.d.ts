/**
 * Project Management System
 * 
 * Complete project management system with kanban boards, task management, and team collaboration
 */

export interface FeaturesProjectManagementShadcnParams {

  /** UI theme variant */
  theme?: 'default' | 'dark' | 'light';
  /** Constitutional Architecture features configuration */
  features?: {

    type: boolean;

    default: boolean;

    description: boolean;

    required: boolean;
  };
}

export interface FeaturesProjectManagementShadcnFeatures {

  type: boolean;

  default: boolean;

  description: boolean;

  required: boolean;
}

// 🚀 Auto-discovered artifacts with ownership info
export declare const FeaturesProjectManagementShadcnArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type FeaturesProjectManagementShadcnCreates = typeof FeaturesProjectManagementShadcnArtifacts.creates[number];
export type FeaturesProjectManagementShadcnEnhances = typeof FeaturesProjectManagementShadcnArtifacts.enhances[number];
