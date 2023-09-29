import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const videoRouter = createTRPCRouter({
  addWin: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.video.update({
        where: {
          id: input.id,
        },
        data: { wins: { increment: 1 } },
      });
    }),
});