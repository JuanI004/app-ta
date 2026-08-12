import { pickRandomIndex } from "./rng";

export function drawWords(pool, count, random = Math.random) {
  const remaining = [...pool];
  const drawn = [];

  while (drawn.length < count && remaining.length > 0) {
    const index = pickRandomIndex(remaining.length, random);
    const [word] = remaining.splice(index, 1);
    drawn.push(word);
  }

  return { drawn, remaining };
}
