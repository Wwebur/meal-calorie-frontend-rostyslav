import { create } from "zustand";
import { CalorieResponse } from "../types";

interface MealState {
  lastResult: CalorieResponse | null;
  setResult: (result: CalorieResponse) => void;
  clear: () => void;
}

export const useMealStore = create<MealState>((set) => ({
  lastResult: null,
  setResult: (result) => set({ lastResult: result }),
  clear: () => set({ lastResult: null }),
}));
