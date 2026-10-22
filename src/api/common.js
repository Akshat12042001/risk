import {APIClient} from './client';


const ENDPOINTS={
  ADDRESSES:"/addresses",
}

export const makeGetAddressesRequest = async () => {
  const response = await APIClient().get(ENDPOINTS.ADDRESSES);
  return response.data;
};

export const makeAddAddressRequest = async (data) => {
  const response = await APIClient().post(ENDPOINTS.ADDRESSES, data);
  return response.data;
};

export const makeEditAddressRequest = async (addressId, data) => {
  const response = await APIClient().patch(
    `${ENDPOINTS.ADDRESSES}/${addressId}`,
    data,
  );
  return response.data;
};

export const makeSelectAddressRequest = async addressId => {
  const response = await APIClient().post(
    `${ENDPOINTS.ADDRESSES}/${addressId}/select`,
  );
  return response.data;
};

export const makeDeleteAddressRequest = async addressId => {
  const response = await APIClient().delete(
    `${ENDPOINTS.ADDRESSES}/${addressId}`,
  );
  return response.data;
};