import React from "react";
import Toolbar from "@mui/material/Toolbar";
import style from "./Header.module.scss";
import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import Link from '@mui/material/Link';
import {UserWidget} from "./UserWidget";
import {useAuthConfig} from "@/services/auth";

export const Header = () => {
  const {userInfo, isPepperLogged} = useAuthConfig();

  return (
    <AppBar
      elevation={0}
      position="static"
      enableColorOnDark={true}
      color="inherit"
      className={style.Header}
    >
      <Toolbar sx={{minHeight: "auto!important", height: "100%!important"}}>
        <div className={style.LeftBox}>
          <img src={"/images/logo_white.png"} alt={"Pepper logo"} style={{width: "100px"}}/>
          <Stack direction={"row"} spacing={3} ml={5}>
            <Link href="https://peppergaming.com" target="_blank" color="inherit">
              Website
            </Link>
            <Link href="https://app.peppergaming.com" target="_blank" color="inherit">
              App
            </Link>
            <Link href="https://github.com/peppergaming/auth" target="_blank" color="inherit">
              SDK
            </Link>
          </Stack>
        </div>
        <div>
          {isPepperLogged && userInfo && (
            <UserWidget user={userInfo}/>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};
