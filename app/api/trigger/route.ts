import { createAppRoute } from "@trigger.dev/nextjs";
import { client } from "@/trigger"; // Ensure this points to your trigger client file

// This creates the actual GET/POST handlers that Trigger.dev needs
export const { POST } = createAppRoute(client);