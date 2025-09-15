import AxiosConfig from './axiosConfig.js';

const RESOURCE = '/publishers';

export async function getAllPublishers() {
  const response = await AxiosConfig.get(RESOURCE);
  return response.data;
}

export async function getOnePublisher(id) {
  const response = await AxiosConfig.get(`${RESOURCE}/${id}`);
  return response.data;
}

export async function createPublisher(publisherData) {
  const response = await AxiosConfig.post(RESOURCE, publisherData);
  return response.data;
}

export async function updatePublisher(id, publisherData) {
  const response = await AxiosConfig.put(`${RESOURCE}/${id}`, publisherData);
  return response.data;
}

export async function deletePublisher(id) {
  const response = await AxiosConfig.delete(`${RESOURCE}/${id}`);
  return response.data;
}

