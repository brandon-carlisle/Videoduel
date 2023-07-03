import { env } from "@/env.mjs";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

// https://youtube.googleapis.com/youtube/v3/playlistItems?key=AIzaSyBecNJeGhK7Tc3odhYyf1Y1Mrg5Gdsf8tw&playlistId=PLl6vsdQa5mrTE90a8u3YWlMwjOi9CF8GF&part=contentDetails&maxResults=50

const createYoutubeQuery = (playlistId: string, maxResults: string) => {
  const query = `https://youtube.googleapis.com/youtube/v3/playlistItems?key=${env.YOUTUBE_API_SECRET}&playlistId=${playlistId}&part=contentDetails&maxResults=${maxResults}`;

  return query;
};

export const bracketRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1), playlistUrl: z.string().url() }))
    .mutation(async ({ input }) => {
      const playlistId = input.playlistUrl.split("list=")[1];

      const res = await fetch(createYoutubeQuery(playlistId, "50"));
      const data = await res.json();

      return {
        res: data,
      };
    }),
});
