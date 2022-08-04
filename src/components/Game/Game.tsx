import {Canvas} from "@/components/Canvas";
import React, {useEffect, useRef, useState} from "react";
import BulletController from "@/game/BulletController";

export const Game = () => {
  const getBackground = () => {
    const background = new Image();
    background.src = "/images/space.png";
    return background
  }
  const canvasRef = useRef(null);
  const [background, setBackground] = useState<HTMLImageElement>(getBackground)
  const [canvasCtx, setCanvasCtx] = useState<CanvasRenderingContext2D | null>(null)
  const [playerBulletController, setPlayerBulletController] = useState<BulletController | null>(null)

  const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
    if (!background) {
      setBackground(getBackground())
    }

    if(!canvasCtx){
      setCanvasCtx(ctx)
    }
    ctx.drawImage(background, 0, 0, 640, 640);
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    console.debug("Canvas: ", canvas)
  }, [])

  return <Canvas ref={canvasRef} draw={draw} height={640} width={640}/>
}