import { Blueprint, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/marketplace/types';

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
      isDev: false
    },

    // Create graph types
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}graph/types.ts',
      template: 'templates/graph-types.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },

    // Create graph hooks
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}graph/hooks.ts',
      template: 'templates/graph-hooks.ts.tpl',      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },

    // Create graph store
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}graph/store.ts',
      template: 'templates/graph-store.ts.tpl',
    
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},

    // Create layout algorithms
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}graph/layouts.ts',
      template: 'templates/graph-layouts.ts.tpl',
    
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},

    // Create node types
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}graph/node-types.ts',
      template: 'templates/node-types.ts.tpl',
    
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},

    // Create edge types
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}graph/edge-types.ts',
      template: 'templates/edge-types.ts.tpl',
    
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},

    // Create graph utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}graph/utils.ts',
      template: 'templates/graph-utils.ts.tpl',
    
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},

    // Create API routes
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}api/graph/data/route.ts',
      template: 'templates/api-graph-data.ts.tpl',
    
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}api/graph/nodes/route.ts',
      template: 'templates/api-graph-nodes.ts.tpl',
    
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}api/graph/edges/route.ts',
      template: 'templates/api-graph-edges.ts.tpl',
    
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}api/graph/layout/route.ts',
      template: 'templates/api-graph-layout.ts.tpl',
    
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}api/graph/export/route.ts',
      template: 'templates/api-graph-export.ts.tpl',
    
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}api/graph/import/route.ts',
      template: 'templates/api-graph-import.ts.tpl',
    
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}api/graph/save/route.ts',
      template: 'templates/api-graph-save.ts.tpl',
    
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}api/graph/load/route.ts',
      template: 'templates/api-graph-load.ts.tpl',

      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},

    // Create React Flow components
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}graph/GraphVisualizer.tsx',
      template: 'templates/GraphVisualizer.tsx.tpl',
        
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}graph/GraphControls.tsx',
      template: 'templates/GraphControls.tsx.tpl',
        
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}graph/GraphMinimap.tsx',
      template: 'templates/GraphMinimap.tsx.tpl',
        
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}graph/GraphBackground.tsx',
      template: 'templates/GraphBackground.tsx.tpl',
        
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}graph/GraphToolbar.tsx',
      template: 'templates/GraphToolbar.tsx.tpl',
        
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}graph/GraphExport.tsx',
      template: 'templates/GraphExport.tsx.tpl',
        
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}graph/GraphImport.tsx',
      template: 'templates/GraphImport.tsx.tpl',
        
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},

    // Create custom node components
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}graph/nodes/ModuleNode.tsx',
      template: 'templates/ModuleNode.tsx.tpl',
        
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}graph/nodes/ComponentNode.tsx',
      template: 'templates/ComponentNode.tsx.tpl',
        
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}graph/nodes/ApiNode.tsx',
      template: 'templates/ApiNode.tsx.tpl',
        
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}graph/nodes/DatabaseNode.tsx',
      template: 'templates/DatabaseNode.tsx.tpl',
        
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}graph/nodes/ServiceNode.tsx',
      template: 'templates/ServiceNode.tsx.tpl',
        
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}graph/nodes/PageNode.tsx',
      template: 'templates/PageNode.tsx.tpl',

      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}graph/nodes/HookNode.tsx',
      template: 'templates/HookNode.tsx.tpl',
          
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}graph/nodes/UtilityNode.tsx',
      template: 'templates/UtilityNode.tsx.tpl',
          
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},

    // Create custom edge components
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}graph/edges/DependencyEdge.tsx',
      template: 'templates/DependencyEdge.tsx.tpl',
          
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}graph/edges/ImportEdge.tsx',
      template: 'templates/ImportEdge.tsx.tpl',
          
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}graph/edges/ExportEdge.tsx',
      template: 'templates/ExportEdge.tsx.tpl',
          
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}graph/edges/InheritanceEdge.tsx',
      template: 'templates/InheritanceEdge.tsx.tpl',
          
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE, 
        priority: 2
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}graph/edges/CompositionEdge.tsx',
      template: 'templates/CompositionEdge.tsx.tpl',
          
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}graph/edges/AssociationEdge.tsx',
      template: 'templates/AssociationEdge.tsx.tpl',
          
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},

    // Create graph pages
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}graph/page.tsx',
      template: 'templates/graph-page.tsx.tpl',
          
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}graph/[id]/page.tsx',
      template: 'templates/graph-detail-page.tsx.tpl',
          
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},

    // Create graph context
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/contexts/GraphContext.tsx',
      template: 'templates/GraphContext.tsx.tpl',
          
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},

    // Create graph provider
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/providers/GraphProvider.tsx',
      template: 'templates/GraphProvider.tsx.tpl',
          
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }}
  ]
};

export default graphVisualizerBlueprint;
