import * as React from "react";
import { ShipCard } from "@/components/SelectShip/ShipCard";
import Ship from "@/game/Ship";
import { useGameConfig } from "@/services/game";
import Stack from "@mui/material/Stack";

export interface ShipGridModel {
  assets: Ship[];
}

export const ShipsGrid = ({ assets }: ShipGridModel) => {
  return (
    <Stack direction={"row"} spacing={1}>
      {assets.map((asset: Ship, index: any) => (
        <ShipCard key={index} shipModel={asset} />
      ))}
    </Stack>
  );
};
