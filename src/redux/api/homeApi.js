import {baseApi} from './baseApi';

export const homeApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getHome: builder.query({
      query: () => ({
        url: '/home',
        method: 'GET',
      }),
      transformResponse: response => {
        const payload = response?.data ?? response;

        if (Array.isArray(payload)) {
          return payload;
        }

        if (Array.isArray(payload?.services)) {
          return payload.services;
        }

        if (payload?.id) {
          return [payload];
        }

        return [];
      },
      providesTags: ['Home'],
    }),
  }),
});

export const {useGetHomeQuery} = homeApi;
