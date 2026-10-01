'use client';

import { usePathname } from 'next/navigation';
import { useRouteIrisAnimation } from './useRouteIrisAnimation';

export default function RouteIris() {
  const pathname = usePathname();
  useRouteIrisAnimation(pathname);
  return null;
}
