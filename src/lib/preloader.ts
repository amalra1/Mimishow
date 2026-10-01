let resolveIntro: (() => void) | undefined;

export const introReady = new Promise<void>((resolve) => {
  resolveIntro = resolve;
});

export function releaseIntro() {
  resolveIntro?.();
}
