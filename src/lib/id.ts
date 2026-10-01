const ID_BYTES = 9;

export function createId() {
  const bytes = new Uint8Array(ID_BYTES);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => byte.toString(36).padStart(2, '0')).join(
    '',
  );
}
