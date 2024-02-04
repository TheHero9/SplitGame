import { CELL_SIZE } from "@/helpers/consts";
import React from "react";
import Sprite from "../Sprite";

interface IMapCellProps {
  x: number;
  y: number;
  frameCoord: string;
}

const MapCell: React.FC<IMapCellProps> = ({ x, y, frameCoord }) => {
  return (
    <div
      style={{
        position: "absolute",
        left: x * CELL_SIZE,
        top: y * CELL_SIZE,
      }}
    >
      <Sprite frameCoord={frameCoord} />
    </div>
  );
};

export default MapCell;
