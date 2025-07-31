import axios from "axios";
import { calorieCache, historyCache, generateCacheKey, generateHistoryCacheKey } from "./cache";
import { CalorieRequest } from "../types";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const register = (data: any) =>
  axios.post(`${API_URL}/auth/register`, data);

export const login = (data: any) => axios.post(`${API_URL}/auth/login`, data);

export const getCalories = async (data: CalorieRequest, token: string, userId?: string) => {
  const startTime = performance.now();
  
  // Generate cache key
  const cacheKey = generateCacheKey(data.dish_name, data.servings, userId);
  
  // Check cache first
  const cachedResult = calorieCache.get(cacheKey);
  if (cachedResult) {
    const responseTime = performance.now() - startTime;
    console.log(`Cache hit for: ${data.dish_name} (${responseTime.toFixed(2)}ms)`);
    return { data: cachedResult };
  }

  console.log(`Cache miss for: ${data.dish_name}`);
  
  // Make API call
  const response = await axios.post(`${API_URL}/get-calories`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const responseTime = performance.now() - startTime;
  console.log(`API response for: ${data.dish_name} (${responseTime.toFixed(2)}ms)`);

  // Cache the result
  calorieCache.set(cacheKey, response.data);
  
  return response;
};

export const getMealHistory = async (token: string, userId?: string) => {
  const startTime = performance.now();
  
  if (!userId) {
    // If no userId, make direct API call without caching
    const response = await axios.get(`${API_URL}/meal-history`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const responseTime = performance.now() - startTime;
    console.log(`Direct API call for meal history (${responseTime.toFixed(2)}ms)`);
    return response;
  }

  // Generate cache key for history
  const cacheKey = generateHistoryCacheKey(userId);
  
  // Check cache first
  const cachedHistory = historyCache.get(cacheKey);
  if (cachedHistory) {
    const responseTime = performance.now() - startTime;
    console.log(`History cache hit for user: ${userId} (${responseTime.toFixed(2)}ms)`);
    return { data: cachedHistory };
  }

  console.log(`History cache miss for user: ${userId}`);
  
  // Make API call
  const response = await axios.get(`${API_URL}/meal-history`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const responseTime = performance.now() - startTime;
  console.log(`API response for meal history (${responseTime.toFixed(2)}ms)`);

  // Cache the result
  historyCache.set(cacheKey, response.data);
  
  return response;
};