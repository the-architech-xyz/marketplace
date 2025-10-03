import { Blueprint } from '@thearchitech.xyz/types';

const reactFlowBlueprint: Blueprint = {
  id: 'react-flow',
  name: 'React Flow Library',
  description: 'Pure React Flow library for building interactive node-based editors and diagrams',
  version: '1.0.0',
  actions: [
    // Install React Flow packages
    {
      type: 'INSTALL_PACKAGES',
      packages: [
        'reactflow',
        'react',
        'react-dom'
      ]
    },
    {
      type: 'INSTALL_PACKAGES',
      packages: [
        '@types/react',
        '@types/react-dom'
      ],
      isDev: true
    },
    // Create basic React Flow component
    {
      type: 'CREATE_FILE',
      path: 'src/components/ReactFlow/FlowCanvas.tsx',
      template: 'templates/FlowCanvas.tsx.tpl'
    },
    // Create custom node components
    {
      type: 'CREATE_FILE',
      path: 'src/components/ReactFlow/nodes/CustomNode.tsx',
      template: 'templates/CustomNode.tsx.tpl'
    },
    // Create custom edge components
    {
      type: 'CREATE_FILE',
      path: 'src/components/ReactFlow/edges/CustomEdge.tsx',
      template: 'templates/CustomEdge.tsx.tpl'
    },
    // Create React Flow hooks
    {
      type: 'CREATE_FILE',
      path: 'src/hooks/useReactFlow.ts',
      template: 'templates/useReactFlow.ts.tpl'
    },
    // Create React Flow context
    {
      type: 'CREATE_FILE',
      path: 'src/contexts/ReactFlowContext.tsx',
      template: 'templates/ReactFlowContext.tsx.tpl'
    },
    // Create React Flow types
    {
      type: 'CREATE_FILE',
      path: 'src/types/reactflow.ts',
      template: 'templates/reactflow-types.ts.tpl'
    },
    // Create React Flow utilities
    {
      type: 'CREATE_FILE',
      path: 'src/utils/reactflow.ts',
      template: 'templates/reactflow-utils.ts.tpl'
    },
    // Create React Flow styles
    {
      type: 'CREATE_FILE',
      path: 'src/styles/reactflow.css',
      template: 'templates/reactflow.css.tpl'
    }
  ]
};

export default reactFlowBlueprint;
