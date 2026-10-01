'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ROUTES } from '@/constants/routes';
import { cx } from '@/lib/classNames';
import { fill } from '@/lib/format';
import { roundAt } from '@/lib/game';
import { useCopy } from '@/hooks/useCopy';
import { useGame } from '@/hooks/useGame';
import { useMascotLine } from '@/hooks/useMascotLine';
import Button from '@/components/ui/Button/Button';
import ConfirmDialog from '@/components/ui/ConfirmDialog/ConfirmDialog';
import Acting from '@/components/sections/Acting/Acting';
import Handoff from '@/components/sections/Handoff/Handoff';
import Result from '@/components/sections/Result/Result';
import Scoring from '@/components/sections/Scoring/Scoring';
import Winner from '@/components/sections/Winner/Winner';
import WordReveal from '@/components/sections/WordReveal/WordReveal';
import StageEmpty from './StageEmpty';
import styles from './Stage.module.css';

const PHASES = {
  handoff: Handoff,
  reveal: WordReveal,
  acting: Acting,
  scoring: Scoring,
  result: Result,
};

export default function Stage() {
  const { stage, meta } = useCopy();
  const { state, hydrated, reset } = useGame();
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const confirmLine = useMascotLine('confirm', state.turnIndex);

  if (!hydrated) return <div className="page" />;
  if (state.status === 'finished') return <Winner />;
  if (state.status === 'idle' || !state.turn) return <StageEmpty />;

  const Phase = PHASES[state.turn.phase];

  const endShow = () => {
    setConfirming(false);
    reset();
    router.push(ROUTES.home);
  };

  return (
    <div className={cx('page', styles.stage)}>
      <div className={styles.topbar}>
        <span className={cx(styles.round, 'label')}>
          {fill(stage.round, { round: roundAt(state, state.turnIndex) })}
        </span>
        <Button
          variant="quiet"
          icon="close"
          sound="creep"
          onClick={() => setConfirming(true)}
        >
          {meta.endShow}
        </Button>
      </div>
      <Phase key={`${state.turnIndex}-${state.turn.phase}`} />
      <ConfirmDialog
        open={confirming}
        title={stage.confirmEnd.title}
        description={stage.confirmEnd.description}
        confirmLabel={stage.confirmEnd.confirm}
        cancelLabel={stage.confirmEnd.cancel}
        line={confirmLine}
        onConfirm={endShow}
        onCancel={() => setConfirming(false)}
      />
    </div>
  );
}
