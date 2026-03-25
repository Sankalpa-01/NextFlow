import type { TriggerConfig } from "@trigger.dev/sdk/v3";

export default {
  project: "proj_your_project_id", // Replace with your actual Project ID from Trigger.dev dashboard
  runtime: "node",
  logLevel: "info",
  maxDuration: 3600,
  retries: {
    enabledInDev: true,
    default: {
      maxAttempts: 3,
      minTimeoutInMs: 1000,
      maxTimeoutInMs: 30000,
      factor: 2,
    },
  },
  dirs: ["./trigger"], // This is where your gemini-workflow.ts lives
} satisfies TriggerConfig;