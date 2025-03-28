import { UserProvider } from "@/contexts/UserContext";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import React from "react";

export default function Provider({ children }) {
  const theme = createTheme({
    // font
    fontFamily: "Noto Sans Thai",
    typography: {
      fontFamily: "Noto Sans Thai",
    },
    link: {
      fontFamily: "Noto Sans Thai",
    },
  });

  return (
    <UserProvider>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </UserProvider>
  );
}