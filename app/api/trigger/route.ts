import { createAppRoute } from "@trigger.dev/nextjs";
import { client } from "../../../lib/trigger/client"; 

export const { POST } = createAppRoute(client);