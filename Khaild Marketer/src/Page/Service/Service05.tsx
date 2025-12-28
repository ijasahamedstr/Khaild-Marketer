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

const Service05: React.FC<Props> = ({ onSubmit }) => {
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
    <Container
      maxWidth="lg"
      sx={{
        mt: { xs: 8, md: 12 }, // MORE TOP SPACE
        mb: { xs: 10, md: 16 }, // MORE BOTTOM SPACE
        direction: "rtl",
        px: { xs: 2, md: 4 },
        fontFamily: TAJAWAL,
      }}
    >
      {/* Heading */}
      <Box
        sx={{
          textAlign: "center",
          mb: 6,
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

      {/* Text */}
      <Typography
        sx={{
          fontWeight: 700,
          fontFamily: TAJAWAL,
          fontSize: "2rem",
          mb: 5,
          textAlign: "center",
        }}
      >
        للتواصل مع قسم الاستلام والتسليم برجاء الاتصال على هذا الرقم
      </Typography>

      {/* NUMBER CENTERED WITH OUTLINE */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 6,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            px: 4,
            py: 2,
            border: "2px solid #25D366",
            borderRadius: 3,
            backgroundColor: "rgba(37,211,102,0.05)",
          }}
        >
          <IconButton
            aria-label="whatsapp"
            sx={{
              bgcolor: "rgba(37,211,102,0.15)",
              "&:hover": { bgcolor: "rgba(37,211,102,0.25)" },
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
      </Box>

      {/* Button */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            px: 6,
            py: 1.4,
            fontSize: "1rem",
            fontWeight: 700,
            fontFamily: TAJAWAL,
            background:
              "linear-gradient(135deg,#023B4E 0%, #06f9f3 100%)",
            color: "#fff",
            borderRadius: 2,
            boxShadow: "0 8px 28px rgba(2,59,78,0.12)",
            "&:hover": { filter: "brightness(0.95)" },
          }}
        >
          إرسال
        </Button>
      </Box>
    </Container>
  );
};

export default Service05;
