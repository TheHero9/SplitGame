import Sprite from "@/components/Sprite";
import { TILES } from "@/helpers/tiles";
import { Placement } from "./Placement";

export class GoalPlacement extends Placement {
  renderComponent() {
    return <Sprite frameCoord={TILES.GOAL_DISABLED} />;
  }
}
