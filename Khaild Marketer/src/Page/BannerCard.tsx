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
        {/* ===== صورة رئيسية ===== */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 5,
          }}
        >
          <Box
            component="img"
            src="https://i.ibb.co/Zp0m4B0L/w-2.webp"
            alt="خدماتنا"
            sx={{
              width: { xs: "95%", md: "80%" },
              borderRadius: 3,
              boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
              objectFit: "cover",
            }}
          />
        </Box>

        {/* ===== المحتوى النصي ===== */}
        <Box
          sx={{
            maxWidth: "1100px",
            mx: "auto",
            textAlign: { xs: "center", md: "right" },
          }}
        >
          {/* العنوان */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            color: "#004652",
            mb: 2,
            fontFamily: "Tajawal, sans-serif",
            mr: { xs: 0, md: "-170px" }, // Desktop only
          }}
        >
          من نحن
        </Typography>

          {/* الوصف أسفل العنوان */}
          <Typography
            sx={{
              fontSize: { xs: "1.1rem", md: "1.6rem" },
              lineHeight: 1.9,
              color: "#004652",
              fontFamily: "Tajawal, sans-serif",
            }}
          >
            نحن متخصصون في تسويق منتجات المطورين العقاريين بمدينة الرياض، نُبرز
            الفرص ونقرّب المشاريع من العملاء، بأسلوب احترافي يعكس جودة المنتج
            ويعزّز من حضوره في السوق العقاري.
          </Typography>
        </Box>

        {/* ===== خط سفلي ===== */}
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
