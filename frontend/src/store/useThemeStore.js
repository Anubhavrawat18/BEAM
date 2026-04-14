// we want to save the currently chosen theme so it doesn't go when we refresh the page
import { create } from "zustand";
import { THEMES } from "../constants/themes";

export const useThemeStore = create((set) => ({
  theme: THEMES[0],
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);
    set({ theme });
  },
}));
