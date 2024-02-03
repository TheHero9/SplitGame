import { ILevel } from "./ILevel.interface";
import { IConfigPlacement } from "./IConfigPlacement.interface";
import { GameLoop } from "@/classes/GameLoop";
import { HeroPlacement } from "@/game-objects/HeroPlacement";
import { PlacementOrNullable } from "./IPlacement.interface";
import { DirectionControls } from "@/classes/DirectionControls";

export interface ILevelState {
  id: string;
  theme: string;
  tilesWidth: number;
  tilesHeight: number;
  placements: IConfigPlacement[];
  componentsToRender: PlacementOrNullable[];
  gameLoop: GameLoop;
  directionControls: DirectionControls;
  onEmit(newState: ILevel): void;
}
