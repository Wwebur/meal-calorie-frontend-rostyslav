import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const register = (data: any) =>
  axios.post(`${API_URL}/auth/register`, data);

export const login = (data: any) => axios.post(`${API_URL}/auth/login`, data);

export const getCalories = (data: any, token: string) =>
  axios.post(`${API_URL}/get-calories`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getMealHistory = (token: string) =>
  axios.get(`${API_URL}/meal-history`, {
    headers: { Authorization: `Bearer ${token}` },
  });
