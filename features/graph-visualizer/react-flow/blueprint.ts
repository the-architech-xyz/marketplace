import { Blueprint, BlueprintActionType } from '@thearchitech.xyz/types';

const graphVisualizerBlueprint: Blueprint = {
  id: 'graph-visualizer-react-flow',
  name: 'Graph Visualizer (React Flow)',
  description: 'Interactive graph visualizer using React Flow for displaying project architecture and dependencies',
  version: '1.0.0',
  actions: [
    // Install React Flow and dependencies
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: [
        'reactflow',
        '@xyflow/react',
        'zustand',
        'd3-hierarchy',
        'd3-scale',
        'd3-selection',
        'd3-zoom'
      ],
      dev: false
    },

    // Create graph types
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/graph/types.ts',
      template: 'templates/graph-types.ts.tpl'
    },

    // Create graph hooks
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/graph/hooks.ts',
      template: 'templates/graph-hooks.ts.tpl'
    },

    // Create graph store
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/graph/store.ts',
      template: 'templates/graph-store.ts.tpl'
    },

    // Create layout algorithms
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/graph/layouts.ts',
      template: 'templates/graph-layouts.ts.tpl'
    },

    // Create node types
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/graph/node-types.ts',
      template: 'templates/node-types.ts.tpl'
    },

    // Create edge types
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/graph/edge-types.ts',
      template: 'templates/edge-types.ts.tpl'
    },

    // Create graph utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/graph/utils.ts',
      template: 'templates/graph-utils.ts.tpl'
    },

    // Create API routes
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/api/graph/data/route.ts',
      template: 'templates/api-graph-data.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/api/graph/nodes/route.ts',
      template: 'templates/api-graph-nodes.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/api/graph/edges/route.ts',
      template: 'templates/api-graph-edges.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/api/graph/layout/route.ts',
      template: 'templates/api-graph-layout.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/api/graph/export/route.ts',
      template: 'templates/api-graph-export.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/api/graph/import/route.ts',
      template: 'templates/api-graph-import.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/api/graph/save/route.ts',
      template: 'templates/api-graph-save.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/api/graph/load/route.ts',
      template: 'templates/api-graph-load.ts.tpl'
    },

    // Create React Flow components
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/graph/GraphVisualizer.tsx',
      template: 'templates/GraphVisualizer.tsx.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/graph/GraphControls.tsx',
      template: 'templates/GraphControls.tsx.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/graph/GraphMinimap.tsx',
      template: 'templates/GraphMinimap.tsx.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/graph/GraphBackground.tsx',
      template: 'templates/GraphBackground.tsx.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/graph/GraphToolbar.tsx',
      template: 'templates/GraphToolbar.tsx.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/graph/GraphExport.tsx',
      template: 'templates/GraphExport.tsx.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/graph/GraphImport.tsx',
      template: 'templates/GraphImport.tsx.tpl'
    },

    // Create custom node components
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/graph/nodes/ModuleNode.tsx',
      template: 'templates/ModuleNode.tsx.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/graph/nodes/ComponentNode.tsx',
      template: 'templates/ComponentNode.tsx.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/graph/nodes/ApiNode.tsx',
      template: 'templates/ApiNode.tsx.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/graph/nodes/DatabaseNode.tsx',
      template: 'templates/DatabaseNode.tsx.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/graph/nodes/ServiceNode.tsx',
      template: 'templates/ServiceNode.tsx.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/graph/nodes/PageNode.tsx',
      template: 'templates/PageNode.tsx.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/graph/nodes/HookNode.tsx',
      template: 'templates/HookNode.tsx.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/graph/nodes/UtilityNode.tsx',
      template: 'templates/UtilityNode.tsx.tpl'
    },

    // Create custom edge components
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/graph/edges/DependencyEdge.tsx',
      template: 'templates/DependencyEdge.tsx.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/graph/edges/ImportEdge.tsx',
      template: 'templates/ImportEdge.tsx.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/graph/edges/ExportEdge.tsx',
      template: 'templates/ExportEdge.tsx.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/graph/edges/InheritanceEdge.tsx',
      template: 'templates/InheritanceEdge.tsx.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/graph/edges/CompositionEdge.tsx',
      template: 'templates/CompositionEdge.tsx.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/graph/edges/AssociationEdge.tsx',
      template: 'templates/AssociationEdge.tsx.tpl'
    },

    // Create graph pages
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/graph/page.tsx',
      template: 'templates/graph-page.tsx.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/graph/[id]/page.tsx',
      template: 'templates/graph-detail-page.tsx.tpl'
    },

    // Create graph context
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/contexts/GraphContext.tsx',
      template: 'templates/GraphContext.tsx.tpl'
    },

    // Create graph provider
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/providers/GraphProvider.tsx',
      template: 'templates/GraphProvider.tsx.tpl'
    }
  ]
};

export default graphVisualizerBlueprint;
