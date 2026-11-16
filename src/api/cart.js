import {APIClient} from './client';

const ENDPOINTS = {
  CART: '/cart',
  ITEMS: '/cart/items',
  BOOKING: '/cart/booking',
};

export const makeGetCartRequest = async () => {
  const response = await APIClient().get(ENDPOINTS.CART);
  return response.data;
};

export const makeAddCartItemRequest = async data => {
  const response = await APIClient().post(ENDPOINTS.ITEMS, data);
  return response.data;
};

export const makeUpdateCartItemRequest = async (itemId, data) => {
  const response = await APIClient().patch(
    `${ENDPOINTS.ITEMS}/${itemId}`,
    data,
  );
  return response.data;
};

export const makeRemoveCartItemRequest = async itemId => {
  const response = await APIClient().delete(`${ENDPOINTS.ITEMS}/${itemId}`);
  return response.data;
};

export const makeUpdateCartBookingRequest = async data => {
  const response = await APIClient().patch(ENDPOINTS.BOOKING, data);
  return response.data;
};
