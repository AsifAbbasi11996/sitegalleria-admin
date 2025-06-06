import axios from "axios";
import { API_URL } from "../utils/baseUrl";

export const getAllHotels = () => {
  return axios.get(`${API_URL}/hotels`);
};

export const addHotel = (formData) => {
  return axios.post(`${API_URL}/hotels/add`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateHotel = (id, formData) => {
  return axios.put(`${API_URL}/hotels/update/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteHotel = (id) => {
  return axios.delete(`${API_URL}/hotels/del/${id}`);
};

export const getHotelById = (id) => {
  return axios.get(`${API_URL}/hotels/get/${id}`);
};
