import dbConnect from "@/lib/db";
import Workflow from "@/lib/db/models/workflow";
import { WorkflowCard } from "@/components/dashboard/workflow-card";
import { auth } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const { userId } = await auth();
  await dbConnect();

  // Fetch all workflows for this user
  const workflows = await Workflow.find({ userId }).sort({ updatedAt: -1 });

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Workflows</h1>
          <p className="text-muted-foreground">Manage and run your AI agents.</p>
        </div>
        
        {/* Button to create a new one (link to your /new route or a modal) */}
        <Button asChild className="gap-2">
          <Link href="/workflow/new">
            <Plus size={18} />
            New Workflow
          </Link>
        </Button>
      </div>

      {workflows.length === 0 ? (
        <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-20 text-center">
          <h3 className="text-lg font-semibold">No workflows found</h3>
          <p className="text-muted-foreground">Create your first AI automation to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workflows.map((wf) => (
            <WorkflowCard 
              key={wf._id.toString()}
              id={wf._id.toString()}
              title={wf.title}
              updatedAt={wf.updatedAt}
              status={wf.status}
              nodeCount={wf.nodes.length}
            />
          ))}
        </div>
      )}
    </div>
  );
}