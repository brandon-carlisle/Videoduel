export function getCurrentRound(length: number) {
  if (length === 1) {
    return "Final 🏆";
  } else if (length <= 2) {
    return "Semi Finals 🥊";
  } else if (length <= 4) {
    return "Quarter Finals 🥊";
  } else if (length <= 8) {
    return "Round of 16 🎯";
  } else if (length <= 16) {
    return "Round of 32 🛡️";
  } else if (length <= 32) {
    return "Round of 64 ⚔️";
  } else {
    return "Unknown";
  }
}
