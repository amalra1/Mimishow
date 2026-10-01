'use client';

import { useEffect } from 'react';
import { ROUTES } from '@/constants/routes';
import { wordBanks } from '@/data/words';
import { cx } from '@/lib/classNames';
import { wordFor } from '@/lib/deck';
import { fill } from '@/lib/format';
import { sideName } from '@/lib/game';
import { useCopy } from '@/hooks/useCopy';
import { useGame } from '@/hooks/useGame';
import { useLanguage } from '@/hooks/useLanguage';
import { useMascotLine } from '@/hooks/useMascotLine';
import { useSound } from '@/hooks/useSound';
import Mimi from '@/components/mascot/Mimi/Mimi';
import Divider from '@/components/ornaments/Divider/Divider';
import Emblem from '@/components/ornaments/Emblem/Emblem';
import Button from '@/components/ui/Button/Button';
import ButtonLink from '@/components/ui/ButtonLink/ButtonLink';
import SparkBurst from '@/components/ui/SparkBurst/SparkBurst';
import Scoreboard from '@/components/sections/Scoreboard/Scoreboard';
import styles from './Winner.module.css';

export default function Winner() {
  const { winner } = useCopy();
  const { language } = useLanguage();
  const { state, rematch } = useGame();
  const line = useMascotLine('winner', state.turnIndex);
  const { play } = useSound();
  const { winnerId, turn } = state;
  const score = winnerId ? (state.scores[winnerId] ?? 0) : 0;
  const outcome = turn?.outcome;
  const lastGuesser =
    state.mode === 'teams'
      ? sideName(state, winnerId)
      : sideName(state, outcome?.guesserId ?? null);

  useEffect(() => {
    play('win');
  }, [play]);

  return (
    <section className={cx('page', styles.winner)}>
      <Mimi mood="cheer" line={line} />
      <div className={styles.crown}>
        <Emblem className={styles.emblem} />
        <SparkBurst active />
        <p className={cx(styles.kicker, 'label')}>{winner.kicker}</p>
        <h1 className={cx(styles.name, 'headline')}>
          {sideName(state, winnerId)}
        </h1>
        <Divider center="star" className={styles.divider} />
        <p className={cx(styles.score, 'headline')}>
          {fill(winner.subtitle, { score })}
        </p>
        {outcome?.guesserId && (
          <p className={cx(styles.last, 'whisper')}>
            {fill(winner.lastHit, {
              name: lastGuesser,
              word: wordFor(wordBanks[language], turn?.wordKey ?? null),
              points: outcome.points,
            })}
          </p>
        )}
      </div>
      <Scoreboard highlightId={winnerId} className={styles.board} />
      <div className={styles.actions}>
        <Button size="lg" block icon="refresh" sound="start" onClick={rematch}>
          {winner.rematch}
        </Button>
        <ButtonLink href={ROUTES.create} variant="ghost" block icon="sparkle">
          {winner.newShow}
        </ButtonLink>
        <ButtonLink href={ROUTES.home} variant="quiet">
          {winner.home}
        </ButtonLink>
      </div>
    </section>
  );
}
