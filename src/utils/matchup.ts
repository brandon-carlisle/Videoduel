export function generateMatchups(input: unknown[]) {
  if (input.length < 2) {
    throw new Error("Input needs at least 2 items");
  }

  if (input.length > 64) {
    throw new Error("Input can have no more than 64 items");
  }

  const shuffledInput = shuffle(input);

  const temp = [];

  for (let i = 0; i <= shuffledInput.length; i++) {
    console.log(shuffledInput[i]);
  }
}

export function shuffle(input: unknown[]) {
  return input
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}
