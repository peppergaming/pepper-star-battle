import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import React from "react";
import {toSvg} from "jdenticon";
import Image from "next/image";
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import style from "./UserWidget.module.scss"
import {Popper} from "@mui/material";
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import {useAuthConfig} from "@/services/auth";

export const UserWidget = ({user}: any) => {
    const address = user?.publicAddress || "";
    const svgString = toSvg(address, 56);
    const buff = new Buffer(svgString);
    const base64data = buff.toString("base64");
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);
    const {logout} = useAuthConfig();

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleLogout = async () => {
        await logout();
        setOpen(false);
    }

    const handleClose = (event: Event | React.SyntheticEvent) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current && !open) {
            anchorRef.current!.focus();
        }

        prevOpen.current = open;
    }, [open]);


    return (
        <div className={style.UserWidget}>
            <Button ref={anchorRef}
                    id="composition-button"
                    aria-controls={open ? 'composition-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                    className={style.UserInfo}
                    sx={{pb: ".5rem"}}
                    disableRipple>
                <Avatar sx={{width: 36, height: 36, backgroundColor: "white"}}>
                    <Image
                        src={`data:image/svg+xml;base64,${base64data}`}
                        width={36}
                        height={36}
                        alt="Gravatar"
                    />
                </Avatar>

                <div className={style.infos}>
                    <Typography
                        ml={1}
                        className={style.username}
                        align={"left"}
                        noWrap
                    >
                        {user.name.split(" ")[0]}
                    </Typography>
                </div>
                <KeyboardArrowDownIcon style={{marginLeft: "3px"}}/>
            </Button>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-end"
                transition
            >
                {({TransitionProps, placement}) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom-start' ? 'left top' : 'left bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={open}
                                    id="composition-menu"
                                    aria-labelledby="composition-button"
                                    onKeyDown={handleListKeyDown}
                                >
                                    <MenuItem onClick={handleClose}><span
                                        style={{fontSize: "14px"}}>Profile</span><PersonOutlineOutlinedIcon
                                        style={{marginLeft: "0.4rem"}}/></MenuItem>
                                    <MenuItem onClick={handleLogout}><span
                                        style={{fontSize: "14px"}}>Logout</span><LogoutOutlinedIcon
                                        style={{marginLeft: "0.4rem"}}/></MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    );
};