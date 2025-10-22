'use client';

import * as React from 'react';

type AutoScheduleOptions = {
  intervalMs?: number;
  path?: string;
};

/**
 * Polls /api/schedule periodically and exposes a ref + dispatches a custom
 * window event when the `active` flag changes. Uses refs internally to avoid
 * causing re-renders on every poll. Consumers can read the current value via
 * the returned ref or listen to the `hmtc:schedule` CustomEvent.
 */
export function useAutoIsScheduleActive({
  intervalMs = 5000,
  path = '/ayomeludaftarmagang',
}: AutoScheduleOptions = {}) {
  const activeRef = React.useRef<boolean | null>(null);

  React.useEffect(() => {
    let mounted = true;
    let timer: number | null = null;
    const controller = new AbortController();

    const emit = (active: boolean) => {
      try {
        const ev = new CustomEvent('hmtc:schedule', { detail: { active } });
        window.dispatchEvent(ev);
      } catch {
        // ignore
      }
    };

    const load = async () => {
      try {
        const url = new URL('/api/schedule', window.location.origin);
        url.searchParams.set('path', path);
        const res = await fetch(url.toString(), {
          cache: 'no-store',
          signal: controller.signal,
        });
        if (!mounted) return;
        if (!res.ok) throw new Error('Failed to load schedule');
        const json = await res.json();
        const nextActive = !!json.active;
        if (activeRef.current !== nextActive) {
          activeRef.current = nextActive;
          emit(nextActive);
        }
      } catch {
        // ignoring errors intentionally; keep previous value
        if (!mounted) return;
        // AbortError will cancel fetch; nothing to do here
      }
    };

    // initial load
    void load();
    timer = window.setInterval(load, intervalMs);

    return () => {
      mounted = false;
      controller.abort();
      if (timer) window.clearInterval(timer);
    };
  }, [intervalMs, path]);

  return activeRef;
}
