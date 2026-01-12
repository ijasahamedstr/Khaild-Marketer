import React, { useState } from "react";
import { Box, Typography, Avatar, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Drawer, AppBar, Toolbar, Stack, Badge, useTheme, useMediaQuery } from "@mui/material";
import { DashboardOutlined, HomeWorkOutlined, PeopleOutline, AccountBalanceWalletOutlined, SettingsOutlined, LogoutOutlined, NotificationsNone, MenuOpen, LockOutlined, ArrowForwardIos, Close } from "@mui/icons-material";

// IMPORT SEPARATE PAGES
import Properties from "./Properties";
import Overview from "./Overview";

const drawerWidth = 300;

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("لوحة التحكم");
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const primaryTeal = "#004652";
  const accentGold = "#CC9D2F";
  const menuFont = "Tajawal, sans-serif";

  // FUNCTION TO DECIDE WHICH PAGE TO SHOW
  const renderActivePage = () => {
    switch (activeTab) {
      case "لوحة التحكم": return <Overview />;
      case "العقارات المتاحة": return <Properties />;
      case "إدارة العملاء": return <Box sx={{ p: 5, textAlign: "center" }}><Typography variant="h4" sx={{fontFamily: menuFont}}>صفحة العملاء</Typography></Box>;
      case "التقارير المالية": return <Box sx={{ p: 5, textAlign: "center" }}><Typography variant="h4" sx={{fontFamily: menuFont}}>التقارير المالية</Typography></Box>;
      case "الإعدادات": return <Box sx={{ p: 5, textAlign: "center" }}><Typography variant="h4" sx={{fontFamily: menuFont}}>الإعدادات</Typography></Box>;
      default: return <Overview />;
    }
  };

  const menuItems = [
    { text: "لوحة التحكم", icon: <DashboardOutlined /> },
    { text: "العقارات المتاحة", icon: <HomeWorkOutlined /> },
    { text: "إدارة العملاء", icon: <PeopleOutline /> },
    { text: "التقارير المالية", icon: <AccountBalanceWalletOutlined /> },
    { text: "الإعدادات", icon: <SettingsOutlined /> },
  ];

  const sidebarContent = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column", bgcolor: primaryTeal, color: "white" }}>
      <Box sx={{ pt: { xs: 12, md: 8 }, pb: 6, px: 4, textAlign: "center", position: "relative" }}>
        {isMobile && <IconButton onClick={() => setMobileOpen(false)} sx={{ position: "absolute", left: 20, top: 30, color: "white" }}><Close /></IconButton>}
        <Box sx={{ width: 80, height: 80, bgcolor: "rgba(255,255,255,0.08)", borderRadius: "28px", display: "flex", justifyContent: "center", alignItems: "center", margin: "0 auto 25px", border: `1.5px solid ${accentGold}` }}><LockOutlined sx={{ color: accentGold, fontSize: 40 }} /></Box>
        <Typography variant="h5" sx={{ fontFamily: menuFont, fontWeight: 900 }}>ديجي ليزر <span style={{ color: accentGold }}>العقارية</span></Typography>
      </Box>
      <List sx={{ px: 3, flexGrow: 1 }}>
        {menuItems.map((item) => (
          <ListItemButton 
            key={item.text} 
            onClick={() => { setActiveTab(item.text); setMobileOpen(false); }} 
            sx={{ borderRadius: "20px", mb: 2.5, bgcolor: activeTab === item.text ? accentGold : "transparent", color: activeTab === item.text ? primaryTeal : "rgba(255,255,255,0.6)", py: 2 }}
          >
            <ListItemIcon sx={{ color: "inherit", minWidth: 50 }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} primaryTypographyProps={{ fontFamily: menuFont, fontWeight: activeTab === item.text ? 800 : 500 }} />
            {activeTab === item.text && <ArrowForwardIos sx={{ fontSize: 14 }} />}
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", direction: "rtl", bgcolor: "#F8FAFC", minHeight: "100vh" }}>
      <AppBar position="fixed" elevation={0} sx={{ width: { md: `calc(100% - ${drawerWidth}px)` }, mr: { md: `${drawerWidth}px` }, bgcolor: "rgba(255, 255, 255, 0.9)", backdropFilter: "blur(15px)", borderBottom: "1px solid #E2E8F0", zIndex: (theme) => isMobile ? theme.zIndex.drawer - 1 : theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ justifyContent: "space-between", height: { xs: 90, md: 110 }, px: { xs: 3, md: 6 } }}>
          <Stack direction="row" alignItems="center" spacing={3}>
            <IconButton onClick={() => setMobileOpen(true)} sx={{ display: { md: "none" }, color: primaryTeal, bgcolor: "#F1F5F9" }}><MenuOpen fontSize="large" /></IconButton>
            <Typography variant="h5" sx={{ fontFamily: menuFont, fontWeight: 900, color: primaryTeal }}>{activeTab}</Typography>
          </Stack>
          <Avatar sx={{ width: 55, height: 55, border: `2px solid ${accentGold}` }} src="https://i.pravatar.cc/150?u=1" />
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { md: drawerWidth } }}>
        <Drawer variant="temporary" open={mobileOpen} onClose={() => setMobileOpen(false)} anchor="right" sx={{ display: { xs: "block", md: "none" }, "& .MuiDrawer-paper": { width: drawerWidth, zIndex: (theme) => theme.zIndex.drawer + 2 } }}>{sidebarContent}</Drawer>
        <Drawer variant="permanent" anchor="right" sx={{ display: { xs: "none", md: "block" }, "& .MuiDrawer-paper": { width: drawerWidth, border: "none", boxShadow: "-15px 0 35px rgba(0,70,82,0.12)" } }} open>{sidebarContent}</Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, p: { xs: 3, md: 8 }, width: { md: `calc(100% - ${drawerWidth}px)` }, mt: { xs: "110px", md: "130px" } }}>
        {renderActivePage()}
      </Box>
    </Box>
  );
};

export default Dashboard;