import {
  LEVEL_THEMES,
  PLACEMENT_TYPE_FLOUR,
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
import { IConfigPlacement } from "@/interfaces/IConfigPlacement.interface";

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
    { id: 5, x: 8, y: 6, type: PLACEMENT_TYPE_FLOUR },
    { id: 6, x: 4, y: 3, type: PLACEMENT_TYPE_FLOUR },
    { id: 7, x: 5, y: 3, type: PLACEMENT_TYPE_FLOUR },
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
      return placementFactory.createPlacement(config as IConfigPlacement, this);
    });

    this.heroRef = this.placements.find(
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

  addPlacement(config: IConfigPlacement) {
    this.placements.push(placementFactory.createPlacement(config, this));
  }

  deletePlacement(placementToRemove: PlacementOrNullable) {
    this.placements = this.placements.filter((p) => {
      return p?.id !== placementToRemove?.id;
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

  getState(): ILevel {
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
