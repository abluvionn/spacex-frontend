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
  GetApplicationsResponse,
  Application,
  LogoutResponse,
  RegisterRequest,
  Admin,
  AppStatus,
  DriverRegisterRequest,
  DriverLoginRequest,
  DriverLoginResponse,
  Driver,
  DriverApplication,
  KnowledgeTestQuestion,
  KnowledgeTestSubmitRequest,
  KnowledgeTestResult,
} from '@/lib/types';
import { API_BASE_URL } from './constants';

// Admin token refresh
let isRefreshingAdmin = false;
let adminRefreshPromise: Promise<string | null> | null = null;

const refreshAdminToken = async (): Promise<string | null> => {
  if (isRefreshingAdmin && adminRefreshPromise) {
    return adminRefreshPromise;
  }

  isRefreshingAdmin = true;
  adminRefreshPromise = (async () => {
    try {
      const response = await fetch(`${API_BASE_URL}auth/refresh-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        localStorage.removeItem('token');
        localStorage.removeItem('admin');
        if (
          typeof window !== 'undefined' &&
          window.location.href !== '/admin/login'
        ) {
          window.location.href = '/admin/login';
        }
        return null;
      }

      const data = (await response.json()) as { accessToken: string };
      const newToken = data.accessToken;
      localStorage.setItem('token', newToken);
      return newToken;
    } catch (error) {
      console.error('Token refresh failed:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('admin');
      if (
        typeof window !== 'undefined' &&
        window.location.href !== '/admin/login'
      ) {
        window.location.href = '/admin/login';
      }
      return null;
    } finally {
      isRefreshingAdmin = false;
      adminRefreshPromise = null;
    }
  })();

  return adminRefreshPromise;
};

// Driver token refresh
let isRefreshingDriver = false;
let driverRefreshPromise: Promise<string | null> | null = null;

const refreshDriverToken = async (): Promise<string | null> => {
  if (isRefreshingDriver && driverRefreshPromise) {
    return driverRefreshPromise;
  }

  isRefreshingDriver = true;
  driverRefreshPromise = (async () => {
    try {
      const response = await fetch(`${API_BASE_URL}driver/auth/refresh-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        localStorage.removeItem('driver-token');
        localStorage.removeItem('driver');
        if (
          typeof window !== 'undefined' &&
          window.location.href !== '/driver/login'
        ) {
          window.location.href = '/driver/login';
        }
        return null;
      }

      const data = (await response.json()) as { accessToken: string };
      const newToken = data.accessToken;
      localStorage.setItem('driver-token', newToken);
      return newToken;
    } catch (error) {
      console.error('Driver token refresh failed:', error);
      localStorage.removeItem('driver-token');
      localStorage.removeItem('driver');
      if (
        typeof window !== 'undefined' &&
        window.location.href !== '/driver/login'
      ) {
        window.location.href = '/driver/login';
      }
      return null;
    } finally {
      isRefreshingDriver = false;
      driverRefreshPromise = null;
    }
  })();

  return driverRefreshPromise;
};

// Detect which token to use based on current request
const getTokenFromStorage = (
  url: string,
): { token: string | null; type: 'admin' | 'driver' } => {
  if (url.includes('/driver/')) {
    return { token: localStorage.getItem('driver-token'), type: 'driver' };
  }
  return { token: localStorage.getItem('token'), type: 'admin' };
};

const baseQueryWithTokenRefresh: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
      if (typeof window !== 'undefined') {
        const url =
          typeof args === 'string' ? args : (args as FetchArgs).url || '';
        const { token } = getTokenFromStorage(url);
        if (token) headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  });

  let result = await baseQuery(args, api, extraOptions);

  if ((result.error as FetchBaseQueryError)?.status === 401) {
    const url = typeof args === 'string' ? args : (args as FetchArgs).url || '';
    const { type } = getTokenFromStorage(url);

    const newToken =
      type === 'driver'
        ? await refreshDriverToken()
        : await refreshAdminToken();

    if (newToken) {
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithTokenRefresh,
  endpoints: (builder) => ({
    // Admin endpoints
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
    }),
    register: builder.mutation<Admin, RegisterRequest>({
      query: (body) => ({
        url: 'auth/register',
        method: 'POST',
        body,
      }),
    }),
    getApplications: builder.query<
      GetApplicationsResponse,
      { page?: number; limit?: number; status: AppStatus | null } | void
    >({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append('page', String(params.page));
        if (params?.limit) queryParams.append('limit', String(params.limit));
        if (params?.status) queryParams.append('status', String(params.status));
        return {
          url: `userApplications${
            queryParams.toString() ? '?' + queryParams.toString() : ''
          }`,
          method: 'GET',
        };
      },
    }),
    getApplicationById: builder.query<Application, string>({
      query: (id) => ({
        url: `userApplications/${id}`,
        method: 'GET',
      }),
    }),
    getAllApplications: builder.query<Application[], void>({
      query: () => ({
        url: 'userApplications/all',
        method: 'GET',
      }),
    }),
    updateApplicationStatus: builder.mutation<
      Application,
      { id: string; status: AppStatus }
    >({
      query: ({ id, status }) => ({
        url: `userApplications/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
    }),
    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
      }),
    }),

    // Driver endpoints
    driverRegister: builder.mutation<Driver, DriverRegisterRequest>({
      query: (body) => ({
        url: 'driver/auth/register',
        method: 'POST',
        body,
      }),
    }),
    driverLogin: builder.mutation<DriverLoginResponse, DriverLoginRequest>({
      query: (body) => ({
        url: 'driver/auth/login',
        method: 'POST',
        body,
      }),
    }),
    driverGetProfile: builder.query<Driver, void>({
      query: () => ({
        url: 'driver/auth/profile',
        method: 'GET',
      }),
    }),
    driverUpdateProfile: builder.mutation<Driver, Partial<Driver>>({
      query: (body) => ({
        url: 'driver/auth/profile',
        method: 'PUT',
        body,
      }),
    }),
    driverCreateApplication: builder.mutation<DriverApplication, FormData>({
      query: (formData) => ({
        url: 'driver/applications',
        method: 'POST',
        body: formData,
      }),
    }),
    driverGetApplication: builder.query<DriverApplication, void>({
      query: () => ({
        url: 'driver/applications',
        method: 'GET',
      }),
    }),
    driverUpdateApplication: builder.mutation<
      DriverApplication,
      Partial<DriverApplication>
    >({
      query: (body) => ({
        url: 'driver/applications',
        method: 'PUT',
        body,
      }),
    }),
    driverGetApplicationStatus: builder.query<{ status: AppStatus }, void>({
      query: () => ({
        url: 'driver/applications/status',
        method: 'GET',
      }),
    }),
    driverGetKnowledgeTestQuestions: builder.query<
      KnowledgeTestQuestion[],
      void
    >({
      query: () => ({
        url: 'driver/knowledge-test/questions',
        method: 'GET',
      }),
    }),
    driverSubmitKnowledgeTest: builder.mutation<
      KnowledgeTestResult,
      KnowledgeTestSubmitRequest
    >({
      query: (body) => ({
        url: 'driver/knowledge-test/submit',
        method: 'POST',
        body,
      }),
    }),
    driverLogout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: 'driver/auth/logout',
        method: 'POST',
      }),
    }),
  }),
});

export const {
  // Admin hooks
  useLoginMutation,
  useRegisterMutation,
  useGetApplicationsQuery,
  useGetApplicationByIdQuery,
  useLazyGetAllApplicationsQuery,
  useUpdateApplicationStatusMutation,
  useLogoutMutation,
  // Driver hooks
  useDriverRegisterMutation,
  useDriverLoginMutation,
  useDriverGetProfileQuery,
  useDriverUpdateProfileMutation,
  useDriverCreateApplicationMutation,
  useDriverGetApplicationQuery,
  useDriverUpdateApplicationMutation,
  useDriverGetApplicationStatusQuery,
  useDriverGetKnowledgeTestQuestionsQuery,
  useDriverSubmitKnowledgeTestMutation,
  useDriverLogoutMutation,
} = api;
