/**
 * Graph Visualizer Capability
 * 
 * Interactive graph visualizer for displaying project architecture and dependencies
 */

export interface FeaturesGraphVisualizerShadcnParams {

  /** Backend implementation for graph data management */
  backend?: any;

  /** Frontend implementation for graph visualization */
  frontend?: any;
  /** Constitutional Architecture features configuration */
  features?: {

    /** Enable interactive graph functionality */
    interactiveGraph?: boolean;

    /** Enable different node types */
    nodeTypes?: boolean;

    /** Enable minimap navigation */
    minimap?: boolean;

    /** Enable graph export functionality */
    export?: boolean;

    /** Enable different edge types */
    edgeTypes?: boolean;

    /** Enable graph controls */
    controls?: boolean;

    /** Enable background grid */
    background?: boolean;

    /** Enable node/edge selection */
    selection?: boolean;

    /** Enable node dragging */
    dragging?: boolean;

    /** Enable zoom functionality */
    zooming?: boolean;

    /** Enable pan functionality */
    panning?: boolean;

    /** Enable graph import functionality */
    import?: boolean;
  };
}

export interface FeaturesGraphVisualizerShadcnFeatures {

  /** Enable interactive graph functionality */
  interactiveGraph: boolean;

  /** Enable different node types */
  nodeTypes: boolean;

  /** Enable minimap navigation */
  minimap: boolean;

  /** Enable graph export functionality */
  export: boolean;

  /** Enable different edge types */
  edgeTypes: boolean;

  /** Enable graph controls */
  controls: boolean;

  /** Enable background grid */
  background: boolean;

  /** Enable node/edge selection */
  selection: boolean;

  /** Enable node dragging */
  dragging: boolean;

  /** Enable zoom functionality */
  zooming: boolean;

  /** Enable pan functionality */
  panning: boolean;

  /** Enable graph import functionality */
  import: boolean;
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
