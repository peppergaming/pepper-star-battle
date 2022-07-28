import React from "react";
import type {Page} from "@/types/page";
import {Login} from "@/components/Login/Login";
import {MainLayout} from "@/components/Layout/MainLayout";
import style from "./oauth.module.scss";

const LoginPage = () => {
    return (
        <></>
    );
};
LoginPage.getLayout = (page: Page) => <MainLayout>{page}</MainLayout>;

export default LoginPage;