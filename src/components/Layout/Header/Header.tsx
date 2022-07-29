import React from "react";
import Toolbar from "@mui/material/Toolbar";
import style from "./Header.module.scss";
import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import Link from '@mui/material/Link';
import {UserWidget} from "@/components/Layout/Header/UserWidget";
import {useAppSelector} from "@/store/hooks";
import {useAuthConfig} from "@/services/auth";

export const Header = (props: any) => {
    const {theme} = props;
    const userWeb3Profile = useAppSelector((state) => state.auth.userWeb3Profile);
    const {isPepperLogged} =
        useAuthConfig();

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
                <div className={style.RightBox}>
                    {isPepperLogged && userWeb3Profile && (
                        <UserWidget user={userWeb3Profile}/>
                    )}
                </div>
            </Toolbar>
        </AppBar>
    );
};
