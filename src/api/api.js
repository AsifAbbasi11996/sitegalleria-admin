import axios from "axios";
import { API_URL } from "../utils/baseUrl";

export const uploadSlider = (formData) =>
  axios.post(`${API_URL}/slider/add`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getSliders = () => axios.get(`${API_URL}/slider`);

export const addDestination = (data) =>
  axios.post(`${API_URL}/destination/add`, data);

export const getDestinations = () => axios.get(`${API_URL}/destination`);
