import React from "react";
import styles from "./Hero.module.css";
import { TILES } from "@/helpers/tiles";
import Sprite from "../Sprite";

type IHeroProps = {
  frameCoord: string;
  yTranslate: number;
};

const Hero: React.FC<IHeroProps> = ({ frameCoord, yTranslate }) => {
  return (
    <div className={styles.hero}>
      <div>
        <Sprite frameCoord={TILES.SHADOW} />
      </div>
      <div
        className={styles.heroBody}
        style={{
          transform: `translateY(${yTranslate}px)`,
        }}
      >
        <Sprite frameCoord={frameCoord} size={32} />
      </div>
    </div>
  );
};

export default Hero;
