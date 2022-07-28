import useMediaQuery from "@mui/material/useMediaQuery";
import style from "./MainLayout.module.scss";
import {useTheme} from "@mui/material";
import {Header} from "@/components/Layout/Header/Header";

export const MainLayout = ({children}: any) => {
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

    return (
        <div className={style.MainLayout}>
            <Header
                className={style.Header}
                theme={theme}
                isLargeScreen={isLargeScreen}
            />
            <div className={style.Main}>
                <div className={style.MonitorWrapper}>
                    {children}
                </div>
            </div>
            <svg height="0" width="0">
                <defs>
                    <clipPath id="vintageMonitor">
                        <path d="M507.5,11.1c42.3,4.8,75.7,38.3,80.4,80.6c7.9,69.2,11.9,138.7,12.1,208.4
    c-0.2,69.4-4.2,138.8-12,207.8c-4.8,42.3-38.1,75.8-80.4,80.6c-68.6,7.7-137.6,11.6-206.7,11.6c-69.8,0-139.5-4-208.8-11.8
    c-42.3-4.8-75.7-38.1-80.5-80.4C-3.9,369.5-3.9,229.9,11.7,91.6C16.5,49.4,49.8,16.1,92,11.2C140.2,5.7,211.6,0,300.9,0
    C389.3,0,459.7,5.6,507.5,11.1"/>
                    </clipPath>
                </defs>
            </svg>
        </div>
    );
};
