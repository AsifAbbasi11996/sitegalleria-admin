import axios from "axios";
import { API_URL } from "../utils/baseUrl";

export const addHotel = async (formData) => {
  return await axios.post(`${API_URL}/home/hotel/add`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getAllHotels = () => {
  return axios.get(`${API_URL}/home/hotel/`);
};

export const getHotelById = (id) => {
  return axios.get(`${API_URL}/home/hotel/${id}`);
};

export const updateHotel = (id, formData) => {
  return axios.put(`${API_URL}/home/hotel/update/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteHotel = (id) => {
  return axios.delete(`${API_URL}/home/hotel/del/${id}`);
};

export const deleteSlide = async (id, slideId) => {
  return await axios.delete(`${API_URL}/home/hotel/${id}/slide/${slideId}`);
};
