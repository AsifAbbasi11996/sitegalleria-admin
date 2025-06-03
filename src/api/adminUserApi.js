import axios from "axios"
import { API_URL } from "../utils/baseUrl"

export const login = async (credentials) => {
  return axios.post(`${API_URL}/admin-user/login`, credentials);
};