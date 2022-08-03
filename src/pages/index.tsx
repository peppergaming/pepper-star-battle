import React from "react";
import type {Page} from "@/types/page";
import {Login} from "@/components/Login/Login";
import {MainLayout} from "@/components/Layout/MainLayout";
import {useAuthConfig} from "@/services/auth";
import {Game} from "@/components/Game";

const HomePage = () => {
  const {isPepperLogged} = useAuthConfig();
  return (
    isPepperLogged ? <Game/> : <Login/>
  );
};
HomePage.getLayout = (page: Page) => <MainLayout>{page}</MainLayout>;

export default HomePage;