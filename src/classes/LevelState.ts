import {
  LEVEL_THEMES,
  PLACEMENT_TYPE_GOAL,
  PLACEMENT_TYPE_HERO,
} from "@/helpers/consts";
import { ILevel } from "@/interfaces/ILevel.interface";
import { ILevelState } from "@/interfaces/ILevelState.interface";
import { placementFactory } from "./PlacementFactory";
import { IConfigPlacement } from "@/interfaces/IConfigPlacement.interface";
import { PlacementOrNullable } from "@/interfaces/IPlacement.interface";
import { GameLoop } from "./GameLoop";
import { DirectionControls } from "./DirectionControls";
import { HeroPlacement } from "@/game-objects/HeroPlacement";

export class LevelState implements ILevelState {
  id: string;
  theme: string = LEVEL_THEMES.BLUE;
  tilesHeight: number = 8;
  tilesWidth: number = 8;
  placements: IConfigPlacement[] = [
    { id: 0, x: 2, y: 2, type: PLACEMENT_TYPE_HERO },
    { id: 1, x: 6, y: 4, type: PLACEMENT_TYPE_GOAL },
  ];
  componentsToRender: PlacementOrNullable[];
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
    this.componentsToRender = this.placements.map((config) => {
      return placementFactory.createPlacement(config, this);
    });

    this.heroRef = this.componentsToRender.find(
      (p) => p?.type === PLACEMENT_TYPE_HERO
    ) as HeroPlacement;

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

    this.componentsToRender.forEach((placement) => {
      placement?.tick();
    });

    //Emit any changes to React
    this.onEmit(this.getState());
  }

  private getState(): ILevel {
    return {
      theme: this.theme,
      tilesWidth: this.tilesWidth,
      tilesHeight: this.tilesHeight,
      componentsToRender: this.componentsToRender,
    };
  }

  destroy() {
    this.gameLoop?.stop();
    this.directionControls.unbind();
  }
}
