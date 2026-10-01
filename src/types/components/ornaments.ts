import type { CSSProperties } from 'react';
import type { IconName } from '@/types/icon';
import type { OrnamentName } from '@/types/ornament';

export interface OrnamentProps {
  className?: string;
  style?: CSSProperties;
}

export interface IconProps extends OrnamentProps {
  name: IconName;
  strokeWidth?: number;
}

export interface OrnamentGlyphProps extends OrnamentProps {
  name: OrnamentName;
}

export interface DividerProps {
  center?: OrnamentName;
  className?: string;
}
