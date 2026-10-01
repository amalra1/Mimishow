import type { SOUNDS } from '@/constants/sound';

export type Waveform = 'sine' | 'triangle' | 'square' | 'sawtooth' | 'noise';

export interface Voice {
  wave: Waveform;
  frequency: number;
  duration: number;
  glideTo?: number;
  at?: number;
  hold?: number;
  volume?: number;
}

export interface AudioSession {
  type: string;
}

export interface AudioSessionNavigator extends Navigator {
  audioSession?: AudioSession;
}

export type SoundName = keyof typeof SOUNDS;

export interface SoundContextValue {
  muted: boolean;
  toggleMuted: () => void;
  play: (name: SoundName) => void;
}
