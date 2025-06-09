import axios from "axios";
import { API_URL } from "../utils/baseUrl";

// home slider
export const getAllSlider = () => {
  return axios.get(`${API_URL}/home/slider/`);
};

export const addSlider = (formData) => {
  return axios.post(`${API_URL}/home/slider/add`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateSlider = (id, formData) => {
  return axios.put(`${API_URL}/home/slider/update/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteSlider = (id) => {
  return axios.delete(`${API_URL}/home/slider/del/${id}`);
};

// home contact
export const getHomeContact = async () => {
  return axios.get(`${API_URL}/home/contact`);
};

export const addHomeContact = (formData) => {
  return axios.post(`${API_URL}/home/contact/add`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateHomeContact = (id, formData) => {
  return axios.put(`${API_URL}/home/contact/update/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteHomeContact = (id) => {
  return axios.delete(`${API_URL}/home/contact/del/${id}`);
};

// home about
export const getHomeAbout = async () => {
  return axios.get(`${API_URL}/home/about`);
};

export const addHomeAbout = (formData) => {
  return axios.post(`${API_URL}/home/about/add`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateHomeAbout = (id, formData) => {
  return axios.put(`${API_URL}/home/about/update/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteHomeAbout = (id) => {
  return axios.delete(`${API_URL}/home/about/del/${id}`);
};

// home banner
export const getAllBanner = async () => {
  return axios.get(`${API_URL}/home/banner/`);
};

export const addBanner = (formData) => {
  return axios.post(`${API_URL}/home/banner/add`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateBanner = (id, formData) => {
  return axios.put(`${API_URL}/home/banner/update/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteBanner = (id) => {
  return axios.delete(`${API_URL}/home/banner/del/${id}`);
};
