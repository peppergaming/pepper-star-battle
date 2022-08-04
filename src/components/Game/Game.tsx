import {Canvas} from "@/components/Canvas";
import React, {useEffect, useRef, useState} from "react";
import BulletController from "@/game/BulletController";
import EnemyController from "@/game/EnemyController";
import Player from "@/game/Player";
import style from "./Game.module.scss"

let playerBulletController;
let enemyBulletController;
let enemyController;
let player;
let isGameOver = false;
let didWin = false;


export const Game = () => {
  const [roundActive, setRoundActive] = useState<boolean>(true)
  const [victory, setVictory] = useState<boolean>(false)
  const handleGameOver = (victory) => {
    console.debug("Game is over with victory: ", victory)
    setVictory(victory)
    setRoundActive(false)
  }
  return roundActive ? <Round handleGameOver={handleGameOver}/> : <GameOver victory={victory}/>
}

interface RoundProps {
  handleGameOver: (victory: boolean) => void
}

export const Round = ({handleGameOver}: RoundProps) => {
  const getBackground = () => {
    const background = new Image();
    background.src = "/images/space.png";
    return background
  }
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [background, setBackground] = useState<HTMLImageElement>(getBackground)
  const [initialized, setInitialized] = useState<boolean>(false);

  const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
    if (!background) {
      setBackground(getBackground())
    }
  }

  const getCtx = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      return (canvas as HTMLCanvasElement).getContext("2d");
    }
    return null
  }

  function displayGameOver() {
    if (isGameOver) {
      const canvasCtx = getCtx();
      let text = didWin ? "You Win" : "Game Over";
      let textOffset = didWin ? 3.5 : 5;
      const canvas = canvasRef.current;
      if (canvas && canvasCtx) {
        canvasCtx.fillStyle = "white";
        canvasCtx.font = "70px Arial";
        canvasCtx.fillText(text, canvas.width / textOffset, canvas.height / 2);
      }
    }
  }

  const checkGameOver = () => {
    if (isGameOver) {
      return true;
    }

    if (enemyBulletController?.collideWith(player)) {
      isGameOver = true;
    }

    if (enemyController?.collideWith(player)) {
      isGameOver = true;
    }

    if (enemyController?.enemyRows.length === 0) {
      didWin = true
      isGameOver = true;
    }
    return isGameOver
  };

  const game = () => {
    const gameOver = checkGameOver();
    const canvasCtx = getCtx();
    if (canvasCtx) {
      canvasCtx.drawImage(background, 0, 0, 600, 600);
      displayGameOver();
      // console.debug(isGameOver)
      if (!gameOver) {
        enemyController?.draw(canvasCtx);
        player?.draw(canvasCtx);
        playerBulletController?.draw(canvasCtx);
        enemyBulletController?.draw(canvasCtx);
      } else {
        handleGameOver(didWin);
      }
    }
  };


  useEffect(() => {
    if (initialized) {
      return
    }

    const canvas = canvasRef.current;
    if (canvas) {
      // const context = (canvas as HTMLCanvasElement).getContext("2d");
      // setCanvasCtx(context)
      didWin = false;
      isGameOver = false;
      playerBulletController = new BulletController(canvas, 10, "red", true);
      enemyBulletController = new BulletController(canvas, 4, "white", false);
      enemyController = new EnemyController(
        canvas,
        enemyBulletController,
        playerBulletController
      );
      player = new Player(canvas, 3, playerBulletController);

      const gameInterval = setInterval(game, 1000 / 60);
      setInitialized(true)
      return () => {
        clearInterval(gameInterval)
      }
    }
  }, [canvasRef])

  return <div className={style.Game}><Canvas ref={canvasRef} draw={draw} height={600} width={600}/></div>
}

interface GameOverProps {
  victory: boolean
}

export const GameOver = ({victory}: GameOverProps) => {
  return <div>
    <p>{victory ? "You won" : "Game Over"}</p>
  </div>
}