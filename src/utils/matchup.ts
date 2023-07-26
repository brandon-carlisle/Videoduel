function shuffle(input: unknown[]) {
  return input
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

type Winner = "a" | "b";

export interface Matchup {
  a: unknown;
  b: unknown;
  winner: null | Winner;
}

type Matchups = Matchup[];

export function generateMatchups(input: unknown[]): Matchups {
  if (input.length < 2) {
    throw new Error("Input needs at least 2 items");
  }

  if (input.length > 64) {
    throw new Error("Input can have no more than 64 items");
  }

  const shuffledInput = shuffle(input);
  const matchups: Matchups = [];

  // Create matchups based on the shuffled input
  for (let i = 0; i < shuffledInput.length; i += 2) {
    const matchup: Matchup = {
      a: shuffledInput[i],
      b: shuffledInput[i + 1],
      winner: null,
    };
    matchups.push(matchup);
  }

  return matchups;
}

export function getWinners(matchups: Matchups): Winner[] {
  const winners: Winner[] = [];
  for (const matchup of matchups) {
    if (matchup.winner !== null) {
      winners.push(matchup.winner);
    }
  }
  return winners;
}
