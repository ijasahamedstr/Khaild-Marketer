import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { keyframes } from "@mui/system";

// Enhanced animations & readability: titles are now pure white (no shimmer)

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const floatCircle = keyframes`
  0% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-6px, -6px) scale(1.05); }
  100% { transform: translate(0, 0) scale(1); }
`;

const floatTiny = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
`;

const BannerCard01: React.FC = () => {
  const cards = [
    {
      title: "الرؤية",
      text: "أن نكون الخيار الأول في التسويق العقاري الرقمي، من خلال تقديم خدمات احترافية تُحقق أعلى مستويات الثقة والتميز.",
    },
    {
      title: "الرسالة",
      text: "تقديم خدمات تسويق عقاري تعتمد على المعرفة العميقة بالسوق والاحتراف في تقديم المحتوى، للوصول لأفضل النتائج في أقل وقت ممكن.",
    },
    {
      title: "الهدف",
      text: "الوصول بالعقار إلى العميل المناسب من خلال أدوات تسويقية فعالة، وبناء علاقات طويلة الأمد مبنية على المصداقية والجودة.",
    },
  ];

  return (
    <Box
      component="section"
      sx={{
        bgcolor: "#fff",
        py: { xs: 6, md: 8 },
        direction: "rtl",
        "*": { fontFamily: `"Tajawal", sans-serif !important` },
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            flexWrap: "nowrap",
            justifyContent: "space-between",
            gap: 3,
            overflowX: { xs: "auto", md: "visible" },
            pb: { xs: 2, md: 0 },
            scrollSnapType: { xs: "x mandatory", md: "none" },
          }}
        >
          {cards.map((card, index) => (
            <Box
              key={index}
              role="article"
              aria-label={`${card.title} card`}
              tabIndex={0}
              sx={{
                background: "linear-gradient(135deg, #023B4E, #046A84, #08A4BF)",
                backgroundSize: "240% 240%",
                animation: `${gradientShift} 16s ease-in-out infinite`,
                borderRadius: "20px",
                p: 4,
                position: "relative",
                overflow: "hidden",
                minWidth: { xs: "80%", md: "33.33%" },
                maxWidth: { xs: "80%", md: "33.33%" },
                flexShrink: 0,
                minHeight: "260px",
                scrollSnapAlign: { xs: "center", md: "none" },
                boxShadow: "0 18px 40px rgba(0,0,0,0.35)",
                transition: "transform 0.45s cubic-bezier(.2,.9,.2,1), box-shadow 0.45s ease",

                '&:hover': {
                  transform: "translateY(-12px) scale(1.02)",
                  boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
                },

                '&:focus': {
                  outline: "none",
                  boxShadow: (theme: any) => `0 6px 30px rgba(9, 151, 179, 0.18), 0 0 0 6px ${theme.palette.primary.light}`,
                },
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  right: "-40px",
                  bottom: "-40px",
                  width: { xs: "140px", md: "190px" },
                  height: { xs: "140px", md: "190px" },
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(152,235,255,0.95), rgba(0,76,104,0.06))",
                  opacity: 0.55,
                  filter: "blur(6px)",
                  animation: `${floatCircle} 9s ease-in-out infinite`,
                }}
              />

              <Box
                sx={{
                  position: "absolute",
                  left: 18,
                  top: 18,
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.08)",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
                  transformOrigin: "center",
                  animation: `${floatTiny} ${8 + index}s ease-in-out infinite`,
                }}
              />

              <Box
                sx={{
                  position: "absolute",
                  left: 48,
                  top: 36,
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.06)",
                  animation: `${floatTiny} ${9 + index}s ease-in-out infinite`,
                }}
              />

              {/* Clear, pure-white title (no shimmer) */}
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  color: "#FFFFFF", // PURE WHITE
                  mb: 2,
                  letterSpacing: "0.03em",
                  fontSize: { xs: "1.6rem", md: "1.9rem" },
                  textShadow: "0 2px 6px rgba(0,0,0,0.35)",
                }}
              >
                {card.title}
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: "1.05rem", md: "1.15rem" },
                  color: "rgba(222,242,250,0.95)",
                  lineHeight: 1.9,
                  mb: 3.5,
                  maxWidth: "95%",
                }}
              >
                {card.text}
              </Typography>

              <Button
                variant="text"
                sx={{
                  px: 0,
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  textTransform: "none",
                  gap: 1,
                  position: "relative",
                  overflow: 'visible',
                  '&::after': {
                    content: '""',
                    position: "absolute",
                    bottom: -2,
                    right: 0,
                    height: "3px",
                    width: "100%",
                    transform: "scaleX(0)",
                    transformOrigin: 'right',
                    background: "linear-gradient(90deg, rgba(156,240,255,0.9), rgba(255,255,255,0.95), rgba(156,240,255,0.9))",
                    transition: "transform 0.35s cubic-bezier(.2,.9,.2,1)",
                    borderRadius: '2px'
                  },
                  '&:hover::after': {
                    transform: "scaleX(1)",
                    transformOrigin: 'left',
                  },
                }}
              >
                <span>تعرّف أكثر</span>
                <span aria-hidden className="arrow" style={{ marginLeft: 8 }}>↗</span>
              </Button>

              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0))",
                  mixBlendMode: "overlay",
                }}
              />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default BannerCard01;
