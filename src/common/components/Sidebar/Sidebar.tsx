import { Box, IconButton, Toolbar, useTheme } from "@mui/material";
import { ThemeMode } from "app/appSlice";
import style from "./Sidebar.module.css";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LogoutIcon from "@mui/icons-material/Logout";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import Divider from "@mui/material/Divider";
import { Drawer } from "./Drawer";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  changeMode: () => void;
  themeMode: ThemeMode;
  logout: () => void;
  isLoggedIn: boolean;
};

export const Sidebar = ({ changeMode, logout, open, setOpen, themeMode, isLoggedIn }: Props) => {
  const theme = useTheme();

  const colorIcon = theme.palette.text.primary;

  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar className={style.toolbar}>
        <IconButton onClick={() => setOpen(!open)}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav" className={style.list}>
        <Box>
          <ListItemButton onClick={changeMode}>
            <ListItemIcon>
              {themeMode === "light" ? (
                <Brightness4Icon sx={{ color: colorIcon }} />
              ) : (
                <Brightness7Icon sx={{ color: colorIcon }} />
              )}
            </ListItemIcon>
            <ListItemText primary="Toggle Theme" />
          </ListItemButton>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        {isLoggedIn && (
          <Box>
            <ListItemButton onClick={logout} className={style.listItemButton}>
              <ListItemIcon>
                <LogoutIcon sx={{ color: colorIcon }} />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </Box>
        )}
      </List>
    </Drawer>
  );
};
