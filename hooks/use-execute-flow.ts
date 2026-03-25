"use client";

import { useState, useEffect } from "react";
import { useRealtimeTaskTrigger } from "@trigger.dev/react-hooks";
import { toast } from "sonner";

interface GeminiWorkflowOutput {
  success: boolean;
  output?: string;
  message?: string;
}

export const useExecuteFlow = () => {
  const [output, setOutput] = useState<string | null>(null);

  // 1. The hook now only takes the ID and basic auth options
  const { submit, run, isLoading, error } = useRealtimeTaskTrigger<any>(
  "gemini-workflow", 
  {
    accessToken: "your_public_token_here" // This will come from your API later
  }
);

  // 2. Use a useEffect to "listen" for completion
  useEffect(() => {
    if (!run) return;

    if (run.status === "COMPLETED") {
      const result = run.output as GeminiWorkflowOutput;
      setOutput(result?.output || "No output returned.");
      toast.success("Workflow executed successfully!");
    }

    if (run.status === "FAILED" || run.status === "CRASHED") {
      toast.error("Workflow failed. Check Trigger.dev logs.");
    }
  }, [run?.status, run?.output]);

  const execute = async (workflowId: string, inputData?: string) => {
    setOutput(null);
    try {
      await submit({ 
        workflowId, 
        inputData: inputData || "" 
      });
    } catch (e) {
      console.error("Trigger Error:", e);
      toast.error("Could not start workflow.");
    }
  };

  return {
    execute,
    isLoading,
    status: run?.status || "idle",
    output,
    error,
  };
};