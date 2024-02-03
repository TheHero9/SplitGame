import { ILevel } from "./ILevel.interface";
import { IConfigPlacement } from "./IConfigPlacement.interface";

export interface ILevelState {
  id: string;
  onEmit(newState: ILevel): void;
  theme: string;
  tilesWidth: number;
  tilesHeight: number;
  placements: IConfigPlacement[];
}
