'use client';

import { ROUTES } from '@/constants/routes';
import { cx } from '@/lib/classNames';
import { useCopy } from '@/hooks/useCopy';
import { useMascotLine } from '@/hooks/useMascotLine';
import Mimi from '@/components/mascot/Mimi/Mimi';
import ButtonLink from '@/components/ui/ButtonLink/ButtonLink';
import styles from './Stage.module.css';

export default function StageEmpty() {
  const { stage } = useCopy();
  const line = useMascotLine('empty', 0, true);

  return (
    <section className={cx('page', styles.empty)}>
      <Mimi mood="sad" line={line} />
      <h1 className={cx(styles.title, 'headline')}>{stage.empty.title}</h1>
      <p className={styles.lead}>{stage.empty.description}</p>
      <ButtonLink href={ROUTES.create} size="lg" icon="arrowRight">
        {stage.empty.start}
      </ButtonLink>
    </section>
  );
}
