// // import { notFound } from "next/navigation";
// // import dbConnect from "@/lib/db";
// // import Workflow from "@/lib/db/models/workflow";
// // import { WorkflowCanvas } from "@/components/workflow/canvas";
// // import { NodeSelector } from "@/components/workflow/node-selector";
// // import { auth } from "@clerk/nextjs/server";

// // export default async function WorkflowEditorPage({
// //   params,
// // }: {
// //   params: Promise<{ id: string }>;
// // }) {
// //   const { userId } = await auth();
// //   if (!userId) return null;

// //   await dbConnect();

// //   const { id } = await params;

// //   // Fetch workflow and ensure it belongs to the logged-in user
// //   const workflow = await Workflow.findOne({
// //     _id: id,
// //     userId: userId,
// //   }).lean();

// //   if (!workflow) {
// //     notFound();
// //   }

// //   return (
// //     <div className="flex h-[calc(100vh-64px)] w-full overflow-hidden">
// //       {/* Sidebar: Drag nodes from here */}
// //       <NodeSelector />

// //       {/* Main Canvas: The interactive grid */}
// //       <main className="flex-1 relative">
// //         <WorkflowCanvas 
// //           initialNodes={JSON.parse(JSON.stringify(workflow.nodes))} 
// //           initialEdges={JSON.parse(JSON.stringify(workflow.edges))} 
// //         />
// //       </main>
// //     </div>
// //   );
// // }

// import { EditorSidebar } from "@/components/EditorSidebar";
// import { WorkflowCanvas } from "@/components/WorkflowCanvas";

// export default async function WorkflowPage({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = await params;

//   return (
//     <div className="flex h-[calc(100vh-64px)] w-full overflow-hidden">
//       <EditorSidebar />
//       <WorkflowCanvas workflowId={id} />
//     </div>
//   );
// }

// import { EditorSidebar } from "@/components/EditorSidebar";
// import { WorkflowCanvas } from "@/components/WorkflowCanvas";
// import { ReactFlowProvider } from "@xyflow/react";

// export default async function WorkflowPage({ params }: { params: Promise<{ id: string }> }) {
//   const { id } = await params;
  
//   return (
//     <div className="flex h-screen w-full">
//       <EditorSidebar />
//       <ReactFlowProvider>
//         <WorkflowCanvas workflowId={id} />
//       </ReactFlowProvider>
//     </div>
//   );
// }

// app/(dashboard)/workflow/[id]/page.tsx
import { WorkflowCanvas } from "@/components/WorkflowCanvas";
import dbConnect from "@/lib/db";
import Workflow from "../../../../lib/db/models/workflow";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function WorkflowPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  await dbConnect();
  
  // 1. Fetch the data from MongoDB
  const workflow = await Workflow.findOne({ _id: id, userId }).lean();

  if (!workflow) {
    return <div className="p-10 text-center">Workflow not found.</div>;
  }

  // 2. Clean the data (MongoDB objects to plain JSON)
  const initialNodes = JSON.parse(JSON.stringify(workflow.nodes || []));
  const initialEdges = JSON.parse(JSON.stringify(workflow.edges || []));

  return (
    <div className="flex h-[calc(100vh-64px)] w-full">
      {/* 3. Pass the saved data into the canvas */}
      <WorkflowCanvas 
        workflowId={id} 
        initialNodes={initialNodes} 
        initialEdges={initialEdges} 
      />
    </div>
  );
}