import { create } from "zustand";

interface FilterState {
  selectedCategories: string[];
  toggleCategory: (category: string) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  selectedCategories: [],
  toggleCategory: (category) =>
    set((state) => ({
      selectedCategories: state.selectedCategories.includes(category)
        ? state.selectedCategories.filter((c) => c !== category)
        : [...state.selectedCategories, category],
    })),
}));
