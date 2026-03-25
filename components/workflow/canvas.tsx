"use client";

import React, { useMemo } from "react";
import { 
  ReactFlow, 
  Background, 
  Controls, 
  Panel,
  BackgroundVariant 
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { useCanvas } from "@/hooks/use-canvas";
import { GeminiNode } from "./nodes/gemini-node";
import { InputNode } from "./nodes/input-node";
import { WorkflowControls } from "./controls";

// Define custom node types for React Flow
const nodeTypes = {
  geminiNode: GeminiNode,
  inputNode: InputNode,
};

export function WorkflowCanvas() {
  const { 
    nodes, 
    edges, 
    onNodesChange, 
    onEdgesChange, 
    onConnect 
  } = useCanvas();

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
        {/* The Grid Background (Krea.ai style dots) */}
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
        
        {/* Zoom/Pan Controls */}
        <Controls position="bottom-left" showInteractive={false} />
        
        {/* Floating Action Bar */}
        <Panel position="top-right">
          <WorkflowControls />
        </Panel>
      </ReactFlow>
    </div>
  );
}