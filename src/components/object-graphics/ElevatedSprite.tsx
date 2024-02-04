import React from "react";
import styles from "./ElevatedSprite.module.css";
import Sprite, { ISpriteProps } from "../Sprite";
import { CELL_SIZE } from "@/helpers/consts";
import { TILES } from "@/helpers/tiles";

interface IElevatedSpriteProps extends ISpriteProps {
  pxAboveGround?: number;
}

const ElevatedSprite: React.FC<IElevatedSpriteProps> = ({
  frameCoord,
  size = CELL_SIZE,
  pxAboveGround = 3,
}) => {
  return (
    <div className={styles.elevatedSprite}>
      <Sprite frameCoord={TILES.SHADOW} />
      <div
        className={styles.bodyContainer}
        style={{
          transform: `translateY(${-pxAboveGround}px)`,
        }}
      >
        <Sprite frameCoord={frameCoord} size={size} />
      </div>
    </div>
  );
};

export default ElevatedSprite;
