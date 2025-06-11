import axios from "axios";
import { API_URL } from "../utils/baseUrl";

// --- About Page APIs ---

export const getAbout = () => axios.get(`${API_URL}/about-us/`);

export const createAbout = (formData) =>
  axios.post(`${API_URL}/about-us/add`, formData);

export const updateAbout = (formData) =>
  axios.put(`${API_URL}/about-us/update`, formData);

export const deleteAbout = () =>
  axios.delete(`${API_URL}/about-us/delete`);

// --- Services APIs ---

export const addService = (formData) =>
  axios.post(`${API_URL}/about-us/service/add`, formData);

export const updateService = (id, formData) =>
  axios.put(`${API_URL}/about-us/service/update/${id}`, formData);

export const deleteService = (id) =>
  axios.delete(`${API_URL}/about-us/service/del/${id}`);
