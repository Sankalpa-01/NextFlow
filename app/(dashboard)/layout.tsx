import { Sidebar } from "@/components/dashboard/sidebar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 2026 Clerk Standard: Check auth at the layout level
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        {/* Header or top padding if needed */}
        <div className="p-8 h-full">
          {children}
        </div>
      </main>
    </div>
  );
}