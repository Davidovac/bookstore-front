import axiosConfig from './axiosConfig.js';

export const login = async (data) => {
  const response = await axiosConfig.post(`/auth/login`, data);
  return response;
};

export const register = async (data) => {
  const response = await axiosConfig.post(`/auth/register`, data);
  return response;
};