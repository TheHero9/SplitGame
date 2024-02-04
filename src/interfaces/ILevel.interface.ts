import { PlacementOrNullable } from "./IPlacement.interface";

export interface ILevel {
  theme: string;
  tilesWidth: number;
  tilesHeight: number;
  placements: PlacementOrNullable[];
  isCompleted: boolean;
}
