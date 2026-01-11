// src/Page/Service/Service05.tsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { keyframes } from "@mui/system";

type Props = {
  onSubmit?: (selectedItems: {
    whatsapp?: string;
  }) => void;
};

const TAJAWAL = "'Tajawal', sans-serif";

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
  100% { transform: translateY(0) }
`;

const FIXED_WHATSAPP = "+966 00 000 0000";
const BORDER_COLOR = "#E5E5E5";

const Service5: React.FC<Props> = ({ onSubmit }) => {
  const handleSubmit = () => {
    if (onSubmit) onSubmit({ whatsapp: FIXED_WHATSAPP });
  };

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
                backgroundImage: "url('https://i.ibb.co/fdnB51fk/5.webp')",
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
        mb: { xs: 10, md: 16 },
        direction: "rtl",
        px: { xs: 2, md: 4 },
        fontFamily: TAJAWAL,
      }}
    >
      {/* ===== HEADING ===== */}
     

      {/* ===== BOX يحتوي النص + الرقم في مكان واحد ===== */}

      {/* ===== BOX يحتوي النص + الرقم في مكان واحد ===== */}
      <Box sx={{ position: "relative", width: "100%", maxWidth: 900, mx: "auto" }}>
        
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
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4, // زيادة المسافة بين العناصر داخل البوكس
            border: "1px solid #F5F5F4",
            background: "#F5F5F4",
            borderRadius: 3,
            p: 5, // زيادة padding داخل البوكس
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              mb: 6, // زيادة المسافة بين العنوان والمحتوى
              animation: `${float} 6s ease-in-out infinite`,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                fontFamily: TAJAWAL,
                color: "#023B4E",
              }}
            >
              تسليم واستلام العقار
            </Typography>
          </Box>
          
          {/* النص */}
          <Typography
            sx={{
              fontWeight: 700,
              fontFamily: TAJAWAL,
              fontSize: { xs: "1.6rem", md: "2rem" },
              color: "#023B4E",
            }}
          >
            للتواصل مع قسم التسليم والاستلام برجاء الاتصال على هذا الرقم
          </Typography>

          {/* رقم الواتساب مع الأيقونة */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              px: 4,
              py: 2,
              border: `2px solid ${BORDER_COLOR}`,
              borderRadius: 3,
              backgroundColor: "rgba(37,211,102,0.05)",
            }}
          >
            <IconButton
              aria-label="whatsapp"
              sx={{
                bgcolor: "rgba(37,211,102,0.15)",
                "&:hover": { bgcolor: "rgba(37,211,102,0.25)" },
                border: `1px solid ${BORDER_COLOR}`,
              }}
            >
              <WhatsAppIcon sx={{ color: "#25D366", fontSize: 30 }} />
            </IconButton>

            <Typography
              sx={{
                fontFamily: TAJAWAL,
                fontSize: "2rem",
                fontWeight: 800,
                color: "#023B4E",
              }}
              dir="ltr"
            >
              {FIXED_WHATSAPP}
            </Typography>
          </Box>

          {/* زر الإرسال */}
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              mt: 3,
              px: 6,
              py: 1.5,
              fontSize: "1rem",
              fontWeight: 700,
              fontFamily: TAJAWAL,
              background: "linear-gradient(135deg,#023B4E 0%, #06f9f3 100%)",
              color: "#fff",
              borderRadius: 2,
              boxShadow: "0 8px 28px rgba(2,59,78,0.12)",
              border: `1px solid ${BORDER_COLOR}`,
              "&:hover": { filter: "brightness(0.95)" },
            }}
          >
            إرسال
          </Button>
        </Box>
      </Box>
   
    </Container>
        </Box>
   
  );
};

export default Service5;
