import { createStore } from "zustand";

type PageState = {
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

export const usePageStore = createStore<PageState>(set => ({
  currentPage: 1,
  setCurrentPage: (page: number) => set({ currentPage: page }),
}));
