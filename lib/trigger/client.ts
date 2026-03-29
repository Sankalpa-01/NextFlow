import { TriggerClient } from "@trigger.dev/sdk";

// 🟢 FIX: Name this 'client' to match the standard pattern
export const client = new TriggerClient({
  id: "nextflow-ai",
  apiKey: process.env.TRIGGER_SECRET_KEY,
});

// If you have executeWorkflow here, keep it, but ensure 'client' is exported above
export async function executeWorkflow(workflowId: string, payload: any) {
  return await client.sendEvent({
    name: "run.gemini",
    payload: { workflowId, ...payload },
  });
}