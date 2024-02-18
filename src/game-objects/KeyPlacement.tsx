import { IConfigPlacement } from "@/interfaces/IConfigPlacement.interface";
import { Placement } from "./Placement";
import { LevelState } from "@/classes/LevelState";
import { LOCK_KEY_COLORS } from "@/helpers/consts";
import ElevatedSprite from "@/components/object-graphics/ElevatedSprite";
import { TILES } from "@/helpers/tiles";

export class KeyPlacement extends Placement {
  color: string;
  constructor(properties: IConfigPlacement, level: LevelState) {
    super(properties, level);
    this.color = properties.color ?? LOCK_KEY_COLORS.BLUE;
  }

  addsItemToInventoryOnCollide(): string | null {
    return `KEY_${this.color}`;
  }

  renderComponent(): JSX.Element | null {
    const frameCoord =
      this.color === LOCK_KEY_COLORS.BLUE ? TILES.BLUE_KEY : TILES.GREEN_KEY;
    return <ElevatedSprite frameCoord={frameCoord} />;
  }
}
