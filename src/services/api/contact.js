import api from './axios.config.js';

export const sendContactMessage = async (payload) => {
  const response = await api.post('/contact', payload);
  return response.data;
};

export const getContactMessages = async () => {
  const response = await api.get('/contact');
  return response.data;
};
