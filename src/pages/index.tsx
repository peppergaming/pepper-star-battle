import React from "react";
import type {Page} from "@/types/page";
import {Login} from "@/components/Login/Login";
import {MainLayout} from "@/components/Layout/MainLayout";
import {useAuthConfig} from "@/services/auth";
import Canvas from "@/components/Canvas/Canvas";

const HomePage = () => {
  const {isPepperLogged} = useAuthConfig();
  return (
    isPepperLogged ? <Canvas height={640} width={640}/> : <Login/>
  );
};
HomePage.getLayout = (page: Page) => <MainLayout>{page}</MainLayout>;

export default HomePage;