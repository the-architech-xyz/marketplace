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

  /** Feature flags */
  features: Record<string, any>;

  /** Default viewport settings */
  defaultViewport: Record<string, any>;
}

export interface UiReactFlowFeatures {}

// 🚀 Auto-discovered artifacts
export declare const UiReactFlowArtifacts: {
  creates: [
    'src/components/ReactFlow/FlowCanvas.tsx',
    'src/components/ReactFlow/nodes/CustomNode.tsx',
    'src/components/ReactFlow/edges/CustomEdge.tsx',
    'src/hooks/useReactFlow.ts',
    'src/contexts/ReactFlowContext.tsx',
    'src/types/reactflow.ts',
    'src/utils/reactflow.ts',
    'src/styles/reactflow.css'
  ],
  enhances: [],
  installs: [
    { packages: ['reactflow', 'react', 'react-dom'], isDev: false },
    { packages: ['@types/react', '@types/react-dom'], isDev: true }
  ],
  envVars: []
};

// Type-safe artifact access
export type UiReactFlowCreates = typeof UiReactFlowArtifacts.creates[number];
export type UiReactFlowEnhances = typeof UiReactFlowArtifacts.enhances[number];
