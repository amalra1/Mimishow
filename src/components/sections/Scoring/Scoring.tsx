'use client';

import { wordBanks } from '@/data/words';
import { cx } from '@/lib/classNames';
import { wordFor } from '@/lib/deck';
import { fill } from '@/lib/format';
import { useCopy } from '@/hooks/useCopy';
import { useLanguage } from '@/hooks/useLanguage';
import { useMascotLine } from '@/hooks/useMascotLine';
import { useSound } from '@/hooks/useSound';
import { useTurn } from '@/hooks/useTurn';
import Button from '@/components/ui/Button/Button';
import PhaseFrame from '@/components/sections/Stage/PhaseFrame';
import styles from './Scoring.module.css';

export default function Scoring() {
  const { stage } = useCopy();
  const copy = stage.scoring;
  const { language } = useLanguage();
  const { state, turn, award, teams, sideId, sideName } = useTurn();
  const line = useMascotLine('scoring', state.turnIndex);
  const { play } = useSound();
  const guessers = state.players.filter(({ id }) => id !== turn?.performerId);

  return (
    <PhaseFrame
      mood="creep"
      line={line}
      kicker={copy.kicker}
      title={copy.title}
      actions={
        <Button
          variant="ghost"
          block
          icon="close"
          sound="miss"
          onClick={() => award(null)}
        >
          {copy.nobody}
        </Button>
      }
    >
      <p className={styles.word}>
        <span className="label">{copy.wordWas}</span>
        <span className={cx(styles.answer, 'headline')}>
          {wordFor(wordBanks[language], turn?.wordKey ?? null)}
        </span>
      </p>
      {teams ? (
        <Button
          size="lg"
          block
          icon="star"
          sound="hit"
          onClick={() => award(sideId)}
        >
          {fill(copy.teamGuessed, { team: sideName })}
        </Button>
      ) : (
        <>
          <p className={styles.hint}>{copy.pick}</p>
          <ul className={styles.guessers}>
            {guessers.map((player) => (
              <li key={player.id}>
                <button
                  type="button"
                  className={styles.guesser}
                  onClick={() => {
                    play('hit');
                    award(player.id);
                  }}
                >
                  {player.name}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </PhaseFrame>
  );
}
