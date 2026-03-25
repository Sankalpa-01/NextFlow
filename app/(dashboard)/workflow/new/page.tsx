"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createWorkflow } from "@/app/actions/workflow";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

/**
 * This page acts as a "Transition" route. 
 * When a user clicks "New Workflow", it hits this page, 
 * creates the DB record, and redirects them to the Canvas.
 */
export default function NewWorkflowPage() {
  const router = useRouter();

  useEffect(() => {
    const initWorkflow = async () => {
      try {
        // We call the Server Action we created earlier
        const result = await createWorkflow("Untitled Workflow");
        
        if (result.id) {
          toast.success("Workflow initialized!");
          router.push(`/workflow/${result.id}`);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to create workflow. Please try again.");
        router.push("/dashboard");
      }
    };

    initWorkflow();
  }, [router]);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
        <p className="text-muted-foreground animate-pulse">
          Crafting your new AI workspace...
        </p>
      </div>
    </div>
  );
}