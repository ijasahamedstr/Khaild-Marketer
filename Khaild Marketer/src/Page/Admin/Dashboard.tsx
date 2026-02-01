import React, { useState, useEffect } from "react";
import { 
  Box, Typography, Avatar, IconButton, List, ListItemButton, 
  ListItemIcon, ListItemText, Drawer, AppBar, Toolbar, Stack, 
  useTheme, useMediaQuery, Divider, Dialog, DialogTitle, 
  DialogContent, DialogContentText, DialogActions, Button 
} from "@mui/material";
import { 
  DashboardOutlined, 
  ShoppingBagOutlined,
  HomeWorkOutlined,    
  VpnKeyOutlined,      
  FormatPaintOutlined, 
  SettingsOutlined, 
  LogoutOutlined, 
  MenuOpen, 
  LockOutlined, 
  ArrowForwardIos, 
  Close 
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// 1. استيراد الصفحات المنفصلة
import Overview from "./Overview";
import Properties from "./Property for sale/Properties"; // الصفحة التي برمجناها للتو
import CreateAdmin from "./Settings";
import Propertyrental from "./Property rental/Propertyrental";
import Propertyfinishing from "./Property finishing/Propertyfinishing";
import Buyingproperty from "./Buying property/Buying property";

// ملاحظة: يمكنك إنشاء صفحات بسيطة لهذه الأقسام مؤقتاً
const PlaceholderPage = ({ title }: { title: string }) => (
  <Box sx={{ p: 5, textAlign: 'center' }}>
    <Typography variant="h4" sx={{ fontFamily: 'Tajawal' }}>قريباً: صفحة {title}</Typography>
  </Box>
);

const drawerWidth = 300;

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("لوحة التحكم");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  
  const [userData, setUserData] = useState({ name: "", profileImage: "", role: "مدير نظام" });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const primaryTeal = "#004652";
  const accentGold = "#CC9D2F";
  const menuFont = "Tajawal, sans-serif";

  useEffect(() => {
    const savedData = localStorage.getItem("adminData");
    if (savedData) {
      try {
        setUserData(JSON.parse(savedData));
      } catch (e) { console.error("Session parsing error"); }
    }
  }, []);

  const handleConfirmLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminData");
    navigate("/login");
  };

  // 2. دالة الرندر لعرض الصفحة المختارة
  const renderActivePage = () => {
    switch (activeTab) {
      case "لوحة التحكم": 
        return <Overview />;
      case "بيع العقار": 
        return <Properties />; // عرض صفحة بيع العقار (الكود الذي كتبناه سابقاً)
      case "شراء العقار": 
        return <Buyingproperty />;
      case "إيجار العقار": 
        return <Propertyrental />;
      case "تشطيب العقار": 
        return <Propertyfinishing />;
      case "الإعدادات": 
        return <CreateAdmin />;
      default: 
        return <Overview />;
    }
  };

  const menuItems = [
    { text: "لوحة التحكم", icon: <DashboardOutlined /> },
    { text: "بيع العقار", icon: <HomeWorkOutlined /> },
    { text: "شراء العقار", icon: <ShoppingBagOutlined/> },
    { text: "إيجار العقار", icon: <VpnKeyOutlined /> },
    { text: "تشطيب العقار", icon: <FormatPaintOutlined /> },
    { text: "الإعدادات", icon: <SettingsOutlined /> },
  ];

  const sidebarContent = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column", bgcolor: primaryTeal, color: "white" }}>
      <Box sx={{ pt: { xs: 12, md: 8 }, pb: 6, px: 4, textAlign: "center", position: "relative" }}>
        {isMobile && (
          <IconButton onClick={() => setMobileOpen(false)} sx={{ position: "absolute", left: 20, top: 30, color: "white" }}>
            <Close />
          </IconButton>
        )}
        <Box sx={{ 
          width: 80, height: 80, 
          bgcolor: "rgba(255,255,255,0.08)", 
          borderRadius: "28px", 
          display: "flex", justifyContent: "center", alignItems: "center", 
          margin: "0 auto 25px", border: `1.5px solid ${accentGold}` 
        }}>
          <LockOutlined sx={{ color: accentGold, fontSize: 40 }} />
        </Box>
        <Typography variant="h5" sx={{ fontFamily: menuFont, fontWeight: 900 }}>
          ديجي ليزر <span style={{ color: accentGold }}>العقارية</span>
        </Typography>
      </Box>

      <List sx={{ px: 3, flexGrow: 1 }}>
        {menuItems.map((item) => (
          <ListItemButton 
            key={item.text} 
            onClick={() => { setActiveTab(item.text); setMobileOpen(false); }} 
            sx={{ 
              borderRadius: "20px", 
              mb: 1.5, 
              bgcolor: activeTab === item.text ? accentGold : "transparent", 
              color: activeTab === item.text ? primaryTeal : "rgba(255,255,255,0.6)", 
              py: 1.8,
              transition: "0.3s all ease",
              "&:hover": { bgcolor: activeTab === item.text ? accentGold : "rgba(255,255,255,0.05)" }
            }}
          >
            <ListItemIcon sx={{ color: "inherit", minWidth: 45, "& svg": { fontSize: 26 } }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text} 
              primaryTypographyProps={{ fontFamily: menuFont, fontWeight: activeTab === item.text ? 900 : 500 }} 
            />
            {activeTab === item.text && <ArrowForwardIos sx={{ fontSize: 14 }} />}
          </ListItemButton>
        ))}
      </List>

      <Box sx={{ px: 3, pb: 4 }}>
        <Divider sx={{ bgcolor: "rgba(255,255,255,0.1)", mb: 2 }} />
        <ListItemButton onClick={() => setLogoutDialogOpen(true)} sx={{ borderRadius: "18px", color: "#FF7070", "&:hover": { bgcolor: "rgba(255,112,112,0.1)" } }}>
          <ListItemIcon sx={{ color: "inherit", minWidth: 45 }}><LogoutOutlined /></ListItemIcon>
          <ListItemText primary="تسجيل الخروج" primaryTypographyProps={{ fontFamily: menuFont, fontWeight: 800 }} />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", direction: "rtl", bgcolor: "#F8FAFC", minHeight: "100vh" }}>
      {/* هيدر الصفحة */}
      <AppBar 
        position="fixed" 
        elevation={0} 
        sx={{ 
          width: { md: `calc(100% - ${drawerWidth}px)` }, 
          mr: { md: `${drawerWidth}px` }, 
          bgcolor: "rgba(255, 255, 255, 0.9)", 
          backdropFilter: "blur(15px)", 
          borderBottom: "1px solid #E2E8F0", 
          zIndex: (theme) => isMobile ? theme.zIndex.drawer - 1 : theme.zIndex.drawer + 1 
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", height: { xs: 90, md: 110 }, px: { xs: 3, md: 6 } }}>
          <Stack direction="row" alignItems="center" spacing={3}>
            <IconButton 
              onClick={() => setMobileOpen(true)} 
              sx={{ display: { md: "none" }, color: primaryTeal, bgcolor: "#F1F5F9" }}
            >
              <MenuOpen fontSize="large" />
            </IconButton>
            <Typography variant="h5" sx={{ fontFamily: menuFont, fontWeight: 900, color: primaryTeal }}>
              {activeTab}
            </Typography>
          </Stack>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, padding: "6px 16px" }}>
            <Box sx={{ textAlign: "right" }}>
              <Typography sx={{ fontFamily: menuFont, fontWeight: 800, color: primaryTeal }}>
                {userData.name || "المدير العام"}
              </Typography>
              <Typography sx={{ fontFamily: menuFont, color: "#94A3B8", fontSize: "0.75rem" }}>
                {userData.role}
              </Typography>
            </Box>
            <Avatar 
              src={userData.profileImage}
              sx={{ width: 48, height: 48, outline: `3px solid ${accentGold}`, outlineOffset: "2px" }}
            />
          </Box>
        </Toolbar>
      </AppBar>

      {/* القائمة الجانبية (Sider) */}
      <Box component="nav" sx={{ width: { md: drawerWidth } }}>
        <Drawer 
          variant="temporary" 
          open={mobileOpen} 
          onClose={() => setMobileOpen(false)} 
          anchor="right" 
          sx={{ display: { xs: "block", md: "none" }, "& .MuiDrawer-paper": { width: drawerWidth } }}
        >
          {sidebarContent}
        </Drawer>
        <Drawer 
          variant="permanent" 
          anchor="right" 
          sx={{ display: { xs: "none", md: "block" }, "& .MuiDrawer-paper": { width: drawerWidth, border: "none" } }} 
          open
        >
          {sidebarContent}
        </Drawer>
      </Box>

      {/* المحتوى الرئيسي للمدير */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: { xs: 2, md: 4 }, // مساحة الحشو
          mt: { xs: "100px", md: "115px" }, 
          width: { md: `calc(100% - ${drawerWidth}px)` },
          minHeight: "100vh"
        }}
      >
        {renderActivePage()}
      </Box>

      {/* نافذة تسجيل الخروج */}
      <Dialog open={logoutDialogOpen} onClose={() => setLogoutDialogOpen(false)} dir="rtl" PaperProps={{ sx: { borderRadius: "20px" } }}>
        <DialogTitle sx={{ fontFamily: menuFont, fontWeight: 900 }}>تأكيد الخروج</DialogTitle>
        <DialogContent><DialogContentText sx={{ fontFamily: menuFont }}>هل أنت متأكد من رغبتك في تسجيل الخروج؟</DialogContentText></DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setLogoutDialogOpen(false)} sx={{ fontFamily: menuFont }}>إلغاء</Button>
          <Button onClick={handleConfirmLogout} variant="contained" sx={{ bgcolor: "#FF7070", fontFamily: menuFont }}>خروج</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;