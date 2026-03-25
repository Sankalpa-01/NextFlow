import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Workflow from "@/lib/db/models/workflow";
import { auth } from "@clerk/nextjs/server";

/**
 * GET: Fetch all workflows for the current user
 */
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const workflows = await Workflow.find({ userId }).sort({ updatedAt: -1 });

    return NextResponse.json(workflows);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

/**
 * POST: Create a new workflow
 */
export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    await dbConnect();

    const newWorkflow = await Workflow.create({
      title: body.title || "Untitled Workflow",
      userId,
      nodes: [],
      edges: [],
      status: "draft",
    });

    return NextResponse.json(newWorkflow, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create workflow" }, { status: 500 });
  }
}