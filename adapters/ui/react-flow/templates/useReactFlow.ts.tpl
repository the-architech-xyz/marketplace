import { useCallback, useMemo } from 'react';
import { useReactFlow as useReactFlowHook, Node, Edge, Connection } from 'reactflow';
import { FlowNode, FlowEdge } from '@/types/reactflow';

export function useReactFlow() {
  const {
    getNode,
    getNodes,
    getEdge,
    getEdges,
    setNodes,
    setEdges,
    addNodes,
    addEdges,
    removeNodes,
    removeEdges,
    updateNode,
    updateEdge,
    fitView,
    zoomIn,
    zoomOut,
    zoomTo,
    setCenter,
    getViewport,
    setViewport,
    project,
    screenToFlowPosition,
    flowToScreenPosition,
  } = useReactFlowHook();

  // Add a new node
  const addNode = useCallback(
    (node: Omit<FlowNode, 'id'>) => {
      const id = `node-${Date.now()}`;
      const newNode: FlowNode = {
        id,
        ...node,
        position: node.position || { x: 0, y: 0 },
        data: node.data || {},
      };
      addNodes([newNode]);
      return id;
    },
    [addNodes]
  );

  // Add a new edge
  const addEdge = useCallback(
    (edge: Omit<FlowEdge, 'id'>) => {
      const id = `edge-${Date.now()}`;
      const newEdge: FlowEdge = {
        id,
        ...edge,
      };
      addEdges([newEdge]);
      return id;
    },
    [addEdges]
  );

  // Connect two nodes
  const connectNodes = useCallback(
    (sourceId: string, targetId: string, type?: string) => {
      const connection: Connection = {
        source: sourceId,
        target: targetId,
        type,
      };
      addEdge(connection);
    },
    [addEdge]
  );

  // Get node by ID
  const getNodeById = useCallback(
    (id: string) => {
      return getNode(id);
    },
    [getNode]
  );

  // Get all selected nodes
  const getSelectedNodes = useCallback(() => {
    return getNodes().filter((node) => node.selected);
  }, [getNodes]);

  // Get all selected edges
  const getSelectedEdges = useCallback(() => {
    return getEdges().filter((edge) => edge.selected);
  }, [getEdges]);

  // Clear selection
  const clearSelection = useCallback(() => {
    const nodes = getNodes().map((node) => ({ ...node, selected: false }));
    const edges = getEdges().map((edge) => ({ ...edge, selected: false }));
    setNodes(nodes);
    setEdges(edges);
  }, [getNodes, getEdges, setNodes, setEdges]);

  // Delete selected items
  const deleteSelected = useCallback(() => {
    const selectedNodeIds = getSelectedNodes().map((node) => node.id);
    const selectedEdgeIds = getSelectedEdges().map((edge) => edge.id);
    
    removeNodes(selectedNodeIds);
    removeEdges(selectedEdgeIds);
  }, [getSelectedNodes, getSelectedEdges, removeNodes, removeEdges]);

  // Center on specific node
  const centerOnNode = useCallback(
    (nodeId: string) => {
      const node = getNode(nodeId);
      if (node) {
        setCenter(node.position.x, node.position.y, { zoom: 1 });
      }
    },
    [getNode, setCenter]
  );

  // Get flow statistics
  const getFlowStats = useCallback(() => {
    const nodes = getNodes();
    const edges = getEdges();
    
    return {
      nodeCount: nodes.length,
      edgeCount: edges.length,
      selectedNodeCount: getSelectedNodes().length,
      selectedEdgeCount: getSelectedEdges().length,
    };
  }, [getNodes, getEdges, getSelectedNodes, getSelectedEdges]);

  // Export flow data
  const exportFlow = useCallback(() => {
    const nodes = getNodes();
    const edges = getEdges();
    const viewport = getViewport();
    
    return {
      nodes,
      edges,
      viewport,
      timestamp: new Date().toISOString(),
    };
  }, [getNodes, getEdges, getViewport]);

  // Import flow data
  const importFlow = useCallback(
    (data: { nodes: Node[]; edges: Edge[]; viewport?: any }) => {
      setNodes(data.nodes);
      setEdges(data.edges);
      if (data.viewport) {
        setViewport(data.viewport);
      }
    },
    [setNodes, setEdges, setViewport]
  );

  return {
    // Core React Flow methods
    getNode,
    getNodes,
    getEdge,
    getEdges,
    setNodes,
    setEdges,
    addNodes,
    addEdges,
    removeNodes,
    removeEdges,
    updateNode,
    updateEdge,
    fitView,
    zoomIn,
    zoomOut,
    zoomTo,
    setCenter,
    getViewport,
    setViewport,
    project,
    screenToFlowPosition,
    flowToScreenPosition,
    
    // Custom methods
    addNode,
    addEdge,
    connectNodes,
    getNodeById,
    getSelectedNodes,
    getSelectedEdges,
    clearSelection,
    deleteSelected,
    centerOnNode,
    getFlowStats,
    exportFlow,
    importFlow,
  };
}
