import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Routes to block in production (or when DISABLE_ADMIN_ROUTES=1)
const BLOCKED_PREFIXES = ['/sandbox', '/dashboard'];
const BLOCKED_EXACT = ['/login', '/register'];
const BLOCKED_PREFIX_AUTH = ['/change-password'];

export function middleware(req: NextRequest) {
  const disableInProd = process.env.NODE_ENV === 'production';
  // Read server-only env var so the flag is NOT exposed to client bundles.
  const envOverride = process.env.DISABLE_ADMIN_ROUTES === '1';
  const shouldDisable = disableInProd || envOverride;

  // Debug logging (server-side). Remove after troubleshooting.
  try {
    // eslint-disable-next-line no-console
    console.log(
      '[middleware] shouldDisable=',
      shouldDisable,
      'NODE_ENV=',
      process.env.NODE_ENV,
      'DISABLE_ADMIN_ROUTES=',
      process.env.DISABLE_ADMIN_ROUTES,
    );
  } catch {
    // ignore
  }

  if (!shouldDisable) return NextResponse.next();

  const pathname = req.nextUrl.pathname;

  // block prefixes: /sandbox/* and /dashboard/*
  for (const p of BLOCKED_PREFIXES) {
    if (pathname === p || pathname.startsWith(p + '/')) {
      // Redirect to the not-found page so users see the same UI as other 404s
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
    '/sandbox/:path*',
    '/dashboard/:path*',
    // include :path* to match trailing slashes or subpaths
    '/login',
    '/login/:path*',
    '/register',
    '/register/:path*',
    '/change-password',
    '/change-password/:path*',
  ],
};
