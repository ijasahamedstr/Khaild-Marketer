// src/Page/Service/Service02.tsx
import React from "react";
import { Container, Typography, Box } from "@mui/material";

const TAJAWAL = "'Tajawal', sans-serif";
const BORDER_COLOR = "#E5E5E5";

const Service11: React.FC = () => {
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
    

      {/* Box يحتوي الفقرات */}
      <Box
        sx={{
          border: `2px solid ${BORDER_COLOR}`, // حدود الصندوق
          borderRadius: 3,
          p: { xs: 5, md: 8 }, // padding داخلي
          display: "flex",
          flexDirection: "column",
          gap: 3, // فجوة بين الفقرات
          backgroundColor: "#fff",
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
        محكّم معتمد
      </Typography>
        {/* Paragraphs / Points */}
        {[
          '١. نوفّر خدمة "محكّم معتمد" لحل النزاعات العقارية باحترافية وحيادية.',
          '٢.  رأي قانوني من محامين ذوي الخبرة',
          '٣. عند الخلاف… لا تحتار، معنا محكّم معتمد يفصل بوضوح وعدالة.',
          '٤. نخدم عملائنا بخبرة تحكيم تجاري في القضايا العقارية',
        ].map((text, index) => (
          <Typography
            key={index}
            sx={{
              fontWeight: 700,
              fontFamily: TAJAWAL,
              fontSize: { xs: "1.5rem", md: "1.8rem" },
              lineHeight: 1.8,
              color: "#023B4E",
              textAlign: "right",
            }}
          >
            {text}
          </Typography>
        ))}

                    <Box
                      component="img"
                      src="https://i.ibb.co/dJGXTPDR/2.jpg"
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

export default Service11;
