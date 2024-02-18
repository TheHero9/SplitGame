import { atom } from "recoil";

export const currentLevelIdAtom = atom<string>({
  key: "currentLevelIdAtom",
  default: "DemoLevel1",
});
