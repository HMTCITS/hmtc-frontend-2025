/**
 * Global Middleware
 *
 * Responsibilities:
 * 1) Period-based gating (public pages):
 *    - For specific route prefixes, consult `/api/schedule?path=...` to decide
 *      whether the page is within its active window. If inactive, redirect to
 *      `/coming-soon` before rendering.
 *    - Uses short-term caching (Cache-Control honored via `cache: 'force-cache'`)
 *      to prevent jitter and reduce load on public time providers.
 *
 * 2) Admin/privileged routes blocking (production safety net):
 *    - Based on `NODE_ENV` and `DISABLE_ADMIN_ROUTES`, block sensitive routes
 *      (e.g., `/dashboard`, `/sandbox`, auth pages) in production unless
 *      explicitly enabled.
 *
 * Configuration:
 * - To add a new period-gated page:
 *   a) Add its prefix and schedule in `src/lib/schedule-config.ts`.
 *   b) Add the prefix to `gatedPrefixes` below and to `config.matcher`.
 *   c) In the page component, call `useScheduleAutoRedirect(… , '<prefix>')`
 *      for realtime UX fallback.
 * - To override admin routes in production, set `DISABLE_ADMIN_ROUTES=0`.
 *
 * Order of checks:
 * - Period gating runs first (page-specific policy), then admin blocking runs.
 *   Adjust ordering if you need admin policy to override period gating.
 */
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Routes to block in production (or when DISABLE_ADMIN_ROUTES=1)
const BLOCKED_PREFIXES = ['/sandbox', '/dashboard'];
const BLOCKED_EXACT = ['/login', '/register'];
const BLOCKED_PREFIX_AUTH = ['/change-password'];

export async function middleware(req: NextRequest) {
  const isProd = process.env.NODE_ENV === 'production';
  // Read server-only env var so the flag is NOT exposed to client bundles.
  // We treat the env var as an explicit override with the following semantics:
  // - Production: admin routes are disabled by default (shouldDisable = true). To
  //   force-enable admin routes in prod for testing, set DISABLE_ADMIN_ROUTES=0.
  // - Development: admin routes are enabled by default (shouldDisable = false).
  //   To simulate disabling in dev, set DISABLE_ADMIN_ROUTES=1.
  const envFlag = process.env.DISABLE_ADMIN_ROUTES;
  let shouldDisable: boolean;
  if (isProd) {
    // In production default to disabling admin routes unless explicitly set to '0'
    shouldDisable = envFlag !== '0';
  } else {
    // In development default to NOT disabling admin routes unless explicitly set to '1'
    shouldDisable = envFlag === '1';
  }

  // --- Period-based gating (public pages) ---
  try {
    const pathname = req.nextUrl.pathname;
    // Add any additional period-gated pages here (ensure matcher is updated too)
    const gatedPrefixes = ['/ayomeludaftarmagang'];
    const isGated = gatedPrefixes.some(
      (p) => pathname === p || pathname.startsWith(p + '/'),
    );
    if (isGated) {
      const url = req.nextUrl.clone();
      url.pathname = '/api/schedule';
      url.searchParams.set('path', pathname);
      const res = await fetch(url, { cache: 'force-cache' });
      if (!res.ok) throw new Error('schedule fetch failed');
      const j: any = await res.json();
      if (!j?.active) {
        const to = req.nextUrl.clone();
        to.pathname = '/coming-soon';
        return NextResponse.redirect(to);
      }
    }
  } catch {
    const to = req.nextUrl.clone();
    to.pathname = '/coming-soon';
    return NextResponse.redirect(to);
  }

  if (!shouldDisable) return NextResponse.next();

  const pathname = req.nextUrl.pathname;

  // --- Admin/privileged routes blocking ---
  // block prefixes: /sandbox/* and /dashboard/*
  for (const p of BLOCKED_PREFIXES) {
    if (pathname === p || pathname.startsWith(p + '/')) {
      const url = req.nextUrl.clone();
      url.pathname = '/coming-soon';
      return NextResponse.redirect(url);
    }
  }

  // block exact auth pages (login, register)
  if (BLOCKED_EXACT.includes(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = '/coming-soon';
    return NextResponse.redirect(url);
  }

  // block auth prefixes (eg. change-password/*)
  for (const p of BLOCKED_PREFIX_AUTH) {
    if (pathname === p || pathname.startsWith(p + '/')) {
      const url = req.nextUrl.clone();
      url.pathname = '/coming-soon';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// Only run middleware for relevant routes to minimize overhead
export const config = {
  matcher: [
    '/ayomeludaftarmagang',
    '/ayomeludaftarmagang/:path*',
    '/sandbox/:path*',
    '/dashboard/:path*',
    '/login',
    '/login/:path*',
    '/register',
    '/register/:path*',
    '/change-password',
    '/change-password/:path*',
  ],
};
