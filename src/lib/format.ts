const INDEX_PAD = 2;

const SECONDS_PER_MINUTE = 60;

export function fill(
  template: string,
  values: Record<string, string | number>,
) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}

export function padIndex(index: number) {
  return String(index).padStart(INDEX_PAD, '0');
}

export function formatClock(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / SECONDS_PER_MINUTE);
  const seconds = totalSeconds % SECONDS_PER_MINUTE;
  return `${minutes}:${String(seconds).padStart(INDEX_PAD, '0')}`;
}
