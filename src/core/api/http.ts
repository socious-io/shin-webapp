import { Store } from '@reduxjs/toolkit';
import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import { config } from 'src/config';
import { dialog } from 'src/core/dialog/dialog';
import { nonPermanentStorage } from 'src/core/storage/non-permanent';
import { hideSpinner, showSpinner } from 'src/store/reducers/spinner.reducer';

import { refreshToken } from './auth/auth.service';
import { removedEmptyProps } from '../helpers/objects-arrays';

export const http = axios.create({
  baseURL: config.baseURL,
  // withCredentials: true,
  timeout: 1000000,
});

export async function getAuthHeaders(): Promise<{ Authorization: string }> {
  const token = await nonPermanentStorage.get('access_token');
  const prefix = await nonPermanentStorage.get('token_type');
  return {
    Authorization: `${prefix} ${token}`,
  };
}

export async function post<T>(uri: string, payload: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
  return http.post<T>(uri, removedEmptyProps(payload), config);
}

export async function put<T>(uri: string, payload: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
  return http.put<T>(uri, removedEmptyProps(payload), config);
}

export async function get<T>(uri: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
  if (!config) config = {};

  config.params = {
    t: new Date().getTime(),
    ...config?.params,
  };

  return http.get<T>(uri, config);
}

export async function del<T>(uri: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
  if (!config) config = {};

  config.params = {
    t: new Date().getTime(),
    ...config?.params,
  };

  return http.delete<T>(uri, config);
}

export type ErrorSection = 'AUTH' | 'FORGET_PASSWORD';

export type ErrorHandlerParams = {
  title?: string;
  message?: string;
  section?: string;
};

const errorSections: ErrorSection[] = ['AUTH', 'FORGET_PASSWORD'];

export function handleError(params?: ErrorHandlerParams) {
  return (err?: AxiosError<{ error: string }>) => {
    const errMessage = params?.message || err?.response?.data.error || 'An error accrued';
    dialog.alert({
      message: errMessage,
      title: params?.title || 'Failed',
    });
  };
}

http.interceptors.request.use(
  async function (config) {
    const { Authorization } = await getAuthHeaders();
    if (Authorization) config.headers.set('Authorization', Authorization);
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

export function setupInterceptors(store: Store) {
  http.interceptors.request.use(
    async function (config) {
      store.dispatch(showSpinner());
      // Do something before request is sent
      return config;
    },
    function (error) {
      store.dispatch(hideSpinner());
      // Do something with request error
      return Promise.reject(error);
    },
  );
  http.interceptors.response.use(
    function (response) {
      store.dispatch(hideSpinner());
      // Any status code that lie within the range of 2xx cause this function to trigger
      return response;
    },
    async function (error) {
      store.dispatch(hideSpinner());
      if (error?.response?.status === 401 && !error.config.url.includes('auth')) {
        try {
          await refreshToken();
          return http.request(error.config);
        } catch {
          return Promise.reject(error);
        }
      }
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      return Promise.reject(error);
    },
  );
}
