import { GoalPlacement } from "@/game-objects/GoalPlacement";
import { HeroPlacement } from "@/game-objects/HeroPlacement";
import { Placement } from "@/game-objects/Placement";
import { PLACEMENT_TYPE_GOAL, PLACEMENT_TYPE_HERO } from "@/helpers/consts";
import { ILevel } from "@/interfaces/ILevel.interface";
import { PlacementOrNullable } from "@/interfaces/IPlacement.interface";
import { LevelState } from "./LevelState";
import { IConfigPlacement } from "@/interfaces/IConfigPlacement.interface";

class PlacementFactory {
  createPlacement(config: IConfigPlacement, level: LevelState) {
    const instance = this.getInstance(config, level);
    // make ID here...
    return instance;
  }

  getInstance(
    config: IConfigPlacement,
    level: LevelState
  ): PlacementOrNullable {
    switch (config.type) {
      case PLACEMENT_TYPE_HERO:
        return new HeroPlacement(config, level);
      case PLACEMENT_TYPE_GOAL:
        return new GoalPlacement(config, level);
      default:
        console.warn("NO TYPE FOUND", config.type);
        return null;
    }
  }
}

export const placementFactory = new PlacementFactory();
