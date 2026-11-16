import {APIClient} from './client';

const ENDPOINTS = {
  SLOTS: '/slots',
};

export const makeGetSlotsRequest = async (params = {}) => {
  const response = await APIClient().get(ENDPOINTS.SLOTS, {params});
  return response.data;
};
