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
        part: ["snippet"],
      });

      if (status !== 200)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "youtube data api client error",
        });

      const { items: videos } = data;

      if (!videos || videos.length < 2 || videos.length > 64) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            "Check number of videos in playlist. Must have at least 2. Must be no more than 64.",
        });
      }

      // Create the bracket
      const newBracket = await ctx.prisma.bracket.create({
        data: {
          name: input.name,
          playlistId: input.playlistId,
          userId: ctx.session.user.id,
          videos: {
            createMany: {
              data: videos.map((video) => ({
                videoId: video.snippet?.resourceId?.videoId as string,
                title: video.snippet?.title as string,
                thumbnail: video.snippet?.thumbnails?.standard as string,
              })),
            },
          },
        },
      });

      return { bracketId: newBracket.id };
    }),

  getById: publicProcedure
    .input(z.object({ bracketId: z.string() }))
    .query(async ({ input, ctx }) => {
      const bracket = await ctx.prisma.bracket.findUnique({
        where: {
          id: input.bracketId,
        },
        include: {
          videos: true,
          createdBy: { select: { image: true, name: true } },
        },
      });

      if (!bracket)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No bracket found",
        });

      return { bracket };
    }),
});
