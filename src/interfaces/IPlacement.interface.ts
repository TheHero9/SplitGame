import { LevelState } from "@/classes/LevelState";
import { ILevel } from "./ILevel.interface";
import { ValidDirection } from "@/helpers/consts";

export interface IPlacement {
  id: number;
  type: string;
  x: number;
  y: number;
  level: LevelState;
  travelPixelsPerFrame: number;
  movingPixelsRemaining: number;
  movingPixelDirection: ValidDirection;
  spriteFacingDirection: ValidDirection;
  spriteWalkFrame: number;
  tick(): void;
  renderComponent(): JSX.Element | null;
  displayXY(): number[];
  displayMovingXY(): number[];
}

export type PlacementOrNullable = IPlacement | null;
