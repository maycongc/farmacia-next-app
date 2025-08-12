let accessTokenMemory: string | null = null;

export function setAccessToken(token: string | null) {
  accessTokenMemory = token;

  if (typeof window !== 'undefined') {
    if (token) {
      sessionStorage.setItem('accessToken', token);
    } else {
      sessionStorage.removeItem('accessToken');
    }
  }
}

export function getAccessToken(): string | null {
  if (accessTokenMemory) {
    return accessTokenMemory;
  }

  if (typeof window === 'undefined') {
    return null;
  }

  const stored = sessionStorage.getItem('accessToken');
  accessTokenMemory = stored;
  return stored;
}

export function clearTokens() {
  setAccessToken(null);
}
