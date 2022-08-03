import * as React from "react";
import Grid from "@mui/material/Grid";
import {ShipCard} from "@/components/SelectShip/ShipCard";
import {ShipGridModel, ShipModel} from "@/types/model";

export const ShipsGrid = ({
                              assets,
                          }: ShipGridModel) => {

    const [selectedId, setSelectedId] = React.useState("default");
    return (
        <Grid container columns={6} spacing={1}>
            {assets.map((asset: ShipModel, index: any) => (
                <Grid
                    item
                    key={`sff_game_${asset.edition}`}
                >
                    <ShipCard
                        selectedId={selectedId}
                        setSelectedId={setSelectedId}
                        key={index}
                        shipModel={asset}
                    />
                </Grid>
            ))}
        </Grid>
    );
};
