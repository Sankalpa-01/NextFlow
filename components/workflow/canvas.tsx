"use client";

import React, { useMemo } from "react";
import { 
  ReactFlow, 
  Background, 
  Controls, 
  Panel,
  BackgroundVariant,
  type Edge // Added this import
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { useCanvas } from "@/hooks/use-canvas";
import { GeminiNode } from "./nodes/gemini-node";
import { InputNode } from "./nodes/input-node";
import { WorkflowControls } from "./controls";
import { AppNode } from "@/types/workflow"; // Import your custom node type

/**
 * FIX: Define the interface for the props.
 * This tells TypeScript that it's okay to receive nodes and edges from the server.
 */
interface WorkflowCanvasProps {
  initialNodes: AppNode[];
  initialEdges: Edge[];
}

// Update the function to accept these props
export function WorkflowCanvas({ initialNodes, initialEdges }: WorkflowCanvasProps) {
  /**
   * FIX: Pass the initial data into your hook.
   * This ensures the canvas isn't empty when the page loads.
   */
  const { 
    nodes, 
    edges, 
    onNodesChange, 
    onEdgesChange, 
    onConnect 
  } = useCanvas(initialNodes, initialEdges);

  const nodeTypes = useMemo(() => ({
    geminiNode: GeminiNode,
    inputNode: InputNode,
  }), []);

  const defaultEdgeOptions = {
    animated: true,
    style: { stroke: "#3b82f6", strokeWidth: 2 },
  };

  return (
    <div className="h-full w-full bg-background">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
        className="bg-dot-pattern"
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
        <Controls position="bottom-left" showInteractive={false} />
        <Panel position="top-right">
          <WorkflowControls />
        </Panel>
      </ReactFlow>
    </div>
  );
}