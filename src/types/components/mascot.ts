import type { MascotMood, MimiSize } from '@/types/mascot';

export interface MascotProps {
  mood?: MascotMood;
  trackPointer?: boolean;
  className?: string;
}

export interface MascotMaskProps {
  mood: MascotMood;
}

export interface MimiProps {
  mood: MascotMood;
  line: string;
  size?: MimiSize;
  trackPointer?: boolean;
  className?: string;
}

export interface MimiWhisperProps {
  text: string;
  className?: string;
}

export interface MascotPupilsProps {
  y?: number;
  small?: boolean;
}
