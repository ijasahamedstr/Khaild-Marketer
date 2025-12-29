import React from "react";
import { Box, Typography, Container } from "@mui/material";

const BannerCard: React.FC = () => {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: "#E2E8F0",
        py: { xs: 6, md: 8 },
        direction: "rtl",
        fontFamily: "Tajawal, sans-serif",
      }}
    >
      <Container maxWidth="xl">
        {/* ===== صورة رئيسية Responsive في الأعلى ===== */}
            <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mb: 4,
                }}
              >
                <Box
                  component="img"
                  src="https://i.ibb.co/Zp0m4B0L/w-2.webp" // ضع رابط الصورة هنا
                  alt="خدماتنا"
                  sx={{
                    width: { xs: "100%", md: 700 },
                    height: { xs: "auto", md: 700 },
                    // objectFit: "cover",
                    borderRadius: 3,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                  }}
                />
              </Box>

        {/* المحتوى الرئيسي */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "flex-start",
            gap: { xs: 3, md: 6 },
            textAlign: "right",
          }}
        >
          {/* العنوان – 20% */}
          <Typography
            variant="h3"
            sx={{
              flexBasis: { md: "20%" },
              fontWeight: 700,
              color: "#004652",
              lineHeight: 1.2,
              fontFamily: "Tajawal, sans-serif",
            }}
          >
            من نحن
          </Typography>

          {/* الوصف – 80% */}
          <Typography
            sx={{
              flexBasis: { md: "80%" },
              fontSize: { xs: "1.1rem", md: "1.8rem" },
              lineHeight: 1.9,
              color: "#004652",
              textAlign: { xs: "center", md: "right" },
              fontFamily: "Tajawal, sans-serif", // مركز على الموبايل، يمين على الديسكتوب
            }}
          >
            نحن متخصصون في تسويق منتجات المطورين العقاريين بمدينة الرياض، نُبرز
            الفرص ونقرّب المشاريع من العملاء، بأسلوب احترافي يعكس جودة المنتج
            ويعزّز من حضوره في السوق العقاري.
          </Typography>
        </Box>

        {/* الخط السفلي */}
        <Box
          sx={{
            borderBottom: "2px solid #0c6b71",
            mt: { xs: 4, md: 6 },
          }}
        />
      </Container>
    </Box>
  );
};

export default BannerCard;
