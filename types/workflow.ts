import { Node, Edge } from "@xyflow/react";

/**
 * Data for a node that calls the Gemini API
 */
export type GeminiNodeData = {
  label: string;
  prompt: string;
  variableName?: string; // To use this node's output in the next node
  lastResult?: string;
  status: "idle" | "loading" | "success" | "error";
}

/**
 * Data for a simple text input node
 */
export type InputNodeData = {
  label: string;
  value: string;
}

/**
 * Union type for all custom nodes in NextFlow
 * This allows TypeScript to know exactly which 'data' properties 
 * are available based on the 'type' string.
 */
export type GeminiNode = Node<GeminiNodeData, "geminiNode">;
export type InputNode = Node<InputNodeData, "inputNode">;

export type AppNode = GeminiNode | InputNode;

/**
 * The full Workflow structure as stored in MongoDB
 */
export interface WorkflowData {
  _id?: string;
  title: string;
  description?: string;
  userId: string;
  nodes: AppNode[];
  edges: Edge[];
  status: "draft" | "published" | "archived";
  createdAt?: string;
  updatedAt?: string;
}