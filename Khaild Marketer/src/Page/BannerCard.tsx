import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";

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
            justifyContent: "space-between",
            gap: { xs: 3, md: 6 },
            textAlign: "right",
            fontFamily: "Tajawal, sans-serif",
          }}
        >

          {/* العنوان */}
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: "#004652",
              minWidth: { md: "260px" },
              lineHeight: 1.2,
              fontFamily: "Tajawal, sans-serif",
            }}
          >
            من نحن
          </Typography>

          {/* النص – تم تكبير الخط هنا */}
          <Typography
            sx={{
              flexGrow: 1,
              maxWidth: "700px",
              fontSize: { xs: "1.1rem", md: "1.25rem" }, // الحجم الجديد
              lineHeight: 1.9,
              color: "#004652",
              fontFamily: "Tajawal, sans-serif",
            }}
          >
            نحن متخصصون في تسويق منتجات المطورين العقاريين بمدينة الرياض، نُبرز
            الفرص ونقرّب المشاريع من العملاء، بأسلوب احترافي يعكس جودة المنتج
            ويعزّز من حضوره في السوق العقاري.
          </Typography>

          {/* الزر */}
          <Button
            variant="contained"
            sx={{
              background: "linear-gradient(135deg, #023B4E 0%, #06f9f3 100%)",
              borderRadius: "999px",
              px: 4,
              py: 1.5,
              fontSize: "0.9rem",
              fontWeight: 600,
              color: "#fff",
              boxShadow: "none",
              whiteSpace: "nowrap",
              transition: "0.3s",
              fontFamily: "Tajawal, sans-serif",
              "&:hover": {
                background: "linear-gradient(135deg, #023B4E 0%, #06f9f3 100%)",
                boxShadow: "none",
              },
            }}
          >
            اقرأ المزيد
          </Button>
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
