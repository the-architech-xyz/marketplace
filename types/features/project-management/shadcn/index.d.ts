/**
 * Project Management System
 * 
 * Complete project management system with kanban boards, task management, and team collaboration
 */

export interface FeaturesProjectManagementShadcnParams {

  /** UI theme variant */
  theme?: any;
  /** Constitutional Architecture features configuration */
  features?: {

    /** Enable kanban board functionality */
    kanban?: boolean;

    /** Enable timeline view */
    timeline?: boolean;

    /** Enable sprint management */
    sprint?: boolean;

    /** Enable kanban board functionality */
    kanbanBoard?: boolean;

    /** Enable task creation */
    taskCreation?: boolean;

    /** Enable task management */
    taskManagement?: boolean;

    /** Enable project organization */
    projectOrganization?: boolean;

    /** Enable team collaboration */
    teamCollaboration?: boolean;

    /** Enable basic analytics */
    basicAnalytics?: boolean;
  };
}

export interface FeaturesProjectManagementShadcnFeatures {

  /** Enable kanban board functionality */
  kanban: boolean;

  /** Enable timeline view */
  timeline: boolean;

  /** Enable sprint management */
  sprint: boolean;

  /** Enable kanban board functionality */
  kanbanBoard: boolean;

  /** Enable task creation */
  taskCreation: boolean;

  /** Enable task management */
  taskManagement: boolean;

  /** Enable project organization */
  projectOrganization: boolean;

  /** Enable team collaboration */
  teamCollaboration: boolean;

  /** Enable basic analytics */
  basicAnalytics: boolean;
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
