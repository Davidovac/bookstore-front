import AxiosConfig from './axiosConfig.js';

const RESOURCE = '/books';

export const getAllBooks = async (sort, filters = {}) => {
  const params = new URLSearchParams();

  if (filters.title) params.append("Title", filters.title);
  if (filters.fromPublished) params.append("FromPublished", filters.fromPublished);
  if (filters.toPublished) params.append("ToPublished", filters.toPublished);
  if (filters.authorId) params.append("AuthorId", filters.authorId);
  if (filters.authorName) params.append("AuthorName", filters.authorName);
  if (filters.fromBirthDate) params.append("FromBirthDate", filters.fromBirthDate);
  if (filters.toBirthDate) params.append("ToBirthDate", filters.toBirthDate);

  params.append("sort", sort);

  const response = await AxiosConfig.get(`/books?${params.toString()}`);
  return response.data;
};

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

