import { amber, grey } from "@mui/material/colors";
import { createTheme, Theme } from "@mui/material/styles";
import { ThemeMode } from "app/appSlice";

const lightPalette = {
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
    light: "#ffc107",
  },
};

const darkPalette = {
  primary: {
    main: grey[900],
  },
  text: {
    primary: "#fff",
    secondary: grey[500],
  },
  background: {
    default: grey[800],
    paper: "#4c4c4c",
  },
  secondary: {
    main: "#9f9c96",
    light: "#ffce58",
  },
};

export const getTheme = (themeMode: ThemeMode): Theme =>
  createTheme({
    palette: themeMode === "light" ? lightPalette : darkPalette,
  });
