import { redirect } from "next/navigation";

export default function WorkflowsRedirectPage() {
  // If someone manually types /workflow, send them to the main library
  redirect("/dashboard");
}