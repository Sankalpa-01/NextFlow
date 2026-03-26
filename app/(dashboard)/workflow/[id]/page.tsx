import { notFound } from "next/navigation";
import dbConnect from "@/lib/db";
import Workflow from "@/lib/db/models/workflow";
import { WorkflowCanvas } from "@/components/workflow/canvas";
import { NodeSelector } from "@/components/workflow/node-selector";
import { auth } from "@clerk/nextjs/server";

export default async function WorkflowEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { userId } = await auth();
  if (!userId) return null;

  await dbConnect();

  const { id } = await params;

  // Fetch workflow and ensure it belongs to the logged-in user
  const workflow = await Workflow.findOne({
    _id: id,
    userId: userId,
  }).lean();

  if (!workflow) {
    notFound();
  }

  return (
    <div className="flex h-[calc(100vh-64px)] w-full overflow-hidden">
      {/* Sidebar: Drag nodes from here */}
      <NodeSelector />

      {/* Main Canvas: The interactive grid */}
      <main className="flex-1 relative">
        <WorkflowCanvas 
          initialNodes={JSON.parse(JSON.stringify(workflow.nodes))} 
          initialEdges={JSON.parse(JSON.stringify(workflow.edges))} 
        />
      </main>
    </div>
  );
}