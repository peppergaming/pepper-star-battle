// import { useState } from "react";
import { BaseModalProps } from "@/services/modal";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import style from "./GenericModal.module.scss";

export const GenericModal = ({ title, content }: BaseModalProps) => {
  return (
    <Stack direction={"column"} className={style.GenericModal}>
      <Typography variant={"h3"}>{title}</Typography>
      <Typography ml={0.3} mb={5} variant={"body1"}>
        {content}
      </Typography>
    </Stack>
  );
};
