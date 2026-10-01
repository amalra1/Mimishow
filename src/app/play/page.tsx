import type { Metadata } from 'next';
import Stage from '@/components/sections/Stage/Stage';

export const metadata: Metadata = {
  title: 'No palco',
  robots: { index: false },
};

export default function PlayPage() {
  return <Stage />;
}
