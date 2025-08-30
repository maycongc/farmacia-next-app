import { useSyncExternalStore } from 'react';
import { getPortalContainer, subscribe } from '@/components/portal/portalStore';

export function usePortalContainer(): HTMLElement | null {
  return useSyncExternalStore(
    subscribe,
    getPortalContainer,
    getPortalContainer,
  );
}
