import {APIClient} from './client';

const ENDPOINTS={
  SEND_OTP:"/auth/send-otp",
  VERIFY_OTP:"/auth/verify-otp",
  ME:"/auth/me",
  LOGOUT:"/auth/logout"
}

export const makeOTPRequest = async (phone) => {
  const response = await APIClient().post(ENDPOINTS.SEND_OTP, {
    phone
  });
  return response.data;
};

export const verifyOTPRequest = async (phone, otp) => {
  const response = await APIClient().post(ENDPOINTS.VERIFY_OTP, {
    phone,
    otp
  });
  return response.data;
};

export const makeMeRequest = async () => {
  const response = await APIClient().get(ENDPOINTS.ME);
  return response.data;
};

export const makeLogoutRequest = async () => {
  const response = await APIClient().post(ENDPOINTS.LOGOUT);
  return response.data;
};