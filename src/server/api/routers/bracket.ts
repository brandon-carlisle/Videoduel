import { env } from "@/env.mjs";
import { TRPCError } from "@trpc/server";
import { google } from "googleapis";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

const youtube = google.youtube({
  version: "v3",
  auth: env.YOUTUBE_API_SECRET,
});

export const bracketRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1), playlistId: z.string() }))
    .mutation(async ({ input }) => {
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

      console.log(videoUrls);
    }),
});
