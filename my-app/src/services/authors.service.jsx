import AxiosConfig from './axiosConfig.js';

const RESOURCE = '/authors';

export async function getAllAuthorsPaged(page) {
  if (!page || page < 1) {
    page = 1
  }
  const response = await AxiosConfig.get(`${RESOURCE}?page=${page}`);
  return response.data;
}

export async function getAllNames() {
  const response = await AxiosConfig.get(RESOURCE + "/names")
  return response.data
}

export async function getOneAuthors(id) {
  const response = await AxiosConfig.get(`${RESOURCE}/${id}`);
  return response.data;
}

export async function createAuthors(authorData) {
  const response = await AxiosConfig.post(RESOURCE, authorData);
  return response.data;
}

export async function updateAuthors(id, authorData) {
  const response = await AxiosConfig.put(`${RESOURCE}/${id}`, authorData);
  return response.data;
}

export async function deleteAuthors(id) {
  const response = await AxiosConfig.delete(`${RESOURCE}/${id}`);
  return response.data;
}

