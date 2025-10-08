import { Blueprint, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';

const reactFlowBlueprint: Blueprint = {
  id: 'react-flow',
  name: 'React Flow Library',
  description: 'Pure React Flow library for building interactive node-based editors and diagrams',
  version: '1.0.0',
  actions: [
    // Install React Flow packages
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: [
        'reactflow',
        'react',
        'react-dom'
      ]
    },
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: [
        '@types/react',
        '@types/react-dom'
      ],
      isDev: true
    },
    // Create basic React Flow component
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}ReactFlow/FlowCanvas.tsx',
      template: 'templates/FlowCanvas.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,  
        priority: 0
      }},
    // Create custom node components
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}ReactFlow/nodes/CustomNode.tsx',
      template: 'templates/CustomNode.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }},
    // Create custom edge components
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}ReactFlow/edges/CustomEdge.tsx',
      template: 'templates/CustomEdge.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }},
    // Create React Flow hooks
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.hooks}}useReactFlow.ts',
      template: 'templates/useReactFlow.ts.tpl',
      
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }},
    // Create React Flow context
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/contexts/ReactFlowContext.tsx',
      template: 'templates/ReactFlowContext.tsx.tpl',
    
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 0
      }},
    // Create React Flow types
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.types}}reactflow.ts',
      template: 'templates/reactflow-types.ts.tpl',
      
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }},
    // Create React Flow utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/utils/reactflow.ts',
      template: 'templates/reactflow-utils.ts.tpl',
      
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }},
    // Create React Flow styles
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.styles}}reactflow.css',
      template: 'templates/reactflow.css.tpl',
      
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 0
      }}
  ]
};

export default reactFlowBlueprint;
