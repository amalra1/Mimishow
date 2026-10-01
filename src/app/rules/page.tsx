import type { Metadata } from 'next';
import Rules from '@/components/sections/Rules/Rules';

export const metadata: Metadata = {
  title: 'Como jogar',
};

export default function RulesPage() {
  return <Rules />;
}
