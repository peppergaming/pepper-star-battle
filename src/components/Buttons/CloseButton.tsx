import {IconButtonProps} from "@mui/material";
import style from "./Buttons.module.scss";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

export const CloseButton = (props: IconButtonProps) => {
    return (
        <IconButton
            className={style.CloseButton}
            size={"extraSmall"}
            color={"secondary"}
            {...props}
        >
            <CloseIcon fontSize={"small"}/>
        </IconButton>
    );
};
