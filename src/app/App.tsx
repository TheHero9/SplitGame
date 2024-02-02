"use client"; // 👈 use it here

import Sprite from "@/components/Sprite";
import { SPRITE_SHEET_SRC } from "@/helpers/consts";
import React, { useEffect, useState } from "react";
type Props = {};

const App = (props: Props) => {
  const [spriteSheetImage, setSpriteSheetImage] = useState<any>(null);

  useEffect(() => {
    const image = new Image();
    image.src = SPRITE_SHEET_SRC;
    image.onload = () => {
      setSpriteSheetImage(image);
    };
  }, []);

  if (!spriteSheetImage?.src) {
    return null;
  }

  return (
    <>
      <Sprite image={spriteSheetImage} frameCoord={"1x0"} />
      <Sprite image={spriteSheetImage} frameCoord={"0x2"} />
      <Sprite image={spriteSheetImage} frameCoord={"0x3"} />;
    </>
  );
};

export default App;
