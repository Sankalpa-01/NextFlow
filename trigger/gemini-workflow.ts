import { generateAiResponse } from "@/lib/ai/gemini";
import dbConnect from "@/lib/db";
import Workflow from "@/lib/db/models/workflow";
import { task } from "@trigger.dev/sdk/v3";

export const geminiWorkflow = task({
  id: "gemini-workflow",
  retry: {
    maxAttempts: 3,
    factor: 2,
    minTimeoutInMs: 1000,
  },
  run: async (payload: { workflowId: string; inputData?: string }) => {
    await dbConnect();

    const workflow = await Workflow.findById(payload.workflowId);
    if (!workflow) throw new Error("Workflow not found");

    console.log(`Starting execution for: ${workflow.title}`);

    const aiNode = workflow.nodes.find((n: any) => n.type === "geminiNode");
    
    if (!aiNode) {
      return { success: false, message: "No AI Node found in this workflow" };
    }

    const prompt = `${aiNode.data.prompt}\n\nContext: ${payload.inputData || ""}`;

    const aiResult = await generateAiResponse(prompt);

    console.log("AI execution complete.");

    return {
      success: true,
      output: aiResult,
    };
  },
});