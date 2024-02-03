import { CELL_SIZE } from "@/helpers/consts";
import React from "react";
import Sprite from "../Sprite";

interface IMapCellProps {
  x: number;
  y: number;
  frameCoord: string;
  image: HTMLImageElement;
}

const MapCell: React.FC<IMapCellProps> = ({ x, y, frameCoord, image }) => {
  return (
    <div
      style={{
        position: "absolute",
        left: x * CELL_SIZE,
        top: y * CELL_SIZE,
      }}
    >
      <Sprite frameCoord={frameCoord} image={image} />
    </div>
  );
};

export default MapCell;
