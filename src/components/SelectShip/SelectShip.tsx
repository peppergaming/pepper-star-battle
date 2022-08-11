import style from "@/components/SelectShip/SelectShip.module.scss";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
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

  const { ships } = useGameConfig();

  useEffect(() => {
    if (ships) {
      setPepperShips([DEFAULT_SHIP, ...ships]);
    }
  }, [ships]);

  return (
    <div className={style.ShipPage}>
      <Typography fontWeight={600} fontSize={30} sx={{ color: "grey.A20" }}>
        Good Old
      </Typography>
      <Typography fontWeight={600} fontSize={30}>
        Starship Battle
      </Typography>
      <Typography mt={1} mb={6} fontSize={16}>
        Demo of the capabilities of Pepper Web3 SDK
      </Typography>
      <Typography fontSize={12} sx={{ textAlign: "left", color: "grey.A70" }}>
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
