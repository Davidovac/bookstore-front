import AxiosConfig from './axiosConfig.js';

const RESOURCE = '/review';

export async function addReview(data) {
  const response = await AxiosConfig.post(RESOURCE, data);
  return response.data;
}