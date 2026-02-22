import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const sidebarWidth = 260;

const sideMenuGroups = [
  { title: "Main", items: ["Overview", "Analytics", "Sales"] },
  { title: "Management", items: ["Customers", "Orders", "Support"] },
  { title: "Settings", items: ["Billing", "Team", "Integrations"] },
];

const MainPage = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Overview");

  const drawerContent = (
    <Box
      sx={(theme) => ({
        display: "flex",
        height: "100%",
        flexDirection: "column",
        justifyContent: "space-between",
        bgcolor: theme.palette.background.paper,
        px: 1.5,
        py: 2,
      })}
    >
      <Box>
        <Typography variant="h6" fontWeight={800}>
          MUI Admin
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          display="block"
          mb={2.5}
        >
          Control center
        </Typography>

        {sideMenuGroups.map((group, groupIndex) => (
          <Box key={group.title} sx={{ mb: 1.5 }}>
            <Typography
              variant="overline"
              color="text.secondary"
              sx={{ pl: 1.5 }}
            >
              {group.title}
            </Typography>
            <List disablePadding>
              {group.items.map((menu) => (
                <ListItem key={menu} disablePadding sx={{ mb: 0.3 }}>
                  <ListItemButton
                    selected={menu === activeMenu}
                    sx={(theme) => ({
                      "&.Mui-selected": {
                        bgcolor: theme.palette.action.selected,
                        color: theme.palette.primary.main,
                      },
                      "&.Mui-selected:hover": {
                        bgcolor: theme.palette.action.selected,
                      },
                    })}
                    onClick={() => {
                      setActiveMenu(menu);
                      setMobileOpen(false);
                    }}
                  >
                    <ListItemText
                      primary={menu}
                      primaryTypographyProps={{
                        variant: "body2",
                        fontWeight: menu === activeMenu ? 700 : 500,
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            {groupIndex < sideMenuGroups.length - 1 && (
              <Divider sx={{ mt: 1, mb: 1 }} />
            )}
          </Box>
        ))}
      </Box>

      <Box
        sx={(theme) => ({
          borderRadius: theme.shape.borderRadius,
          border: `1px solid ${theme.palette.divider}`,
          bgcolor: theme.palette.background.paper,
          p: 1.5,
        })}
      >
        <Stack direction="row" spacing={1.25} alignItems="center">
          <Avatar sx={{ width: 32, height: 32 }}>P</Avatar>
          <Box>
            <Typography variant="body2" fontWeight={600}>
              Prathamesh
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Admin
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  );

  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        bgcolor: theme.palette.background.default,
      })}
    >
      <Box
        component="nav"
        sx={{ width: { md: sidebarWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              width: sidebarWidth,
              bgcolor: "background.paper",
            },
          }}
        >
          {drawerContent}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              width: sidebarWidth,
              boxSizing: "border-box",
              borderRight: (theme) => `1px solid ${theme.palette.divider}`,
              bgcolor: "background.paper",
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          display: "flex",
          minHeight: 0,
          flex: 1,
          flexDirection: "column",
          overflow: "auto",
        }}
      >
        <AppBar
          position="sticky"
          color="inherit"
          elevation={0}
          sx={(theme) => ({
            top: 0,
            zIndex: 10,
            borderBottom: `1px solid ${theme.palette.divider}`,
            bgcolor: theme.palette.background.paper,
            backdropFilter: "blur(8px)",
          })}
        >
          <Toolbar
            sx={{
              justifyContent: "space-between",
              gap: 2,
              p: "16px !important",
            }}
          >
            <Stack direction="row" spacing={1.5} alignItems="center">
              <IconButton
                size="small"
                edge="start"
                onClick={() => setMobileOpen(true)}
                sx={{ display: { md: "none" } }}
              >
                <Typography variant="button">Menu</Typography>
              </IconButton>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Dashboard
                </Typography>
                <Typography variant="h6" fontWeight={700}>
                  {activeMenu}
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
              <Button variant="outlined" size="small">
                Notification
              </Button>
              <Button
                variant="outlined"
                size="small"
                color="error"
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login", { replace: true });
                }}
              >
                Logout
              </Button>
              <Avatar sx={{ width: 32, height: 32 }}>P</Avatar>
            </Stack>
          </Toolbar>
        </AppBar>

        <Box sx={{ p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainPage;
