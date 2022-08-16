import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { AuthConfigService } from "@/services/auth";
import { Page } from "@/types/page";
import { ThemeProvider } from "@mui/material";
import Head from "next/head";
import { GameConfigService } from "@/services/game";
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
        <link rel="stylesheet" href="https://use.typekit.net/txv3qmz.css" />
      </Head>
      <ThemeProvider theme={theme}>
        <AuthConfigService>
          <GameConfigService>
            {getLayout(<Component {...pageProps} />)}
          </GameConfigService>
        </AuthConfigService>
      </ThemeProvider>
    </>
  );
}

export default PepperStarBattle;
