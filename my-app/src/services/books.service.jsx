import AxiosConfig from './axiosConfig.js';

const RESOURCE = '/books';

export async function getAllBooks(sort) {
  const response = await AxiosConfig.get(`${RESOURCE}?sort=${sort}`);
  return response.data;
}

export async function getOneBook(id) {
  const response = await AxiosConfig.get(`${RESOURCE}/${id}`);
  return response.data;
}

export async function createBook(bookData) {
  const response = await AxiosConfig.post(RESOURCE, bookData);
  return response.data;
}

export async function updateBook(id, bookData) {
  const response = await AxiosConfig.put(`${RESOURCE}/${id}`, bookData);
  return response.data;
}

export async function deleteBook(id) {
  const response = await AxiosConfig.delete(`${RESOURCE}/${id}`);
  return response.data;
}

