import type { Voice } from '@/types/sound';

export const MASTER_VOLUME = 0.22;

export const NOISE_FILTER_Q = 1.4;

export const SOUNDS = {
  tap: [
    {
      wave: 'triangle',
      frequency: 720,
      glideTo: 560,
      duration: 0.05,
      volume: 0.3,
    },
  ],
  select: [
    {
      wave: 'triangle',
      frequency: 880,
      glideTo: 1320,
      duration: 0.08,
      volume: 0.35,
    },
  ],
  deselect: [
    {
      wave: 'triangle',
      frequency: 880,
      glideTo: 560,
      duration: 0.08,
      volume: 0.3,
    },
  ],
  slide: [{ wave: 'sine', frequency: 1500, duration: 0.03, volume: 0.25 }],
  step: [
    { wave: 'triangle', frequency: 523, duration: 0.07, volume: 0.35 },
    { wave: 'triangle', frequency: 784, at: 0.06, duration: 0.1, volume: 0.35 },
  ],
  add: [
    { wave: 'triangle', frequency: 659, duration: 0.05, volume: 0.35 },
    {
      wave: 'triangle',
      frequency: 988,
      at: 0.045,
      duration: 0.09,
      volume: 0.35,
    },
  ],
  remove: [
    {
      wave: 'triangle',
      frequency: 523,
      glideTo: 330,
      duration: 0.12,
      volume: 0.35,
    },
  ],
  move: [
    { wave: 'sine', frequency: 587, glideTo: 880, duration: 0.06, volume: 0.4 },
    {
      wave: 'sine',
      frequency: 880,
      glideTo: 1175,
      at: 0.05,
      duration: 0.07,
      volume: 0.3,
    },
  ],
  shuffle: [
    { wave: 'triangle', frequency: 523, duration: 0.04, volume: 0.3 },
    { wave: 'triangle', frequency: 659, at: 0.05, duration: 0.04, volume: 0.3 },
    { wave: 'triangle', frequency: 587, at: 0.1, duration: 0.04, volume: 0.3 },
    { wave: 'triangle', frequency: 784, at: 0.15, duration: 0.04, volume: 0.3 },
    { wave: 'triangle', frequency: 698, at: 0.2, duration: 0.04, volume: 0.3 },
    {
      wave: 'triangle',
      frequency: 1047,
      at: 0.25,
      duration: 0.12,
      volume: 0.3,
    },
  ],
  ready: [
    { wave: 'sine', frequency: 440, duration: 0.07, volume: 0.4 },
    { wave: 'sine', frequency: 660, at: 0.06, duration: 0.12, volume: 0.4 },
  ],
  fate: [{ wave: 'square', frequency: 1180, duration: 0.02, volume: 0.12 }],
  fateLand: [
    { wave: 'triangle', frequency: 988, duration: 0.06, volume: 0.45 },
    {
      wave: 'triangle',
      frequency: 1319,
      at: 0.05,
      duration: 0.16,
      volume: 0.45,
    },
  ],
  peek: [
    {
      wave: 'noise',
      frequency: 600,
      glideTo: 2400,
      duration: 0.28,
      volume: 0.35,
    },
  ],
  swap: [
    {
      wave: 'noise',
      frequency: 2400,
      glideTo: 700,
      duration: 0.18,
      volume: 0.3,
    },
    {
      wave: 'triangle',
      frequency: 784,
      glideTo: 988,
      at: 0.08,
      duration: 0.08,
      volume: 0.3,
    },
  ],
  penalty: [
    {
      wave: 'square',
      frequency: 247,
      glideTo: 185,
      duration: 0.16,
      volume: 0.25,
    },
  ],
  start: [
    { wave: 'noise', frequency: 3200, duration: 0.05, volume: 0.9 },
    { wave: 'noise', frequency: 1800, duration: 0.08, volume: 0.5 },
    { wave: 'triangle', frequency: 392, at: 0.06, duration: 0.1, volume: 0.4 },
    { wave: 'triangle', frequency: 784, at: 0.14, duration: 0.18, volume: 0.4 },
  ],
  tick: [
    {
      wave: 'sine',
      frequency: 1900,
      glideTo: 1600,
      duration: 0.03,
      volume: 0.45,
    },
    { wave: 'noise', frequency: 5000, duration: 0.012, volume: 0.25 },
  ],
  tock: [
    {
      wave: 'sine',
      frequency: 1300,
      glideTo: 1100,
      duration: 0.04,
      volume: 0.45,
    },
    { wave: 'noise', frequency: 3500, duration: 0.012, volume: 0.25 },
  ],
  tickTense: [
    {
      wave: 'sine',
      frequency: 2100,
      glideTo: 1800,
      duration: 0.04,
      volume: 0.8,
    },
    { wave: 'noise', frequency: 5000, duration: 0.015, volume: 0.4 },
    { wave: 'sine', frequency: 110, glideTo: 55, duration: 0.14, volume: 0.9 },
  ],
  tockTense: [
    {
      wave: 'sine',
      frequency: 1500,
      glideTo: 1250,
      duration: 0.05,
      volume: 0.8,
    },
    { wave: 'noise', frequency: 3500, duration: 0.015, volume: 0.4 },
  ],
  timeUp: [
    { wave: 'square', frequency: 147, duration: 0.75, hold: 0.5, volume: 0.4 },
    {
      wave: 'sawtooth',
      frequency: 152,
      duration: 0.75,
      hold: 0.5,
      volume: 0.3,
    },
    { wave: 'sine', frequency: 73, duration: 0.9, hold: 0.3, volume: 0.6 },
  ],
  guessed: [
    { wave: 'noise', frequency: 3200, duration: 0.05, volume: 0.8 },
    { wave: 'triangle', frequency: 784, at: 0.03, duration: 0.08, volume: 0.4 },
    {
      wave: 'triangle',
      frequency: 1175,
      at: 0.09,
      duration: 0.14,
      volume: 0.4,
    },
  ],
  hit: [
    { wave: 'triangle', frequency: 1047, duration: 0.07, volume: 0.45 },
    {
      wave: 'triangle',
      frequency: 1568,
      at: 0.05,
      duration: 0.14,
      volume: 0.45,
    },
  ],
  miss: [
    {
      wave: 'triangle',
      frequency: 392,
      glideTo: 262,
      duration: 0.2,
      volume: 0.4,
    },
  ],
  win: [
    { wave: 'triangle', frequency: 523, duration: 0.1, volume: 0.4 },
    { wave: 'triangle', frequency: 659, at: 0.09, duration: 0.1, volume: 0.4 },
    { wave: 'triangle', frequency: 784, at: 0.18, duration: 0.1, volume: 0.4 },
    {
      wave: 'triangle',
      frequency: 1047,
      at: 0.27,
      duration: 0.5,
      hold: 0.1,
      volume: 0.4,
    },
    {
      wave: 'sine',
      frequency: 523,
      at: 0.27,
      duration: 0.6,
      hold: 0.1,
      volume: 0.3,
    },
    { wave: 'sine', frequency: 784, at: 0.27, duration: 0.6, volume: 0.25 },
  ],
  creep: [
    {
      wave: 'sine',
      frequency: 330,
      glideTo: 233,
      duration: 0.35,
      volume: 0.35,
    },
    {
      wave: 'sine',
      frequency: 349,
      glideTo: 247,
      at: 0.02,
      duration: 0.35,
      volume: 0.2,
    },
  ],
} as const satisfies Record<string, readonly Voice[]>;
