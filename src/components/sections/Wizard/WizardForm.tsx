'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useReducer, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { ROUTES } from '@/constants/routes';
import { WIZARD_STEPS } from '@/constants/wizard';
import { cx } from '@/lib/classNames';
import { fill } from '@/lib/format';
import { isStepComplete, toGameSetup } from '@/lib/setup';
import { createDraft, setupReducer } from '@/lib/setupReducer';
import { unlockAudio } from '@/lib/sound';
import { useCopy } from '@/hooks/useCopy';
import { useGame } from '@/hooks/useGame';
import Button from '@/components/ui/Button/Button';
import ButtonLink from '@/components/ui/ButtonLink/ButtonLink';
import ActTrack from '@/components/ui/ActTrack/ActTrack';
import ModeStep from '@/components/sections/ModeStep/ModeStep';
import PlayersStep from '@/components/sections/PlayersStep/PlayersStep';
import RulesStep from '@/components/sections/RulesStep/RulesStep';
import type { WizardFormProps } from '@/types/components/sections';
import { useWizardAnimation } from './useWizardAnimation';
import styles from './Wizard.module.css';

const STEP_CONTENT = {
  mode: ModeStep,
  players: PlayersStep,
  rules: RulesStep,
};

export default function WizardForm({ previous }: WizardFormProps) {
  const { wizard, teamDefaults } = useCopy();
  const { start } = useGame();
  const router = useRouter();
  const [draft, dispatch] = useReducer(setupReducer, null, () =>
    createDraft(previous, teamDefaults),
  );
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLFormElement>(null);
  const changedStep = useRef(false);
  useWizardAnimation(ref, index);

  const step = WIZARD_STEPS[index];
  const stepCopy = wizard[step];
  const StepContent = STEP_CONTENT[step];
  const isLast = index === WIZARD_STEPS.length - 1;
  const canContinue = isStepComplete(step, draft);
  const description =
    step === 'players' && draft.mode === 'teams'
      ? wizard.players.teamsDescription
      : stepCopy.description;

  useEffect(() => {
    if (!changedStep.current) return;
    window.scrollTo({ top: 0 });
  }, [index]);

  const goTo = (next: number) => {
    changedStep.current = true;
    setIndex(next);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!canContinue) return;
    if (!isLast) return goTo(index + 1);
    unlockAudio();
    start(toGameSetup(draft));
    router.push(ROUTES.play);
  };

  return (
    <form
      ref={ref}
      className={cx('page', styles.wizard)}
      onSubmit={onSubmit}
      noValidate
    >
      <header className={styles.aside}>
        <ActTrack
          current={index + 1}
          names={wizard.acts}
          label={fill(wizard.progress, {
            current: index + 1,
            total: WIZARD_STEPS.length,
            name: wizard.acts[index],
          })}
        />
        <div key={step} className={styles.heading}>
          <p className={cx(styles.kicker, 'label')}>{stepCopy.word}</p>
          <h1 className={cx(styles.title, 'headline')}>{stepCopy.title}</h1>
          <p className={styles.description}>{description}</p>
        </div>
      </header>

      <div key={step} className={styles.panel}>
        <StepContent draft={draft} dispatch={dispatch} />
      </div>

      <div className={styles.bar}>
        {index === 0 ? (
          <ButtonLink href={ROUTES.home} variant="quiet">
            {wizard.back}
          </ButtonLink>
        ) : (
          <Button variant="quiet" onClick={() => goTo(index - 1)}>
            {wizard.back}
          </Button>
        )}
        <Button
          type="submit"
          sound="step"
          disabled={!canContinue}
          icon={isLast ? 'sparkle' : 'arrowRight'}
        >
          {isLast ? wizard.finish : wizard.next}
        </Button>
      </div>
    </form>
  );
}
