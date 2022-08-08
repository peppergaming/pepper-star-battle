import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import style from "./ShipCard.module.scss";
import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { ShipModel } from "@/types/model";

interface ShipCardProps {
  shipModel: ShipModel;
  setSelectedId: (key: string) => void;
  selectedId: string;
}

export const ShipCard = ({
  shipModel,
  setSelectedId,
  selectedId,
}: ShipCardProps) => {
  const handleClick = () => {
    setSelectedId(shipModel.name || "default");
  };

  let className = "";

  if (shipModel.name === selectedId) {
    className = `${style.AssetCardActive}`;
  } else {
    className = `${style.AssetCard}`;
  }

  return (
    <Card className={className} elevation={0}>
      <CardActionArea onClick={handleClick}>
        <Stack direction={"column"} className={style.AssetCardContent}>
          <CardMedia className={style.Media} image={shipModel.image_url} />
        </Stack>
        {shipModel.name && (
          <Stack direction={"column"}>
            <Typography className={style.TextShip}>
              {` ${shipModel.name}`}
            </Typography>{" "}
          </Stack>
        )}
      </CardActionArea>
    </Card>
  );
};
