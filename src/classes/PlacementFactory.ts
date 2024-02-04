import { placementTypeClassMap } from "@/helpers/consts";
import { LevelState } from "./LevelState";
import { IConfigPlacement } from "@/interfaces/IConfigPlacement.interface";

class PlacementFactory {
  createPlacement(config: IConfigPlacement, level: LevelState) {
    const placementClass = placementTypeClassMap[config?.type];
    if (!placementClass) {
      console.warn("NO TYPE FOUND", config?.type);
    }
    const instance = new placementClass(config, level);
    instance.id = Math.floor(Math.random() * 999999999) + 1;
    return instance;
  }
}

export const placementFactory = new PlacementFactory();
