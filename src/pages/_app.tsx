import '../styles/globals.css'
import type {AppProps} from 'next/app'
import wrapper from "@/store/store";
import {AuthConfigProvider} from "@/services/auth";
import {Page} from "@/types/page";
import {ThemeProvider, useTheme} from "@mui/material";
import Head from "next/head";


interface PepperStarGameProps extends AppProps {
  Component: Page;
}

function PepperStarGame(props: PepperStarGameProps) {
  const {Component, pageProps} = props;

  const theme = useTheme();
  const getLayout = Component.getLayout || ((page) => page);
  return <>
    <Head>
      <title>Pepper Star Battle</title>
      <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height, target-densitydpi=device-dpi" />
    </Head>
    <ThemeProvider theme={theme}>
      <AuthConfigProvider>
        {getLayout(<Component {...pageProps} />)}
      </AuthConfigProvider>
    </ThemeProvider>
  </>
}

export default wrapper.withRedux(PepperStarGame);
