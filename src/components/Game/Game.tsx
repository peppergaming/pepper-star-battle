import {Canvas} from "@/components/Canvas";
import React, {useEffect, useRef, useState} from "react";
import BulletController from "@/game/BulletController";
import EnemyController from "@/game/EnemyController";
import Player from "@/game/Player";
import style from "./Game.module.scss"
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import ReplayIcon from '@mui/icons-material/Replay';
import Button from "@mui/material/Button";
import {SelectShip} from "@/components/SelectShip";

let playerBulletController;
let enemyBulletController;
let enemyController;
let player;
let isGameOver = false;
let didWin = false;


export const Game = () => {
  const [roundActive, setRoundActive] = useState<boolean>(true)
  const [victory, setVictory] = useState<boolean>(false)
  const [gameOver, setGameOver] = useState<boolean>(false)
  const [selectedShip, setSelectedShip] = useState<any>(null)

  const handleGameOver = (victory) => {
    console.debug("Game is over with victory: ", victory)
    setVictory(victory)
    setRoundActive(false)
    setGameOver(true);
    isGameOver = false;
    didWin = false;
  }

  const handleReplay = () => {
    // setRoundActive(true);
    setGameOver(false);
    setVictory(false);
  }

  const handlePlay = (ship) => {
    setSelectedShip(ship);
    setRoundActive(true);
    setGameOver(false);
  }
  if (roundActive && selectedShip)
    return <Round selectedShip={selectedShip} handleGameOver={handleGameOver}/>

  return gameOver ?  <GameOver handleReplay={handleReplay} victory={victory}/> : <SelectShip handlePlay={handlePlay}/>
  // return roundActive ? <Round handleGameOver={handleGameOver}/> : <GameOver handleReplay={handleReplay} victory={victory}/>
}

interface RoundProps {
  selectedShip: any
  handleGameOver: (victory: boolean) => void
}

export const Round = ({selectedShip, handleGameOver}: RoundProps) => {
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

  const initialize = () => {
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
  }

  useEffect(() => {
    if (initialized) {
      return
    }
    initialize();

  }, [canvasRef])

  return <div className={style.Game}><Canvas ref={canvasRef} draw={draw} height={600} width={600}/></div>
}

interface GameOverProps {
  handleReplay: () => void
  victory: boolean
}

export const GameOver = ({victory, handleReplay}: GameOverProps) => {
  return <Stack alignItems={"center"} direction={"column"} spacing={12}>
    <Stack direction={"column"} alignItems={"center"} justifyContent={"flex-start"} spacing={1} mt={20}>
      <Typography variant={"subtitle1"} fontWeight={"bold"} color={"gray"}>{victory ? "Yeeeh" : "Nooo"}</Typography>
      <Typography variant={"h3"} fontWeight={"bolder"} color={"white"}>{victory ? "You Won" : "Game Over"}</Typography>
    </Stack>
    <Button sx={{color: "white"}} endIcon={<ReplayIcon/>} onClick={handleReplay}>
      Replay
    </Button>
  </Stack>
}