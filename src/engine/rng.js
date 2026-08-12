export function pickRandomIndex(length, random = Math.random) {
  return Math.floor(random() * length);
}
