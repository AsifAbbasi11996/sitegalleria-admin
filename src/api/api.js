import axios from "axios";
import { API_URL } from "../utils/baseUrl";

// slider famous hotel
export const uploadSlider = (formData) =>
  axios.post(`${API_URL}/home/hotelImage/add`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const addMoreHotelImages = async (id, formData) => {
  return await axios.put(
    `${API_URL}/home/hotelImage/add-images/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const updateHotelImageByImageId = (imageId, id, formData) => {
  return axios.put(
    `${API_URL}/home/hotelImage/update/${id}/${imageId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const getSliders = () => {
  return axios.get(`${API_URL}/home/hotelImage`);
};

export const updateSlider = (id, formData) => {
  return axios.put(`${API_URL}/home/hotelImage/update/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteImageFromHotelImage = (hotelImageId, imageId) => {
  return axios.delete(
    `${API_URL}/home/hotelImage/del/image/${hotelImageId}/${imageId}`
  );
};

export const deleteSlider = (id) => {
  return axios.delete(`${API_URL}/home/hotelImage/del/${id}`);
};

// Location apis

// Add a new location
export const addDestination = (data) =>
  axios.post(`${API_URL}/home/location/add`, data);

// Get all location
export const getDestinations = () => axios.get(`${API_URL}/home/location/`);

// Get location by ID
export const getDestinationById = (id) =>
  axios.get(`${API_URL}/home/location/${id}`);

// Update location
export const updateDestination = (id, data) =>
  axios.put(`${API_URL}/home/location/update/${id}`, data);

// Delete location
export const deleteDestination = (id) =>
  axios.delete(`${API_URL}/home/location/del/${id}`);
