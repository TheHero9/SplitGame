import { THEME_BACKGROUNDS } from "@/helpers/consts";
import styles from "./RenderLevel.module.css";
import LevelBackgroundTilesLayer from "./LevelBackgroundTilesLayer";
import LevelPlacementsLayer from "./LevelPlacementsLayer";
import { useEffect, useState } from "react";
import { LevelState } from "@/classes/LevelState";
import { ILevel } from "@/interfaces/ILevel.interface";
import FlourCount from "../hud/FlourCount";
import LevelCompleteMessage from "../hud/LevelCompleteMessage";
import { useRecoilValue } from "recoil";
import { currentLevelIdAtom } from "@/atoms/currentLevelIdAtom";

interface IRenderLevelProps {}

const RenderLevel: React.FC<IRenderLevelProps> = () => {
  const [level, setLevel] = useState<ILevel>();
  const currentLevelId = useRecoilValue(currentLevelIdAtom);

  useEffect(() => {
    const levelState = new LevelState(currentLevelId, (newState: ILevel) => {
      setLevel(newState);
    });

    setLevel(levelState.getState());

    return () => {
      levelState.destroy();
    };
  }, [currentLevelId]);

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
      <FlourCount level={level} />
      {level.isCompleted && <LevelCompleteMessage />}
    </div>
  );
};

export default RenderLevel;
