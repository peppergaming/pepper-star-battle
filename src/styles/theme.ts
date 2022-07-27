import "@fontsource/rubik/300.css";
import "@fontsource/rubik/400.css";
import "@fontsource/rubik/500.css";
import "@fontsource/rubik/700.css";

import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
// import { colors } from "@/styles/variables";
import breakpoints from "./breakpoints.module.scss";
import React from "react";
// import {BreakpointOverrides} from "@material-ui/core/styles/createBreakpoints"

declare module "@mui/material/IconButton" {
  interface IconButtonPropsSizeOverrides {
    extraSmall: true;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsSizeOverrides {
    extraLarge: true;
  }
}
declare module "@mui/material/styles" {
  interface TypographyVariants {
    body3: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    body3?: React.CSSProperties;
  }
}
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    body3: true;
  }
}

// Create a theme instance.
const theme = createTheme({
  breakpoints: {
    values: {
      xs: +breakpoints.xs,
      sm: +breakpoints.sm,
      md: +breakpoints.md,
      lg: +breakpoints.lg,
      xl: +breakpoints.xl,
      // xxl: +breakpoints.xxl,
    },
  },
  palette: {
    mode: "dark",
    primary: {
      light: "#ffd74b",
      main: "#FFCE1F",
      dark: "#b29015",
    },
    secondary: {
      light: "#fff9eb",
      main: "#FFF8E7",
      dark: "#b2ada1",
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: ["Rubik", "Roboto", "sans-serif"].join(","),
    body3: {
      fontSize: "0.7rem",
    },
  },
  components: {
    MuiIconButton: {
      variants: [
        {
          props: { size: "extraSmall" },
          style: {
            padding: "2px",
          },
        },
      ],
    },
    MuiButton: {
      variants: [
        {
          props: { size: "extraLarge" },
          style: {
            fontSize: "2em",
            // padding: "2px",
          },
        },
      ],
    },
    // MuiTypography: {
    //   variants: [
    //     {
    //       props: { variant: "body2", fontSize: "small" },
    //       style: {
    //         fontSize: "0.7rem",
    //       },
    //     },
    //   ],
    // },
  },
});

export default theme;
