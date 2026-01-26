import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, IconButton, Divider, Button } from "@mui/material";
import { 
  ArrowBackIosNew, HomeWorkOutlined, ShoppingBagOutlined, 
  VpnKeyOutlined, FormatPaintOutlined, ArrowForward 
} from "@mui/icons-material";

// استيراد صفحة الممتلكات (تأكد من وجودها بنفس المجلد)
import Properties from "./Property for sale/Properties";

const primaryTeal = "#004652", accentGold = "#CC9D2F", menuFont = "Tajawal, sans-serif";

const Overview = () => {
  const [counts, setCounts] = useState({ finishing: 0, sale: 0, buying: 0, rental: 0 });
  const [selectedService, setSelectedService] = useState<string | null>(null);

  useEffect(() => {
    const apiHost = import.meta.env.VITE_API_URL || "http://localhost:5000";
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

  // دالة لاختيار الصفحة المراد عرضها بناءً على الكارد
  const renderDetailView = () => {
    switch(selectedService) {
      case "sale":
        return <Properties />; // تعرض الجدول الذي برمجناه سابقاً
      case "buying":
        return <Box sx={{p:4, textAlign:'center'}}><Typography variant="h5" fontFamily={menuFont}>قريباً: تفاصيل شراء العقار</Typography></Box>;
      default:
        return <Box sx={{p:4, textAlign:'center'}}><Typography variant="h5" fontFamily={menuFont}>قريباً: تفاصيل {selectedService}</Typography></Box>;
    }
  };

  // إذا كان هناك قسم مختار، اعرض زر العودة والمحتوى التفصيلي
  if (selectedService) {
    return (
      <Box sx={{ direction: "rtl", width: "100%" }}>
        <Button 
          onClick={() => setSelectedService(null)}
          startIcon={<ArrowForward sx={{ ml: 1 }} />}
          sx={{ mb: 3, fontFamily: menuFont, color: primaryTeal, fontWeight: 800 }}
        >
          العودة للإحصائيات
        </Button>
        <Divider sx={{ mb: 4 }} />
        {renderDetailView()}
      </Box>
    );
  }

  // العرض الافتراضي (شبكة الإحصائيات)
  const renderStatsSection = (sectionTitle: string) => (
    <>
      <Box sx={{ textAlign: "center", mt: 2, mb: 6 }}>        
        <Typography variant="h3" color={primaryTeal} fontFamily={menuFont} sx={{ maxWidth: 700, mx: "auto", fontSize: '3rem', fontWeight: 'bold' }}>
          {sectionTitle}
        </Typography>
        <Box sx={{ width: 100, height: 5, bgcolor: accentGold, mx: "auto", mt: 3, borderRadius: "10px", boxShadow: `0 4px 10px ${accentGold}30` }} />
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {services.map((s) => (
          <Paper
            key={s.id}
            elevation={0}
            onClick={() => setSelectedService(s.id)} // التغيير هنا: بدلاً من navigate
            sx={{
              flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 16px)", lg: "1 1 calc(20% - 16px)" },
              p: 2.5,
              borderRadius: "30px",
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
            <Box sx={{ position: 'relative', mb: 2 }}>
              <Box sx={{ width: 50, height: 50, bgcolor: "#fff", borderRadius: "18px", display: "flex", justifyContent: "center", alignItems: "center", color: s.color, boxShadow: "0 8px 16px rgba(0,0,0,0.05)", border: `1px solid ${s.color}15` }}>
                {React.cloneElement(s.icon, { sx: { fontSize: 24 } })}
              </Box>
            </Box>

            <Typography variant="h6" fontWeight={900} color={primaryTeal} fontFamily={menuFont} mb={1}>
              {s.title}
            </Typography>

            <Box sx={{ mt: 2, p: 1.5, borderRadius: '20px', bgcolor: 'rgba(241, 245, 249, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography fontSize="0.65rem" color="#94A3B8" fontWeight={700} fontFamily={menuFont}>الإجمالي</Typography>
                <Typography fontWeight={900} color={primaryTeal} fontSize='1.4rem' fontFamily={menuFont} sx={{ lineHeight: 1.2 }}>
                  {s.count}
                </Typography>
              </Box>
              <IconButton size="small" sx={{ bgcolor: "#fff", color: primaryTeal, width: 30, height: 30 }}>
                <ArrowBackIosNew sx={{ fontSize: 12 }} />
              </IconButton>
            </Box>
          </Paper>
        ))}
      </Box>
    </>
  );

  return (
    <Box sx={{ direction: "rtl", width: "100%", pb: 8 }}>
      <Typography variant="h4" fontWeight={900} color={primaryTeal} fontFamily={menuFont} mb={4}>إحصائيات الخدمات</Typography>
      
      {renderStatsSection("القسم الرجالي")}
      
      <Divider sx={{ mt: 6, mb: 6, borderColor: "rgba(0, 40, 50, 0.1)" }}>
        <Box sx={{ width: 14, height: 14, borderRadius: "50%", bgcolor: accentGold }} />
      </Divider>

      {renderStatsSection("القسم النسائي")}

      <Divider sx={{ mt: 6, mb: 6, borderColor: "rgba(0, 40, 50, 0.1)" }}>
        <Box sx={{ width: 14, height: 14, borderRadius: "50%", bgcolor: accentGold }} />
      </Divider>

      {renderStatsSection("قسم المستثمرين الأجان")}
    </Box>
  );
};

export default Overview;