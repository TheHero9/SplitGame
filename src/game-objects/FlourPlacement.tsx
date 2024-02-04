import { PLACEMENT_TYPE_FLOUR } from "@/helpers/consts";
import { Placement } from "./Placement";
import ElevatedSprite from "@/components/object-graphics/ElevatedSprite";
import { TILES } from "@/helpers/tiles";

export class FLourPlacement extends Placement {
  addsItemToInventoryOnCollide() {
    return PLACEMENT_TYPE_FLOUR;
  }

  renderComponent(): JSX.Element | null {
    return <ElevatedSprite frameCoord={TILES.FLOUR} />;
  }
}
