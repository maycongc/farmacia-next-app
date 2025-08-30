let container: HTMLElement | null = null;
const listeners = new Set<() => void>();

export function setPortalContainer(element: HTMLElement | null) {
  container = element;
  listeners.forEach(l => l());
}

export function getPortalContainer(): HTMLElement | null {
  return container;
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
