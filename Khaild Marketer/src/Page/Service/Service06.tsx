// src/Page/Service/Service02.tsx
import React from "react";
import { Container, Typography, Box } from "@mui/material";

const TAJAWAL = "'Tajawal', sans-serif";

const Service03: React.FC = () => {
      // Scroll to top on mount
  React.useEffect(() => {
    const t = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 120);
    return () => clearTimeout(t);
  }, []);
  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: { xs: 8, md: 12 }, // زيادة المسافة العلوية للصفحة بالكامل
        mb: { xs: 6, md: 12 },
        direction: "rtl",
        px: { xs: 2, md: 4 },
        fontFamily: TAJAWAL,
        height: "40vh",       
      }}
    >
      {/* Heading */}
      <Box sx={{ textAlign: "center", mb: 4, mt: 6 }}> {/* إضافة مسافة أعلى العنوان */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            fontFamily: TAJAWAL,
            color: "#023B4E",
          }}
        >
          الأنظمة واللوائح العقارية
        </Typography>
      </Box>

      {/* Paragraph */}
      <Box sx={{ textAlign: "right" }}>
        <Typography
          sx={{
            fontWeight: 700,
            fontFamily: TAJAWAL,
            fontSize: "1.8rem",
            lineHeight: 1.6,
            color: "#023B4E",
          }}
        >
          في هذا القسم، نسلّط الضوء بشكل دوري على أبرز الأنظمة واللوائح العقارية، 
          لنقدّم لمتابعينا محتوى توعوي يُثري معرفتهم ويعزز وعيهم قبل اتخاذ أي قرار.
        </Typography>
      </Box>
    </Container>
  );
};

export default Service03;
