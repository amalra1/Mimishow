import { ORNAMENTS } from '@/constants/ornaments';
import type { OrnamentGlyphProps } from '@/types/components/ornaments';

export default function Ornament({
  name,
  className,
  style,
}: OrnamentGlyphProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <g fill="currentColor" fillRule="evenodd">
        {ORNAMENTS[name].map((path) => (
          <path key={path} d={path} />
        ))}
      </g>
    </svg>
  );
}
