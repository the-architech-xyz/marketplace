/**
 * Projects Zustand Stores
 * 
 * State management for Projects feature
 */

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { Project, ProjectFilters } from '@/features/projects/contract';

// ============================================================================
// PROJECTS STORE
// ============================================================================

interface ProjectsState {
  // State
  selectedProject: Project | null;
  filters: ProjectFilters;
  
  // Actions
  setSelectedProject: (project: Project | null) => void;
  setFilters: (filters: ProjectFilters) => void;
  clearFilters: () => void;
}

export const useProjectsStore = create<ProjectsState>()(
  immer((set) => ({
    // Initial state
    selectedProject: null,
    filters: {},
    
    // Actions
    setSelectedProject: (project) => {
      set((state) => {
        state.selectedProject = project;
      });
    },
    
    setFilters: (filters) => {
      set((state) => {
        state.filters = { ...state.filters, ...filters };
      });
    },
    
    clearFilters: () => {
      set((state) => {
        state.filters = {};
      });
    },
  }))
);

