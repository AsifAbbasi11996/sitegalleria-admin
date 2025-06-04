import axios from "axios";
import { API_URL } from "../utils/baseUrl";

export const getLogo = async () => {
  return axios.get(`${API_URL}/logo/`);
};

export const addLogo = async (formData) => {
  return axios.post(`${API_URL}/logo/add`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateLogo = (id, formData) => {
  return axios.put(`${API_URL}/logo/update/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteLogo = (id) => {
  return axios.delete(`${API_URL}/logo/del/${id}`);
};
