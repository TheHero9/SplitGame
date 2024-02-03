import { Placement } from "./Placement";
import { LevelState } from "@/classes/LevelState";
import { DIRECTION_RIGHT, directionUpdateMap } from "@/helpers/consts";
import { IConfigPlacement } from "@/interfaces/IConfigPlacement.interface";
import Hero from "@/components/object-graphics/Hero";

export class HeroPlacement extends Placement {
  constructor(properties: IConfigPlacement, level: LevelState) {
    super(properties, level);
    this.movingPixelsRemaining = 16;
    this.movingPixelDirection = DIRECTION_RIGHT;
  }

  tick() {
    this.tickMovingPixelProgress();
  }

  tickMovingPixelProgress() {
    if (this.movingPixelsRemaining === 0) {
      return;
    }
    this.movingPixelsRemaining -= this.travelPixelsPerFrame;
    if (this.movingPixelsRemaining <= 0) {
      this.movingPixelsRemaining = 0;
      this.onDoneMoving();
    }
  }

  onDoneMoving() {
    //Update my x/y!
    const { x, y } = directionUpdateMap[this.movingPixelDirection];
    this.x += x;
    this.y += y;
  }

  renderComponent() {
    return <Hero />;
  }
}
