import React from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Outlet, NavLink } from "react-router-dom";

const drawerWidth = 240;

const MainPage = () => {
  const [open, setOpen] = React.useState(true);

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  console.log(location.pathname);

  return (
    <Box className="flex h-screen bg-slate-100">
      <CssBaseline />

      {/* ===== AppBar ===== */}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "primary.main",
          transition: "all 0.3s",
          width: open ? `calc(100% - ${drawerWidth}px)` : "100%",
          ml: open ? `${drawerWidth}px` : 0,
        }}
      >
        <Toolbar className="flex justify-between">
          <div className="flex items-center gap-2">
            <IconButton color="inherit" onClick={toggleDrawer}>
              {open ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
            <Typography variant="h6" noWrap>
              Dev Dashboard
            </Typography>
          </div>

          <Avatar sx={{ bgcolor: "white", color: "primary.main" }}>PJ</Avatar>
        </Toolbar>
      </AppBar>

      {/* ===== Drawer ===== */}
      <Drawer
        variant="persistent"
        open={open}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            background: "linear-gradient(180deg, #4B0082, #2e0057)",
            color: "white",
          },
        }}
      >
        <Toolbar />

        <Box className="px-4 py-2">
          <Typography variant="subtitle1" className="opacity-80">
            Navigation
          </Typography>
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />

        <List className="px-2 py-3 space-y-1">
          <ListItemButton
            component={NavLink}
            to="/"
            selected={location.pathname === "/"}
          >
            <ListItemText primary="Dashboard" />
          </ListItemButton>

          <ListItemButton
            component={NavLink}
            to="/users"
            selected={location.pathname === "/users"}
          >
            <ListItemText primary="Users" />
          </ListItemButton>

          <ListItemButton
            component={NavLink}
            to="/settings"
            selected={location.pathname === "/settings"}
          >
            <ListItemText primary="Settings" />
          </ListItemButton>
        </List>
      </Drawer>

      {/* ===== Main Content ===== */}
      <Box
        component="main"
        className="flex-1 p-6 overflow-auto"
        sx={{
          transition: "margin 0.3s",
          ml: open ? `${drawerWidth}px` : 0,
        }}
      >
        <Toolbar />

        {/* Content Wrapper Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 min-h-full">
          <Outlet />
        </div>
      </Box>
    </Box>
  );
};

export default MainPage;
