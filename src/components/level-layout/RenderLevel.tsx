import { THEME_BACKGROUNDS } from "@/helpers/consts";
import styles from "./RenderLevel.module.css";
import LevelBackgroundTilesLayer from "./LevelBackgroundTilesLayer";
import LevelPlacementsLayer from "./LevelPlacementsLayer";
import { useEffect, useState } from "react";
import { LevelState } from "@/classes/LevelState";
import { ILevel } from "@/interfaces/ILevel.interface";

interface IRenderLevelProps {}

const RenderLevel: React.FC<IRenderLevelProps> = () => {
  const [level, setLevel] = useState<ILevel>();

  useEffect(() => {
    const levelState = new LevelState("1-1", (newState: ILevel) => {
      setLevel(newState);
    });

    setLevel(levelState.getState());

    return () => {
      levelState.destroy();
    };
  }, []);

  if (!level) {
    return null;
  }

  return (
    <div
      className={styles.fullScreenContainer}
      style={{
        background: THEME_BACKGROUNDS[level.theme!],
      }}
    >
      <div className={styles.gameScreen}>
        <LevelBackgroundTilesLayer level={level} />
        <LevelPlacementsLayer level={level} />
      </div>
    </div>
  );
};

export default RenderLevel;
