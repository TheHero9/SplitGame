import {
  LEVEL_THEMES,
  PLACEMENT_TYPE_GOAL,
  PLACEMENT_TYPE_HERO,
} from "@/helpers/consts";
import { TILES } from "@/helpers/tiles";
import { ILevel } from "@/interfaces/ILevel.interface";
import { ILevelState } from "@/interfaces/ILevelState.interface";
import { placementFactory } from "./PlacementFactory";
import { IConfigPlacement } from "@/interfaces/IConfigPlacement.interface";
import { PlacementOrNullable } from "@/interfaces/IPlacement.interface";
import { GameLoop } from "./GameLoop";

export class LevelState implements ILevelState {
  id: string;
  theme: string = LEVEL_THEMES.BLUE;
  tilesHeight: number = 8;
  tilesWidth: number = 8;
  placements: IConfigPlacement[] = [
    { id: 0, x: 2, y: 2, type: PLACEMENT_TYPE_HERO },
    { id: 1, x: 6, y: 4, type: PLACEMENT_TYPE_GOAL },
  ];
  componentsToRender: PlacementOrNullable[] = [];
  gameLoop: GameLoop | null = null;
  onEmit: (newState: ILevel) => void;

  constructor(levelId: string, onEmit: (newState: ILevel) => void) {
    this.id = levelId;
    this.onEmit = onEmit;

    this.start();
    this.startGameLoop();
  }

  start() {
    this.componentsToRender = this.placements.map((config) => {
      return placementFactory.createPlacement(config, this);
    });
    this.startGameLoop();
  }

  startGameLoop() {
    this.gameLoop?.stop();
    this.gameLoop = new GameLoop(() => {
      this.tick();
    });
  }

  tick() {
    this.componentsToRender.forEach((placement) => {
      // placement?.tick();
    });

    //Emit any changes to React
    this.onEmit(this.getState());
  }

  getState(): ILevel {
    return {
      theme: this.theme,
      tilesWidth: this.tilesWidth,
      tilesHeight: this.tilesHeight,
      componentsToRender: this.componentsToRender,
    };
  }

  destroy() {
    // Tear down the level.
  }
}
