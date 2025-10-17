/**
 * Schedule API (GET /api/schedule)
 *
 * Provides the active status of a page's period-gated schedule. Intended to be
 * consumed by:
 * - Middleware (to block access outside of the active window)
 * - Client hook (to auto-redirect when a page becomes inactive in real time)
 *
 * Behavior:
 * - Accepts an optional `path` query param to determine which page's schedule
 *   should be evaluated. Falls back to `/ayomeludaftarmagang`.
 * - Fetches current time in Asia/Jakarta (WIB) from public time providers with
 *   a short timeout and multiple fallbacks.
 * - Applies a short Cache-Control to reduce API load and prevent UI flicker.
 *
 * Response schema:
 * {
 *   timezone: string;      // source timezone label
 *   mode: 'range';         // schedule mode
 *   start: string;         // ISO with timezone
 *   end: string;           // ISO with timezone
 *   path: string;          // evaluated path
 *   now: string;           // current timestamp in ISO (server-side)
 *   active: boolean;       // whether now is within [start, end]
 *   nextChange: string?;   // ISO of next boundary (start/end) or null
 *   source: 'worldtimeapi' | 'timeapi.io' | 'system'; // time source
 * }
 */
import { NextResponse } from 'next/server';

import { getScheduleForPath } from '@/lib/schedule-config';

/**
 * Time providers for accurate current time in Asia/Jakarta (WIB).
 * Tries worldtimeapi.org, then timeapi.io, then falls back to system time.
 */
async function fetchWorldTimeAPI(signal?: AbortSignal): Promise<Date | null> {
  try {
    const res = await fetch(
      'https://worldtimeapi.org/api/timezone/Asia/Jakarta',
      { signal, cache: 'no-store' },
    );
    if (!res.ok) return null;
    const json: any = await res.json();
    if (json && typeof json.datetime === 'string') {
      return new Date(json.datetime);
    }
    return null;
  } catch {
    return null;
  }
}

async function fetchTimeApiIo(signal?: AbortSignal): Promise<Date | null> {
  try {
    const res = await fetch(
      'https://timeapi.io/api/Time/current/zone?timeZone=Asia/Jakarta',
      { signal, cache: 'no-store' },
    );
    if (!res.ok) return null;
    const json: any = await res.json();
    if (json && typeof json.dateTime === 'string') {
      return new Date(json.dateTime);
    }
    return null;
  } catch {
    return null;
  }
}

async function getAccurateNow(): Promise<{ now: Date; source: string }> {
  const ac = new AbortController();
  const timeout = setTimeout(() => ac.abort(), 2500);
  try {
    const t1 = await fetchWorldTimeAPI(ac.signal);
    if (t1) return { now: t1, source: 'worldtimeapi' };
    const t2 = await fetchTimeApiIo(ac.signal);
    if (t2) return { now: t2, source: 'timeapi.io' };
  } finally {
    clearTimeout(timeout);
  }
  return { now: new Date(), source: 'system' };
}

function toISO(d: Date) {
  return d.toISOString();
}

export async function GET(req: Request) {
  // Request.url can be absolute or a path-only string depending on runtime.
  // Be defensive and fall back to a constructed origin when needed.
  let searchParams: URLSearchParams;
  try {
    searchParams = new URL(req.url).searchParams;
  } catch {
    const proto = req.headers.get('x-forwarded-proto') || 'http';
    const host = req.headers.get('host') || 'localhost';
    searchParams = new URL(req.url, `${proto}://${host}`).searchParams;
  }
  const path = searchParams.get('path') || '/ayomeludaftarmagang';
  const config = getScheduleForPath(path);

  if (!config || config.mode !== 'range') {
    return NextResponse.json(
      { active: false, reason: 'No schedule', path },
      {
        headers: {
          'Cache-Control':
            'public, max-age=5, s-maxage=5, stale-while-revalidate=30',
        },
      },
    );
  }

  const { now, source } = await getAccurateNow();

  const start = new Date(config.start);
  const end = new Date(config.end);
  const active = now >= start && now <= end;
  const nextChange = active ? toISO(end) : now < start ? toISO(start) : null;

  return NextResponse.json(
    {
      timezone: config.timezone || 'Asia/Jakarta',
      mode: config.mode,
      start: config.start,
      end: config.end,
      path,
      now: toISO(now),
      active,
      nextChange,
      source,
    },
    {
      headers: {
        // Allow short-term caching at the edge and browser to reduce flicker and API load
        'Cache-Control':
          'public, max-age=5, s-maxage=5, stale-while-revalidate=30',
      },
    },
  );
}
