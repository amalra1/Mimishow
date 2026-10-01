'use client';

import { cx } from '@/lib/classNames';
import { fill } from '@/lib/format';
import { useCopy } from '@/hooks/useCopy';
import { useMascotLine } from '@/hooks/useMascotLine';
import { useTurn } from '@/hooks/useTurn';
import Button from '@/components/ui/Button/Button';
import PhaseFrame from '@/components/sections/Stage/PhaseFrame';
import Scoreboard from '@/components/sections/Scoreboard/Scoreboard';
import styles from './Handoff.module.css';

export default function Handoff() {
  const { stage } = useCopy();
  const copy = stage.handoff;
  const { state, ready, performerName, teams, sideId, sideName, tone } =
    useTurn();
  const line = useMascotLine('handoff', state.turnIndex);

  return (
    <PhaseFrame
      mood="shh"
      line={line}
      kicker={copy.kicker}
      title={copy.title}
      actions={
        <Button size="lg" block icon="eye" sound="ready" onClick={ready}>
          {copy.ready}
        </Button>
      }
    >
      <p className={cx(styles.name, tone, 'headline')}>{performerName}</p>
      {teams && (
        <p className={cx(styles.team, tone, 'label')}>
          {fill(copy.team, { team: sideName })}
        </p>
      )}
      <p className={styles.hint}>{fill(copy.hint, { name: performerName })}</p>
      <Scoreboard highlightId={sideId} />
    </PhaseFrame>
  );
}
