import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  LoginRequest,
  LoginResponse,
  FormResponse,
  GetApplicationsResponse,
  Application,
} from '@/lib/types';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/',
    prepareHeaders: (headers) => {
      // Add bearer token from localStorage when available
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
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
  }),
});

export const {
  useLoginMutation,
  useSubmitApplicationFormMutation,
  useGetApplicationsQuery,
  useGetApplicationByIdQuery,
} = api;
