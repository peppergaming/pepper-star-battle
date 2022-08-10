import {Canvas} from "@/components/Canvas";
import React, {useEffect, useRef, useState} from "react";
import BulletController from "@/game/BulletController";
import EnemyController from "@/game/EnemyController";
import Player from "@/game/Player";
import Ship from "@/game/Ship";
import style from "./Game.module.scss";
import {SelectShip} from "@/components/SelectShip";
import {GameOver} from "@/components/Game/GameOver";
import {useGameConfig} from "@/services/game";

let playerBulletController: any;
let enemyBulletController: any;
let enemyController: any;
let player: any;
let isGameOver = false;
let didWin = false;

export const Game = () => {
  const [roundActive, setRoundActive] = useState<boolean>(false);
  const [victory, setVictory] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const {ships} = useGameConfig()
  const {selectedShip} = useGameConfig()
  const handleGameOver = (victory: any) => {
    setVictory(victory);
    setRoundActive(false);
    setGameOver(true);
    isGameOver = false;
    didWin = false;
  };

  const handleReplay = () => {
    // setRoundActive(true);
    setGameOver(false);
    setVictory(false);
  };

  const handlePlay = () => {
    setRoundActive(true);
    setGameOver(false);
  };
  if (roundActive && selectedShip)
    return (
      <Round selectedShip={selectedShip} handleGameOver={handleGameOver}/>
    );

  return gameOver ? (
    /* hasNft should return true/false if user already got from claim */
    <GameOver handleReplay={handleReplay} hasNft={ships && ships.length > 0} victory={victory}/>
  ) : (
    <SelectShip handlePlay={handlePlay}/>
  );
  // return roundActive ? <Round handleGameOver={handleGameOver}/> : <GameOver handleReplay={handleReplay} victory={victory}/>
};

interface RoundProps {
  selectedShip: Ship;
  handleGameOver: (victory: boolean) => void;
}

export const Round = ({selectedShip, handleGameOver}: RoundProps) => {
  const getBackground = () => {
    const background = new Image();
    background.src = "/images/space.png";
    return background;
  };
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [background, setBackground] = useState<HTMLImageElement>(getBackground);
  const [initialized, setInitialized] = useState<boolean>(false);

  const draw = () => {
    if (!background) {
      setBackground(getBackground());
    }
  };

  const getCtx = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      return (canvas as HTMLCanvasElement).getContext("2d");
    }
    return null;
  };

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
      didWin = true;
      isGameOver = true;
    }
    return isGameOver;
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

  const initialize = async () => {
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

      /* TODO read ship from owned assets*/

      const gameImage = await selectedShip.getGameImage();
      player = new Player(canvas, 3, playerBulletController, gameImage);

      const gameInterval = setInterval(game, 1000 / 60);
      setInitialized(true);
      return () => {
        clearInterval(gameInterval);
      };
    }
  };

  useEffect(() => {
    if (initialized) {
      return;
    }
    initialize();
  }, [canvasRef]);

  return (
    <div className={style.Game}>
      <Canvas ref={canvasRef} draw={draw} height={600} width={600}/>
    </div>
  );
};
