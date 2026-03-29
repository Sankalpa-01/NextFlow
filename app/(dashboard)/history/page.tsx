import dbConnect from "@/lib/db";
import Workflow from "../../../lib/db/models/workflow";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default async function HistoryPage() {
  const { userId } = await auth();
  await dbConnect();
  
  const workflows = await Workflow.find({ userId }).sort({ createdAt: -1 });

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">My Workflows</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {workflows.map((wf) => (
          <Link href={`/workflow/${wf._id}`} key={wf._id.toString()}>
            <Card className="hover:border-primary transition-all cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg">{wf.name}</CardTitle>
                <p className="text-xs text-muted-foreground">
                  Nodes: {wf.nodes?.length || 0}
                </p>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}