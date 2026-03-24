import { tasks } from "@trigger.dev/sdk";

/**
 * Trigger.dev Client Configuration
 * * In v3/v4, the SDK automatically handles authentication via the 
 * TRIGGER_SECRET_KEY in your .env.local.
 * * We export 'tasks' here so you have a single source of truth 
 * for triggering background jobs from your Next.js Server Actions or API routes.
 */

export const triggerClient = tasks;

/**
 * Helper to trigger the Gemini Workflow
 * This provides a type-safe wrapper for the frontend to call.
 */
export async function executeWorkflow(workflowId: string, payload: any) {
  try {
    // We will define 'gemini-workflow' in the /trigger folder later
    const handle = await tasks.trigger("gemini-workflow", {
      workflowId,
      ...payload,
    });
    
    return handle;
  } catch (error) {
    console.error("Failed to trigger workflow:", error);
    throw new Error("Background task initiation failed");
  }
}