/**
 * Projects Feature Contract - Cohesive Business Hook Services
 * 
 * This is the single source of truth for the Projects feature.
 * All backend implementations must implement the IProjectsService interface.
 * All frontend implementations must consume the IProjectsService interface.
 * 
 * The contract defines cohesive business services, not individual hooks.
 */

// Note: TanStack Query types are imported by the implementing service, not the contract

// ============================================================================
// CORE TYPES
// ============================================================================

export type ProjectStatus = 
  | 'draft'          // Project created but not yet generated
  | 'generating'     // Generation in progress
  | 'ready'          // Generation completed successfully
  | 'error';         // Generation failed

export type ProjectVisibility = 
  | 'private'        // Only owner can see
  | 'team'           // Visible to team members
  | 'organization';  // Visible to organization members

// ============================================================================
// DATA TYPES
// ============================================================================

export interface Project {
  id: string;
  name: string;
  description?: string;
  userId: string;
  organizationId?: string;
  teamId?: string;
  genomeJson: string;              // JSON string of the genome
  status: ProjectStatus;
  version: string;
  visibility: ProjectVisibility;
  metadata?: {
    framework?: string;
    structure?: string;
    modules?: string[];
    generatedAt?: string;
    generatedUrl?: string;
    errorMessage?: string;
    [key: string]: any;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ProjectGeneration {
  id: string;
  projectId: string;
  status: ProjectStatus;
  jobId?: string;                  // BullMQ job ID
  startedAt?: string;
  completedAt?: string;
  errorMessage?: string;
  progress?: number;                // 0-100
  metadata?: Record<string, any>;
}

// ============================================================================
// INPUT TYPES
// ============================================================================

export interface CreateProjectData {
  name: string;
  description?: string;
  genomeJson: string;
  organizationId?: string;
  teamId?: string;
  visibility?: ProjectVisibility;
  metadata?: Record<string, any>;
}

export interface UpdateProjectData {
  name?: string;
  description?: string;
  genomeJson?: string;
  visibility?: ProjectVisibility;
  metadata?: Record<string, any>;
}

export interface GenerateProjectData {
  projectId: string;
  regenerate?: boolean;             // If true, regenerate existing project
}

// ============================================================================
// RESULT TYPES
// ============================================================================

export interface ProjectResult {
  project: Project;
  success: boolean;
  message?: string;
}

export interface GenerateProjectResult {
  project: Project;
  generation: ProjectGeneration;
  success: boolean;
  message?: string;
  jobId?: string;
}

// ============================================================================
// FILTER TYPES
// ============================================================================

export interface ProjectFilters {
  status?: ProjectStatus[];
  organizationId?: string;
  teamId?: string;
  visibility?: ProjectVisibility[];
  search?: string;
  createdAfter?: string;
  createdBefore?: string;
}

// ============================================================================
// ERROR TYPES
// ============================================================================

export interface ProjectsError {
  code: string;
  message: string;
  type: 'validation_error' | 'permission_error' | 'not_found_error' | 'generation_error';
  field?: string;
  details?: Record<string, any>;
}

// ============================================================================
// CONFIGURATION TYPES
// ============================================================================

export interface ProjectsConfig {
  features: {
    generation: boolean;
    sharing: boolean;
    versioning: boolean;
    analytics: boolean;
  };
  limits: {
    maxProjectsPerUser: number;
    maxProjectsPerOrganization: number;
    maxGenomeSize: number;         // in bytes
  };
  generation: {
    timeout: number;                // in seconds
    maxRetries: number;
    webhookUrl?: string;
  };
}

// ============================================================================
// COHESIVE BUSINESS HOOK SERVICES
// ============================================================================

/**
 * Projects Service Contract - Cohesive Business Hook Services
 * 
 * This interface defines cohesive business services that group related functionality.
 * Each service method returns an object containing all related queries and mutations.
 * 
 * Backend implementations must provide this service.
 * Frontend implementations must consume this service.
 */
export interface IProjectsService {
  /**
   * Project Management Service
   * Provides all project-related operations in a cohesive interface
   */
  useProjects: () => {
    // Query operations
    list: (filters?: ProjectFilters) => any; // UseQueryResult<Project[], Error>
    get: (id: string) => any; // UseQueryResult<Project, Error>
    getByOrganization: (organizationId: string) => any; // UseQueryResult<Project[], Error>
    getByTeam: (teamId: string) => any; // UseQueryResult<Project[], Error>
    
    // Mutation operations
    create: any; // UseMutationResult<ProjectResult, Error, CreateProjectData>
    update: any; // UseMutationResult<ProjectResult, Error, { id: string; data: UpdateProjectData }>
    delete: any; // UseMutationResult<void, Error, string>
    duplicate: any; // UseMutationResult<ProjectResult, Error, string>
  };

  /**
   * Project Generation Service
   * Provides project generation operations
   */
  useGeneration: () => {
    // Query operations
    getStatus: (projectId: string) => any; // UseQueryResult<ProjectGeneration, Error>
    getProgress: (projectId: string) => any; // UseQueryResult<number, Error>
    
    // Mutation operations
    generate: any; // UseMutationResult<GenerateProjectResult, Error, GenerateProjectData>
    cancel: any; // UseMutationResult<void, Error, string>
  };

  /**
   * Project Sharing Service
   * Provides project sharing and visibility operations
   */
  useSharing: () => {
    // Query operations
    getSharedWith: (projectId: string) => any; // UseQueryResult<{ users: string[]; teams: string[]; organizations: string[] }, Error>
    
    // Mutation operations
    share: any; // UseMutationResult<void, Error, { projectId: string; userIds?: string[]; teamIds?: string[] }>
    unshare: any; // UseMutationResult<void, Error, { projectId: string; userIds?: string[]; teamIds?: string[] }>
    updateVisibility: any; // UseMutationResult<ProjectResult, Error, { projectId: string; visibility: ProjectVisibility }>
  };
}

