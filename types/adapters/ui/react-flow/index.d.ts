/**
 * React Flow
 * 
 * Pure React Flow library for building interactive node-based editors and diagrams
 */

export interface UiReactFlowParams {

  /** React Flow components to include */
  components: string[];

  /** Available themes */
  themes: string[];
  /** Constitutional Architecture features configuration */
  features?: {

    type: boolean;

    description: boolean;

    properties: boolean;
  };

  /** Default viewport settings */
  defaultViewport: Record<string, any>;
}

export interface UiReactFlowFeatures {

  type: boolean;

  description: boolean;

  properties: boolean;
}

// 🚀 Auto-discovered artifacts
export declare const UiReactFlowArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type UiReactFlowCreates = typeof UiReactFlowArtifacts.creates[number];
export type UiReactFlowEnhances = typeof UiReactFlowArtifacts.enhances[number];
