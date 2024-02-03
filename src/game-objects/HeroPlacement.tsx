import Sprite from "@/components/Sprite";
import { Placement } from "./Placement";
import { TILES } from "@/helpers/tiles";

export class HeroPlacement extends Placement {
  tick() {
    console.log("update hero");
  }
  renderComponent() {
    return <Sprite frameCoord={TILES.HERO_RIGHT} size={32} />;
  }
}
