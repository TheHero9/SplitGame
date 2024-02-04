import { IConfigPlacement } from "@/interfaces/IConfigPlacement.interface";
import { Placement } from "./Placement";
import { ILevelState } from "@/interfaces/ILevelState.interface";
import { Z_INDEX_LAYER_SIZE } from "@/helpers/consts";
import { TILES, ValidTilesName } from "@/helpers/tiles";
import Sprite from "@/components/Sprite";
import { LevelState } from "@/classes/LevelState";

export class CelebrationPlacement extends Placement {
  frame: number;
  constructor(properties: IConfigPlacement, level: LevelState) {
    super(properties, level);
    this.frame = 1;
  }

  tick() {
    if (this.frame <= 8) {
      this.frame += 0.5;
      return;
    }
    this.level.deletePlacement(this);
  }

  zIndex() {
    return this.y * Z_INDEX_LAYER_SIZE + 2;
  }

  renderComponent() {
    const frameCoord = `PARTICLE_${Math.ceil(this.frame)}` as ValidTilesName;
    return <Sprite frameCoord={TILES[frameCoord]} />;
  }
}
