export function readLS<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;

  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;

    const parsed = JSON.parse(raw);

    if (parsed === null || parsed === undefined) {
      return fallback;
    }

    return parsed as T;
  } catch (e) {
    console.warn(`[storage] Failed to read key "${key}"`, e);
    return fallback;
  }
}

export function writeLS<T>(key: string, value: T): boolean {
  if (typeof window === "undefined") return false;

  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.warn(`[storage] Failed to write key "${key}"`, e);
    return false;
  }
}

