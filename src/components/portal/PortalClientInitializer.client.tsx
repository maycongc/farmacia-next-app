'use client';
import { useLayoutEffect } from 'react';
import { setPortalContainer } from '@/components/portal/portalStore';

const PORTAL_ROOT_ID = 'radix-theme';

export default function PortalClienteInitializer() {
  useLayoutEffect(() => {
    const element = document.getElementById(PORTAL_ROOT_ID);
    setPortalContainer(element ?? null);

    return () => setPortalContainer(null);
  }, []);

  return null;
}
