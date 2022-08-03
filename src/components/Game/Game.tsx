import {Canvas} from "@/components/Canvas";
import React from "react";

export const Game = () => {
  const draw  = (ctx: CanvasRenderingContext2D, frameCount: number) => {
    const background = new Image();
    background.src = "/images/space.png";
    ctx.drawImage(background, 0, 0, 640, 640);
  }
  return <Canvas draw={draw} height={640} width={640}/>
}