import { useId } from 'react';
import styles from './Mascot.module.css';

const CLOAK_PATH =
  'M100 112C72 116 56 136 54 166C52 192 46 214 36 240C46 232 54 234 60 246C66 234 74 232 82 244C88 232 96 230 102 246C108 232 116 232 122 244C128 232 138 232 142 242C150 232 158 232 166 240C156 214 150 192 148 166C146 136 128 116 100 112Z';
const SMOKE_PATHS = [
  'M80 150C76 180 74 205 70 232',
  'M100 140C100 175 98 205 100 236',
  'M120 150C124 180 128 205 132 232',
];
const RUFF_PATH = 'M72 121l7 6 7-6 7 6 7-6 7 6 7-6 7 6 7-6';

export default function MascotBody() {
  const gradientId = useId();

  return (
    <g className={styles.body}>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8d6bb5" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#8d6bb5" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g className={styles.cloak}>
        <path
          className={styles.cloakShape}
          d={CLOAK_PATH}
          fill={`url(#${gradientId})`}
        />
        {SMOKE_PATHS.map((path) => (
          <path key={path} className={styles.smoke} d={path} />
        ))}
      </g>
      <path className={styles.ruff} d={RUFF_PATH} />
    </g>
  );
}
