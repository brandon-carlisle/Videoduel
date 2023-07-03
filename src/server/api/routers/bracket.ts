import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const bracketRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1), playlistUrl: z.string().url() }))
    .mutation(({ input }) => {
      return {
        res: `${input.name} + ${input.playlistUrl}`,
      };
    }),
});
