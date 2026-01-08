// src/Page/Service/Service02.tsx
import React from "react";
import { Container, Typography, Box } from "@mui/material";

const TAJAWAL = "'Tajawal', sans-serif";

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
               backgroundImage: "url('https://i.ibb.co/F4rBMk3h/55-2-1.webp')",
               backgroundSize: "cover",
               backgroundPosition: "center",
               backgroundRepeat: "no-repeat",
               position: "relative",
       
               // 🔥 زيادة المسافة أعلى وأسفل
               py: { xs: 8, sm: 12, md: 3 }, // padding top & bottom
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
    
      <Box sx={{ position: "relative" }}>
        
        {/* --- GLOW EFFECT --- */}
        <Box
          sx={{
            position: "absolute",
            inset: "-2px",
            borderRadius: "16px", // Matches the card radius
            background: "linear-gradient(135deg,#06f9f3,#00b3ff,#06f9f3)",
            filter: "blur(4px)",
            zIndex: 0,
          }}
        />

        {/* --- CONTENT CARD --- */}
        <Box
          sx={{
            position: "relative",
            zIndex: 10,
            borderRadius: 3,
            p: { xs: 5, md: 8 }, // padding داخلي
            display: "flex",
            flexDirection: "column",
            gap: 3, // فجوة بين الفقرات
            border: "1px solid #F5F5F4",
            background: "#F5F5F4",
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
            '٢.  رأي قانوني من محامين ذوي الخبرة',
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
      </Box>

    </Container>
        </Box>
    
  );
};

export default Service11;
