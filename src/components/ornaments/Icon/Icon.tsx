import { ICONS } from '@/constants/icons';
import type { IconProps } from '@/types/components/ornaments';

export default function Icon({
  name,
  className,
  style,
  strokeWidth = 1.75,
}: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      style={style}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {ICONS[name].map((path) => (
        <path key={path} d={path} />
      ))}
    </svg>
  );
}
