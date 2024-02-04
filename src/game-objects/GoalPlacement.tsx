import Sprite from "@/components/Sprite";
import { TILES } from "@/helpers/tiles";
import { Placement } from "./Placement";
import { PLACEMENT_TYPE_FLOUR } from "@/helpers/consts";

export class GoalPlacement extends Placement {
  get isDisabled() {
    const nonCollectedFlour = this.level.placements.find((p) => {
      const placementObject = p as Placement;
      return (
        placementObject.type === PLACEMENT_TYPE_FLOUR &&
        !placementObject.hasBeenCollected
      );
    });
    return Boolean(nonCollectedFlour);
  }

  completesLevelOnCollide(): boolean {
    return !this.isDisabled;
  }

  renderComponent() {
    return (
      <Sprite
        frameCoord={this.isDisabled ? TILES.GOAL_DISABLED : TILES.GOAL_ENABLED}
      />
    );
  }
}
