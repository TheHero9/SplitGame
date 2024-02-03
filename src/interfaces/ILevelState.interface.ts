import { ILevel } from "./ILevel.interface";
import { IConfigPlacement } from "./IConfigPlacement.interface";
import { GameLoop } from "@/classes/GameLoop";

export interface ILevelState {
  id: string;
  onEmit(newState: ILevel): void;
  theme: string;
  tilesWidth: number;
  tilesHeight: number;
  placements: IConfigPlacement[];
  gameLoop: GameLoop | null;
}
