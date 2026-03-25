"use client";

import { Button } from "@/components/ui/button";
import { Play, Save, Share2, Loader2 } from "lucide-react";
import { useExecuteFlow } from "@/hooks/use-execute-flow";
import { useParams } from "next/navigation";

export function WorkflowControls() {
  const { id } = useParams();
  const { execute, isLoading, status } = useExecuteFlow();

  const handleRun = () => {
    if (typeof id === "string") {
      execute(id); // Triggers the Gemini Task via Trigger.dev
    }
  };

  return (
    <div className="flex items-center gap-2 bg-background/80 backdrop-blur-md p-2 rounded-lg border shadow-lg">
      <Button variant="outline" size="sm" className="gap-2">
        <Save size={14} />
        Save
      </Button>
      
      <Button variant="outline" size="sm" className="gap-2">
        <Share2 size={14} />
        Share
      </Button>

      <div className="h-4 w-[1px] bg-border mx-1" />

      <Button 
        onClick={handleRun} 
        disabled={isLoading}
        size="sm" 
        className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
      >
        {isLoading ? (
          <Loader2 size={14} className="animate-spin" />
        ) : (
          <Play size={14} fill="currentColor" />
        )}
        {status === "EXECUTING" ? "Processing..." : "Run Workflow"}
      </Button>
    </div>
  );
}