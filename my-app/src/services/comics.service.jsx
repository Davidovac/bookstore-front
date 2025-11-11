import AxiosConfig from './axiosConfig.js';

const RESOURCE = '/comics';

export const getIssuesPaged = async (volumeId, page) => {
  const response = await AxiosConfig.get(`${RESOURCE}/volumes/${volumeId}/issues?page=${page}`);
  return response.data;
};

export const getVolumesByName = async (volumeName) => {
  const response = await AxiosConfig.get(`${RESOURCE}/volumes?volumeName=${volumeName}`);
  return response.data;
};

export const createIssue = async (volumeId, data, issueId) => {
  const response = await AxiosConfig.post(`${RESOURCE}/volumes/${volumeId}/issues?issueId=${issueId}`, data);
  return response.data;
}