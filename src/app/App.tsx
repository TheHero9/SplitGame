"use client"; // 👈 use it here

import RenderLevel from "@/components/level-layout/RenderLevel";
import { SPRITE_SHEET_SRC } from "@/helpers/consts";
import React, { useEffect, useState } from "react";

const App = () => {
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
      <RenderLevel spriteSheetImage={spriteSheetImage} />
    </>
  );
};

export default App;
