'use client';

import { wordBanks } from '@/data/words';
import { cx } from '@/lib/classNames';
import { parseWordKey, wordFor } from '@/lib/deck';
import { fill } from '@/lib/format';
import { canSkip, skipCost } from '@/lib/game';
import { unlockAudio } from '@/lib/sound';
import { useCopy } from '@/hooks/useCopy';
import { useLanguage } from '@/hooks/useLanguage';
import { useMascotLine } from '@/hooks/useMascotLine';
import { useToast } from '@/hooks/useToast';
import { useTurn } from '@/hooks/useTurn';
import Button from '@/components/ui/Button/Button';
import CurtainCard from '@/components/ui/CurtainCard/CurtainCard';
import Toast from '@/components/ui/Toast/Toast';
import PhaseFrame from '@/components/sections/Stage/PhaseFrame';
import FateBadge from './FateBadge';
import styles from './WordReveal.module.css';

export default function WordReveal() {
  const { stage } = useCopy();
  const copy = stage.reveal;
  const { language } = useLanguage();
  const { state, turn, skipWord, startActing } = useTurn();
  const { toast, showToast } = useToast();
  const allowed = canSkip(state);
  const revealLine = useMascotLine('reveal', state.turnIndex);
  const brokeLine = useMascotLine('noSkips', state.turnIndex);
  const { freeSkips } = state.settings;
  const skips = turn?.skips ?? 0;
  const freeLeft = Math.max(freeSkips - skips, 0);
  const nextCost = skipCost(skips + 1, freeSkips);
  const parsed = turn?.wordKey ? parseWordKey(turn.wordKey) : null;

  const skipInfo = !allowed
    ? copy.noPoints
    : nextCost
      ? fill(copy.skipPenalty, { points: nextCost })
      : freeLeft === 1
        ? copy.skipsFreeOne
        : fill(copy.skipsFree, { count: freeLeft });

  const onSkip = () => {
    skipWord();
    showToast(
      nextCost
        ? fill(stage.skipPenaltyToast, { points: nextCost })
        : copy.skipped,
    );
  };

  const onStart = () => {
    unlockAudio();
    startActing();
  };

  return (
    <PhaseFrame
      mood={allowed ? 'sly' : 'creep'}
      line={allowed ? revealLine : brokeLine}
      kicker={copy.kicker}
      actions={
        <>
          <Button size="lg" block icon="play" sound="start" onClick={onStart}>
            {copy.start}
          </Button>
          <Button
            variant="ghost"
            block
            icon="refresh"
            sound={nextCost ? 'penalty' : 'swap'}
            disabled={!allowed}
            onClick={onSkip}
          >
            {copy.skip}
          </Button>
          <p className={cx(styles.info, nextCost > 0 && styles.cost)}>
            {skipInfo}
          </p>
        </>
      }
    >
      <FateBadge
        difficulty={turn?.difficulty ?? 'easy'}
        category={parsed?.category ?? null}
      />
      <CurtainCard
        key={turn?.wordKey}
        label={copy.hold}
        holdingLabel={copy.holding}
        hint={copy.holdHint}
      >
        {wordFor(wordBanks[language], turn?.wordKey ?? null)}
      </CurtainCard>
      <Toast toast={toast} />
    </PhaseFrame>
  );
}
