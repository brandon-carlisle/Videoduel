import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  // TODO: This should be protected procedure
  getById: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: input.userId,
        },
        include: {
          brackets: true,
        },
      });

      if (!user)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No user found",
        });

      return { user };
    }),
});
