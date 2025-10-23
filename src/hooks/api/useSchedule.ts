'use client';

/**
 * Client hook: schedule-aware auto-redirect
 *
 * Periodically polls `/api/schedule?path=...` and, when the target page
 * becomes inactive, performs a client-side `router.replace('/coming-soon')`.
 *
 * Design notes:
 * - Uses refs internally to avoid triggering re-renders on every poll, keeping
 *   background animations and UI state stable.
 * - This hook is complementary to the server-side middleware which blocks
 *   access on navigation; here we only handle the in-page transition.
 *
 * Usage:
 *   useScheduleAutoRedirect(5000, '/ayomeludaftarmagang');
 */
import { useRouter } from 'next/navigation';
import * as React from 'react';

export type ScheduleResponse = {
  timezone?: string;
  mode?: string;
  start?: string;
  end?: string;
  path?: string;
  now?: string;
  active?: boolean;
  nextChange?: string | null;
  source?: string;
};

export function useSchedule(path = '/ayomeludaftarmagang', pollMs = 5000) {
  const [data, setData] = React.useState<ScheduleResponse | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [now, setNow] = React.useState<Date>(new Date());

  React.useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    const fetchOnce = async () => {
      try {
        setLoading(true);
        const url = new URL('/api/schedule', window.location.origin);
        url.searchParams.set('path', path);
        const res = await fetch(url.toString(), {
          cache: 'no-store',
          signal: controller.signal,
        });
        if (!mounted) return;
        if (!res.ok) throw new Error('Failed to load schedule');
        const json = (await res.json()) as ScheduleResponse;
        setData(json);
        setError(null);
      } catch (err: any) {
        if (!mounted) return;
        if (err?.name === 'AbortError') return;
        setError(String(err?.message ?? err));
      } finally {
        if (mounted) setLoading(false);
      }
    };

    // fetch once on mount and keep a per-second `now` ticker for the UI
    void fetchOnce();
    const tick = window.setInterval(() => setNow(new Date()), 1000);

    return () => {
      mounted = false;
      controller.abort();
      clearInterval(tick);
    };
  }, [path, pollMs]);

  return { data, now, loading, error } as const;
}

type Schedule = {
  active: boolean;
  nextChange: string | null;
  now: string;
  start: string;
  end: string;
  timezone: string;
  source?: string;
};

export function useScheduleAutoRedirect(
  intervalMs = 5000,
  path: string = '/ayomeludaftarmagang',
) {
  const router = useRouter();
  const lastActiveRef = React.useRef<boolean | null>(null);

  React.useEffect(() => {
    let mounted = true;
    let timer: number | null = null;
    const controller = new AbortController();

    const load = async () => {
      try {
        const url = new URL('/api/schedule', window.location.origin);
        url.searchParams.set('path', path);
        const res = await fetch(url, {
          cache: 'no-store',
          signal: controller.signal,
        });
        if (!mounted) return;
        if (!res.ok) throw new Error('Failed to load schedule');
        const json = (await res.json()) as Schedule;
        if (
          json.active === false &&
          window.location.pathname !== '/coming-soon'
        ) {
          router.replace('/coming-soon');
        }
        lastActiveRef.current = json.active;
      } catch (e: any) {
        if (!mounted) return;
        if (e?.name === 'AbortError') return;
      }
    };

    load();
    timer = window.setInterval(load, intervalMs);

    return () => {
      mounted = false;
      controller.abort();
      if (timer) window.clearInterval(timer);
    };
  }, [intervalMs, router, path]);

  return {} as const;
}
