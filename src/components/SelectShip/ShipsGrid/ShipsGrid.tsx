import * as React from "react";
import Grid from "@mui/material/Grid";
import {ShipCard} from "@/components/SelectShip/ShipCard";
import Ship from "@/game/Ship";
import {useGameConfig} from "@/services/game";


export interface ShipGridModel {
  assets: Ship[];
}

export const ShipsGrid = ({assets}: ShipGridModel) => {

  return (
    <Grid container columns={6} spacing={1}>
      {assets.map((asset: Ship, index: any) => (
        <Grid
          item
          key={`sff_game_${asset.edition}`}
        >
          <ShipCard
            key={index}
            shipModel={asset}
          />
        </Grid>
      ))}
    </Grid>
  );
};
