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

export function generateMatchups(input: Video[]): Matchups {
  if (input.length < 2) {
    throw new Error("Input must have at least 2 items");
  }

  if (input.length > 64) {
    throw new Error("Input can have no more than 64 items");
  }

  const shuffledInput = shuffle(input);
  // Create an array to store the matchups
  const matchups: Matchups = [];

  // Calculate the nearest power of 2 greater than or equal to the number of videos
  const nextPowerOf2 = Math.pow(2, Math.ceil(Math.log2(shuffledInput.length)));

  for (let i = 0; i < nextPowerOf2 / 2; i++) {
    // We want to generate matchups in pairs of 2
    let a: Video | null;
    let b: Video | null;

    // If there are still videos in the shuffled input, assign them to the matchup
    if (2 * i < shuffledInput.length) {
      a = shuffledInput[2 * i] || null;
      b = shuffledInput[2 * i + 1] || null; // If there's no b, it's a bye
    } else {
      // If there are no more videos in the shuffled input, use a bye
      a = null;
      b = null;
    }

    const matchup: Matchup = {
      a,
      b,
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
