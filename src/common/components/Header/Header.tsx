import { useState } from "react";

import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import MenuIcon from "@mui/icons-material/Menu";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { changeTheme, selectAppStatus, selectIsLoggedIn, selectThemeMode, setIsLoggedIn } from "app/appSlice";
import { baseApi } from "app/baseApi";
import { ResultCode } from "common/enums";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { successToast } from "common/utils";
import { useLogoutMutation } from "features/auth/api/authApi";
import { AppBar } from "../AppBar/AppBar";
import { Sidebar } from "../Sidebar/Sidebar";

export const Header = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const themeMode = useAppSelector(selectThemeMode);
  const status = useAppSelector(selectAppStatus);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const [logout] = useLogoutMutation();

  const changeModeHandler = () => {
    dispatch(changeTheme({ themeMode: themeMode === "light" ? "dark" : "light" }));
  };

  const logoutHandler = () => {
    logout()
      .then((res) => {
        if (res.data?.resultCode === ResultCode.Success) {
          dispatch(setIsLoggedIn({ isLoggedIn: false }));
          localStorage.removeItem("sn-token");
          successToast("Logout!");
        }
      })
      .then(() => {
        dispatch(baseApi.util.invalidateTags(["Todolist", "Task"]));
      });
  };

  return (
    <>
      <AppBar open={open} position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(!open)}
            sx={{
              marginRight: "6px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
            To-Do List
          </Typography>
        </Toolbar>
        {status === "loading" && <LinearProgress />}
      </AppBar>
      <Sidebar
        changeMode={changeModeHandler}
        isLoggedIn={isLoggedIn}
        logout={logoutHandler}
        open={open}
        setOpen={setOpen}
        themeMode={themeMode}
      />
    </>
  );
};
