import '../styles/globals.css'
import type { AppProps } from 'next/app'
import wrapper from "@/store/store";
import { AuthConfigProvider } from "@/services/auth";
// import { ModalProvider } from "@/services/modal";
import {Page} from "@/types/page";
import {ThemeProvider, useTheme} from "@mui/material";

interface PepperStarGameProps extends AppProps {
  Component: Page;
}

function PepperStarGame( props : PepperStarGameProps) {
  const { Component,  pageProps } = props;

  const  theme  = useTheme();
  const getLayout = Component.getLayout || ((page) => page);
  return <ThemeProvider theme={theme}>
    <AuthConfigProvider>
      {/*<ModalProvider>*/}
        {getLayout(<Component {...pageProps} />)}
      {/*</ModalProvider>*/}
    </AuthConfigProvider>
  </ThemeProvider>
}

export default wrapper.withRedux(PepperStarGame);
