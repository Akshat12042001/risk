import {APIClient} from './client';

const ENDPOINTS = {
  BOOKINGS: '/bookings',
};

export const makeCreateBookingRequest = async () => {
  const response = await APIClient().post(ENDPOINTS.BOOKINGS);
  return response.data;
};

export const makeGetBookingsRequest = async (params = {}) => {
  const response = await APIClient().get(ENDPOINTS.BOOKINGS, {params});
  return response.data;
};

export const makeGetBookingRequest = async bookingId => {
  const response = await APIClient().get(`${ENDPOINTS.BOOKINGS}/${bookingId}`);
  return response.data;
};
