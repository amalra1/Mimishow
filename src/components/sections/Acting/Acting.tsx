'use client';

import { useCallback, useEffect } from 'react';
import { TENSE_SECONDS } from '@/constants/game';
import { HAPTIC_ALARM_PATTERN } from '@/constants/motion';
import { cx } from '@/lib/classNames';
import { fill } from '@/lib/format';
import { useCopy } from '@/hooks/useCopy';
import { useCountdown } from '@/hooks/useCountdown';
import { useMascotLine } from '@/hooks/useMascotLine';
import { useSound } from '@/hooks/useSound';
import { useTurn } from '@/hooks/useTurn';
import { useWakeLock } from '@/hooks/useWakeLock';
import Emblem from '@/components/ornaments/Emblem/Emblem';
import Button from '@/components/ui/Button/Button';
import Timer from '@/components/ui/Timer/Timer';
import PhaseFrame from '@/components/sections/Stage/PhaseFrame';
import styles from './Acting.module.css';

export default function Acting() {
  const { stage } = useCopy();
  const copy = stage.acting;
  const { state, turn, stopActing } = useTurn();
  const { play } = useSound();
  useWakeLock(true);

  const onExpire = useCallback(() => {
    play('timeUp');
    navigator.vibrate?.(HAPTIC_ALARM_PATTERN);
    stopActing();
  }, [play, stopActing]);

  const seconds = useCountdown({ endsAt: turn?.endsAt ?? null, onExpire });
  const tense = seconds <= TENSE_SECONDS;
  const line = useMascotLine(tense ? 'tense' : 'acting', state.turnIndex);

  useEffect(() => {
    if (seconds <= 0) return;
    const tick = seconds % 2 === 0;
    if (tense) play(tick ? 'tickTense' : 'tockTense');
    else play(tick ? 'tick' : 'tock');
  }, [seconds, tense, play]);

  return (
    <PhaseFrame
      mood={tense ? 'tense' : 'delight'}
      line={line}
      kicker={copy.kicker}
      actions={
        <Button
          variant="yellow"
          size="lg"
          block
          icon="star"
          sound="guessed"
          onClick={stopActing}
        >
          {copy.guessed}
        </Button>
      }
    >
      <p className={cx(styles.silence, 'whisper')}>{copy.silence}</p>
      <div className={styles.clock}>
        <Emblem className={styles.emblem} />
        <Timer
          seconds={seconds}
          total={state.settings.turnSeconds}
          tense={tense}
          label={fill(copy.secondsLeft, { seconds })}
        />
      </div>
    </PhaseFrame>
  );
}
