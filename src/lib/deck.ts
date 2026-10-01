import { CATEGORIES, DIFFICULTIES, WORD_KEY_SEPARATOR } from '@/constants/game';
import { cryptoRandom, randomInt } from '@/lib/random';
import type { Category, Difficulty, DrawnWord, WordBank } from '@/types/game';

function isDifficulty(value: string): value is Difficulty {
  return DIFFICULTIES.some((difficulty) => difficulty === value);
}

function isCategory(value: string): value is Category {
  return CATEGORIES.some((category) => category === value);
}

export function toWordKey(
  category: Category,
  difficulty: Difficulty,
  index: number,
) {
  return [category, difficulty, index].join(WORD_KEY_SEPARATOR);
}

export function parseWordKey(key: string) {
  const [category, difficulty, rawIndex] = key.split(WORD_KEY_SEPARATOR);
  const index = Number(rawIndex);
  if (!isCategory(category) || !isDifficulty(difficulty)) return null;
  if (!Number.isInteger(index)) return null;
  return { category, difficulty, index };
}

export function wordFor(bank: WordBank, key: string | null) {
  const parsed = key ? parseWordKey(key) : null;
  if (!parsed) return '';
  return bank[parsed.category][parsed.difficulty][parsed.index] ?? '';
}

export function randomDifficulty(random = cryptoRandom) {
  return DIFFICULTIES[randomInt(DIFFICULTIES.length, random)];
}

export function drawWord(
  difficulty: Difficulty,
  categories: readonly Category[],
  usedWords: readonly string[],
  bank: WordBank,
  random = cryptoRandom,
): DrawnWord {
  const pool = categories.flatMap((category) =>
    bank[category][difficulty].map((_, index) =>
      toWordKey(category, difficulty, index),
    ),
  );
  const inPool = new Set(pool);
  const available = pool.filter((key) => !usedWords.includes(key));
  const exhausted = available.length === 0;
  const choices = exhausted ? pool : available;
  const wordKey = choices[randomInt(choices.length, random)];
  const kept = exhausted
    ? usedWords.filter((key) => !inPool.has(key))
    : usedWords;
  return { wordKey, usedWords: [...kept, wordKey] };
}
