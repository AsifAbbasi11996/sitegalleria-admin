// src/api/dayUseRoomApi.js
import axios from "axios";
import { API_URL } from "../utils/baseUrl";

export const addDayUseRoom = async (formData) => {
  return axios.post(`${API_URL}/day-use-room/add`, formData);
};

export const getDayUseRooms = async () => {
  return axios.get(`${API_URL}/day-use-room/`);
};

export const updateDayUseRoom = async (id, formData) => {
  return axios.put(`${API_URL}/day-use-room/update/${id}`, formData);
};

export const deleteDayUseRoom = async (id) => {
  return axios.delete(`${API_URL}/day-use-room/del/${id}`);
};
