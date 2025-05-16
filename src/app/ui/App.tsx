import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { ErrorSnackbar, Header } from "common/components";
import { ResultCode } from "common/enums";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { getTheme } from "common/theme";
import { useMeQuery } from "features/auth/api/authApi";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { selectThemeMode, setIsLoggedIn, changeTheme  } from "../appSlice";
import s from "./App.module.css";

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode);

  const [isInitialized, setIsInitialized] = useState(false);

  const dispatch = useAppDispatch();

  const token = localStorage.getItem("sn-token");
  const { data, isLoading } = useMeQuery(undefined, {skip: !token});

  useEffect(() => {
    const storedTheme = localStorage.getItem("themeMode");
    if (storedTheme === "light" || storedTheme === "dark") {
      dispatch(changeTheme({ themeMode: storedTheme as "light" | "dark" }));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  useEffect(() => {
    if (!isLoading) {
      setIsInitialized(true);
      if (data?.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedIn({ isLoggedIn: true }));
      }
    }
  }, [isLoading, data]);

  return (
    <ThemeProvider theme={getTheme(themeMode)}>
      <CssBaseline />
      {isInitialized && (
        <Box display="flex">
          <Header />
          <Outlet />
        </Box>
      )}

      {!isInitialized && (
        <div className={s.circularProgressContainer}>
          <CircularProgress variant="indeterminate" size={100} thickness={3} />
        </div>
      )}

      <ErrorSnackbar />
      <ToastContainer />
    </ThemeProvider>
  );
};
