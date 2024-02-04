import React from "react";

type Props = {};

const LevelCompleteMessage = (props: Props) => {
  return (
    <p style={{ position: "absolute", left: 0, top: 64, color: "lime" }}>
      LEVEL COMPLETE!
    </p>
  );
};

export default LevelCompleteMessage;
