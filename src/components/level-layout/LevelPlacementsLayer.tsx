import { CELL_SIZE } from "@/helpers/consts";
import React from "react";
import { ILevel } from "@/interfaces/ILevel.interface";
import { PlacementOrNullable } from "@/interfaces/IPlacement.interface";

interface ILevelPlacementsLayer {
  level: ILevel;
}

const LevelPlacementsLayer: React.FC<ILevelPlacementsLayer> = ({ level }) => {
  return level.componentsToRender.map((placement: PlacementOrNullable) => {
    const x = placement!.x * CELL_SIZE;
    const y = placement!.y * CELL_SIZE;
    const style = {
      position: "absolute",
      transform: `translate3d(${x}px, ${y}px, 0)`,
    };

    return (
      //@ts-ignore
      <div key={placement.id} style={style}>
        {placement!.renderComponent()}
      </div>
    );
  });
};

export default LevelPlacementsLayer;
