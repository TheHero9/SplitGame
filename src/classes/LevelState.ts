import { LEVEL_THEMES } from "@/helpers/consts";
import { TILES } from "@/helpers/tiles";
import { ILevel } from "@/interfaces/ILevel.interface";
import { ILevelState } from "@/interfaces/ILevelState.interface";

export class LevelState implements ILevelState {
  id: string;
  onEmit: (newState: ILevel) => void;
  theme: string = LEVEL_THEMES.BLUE;
  tilesHeight: number = 8;
  tilesWidth: number = 8;
  placements: any[] = [
    { id: 0, x: 2, y: 2, frameCoord: TILES.ICE_PICKUP },
    { id: 1, x: 2, y: 4, frameCoord: TILES.WATER_PICKUP },
    { id: 2, x: 2, y: 6, frameCoord: TILES.FIRE_PICKUP },
    { id: 3, x: 7, y: 2, frameCoord: TILES.GREEN_KEY },
    { id: 4, x: 7, y: 4, frameCoord: TILES.BLUE_LOCK },
    { id: 5, x: 7, y: 6, frameCoord: TILES.BULLET },
  ];

  constructor(levelId: string, onEmit: (newState: ILevel) => void) {
    this.id = levelId;
    this.onEmit = onEmit;

    this.start();
  }

  start() {
    setTimeout(() => {
      // Don't worry, this doesn't stay. Just to demonstrate.
      this.placements = [
        ...this.placements,
        { id: 6, x: 5, y: 5, frameCoord: TILES.BULLET },
      ];
      this.onEmit(this.getState());
    }, 1000);
  }

  getState(): ILevel {
    return {
      theme: this.theme,
      tilesWidth: this.tilesWidth,
      tilesHeight: this.tilesHeight,
      placements: this.placements,
    };
  }

  destroy() {
    // Tear down the level.
  }
}
