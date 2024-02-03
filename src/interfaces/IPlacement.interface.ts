import { LevelState } from "@/classes/LevelState";
import { ILevel } from "./ILevel.interface";

export interface IPlacement {
  id: number;
  type: string;
  x: number;
  y: number;
  level: LevelState;
  tick(): void;
  renderComponent(): JSX.Element | null;
  displayXY(): number[];
  displayMovingXY(): number[];
}

export type PlacementOrNullable = IPlacement | null;
