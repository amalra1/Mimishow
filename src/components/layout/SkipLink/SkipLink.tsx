'use client';

import { MAIN_CONTENT_ID } from '@/constants/routes';
import { cx } from '@/lib/classNames';
import { useCopy } from '@/hooks/useCopy';

export default function SkipLink() {
  const { meta } = useCopy();
  return (
    <a href={`#${MAIN_CONTENT_ID}`} className={cx('skip-link', 'label')}>
      {meta.skip}
    </a>
  );
}
