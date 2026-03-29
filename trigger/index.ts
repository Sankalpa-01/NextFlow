import { TriggerClient, eventTrigger } from "@trigger.dev/sdk";

// 🟢 CRITICAL: This must be named 'client' and must be exported
export const client = new TriggerClient({
  id: "nextflow-ai", 
  apiKey: process.env.TRIGGER_SECRET_KEY,
});

// We keep this because your previous error mentioned it
export const geminiWorkflow = client.defineJob({
  id: "gemini-ai-task",
  name: "Gemini AI Task Processor",
  version: "0.0.1",
  trigger: eventTrigger({
    name: "run.gemini",
  }),
  run: async (payload, io, ctx) => {
    await io.runTask("process-prompt", async () => {
      return {
        success: true,
        message: "Gemini Task received successfully!",
        data: payload,
      };
    });
  },
});