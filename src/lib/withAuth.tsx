/**
 * withAuth Library (Hook + HOC + SSR Guard)
 * -------------------------------------------------------
 * - Cookie HttpOnly sebagai sumber auth (no token di JS)
 * - Auto refresh via interceptors (single-flight, retry 1x)
 * - SSR lanjutan: refresh + forward Set-Cookie + retry
 * - Permission: 'public' | 'authenticated' | 'admin' | 'user' | string[]
 * - Granular role: via options.validateRoles (opsional)
 * - Fallback: redirect atau komponen custom
 * - onFail callback & loading state
 */

import axios, { type AxiosInstance } from 'axios';
import { useRouter } from 'next/navigation';
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next/types';
import type { ReactNode } from 'react';
import * as React from 'react';

export type AuthPermission =
  | 'public'
  | 'authenticated'
  | 'admin'
  | 'user'
  | string[];

export type WithAuthOptions = {
  /** Permission yang dibutuhkan */
  permission: AuthPermission;
  /** Komponen fallback jika tidak diizinkan (CSR) */
  fallback?: ReactNode;
  /** Redirect path jika tidak diizinkan (default: '/login') */
  redirect?: string;
  /** Dipanggil saat gagal izin (unauthorized / forbidden / role mismatch) */
  onFail?: (reason: string, info?: { status?: number }) => void;
  /** Komponen loading saat proses cek */
  loadingComponent?: ReactNode;
  /** Daftar role granular (opsional; gunakan jika tidak menaruh roles pada permission) */
  roles?: string[];
  /**
   * Validator roles kustom (granular) jika backend menyediakan endpoint lain.
   * Return true jika role terpenuhi, false jika tidak.
   */
  validateRoles?: (api: AxiosInstance, required: string[]) => Promise<boolean>;
  /** Override endpoint admin/me bila berbeda */
  adminEndpoint?: string; // default '/auth/admin'
  meEndpoint?: string; // default '/auth/me'
};

export type UseWithAuthState = {
  allowed: boolean;
  loading: boolean;
  /** Informasi tambahan: apakah user merupakan admin (jika sempat dicek) */
  isAdmin?: boolean;
  /** Alasan kegagalan terakhir (hint untuk logging/UX) */
  reason?: string;
};

const DEFAULT_REDIRECT = '/login';
const DEFAULT_ME_ENDPOINT = '/auth/me';
const DEFAULT_ADMIN_ENDPOINT = '/auth/admin';

const baseURL =
  process.env.NEXT_PUBLIC_RUN_MODE === 'development'
    ? process.env.NEXT_PUBLIC_API_URL_DEV
    : process.env.NEXT_PUBLIC_API_URL_PROD;

function createApiLocal(opts?: {
  ctx?: GetServerSidePropsContext;
}): AxiosInstance {
  const instance = axios.create({
    baseURL,
    withCredentials: true,
    headers: { Accept: 'application/json' },
  });
  if (typeof window === 'undefined' && opts?.ctx?.req?.headers?.cookie) {
    (instance.defaults.headers as any).Cookie = String(
      opts.ctx.req.headers.cookie,
    );
  }
  return instance;
}

function normalizePermission(
  permission: AuthPermission,
  roles?: string[],
): {
  kind: 'public' | 'authenticated' | 'admin' | 'user' | 'granular';
  list?: string[];
} {
  if (Array.isArray(permission)) return { kind: 'granular', list: permission };
  if (permission === 'public') return { kind: 'public' };
  if (permission === 'authenticated') return { kind: 'authenticated' };
  if (permission === 'admin') return { kind: 'admin' };
  if (permission === 'user') return { kind: 'user' };
  if (Array.isArray(roles) && roles.length > 0)
    return { kind: 'granular', list: roles };
  return { kind: 'authenticated' };
}

async function checkAuthenticated(
  api: AxiosInstance,
  meEndpoint: string,
): Promise<boolean> {
  try {
    await api.get(meEndpoint);
    return true;
  } catch {
    return false;
  }
}

async function checkAdmin(
  api: AxiosInstance,
  adminEndpoint: string,
): Promise<boolean> {
  try {
    await api.get(adminEndpoint);
    return true;
  } catch (e: any) {
    const status = e?.response?.status;
    if (status === 403) return false;
    return false;
  }
}

/**
 * Hook utama: useWithAuth
 * - Jalankan di CLIENT component.
 * - Mengandalkan cookie HttpOnly + auto-refresh via interceptors.
 */
export function useWithAuth(options: WithAuthOptions): UseWithAuthState {
  const {
    permission,
    fallback,
    redirect = DEFAULT_REDIRECT,
    onFail,
    roles,
    validateRoles,
    adminEndpoint = DEFAULT_ADMIN_ENDPOINT,
    meEndpoint = DEFAULT_ME_ENDPOINT,
  } = options;

  const router = useRouter();
  const [state, setState] = React.useState<UseWithAuthState>({
    allowed: false,
    loading: true,
    isAdmin: undefined,
    reason: undefined,
  });

  const didRedirectRef = React.useRef(false);

  const unauthFlagRef = React.useRef(false);

  const rolesKey = React.useMemo(() => roles?.join(',') ?? '', [roles]);

  React.useEffect(() => {
    let mounted = true;
    const { kind, list } = normalizePermission(permission, roles);

    async function run() {
      const api = createApiLocal();

      if (kind === 'public') {
        if (!mounted) return;
        setState({
          allowed: true,
          loading: false,
          isAdmin: false,
          reason: undefined,
        });
        return;
      }

      const isAuthed = await checkAuthenticated(api, meEndpoint);
      if (!mounted) return;

      if (!isAuthed || unauthFlagRef.current) {
        onFail?.('unauthorized', { status: 401 });
        setState({
          allowed: false,
          loading: false,
          isAdmin: false,
          reason: 'unauthorized',
        });

        if (!fallback && !didRedirectRef.current) {
          didRedirectRef.current = true;
          router.replace(redirect);
        }
        return;
      }

      if (kind === 'authenticated') {
        setState({
          allowed: true,
          loading: false,
          isAdmin: false,
          reason: undefined,
        });
        return;
      }

      if (kind === 'admin') {
        const isAdmin = await checkAdmin(api, adminEndpoint);
        if (!mounted) return;

        if (isAdmin) {
          setState({
            allowed: true,
            loading: false,
            isAdmin: true,
            reason: undefined,
          });
          return;
        }
        onFail?.('forbidden', { status: 403 });
        setState({
          allowed: false,
          loading: false,
          isAdmin: false,
          reason: 'forbidden',
        });
        if (!fallback && !didRedirectRef.current) {
          didRedirectRef.current = true;
          router.replace(redirect);
        }
        return;
      }

      if (kind === 'user') {
        setState({
          allowed: true,
          loading: false,
          isAdmin: undefined,
          reason: undefined,
        });
        return;
      }

      if (kind === 'granular' && Array.isArray(list) && list.length > 0) {
        if (list.includes('admin')) {
          const isAdmin = await checkAdmin(api, adminEndpoint);
          if (!mounted) return;

          if (!isAdmin) {
            onFail?.('forbidden', { status: 403 });
            setState({
              allowed: false,
              loading: false,
              isAdmin: false,
              reason: 'forbidden',
            });
            if (!fallback && !didRedirectRef.current) {
              didRedirectRef.current = true;
              router.replace(redirect);
            }
            return;
          }
          setState({
            allowed: true,
            loading: false,
            isAdmin: true,
            reason: undefined,
          });
          return;
        }

        if (validateRoles) {
          try {
            const ok = await validateRoles(api, list);
            if (!mounted) return;

            if (ok) {
              setState({
                allowed: true,
                loading: false,
                isAdmin: undefined,
                reason: undefined,
              });
              return;
            }
            onFail?.('forbidden', { status: 403 });
            setState({
              allowed: false,
              loading: false,
              isAdmin: undefined,
              reason: 'forbidden',
            });
            if (!fallback && !didRedirectRef.current) {
              didRedirectRef.current = true;
              router.replace(redirect);
            }
            return;
          } catch {
            onFail?.('role_validation_error');
            setState({
              allowed: false,
              loading: false,
              isAdmin: undefined,
              reason: 'role_validation_error',
            });
            if (!fallback && !didRedirectRef.current) {
              didRedirectRef.current = true;
              router.replace(redirect);
            }
            return;
          }
        }

        setState({
          allowed: true,
          loading: false,
          isAdmin: undefined,
          reason: undefined,
        });
        return;
      }

      setState({
        allowed: true,
        loading: false,
        isAdmin: undefined,
        reason: undefined,
      });
    }

    run();

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    permission,
    redirect,
    fallback,
    onFail,
    rolesKey,
    validateRoles,
    adminEndpoint,
    meEndpoint,
    router,
  ]);

  return state;
}

/**
 * HOC: withAuth
 * - Bungkus component CSR dengan proteksi permission.
 * - NOTE: Gunakan di CLIENT component (file pemakai harus 'use client').
 */
export function withAuth<P>(
  Component: React.ComponentType<P>,
  options: WithAuthOptions,
): React.FC<P> {
  const Wrapped: React.FC<P> = (props: P) => {
    const { loading, allowed } = useWithAuth(options);

    if (loading) {
      return options.loadingComponent ? <>{options.loadingComponent}</> : null;
    }

    if (!allowed) {
      if (options.fallback) return <>{options.fallback}</>;
      return null;
    }

    return <Component {...(props as any)} />;
  };

  Wrapped.displayName = `withAuth(${Component.displayName || Component.name || 'Component'})`;
  return Wrapped;
}

/**
 * SSR Guard (Pages Router):
 * - Gunakan di getServerSideProps untuk proteksi server-side.
 * - Melakukan refresh otomatis via interceptor SSR-advanced,
 *   forward Set-Cookie saat refresh, dan retry sekali.
 * - Jika gagal izin → redirect (default /login).
 */
export function withAuthGSSP<
  PP extends Record<string, any> = Record<string, any>,
>(
  options: WithAuthOptions,
  gssp?: (
    ctx: GetServerSidePropsContext,
  ) => Promise<GetServerSidePropsResult<PP>>,
): GetServerSideProps<PP> {
  const {
    permission,
    redirect = DEFAULT_REDIRECT,
    roles,
    validateRoles,
    adminEndpoint = DEFAULT_ADMIN_ENDPOINT,
    meEndpoint = DEFAULT_ME_ENDPOINT,
    onFail,
  } = options;

  return async (
    ctx: GetServerSidePropsContext,
  ): Promise<GetServerSidePropsResult<PP>> => {
    const api = createApiLocal({ ctx });

    const redirectResult: GetServerSidePropsResult<PP> = {
      redirect: { destination: redirect, permanent: false },
    };

    const { kind, list } = normalizePermission(permission, roles);

    if (kind === 'public') {
      return gssp ? await gssp(ctx) : { props: {} as PP };
    }

    const isAuthed = await checkAuthenticated(api, meEndpoint);
    if (!isAuthed) {
      onFail?.('unauthorized', { status: 401 });
      return redirectResult;
    }

    if (kind === 'authenticated' || kind === 'user') {
      return gssp ? await gssp(ctx) : { props: {} as PP };
    }

    if (kind === 'admin') {
      const isAdmin = await checkAdmin(api, adminEndpoint);
      if (!isAdmin) {
        onFail?.('forbidden', { status: 403 });
        return redirectResult;
      }
      return gssp ? await gssp(ctx) : { props: {} as PP };
    }

    if (kind === 'granular' && Array.isArray(list) && list.length > 0) {
      if (list.includes('admin')) {
        const isAdmin = await checkAdmin(api, adminEndpoint);
        if (!isAdmin) {
          onFail?.('forbidden', { status: 403 });
          return redirectResult;
        }
        return gssp ? await gssp(ctx) : { props: {} as PP };
      }
      if (validateRoles) {
        try {
          const ok = await validateRoles(api, list);
          if (!ok) {
            onFail?.('forbidden', { status: 403 });
            return redirectResult;
          }
          return gssp ? await gssp(ctx) : { props: {} as PP };
        } catch {
          onFail?.('role_validation_error');
          return redirectResult;
        }
      }
      return gssp ? await gssp(ctx) : { props: {} as PP };
    }

    return gssp ? await gssp(ctx) : { props: {} as PP };
  };
}
