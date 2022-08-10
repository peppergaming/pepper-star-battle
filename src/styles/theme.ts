import { createTheme } from "@mui/material/styles";
import { palette_secondary, palette_primary, palette_grey } from "./palettes";
import React from "react";
import setKeepAlive = chrome.socket.setKeepAlive;

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
  palette: {
    mode: "dark",
    primary: {
      ...palette_primary,
    },
    secondary: {
      ...palette_secondary,
    },
    grey: {
      ...palette_grey,
    },
    error: {
      "50": "#FFF0F1",
      "100": "#FFDBDE",
      "200": "#FFBDC2",
      "300": "#FF99A2",
      "400": "#FF7A86",
      "500": "#FF505F",
      "600": "#EB0014",
      "700": "#C70011",
      "800": "#94000D",
      "900": "#570007",
      main: "#EB0014",
      light: "#FF99A2",
      dark: "#C70011",
      contrastText: "#fff",
    },
    background: {
      default: "#1C0D28",
      paper: "#280D3E",
    },
  },
  typography: {
    fontFamily: ["Rubik", "Roboto", "sans-serif"].join(","),
    body3: {
      fontSize: "0.7rem",
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiLink: {
      defaultProps: {
        underline: "none",
      },
      styleOverrides: {
        root: {
          color: palette_primary.light,
          fontWeight: 700,
          display: "inline-flex",
          alignItems: "center",
          "&:hover": {
            color: palette_primary["200"],
          },
          "&.MuiTypography-body1 > svg": {
            marginTop: 2,
          },
          "& svg:last-child": {
            marginLeft: 2,
          },
        },
      },
    },
    MuiTextField: {
      variants: [
        {
          props: {
            variant: "outlined",
          },
          style: {
            background: palette_grey["700"],

            "& .Mui-focused": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: palette_primary.light,
              },
              "&.MuiInputLabel-root": {
                color: palette_primary.light,
              },
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255,255,255,.1)",
            },
            "&:hover": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255,255,255,.3)",
              },
              background: palette_grey["600"],
            },
          },
        },
      ],
    },
  },
});

export default theme;
