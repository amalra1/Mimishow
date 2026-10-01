'use client';

import Link from 'next/link';
import { PORTUGUESE_LANGUAGE } from '@/constants/language';
import { ROUTES } from '@/constants/routes';
import { cx } from '@/lib/classNames';
import { unlockAudio } from '@/lib/sound';
import { useCopy } from '@/hooks/useCopy';
import { useLanguage } from '@/hooks/useLanguage';
import { useScrolled } from '@/hooks/useScrolled';
import { useSound } from '@/hooks/useSound';
import Icon from '@/components/ornaments/Icon/Icon';
import styles from './TopControls.module.css';

export default function TopControls() {
  const { meta } = useCopy();
  const { language, toggleLanguage } = useLanguage();
  const { muted, toggleMuted, play } = useSound();
  const soundLabel = muted ? meta.soundOn : meta.soundOff;
  const scrolled = useScrolled();

  const onSound = () => {
    unlockAudio();
    toggleMuted();
    play('select');
  };

  const onLanguage = () => {
    play('tap');
    toggleLanguage();
  };

  return (
    <nav className={cx(styles.controls, scrolled && styles.scrolled)}>
      <Link
        href={ROUTES.home}
        className={styles.orb}
        aria-label={meta.home}
        onClick={() => play('tap')}
      >
        <Icon name="mask" className={styles.icon} />
      </Link>
      <div className={styles.group}>
        <button
          type="button"
          className={cx(styles.orb, muted && styles.off)}
          onClick={onSound}
          aria-label={soundLabel}
          aria-pressed={!muted}
          title={soundLabel}
        >
          <Icon name={muted ? 'mute' : 'sound'} className={styles.icon} />
        </button>
        <button
          type="button"
          className={cx(styles.orb, styles.language, 'label')}
          onClick={onLanguage}
          aria-label={meta.language}
          title={meta.language}
        >
          {language === PORTUGUESE_LANGUAGE ? 'PT' : 'EN'}
        </button>
      </div>
    </nav>
  );
}
