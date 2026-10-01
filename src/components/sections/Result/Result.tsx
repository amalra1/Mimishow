'use client';

import { wordBanks } from '@/data/words';
import { cx } from '@/lib/classNames';
import { wordFor } from '@/lib/deck';
import { fill } from '@/lib/format';
import { playerName } from '@/lib/game';
import { useCopy } from '@/hooks/useCopy';
import { useLanguage } from '@/hooks/useLanguage';
import { useMascotLine } from '@/hooks/useMascotLine';
import { useTurn } from '@/hooks/useTurn';
import Button from '@/components/ui/Button/Button';
import SparkBurst from '@/components/ui/SparkBurst/SparkBurst';
import PhaseFrame from '@/components/sections/Stage/PhaseFrame';
import Scoreboard from '@/components/sections/Scoreboard/Scoreboard';
import styles from './Result.module.css';

export default function Result() {
  const { stage } = useCopy();
  const copy = stage.result;
  const { language } = useLanguage();
  const { state, turn, nextTurn, teams, performerName, sideId, sideName } =
    useTurn();
  const outcome = turn?.outcome;
  const guesserId = outcome?.guesserId ?? null;
  const hit = guesserId !== null;
  const line = useMascotLine(hit ? 'hit' : 'miss', state.turnIndex);
  const guesserName = teams ? sideName : playerName(state, guesserId ?? '');
  const scorers = teams
    ? sideName
    : fill(copy.pair, { a: performerName, b: guesserName });

  return (
    <PhaseFrame
      mood={hit ? 'cheer' : 'sad'}
      line={line}
      kicker={fill(copy.word, {
        word: wordFor(wordBanks[language], turn?.wordKey ?? null),
      })}
      title={hit ? fill(copy.hit, { name: guesserName }) : copy.miss}
      actions={
        <Button
          size="lg"
          block
          icon="arrowRight"
          sound="step"
          onClick={nextTurn}
        >
          {copy.next}
        </Button>
      }
    >
      {hit && (
        <div className={styles.points}>
          <SparkBurst active />
          <p className={cx(styles.value, 'headline')}>+{outcome?.points}</p>
          <p className={styles.scorers}>
            {fill(copy.points, {
              points: outcome?.points ?? 0,
              names: scorers,
            })}
          </p>
        </div>
      )}
      <Scoreboard highlightId={hit ? sideId : null} />
    </PhaseFrame>
  );
}
