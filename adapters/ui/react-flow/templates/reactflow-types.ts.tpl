import { Node, Edge, Connection } from 'reactflow';

// Base node data interface
export interface FlowNodeData {
  label: string;
  type: 'input' | 'output' | 'default' | 'custom';
  color?: string;
  icon?: string;
  description?: string;
  [key: string]: any;
}

// Base edge data interface
export interface FlowEdgeData {
  label?: string;
  type?: 'default' | 'smoothstep' | 'straight' | 'step' | 'custom';
  animated?: boolean;
  style?: React.CSSProperties;
  [key: string]: any;
}

// Extended node type
export interface FlowNode extends Node<FlowNodeData> {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: FlowNodeData;
  selected?: boolean;
  dragging?: boolean;
}

// Extended edge type
export interface FlowEdge extends Edge<FlowEdgeData> {
  id: string;
  source: string;
  target: string;
  type?: string;
  data?: FlowEdgeData;
  selected?: boolean;
  animated?: boolean;
}

// Flow viewport
export interface FlowViewport {
  x: number;
  y: number;
  zoom: number;
}

// Flow statistics
export interface FlowStats {
  nodeCount: number;
  edgeCount: number;
  selectedNodeCount: number;
  selectedEdgeCount: number;
}

// Flow export/import data
export interface FlowData {
  nodes: FlowNode[];
  edges: FlowEdge[];
  viewport?: FlowViewport;
  timestamp: string;
}

// Node creation options
export interface CreateNodeOptions {
  label: string;
  type?: 'input' | 'output' | 'default' | 'custom';
  position?: { x: number; y: number };
  data?: Partial<FlowNodeData>;
}

// Edge creation options
export interface CreateEdgeOptions {
  source: string;
  target: string;
  type?: string;
  data?: Partial<FlowEdgeData>;
}

// Flow canvas props
export interface FlowCanvasProps {
  initialNodes?: FlowNode[];
  initialEdges?: FlowEdge[];
  onNodesChange?: (nodes: FlowNode[]) => void;
  onEdgesChange?: (edges: FlowEdge[]) => void;
  onConnect?: (connection: Connection) => void;
  className?: string;
  readOnly?: boolean;
  showControls?: boolean;
  showMinimap?: boolean;
  showBackground?: boolean;
}

// Flow context value
export interface FlowContextValue {
  nodes: FlowNode[];
  edges: FlowEdge[];
  addNode: (options: CreateNodeOptions) => string;
  addEdge: (options: CreateEdgeOptions) => string;
  removeNode: (id: string) => void;
  removeEdge: (id: string) => void;
  updateNode: (id: string, updates: Partial<FlowNode>) => void;
  updateEdge: (id: string, updates: Partial<FlowEdge>) => void;
  clearSelection: () => void;
  deleteSelected: () => void;
  exportFlow: () => FlowData;
  importFlow: (data: FlowData) => void;
  getStats: () => FlowStats;
}

// Flow theme
export interface FlowTheme {
  name: string;
  background: string;
  nodeBackground: string;
  nodeBorder: string;
  nodeText: string;
  edgeColor: string;
  controlBackground: string;
  controlBorder: string;
  minimapBackground: string;
}

// Predefined themes
export const FLOW_THEMES: Record<string, FlowTheme> = {
  default: {
    name: 'Default',
    background: '#f8fafc',
    nodeBackground: '#ffffff',
    nodeBorder: '#e2e8f0',
    nodeText: '#1e293b',
    edgeColor: '#64748b',
    controlBackground: '#ffffff',
    controlBorder: '#e2e8f0',
    minimapBackground: '#f1f5f9',
  },
  dark: {
    name: 'Dark',
    background: '#0f172a',
    nodeBackground: '#1e293b',
    nodeBorder: '#334155',
    nodeText: '#f1f5f9',
    edgeColor: '#94a3b8',
    controlBackground: '#1e293b',
    controlBorder: '#334155',
    minimapBackground: '#0f172a',
  },
  light: {
    name: 'Light',
    background: '#ffffff',
    nodeBackground: '#f8fafc',
    nodeBorder: '#cbd5e1',
    nodeText: '#0f172a',
    edgeColor: '#475569',
    controlBackground: '#f8fafc',
    controlBorder: '#cbd5e1',
    minimapBackground: '#ffffff',
  },
};
