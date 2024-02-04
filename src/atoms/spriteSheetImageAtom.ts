import { atom } from "recoil";

export const spriteSheetImageAtom = atom<HTMLImageElement | null>({
  key: "spriteSheetImageAtom",
  default: null,
});
