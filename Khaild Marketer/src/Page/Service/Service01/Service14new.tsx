// src/Page/Service/Service02.tsx
import React from "react";
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

  const BORDER_THICKNESS = 18;


const TAJAWAL = "'Tajawal', sans-serif";

const Service14new: React.FC = () => {
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
            backgroundImage: "url('https://i.ibb.co/cq3Fj2K/000.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            position: "relative",
    
            // 🔥 زيادة المسافة أعلى وأسفل
            py: { xs: 8, sm: 12, md: 3 }, // padding top & bottom
          }}
        >
          <Container maxWidth="xl">
                                                                                                                        <Box sx={{ width: "100%", position: "relative", py: "60px", overflow: "visible" }}>
                                                                                                                          {/* ---------------------------- */}
                                                                                                                
                                                                                                                          {/* Perspective Container */}
                                                                                                                          <Box sx={{ perspective: "2000px", display: "flex", justifyContent: "center" }}>
                                                                                                                            <Box
                                                                                                                              sx={{
                                                                                                                                position: "relative",
                                                                                                                                width: "100%",
                                                                                                                                transformStyle: "preserve-3d",
                                                                                                                              }}
                                                                                                                            >
                                                                                                                              {/* 1. TOP IMAGE LAYER */}
                                                                                                                              <Box
                                                                                                                                component="img"
                                                                                                                                src="https://i.ibb.co/Y7twRGkm/copy-1.jpg"
                                                                                                                                alt="Website Showcase"
                                                                                                                                sx={{
                                                                                                                                  width: "100%",
                                                                                                                                  height: "auto",
                                                                                                                                  borderRadius: "20px",
                                                                                                                                  display: "block",
                                                                                                                                  position: "relative",
                                                                                                                                  zIndex: 10,
                                                                                                                                  boxShadow: "20px 30px 50px rgba(0,0,0,0.5)",
                                                                                                                                }}
                                                                                                                              />
                                                                                                                
                                                                                                                              {/* 2. NEON GLOW EDGE */}
                                                                                                                              <Box
                                                                                                                                sx={{
                                                                                                                                  position: "absolute",
                                                                                                                                  inset: "-4px",
                                                                                                                                  borderRadius: "24px",
                                                                                                                                  background: "linear-gradient(135deg, #06f9f3, #00b3ff)",
                                                                                                                                  filter: "blur(12px)",
                                                                                                                                  transform: `translateZ(-${BORDER_THICKNESS}px)`,
                                                                                                                                  zIndex: 5,
                                                                                                                                }}
                                                                                                                              />
                                                                                                                
                                                                                                                              {/* 3. SOLID REAR PLATE */}
                                                                                                                              <Box
                                                                                                                                sx={{
                                                                                                                                  position: "absolute",
                                                                                                                                  inset: "0px",
                                                                                                                                  borderRadius: "20px",
                                                                                                                                  background: "#021212",
                                                                                                                                  transform: `translateZ(-${BORDER_THICKNESS * 2}px)`,
                                                                                                                                  zIndex: 4,
                                                                                                                                }}
                                                                                                                              />
                                                                                                                
                                                                                                                              {/* 4. AMBIENT FLOOR SHADOW */}
                                                                                                                              <Box
                                                                                                                                sx={{
                                                                                                                                  position: "absolute",
                                                                                                                                  inset: "-20px",
                                                                                                                                  background: "rgba(0,0,0,0.8)",
                                                                                                                                  filter: "blur(40px)",
                                                                                                                                  transform: `translateZ(-${BORDER_THICKNESS * 4}px)`,
                                                                                                                                  zIndex: 1,
                                                                                                                                }}
                                                                                                                              />
                                                                                                                            </Box>
                                                                                                                          </Box>
                                                                                                                        </Box>
                                                                                                                      </Container>

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
            p: { xs: 5, md: 8 },
            display: "flex",
            flexDirection: "column",
            gap: 3,
            border: "1px solid #F5F5F4",
            background: "#F5F5F4",
            textAlign: "center",
          }}
        >
          {/* Heading */}
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
            الوقف العقاري
          </Typography>

          {/* Paragraph */}
          <Typography
            sx={{
              fontWeight: 700,
              fontFamily: TAJAWAL,
              fontSize: { xs: "1.5rem", md: "1.8rem" },
              lineHeight: 1.6,
              color: "#023B4E",
              textAlign: "right",
            }}
          >
            منصة تجمع بين الخبرة العقارية والمعرفة الشرعية في مجال الوقف العقاري.
          </Typography>

          <List
            sx={{
              direction: "rtl",
              textAlign: "right",
              mt: 2,
              fontFamily: TAJAWAL,
            }}
          >
            {[
              "نخدم المجتمع عبر تسهيل تداول عقارات الوقف وفق الأنظمة المعتمدة.",
              "استفساراتك حول عقارات الوقف تجد إجابتها من أهل الخبرة.",
              "عقارات الوقف... بين أيدٍ خبيرة، تُعرض وتُدار بثقة وشفافية.",
            ].map((text, index) => (
              <ListItem
                key={index}
                sx={{
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  px: 0,
                }}
              >
                {/* Bullet */}
                <Box
                  sx={{
                    minWidth: 24,
                    textAlign: "center",
                    color: "#023B4E",
                    fontSize: "1.3rem",
                    ml: 1.5,
                  }}
                >
                  •
                </Box>

                {/* Text */}
                <ListItemText
                  primary={text}
                  sx={{
                    textAlign: "right",
                    margin: 0,
                  }}
                  primaryTypographyProps={{
                    fontFamily: TAJAWAL,
                    fontSize: "1.2rem",
                    fontWeight: 600,
                    lineHeight: 1.8,
                    color: "#023B4E",
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>

      </Container>
    </Box>
  );
};

export default Service14new;
