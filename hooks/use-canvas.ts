import { useCallback } from "react";
import { 
  addEdge, 
  Connection, 
  Edge, 
  OnConnect, 
  useNodesState, 
  useEdgesState,
  NodeChange,
  EdgeChange
} from "@xyflow/react";
import { AppNode } from "@/types/workflow";

/**
 * useCanvas Hook
 * Manages the React Flow state for the NextFlow editor.
 */
export const useCanvas = (initialNodes: AppNode[] = [], initialEdges: Edge[] = []) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Handle new connections between nodes
  const onConnect: OnConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Helper to update specific node data (e.g., changing a prompt)
  const updateNodeData = useCallback((nodeId: string, newData: any) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          return { ...node, data: { ...node.data, ...newData } };
        }
        return node;
      })
    );
  }, [setNodes]);

  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setNodes,
    setEdges,
    updateNodeData,
  };
};