import {APIClient} from './client';

const ENDPOINTS = {
  SERVICES: '/services',
};

export const makeGetServiceRequest = async serviceId => {
  const response = await APIClient().get(
    `${ENDPOINTS.SERVICES}/${serviceId}`,
  );
  return response.data;
};
