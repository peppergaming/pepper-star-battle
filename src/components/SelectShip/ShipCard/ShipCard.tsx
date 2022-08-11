import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import style from "./ShipCard.module.scss";
import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Ship from "@/game/Ship";
import { useGameConfig } from "@/services/game";

interface ShipCardProps {
  shipModel: Ship;
}

export const ShipCard = ({ shipModel }: ShipCardProps) => {
  const { selectShip, selectedShip } = useGameConfig();

  const handleClick = () => {
    selectShip(shipModel);
  };

  let className = "";

  if (shipModel.name === selectedShip.name) {
    className = `${style.AssetCardActive} ${style.AssetCard}`;
  } else {
    className = `${style.AssetCard}`;
  }

  return (
    <Card className={className} elevation={0}>
      <CardActionArea onClick={handleClick} sx={{ height: "100%" }}>
        <Stack
          direction={"column"}
          className={style.AssetCardContent}
          mb={".5rem"}
        >
          <CardMedia className={style.Media} image={shipModel.getNFTImage()} />
        </Stack>
        {shipModel.name && (
          <Stack direction={"column"}>
            <Typography variant={"body2"} color={"grey.A70"}>
              {` ${shipModel.name}`}
            </Typography>{" "}
          </Stack>
        )}
      </CardActionArea>
    </Card>
  );
};
