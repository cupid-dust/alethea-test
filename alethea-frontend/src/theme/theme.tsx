"use client";

import React from "react";
import { createTheme, ThemeOptions, ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { NextAppDirEmotionCacheProvider } from "@app/theme";

interface Props {
  children: React.ReactNode;
}

const themesOptions: Record<string, ThemeOptions> = {
  ["DARK"]: {
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottom: "1px solid rgba(145, 158, 171, 0.24)",
          },
        },
      },
    },
    palette: {
      background: {
        default: "#171c24",
        paper: "#222b36",
      },
      divider: "rgba(145, 158, 171, 0.24)",
      error: {
        contrastText: "#ffffff",
        main: "#f44336",
      },
      mode: "dark",
      primary: {
        contrastText: "#ffffff",
        main: "#688eff",
      },
      success: {
        contrastText: "#ffffff",
        main: "#4caf50",
      },
      text: {
        primary: "#ffffff",
        secondary: "#919eab",
      },
      warning: {
        contrastText: "#ffffff",
        main: "#ff9800",
      },
    },
  },
};

const theme = createTheme(themesOptions["DARK"]);

const ThemeRegistry = ({ children }: Props) => {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
};

export default ThemeRegistry;
