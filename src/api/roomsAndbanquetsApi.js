import axios from "axios";
import { API_URL } from "../utils/baseUrl";

// rooms
export const fetchRooms = () => axios.get(`${API_URL}/room/`);

export const addRoom = (formData) =>
  axios.post(`${API_URL}/room/add`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateRoom = (id, formData) =>
  axios.put(`${API_URL}/room/update/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteRoom = (id) => axios.delete(`${API_URL}/room/del/${id}`);

// banquets
export const fetchBanquets = () => axios.get(`${API_URL}/banquet/`);

export const addBanquet = (formData) =>
  axios.post(`${API_URL}/banquet/add`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateBanquet = (id, formData) =>
  axios.put(`${API_URL}/banquet/update/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteBanquet = (id) => axios.delete(`${API_URL}/banquet/del/${id}`);
