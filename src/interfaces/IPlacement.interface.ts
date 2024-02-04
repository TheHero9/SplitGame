import { LevelState } from "@/classes/LevelState";
import { Placement } from "@/game-objects/Placement";
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
  hasBeenCollected: boolean;
  tick(): void;
  displayXY(): number[];
  isSolidForBody(_body: Placement): boolean;
  zIndex(): number;
  addsItemToInventoryOnCollide(): string | null;
  collect(): void;
  renderComponent(): JSX.Element | null;
}

export type PlacementOrNullable = IPlacement | null;
