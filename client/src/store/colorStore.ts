import { create } from "zustand";

interface IColor {
  color: string;
  setColor: (color: string) => void;
}

export const useColorStore = create<IColor>((set) => ({
  color: "#039be5",
  setColor: (color) =>
    set(() => ({
      color,
    })),
}));
