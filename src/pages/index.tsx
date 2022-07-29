import React from "react";
import type {Page} from "@/types/page";
import {Login} from "@/components/Login/Login";
import {MainLayout} from "@/components/Layout/MainLayout";

const LoginPage = () => {
    return (
        <Login/>
    );
};
LoginPage.getLayout = (page: Page) => <MainLayout>{page}</MainLayout>;

export default LoginPage;