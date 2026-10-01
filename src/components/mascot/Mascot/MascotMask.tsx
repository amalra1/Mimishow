import type { ReactNode } from 'react';
import type { MascotMaskProps } from '@/types/components/mascot';
import type { MascotMood } from '@/types/mascot';
import MascotPupils from './MascotPupils';
import styles from './Mascot.module.css';

const MASK_PATH = 'M62 44Q100 30 138 44Q146 94 100 130Q54 94 62 44Z';
const ALMOND =
  'M70 74Q82 62 94 74Q82 84 70 74ZM106 74Q118 62 130 74Q118 84 106 74Z';
const CRESCENT =
  'M70 78Q82 64 94 78Q82 72 70 78ZM106 78Q118 64 130 78Q118 72 106 78Z';

const FACES: Record<MascotMood, ReactNode> = {
  idle: (
    <>
      <path className={styles.hole} d={ALMOND} />
      <MascotPupils />
      <path className={styles.line} d="M86 101Q100 110 114 101" />
    </>
  ),
  sly: (
    <>
      <path
        className={styles.hole}
        d="M70 76Q82 70 94 76Q82 82 70 76ZM106 76Q118 70 130 76Q118 82 106 76Z"
      />
      <MascotPupils y={77} small />
      <path className={styles.line} d="M86 104Q104 109 117 95" />
    </>
  ),
  delight: (
    <>
      <path className={styles.hole} d={CRESCENT} />
      <path className={styles.hole} d="M82 96Q100 120 118 96Q100 104 82 96Z" />
    </>
  ),
  tense: (
    <>
      <circle className={styles.hole} cx="82" cy="74" r="9" />
      <circle className={styles.hole} cx="118" cy="74" r="9" />
      <MascotPupils small />
      <path
        className={styles.line}
        d="M84 105l4-4 4 4 4-4 4 4 4-4 4 4 4-4 4 4"
      />
    </>
  ),
  cheer: (
    <>
      <path className={styles.hole} d={CRESCENT} />
      <path className={styles.hole} d="M80 94Q100 128 120 94Q100 102 80 94Z" />
    </>
  ),
  sad: (
    <>
      <path
        className={styles.hole}
        d="M70 72Q84 70 94 78Q80 84 70 72ZM106 78Q116 70 130 72Q120 84 106 78Z"
      />
      <MascotPupils y={77} />
      <path className={styles.line} d="M86 110Q100 98 114 110" />
      <path className={styles.tear} d="M84 88q3.5 6 0 9.5q-3.5-3.5 0-9.5Z" />
    </>
  ),
  shh: (
    <>
      <path className={styles.line} d="M70 76Q82 82 94 76" />
      <path className={styles.hole} d="M106 74Q118 62 130 74Q118 84 106 74Z" />
      <g className={styles.pupils}>
        <circle className={styles.pupil} cx="118" cy="74" r="3.2" />
      </g>
      <circle className={styles.hole} cx="100" cy="105" r="4.5" />
    </>
  ),
  creep: (
    <>
      <path
        className={styles.hole}
        d="M68 74Q82 58 96 74Q82 88 68 74ZM104 74Q118 58 132 74Q118 88 104 74Z"
      />
      <MascotPupils small />
      <path className={styles.line} d="M74 98Q100 118 126 98" />
      <path
        className={styles.teeth}
        d="M86 104v5M94 107v5M102 107v5M110 105v5"
      />
    </>
  ),
};

export default function MascotMask({ mood }: MascotMaskProps) {
  return (
    <g className={styles.mask}>
      <path className={styles.face} d={MASK_PATH} />
      <path className={styles.diamond} d="M82 50l3 5-3 5-3-5Z" />
      <path className={styles.diamond} d="M128 82l2.5 4.5-2.5 4.5-2.5-4.5Z" />
      {FACES[mood]}
    </g>
  );
}
