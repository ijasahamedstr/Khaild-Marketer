import React, { useState, useEffect } from "react";
import { Box, Typography, Stack, Paper, IconButton, Divider } from "@mui/material";
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
    { id: "rental", title: "المؤجرين", count: counts.rental, icon: <VpnKeyOutlined />, color: "#3B82F6" },
    { id: "finishing", title: "المستأجرين", count: counts.finishing, icon: <FormatPaintOutlined />, color: "#8B5CF6" }
  ];

  return (
    <Box sx={{ direction: "rtl", width: "100%", pb: 8 }}>
      
      {/* 1. Main Header */}
      <Stack direction="row" justifyContent="space-between" mb={4}>
        <Box>
          <Typography variant="h4" fontWeight={900} color={primaryTeal} fontFamily={menuFont}>إحصائيات الخدمات</Typography>
        </Box>
      </Stack>

      {/* 2. Centered Section (Now at the TOP of cards) */}
      <Box sx={{ textAlign: "center", mt: 2, mb: 6 }}>        
        <Typography 
          variant="body1" 
          color="#64748B" 
          fontFamily={menuFont}
          sx={{ maxWidth: 700, mx: "auto", lineHeight: 1.8, fontSize: '1.1rem' }}
        >
         القسم الرجالي
        </Typography>

        {/* Decorative line below the description */}
        <Box sx={{ 
          width: 100, 
          height: 5, 
          bgcolor: accentGold, 
          mx: "auto", 
          mt: 3, 
          borderRadius: "10px",
          boxShadow: `0 4px 10px ${accentGold}30`
        }} />
      </Box>

      {/* 3. Stats Cards Grid */}

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {services.map((s) => (
          <Paper
            key={s.id}
            elevation={0}
            onClick={() => navigate(`/service-detail/${s.id}`)}
            sx={{
              // Adjusted flex basis for smaller footprint
              flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 16px)", lg: "1 1 calc(20% - 16px)" },
              p: 2.5, // Reduced padding from 4 to 2.5
              borderRadius: "30px", // Slightly smaller radius
              bgcolor: "rgba(255, 255, 255, 0.6)",
              backdropFilter: "blur(10px)",
              border: "1px solid #fff",
              cursor: "pointer",
              transition: "0.4s ease-in-out",
              "&:hover": { 
                transform: "translateY(-8px)", 
                boxShadow: `0 20px 40px ${s.color}15`, 
                bgcolor: "#fff" 
              }
            }}
          >
            {/* Smaller Icon Container */}
            <Box sx={{ position: 'relative', mb: 2 }}>
              <Box sx={{ 
                width: 50, height: 50, // Reduced from 70
                bgcolor: "#fff", 
                borderRadius: "18px", // Reduced from 24px
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center", 
                color: s.color, 
                boxShadow: "0 8px 16px rgba(0,0,0,0.05)", 
                border: `1px solid ${s.color}15` 
              }}>
                {React.cloneElement(s.icon, { sx: { fontSize: 24 } })} {/* Smaller Icon */}
              </Box>
            </Box>

            {/* Smaller Title */}
            <Typography 
              variant="h6" // Changed from h5
              fontWeight={900} 
              color={primaryTeal} 
              fontFamily={menuFont} 
              mb={1}
            >
              {s.title}
            </Typography>

            {/* Compact Bottom Stats Box */}
            <Box sx={{ 
              mt: 2, 
              p: 1.5, // Reduced padding
              borderRadius: '20px', 
              bgcolor: 'rgba(241, 245, 249, 0.5)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between' 
            }}>
              <Box>
                <Typography fontSize="0.65rem" color="#94A3B8" fontWeight={700} fontFamily={menuFont}>
                  الإجمالي
                </Typography>
                <Typography 
                  fontWeight={900} 
                  color={primaryTeal} 
                  fontSize='1.4rem' // Reduced from 1.8rem
                  fontFamily={menuFont}
                  sx={{ lineHeight: 1.2 }}
                >
                  {s.count}
                </Typography>
              </Box>
              
              <IconButton size="small" sx={{ bgcolor: "#fff", color: primaryTeal, width: 30, height: 30 }}>
                <ArrowBackIosNew sx={{ fontSize: 12 }} /> {/* Smaller Arrow */}
              </IconButton>
            </Box>
          </Paper>
        ))}
      </Box>
     

      {/* Final Divider for visual finish */}
      <Divider 
        sx={{ 
          mt: 4, // Adds space above
          mb: 4, 
          borderColor: "rgba(0, 40, 50, 0.1)", 
          "&::before, &::after": { borderColor: "rgba(0, 40, 50, 0.1)" } 
        }}
      >
        <Box sx={{ 
          width: 14, height: 14, borderRadius: "50%", bgcolor: accentGold, 
          boxShadow: `0 0 15px ${accentGold}80` 
        }} />
      </Divider>

       <Box sx={{ textAlign: "center", mt: 2, mb: 6 }}>        
        <Typography 
          variant="body1" 
          color="#64748B" 
          fontFamily={menuFont}
          sx={{ maxWidth: 700, mx: "auto", lineHeight: 1.8, fontSize: '1.1rem' }}
        >
          القسم النسائي
        </Typography>

        {/* Decorative line below the description */}
        <Box sx={{ 
          width: 100, 
          height: 5, 
          bgcolor: accentGold, 
          mx: "auto", 
          mt: 3, 
          borderRadius: "10px",
          boxShadow: `0 4px 10px ${accentGold}30`
        }} />
      </Box>

       <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {services.map((s) => (
          <Paper
            key={s.id}
            elevation={0}
            onClick={() => navigate(`/service-detail/${s.id}`)}
            sx={{
              // Adjusted flex basis for smaller footprint
              flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 16px)", lg: "1 1 calc(20% - 16px)" },
              p: 2.5, // Reduced padding from 4 to 2.5
              borderRadius: "30px", // Slightly smaller radius
              bgcolor: "rgba(255, 255, 255, 0.6)",
              backdropFilter: "blur(10px)",
              border: "1px solid #fff",
              cursor: "pointer",
              transition: "0.4s ease-in-out",
              "&:hover": { 
                transform: "translateY(-8px)", 
                boxShadow: `0 20px 40px ${s.color}15`, 
                bgcolor: "#fff" 
              }
            }}
          >
            {/* Smaller Icon Container */}
            <Box sx={{ position: 'relative', mb: 2 }}>
              <Box sx={{ 
                width: 50, height: 50, // Reduced from 70
                bgcolor: "#fff", 
                borderRadius: "18px", // Reduced from 24px
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center", 
                color: s.color, 
                boxShadow: "0 8px 16px rgba(0,0,0,0.05)", 
                border: `1px solid ${s.color}15` 
              }}>
                {React.cloneElement(s.icon, { sx: { fontSize: 24 } })} {/* Smaller Icon */}
              </Box>
            </Box>

            {/* Smaller Title */}
            <Typography 
              variant="h6" // Changed from h5
              fontWeight={900} 
              color={primaryTeal} 
              fontFamily={menuFont} 
              mb={1}
            >
              {s.title}
            </Typography>

            {/* Compact Bottom Stats Box */}
            <Box sx={{ 
              mt: 2, 
              p: 1.5, // Reduced padding
              borderRadius: '20px', 
              bgcolor: 'rgba(241, 245, 249, 0.5)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between' 
            }}>
              <Box>
                <Typography fontSize="0.65rem" color="#94A3B8" fontWeight={700} fontFamily={menuFont}>
                  الإجمالي
                </Typography>
                <Typography 
                  fontWeight={900} 
                  color={primaryTeal} 
                  fontSize='1.4rem' // Reduced from 1.8rem
                  fontFamily={menuFont}
                  sx={{ lineHeight: 1.2 }}
                >
                  {s.count}
                </Typography>
              </Box>
              
              <IconButton size="small" sx={{ bgcolor: "#fff", color: primaryTeal, width: 30, height: 30 }}>
                <ArrowBackIosNew sx={{ fontSize: 12 }} /> {/* Smaller Arrow */}
              </IconButton>
            </Box>
          </Paper>
        ))}
      </Box>

          <Divider 
        sx={{ 
          mt: 4, // Adds space above
          mb: 4, 
          borderColor: "rgba(0, 40, 50, 0.1)", 
          "&::before, &::after": { borderColor: "rgba(0, 40, 50, 0.1)" } 
        }}
      >
        <Box sx={{ 
          width: 14, height: 14, borderRadius: "50%", bgcolor: accentGold, 
          boxShadow: `0 0 15px ${accentGold}80` 
        }} />
      </Divider>

       <Box sx={{ textAlign: "center", mt: 2, mb: 6 }}>        
        <Typography 
          variant="body1" 
          color="#64748B" 
          fontFamily={menuFont}
          sx={{ maxWidth: 700, mx: "auto", lineHeight: 1.8, fontSize: '1.1rem' }}
        >
          قسم المستثمرين الأجانب  
        </Typography>

        {/* Decorative line below the description */}
        <Box sx={{ 
          width: 100, 
          height: 5, 
          bgcolor: accentGold, 
          mx: "auto", 
          mt: 3, 
          borderRadius: "10px",
          boxShadow: `0 4px 10px ${accentGold}30`
        }} />
      </Box>

       <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {services.map((s) => (
          <Paper
            key={s.id}
            elevation={0}
            onClick={() => navigate(`/service-detail/${s.id}`)}
            sx={{
              // Adjusted flex basis for smaller footprint
              flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 16px)", lg: "1 1 calc(20% - 16px)" },
              p: 2.5, // Reduced padding from 4 to 2.5
              borderRadius: "30px", // Slightly smaller radius
              bgcolor: "rgba(255, 255, 255, 0.6)",
              backdropFilter: "blur(10px)",
              border: "1px solid #fff",
              cursor: "pointer",
              transition: "0.4s ease-in-out",
              "&:hover": { 
                transform: "translateY(-8px)", 
                boxShadow: `0 20px 40px ${s.color}15`, 
                bgcolor: "#fff" 
              }
            }}
          >
            {/* Smaller Icon Container */}
            <Box sx={{ position: 'relative', mb: 2 }}>
              <Box sx={{ 
                width: 50, height: 50, // Reduced from 70
                bgcolor: "#fff", 
                borderRadius: "18px", // Reduced from 24px
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center", 
                color: s.color, 
                boxShadow: "0 8px 16px rgba(0,0,0,0.05)", 
                border: `1px solid ${s.color}15` 
              }}>
                {React.cloneElement(s.icon, { sx: { fontSize: 24 } })} {/* Smaller Icon */}
              </Box>
            </Box>

            {/* Smaller Title */}
            <Typography 
              variant="h6" // Changed from h5
              fontWeight={900} 
              color={primaryTeal} 
              fontFamily={menuFont} 
              mb={1}
            >
              {s.title}
            </Typography>

            {/* Compact Bottom Stats Box */}
            <Box sx={{ 
              mt: 2, 
              p: 1.5, // Reduced padding
              borderRadius: '20px', 
              bgcolor: 'rgba(241, 245, 249, 0.5)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between' 
            }}>
              <Box>
                <Typography fontSize="0.65rem" color="#94A3B8" fontWeight={700} fontFamily={menuFont}>
                  الإجمالي
                </Typography>
                <Typography 
                  fontWeight={900} 
                  color={primaryTeal} 
                  fontSize='1.4rem' // Reduced from 1.8rem
                  fontFamily={menuFont}
                  sx={{ lineHeight: 1.2 }}
                >
                  {s.count}
                </Typography>
              </Box>
              
              <IconButton size="small" sx={{ bgcolor: "#fff", color: primaryTeal, width: 30, height: 30 }}>
                <ArrowBackIosNew sx={{ fontSize: 12 }} /> {/* Smaller Arrow */}
              </IconButton>
            </Box>
          </Paper>
        ))}
      </Box>


    </Box>
  );
};

export default Overview;