import { LevelState } from "@/classes/LevelState";
import {
  CELL_SIZE,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_UP,
  ValidDirection,
} from "@/helpers/consts";
import { IConfigPlacement } from "@/interfaces/IConfigPlacement.interface";
import { ILevel } from "@/interfaces/ILevel.interface";
import { IPlacement } from "@/interfaces/IPlacement.interface";

export class Placement implements IPlacement {
  id: number;
  type: string;
  x: number;
  y: number;
  level: LevelState;
  travelPixelsPerFrame: number = 1.5;
  movingPixelsRemaining: number = 0;
  movingPixelDirection: ValidDirection = DIRECTION_RIGHT;

  constructor(properties: IConfigPlacement, level: LevelState) {
    this.id = properties.id;
    this.type = properties.type;
    this.x = properties.x;
    this.y = properties.y;
    this.level = level;
  }

  tick() {}

  displayXY(): number[] {
    if (this.movingPixelsRemaining > 0) {
      return this.displayMovingXY();
    }

    const x = this.x * CELL_SIZE;
    const y = this.y * CELL_SIZE;
    return [x, y];
  }

  displayMovingXY(): number[] {
    const x = this.x * CELL_SIZE;
    const y = this.y * CELL_SIZE;
    const progressPixels = CELL_SIZE - this.movingPixelsRemaining;
    switch (this.movingPixelDirection) {
      case DIRECTION_LEFT:
        return [x - progressPixels, y];
      case DIRECTION_RIGHT:
        return [x + progressPixels, y];
      case DIRECTION_UP:
        return [x, y - progressPixels];
      default:
        return [x, y + progressPixels];
    }
  }

  renderComponent(): JSX.Element | null {
    return null;
  }
}
