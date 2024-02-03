import { spriteSheetImageAtom } from "@/atoms/spriteSheetImageAtom";
import RenderLevel from "@/components/level-layout/RenderLevel";
import { SPRITE_SHEET_SRC } from "@/helpers/consts";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const App = () => {
  const [spriteSheetImage, setSpriteSheetImage] =
    useRecoilState(spriteSheetImageAtom);

  useEffect(() => {
    const image = new Image();
    image.src = SPRITE_SHEET_SRC;
    image.onload = () => {
      setSpriteSheetImage(image);
    };
  }, [setSpriteSheetImage]);

  if (!spriteSheetImage?.src) {
    return null;
  }

  return (
    <>
      <RenderLevel />
    </>
  );
};

export default App;
