import { ORNAMENTS } from '@/constants/ornaments';
import type { OrnamentProps } from '@/types/components/ornaments';

const BLADE_COUNT = 24;
const BLADE_ANGLE = 360 / BLADE_COUNT;
const LONG_BLADE = 'M0 -46L7 -62L0 -98L-7 -62Z';
const SHORT_BLADE = 'M0 -46L4 -56L0 -74L-4 -56Z';

export default function Emblem({ className, style }: OrnamentProps) {
  const blades = Array.from({ length: BLADE_COUNT }, (_, index) => index);

  return (
    <svg
      viewBox="-100 -100 200 200"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <g fill="currentColor">
        {blades.map((index) => (
          <path
            key={index}
            transform={`rotate(${index * BLADE_ANGLE})`}
            d={index % 2 === 0 ? LONG_BLADE : SHORT_BLADE}
          />
        ))}
        <circle r="40" fill="none" stroke="currentColor" strokeWidth="3" />
        <g transform="translate(-28.8 -29) scale(1.2)" fillRule="evenodd">
          {ORNAMENTS.mask.map((path) => (
            <path key={path} d={path} />
          ))}
        </g>
      </g>
    </svg>
  );
}
