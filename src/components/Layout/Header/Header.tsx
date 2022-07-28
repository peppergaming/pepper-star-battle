import React, {useEffect} from "react";
import Toolbar from "@mui/material/Toolbar";
import style from "./Header.module.scss";
import useMediaQuery from "@mui/material/useMediaQuery";
import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Link from '@mui/material/Link';

export const Header = (props: any) => {
    const {theme} = props;
    const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));


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
                    <img src={"/images/logo_white.png"} style={{width: "100px"}}/>
                    <Stack direction={"row"} spacing={3} ml={5}>
                        <Link href="https://peppergaming.com" target="_blank">
                            Website
                        </Link>
                        <Link href="https://app.peppergaming.com" target="_blank">
                            App
                        </Link>
                        <Link href="https://github.com/peppergaming/auth" target="_blank">
                            SDK
                        </Link>
                    </Stack>
                </div>
            </Toolbar>
        </AppBar>
    );
};
