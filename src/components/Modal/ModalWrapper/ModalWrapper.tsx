import { useModalContext } from "@/services/modal";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import style from "./ModalWrapper.module.scss";
import React from "react";
import Typography from "@mui/material/Typography";
import { CloseButton } from "@/components/Buttons/CloseButton";

export interface ModalWrapperProps {
  ModalHeader?: React.FunctionComponent | null | "default";
  backgroundImageURL: string | null;
  headerTitle?: string;
  children: any;
  contentPadding?: string;
  ModalFooter?: React.FunctionComponent | null | "default";
}

const DefaultHeader = ({ title = "", onClose = () => {} }) => {
  return (
    <Stack direction={"row"} className={style.Header}>
      <Typography variant={"body2"} color={"text.secondary"} fontSize={"small"}>
        {title}
      </Typography>
      <CloseButton onClick={onClose} />
    </Stack>
  );
};

const DefaultFooter = () => {
  return (
    <div className={style.Footer}>
    </div>
  );
};

export const ModalWrapper = ({
  ModalHeader = "default",
  backgroundImageURL = "/images/pep_trisom_3.png",
  headerTitle,
  children,
  contentPadding = "2.5rem",
  ModalFooter = "default",
}: ModalWrapperProps) => {
  const { isModalVisible, hideModal } = useModalContext();

  const handleClose = () => {
    hideModal();
  };

  const title = headerTitle || "";
  const childrenPadding = contentPadding || "2.5rem";
  const footerMargin = ModalFooter === "default" ? "14vh" : "0";
  return (
    <Modal
      open={isModalVisible}
      className={style.ModalWrapper}
      BackdropProps={{
        sx: {
          backdropFilter: "blur(3px)",
          backgroundColor: "rgba(86,86,86,0.5)",
        },
      }}
    >
      <Stack direction={"column"} spacing={2} className={style.Modal}>
          <>
        {ModalHeader === "default" ? (
          <DefaultHeader title={title} onClose={handleClose} />
        ) : (
          ModalHeader
        )}
        <div
          className={style.ModalBody}
          style={{
            padding: childrenPadding,
            marginBottom: footerMargin,
          }}
        >
          {children}
        </div>
        {ModalFooter === "default" ? <DefaultFooter /> : ModalFooter}
        {backgroundImageURL && (
          <div
            style={{ backgroundImage: `url(${backgroundImageURL})` }}
            className={style.Background}
          />
        )}
          </>
      </Stack>
    </Modal>
  );
};
