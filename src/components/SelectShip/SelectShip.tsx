import style from "@/components/SelectShip/SelectShip.module.scss";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { ShipsGrid } from "@/components/SelectShip/ShipsGrid";
import React, { useEffect } from "react";
import { DEFAULT_SHIP } from "@/config/constants";
import { useGameConfig } from "@/services/game";
import Link from "@mui/material/Link";

interface SelectShipProps {
  handlePlay: (ship: any) => void;
}

export const SelectShip = ({ handlePlay }: SelectShipProps) => {
  const [pepperShips, setPepperShips] = React.useState([DEFAULT_SHIP]);

  const { ships } = useGameConfig();

  useEffect(() => {
    if (ships) {
      setPepperShips([DEFAULT_SHIP, ...ships]);
    }
  }, [ships]);

  return (
    <div className={style.ShipPage}>
      <Typography variant={"h1"} mb={1}>
        Pepper Star Battle
      </Typography>
      <Typography variant={"h4"} mb={1}>
        Successfully complete a game to earn an NFT ship.
      </Typography>
      <Typography variant={"body2"} mb={6} color={"grey.A50"}>
        Use cursor keys or A, S to move, space to fire
      </Typography>
      <Typography
        variant={"body2"}
        sx={{ textAlign: "left", color: "grey.A50" }}
      >
        Choose Starship
      </Typography>
      <Divider sx={{ backgroundColor: "grey.A10", mb: ".5rem", mt: ".3rem" }} />
      <ShipsGrid assets={pepperShips} />
      {ships && !!ships.length && (
        <Typography sx={{ textAlign: "right", pb: ".5rem" }}>
          <Link href={"https://app.peppergaming.com/nfts"} target={"_blank"}>
            View your collectibles
          </Link>
        </Typography>
      )}
      <Button
        size={"large"}
        className={style.EmailButton}
        fullWidth
        variant={"contained"}
        onClick={handlePlay}
        sx={{ mt: "auto" }}
      >
        Play
      </Button>
    </div>
  );
};
