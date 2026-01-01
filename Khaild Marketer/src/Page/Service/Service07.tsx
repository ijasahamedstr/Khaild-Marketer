// src/Page/Service/Service02.tsx
import React from "react";
import { Container, Typography, Box } from "@mui/material";

const TAJAWAL = "'Tajawal', sans-serif";
const BORDER_COLOR = "#E5E5E5";

const Service07: React.FC = () => {
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
            p: { xs: 5, md: 8 }, // padding داخلي
            display: "flex",
            flexDirection: "column",
            gap: 3, // فجوة بين العنوان والفقرات
            border: "1px solid #F5F5F4", background:'#F5F5F4',
            textAlign: "right",
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
          خدمات التوثيق
        </Typography>
          <Typography
            sx={{
              fontWeight: 700,
              fontFamily: TAJAWAL,
              fontSize: { xs: "1.5rem", md: "1.8rem" },
              lineHeight: 1.6,
              color: "#023B4E",
            }}
          >
            نوفر خدمات توثيق العقود والوكالات العقارية لضمان حقوق جميع الأطراف بسرعة
            وموثوقية.
          </Typography>
            <Box
              component="img"
              src="https://i.ibb.co/6JF88VfT/1.webp"
              alt="خدماتنا"
              sx={{
                width: { xs: "100%", md: "100%" }, // responsive width
                height: { xs: "100%", md: "100%" }, // responsive height
                borderRadius: 3,
                boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                objectFit: "cover", // ensures the image fills the box without distortion
              }}
            />
        </Box>   
      </Container>
      </Box>
    
  );
};

export default Service07;
