import axiosInstance from './axios';

export const login = async (credentials) => {
  const response = await axiosInstance.post('/login', credentials);
  localStorage.setItem('authToken', response.data.token);
  return response.data;
};