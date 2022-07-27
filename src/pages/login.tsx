import React from "react";
import style from "./oauth.module.scss";
import { Login } from "../components/Login/Login";

const Oauth = () => {
    return (
        <div className={style.Oauth}>
            <Login />
        </div>
    );
};
export default Oauth;
