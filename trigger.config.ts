import { defineConfig } from "@trigger.dev/sdk";

export default defineConfig({
    // You get this ID from your Trigger.dev Dashboard
    project: "proj_your_project_id_here",

    // Where the SDK should look for your AI task files
    dirs: ["./trigger"],

    retries: {
        enabledInDev: true,
        default: {
            maxAttempts: 3,
            minTimeoutInMs: 1000,
            maxTimeoutInMs: 10000,
            factor: 2,
            randomize: true,
        },
    },
    maxDuration: 0
});