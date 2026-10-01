import { describe, expect, it } from 'vitest';
import { CATEGORIES, DIFFICULTIES } from '@/constants/game';
import { wordBanks } from '@/data/words';
import {
  drawWord,
  parseWordKey,
  randomDifficulty,
  toWordKey,
  wordFor,
} from '@/lib/deck';
import type { WordBank } from '@/types/game';

const first = () => 0;

const tinyBank = {
  ...wordBanks.en,
  animals: { easy: ['Dog', 'Cat'], medium: [], hard: [] },
  food: { easy: ['Pizza'], medium: [], hard: [] },
} satisfies WordBank;

describe('deck', () => {
  it('fills every category and difficulty in both languages, aligned', () => {
    CATEGORIES.forEach((category) =>
      DIFFICULTIES.forEach((difficulty) => {
        const pt = wordBanks['pt-BR'][category][difficulty];
        const en = wordBanks.en[category][difficulty];
        expect(pt.length).toBeGreaterThan(0);
        expect(pt.length).toBe(en.length);
      }),
    );
  });

  it('never repeats a word across the whole bank', () => {
    Object.values(wordBanks).forEach((bank) => {
      const words = Object.values(bank).flatMap((cell) =>
        Object.values(cell).flat(),
      );
      expect(new Set(words).size).toBe(words.length);
    });
  });

  it('round-trips word keys and resolves them per language', () => {
    const key = toWordKey('animals', 'easy', 0);
    expect(parseWordKey(key)).toEqual({
      category: 'animals',
      difficulty: 'easy',
      index: 0,
    });
    expect(parseWordKey('nope:easy:1')).toBeNull();
    expect(wordFor(wordBanks['pt-BR'], key)).toBe('Cachorro');
    expect(wordFor(wordBanks.en, key)).toBe('Dog');
  });

  it('draws only from the chosen categories without repeating', () => {
    const drawn = drawWord(
      'easy',
      ['animals'],
      ['animals:easy:0', 'food:easy:0'],
      tinyBank,
      first,
    );
    expect(drawn.wordKey).toBe('animals:easy:1');
  });

  it('reshuffles only the exhausted pool', () => {
    const drawn = drawWord(
      'easy',
      ['animals'],
      ['animals:easy:0', 'animals:easy:1', 'food:easy:0'],
      tinyBank,
      first,
    );
    expect(drawn.wordKey).toBe('animals:easy:0');
    expect(drawn.usedWords).toEqual(['food:easy:0', 'animals:easy:0']);
  });

  it('picks every difficulty with a uniform draw', () => {
    expect(randomDifficulty(() => 0)).toBe('easy');
    expect(randomDifficulty(() => 0.5)).toBe('medium');
    expect(randomDifficulty(() => 0.99)).toBe('hard');
  });
});
