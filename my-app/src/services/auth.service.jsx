import axiosConfig from './axiosConfig.js';

export const login = async (data) => {
  const response = await axiosConfig.post(`/auth/login`, data);
  return response;
};

export const register = async (data) => {
  const response = await axiosConfig.post(`/auth/register`, data);
  return response;
};

export const loadDriveFiles = async () => {
  const response = await axiosConfig.get('http://localhost:5001/api/drive/files', { withCredentials: true });
  return response;
}

export const getGoogleToken = async () => {
  const response = await axiosConfig.get(`googledrive/token`, {
  credentials: "include"
});
  return response;
};