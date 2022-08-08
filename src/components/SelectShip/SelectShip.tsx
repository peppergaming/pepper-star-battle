import style from "@/components/SelectShip/SelectShip.module.scss";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { ShipsGrid } from "@/components/SelectShip/ShipsGrid";
import React, { useEffect } from "react";

export const defaultShip = {
  name: "default",
  image_url: "/images/defaultShip.png",
  edition: 0,
  attributes: [{ name: "engine", value: "turbo" }],
};

interface SelectShipProps {
  handlePlay: (ship: any) => void;
}

export const SelectShip = ({ handlePlay }: SelectShipProps) => {
  const [pepperShips, setPepperShips] = React.useState([defaultShip]);

  useEffect(() => {
    const newShip = {
      name: "PepperShip #99",
      image_url: "/images/ship1.jpg",
      edition: 22,
      attributes: [{ name: "engine", value: "turbo" }],
    };
    setPepperShips([...pepperShips, newShip]);
  }, []);

  return (
    <div className={style.ShipPage}>
      <Typography fontWeight={600} fontSize={30} sx={{ color: "gray" }}>
        Good Old
      </Typography>
      <Typography fontWeight={600} fontSize={30} sx={{ color: "whitesmoke" }}>
        Starship Battle
      </Typography>
      <Typography mt={1} mb={6} fontSize={16} sx={{ color: "whitesmoke" }}>
        Demo of the capabilities of Pepper Web3 SDK
      </Typography>
      <Typography fontSize={12} sx={{ textAlign: "left", color: "whitesmoke" }}>
        Choose Starship
      </Typography>
      <Divider sx={{ backgroundColor: "whitesmoke" }} />
      <ShipsGrid assets={pepperShips} />
      <Stack mt={4} direction={"column"} spacing={4}>
        <Button
          size={"large"}
          className={style.EmailButton}
          fullWidth
          variant={"contained"}
          onClick={handlePlay}
        >
          Play
        </Button>
      </Stack>
    </div>
  );
};
