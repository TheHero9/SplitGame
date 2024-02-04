import { THEME_TILES_MAP } from "@/helpers/consts";
import { Placement } from "./Placement";
import Sprite from "@/components/Sprite";

export class WallPlacement extends Placement {
  isSolidForBody(_body: Placement) {
    return true;
  }

  renderComponent() {
    const wallTileCoord = THEME_TILES_MAP[this.level.theme].WALL;
    return <Sprite frameCoord={wallTileCoord} />;
  }
}
