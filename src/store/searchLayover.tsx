import { create } from "zustand";

interface SearchLayoverState {
  isVisible: boolean;
  toggle: () => void;
}

const useSearchLayoverStore = create<SearchLayoverState>((set) => ({
  isVisible: false,
  toggle: () => set((state) => ({ isVisible: !state.isVisible })),
}));

export default useSearchLayoverStore;
