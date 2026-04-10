import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../../baseUrl/data/baseUrls';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/auth`,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.accessToken;
      console.log(`[AUTH][APP][API] prepareHeaders tokenPresent=${Boolean(token)}`);

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: builder => ({
    getCurrentUser: builder.query({
      query: () => {
        console.log('[AUTH][APP][API] Requesting GET /api/auth/me');
        return {
          url: '/me',
          method: 'GET',
        };
      },
    }),
    logout: builder.mutation({
      query: () => {
        console.log('[AUTH][APP][API] Requesting POST /api/auth/logout');
        return {
          url: '/logout',
          method: 'POST',
        };
      },
    }),
  }),
});

export const { useGetCurrentUserQuery, useLazyGetCurrentUserQuery, useLogoutMutation } = authApi;
