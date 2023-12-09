import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
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

  remove: protectedProcedure.mutation(async ({ ctx }) => {
    // This will remove ALL user data including any videos and brackets

    const videosDelete = ctx.prisma.video.deleteMany({
      where: { userId: ctx.session.user.id },
    });

    const bracketsDelete = ctx.prisma.bracket.deleteMany({
      where: { userId: ctx.session.user.id },
    });

    const userDelete = ctx.prisma.user.delete({
      where: { id: ctx.session.user.id },
      include: { accounts: { where: { userId: ctx.session.user.id } } },
    });

    await ctx.prisma.$transaction([videosDelete, bracketsDelete, userDelete]);
  }),
});
