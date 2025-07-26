import { create } from "zustand";
import { CalorieResponse } from "../types";

interface MealHistoryState {
  history: CalorieResponse[];
  setHistory: (history: CalorieResponse[]) => void;
}

export const useMealHistoryStore = create<MealHistoryState>((set) => ({
  history: [],
  setHistory: (history) => set({ history }),
}));