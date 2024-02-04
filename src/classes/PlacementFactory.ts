import { GoalPlacement } from "@/game-objects/GoalPlacement";
import { HeroPlacement } from "@/game-objects/HeroPlacement";
import {
  PLACEMENT_TYPE_GOAL,
  PLACEMENT_TYPE_HERO,
  PLACEMENT_TYPE_WALL,
} from "@/helpers/consts";
import { PlacementOrNullable } from "@/interfaces/IPlacement.interface";
import { LevelState } from "./LevelState";
import { IConfigPlacement } from "@/interfaces/IConfigPlacement.interface";
import { WallPlacement } from "@/game-objects/WallPlacement";
import { ConfigPlacementOrPlacement } from "@/interfaces/ILevelState.interface";

class PlacementFactory {
  createPlacement(config: ConfigPlacementOrPlacement, level: LevelState) {
    const instance = this.getInstance(config, level);
    // make ID here...
    return instance;
  }

  private getInstance(
    config: ConfigPlacementOrPlacement,
    level: LevelState
  ): PlacementOrNullable {
    switch (config?.type) {
      case PLACEMENT_TYPE_HERO:
        return new HeroPlacement(config, level);
      case PLACEMENT_TYPE_GOAL:
        return new GoalPlacement(config, level);
      case PLACEMENT_TYPE_WALL:
        return new WallPlacement(config, level);
      default:
        console.warn("NO TYPE FOUND", config?.type);
        return null;
    }
  }
}

export const placementFactory = new PlacementFactory();
