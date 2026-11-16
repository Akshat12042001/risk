import {APIClient} from './client';

const ENDPOINTS = {
  COUPONS: '/coupons',
  APPLY: '/coupons/apply',
};

export const makeGetCouponsRequest = async () => {
  const response = await APIClient().get(ENDPOINTS.COUPONS);
  return response.data;
};

export const makeApplyCouponRequest = async code => {
  const response = await APIClient().post(ENDPOINTS.APPLY, {
    code: String(code || '').trim().toUpperCase(),
  });
  return response.data;
};

export const makeRemoveCouponRequest = async () => {
  const response = await APIClient().delete(ENDPOINTS.APPLY);
  return response.data;
};
