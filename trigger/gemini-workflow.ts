import { generateAiResponse } from "@/lib/ai/gemini";
import dbConnect from "@/lib/db";
import Workflow from "@/lib/db/models/workflow";
import { task } from "@trigger.dev/sdk/v3";

/**
 * NextFlow AI Runner
 * This task takes a visual workflow and executes it step-by-step.
 */
export const geminiWorkflow = task({
  id: "gemini-workflow",
  // Retry 3 times with exponential backoff if Gemini is rate-limited
  retry: {
    maxAttempts: 3,
    factor: 2,
    minTimeoutInMs: 1000,
  },
  run: async (payload: { workflowId: string; inputData?: string }) => {
    await dbConnect();

    // 1. Fetch the workflow from MongoDB
    const workflow = await Workflow.findById(payload.workflowId);
    if (!workflow) throw new Error("Workflow not found");

    console.log(`Starting execution for: ${workflow.title}`);

    // 2. Simple logic: Find the first "Gemini Node"
    // In a full version, you would traverse the 'edges' to find the sequence.
    const aiNode = workflow.nodes.find((n: any) => n.type === "geminiNode");
    
    if (!aiNode) {
      return { success: false, message: "No AI Node found in this workflow" };
    }

    // 3. Prepare the prompt (Combine node data + user input)
    const prompt = `${aiNode.data.prompt}\n\nContext: ${payload.inputData || ""}`;

    // 4. Call your Gemini Helper
    const aiResult = await generateAiResponse(prompt);

    // 5. Update the workflow status in DB (optional)
    console.log("AI execution complete.");

    return {
      success: true,
      output: aiResult,
    };
  },
});