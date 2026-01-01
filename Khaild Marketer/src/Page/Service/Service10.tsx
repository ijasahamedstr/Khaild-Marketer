// src/Page/Service/Service02.tsx
import React from "react";
import { Container, Typography, Box } from "@mui/material";

const TAJAWAL = "'Tajawal', sans-serif";

const Service10: React.FC = () => {
  // Scroll to top on mount
  React.useEffect(() => {
    const t = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 120);
    return () => clearTimeout(t);
  }, []);

  return (
        <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          backgroundColor: "#D1D5DC", // ← change color here
          py: { xs: 2, md: 4 },
        }}
        >
          <Container
      maxWidth="lg"
      sx={{
        mt: { xs: 8, md: 12 },
        mb: { xs: 6, md: 12 },
        direction: "rtl",
        px: { xs: 2, md: 4 },
        fontFamily: TAJAWAL,
      }}
    >
      {/* Heading */}


      {/* Box يحتوي الفقرة */}
      <Box
        sx={{
          
          borderRadius: 3,
          p: { xs: 5, md: 8 },
          display: "flex",
          flexDirection: "column",
          gap: 3,
          border: "1px solid #F5F5F4", background:'#F5F5F4',
          textAlign: "center",
        }}
      >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 800,
          fontFamily: TAJAWAL,
          color: "#023B4E",
          textAlign: "center",
          mb: { xs: 6, md: 8 },
        }}
      >
        قسم التمويل العقاري
      </Typography>
        <Typography
          sx={{
            fontWeight: 700,
            fontFamily: TAJAWAL,
            fontSize: { xs: "1.5rem", md: "1.8rem" },
            lineHeight: 1.6,
            color: "#023B4E",
            textAlign: "right", // محتوى الفقرة إلى اليمين
          }}
        >
          نُقدم استشارات مهنية لتوجيه عملائنا نحو خيارات التمويل العقاري الأنسب،
          من خلال ربطهم مع الجهات التمويلية المعتمدة ومساعدتهم في اتخاذ قرارات
          مبنية على احتياجاتهم وقدراتهم، بكل شفافية ومصداقية.
        </Typography>
      </Box>
    </Container>
  </Box>
    
  );
};

export default Service10;
