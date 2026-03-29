// "use client";

// import React, { useCallback, useState } from "react";
// import {
//   ReactFlow,
//   Background,
//   Controls,
//   useNodesState,
//   useEdgesState,
//   addEdge,
//   useReactFlow,
//   ReactFlowProvider,
//   Connection,
//   Handle,
//   Position,
// } from "@xyflow/react";
// import "@xyflow/react/dist/style.css";
// import { Zap, MessageSquare, Save } from "lucide-react";
// import { saveWorkflowAction } from "../app/actions/workflowActions";

// // Custom Gemini AI Node with Input/Output Handles
// const GeminiAINode = ({ data }: any) => (
//   <div className="px-4 py-3 shadow-xl rounded-xl bg-white border-2 border-blue-600 min-w-[220px]">
//     <Handle type="target" position={Position.Top} className="w-3 h-3 bg-blue-600" />
//     <div className="flex flex-col gap-2">
//       <div className="flex items-center gap-2 border-b pb-2">
//         <Zap size={14} className="text-blue-500" />
//         <span className="text-xs font-bold uppercase">Gemini AI</span>
//       </div>
//       <textarea 
//         className="text-[11px] p-2 rounded border bg-slate-50 resize-none nodrag" 
//         placeholder="System Prompt..."
//         rows={3}
//         defaultValue={data.prompt || ""}
//       />
//     </div>
//     <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-blue-600" />
//   </div>
// );

// const nodeTypes = { geminiAI: GeminiAINode };

// export const WorkflowCanvas = ({ workflowId }: { workflowId: string }) => {
//   const [nodes, setNodes, onNodesChange] = useNodesState([]);
//   const [edges, setEdges, onEdgesChange] = useEdgesState([]);
//   const { screenToFlowPosition } = useReactFlow();
//   const [isSaving, setIsSaving] = useState(false);

//   const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), []);

//   const onSave = async () => {
//     setIsSaving(true);
//     await saveWorkflowAction(workflowId, nodes, edges);
//     setIsSaving(false);
//     alert("Workflow Saved to MongoDB!");
//   };

//   const onDrop = useCallback((event: React.DragEvent) => {
//     event.preventDefault();
//     const type = event.dataTransfer.getData("application/reactflow");
//     if (!type) return;
//     const position = screenToFlowPosition({ x: event.clientX, y: event.clientY });
//     const newNode = {
//       id: `${type}-${Date.now()}`,
//       type,
//       position,
//       data: { label: `${type}`, prompt: "" },
//     };
//     setNodes((nds) => [...nds, newNode]);
//   }, [screenToFlowPosition, setNodes]);

//   return (
//     <div className="h-full w-full relative">
//       <button 
//         onClick={onSave}
//         disabled={isSaving}
//         className="absolute top-4 right-4 z-50 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 disabled:opacity-50"
//       >
//         <Save size={16} /> {isSaving ? "Saving..." : "Save Workflow"}
//       </button>
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         onConnect={onConnect}
//         onDrop={onDrop}
//         onDragOver={(e) => e.preventDefault()}
//         nodeTypes={nodeTypes}
//       >
//         <Background />
//         <Controls />
//       </ReactFlow>
//     </div>
//   );
// };

"use client";

import React, { useCallback, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  ReactFlowProvider, // 1. Import this
  Connection,
  Handle,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Zap, Save, MessageSquare } from "lucide-react";
import { toast } from "sonner"
import { saveWorkflowAction } from "@/app/actions/workflowActions";

const GeminiAINode = ({ data }: any) => (
  <div className="px-4 py-3 shadow-xl rounded-xl bg-card border-2 border-blue-600 min-w-[220px] text-card-foreground">
    <Handle type="target" position={Position.Top} className="w-3 h-3 bg-blue-600" />
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 border-b border-border pb-2">
        <Zap size={14} className="text-blue-500" />
        <span className="text-xs font-bold uppercase">Gemini AI</span>
      </div>
      <textarea 
        className="text-[11px] p-2 rounded border border-input bg-background text-foreground resize-none nodrag" 
        placeholder="System Prompt..."
        rows={3}
      />
    </div>
    <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-blue-600" />
  </div>
);

const TextInputNode = ({ data }: any) => (
  <div className="px-4 py-3 shadow-xl rounded-xl bg-white border-2 border-green-600 min-w-[200px]">
    <div className="flex items-center gap-2 border-b pb-2 mb-2">
      <MessageSquare size={14} className="text-green-500" />
      <span className="text-xs font-bold uppercase">User Input</span>
    </div>
    <input 
      className="text-[11px] w-full p-2 rounded border bg-slate-50 nodrag" 
      placeholder="Variable name (e.g. topic)"
    />
    <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-green-600" />
  </div>
);

const nodeTypes = { geminiAI: GeminiAINode, textInput: TextInputNode };

// 2. MOVE ALL HOOKS INTO THIS INNER COMPONENT
const WorkflowCanvasInner = ({ workflowId, initialNodes, initialEdges }: { workflowId: string;initialNodes: any[];
  initialEdges: any[]; }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<any>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { screenToFlowPosition } = useReactFlow(); // Now it will find the provider!
  const [isSaving, setIsSaving] = useState(false);

  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const onSave = async () => {
  setIsSaving(true);
  try {
    await saveWorkflowAction(workflowId, nodes, edges);
    
    // ✅ Show success toast
    toast.success("Workflow Saved", {
      description: "Your changes are now safe in the database.",
    });

  } catch (error) {
    // ❌ Show error toast
    toast.error("Save Failed", {
      description: "Could not reach the database. Please check your connection.",
    });
  } finally {
    setIsSaving(false);
  }
};
  const onDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    const type = event.dataTransfer.getData("application/reactflow");
    if (!type) return;
    const position = screenToFlowPosition({ x: event.clientX, y: event.clientY });
    const newNode = {
      id: `${type}-${Date.now()}`,
      type,
      position,
      data: { label: `${type}`, prompt: "" },
    };
    setNodes((nds) => [...nds, newNode]);
  }, [screenToFlowPosition, setNodes]);

  return (
    <div className="h-full w-full relative">
      <button 
        onClick={onSave}
        disabled={isSaving}
        className="absolute top-4 right-4 z-50 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 disabled:opacity-50"
      >
        <Save size={16} /> {isSaving ? "Saving..." : "Save Workflow"}
      </button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        colorMode="dark"
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        nodeTypes={nodeTypes}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export const WorkflowCanvas = ({ 
  workflowId, 
  initialNodes, 
  initialEdges 
}: { 
  workflowId: string; 
  initialNodes: any[]; 
  initialEdges: any[]; 
}) => {
  return (
    <ReactFlowProvider>
      {/* 🟢 CHANGE THIS: Pass the props instead of [] */}
      <WorkflowCanvasInner 
        workflowId={workflowId} 
        initialNodes={initialNodes} 
        initialEdges={initialEdges} 
      />
    </ReactFlowProvider>
  );
};