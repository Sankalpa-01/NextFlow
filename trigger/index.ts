import { TriggerClient } from "@trigger.dev/sdk";

// 1. Initialize the Trigger Client
// This ID must match the one in your trigger.config.ts
export const client = new TriggerClient({
  id: "nextflow-ai", 
  apiKey: process.env.TRIGGER_SECRET_KEY,
});

/**
 * 2. Define your AI Workflow
 * This is what TypeScript was looking for in your build error.
 * You can expand this later to actually call the Gemini API.
 */
export const geminiWorkflow = client.defineJob({
  id: "gemini-ai-task",
  name: "Gemini AI Task Processor",
  version: "0.0.1",
  trigger: { event: { name: "run.gemini" } },
  run: async (payload, io, ctx) => {
    await io.runTask("process-prompt", async () => {
      return {
        message: "Gemini Task received successfully!",
        payload,
      };
    });
  },
});