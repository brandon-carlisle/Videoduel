import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const videoRouter = createTRPCRouter({
  addWin: publicProcedure
    .input(z.object({ id: z.string(), bracketId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.video.update({
        where: {
          id: input.id,
          bracketId: input.bracketId,
        },
        data: { wins: { increment: 1 } },
      });

      await ctx.prisma.video.findUnique({
        where: { id: input.id, bracketId: input.bracketId },
      });
    }),
});
