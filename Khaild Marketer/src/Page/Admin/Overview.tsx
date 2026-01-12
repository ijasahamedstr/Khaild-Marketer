import React from "react";
import {
  Box,
  Typography,
  Stack,
  Paper,
  IconButton,
  Badge,
} from "@mui/material";
import {
  ArrowBackIosNew,
  HomeWorkOutlined,
  ShoppingBagOutlined,
  VpnKeyOutlined,
  FormatPaintOutlined,
} from "@mui/icons-material";

const primaryTeal = "#004652";
const accentGold = "#CC9D2F";
const menuFont = "Tajawal, sans-serif";

const services = [
  {
    title: "بيع العقار",
    count: "124",
    newRequests: 8,
    icon: <HomeWorkOutlined sx={{ fontSize: 32 }} />,
    color: "#10B981",
    desc: "إدارة عروض البيع والتسويق الاحترافية"
  },
  {
    title: "شراء العقار",
    count: "85",
    newRequests: 12,
    icon: <ShoppingBagOutlined sx={{ fontSize: 32 }} />,
    color: accentGold,
    desc: "البحث عن أفضل الفرص الاستثمارية"
  },
  {
    title: "إيجار العقار",
    count: "240",
    newRequests: 25,
    icon: <VpnKeyOutlined sx={{ fontSize: 32 }} />,
    color: "#3B82F6",
    desc: "تأجير الوحدات السكنية والتجارية"
  },
  {
    title: "تشطيب العقار",
    count: "42",
    newRequests: 5,
    icon: <FormatPaintOutlined sx={{ fontSize: 32 }} />,
    color: "#8B5CF6",
    desc: "خدمات التصميم الداخلي والتنفيذ"
  }
];

const Overview: React.FC = () => {
  return (
    <Box sx={{ direction: "rtl", width: "100%", pb: 5 }}>
      
      {/* --- PAGE HEADER --- */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 6 }}>
        <Box>
          <Typography variant="h4" sx={{ fontFamily: menuFont, fontWeight: 900, color: primaryTeal, letterSpacing: -0.5 }}>
            إحصائيات الخدمات
          </Typography>
          <Typography sx={{ fontFamily: menuFont, color: "#64748B", mt: 0.5, fontSize: '1rem' }}>
            تتبع أداء الأقسام والطلبات الجديدة
          </Typography>
        </Box>
        <Paper elevation={0} sx={{ p: 1.5, px: 3, borderRadius: "50px", bgcolor: "#fff", border: "1px solid #E2E8F0", display: {xs: 'none', md: 'flex'}, alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ width: 8, height: 8, bgcolor: '#10B981', borderRadius: '50%', animation: 'pulse 2s infinite' }} />
            <Typography sx={{ fontFamily: menuFont, fontWeight: 700, fontSize: '0.85rem', color: primaryTeal }}>تحديث مباشر للنظام</Typography>
        </Paper>
      </Stack>

      {/* --- EFFECT-DRIVEN CARDS CONTAINER --- */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 4,
        }}
      >
        {services.map((service, index) => (
          <Paper
            key={index}
            elevation={0}
            sx={{
              flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 32px)", lg: "1 1 calc(25% - 32px)" },
              p: 4,
              borderRadius: "40px",
              bgcolor: "rgba(255, 255, 255, 0.6)",
              backdropFilter: "blur(10px)",
              border: "1px solid #fff",
              boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
              position: "relative",
              overflow: "hidden",
              transition: "0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              display: "flex",
              flexDirection: "column",
              minHeight: "360px",
              "&:hover": {
                transform: "translateY(-12px)",
                boxShadow: `0 40px 80px ${service.color}15`,
                bgcolor: "rgba(255, 255, 255, 1)",
                "& .glow-orb": {
                    transform: "scale(1.2)",
                    filter: `blur(20px)`,
                },
                "& .active-line": {
                    height: '100%',
                }
              },
            }}
          >
            {/* Animated Side Line */}
            <Box className="active-line" sx={{ position: 'absolute', right: 0, top: 0, width: '6px', height: '0%', bgcolor: service.color, transition: '0.6s ease' }} />

            {/* Top Section: Glowing Icon Orb */}
            <Box sx={{ position: 'relative', mb: 4 }}>
              <Box 
                className="glow-orb"
                sx={{ 
                    position: 'absolute', top: 5, right: 5, width: 60, height: 60, 
                    bgcolor: service.color, opacity: 0.2, borderRadius: '50%', 
                    filter: 'blur(15px)', transition: '0.5s' 
                }} 
              />
              <Box
                sx={{
                  width: 70,
                  height: 70,
                  bgcolor: "#fff",
                  borderRadius: "24px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: service.color,
                  boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
                  zIndex: 2,
                  position: 'relative',
                  border: `1px solid ${service.color}20`,
                }}
              >
                {service.icon}
              </Box>
              
              <Badge 
                badgeContent={service.newRequests} 
                sx={{ 
                    position: 'absolute', top: 0, left: 0,
                    "& .MuiBadge-badge": { 
                        bgcolor: service.color, color: "white", 
                        fontFamily: menuFont, fontWeight: 900,
                        height: 28, width: 28, borderRadius: '50%',
                        border: '3px solid #fff'
                    } 
                }} 
              />
            </Box>

            {/* Title & Desc */}
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h5" sx={{ fontFamily: menuFont, fontWeight: 900, color: primaryTeal, mb: 1.5 }}>
                {service.title}
              </Typography>
              <Typography sx={{ fontFamily: menuFont, color: "#64748B", fontSize: "0.95rem", lineHeight: 1.6 }}>
                {service.desc}
              </Typography>
            </Box>

            {/* Bottom Stats Bubble */}
            <Box 
                sx={{ 
                    mt: 3, p: 2, borderRadius: '24px', 
                    bgcolor: 'rgba(241, 245, 249, 0.5)', 
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between' 
                }}
            >
                <Box>
                    <Typography sx={{ fontFamily: menuFont, fontSize: "0.7rem", color: "#94A3B8", fontWeight: 700, mb: -0.5 }}>إجمالي الطلبات</Typography>
                    <Typography sx={{ fontFamily: menuFont, fontWeight: 900, color: primaryTeal, fontSize: '1.8rem' }}>
                        {service.count}
                    </Typography>
                </Box>
                <IconButton sx={{ bgcolor: "#fff", color: primaryTeal, boxShadow: '0 4px 10px rgba(0,0,0,0.05)', "&:hover": {bgcolor: service.color, color: '#fff'} }}>
                    <ArrowBackIosNew sx={{ fontSize: 16 }} />
                </IconButton>
            </Box>
          </Paper>
        ))}
      </Box>

      {/* CSS for Pulse Animation */}
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(0.95); opacity: 0.7; }
            70% { transform: scale(1.1); opacity: 1; }
            100% { transform: scale(0.95); opacity: 0.7; }
          }
        `}
      </style>
    </Box>
  );
};

export default Overview;