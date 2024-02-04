import { LevelState } from "@/classes/LevelState";
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
  displayXY(): number[];
  renderComponent(): JSX.Element | null;
}

export type PlacementOrNullable = IPlacement | null;
