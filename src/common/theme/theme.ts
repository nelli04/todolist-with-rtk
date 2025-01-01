import { amber, grey } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import { ThemeMode } from "app/appSlice";

export const getTheme = (themeMode: ThemeMode) => {
  return createTheme({
    palette: {
      ...(themeMode === "light"
        ? {
            primary: {
              main: amber[500],
            },
            text: {
              primary: grey[900],
              secondary: grey[800],
            },
            background: {
              default: amber[50],
              paper: "#fffde7",
            },
            secondary: {
              main: "#352f24",
              light: "#ffc107"
            },
          }
        : {
            primary: {
              main: grey[900],
            },
            background: {
              default: grey[800],
              paper: "#4c4c4c",
            },
            text: {
              primary: "#fff",
              secondary: grey[500],
            },
            secondary: {
              main: "#9f9c96",
              light: "#ffce58"
            },
          }),
    },
  });
};
