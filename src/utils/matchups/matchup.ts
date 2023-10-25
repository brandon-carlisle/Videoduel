import { type Video } from "@prisma/client";

import { validatePlaylistItemCount } from "../validate-playlist-item-count";
import { type Matchup } from "./types";

function shuffle(input: Video[]) {
  return input
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

type Matchups = Matchup[];

export function generateMatchups(input: Video[]): Matchups {
  // Check if we have correct number of videos
  // Input will only be valid if we have
  // 2 / 8 / 16 / 32 / 64 videos
  if (!validatePlaylistItemCount(input)) {
    throw new Error("Invalid playlist count");
  }

  const shuffledInput = shuffle(input);

  // Create an array to store the matchups
  const matchups: Matchups = [];

  const numberOfMatchups = shuffledInput.length / 2;

  for (let i = 0; i < numberOfMatchups; i++) {
    const a = shuffledInput[2 * i];
    const b = shuffledInput[2 * i + 1];

    let matchup;

    if (a && b) {
      matchup = {
        a,
        b,
        winner: null,
      };
      matchups.push(matchup);
    } else {
      throw new Error("Chech matchups.ts");
    }
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
