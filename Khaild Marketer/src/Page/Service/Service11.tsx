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
      <Box sx={{ textAlign: "center", mb: 4, mt: 6 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            fontFamily: TAJAWAL,
            color: "#023B4E",
          }}
        >
            محكم معتمد
        </Typography>
      </Box>

      {/* Paragraph / Points */}
      <Box sx={{ textAlign: "right", display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography
          sx={{
            fontWeight: 700,
            fontFamily: TAJAWAL,
            fontSize: { xs: "1.4rem", md: "1.8rem" },
            lineHeight: 1.8,
            color: "#023B4E",
          }}
        >
          ١. نوفّر خدمة "محكّم معتمد" لحل النزاعات العقارية باحترافية وحيادية.
        </Typography>
        <Typography
          sx={{
            fontWeight: 700,
            fontFamily: TAJAWAL,
            fontSize: { xs: "1.4rem", md: "1.8rem" },
            lineHeight: 1.8,
            color: "#023B4E",
          }}
        >
          ٢. رأي قانوني خبير من محكّمين معتمدين لضمان حقوق جميع الأطراف.
        </Typography>
        <Typography
          sx={{
            fontWeight: 700,
            fontFamily: TAJAWAL,
            fontSize: { xs: "1.4rem", md: "1.8rem" },
            lineHeight: 1.8,
            color: "#023B4E",
          }}
        >
          ٣. عند الخلاف… لا تحتار، معنا محكّم معتمد يفصل بوضوح وعدالة.
        </Typography>
        <Typography
          sx={{
            fontWeight: 700,
            fontFamily: TAJAWAL,
            fontSize: { xs: "1.4rem", md: "1.8rem" },
            lineHeight: 1.8,
            color: "#023B4E",
          }}
        >
          ٤. نخدم عملاءنا بخبرة تحكيم عقاري موثوقة ومعتمدة من الجهات الرسمية.
        </Typography>
      </Box>
    </Container>
  );
};

export default Service11;
