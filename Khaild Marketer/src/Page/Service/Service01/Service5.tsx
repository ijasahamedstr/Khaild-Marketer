import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  styled,
} from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { keyframes } from "@mui/system";

/* ---------------- TYPES ---------------- */
type Props = {
  onSubmit?: (selectedItems: { whatsapp?: string }) => void;
};


const BORDER_THICKNESS = 18;

/* ---------------- CONSTANTS ---------------- */
const TAJAWAL = "'Tajawal', sans-serif";
const COLOR_PRIMARY_CYAN = "#06f9f3";
const COLOR_DEEP_BLUE = "#023B4E";
const FIXED_WHATSAPP = "+966 00 000 0000";

/* ---------------- ANIMATIONS ---------------- */
const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

/* ---------------- STYLED COMPONENTS ---------------- */
const GlassCard = styled(Box)(() => ({
  position: "relative",
  background: "rgba(255, 255, 255, 0.85)",
  backdropFilter: "blur(12px)",
  borderRadius: "30px",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
  overflow: "hidden",
  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  padding: "48px 32px",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "24px",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 30px 60px -12px rgba(0, 0, 0, 0.2)",
    borderColor: COLOR_PRIMARY_CYAN,
  },
}));

const ShimmerButton = styled(Button)({
  background: `linear-gradient(45deg, ${COLOR_DEEP_BLUE} 30%, #086d8d 90%)`,
  color: "white",
  padding: "12px 48px",
  borderRadius: "50px",
  fontSize: "1.2rem",
  fontWeight: 800,
  fontFamily: TAJAWAL,
  textTransform: "none",
  transition: "all 0.3s ease",
  position: "relative",
  overflow: "hidden",
  marginTop: "16px",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: `0 10px 25px rgba(6, 249, 243, 0.4)`,
  },
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
    animation: `${shimmer} 3s infinite`,
  },
});

/* ---------------- COMPONENT ---------------- */
const Service5: React.FC<Props> = ({ onSubmit }) => {
  const handleSubmit = () => {
    if (onSubmit) onSubmit({ whatsapp: FIXED_WHATSAPP });
  };

  // Auto-scroll to top on mount
  React.useEffect(() => {
    const t = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <Box
      sx={{ 
      minHeight: "100vh", 
      background: `linear-gradient(rgba(233, 43, 139, 0.45), rgba(233, 43, 139, 0.45)), url('https://i.ibb.co/hxkmfnF6/4.webp')`,
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      py: 8,
      direction: "rtl"
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
                            src="https://i.ibb.co/rRRWPYj8/FINAL-9-jpg.webp\"
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


      <Container maxWidth="md" sx={{ direction: "rtl" }}>
        {/* Glow Container */}
        <Box sx={{ position: "relative" }}>
          {/* Animated Glow Backdrop */}
          <Box
            sx={{
              position: "absolute",
              inset: "-4px",
              borderRadius: "34px",
              background: `linear-gradient(135deg, ${COLOR_PRIMARY_CYAN}, ${COLOR_DEEP_BLUE}, ${COLOR_PRIMARY_CYAN})`,
              filter: "blur(12px)",
              opacity: 0.4,
              zIndex: 0,
            }}
          />

          <GlassCard>
            {/* Heading with Float Animation */}
            <Box
              sx={{
                animation: `${float} 5s ease-in-out infinite`,
                mb: 2,
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 900,
                  fontFamily: TAJAWAL,
                  color: COLOR_DEEP_BLUE,
                  fontSize: { xs: "2rem", md: "2.8rem" },
                }}
              >
                تسليم واستلام العقار
              </Typography>
            </Box>

            <Typography
              sx={{
                fontWeight: 600,
                fontFamily: TAJAWAL,
                fontSize: { xs: "1.2rem", md: "1.5rem" },
                color: "rgba(2, 59, 78, 0.8)",
                lineHeight: 1.6,
                maxWidth: "600px",
              }}
            >
              للتواصل مع قسم التسليم والاستلام برجاء الاتصال على هذا الرقم عبر
              الواتساب
            </Typography>

            {/* WhatsApp Display Box */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 3,
                px: 4,
                py: 2,
                border: "2px dashed rgba(37, 211, 102, 0.3)",
                borderRadius: "20px",
                backgroundColor: "rgba(37, 211, 102, 0.08)",
                transition: "0.3s",
                "&:hover": {
                  backgroundColor: "rgba(37, 211, 102, 0.12)",
                  transform: "scale(1.02)",
                },
              }}
            >
              <IconButton
                sx={{
                  bgcolor: "#25D366",
                  color: "white",
                  "&:hover": { bgcolor: "#128C7E" },
                  boxShadow: "0 4px 14px rgba(37, 211, 102, 0.4)",
                }}
              >
                <WhatsAppIcon sx={{ fontSize: 32 }} />
              </IconButton>

              <Typography
                sx={{
                  fontFamily: TAJAWAL,
                  fontSize: { xs: "1.8rem", md: "2.4rem" },
                  fontWeight: 800,
                  color: COLOR_DEEP_BLUE,
                  letterSpacing: "1px",
                }}
                dir="ltr"
              >
                {FIXED_WHATSAPP}
              </Typography>
            </Box>

            <ShimmerButton onClick={handleSubmit}>إرسال الطلب</ShimmerButton>
          </GlassCard>
        </Box>
      </Container>
    </Box>
  );
};

export default Service5;