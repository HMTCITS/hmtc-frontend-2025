import * as Sentry from '@sentry/nextjs';
import type {
  AxiosInstance,
  AxiosRequestHeaders,
  InternalAxiosRequestConfig,
} from 'axios';
import { GetServerSidePropsContext } from 'next/types';
import Cookies from 'universal-cookie';

import { transformApiError } from './api.utils';
import { getToken } from './cookies';

export function applyInterceptors(
  instance: AxiosInstance,
  ctx?: GetServerSidePropsContext,
) {
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      config.headers = (config.headers ?? {}) as AxiosRequestHeaders;
      let token: string | undefined;

      if (typeof window === 'undefined') {
        if (ctx?.req?.headers?.cookie) {
          const cookies = new Cookies(ctx.req.headers.cookie);
          token = cookies.get('@HMTCTOKEN');
        }
      } else {
        token = getToken();
      }

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (err: any) => Promise.reject(err),
  );

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      Sentry.captureException(error);
      return Promise.reject(transformApiError(error));
    },
  );
}
