'use client';

import { useGame } from '@/hooks/useGame';
import WizardForm from './WizardForm';

export default function Wizard() {
  const { state, hydrated } = useGame();
  if (!hydrated) return <div className="page" />;
  return <WizardForm previous={state.players.length ? state : null} />;
}
