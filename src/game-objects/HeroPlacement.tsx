import { Placement } from "./Placement";
import {
  BODY_SKINS,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  HERO_RUN_1,
  HERO_RUN_2,
  ValidDirection,
  Z_INDEX_LAYER_SIZE,
  directionUpdateMap,
} from "@/helpers/consts";
import Hero from "@/components/object-graphics/Hero";
import { TILES } from "@/helpers/tiles";
import { Collision } from "@/classes/Collision";

const heroSkinMap = {
  [BODY_SKINS.NORMAL]: [TILES.HERO_LEFT, TILES.HERO_RIGHT],
  [HERO_RUN_1]: [TILES.HERO_RUN_1_LEFT, TILES.HERO_RUN_1_RIGHT],
  [HERO_RUN_2]: [TILES.HERO_RUN_2_LEFT, TILES.HERO_RUN_2_RIGHT],
};

export class HeroPlacement extends Placement {
  controllerMoveRequested(direction: ValidDirection) {
    //Attempt to start moving
    if (this.movingPixelsRemaining > 0) {
      return;
    }

    const canMove = this.canMoveToNextDestination(direction);
    if (!canMove) return;

    //Start the move
    this.movingPixelsRemaining = 16;
    this.movingPixelDirection = DIRECTION_RIGHT;
    this.movingPixelDirection = direction;
    this.updateFacingDirection();
    this.updateWalkFrame();
  }

  canMoveToNextDestination(direction: ValidDirection) {
    const { x, y } = directionUpdateMap[direction];
    const nextX = this.x + x;
    const nextY = this.y + y;
    const isOutOfBounds = this.level.isPositionOutOfBounds(nextX, nextY);
    if (isOutOfBounds) return false;

    /// check for solid thing
    const collision = new Collision(this, this.level, {
      x: nextX,
      y: nextY,
    });
    if (collision.withSolidPlacement()) return false;

    // Default to allowing move
    return true;
  }

  private updateFacingDirection() {
    if (
      this.movingPixelDirection === DIRECTION_LEFT ||
      this.movingPixelDirection === DIRECTION_RIGHT
    ) {
      this.spriteFacingDirection = this.movingPixelDirection;
    }
  }

  private updateWalkFrame() {
    this.spriteWalkFrame = this.spriteWalkFrame === 1 ? 0 : 1;
  }

  tick() {
    this.tickMovingPixelProgress();
  }

  private getFrame() {
    //Which frame to show?
    const index = this.spriteFacingDirection === DIRECTION_LEFT ? 0 : 1;

    //Use correct walking frame per direction
    if (this.movingPixelsRemaining > 0) {
      const walkKey = this.spriteWalkFrame === 0 ? HERO_RUN_1 : HERO_RUN_2;
      return heroSkinMap[walkKey][index];
    }

    return heroSkinMap[BODY_SKINS.NORMAL][index];
  }

  private getYTranslate() {
    // Stand on ground when not moving
    if (this.movingPixelsRemaining === 0) {
      return 0;
    }

    //Elevate ramp up or down at beginning/end of movement
    const PIXELS_FROM_END = 2;
    if (
      this.movingPixelsRemaining < PIXELS_FROM_END ||
      this.movingPixelsRemaining > 16 - PIXELS_FROM_END
    ) {
      return -1;
    }

    // Highest in the middle of the movement
    return -2;
  }

  zIndex() {
    return this.y * Z_INDEX_LAYER_SIZE + 1;
  }

  private tickMovingPixelProgress() {
    if (this.movingPixelsRemaining === 0) {
      return;
    }
    this.movingPixelsRemaining -= this.travelPixelsPerFrame;
    if (this.movingPixelsRemaining <= 0) {
      this.movingPixelsRemaining = 0;
      this.onDoneMoving();
    }
  }

  private onDoneMoving() {
    //Update my x/y!
    const { x, y } = directionUpdateMap[this.movingPixelDirection];
    this.x += x;
    this.y += y;
    this.handleCollisions();
  }

  handleCollisions() {
    //handle collisions
    const collision = new Collision(this, this.level);
    const collideThatAddsToInventory = collision.withPlacementAddsToInventory();
    if (collideThatAddsToInventory) {
      console.log("handle collision", collideThatAddsToInventory);
    }
  }

  renderComponent() {
    return (
      <Hero frameCoord={this.getFrame()} yTranslate={this.getYTranslate()} />
    );
  }
}
