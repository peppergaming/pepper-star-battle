import theme from "@/styles/theme";
import Document, { Head, Html, Main, NextScript } from "next/document";

export default class PepperDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <title>Pepper Star Battle</title>
          <link rel="icon" href="/icons/favicon.ico" />
          <meta
            name="viewport"
            content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height"
          />
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link rel="stylesheet" href="https://use.typekit.net/txv3qmz.css" />
          {/* Inject MUI styles first to match with the prepend: true configuration. */}
          {(this.props as any).emotionStyleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
