export const storage = {
  get<T>(key: string, fallback: T): T {
    if (typeof window === 'undefined') return fallback;
    try {
      const raw = sessionStorage.getItem(key);
      if (!raw) return fallback;
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
  },

  set<T>(key: string, value: T) {
    if (typeof window === 'undefined') return;
    sessionStorage.setItem(key, JSON.stringify(value));
  },

  del(key: string) {
    if (typeof window === 'undefined') return;
    sessionStorage.removeItem(key);
  },
};
