import axios from "axios";
import { API_URL } from "../utils/baseUrl";

export const addHotel = (formData) => {
  return axios.post(`${API_URL}/hotel/add`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getAllHotels = () => {
  return axios.get(`${API_URL}/hotel/`);
};

export const getHotelById = (id) => {
  return axios.get(`${API_URL}/hotel/${id}`);
};

export const updateHotel = (id, formData) => {
  return axios.put(`${API_URL}/hotel/update/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteHotel = (id) => {
  return axios.delete(`${API_URL}/hotel/delete/${id}`);
};
