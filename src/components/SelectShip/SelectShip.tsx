import style from "@/components/SelectShip/SelectShip.module.scss";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { ShipsGrid } from "@/components/SelectShip/ShipsGrid";
import React, { useEffect } from "react";
import { DEFAULT_SHIP } from "@/config/constants";
import { useGameConfig } from "@/services/game";

interface SelectShipProps {
  handlePlay: (ship: any) => void;
}

export const SelectShip = ({ handlePlay }: SelectShipProps) => {
  const [pepperShips, setPepperShips] = React.useState([DEFAULT_SHIP]);

  const { ships, refreshShips } = useGameConfig();

  useEffect(() => {
    if (ships) {
      setPepperShips([DEFAULT_SHIP, ...ships]);
    }
  }, [ships]);

  useEffect(() => {
    refreshShips();
  }, []);

  return (
    <div className={style.ShipPage}>
      <Typography variant={"h1"} mb={1}>
        Pepper Star Battle
      </Typography>
      <Typography variant={"h4"} mb={1}>
        Win a game to get a powerful NFT spaceship
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
