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
import LevelsMap, { ValidLevelType } from "@/levels/LevelsMap";
import { Inventory } from "./Inventory";

export class LevelState implements ILevelState {
  id: string;
  theme: string;
  tilesHeight: number;
  tilesWidth: number;
  isCompleted: boolean;
  placements: ConfigPlacementOrPlacement[];
  gameLoop: GameLoop;
  directionControls: DirectionControls = new DirectionControls();
  onEmit: (newState: ILevel) => void;
  private heroRef: HeroPlacement;
  inventory: any;

  constructor(levelId: string, onEmit: (newState: ILevel) => void) {
    this.id = levelId;
    this.onEmit = onEmit;

    this.start();
    this.startGameLoop();
  }

  private start() {
    this.isCompleted = false;
    const levelData = LevelsMap[this.id as ValidLevelType];
    this.theme = levelData.theme;
    this.tilesHeight = levelData.tilesHeight;
    this.tilesWidth = levelData.tilesWidth;
    this.placements = levelData.placements.map((config) => {
      return placementFactory.createPlacement(config as IConfigPlacement, this);
    });

    //Create a new inventory
    this.inventory = new Inventory();

    // Reference of the hero
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

  completeLevel() {
    this.isCompleted = true;
    this.gameLoop.stop();
  }

  getState(): ILevel {
    return {
      theme: this.theme,
      tilesWidth: this.tilesWidth,
      tilesHeight: this.tilesHeight,
      placements: this.placements as PlacementOrNullable[],
      isCompleted: this.isCompleted,
    };
  }

  destroy() {
    this.gameLoop?.stop();
    this.directionControls.unbind();
  }
}
