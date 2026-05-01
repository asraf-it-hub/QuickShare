import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

export const shareData = async (formData) => {
  const response = await api.post('/share', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const receiveData = async (pin) => {
  const response = await api.get(`/share/${pin}`);
  return response.data;
};

export default api;
