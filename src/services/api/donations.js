// src/services/api/donations.js
import api from "./axios.config";

export const createDonation = async (payload) => {
  const response = await api.post("/donations", payload);
  return response.data;
};
