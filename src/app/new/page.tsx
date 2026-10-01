import type { Metadata } from 'next';
import Wizard from '@/components/sections/Wizard/Wizard';

export const metadata: Metadata = {
  title: 'Novo show',
};

export default function NewShowPage() {
  return <Wizard />;
}
