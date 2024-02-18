import DemoLevel1 from "./DemoLevel1";
import DemoLevel2 from "./DemoLevel2";

const LevelsMap = {
  DemoLevel1: DemoLevel1,
  DemoLevel2: DemoLevel2,
};

export type ValidLevelType = keyof typeof LevelsMap;

export default LevelsMap;
