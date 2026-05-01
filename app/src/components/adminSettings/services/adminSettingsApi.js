import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../../baseUrl/data/baseUrls';

export const adminSettingsApi = createApi({
  reducerPath: 'adminSettingsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/admin`,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.accessToken;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['AdminSettings'],
  endpoints: builder => ({
    getSettings: builder.query({
      query: () => '/settings',
      providesTags: ['AdminSettings'],
    }),
    updateSettings: builder.mutation({
      query: body => ({
        url: '/settings',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['AdminSettings'],
    }),
  }),
});

export const { useGetSettingsQuery, useUpdateSettingsMutation } = adminSettingsApi;
