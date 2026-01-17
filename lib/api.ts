import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
  BaseQueryFn,
  FetchArgs,
} from '@reduxjs/toolkit/query/react';
import type {
  LoginRequest,
  LoginResponse,
  FormResponse,
  GetApplicationsResponse,
  Application,
} from '@/lib/types';

// Flag to prevent multiple refresh requests
let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

const refreshToken = async (): Promise<string | null> => {
  // Prevent multiple simultaneous refresh requests
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;
  refreshPromise = (async () => {
    try {
      const response = await fetch(
        'http://localhost:8000/api/auth/refresh-token',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Send cookies with the request
        }
      );

      if (!response.ok) {
        // Refresh failed, clear storage and redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/admin/login';
        return null;
      }

      const data = (await response.json()) as { accessToken: string };
      const newToken = data.accessToken;

      // Update token in localStorage
      localStorage.setItem('token', newToken);

      return newToken;
    } catch (error) {
      console.error('Token refresh failed:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/admin/login';
      return null;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};

const baseQueryWithTokenRefresh: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/',
    credentials: 'include', // Include cookies in requests
    prepareHeaders: (headers) => {
      // Add bearer token from localStorage when available
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  });

  let result = await baseQuery(args, api, extraOptions);

  // If we get a 401, try to refresh the token
  if ((result.error as FetchBaseQueryError)?.status === 401) {
    const newToken = await refreshToken();

    if (newToken) {
      // Retry the original request with the new token
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithTokenRefresh,
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
    }),
    submitApplicationForm: builder.mutation<FormResponse, FormData>({
      query: (formData) => ({
        url: 'applications',
        method: 'POST',
        body: formData,
      }),
    }),
    getApplications: builder.query<
      GetApplicationsResponse,
      { page?: number; limit?: number } | void
    >({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append('page', String(params.page));
        if (params?.limit) queryParams.append('limit', String(params.limit));
        return {
          url: `applications${
            queryParams.toString() ? '?' + queryParams.toString() : ''
          }`,
          method: 'GET',
        };
      },
    }),
    getApplicationById: builder.query<Application, string>({
      query: (id) => ({
        url: `applications/${id}`,
        method: 'GET',
      }),
    }),
    toggleApplicationArchive: builder.mutation<Application, string>({
      query: (id) => ({
        url: `applications/${id}/toggle-archive`,
        method: 'PATCH',
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSubmitApplicationFormMutation,
  useGetApplicationsQuery,
  useGetApplicationByIdQuery,
  useToggleApplicationArchiveMutation,
} = api;
