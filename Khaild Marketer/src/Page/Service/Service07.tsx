// src/Page/Service/Service02.tsx
import React from "react";
import { Container, Typography, Box } from "@mui/material";

const TAJAWAL = "'Tajawal', sans-serif";

const Service07: React.FC = () => {
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
      <Box sx={{ textAlign: "center", mb: 4, mt: 6 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            fontFamily: TAJAWAL,
            color: "#023B4E",
          }}
        >
          خدمات التوثيق
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
          نوفر خدمات توثيق العقود والوكالات العقارية لضمان حقوق جميع الأطراف بسرعة
          وموثوقية.
        </Typography>
      </Box>
    </Container>
  );
};

export default Service07;
