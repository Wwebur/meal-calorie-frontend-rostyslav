export interface User {
  first_name: string;
  last_name: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface CalorieRequest {
  dish_name: string;
  servings: number;
}

export interface CalorieResponse {
  dish_name: string;
  servings: number;
  calories_per_serving: number;
  total_calories: number;
  source: string;
  date: string;
}
