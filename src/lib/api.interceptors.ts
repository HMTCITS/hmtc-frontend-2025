import * as Sentry from '@sentry/nextjs';
import type {
  AxiosInstance,
  AxiosRequestHeaders,
  InternalAxiosRequestConfig,
} from 'axios';
import { redirect } from 'next/navigation';
import { GetServerSidePropsContext } from 'next/types';
import { toast } from 'react-hot-toast';
import Cookies from 'universal-cookie';

import { transformApiError } from './api.utils';
import { getRefreshToken, getToken, setToken } from './cookies';

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
    async (error) => {
      /**
       * Refresh Token Handling 
       */
      const originalRequest = error.config;
      if (error.response?.status === 401 && originalRequest.url != '/auth/refresh') {
        if (!originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = getRefreshToken();

            const response = await instance.post('/auth/refresh', { refreshToken })
            const { accessToken: newAccessToken } = response.data;

            setToken(newAccessToken);

            instance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

            return instance(originalRequest);
          } 
          catch (refreshError) {
            Sentry.captureException(refreshError);
            toast.error('Sesi Anda telah berakhir. Silakan login kembali.');
            redirect('/login');
          }
        }
      }

      /** 
       * Error Handling
       */
      switch (error.response?.status)
      {
        case 401:
          toast.error('Silakan login kembali.')
          redirect('/login');
          break;

        case 403:
          toast.error('Akses ditolak.')
          break;

        case 400:
          break;

        default:
          Sentry.captureException(error);
          break;
      }

      return Promise.reject(transformApiError(error));
    },
  );
}
