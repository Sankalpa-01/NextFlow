"use server";

import dbConnect from "@/lib/db";
import Workflow from "../../lib/db/models/workflow";
import { auth } from "@clerk/nextjs/server";

export async function saveWorkflowAction(id: string, nodes: any[], edges: any[]) {
  await dbConnect();
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  const updatedWorkflow = await Workflow.findOneAndUpdate(
    { _id: id, userId: userId },
    { nodes, edges },
    { returnDocument: 'after' }
  );

  return { success: true, workflow: JSON.parse(JSON.stringify(updatedWorkflow)) };
}