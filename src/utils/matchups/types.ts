import { type Video } from "@prisma/client";

export interface Matchup {
  a: Video;
  b: Video;
  winner: Video | null;
}
