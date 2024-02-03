import { CELL_SIZE } from "@/helpers/consts";
import React from "react";
import Sprite from "../Sprite";

interface ILevelPlacementsLayer {
  level: any;
}

const LevelPlacementsLayer: React.FC<ILevelPlacementsLayer> = ({ level }) => {
  return level.placements.map((placement: any) => {
    // Wrap each Sprite in a positioned div
    const x = placement.x * CELL_SIZE;
    const y = placement.y * CELL_SIZE;
    const style = {
      position: "absolute",
      transform: `translate3d(${x}px, ${y}px, 0)`,
    };

    return (
      //@ts-ignore
      <div key={placement.id} style={style}>
        <Sprite frameCoord={placement.frameCoord} />
      </div>
    );
  });
};

export default LevelPlacementsLayer;
