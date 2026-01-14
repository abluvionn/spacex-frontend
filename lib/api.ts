import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { LoginRequest, LoginResponse } from '@/lib/types';

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
  }),
});

export const { useLoginMutation } = api;
