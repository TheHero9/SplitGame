import { LevelState } from "@/classes/LevelState";
import { ILevel } from "./ILevel.interface";

export interface IPlacement {
  id: number;
  type: string;
  x: number;
  y: number;
  level: LevelState;
  renderComponent(): JSX.Element | null;
}

export type PlacementOrNullable = IPlacement | null;
