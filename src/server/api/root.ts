import { bracketRouter } from "@/server/api/routers/bracket";
import { createTRPCRouter } from "@/server/api/trpc";

import { userRouter } from "./routers/user";
import { videoRouter } from "./routers/video";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  bracket: bracketRouter,
  user: userRouter,
  video: videoRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
