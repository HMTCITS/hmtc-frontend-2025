import type { AxiosError } from 'axios';

import type { UninterceptedApiError } from '@/types/api';

/**
 * Normalize API error messages into a single string.
 */
export function transformApiError(
  error: AxiosError<UninterceptedApiError>,
): AxiosError<UninterceptedApiError> {
  const response = error.response;
  if (response?.data && response.data.message) {
    let refined = '';
    const { message } = response.data;

    if (typeof message === 'string') {
      refined = message;
    } else if (Array.isArray(message)) {
      refined = message[0];
    } else if (typeof message === 'object') {
      const key = Object.keys(message)[0];
      const val = (message as Record<string, any>)[key];
      refined = Array.isArray(val) ? val[0] : JSON.stringify(val);
    }

    response.data = { ...response.data, message: refined };
  }
  return error;
}
