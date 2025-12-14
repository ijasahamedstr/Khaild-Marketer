import React from "react";
import { Box, Typography, Container } from "@mui/material";

const BannerCard: React.FC = () => {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: "#f7f7f7",
        py: { xs: 6, md: 8 },
        // Direction is 'rtl' (Right-to-Left)
        direction: "rtl",
        fontFamily: "Tajawal, sans-serif",
      }}
    >
      <Container maxWidth="xl">
        {/* المحتوى الرئيسي (Main Content) */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            // Align items to the right side in RTL
            alignItems: "flex-start",
            gap: { xs: 3, md: 6 },
            textAlign: "right",
          }}
        >
          {/* الوصف – 80% (Description - Placed First for RTL Flow) */}
      
          {/* العنوان – 20% (Heading - Placed Second for RTL Flow) */}
          <Typography
            variant="h3"
            sx={{
              // Set Heading to 20% on medium screens and up
              flexBasis: { md: "20%" },
              fontWeight: 700,
              color: "#004652",
              lineHeight: 1.2,
              fontFamily: "Tajawal, sans-serif",
            }}
          >
            من نحن
          </Typography>

          <Typography
            sx={{
              // Set Description to 80% on medium screens and up
              flexBasis: { md: "80%" },
              fontSize: { xs: "1.1rem", md: "1.8rem" },
              lineHeight: 1.9,
              color: "#004652",
              fontFamily: "Tajawal, sans-serif",
              // Kept original center alignment for description
              textAlign: 'center'
            }}
          >
            نحن متخصصون في تسويق منتجات المطورين العقاريين بمدينة الرياض، نُبرز
            الفرص ونقرّب المشاريع من العملاء، بأسلوب احترافي يعكس جودة المنتج
            ويعزّز من حضوره في السوق العقاري.
          </Typography>
        </Box>

        {/* الخط السفلي (Bottom Line) */}
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