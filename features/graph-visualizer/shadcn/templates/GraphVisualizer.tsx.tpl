'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
  useReactFlow,
  ReactFlowProvider,
  Panel,
  NodeTypes,
  EdgeTypes,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Download, 
  Upload, 
  Settings, 
  Search,
  Filter,
  Layout,
  Save,
  Loader2
} from 'lucide-react';

import { ModuleNode } from './ModuleNode';
import { ComponentNode } from './ComponentNode';
import { ApiNode } from './ApiNode';
import { DatabaseNode } from './DatabaseNode';
import { ServiceNode } from './ServiceNode';
import { PageNode } from './PageNode';
import { HookNode } from './HookNode';
import { UtilityNode } from './UtilityNode';
import { DependencyEdge } from './DependencyEdge';
import { ImportEdge } from './ImportEdge';
import { ExportEdge } from './ExportEdge';
import { InheritanceEdge } from './InheritanceEdge';
import { CompositionEdge } from './CompositionEdge';
import { AssociationEdge } from './AssociationEdge';

export interface GraphData {
  nodes: Node[];
  edges: Edge[];
}

export interface GraphVisualizerProps {
  initialData?: GraphData;
  onDataChange?: (data: GraphData) => void;
  onNodeClick?: (node: Node) => void;
  onEdgeClick?: (edge: Edge) => void;
  onNodeDoubleClick?: (node: Node) => void;
  onEdgeDoubleClick?: (edge: Edge) => void;
  className?: string;
  height?: string | number;
  showControls?: boolean;
  showMiniMap?: boolean;
  showBackground?: boolean;
  allowNodeDrag?: boolean;
  allowEdgeDrag?: boolean;
  allowZoom?: boolean;
  allowPan?: boolean;
  onSave?: (data: GraphData) => Promise<void>;
  onLoad?: () => Promise<GraphData>;
  onExport?: (format: 'json' | 'png' | 'svg') => Promise<void>;
  onImport?: (file: File) => Promise<void>;
  onLayout?: (layout: 'hierarchical' | 'force' | 'circular') => Promise<void>;
  onSearch?: (query: string) => void;
  onFilter?: (filters: GraphFilters) => void;
  isLoading?: boolean;
  error?: string;
}

export interface GraphFilters {
  nodeTypes?: string[];
  edgeTypes?: string[];
  showDependencies?: boolean;
  showImports?: boolean;
  showExports?: boolean;
  showInheritance?: boolean;
  showComposition?: boolean;
  showAssociation?: boolean;
}

const nodeTypes: NodeTypes = {
  module: ModuleNode,
  component: ComponentNode,
  api: ApiNode,
  database: DatabaseNode,
  service: ServiceNode,
  page: PageNode,
  hook: HookNode,
  utility: UtilityNode,
};

const edgeTypes: EdgeTypes = {
  dependency: DependencyEdge,
  import: ImportEdge,
  export: ExportEdge,
  inheritance: InheritanceEdge,
  composition: CompositionEdge,
  association: AssociationEdge,
};

const defaultNodePosition = { x: 0, y: 0 };

function GraphVisualizerInner({
  initialData,
  onDataChange,
  onNodeClick,
  onEdgeClick,
  onNodeDoubleClick,
  onEdgeDoubleClick,
  className,
  height = '100%',
  showControls = true,
  showMiniMap = true,
  showBackground = true,
  allowNodeDrag = true,
  allowEdgeDrag = true,
  allowZoom = true,
  allowPan = true,
  onSave,
  onLoad,
  onExport,
  onImport,
  onLayout,
  onSearch,
  onFilter,
  isLoading = false,
  error,
}: GraphVisualizerProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialData?.nodes || []);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialData?.edges || []);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<GraphFilters>({
    showDependencies: true,
    showImports: true,
    showExports: true,
    showInheritance: true,
    showComposition: true,
    showAssociation: true,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);
  
  const reactFlowInstance = useReactFlow();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update data when nodes or edges change
  useEffect(() => {
    onDataChange?.({ nodes, edges });
  }, [nodes, edges, onDataChange]);

  // Handle node selection
  const handleNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
    setSelectedEdge(null);
    onNodeClick?.(node);
  }, [onNodeClick]);

  // Handle edge selection
  const handleEdgeClick = useCallback((event: React.MouseEvent, edge: Edge) => {
    setSelectedEdge(edge);
    setSelectedNode(null);
    onEdgeClick?.(edge);
  }, [onEdgeClick]);

  // Handle node double click
  const handleNodeDoubleClick = useCallback((event: React.MouseEvent, node: Node) => {
    onNodeDoubleClick?.(node);
  }, [onNodeDoubleClick]);

  // Handle edge double click
  const handleEdgeDoubleClick = useCallback((event: React.MouseEvent, edge: Edge) => {
    onEdgeDoubleClick?.(edge);
  }, [onEdgeDoubleClick]);

  // Handle connection creation
  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge = {
        ...params,
        id: `${params.source}-${params.target}-${Date.now()}`,
        type: 'dependency',
        animated: true,
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges]
  );

  // Handle search
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    onSearch?.(query);
  }, [onSearch]);

  // Handle filter change
  const handleFilterChange = useCallback((newFilters: Partial<GraphFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilter?.(updatedFilters);
  }, [filters, onFilter]);

  // Handle save
  const handleSave = useCallback(async () => {
    if (!onSave) return;
    
    try {
      setIsSaving(true);
      await onSave({ nodes, edges });
    } catch (error) {
      console.error('Failed to save graph:', error);
    } finally {
      setIsSaving(false);
    }
  }, [onSave, nodes, edges]);

  // Handle load
  const handleLoad = useCallback(async () => {
    if (!onLoad) return;
    
    try {
      setIsLoading(true);
      const data = await onLoad();
      setNodes(data.nodes);
      setEdges(data.edges);
    } catch (error) {
      console.error('Failed to load graph:', error);
    } finally {
      setIsLoading(false);
    }
  }, [onLoad, setNodes, setEdges]);

  // Handle export
  const handleExport = useCallback(async (format: 'json' | 'png' | 'svg') => {
    if (!onExport) return;
    
    try {
      await onExport(format);
    } catch (error) {
      console.error('Failed to export graph:', error);
    }
  }, [onExport]);

  // Handle import
  const handleImport = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !onImport) return;
    
    try {
      await onImport(file);
    } catch (error) {
      console.error('Failed to import graph:', error);
    }
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [onImport]);

  // Handle layout
  const handleLayout = useCallback(async (layout: 'hierarchical' | 'force' | 'circular') => {
    if (!onLayout) return;
    
    try {
      await onLayout(layout);
    } catch (error) {
      console.error('Failed to apply layout:', error);
    }
  }, [onLayout]);

  // Handle zoom
  const handleZoomIn = useCallback(() => {
    reactFlowInstance.zoomIn();
  }, [reactFlowInstance]);

  const handleZoomOut = useCallback(() => {
    reactFlowInstance.zoomOut();
  }, [reactFlowInstance]);

  const handleFitView = useCallback(() => {
    reactFlowInstance.fitView();
  }, [reactFlowInstance]);

  // Handle reset
  const handleReset = useCallback(() => {
    reactFlowInstance.setViewport({ x: 0, y: 0, zoom: 1 });
  }, [reactFlowInstance]);

  if (error) {
    return (
      <Card className={className}>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-destructive mb-2">Error loading graph</div>
            <div className="text-sm text-muted-foreground">{error}</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={className} style={{ height }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={handleNodeClick}
        onEdgeClick={handleEdgeClick}
        onNodeDoubleClick={handleNodeDoubleClick}
        onEdgeDoubleClick={handleEdgeDoubleClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        fitView
        nodesDraggable={allowNodeDrag}
        edgesUpdatable={allowEdgeDrag}
        nodesConnectable={true}
        elementsSelectable={true}
        selectNodesOnDrag={false}
        className="bg-background"
      >
        {showBackground && <Background />}
        {showControls && <Controls />}
        {showMiniMap && <MiniMap />}
        
        {/* Top Panel */}
        <Panel position="top-left">
          <Card className="w-80">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Graph Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search nodes..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm border rounded-md bg-background"
                />
              </div>

              {/* Filters */}
              <div className="space-y-2">
                <div className="text-xs font-medium text-muted-foreground">Filters</div>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={filters.showDependencies ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFilterChange({ showDependencies: !filters.showDependencies })}
                  >
                    Dependencies
                  </Button>
                  <Button
                    variant={filters.showImports ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFilterChange({ showImports: !filters.showImports })}
                  >
                    Imports
                  </Button>
                  <Button
                    variant={filters.showExports ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFilterChange({ showExports: !filters.showExports })}
                  >
                    Exports
                  </Button>
                  <Button
                    variant={filters.showInheritance ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFilterChange({ showInheritance: !filters.showInheritance })}
                  >
                    Inheritance
                  </Button>
                </div>
              </div>

              {/* Layout */}
              <div className="space-y-2">
                <div className="text-xs font-medium text-muted-foreground">Layout</div>
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleLayout('hierarchical')}
                  >
                    <Layout className="h-3 w-3 mr-1" />
                    Hierarchical
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleLayout('force')}
                  >
                    <Layout className="h-3 w-3 mr-1" />
                    Force
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleLayout('circular')}
                  >
                    <Layout className="h-3 w-3 mr-1" />
                    Circular
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </Panel>

        {/* Bottom Panel */}
        <Panel position="bottom-right">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomIn}
              disabled={!allowZoom}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomOut}
              disabled={!allowZoom}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleFitView}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>
        </Panel>

        {/* Right Panel */}
        <Panel position="top-right">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLoad}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Upload className="h-4 w-4" />
              )}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleExport('json')}>
                  Export as JSON
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport('png')}>
                  Export as PNG
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport('svg')}>
                  Export as SVG
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-4 w-4" />
            </Button>
          </div>
        </Panel>
      </ReactFlow>

      {/* Selected Node/Edge Info */}
      {(selectedNode || selectedEdge) && (
        <Panel position="bottom-left">
          <Card className="w-80">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">
                {selectedNode ? 'Node Details' : 'Edge Details'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedNode && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{selectedNode.type}</Badge>
                    <span className="text-sm font-medium">{selectedNode.id}</span>
                  </div>
                  {selectedNode.data?.description && (
                    <p className="text-sm text-muted-foreground">
                      {selectedNode.data.description}
                    </p>
                  )}
                  {selectedNode.data?.tags && (
                    <div className="flex flex-wrap gap-1">
                      {selectedNode.data.tags.map((tag: string) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {selectedEdge && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{selectedEdge.type}</Badge>
                    <span className="text-sm font-medium">
                      {selectedEdge.source} → {selectedEdge.target}
                    </span>
                  </div>
                  {selectedEdge.data?.description && (
                    <p className="text-sm text-muted-foreground">
                      {selectedEdge.data.description}
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </Panel>
      )}
    </div>
  );
}

export function GraphVisualizer(props: GraphVisualizerProps) {
  return (
    <ReactFlowProvider>
      <GraphVisualizerInner {...props} />
    </ReactFlowProvider>
  );
}