import { env } from "@/env.mjs";
import { TRPCError } from "@trpc/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { google } from "googleapis";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

import { validatePlaylistItemCount } from "@/utils/validate-playlist-item-count";

// Create a new ratelimiter, that allows 2 requests per 1 minute
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(2, "1 m"),
  analytics: true,
  /**
   * Optional prefix for the keys used in redis. This is useful if you want to share a redis
   * instance with other applications and want to avoid key collisions. The default prefix is
   * "@upstash/ratelimit"
   */
  prefix: "@upstash/ratelimit",
});

const youtube = google.youtube({
  version: "v3",
  auth: env.YOUTUBE_API_SECRET,
});

export const bracketRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1), playlistId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { success } = await ratelimit.limit(ctx.session.user.id);

      if (!success) {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message:
            "You are ratelimited, please wait 1 minute before trying again",
        });
      }

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

      if (!videos || !validatePlaylistItemCount(videos)) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Check number of videos in playlist. Must be 8/16/32/64.",
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
                thumbnail: video.snippet?.thumbnails?.high?.url as string,
              })),
            },
          },
        },
      });

      return { bracketId: newBracket.id };
    }),

  remove: protectedProcedure
    .input(z.object({ bracketId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const bracketToDelete = await ctx.prisma.bracket.findUnique({
        where: { id: input.bracketId },
      });

      if (bracketToDelete?.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Bracket user id does not match session user id",
        });
      }

      if (!bracketToDelete) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No bracket found with that ID",
        });
      }

      await ctx.prisma.bracket.delete({
        where: {
          id: input.bracketId,
        },
        include: { videos: true },
      });
    }),

  getById: publicProcedure
    .input(z.object({ bracketId: z.string() }))
    .query(async ({ input, ctx }) => {
      const bracket = await ctx.prisma.bracket.findUnique({
        where: {
          id: input.bracketId,
        },
        include: {
          videos: { orderBy: { wins: "desc" } },
          createdBy: { select: { image: true, name: true } },
        },
      });

      if (!bracket) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No bracket found with that ID",
        });
      }

      return { bracket };
    }),

  getFeatured: publicProcedure.query(async ({ ctx }) => {
    const brackets = await ctx.prisma.bracket.findMany({
      where: { featured: true },
      include: { createdBy: { select: { name: true } } },
    });

    if (!brackets || !brackets.length) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "No brackets are featured",
      });
    }

    return { featured: brackets };
  }),
});
