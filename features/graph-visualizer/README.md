# Graph Visualizer Capability

Interactive graph visualizer for displaying project architecture and dependencies using React Flow.

## Overview

The Graph Visualizer capability provides a comprehensive graph visualization system with support for:
- Interactive node and edge management
- Multiple layout algorithms (hierarchical, force, circular, grid)
- Custom node and edge types
- Graph export/import functionality
- Graph persistence and history
- Real-time collaboration features
- Multi-backend and multi-frontend support

## Architecture

This feature follows the Two-Headed architecture pattern:

### Backend Implementations
- **`nextjs/`** - Next.js API routes for graph data management
- **`express/`** - Express.js API routes (planned)
- **`fastify/`** - Fastify API routes (planned)

### Frontend Implementations
- **`react-flow/`** - React Flow components
- **`vis-network/`** - Vis.js network visualization (planned)
- **`d3/`** - D3.js custom visualization (planned)

## Contract

The feature contract is defined in `feature.json` and includes:

### Hooks
- **Graph Data Hooks**: `useGraphData`, `useNodes`, `useEdges`, `useLayout`, `useNodeTypes`, `useEdgeTypes`, `useGraphHistory`
- **Export/Import Hooks**: `useExportGraph`, `useImportGraph`, `useSaveGraph`, `useLoadGraph`
- **Layout Hooks**: `useUpdateLayout`
- **Node Management Hooks**: `useAddNode`, `useUpdateNode`, `useDeleteNode`
- **Edge Management Hooks**: `useAddEdge`, `useUpdateEdge`, `useDeleteEdge`

### API Endpoints
- `GET /api/graph/data` - Get graph data
- `GET /api/graph/nodes` - Get nodes
- `GET /api/graph/edges` - Get edges
- `GET /api/graph/layout` - Get layout configuration
- `POST /api/graph/export` - Export graph
- `POST /api/graph/import` - Import graph
- `POST /api/graph/save` - Save graph
- `POST /api/graph/load` - Load graph

### Types
- `GraphData` - Complete graph structure
- `Node` - Graph node with position and data
- `Edge` - Graph edge connecting nodes
- `LayoutConfig` - Layout algorithm configuration
- `NodeType` - Node type definition
- `EdgeType` - Edge type definition
- `GraphSnapshot` - Graph state snapshot
- `ExportResult` - Export operation result
- `ExportOptions` - Export configuration
- `ImportData` - Import data structure
- `SaveGraphData` - Graph save parameters
- `LoadGraphData` - Graph load parameters
- `AddNodeData` - Node creation parameters
- `UpdateNodeData` - Node update parameters
- `AddEdgeData` - Edge creation parameters
- `UpdateEdgeData` - Edge update parameters

## Implementation Requirements

### Backend Implementation
1. **Must implement all API endpoints** defined in the contract
2. **Must handle graph data persistence** and retrieval
3. **Must support layout algorithms** and configuration
4. **Must provide export/import functionality** in multiple formats
5. **Must handle graph history** and versioning

### Frontend Implementation
1. **Must provide interactive graph visualization** using the selected library
2. **Must integrate with backend hooks** using TanStack Query
3. **Must support custom node and edge types**
4. **Must handle graph manipulation** (add, update, delete nodes/edges)
5. **Must support the selected UI library** (React Flow, Vis.js, D3.js)

## Usage Example

```typescript
// Using the graph visualizer hooks
import { useGraphData, useAddNode, useAddEdge } from '@/lib/graph/hooks';

function GraphEditor() {
  const { data: graphData } = useGraphData();
  const addNode = useAddNode();
  const addEdge = useAddEdge();

  const handleAddNode = async (nodeData: AddNodeData) => {
    await addNode.mutateAsync(nodeData);
  };

  const handleAddEdge = async (edgeData: AddEdgeData) => {
    await addEdge.mutateAsync(edgeData);
  };

  return (
    <div className="h-screen">
      <GraphVisualizer
        data={graphData}
        onAddNode={handleAddNode}
        onAddEdge={handleAddEdge}
      />
    </div>
  );
}
```

## Configuration

The feature can be configured through the `parameters` section in `feature.json`:

- **`backend`**: Choose backend implementation
- **`frontend`**: Choose visualization library
- **`features`**: Enable/disable specific graph features

## Node Types

### Default Node Types
- **Module** - Code modules and packages
- **Component** - React/Vue/Angular components
- **API** - API endpoints and services
- **Database** - Database tables and schemas
- **Service** - Microservices and business logic
- **Page** - Application pages and routes
- **Hook** - Custom hooks and utilities
- **Utility** - Helper functions and utilities

### Custom Node Types
You can define custom node types by extending the base `NodeType` interface:

```typescript
interface CustomNodeType extends NodeType {
  category: 'business' | 'technical' | 'data';
  priority: 'high' | 'medium' | 'low';
  status: 'active' | 'inactive' | 'deprecated';
}
```

## Edge Types

### Default Edge Types
- **Dependency** - Module dependencies
- **Import** - Import relationships
- **Export** - Export relationships
- **Inheritance** - Class inheritance
- **Composition** - Object composition
- **Association** - General associations

### Custom Edge Types
You can define custom edge types by extending the base `EdgeType` interface:

```typescript
interface CustomEdgeType extends EdgeType {
  strength: number;
  direction: 'unidirectional' | 'bidirectional';
  metadata: Record<string, any>;
}
```

## Layout Algorithms

### Supported Algorithms
- **Hierarchical** - Tree-like layout with levels
- **Force** - Physics-based force simulation
- **Circular** - Circular arrangement
- **Grid** - Grid-based layout

### Layout Configuration
```typescript
interface LayoutConfig {
  algorithm: 'hierarchical' | 'force' | 'circular' | 'grid';
  direction: 'TB' | 'BT' | 'LR' | 'RL';
  spacing: number;
  padding: number;
  nodeSize: { width: number; height: number };
}
```

## Export/Import Formats

### Supported Formats
- **JSON** - Native graph format
- **SVG** - Scalable vector graphics
- **PNG** - Raster image
- **PDF** - Portable document format
- **DOT** - Graphviz format
- **GEXF** - Gephi format

## Dependencies

### Required Adapters
- `react-flow` - React Flow visualization library
- `shadcn-ui` - UI component library

### Required Integrators
- `zustand-nextjs-integration` - State management integration

### Required Capabilities
- `graph-visualization` - Graph rendering capability
- `state-management` - Application state management

## Development

To add a new backend implementation:

1. Create a new directory under `backend/`
2. Implement the required API endpoints
3. Handle graph data persistence
4. Support layout algorithms
5. Implement export/import functionality
6. Update the feature.json to include the new implementation

To add a new frontend implementation:

1. Create a new directory under `frontend/`
2. Implement graph visualization using the selected library
3. Integrate with the backend hooks
4. Handle node and edge management
5. Support custom node/edge types
6. Update the feature.json to include the new implementation

## Advanced Features

### Real-time Collaboration
- WebSocket integration for live updates
- Conflict resolution for simultaneous edits
- User presence and cursors

### Performance Optimization
- Virtualization for large graphs
- Lazy loading of node data
- Efficient rendering algorithms

### Accessibility
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
