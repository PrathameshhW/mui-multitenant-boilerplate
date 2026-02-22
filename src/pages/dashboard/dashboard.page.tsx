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
import { useNavigate } from "react-router-dom";

const sidebarWidth = 260;

const sideMenuGroups = [
  { title: "Main", items: ["Overview", "Analytics", "Sales"] },
  { title: "Management", items: ["Customers", "Orders", "Support"] },
  { title: "Settings", items: ["Billing", "Team", "Integrations"] },
];

const DashboardPage = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Overview");

  const drawerContent = (
    <Box className="flex h-full flex-col justify-between bg-white px-3 py-4">
      <Box>
        <Typography variant="h6" fontWeight={800}>
          MUI Admin
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block" mb={2.5}>
          Control center
        </Typography>

        {sideMenuGroups.map((group, groupIndex) => (
          <Box key={group.title} sx={{ mb: 1.5 }}>
            <Typography variant="overline" color="text.secondary" sx={{ pl: 1.5 }}>
              {group.title}
            </Typography>
            <List disablePadding>
              {group.items.map((menu) => (
                <ListItem key={menu} disablePadding sx={{ mb: 0.3 }}>
                  <ListItemButton
                    selected={menu === activeMenu}
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
            {groupIndex < sideMenuGroups.length - 1 && <Divider sx={{ mt: 1, mb: 1 }} />}
          </Box>
        ))}
      </Box>

      <Box className="rounded-md border border-slate-200 bg-white p-3">
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
    <Box className="flex h-screen overflow-hidden bg-slate-50">
      <Box component="nav" sx={{ width: { md: sidebarWidth }, flexShrink: { md: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { width: sidebarWidth },
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
              borderRight: "1px solid rgba(18, 24, 40, 0.08)",
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      <Box component="main" className="flex min-h-0 flex-1 flex-col overflow-auto">
        <AppBar
          position="sticky"
          color="inherit"
          elevation={0}
          className="top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur"
        >
          <Toolbar sx={{ justifyContent: "space-between", gap: 2 }}>
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
                  navigate("/login", { replace: true });
                }}
              >
                Logout
              </Button>
              <Avatar sx={{ width: 32, height: 32 }}>P</Avatar>
            </Stack>
          </Toolbar>
        </AppBar>

        <Box className="p-5">
          <Box className="rounded-lg border border-dashed border-slate-300 bg-white p-6">
            <Typography variant="h6" fontWeight={700}>
              Content Area
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Keep this area for page content. Sidebar and app bar are already wired.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardPage;
