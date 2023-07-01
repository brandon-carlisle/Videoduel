import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const bracketRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ text: z.string() }))
    .mutation(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
});
