import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { keyframes } from "@mui/system";

/* Tajawal font note as before (keep it) */

const floatUp = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
  100% { transform: translateY(0); }
`;

const sheen = keyframes`
  0% { background-position: -150% 0; }
  100% { background-position: 150% 0; }
`;

const Serviece: React.FC = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const sliderRef = React.useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [cardWidth, setCardWidth] = React.useState(0);

  const serviceCards = [
    {
      id: 1,
      title: " بيع العقار  ",
      description:
        "نقدم لك خدمة بيع عقارك بأفضل الأدوات التسويقية، ونستهدف الفئة المناسبة لضمان بيع سريع وبأعلى سعر ممكن، مع متابعة كاملة حتى إتمام العملية.",
    },
    {
      id: 2,
      title: "شراء العقار",
      description:
        "نساعدك في إيجاد العقار الأمثل وفق احتياجك وميزانيتك، من خلال شبكة واسعة من العروض والفرص العقارية، مع تقديم استشارات احترافية لضمان قرارك الاستثماري أو السكني.",
    },
    {
      id: 3,
      title: "استئجار العقار ",
      description:
        "نوفر لك خيارات متعددة من الوحدات السكنية أو التجارية للإيجار، مع متابعة دقيقة لكافة الإجراءات لتضمن تجربة سلسة وموثوقة.",
    },
    {
      id: 4,
      title: "تشطيب العقار",
      description:
        "نقدم خدمة التشطيب المتكامل للعقارات، من التصميم إلى التنفيذ، بأفضل المواد والمعايير، لتسكن أو تستثمر في مساحة تعكس ذوقك وقيمتك.",
    },
    {
      id: 5,
      title: "تسليم واستلام العقار",
      description:
        "نقوم بتمثيلك في استلام العقار أو تسليمه، ونتحقق من مطابقة المواصفات، لضمان حماية حقوقك وضمان جودة العقار كما تم الاتفاق عليه.",
    },
  ];

  // Calculate card width and update on resize
  React.useEffect(() => {
    const calc = () => {
      const el = sliderRef.current;
      if (!el || !el.firstElementChild) return;
      const child = el.firstElementChild as HTMLElement;
      const gap = parseInt(getComputedStyle(el).gap || "16", 10);
      setCardWidth(child.offsetWidth + gap);
    };

    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, [isMobile]);

  // Update currentIndex while scrolling (throttled with rAF)
  React.useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;

    let rafId = 0;
    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const left = el.scrollLeft;
        const idx = cardWidth ? Math.round(left / cardWidth) : 0;
        const bounded = Math.max(0, Math.min(serviceCards.length - 1, idx));
        setCurrentIndex(bounded);
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [cardWidth, serviceCards.length]);

  const scrollToIndex = (index: number) => {
    const el = sliderRef.current;
    if (!el) return;
    const left = index * cardWidth;
    el.scrollTo({ left, behavior: "smooth" });
    setCurrentIndex(index);
  };

  const scrollByCard = (direction: "left" | "right") => {
    const target = direction === "left" ? currentIndex - 1 : currentIndex + 1;
    const bounded = Math.max(0, Math.min(serviceCards.length - 1, target));
    scrollToIndex(bounded);
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        mt: 6,
        mb: 10,
        direction: "rtl",
        px: { xs: 2, md: 4 },
        fontFamily: "'Tajawal', sans-serif",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          color: "#003c46",
          mb: 3,
          textAlign: "right",
          fontFamily: "'Tajawal', sans-serif",
          background: "linear-gradient(90deg, rgba(2,59,78,1), rgba(4,106,132,1))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundSize: "200% 100%",
          animation: `${sheen} 5s linear infinite`,
        }}
      >
        نبذة عن خدماتنا
      </Typography>

      {/* Desktop / Tablet Grid */}
      {!isMobile && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 4,
          }}
        >
          {serviceCards.map((card, index) => {
            const showDivider = index % 3 !== 2;
            return (
              <Box
                key={card.id}
                sx={{
                  width: "100%",
                  position: "relative",
                  textAlign: "right",
                  mb: { xs: 4, md: index < 3 ? 6 : 0 },
                  gridColumn:
                    index === 3 ? "1 / span 1" : index === 4 ? "2 / span 1" : "auto",
                  fontFamily: "'Tajawal', sans-serif",
                  p: 3,
                  borderRadius: 2,
                  transition: "transform 0.36s cubic-bezier(.2,.9,.2,1), box-shadow 0.36s",
                  boxShadow: "0 10px 30px rgba(2,59,78,0.06)",
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.75), rgba(250,250,250,0.6))",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 22px 50px rgba(2,59,78,0.12)",
                  },
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    left: { xs: 12, md: 16 },
                    top: 12,
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: "linear-gradient(90deg, #9CF0FF, #FFFFFF)",
                    boxShadow: "0 6px 18px rgba(4,106,132,0.12)",
                    transformOrigin: "center",
                    animation: `${floatUp} ${6 + index}s ease-in-out infinite`,
                    display: { xs: "none", md: "block" },
                  }}
                />

                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    color: "#003c46",
                    fontFamily: "'Tajawal', sans-serif",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>{card.title}</span>

                  <Box sx={{ display: { xs: "none", md: "inline-flex" }, alignItems: "center" }}>
                    <ArrowBackIosNewIcon
                      sx={{
                        transform: "rotateY(180deg)",
                        transition: "transform .28s",
                        "&:hover": { transform: "translateX(6px) rotateY(180deg)" },
                      }}
                    />
                  </Box>
                </Typography>

                <Typography sx={{ lineHeight: 2, mb: 4, fontFamily: "'Tajawal', sans-serif" }}>
                  {card.description}
                </Typography>

                <Button
                  variant="outlined"
                  endIcon={<ArrowBackIosNewIcon />}
                  sx={{
                    borderColor: "#023B4E",
                    color: "#023B4E",
                    px: 3,
                    fontFamily: "'Tajawal', sans-serif",
                    "&:hover": {
                      borderColor: "#023B4E",
                      color: "#023B4E",
                      background: "rgba(4,106,132,0.03)",
                    },
                    transition: "transform .28s ease, box-shadow .28s",
                    "&:active": { transform: "scale(.98)" },
                  }}
                >
                  اكتشف المزيد
                </Button>

                {showDivider && (
                  <Box
                    sx={{
                      position: "absolute",
                      left: "-20px",
                      top: 0,
                      height: "100%",
                      width: "2px",
                      backgroundColor: "#e5e5e5",
                      display: { xs: "none", md: "block" },
                    }}
                  />
                )}
              </Box>
            );
          })}
        </Box>
      )}

      {/* Mobile Slider with dots + arrows */}
      {isMobile && (
        <Box sx={{ position: "relative", mt: 2 }}>
          <IconButton
            aria-label="prev"
            onClick={() => scrollByCard("left")}
            disabled={currentIndex === 0}
            sx={{
              position: "absolute",
              zIndex: 9,
              top: "40%",
              right: 6,
              background: "rgba(2,59,78,0.06)",
              "&:hover": { background: "rgba(2,59,78,0.12)" },
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>

          <IconButton
            aria-label="next"
            onClick={() => scrollByCard("right")}
            disabled={currentIndex >= serviceCards.length - 1}
            sx={{
              position: "absolute",
              zIndex: 9,
              top: "40%",
              left: 6,
              background: "rgba(2,59,78,0.06)",
              transform: "rotate(180deg)",
              "&:hover": { background: "rgba(2,59,78,0.12)" },
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>

          <Box
            ref={sliderRef}
            sx={{
              display: "flex",
              gap: 2,
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
              px: 1,
              py: 1,
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {serviceCards.map((card) => (
              <Box
                key={card.id}
                sx={{
                  flex: "0 0 86%",
                  scrollSnapAlign: "center",
                  mx: "auto",
                  position: "relative",
                  textAlign: "right",
                  p: 3,
                  borderRadius: 2,
                  transition: "transform 0.36s cubic-bezier(.2,.9,.2,1), box-shadow 0.36s",
                  boxShadow: "0 10px 30px rgba(2,59,78,0.06)",
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.95), rgba(250,250,250,0.9))",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 1.5,
                    color: "#003c46",
                    fontFamily: "'Tajawal', sans-serif",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "1.05rem",
                  }}
                >
                  <span>{card.title}</span>
                </Typography>

                <Typography sx={{ lineHeight: 1.9, mb: 3, fontFamily: "'Tajawal', sans-serif", fontSize: "0.95rem" }}>
                  {card.description}
                </Typography>

                <Button
                  variant="outlined"
                  endIcon={<ArrowBackIosNewIcon />}
                  sx={{
                    borderColor: "#023B4E",
                    color: "#023B4E",
                    px: 3,
                    fontFamily: "'Tajawal', sans-serif",
                    "&:hover": {
                      borderColor: "#023B4E",
                      color: "#023B4E",
                      background: "rgba(4,106,132,0.03)",
                    },
                    transition: "transform .28s ease, box-shadow .28s",
                    "&:active": { transform: "scale(.98)" },
                    fontSize: "0.9rem",
                  }}
                >
                  اكتشف المزيد
                </Button>
              </Box>
            ))}
          </Box>

          {/* Pagination dots */}
          <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 2 }}>
            {serviceCards.map((_, i) => (
              <Box
                key={i}
                onClick={() => scrollToIndex(i)}
                sx={{
                  width: currentIndex === i ? 12 : 8,
                  height: currentIndex === i ? 12 : 8,
                  borderRadius: "50%",
                  background: currentIndex === i ? "#023B4E" : "rgba(2,59,78,0.18)",
                  cursor: "pointer",
                  transition: "all .18s",
                }}
              />
            ))}
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default Serviece;
