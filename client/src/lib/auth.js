import axiosInstance from './axios';

export const loginApi = async (credentials) => {
  const response = await axiosInstance.post('/users/log_in', credentials);
  localStorage.setItem('authToken', response.data.token);
  return response.data;
};

