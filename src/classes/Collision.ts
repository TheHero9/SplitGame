import { HeroPlacement } from "@/game-objects/HeroPlacement";
import { IConfigPlacement } from "@/interfaces/IConfigPlacement.interface";
import {
  ConfigPlacementOrPlacement,
  ILevelState,
} from "@/interfaces/ILevelState.interface";
import { PlacementOrNullable } from "@/interfaces/IPlacement.interface";

export class Collision {
  forBody: HeroPlacement;
  level: ILevelState;
  placementsAtPosition: ConfigPlacementOrPlacement[];
  x: number;
  y: number;

  constructor(
    forBody: HeroPlacement,
    level: ILevelState,
    position: {
      x: number;
      y: number;
    } | null = null
  ) {
    this.forBody = forBody;
    this.level = level;
    this.placementsAtPosition = [];
    this.x = position ? position.x : forBody.x;
    this.y = position ? position.y : forBody.y;
    this.scanPlacementsAtPosition();
  }

  private scanPlacementsAtPosition() {
    this.placementsAtPosition = this.level.placements.filter((p) => {
      const element = p as IConfigPlacement;
      const isSelf = element.id === this.forBody.id;
      return !isSelf && element.x === this.x && element.y === this.y;
    });
  }

  withSolidPlacement() {
    return this.placementsAtPosition.find((p) => {
      const placementObject = p as PlacementOrNullable;
      return placementObject?.isSolidForBody(this.forBody);
    });
  }

  withPlacementAddsToInventory(): ConfigPlacementOrPlacement | undefined {
    return this.placementsAtPosition.find((p) => {
      const placementObject = p as PlacementOrNullable;
      return (
        !placementObject?.hasBeenCollected &&
        placementObject?.addsItemToInventoryOnCollide()
      );
    });
  }
}
