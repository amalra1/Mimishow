'use client';

import { useRef } from 'react';
import { ROUTES } from '@/constants/routes';
import { AUTHOR_URL } from '@/constants/site';
import { cx } from '@/lib/classNames';
import { useCopy } from '@/hooks/useCopy';
import { useGame } from '@/hooks/useGame';
import { useMascotLine } from '@/hooks/useMascotLine';
import Mimi from '@/components/mascot/Mimi/Mimi';
import Divider from '@/components/ornaments/Divider/Divider';
import Emblem from '@/components/ornaments/Emblem/Emblem';
import ButtonLink from '@/components/ui/ButtonLink/ButtonLink';
import { useHomeAnimation } from './useHomeAnimation';
import styles from './Home.module.css';

export default function Home() {
  const { home } = useCopy();
  const { state, hydrated } = useGame();
  const line = useMascotLine('home', 0, true);
  const ref = useRef<HTMLElement>(null);
  useHomeAnimation(ref);
  const canResume = hydrated && state.status !== 'idle';

  return (
    <section ref={ref} className={styles.home}>
      <Emblem className={styles.emblem} />
      <div className={styles.inner}>
        <div className={styles.intro}>
          <p className={cx(styles.kicker, 'label')}>{home.kicker}</p>
          <h1 className={cx(styles.title, 'headline')}>
            <span>{home.titleMain}</span>
            <span className={styles.accent}>{home.titleAccent}</span>
          </h1>
          <Divider className={styles.divider} />
        </div>
        <Mimi
          mood="idle"
          line={line}
          size="lg"
          trackPointer
          className={styles.mimi}
        />
        <p className={styles.tagline}>{home.tagline}</p>
        <div className={styles.actions}>
          <ButtonLink
            href={ROUTES.create}
            variant="yellow"
            size="lg"
            block
            icon="arrowRight"
          >
            {home.start}
          </ButtonLink>
          {canResume && (
            <ButtonLink
              href={ROUTES.play}
              variant="ghost"
              block
              icon="refresh"
              className={styles.resume}
            >
              {home.resume}
            </ButtonLink>
          )}
          <ButtonLink href={ROUTES.rules} variant="quiet" icon="eye">
            {home.rules}
          </ButtonLink>
        </div>
        <p className={styles.credit}>
          {home.credit}{' '}
          <a href={AUTHOR_URL} target="_blank" rel="noopener noreferrer">
            {home.author}
          </a>
        </p>
      </div>
    </section>
  );
}
