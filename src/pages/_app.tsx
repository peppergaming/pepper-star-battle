import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthConfigProvider } from "@/services/auth";
import { Page } from "@/types/page";
import { ThemeProvider, useTheme } from "@mui/material";
import Head from "next/head";
import { GameConfigProvider } from "@/services/game";
import theme from "@/styles/theme";
interface PepperStarGameProps extends AppProps {
  Component: Page;
}

function PepperStarBattle(props: PepperStarGameProps) {
  const { Component, pageProps } = props;

  const getLayout = Component.getLayout || ((page) => page);
  return (
    <>
      <Head>
        <title>Pepper Star Battle</title>
        <meta
          name="viewport"
          content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <AuthConfigProvider>
          <GameConfigProvider>
            {getLayout(<Component {...pageProps} />)}
          </GameConfigProvider>
        </AuthConfigProvider>
      </ThemeProvider>
    </>
  );
}

export default PepperStarBattle;
