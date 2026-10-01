'use client';

import { ROUTES } from '@/constants/routes';
import { AUTHOR_URL } from '@/constants/site';
import { cx } from '@/lib/classNames';
import { useCopy } from '@/hooks/useCopy';
import { useMascotLine } from '@/hooks/useMascotLine';
import Mimi from '@/components/mascot/Mimi/Mimi';
import Icon from '@/components/ornaments/Icon/Icon';
import ButtonLink from '@/components/ui/ButtonLink/ButtonLink';
import type { IconName } from '@/types/icon';
import styles from './Rules.module.css';

const STEP_ICONS: IconName[] = [
  'users',
  'eye',
  'refresh',
  'hand',
  'star',
  'crown',
];

export default function Rules() {
  const { rules, home } = useCopy();
  const line = useMascotLine('rules', 1, true);

  return (
    <article className={cx('page', styles.rules)}>
      <header className={styles.heading}>
        <p className={cx(styles.kicker, 'label')}>{rules.kicker}</p>
        <h1 className={cx(styles.title, 'headline')}>{rules.title}</h1>
        <p className={styles.intro}>{rules.intro}</p>
      </header>

      <Mimi mood="sly" line={line} size="sm" />

      <ol className={styles.script}>
        {rules.steps.map((step, index) => (
          <li key={step.title} className={styles.step}>
            <span className={styles.orb} aria-hidden="true">
              <Icon name={STEP_ICONS[index]} className={styles.icon} />
            </span>
            <div className={styles.text}>
              <h2 className={cx(styles.stepTitle, 'headline')}>{step.title}</h2>
              <p className={styles.body}>{step.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <p className={styles.forbidden}>
        <Icon name="hand" className={styles.hand} />
        <span>{rules.forbidden}</span>
      </p>

      <ButtonLink href={ROUTES.create} size="lg" block icon="arrowRight">
        {rules.start}
      </ButtonLink>

      <p className={styles.credit}>
        {home.credit}{' '}
        <a href={AUTHOR_URL} target="_blank" rel="noopener noreferrer">
          {home.author}
        </a>
      </p>
    </article>
  );
}
