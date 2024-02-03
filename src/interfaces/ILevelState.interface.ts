import { ILevel } from "./ILevel.interface";

export interface ILevelState {
  id: string;
  onEmit(newState: ILevel): void;
  theme: string;
  tilesWidth: number;
  tilesHeight: number;
  placements: any[];
}
