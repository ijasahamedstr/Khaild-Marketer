import React from "react";
import { Box, Typography, Container } from "@mui/material";

const BannerCard: React.FC = () => {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: "#f7f7f7",
        py: { xs: 6, md: 8 },
        direction: "rtl",
        fontFamily: "Tajawal, sans-serif",
      }}
    >
      <Container maxWidth="xl">
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
          {/* العنوان – 30% */}
          <Typography
            variant="h3"
            sx={{
              flexBasis: { md: "30%" },
              fontWeight: 700,
              color: "#004652",
              lineHeight: 1.2,
              fontFamily: "Tajawal, sans-serif",
            }}
          >
            من نحن
          </Typography>

          {/* الوصف – 70% */}
          <Typography
            sx={{
              flexBasis: { md: "70%" },
              fontSize: { xs: "1.1rem", md: "1.8rem" },
              lineHeight: 1.9,
              color: "#004652",
              fontFamily: "Tajawal, sans-serif",
              textAlign:'center'
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
