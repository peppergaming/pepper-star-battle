import useMediaQuery from "@mui/material/useMediaQuery";
import style from "./MainLayout.module.scss";
import {useTheme} from "@mui/material";
import {Header} from "@/components/Header/Header";

export const MainLayout = ({children}: any) => {

    return (
        <div className={style.MainLayout}>
            <Header
                className={style.Header}
            />
            <div className={style.Main}>
                <div className={style.MainWrapper}>
                  <div className={style.MonitorContent}>
                    {children}
                  </div>
                    <div className={style.MonitorFrame}></div>
                </div>
            </div>
        </div>
    );
};
