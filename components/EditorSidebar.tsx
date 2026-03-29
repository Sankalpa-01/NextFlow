"use client";

import { MessageSquare, Zap, Database } from "lucide-react";

export const EditorSidebar = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="w-64 border-r bg-background p-4 flex flex-col gap-4">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
        Nodes
      </h3>
      
      {/* Gemini AI Node */}
      <div
        className="flex items-center gap-3 p-3 border rounded-lg cursor-grab hover:bg-accent transition-colors bg-card"
        draggable
        onDragStart={(e) => onDragStart(e, "geminiAI")}
      >
        <div className="bg-blue-500/10 p-2 rounded">
          <Zap className="w-4 h-4 text-blue-500" />
        </div>
        <span className="text-sm font-medium">Gemini AI</span>
      </div>

      {/* Text Input Node */}
      <div
        className="flex items-center gap-3 p-3 border rounded-lg cursor-grab hover:bg-accent transition-colors bg-card"
        draggable
        onDragStart={(e) => onDragStart(e, "textInput")}
      >
        <div className="bg-green-500/10 p-2 rounded">
          <MessageSquare className="w-4 h-4 text-green-500" />
        </div>
        <span className="text-sm font-medium">User Input</span>
      </div>
    </aside>
  );
};