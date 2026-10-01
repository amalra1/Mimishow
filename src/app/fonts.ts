import { Outfit, Special_Elite, Unbounded } from 'next/font/google';

export const headline = Unbounded({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-headline',
});

export const body = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

export const whisper = Special_Elite({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-whisper',
});

export const fontClassNames = `${headline.variable} ${body.variable} ${whisper.variable}`;
