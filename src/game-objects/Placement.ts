import { LevelState } from "@/classes/LevelState";
import { IConfigPlacement } from "@/interfaces/IConfigPlacement.interface";
import { ILevel } from "@/interfaces/ILevel.interface";
import { IPlacement } from "@/interfaces/IPlacement.interface";

export class Placement implements IPlacement {
  id: number;
  type: string;
  x: number;
  y: number;
  level: LevelState;

  constructor(properties: IConfigPlacement, level: LevelState) {
    this.id = properties.id;
    this.type = properties.type;
    this.x = properties.x;
    this.y = properties.y;
    this.level = level;
  }

  tick() {}

  renderComponent(): JSX.Element | null {
    return null;
  }
}
