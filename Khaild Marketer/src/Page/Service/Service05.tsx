// src/Page/Service/Service02.tsx
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

const FIXED_WHATSAPP = "+966 55 555 5555";

const Service05: React.FC<Props> = ({ onSubmit }) => {
  const handleSubmit = () => {
    if (onSubmit) onSubmit({ whatsapp: FIXED_WHATSAPP });
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: { xs: 4, md: 8 },
        mb: { xs: 6, md: 12 },
        direction: "rtl",
        px: { xs: 2, md: 4 },
        fontFamily: TAJAWAL,
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          mb: 3,
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
          تسليم واستلام
        </Typography>
      </Box>

      <Box
        sx={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.98), #fff)",
          borderRadius: 3,
          p: { xs: 2, md: 3 },
          boxShadow: "0 12px 40px rgba(7,22,23,0.05)",
          border: "1px solid rgba(3,59,66,0.04)",
        }}
      >
        {/* WhatsApp row */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
          }}
        >
          {/* TEXT ONLY */}
          <Typography
            sx={{
              fontWeight: 700,
              fontFamily: TAJAWAL,
              fontSize: "1rem",
              whiteSpace: "nowrap",
            }}
          >
            للتواصل مع قسم الاستلام والتسليم برجاء الاتصال على هذا الرقم
          </Typography>

          {/* ICON + NUMBER GROUP */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <IconButton
              aria-label="whatsapp"
              sx={{
                bgcolor: "rgba(37,211,102,0.08)",
                border: "1px solid rgba(37,211,102,0.12)",
                "&:hover": { bgcolor: "rgba(37,211,102,0.12)" },
                p: 1,
              }}
            >
              <WhatsAppIcon sx={{ color: "#25D366" }} />
            </IconButton>

            {/* NUMBER NEXT TO ICON — NOW LTR */}
            <Typography
              sx={{
                fontFamily: TAJAWAL,
                fontSize: "1.2rem",
                fontWeight: 700,
                color: "#023B4E",
              }}
              dir="ltr"   // <<< IMPORTANT FIX
            >
              {FIXED_WHATSAPP}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              px: 5,
              py: 1.2,
              fontSize: "1rem",
              fontWeight: 700,
              fontFamily: TAJAWAL,
              background: "linear-gradient(135deg,#023B4E 0%, #06f9f3 100%)",
              color: "#fff",
              borderRadius: 2,
              boxShadow: "0 8px 28px rgba(2,59,78,0.12)",
              "&:hover": { filter: "brightness(0.95)" },
            }}
          >
            إرسال
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Service05;
