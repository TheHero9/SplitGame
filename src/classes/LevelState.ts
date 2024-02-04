import {
  LEVEL_THEMES,
  PLACEMENT_TYPE_GOAL,
  PLACEMENT_TYPE_HERO,
  PLACEMENT_TYPE_WALL,
} from "@/helpers/consts";
import { ILevel } from "@/interfaces/ILevel.interface";
import {
  ConfigPlacementOrPlacement,
  ILevelState,
} from "@/interfaces/ILevelState.interface";
import { placementFactory } from "./PlacementFactory";
import { PlacementOrNullable } from "@/interfaces/IPlacement.interface";
import { GameLoop } from "./GameLoop";
import { DirectionControls } from "./DirectionControls";
import { HeroPlacement } from "@/game-objects/HeroPlacement";

export class LevelState implements ILevelState {
  id: string;
  theme: string = LEVEL_THEMES.BLUE;
  tilesHeight: number = 8;
  tilesWidth: number = 8;
  placements: ConfigPlacementOrPlacement[] = [
    { id: 0, x: 2, y: 2, type: PLACEMENT_TYPE_HERO },
    { id: 1, x: 6, y: 4, type: PLACEMENT_TYPE_GOAL },
    { id: 2, x: 4, y: 4, type: PLACEMENT_TYPE_WALL },
    { id: 3, x: 5, y: 2, type: PLACEMENT_TYPE_WALL },
    { id: 4, x: 6, y: 6, type: PLACEMENT_TYPE_WALL },
  ];
  gameLoop: GameLoop;
  directionControls: DirectionControls = new DirectionControls();
  onEmit: (newState: ILevel) => void;
  private heroRef: HeroPlacement;

  constructor(levelId: string, onEmit: (newState: ILevel) => void) {
    this.id = levelId;
    this.onEmit = onEmit;

    this.start();
    this.startGameLoop();
  }

  private start() {
    this.placements = this.placements.map((config) => {
      return placementFactory.createPlacement(config, this);
    });

    this.heroRef = this.placements.find(
      (p) => p?.type === PLACEMENT_TYPE_HERO
    ) as HeroPlacement;

    console.log("hero ref", this.heroRef);

    this.startGameLoop();
  }

  private startGameLoop() {
    this.gameLoop?.stop();
    this.gameLoop = new GameLoop(() => {
      this.tick();
    });
  }

  tick() {
    if (this.directionControls.direction) {
      this.heroRef.controllerMoveRequested(this.directionControls.direction);
    }

    this.placements.forEach((placement: ConfigPlacementOrPlacement) => {
      const placementObject = placement as PlacementOrNullable;
      placementObject?.tick();
    });

    //Emit any changes to React
    this.onEmit(this.getState());
  }

  isPositionOutOfBounds(x: number, y: number) {
    return (
      x === 0 ||
      y === 0 ||
      x >= this.tilesWidth + 1 ||
      y >= this.tilesHeight + 1
    );
  }

  private getState(): ILevel {
    return {
      theme: this.theme,
      tilesWidth: this.tilesWidth,
      tilesHeight: this.tilesHeight,
      placements: this.placements as PlacementOrNullable[],
    };
  }

  destroy() {
    this.gameLoop?.stop();
    this.directionControls.unbind();
  }
}
