import { IConfigPlacement } from "@/interfaces/IConfigPlacement.interface";
import { Placement } from "./Placement";
import { LevelState } from "@/classes/LevelState";
import { LOCK_KEY_COLORS } from "@/helpers/consts";
import Sprite from "@/components/Sprite";
import { TILES } from "@/helpers/tiles";

export class LockPlacement extends Placement {
  color: string;
  constructor(properties: IConfigPlacement, level: LevelState) {
    super(properties, level);
    this.color = properties.color ?? LOCK_KEY_COLORS.BLUE;
  }

  isSolidForBody(_body: any): boolean {
    return true;
  }

  renderComponent(): JSX.Element | null {
    let frameCoord =
      this.color === LOCK_KEY_COLORS.BLUE ? TILES.BLUE_LOCK : TILES.GREEN_LOCK;
    return <Sprite frameCoord={frameCoord} />;
  }
}
