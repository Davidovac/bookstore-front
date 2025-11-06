import axiosConfig from './axiosConfig.js';

export const getUserProfile = async () => {
  const response = await axiosConfig.get(`/profile`);
  return response.data;
};