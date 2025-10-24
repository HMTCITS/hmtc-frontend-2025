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

    // normalize the incoming path into the `page` query value:
    // examples:
    //  - "/ayomeludaftarmagang" -> "ayomeludaftarmagang"
    //  - "hidden-page-cf" -> "hidden-page-cf"
    //  - "/some/prefix/other" -> "some" (only the first segment is used, same as original expectations)
    const normalizedPath = (path || '').startsWith('/')
      ? (path || '').slice(1)
      : path || '';
    const pageQueryValue = normalizedPath.split('/')[0] || '';

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

        const json = (await res.json()) as any;
        if (json.active === false) {
          // check current page query param dynamically, instead of a hard-coded string
          const params = new URLSearchParams(
            typeof window !== 'undefined' ? window.location.search : '',
          );
          const currentPage = params.get('page');
          const already = currentPage === pageQueryValue;
          if (!already) {
            const to = `/coming-soon${pageQueryValue ? `?page=${encodeURIComponent(pageQueryValue)}` : ''}`;
            router.replace(to);
          }
        }
        lastActiveRef.current = json.active;
      } catch (e: any) {
        if (!mounted) return;
        if (e?.name === 'AbortError') return;
        // swallow other errors (same as original behaviour)
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
