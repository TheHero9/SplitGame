import React from "react";
import styles from "./Hero.module.css";
import { TILES } from "@/helpers/tiles";
import Sprite from "../Sprite";

type Props = {};

const Hero = (props: Props) => {
  return (
    <div className={styles.hero}>
      <div>
        <Sprite frameCoord={TILES.SHADOW} />
      </div>
      <div className={styles.heroBody}>
        <Sprite frameCoord={TILES.HERO_RIGHT} size={32} />
      </div>
    </div>
  );
};

export default Hero;
