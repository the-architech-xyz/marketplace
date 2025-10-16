/**
 * Architecture Graph Visualizer (Core)
 * 
 * Core architecture visualization tool for displaying application manifest as interactive graphs
 */

export interface FeaturesGraphVisualizerShadcnParams {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Enable graph navigation controls (zoom, pan, fit) */
    controls?: boolean;

    /** Enable minimap for large graph navigation */
    minimap?: boolean;

    /** Enable automatic layout algorithm (Dagre) */
    layout_algorithm?: boolean;
  };
}

export interface FeaturesGraphVisualizerShadcnFeatures {

  /** Enable graph navigation controls (zoom, pan, fit) */
  controls: boolean;

  /** Enable minimap for large graph navigation */
  minimap: boolean;

  /** Enable automatic layout algorithm (Dagre) */
  layout_algorithm: boolean;
}

// 🚀 Auto-discovered artifacts with ownership info
export declare const FeaturesGraphVisualizerShadcnArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type FeaturesGraphVisualizerShadcnCreates = typeof FeaturesGraphVisualizerShadcnArtifacts.creates[number];
export type FeaturesGraphVisualizerShadcnEnhances = typeof FeaturesGraphVisualizerShadcnArtifacts.enhances[number];
