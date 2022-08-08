import { Canvas } from "@/components/Canvas";
import React, { useEffect, useRef, useState } from "react";
import BulletController from "@/game/BulletController";
import EnemyController from "@/game/EnemyController";
import Player from "@/game/Player";
import style from "./Game.module.scss";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import ReplayIcon from "@mui/icons-material/Replay";
import Button from "@mui/material/Button";
import { SelectShip } from "@/components/SelectShip";
import Link from "@mui/material/Link";
import { ShipModel } from "@/types/model";

let playerBulletController: any;
let enemyBulletController: any;
let enemyController: any;
let player: any;
let isGameOver = false;
let didWin = false;

export const Game = () => {
  const [roundActive, setRoundActive] = useState<boolean>(true);
  const [victory, setVictory] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [selectedShip, setSelectedShip] = useState<any>(null);
  const [claimed, setClaimed] = useState<boolean>(false);

  const handleGameOver = (victory: any) => {
    console.debug("Game is over with victory: ", victory);
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

  const handlePlay = (ship: any) => {
    setSelectedShip(ship);
    setRoundActive(true);
    setGameOver(false);
  };
  if (roundActive && selectedShip)
    return (
      <Round selectedShip={selectedShip} handleGameOver={handleGameOver} />
    );

  return gameOver ? (
    <GameOver handleReplay={handleReplay} victory={victory} />
  ) : (
    <SelectShip handlePlay={handlePlay} />
  );
  // return roundActive ? <Round handleGameOver={handleGameOver}/> : <GameOver handleReplay={handleReplay} victory={victory}/>
};

interface RoundProps {
  selectedShip: any;
  handleGameOver: (victory: boolean) => void;
}

export const Round = ({ selectedShip, handleGameOver }: RoundProps) => {
  const getBackground = () => {
    const background = new Image();
    background.src = "/images/space.png";
    return background;
  };
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [background, setBackground] = useState<HTMLImageElement>(getBackground);
  const [initialized, setInitialized] = useState<boolean>(false);

  const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
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
      <Canvas ref={canvasRef} draw={draw} height={600} width={600} />
    </div>
  );
};

interface GameOverProps {
  handleReplay: () => void;
  victory: boolean;
}

interface NFTClaimedProps {
  claimedNFT: ShipModel;
}

const claimNFT = () => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    address: "0xB7F3dd94f56e5eAD150B22d5eECC16a44B680888",
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  fetch("https://demo.peppergaming.com/api/nfts/claim_demo_nft", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
    })
    .catch((error) => console.log("error", error));
};

export const GameOver = (
  { victory, handleReplay }: GameOverProps,
  claimed: any
) => {
  return (
    <Stack alignItems={"center"} direction={"column"}>
      <Stack
        direction={"column"}
        alignItems={"center"}
        justifyContent={"flex-start"}
        spacing={1}
        mt={10}
      >
        <Typography variant={"subtitle1"} fontWeight={"bold"} color={"gray"}>
          {victory ? "Yeeeh" : "Nooo"}
        </Typography>
        <Typography variant={"h3"} fontWeight={"bolder"} color={"white"}>
          {victory ? "You Won" : "Game Over"}
        </Typography>
      </Stack>
      {victory ? (
        <Stack sx={{ textAlign: "center" }}>
          <Typography
            fontSize={16}
            sx={{ color: "whitesmoke", marginTop: "0" }}
          >
            Click on claim to receive it in your wallet
          </Typography>
          <img
            src={"/images/ship1.jpg"}
            height={"180px"}
            width={"180px"}
            style={{ alignSelf: "center", marginTop: "2rem" }}
          ></img>
          <Stack mt={6} direction={"column"}>
            <Button
              size={"large"}
              className={style.EmailButton}
              fullWidth
              variant={"contained"}
              onClick={claimNFT}
            >
              Claim
            </Button>
            <Button
              sx={{ color: "white", marginTop: "1rem" }}
              endIcon={<ReplayIcon />}
              onClick={handleReplay}
            >
              Replay
            </Button>
          </Stack>
        </Stack>
      ) : (
        <Button
          sx={{ color: "white", marginTop: "10rem" }}
          endIcon={<ReplayIcon />}
          onClick={handleReplay}
        >
          Replay
        </Button>
      )}
    </Stack>
  );
};

export const NFTClaimed = (
  { claimedNFT }: NFTClaimedProps,
  { handleReplay }: GameOverProps
) => {
  return (
    <div className={style.SuccessPage}>
      <Typography fontWeight={600} fontSize={16} sx={{ color: "gray" }}>
        Yeeeeeeeh
      </Typography>
      <Typography mt={1} mb={1} fontSize={25} sx={{ color: "whitesmoke" }}>
        You Won {claimedNFT.assetId}!
      </Typography>
      <Typography mt={1} mb={1} fontSize={16} sx={{ color: "whitesmoke" }}>
        Claimed!
      </Typography>
      <Stack spacing={2}>
        <img
          src={claimedNFT.imgUrl}
          height={"180px"}
          width={"180px"}
          style={{
            alignSelf: "center",
            marginTop: "2rem",
            border: "2px solid gold",
          }}
        ></img>
        <Link href={"https://etherscan.com"}>Check it on EtherScan</Link>
        <Button
          sx={{ color: "white", marginTop: "10rem" }}
          endIcon={<ReplayIcon />}
          onClick={handleReplay}
        >
          Replay
        </Button>
      </Stack>
    </div>
  );
};
