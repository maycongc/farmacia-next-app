function safeGetItem(key: string): string | null {
  try {
    if (typeof window === undefined) return null;
    return localStorage.getItem(key);
  } catch (error) {
    console.error('localStorage.getItem error:', error);
    return null;
  }
}

function safeSetItem(key: string, value: string): boolean {
  try {
    if (typeof window === undefined) return false;
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.error('localStorage.setItem error:', error);
    return false;
  }
}

function safeRemoveItem(key: string): boolean {
  try {
    if (typeof window === undefined) return false;
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('localStorage.removeItem error:', error);
    return false;
  }
}

export function setFlag(key: string, ts = Date.now()) {
  return safeSetItem(key, String(ts));
}

export function clearFlag(key: string) {
  return safeRemoveItem(key);
}

export function getTs(key: string): number {
  const tsString = safeGetItem(key);
  return tsString ? Number(tsString) || 0 : 0;
}
