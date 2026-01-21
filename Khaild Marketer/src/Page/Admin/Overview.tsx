import React, { useState, useEffect } from "react";
import { Box, Typography, Stack, Paper, IconButton,Divider } from "@mui/material";
import { ArrowBackIosNew, HomeWorkOutlined, ShoppingBagOutlined, VpnKeyOutlined, FormatPaintOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const primaryTeal = "#004652", accentGold = "#CC9D2F", menuFont = "Tajawal, sans-serif";

const Overview = () => {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({ finishing: 0, sale: 0, buying: 0, rental: 0 });

  useEffect(() => {
    const apiHost = import.meta.env.VITE_API_URL || "";
    const endpoints = {
      finishing: "/api/save-service-contact",
      sale: "/api/save-request",
      buying: "/api/save",
      rental: "/api/submit"
    };

    Object.entries(endpoints).forEach(([key, url]) => {
      fetch(`${apiHost}${url}`)
        .then(res => res.json())
        .then(data => {
          const val = data.success && Array.isArray(data.data) ? data.data.length : (Array.isArray(data) ? data.length : 0);
          setCounts(prev => ({ ...prev, [key]: val }));
        })
        .catch(err => console.error(`Error fetching ${key}:`, err));
    });
  }, []);

  const services = [
    { id: "sale", title: "بيع العقار", count: counts.sale, icon: <HomeWorkOutlined />, color: "#10B981" },
    { id: "buying", title: "شراء العقار", count: counts.buying, icon: <ShoppingBagOutlined />, color: accentGold },
    { id: "rental", title: "إيجار العقار", count: counts.rental, icon: <VpnKeyOutlined />, color: "#3B82F6" },
    { id: "finishing", title: "تشطيب العقار", count: counts.finishing, icon: <FormatPaintOutlined />, color: "#8B5CF6" }
  ];

  return (
  <>
    <Box sx={{ direction: "rtl", width: "100%", pb: 5 }}>
      <Stack direction="row" justifyContent="space-between" mb={6}>
        <Box>
          <Typography variant="h4" fontWeight={900} color={primaryTeal} fontFamily={menuFont}>إحصائيات الخدمات</Typography>
          <Typography color="#64748B" fontFamily={menuFont}>تتبع أداء الأقسام والطلبات الجديدة</Typography>
        </Box>
      </Stack>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
        {services.map((s) => (
          <Paper key={s.id} elevation={0} 
            onClick={() => navigate(`/service-detail/${s.id}`)} 
            sx={{
              flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 32px)", lg: "1 1 calc(25% - 32px)" },
              p: 4, borderRadius: "40px", bgcolor: "rgba(255, 255, 255, 0.6)", backdropFilter: "blur(10px)", border: "1px solid #fff", cursor: "pointer", transition: "0.5s",
              "&:hover": { transform: "translateY(-12px)", boxShadow: `0 40px 80px ${s.color}15`, bgcolor: "#fff" }
            }}>
            <Box sx={{ position: 'relative', mb: 4 }}>
              <Box sx={{ width: 70, height: 70, bgcolor: "#fff", borderRadius: "24px", display: "flex", justifyContent: "center", alignItems: "center", color: s.color, boxShadow: "0 10px 20px rgba(0,0,0,0.05)", border: `1px solid ${s.color}20` }}>
                {React.cloneElement(s.icon, { sx: { fontSize: 32 } })}
              </Box>
            </Box>
            <Typography variant="h5" fontWeight={900} color={primaryTeal} fontFamily={menuFont} mb={1.5}>{s.title}</Typography>
            <Box sx={{ mt: 3, p: 2, borderRadius: '24px', bgcolor: 'rgba(241, 245, 249, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography fontSize="0.7rem" color="#94A3B8" fontWeight={700} fontFamily={menuFont}>الإجمالي</Typography>
                <Typography fontWeight={900} color={primaryTeal} fontSize='1.8rem' fontFamily={menuFont}>{s.count}</Typography>
              </Box>
              <IconButton sx={{ bgcolor: "#fff", color: primaryTeal }}>
                <ArrowBackIosNew sx={{ fontSize: 16 }} />
              </IconButton>
            </Box>
          </Paper>
        ))}
      </Box>
   <Divider 
  sx={{ 
    mt: 8, 
    mb: 4, 
    // اللون الأساسي للخط أصبح أغمق وأكثر وضوحاً
    borderColor: "rgba(0, 40, 50, 0.15)", 
    borderWidth: "1px",
    position: "relative",
    // إضافة تدرج لوني خفيف ليظهر الخط بشكل أنيق
    background: "linear-gradient(to left, rgba(0, 70, 82, 0.2), rgba(0, 70, 82, 0.05))",
    "&::after": {
      content: '""',
      position: "absolute",
      right: 0,
      top: "-1.5px", // ليتوسط الخط تماماً
      width: "120px", // جعلنا الجزء الذهبي أطول قليلاً لمظهر أقوى
      height: "4px",
      bgcolor: accentGold,
      borderRadius: "10px",
      // إضافة توهج خفيف للون الذهبي ليبرز في الخلفية الداكنة
      boxShadow: `0 2px 10px ${accentGold}40`
    }
  }} 
/>
    </Box>
     <Box sx={{ direction: "rtl", width: "100%", pb: 5 }}>
      <Stack direction="row" justifyContent="space-between" mb={6}>
        <Box>
          <Typography variant="h4" fontWeight={900} color={primaryTeal} fontFamily={menuFont}>إحصائيات الخدمات</Typography>
          <Typography color="#64748B" fontFamily={menuFont}>تتبع أداء الأقسام والطلبات الجديدة</Typography>
        </Box>
      </Stack>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
        {services.map((s) => (
          <Paper key={s.id} elevation={0} 
            onClick={() => navigate(`/service-detail/${s.id}`)} 
            sx={{
              flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 32px)", lg: "1 1 calc(25% - 32px)" },
              p: 4, borderRadius: "40px", bgcolor: "rgba(255, 255, 255, 0.6)", backdropFilter: "blur(10px)", border: "1px solid #fff", cursor: "pointer", transition: "0.5s",
              "&:hover": { transform: "translateY(-12px)", boxShadow: `0 40px 80px ${s.color}15`, bgcolor: "#fff" }
            }}>
            <Box sx={{ position: 'relative', mb: 4 }}>
              <Box sx={{ width: 70, height: 70, bgcolor: "#fff", borderRadius: "24px", display: "flex", justifyContent: "center", alignItems: "center", color: s.color, boxShadow: "0 10px 20px rgba(0,0,0,0.05)", border: `1px solid ${s.color}20` }}>
                {React.cloneElement(s.icon, { sx: { fontSize: 32 } })}
              </Box>
            </Box>
            <Typography variant="h5" fontWeight={900} color={primaryTeal} fontFamily={menuFont} mb={1.5}>{s.title}</Typography>
            <Box sx={{ mt: 3, p: 2, borderRadius: '24px', bgcolor: 'rgba(241, 245, 249, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography fontSize="0.7rem" color="#94A3B8" fontWeight={700} fontFamily={menuFont}>الإجمالي</Typography>
                <Typography fontWeight={900} color={primaryTeal} fontSize='1.8rem' fontFamily={menuFont}>{s.count}</Typography>
              </Box>
              <IconButton sx={{ bgcolor: "#fff", color: primaryTeal }}>
                <ArrowBackIosNew sx={{ fontSize: 16 }} />
              </IconButton>
            </Box>
          </Paper>
        ))}
      </Box>
         <Divider 
  sx={{ 
    mt: 8, 
    mb: 4, 
    // اللون الأساسي للخط أصبح أغمق وأكثر وضوحاً
    borderColor: "rgba(0, 40, 50, 0.15)", 
    borderWidth: "1px",
    position: "relative",
    // إضافة تدرج لوني خفيف ليظهر الخط بشكل أنيق
    background: "linear-gradient(to left, rgba(0, 70, 82, 0.2), rgba(0, 70, 82, 0.05))",
    "&::after": {
      content: '""',
      position: "absolute",
      right: 0,
      top: "-1.5px", // ليتوسط الخط تماماً
      width: "120px", // جعلنا الجزء الذهبي أطول قليلاً لمظهر أقوى
      height: "4px",
      bgcolor: accentGold,
      borderRadius: "10px",
      // إضافة توهج خفيف للون الذهبي ليبرز في الخلفية الداكنة
      boxShadow: `0 2px 10px ${accentGold}40`
    }
  }} 
/>
    </Box>
     <Box sx={{ direction: "rtl", width: "100%", pb: 5 }}>
      <Stack direction="row" justifyContent="space-between" mb={6}>
        <Box>
          <Typography variant="h4" fontWeight={900} color={primaryTeal} fontFamily={menuFont}>إحصائيات الخدمات</Typography>
          <Typography color="#64748B" fontFamily={menuFont}>تتبع أداء الأقسام والطلبات الجديدة</Typography>
        </Box>
      </Stack>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
        {services.map((s) => (
          <Paper key={s.id} elevation={0} 
            onClick={() => navigate(`/service-detail/${s.id}`)} 
            sx={{
              flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 32px)", lg: "1 1 calc(25% - 32px)" },
              p: 4, borderRadius: "40px", bgcolor: "rgba(255, 255, 255, 0.6)", backdropFilter: "blur(10px)", border: "1px solid #fff", cursor: "pointer", transition: "0.5s",
              "&:hover": { transform: "translateY(-12px)", boxShadow: `0 40px 80px ${s.color}15`, bgcolor: "#fff" }
            }}>
            <Box sx={{ position: 'relative', mb: 4 }}>
              <Box sx={{ width: 70, height: 70, bgcolor: "#fff", borderRadius: "24px", display: "flex", justifyContent: "center", alignItems: "center", color: s.color, boxShadow: "0 10px 20px rgba(0,0,0,0.05)", border: `1px solid ${s.color}20` }}>
                {React.cloneElement(s.icon, { sx: { fontSize: 32 } })}
              </Box>
            </Box>
            <Typography variant="h5" fontWeight={900} color={primaryTeal} fontFamily={menuFont} mb={1.5}>{s.title}</Typography>
            <Box sx={{ mt: 3, p: 2, borderRadius: '24px', bgcolor: 'rgba(241, 245, 249, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography fontSize="0.7rem" color="#94A3B8" fontWeight={700} fontFamily={menuFont}>الإجمالي</Typography>
                <Typography fontWeight={900} color={primaryTeal} fontSize='1.8rem' fontFamily={menuFont}>{s.count}</Typography>
              </Box>
              <IconButton sx={{ bgcolor: "#fff", color: primaryTeal }}>
                <ArrowBackIosNew sx={{ fontSize: 16 }} />
              </IconButton>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  </>
  );
};

export default Overview;