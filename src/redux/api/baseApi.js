import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import Config from 'react-native-config';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: Config.API_URL,
  prepareHeaders: (headers, {getState}) => {
    const token = getState()?.auth?.user?.token;
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: rawBaseQuery,
  tagTypes: ['Home', 'Addresses'],
  endpoints: () => ({}),
});
