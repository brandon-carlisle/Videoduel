import { env } from "@/env.mjs";
import { TRPCError } from "@trpc/server";
import { google } from "googleapis";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

const youtube = google.youtube({
  version: "v3",
  auth: env.YOUTUBE_API_SECRET,
});

export const bracketRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1), playlistId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { status, data } = await youtube.playlistItems.list({
        playlistId: input.playlistId,
        maxResults: 50,
        part: ["contentDetails"],
      });

      if (status !== 200)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "youtube data api client error",
        });

      const { items } = data;

      if (!items || items?.length <= 1) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "not enough videos in playlist",
        });
      }

      const videoUrls = items.map(
        (video) =>
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          `https://www.youtube.com/watch?v=${video.contentDetails?.videoId}`,
      );

      const newBracket = await ctx.prisma.bracket.create({
        data: {
          name: input.name,
          playlistId: input.playlistId,
          userId: ctx.session.user.id,
          videoUrls,
        },
      });

      return { bracket: newBracket };
    }),

  getById: publicProcedure
    .input(z.object({ bracketId: z.string() }))
    .query(async ({ input, ctx }) => {
      const bracket = await ctx.prisma.bracket.findUnique({
        where: {
          id: input.bracketId,
        },
      });

      return { bracket };
    }),
});
