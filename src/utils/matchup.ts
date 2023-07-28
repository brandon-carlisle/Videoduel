// matchup.ts
import { type Video } from "@prisma/client";

function shuffle(input: Video[]) {
  return input
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

export interface Matchup {
  a: Video | null;
  b: Video | null;
  winner: Video | null;
}

type Matchups = Matchup[];

export interface ByeVideo {
  id: string;
  videoId: string;
  wins: null;
  bracketId: string | null;
}

export function generateMatchups(input: Video[]): Matchups {
  if (input.length < 2) {
    throw new Error("Input must have at least 2 items");
  }

  if (input.length > 64) {
    throw new Error("Input can have no more than 64 items");
  }

  const shuffledInput = shuffle(input);

  // If number of videos is not a power of 2
  // we know byes must be awarded

  if (Math.log2(shuffledInput.length) % 1 === 0) {
    console.log("Is a power of 2");
  } else {
    console.log("Is not a power of 2");
  }

  // If the number of videos is odd, add a "Bye" video to make it even
  if (shuffledInput.length % 2 !== 0) {
    const byeVideo: ByeVideo = {
      id: "Bye",
      videoId: "Bye",
      wins: null,
      bracketId: null, // Set bracketId to null for the Bye video
    };
    shuffledInput.push(byeVideo);
  }

  const matchups: Matchups = [];

  // Create matchups based on the shuffled input
  for (let i = 0; i < shuffledInput.length; i += 2) {
    // TODO: Fix no null here
    const matchup: Matchup = {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      a: shuffledInput[i]!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      b: shuffledInput[i + 1]!,
      winner: null,
    };
    matchups.push(matchup);
  }

  return matchups;
}

export function getWinners(matchups: Matchups): Video[] {
  const winners: Video[] = [];
  for (const matchup of matchups) {
    if (matchup.winner !== null) {
      winners.push(matchup.winner);
    }
  }
  return winners;
}
