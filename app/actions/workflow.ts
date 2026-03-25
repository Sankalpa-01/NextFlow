"use server";

import dbConnect from "@/lib/db";
import Workflow from "@/lib/db/models/workflow";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

/**
 * Server Action: Save a workflow
 * This updates the nodes and edges in MongoDB.
 */
export async function saveWorkflow(id: string, nodes: any[], edges: any[]) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  await dbConnect();

  // We find by both ID and UserId for security (prevents editing others' work)
  await Workflow.findOneAndUpdate(
    { _id: id, userId },
    { 
      nodes: nodes, 
      edges: edges, 
      updatedAt: new Date() 
    }
  );

  // This tells Next.js to refresh the data on the dashboard
  revalidatePath("/dashboard");
  return { success: true };
}

/**
 * Server Action: Create a new empty workflow
 */
export async function createWorkflow(title: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  await dbConnect();

  const newWorkflow = await Workflow.create({
    title,
    userId,
    nodes: [],
    edges: [],
    status: "draft",
  });

  return { id: newWorkflow._id.toString() };
}