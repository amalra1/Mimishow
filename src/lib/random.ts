import type { RandomSource } from '@/types/game';

const UINT32_RANGE = 2 ** 32;

export const cryptoRandom: RandomSource = () => {
  const buffer = new Uint32Array(1);
  crypto.getRandomValues(buffer);
  return buffer[0] / UINT32_RANGE;
};

export function randomInt(maxExclusive: number, random = cryptoRandom) {
  return Math.floor(random() * maxExclusive);
}

export function shuffle<T>(items: readonly T[], random = cryptoRandom) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swap = randomInt(index + 1, random);
    [result[index], result[swap]] = [result[swap], result[index]];
  }
  return result;
}
