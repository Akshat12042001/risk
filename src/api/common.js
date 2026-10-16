import {APIClient} from './client';


const ENDPOINTS={
  ADD_ADDRESS:"/addresses"
}

export const makeGetAddressesRequest = async () => {
  const response = await APIClient().get(ENDPOINTS.GET_ADDRESSES);
  return response.data;
};