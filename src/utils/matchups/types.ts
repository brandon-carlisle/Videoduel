import { type Video } from "@prisma/client";

export interface Matchup {
  a: Video | null;
  b: Video | null;
  winner: Video | null;
}
