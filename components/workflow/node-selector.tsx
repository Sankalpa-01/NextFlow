"use client";

import { Card } from "@/components/ui/card";
import { Sparkles, Type, Database, Zap } from "lucide-react";

const NODE_TEMPLATES = [
  { type: "inputNode", label: "Text Input", icon: Type, description: "Start with a text value" },
  { type: "geminiNode", label: "Gemini AI", icon: Sparkles, description: "Process logic with LLM" },
  { type: "dbNode", label: "Database", icon: Database, description: "Fetch or save data" },
];

export function NodeSelector() {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="w-64 border-r bg-muted/30 p-4 h-full">
      <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
        <Zap size={16} className="text-blue-500" />
        Nodes Library
      </h3>
      
      <div className="space-y-3">
        {NODE_TEMPLATES.map((node) => (
          <Card
            key={node.type}
            draggable
            onDragStart={(e) => onDragStart(e, node.type)}
            className="p-3 cursor-grab hover:border-primary transition-colors active:cursor-grabbing bg-card"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-primary/10">
                <node.icon size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">{node.label}</p>
                <p className="text-[10px] text-muted-foreground">{node.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="mt-8 p-4 rounded-lg bg-blue-500/5 border border-blue-500/20 text-[11px] text-muted-foreground">
        Tip: Drag and drop these nodes onto the canvas to build your AI agent.
      </div>
    </div>
  );
}