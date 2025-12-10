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
import { Link as RouterLink, useNavigate } from "react-router-dom";

const floatUp = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
  100% { transform: translateY(0); }
`;

const sheen = keyframes`
  0% { background-position: -150% 0; }
  100% { background-position: 150% 0; }
`;

// Add optional href so each card/button can navigate
interface ServiceCard {
  id: number;
  title: string;
  description: string;
  href?: string; // optional route or external URL
}

const serviceCards: ServiceCard[] = [
  {
    id: 1,
    title: " بيع العقار  ",
    description:
      "نقدم لك خدمة بيع عقارك بأفضل الأدوات التسويقية، ونستهدف الفئة المناسبة لضمان بيع سريع وبأعلى سعر ممكن، مع متابعة كاملة حتى إتمام العملية.",
    href: "/services/sell",
  },
  {
    id: 2,
    title: "شراء العقار",
    description:
      "نساعدك في إيجاد العقار الأمثل وفق احتياجك وميزانيتك، من خلال شبكة واسعة من العروض والفرص العقارية، مع تقديم استشارات احترافية لضمان قرارك الاستثماري أو السكني.",
    href: "/services/buy",
  },
  {
    id: 3,
    title: "استئجار العقار ",
    description:
      "نوفر لك خيارات متعددة من الوحدات السكنية أو التجارية للإيجار، مع متابعة دقيقة لكافة الإجراءات لتضمن تجربة سلسة وموثوقة.",
    href: "/services/rent",
  },
  {
    id: 4,
    title: "تشطيب العقار",
    description:
      "نقدم خدمة التشطيب المتكامل للعقارات، من التصميم إلى التنفيذ، بأفضل المواد والمعايير، لتسكن أو تستثمر في مساحة تعكس ذوقك وقيمتك.",
    href: "/services/finish",
  },
  {
    id: 5,
    title: "تسليم واستلام العقار",
    description:
      "نقوم بتمثيلك في استلام العقار أو تسليمه، ونتحقق من مطابقة المواصفات، لضمان حماية حقوقك وضمان جودة العقار كما تم الاتفاق عليه.",
    href: "/services/handover",
  },
  {
    id: 6,
    title: " القسم النسائي  ",
    description:
      "نطلاقًا من إيماننا بأهمية الخصوصية وراحة التعامل، تم تخصيص قسم نسائي مستقل، يُدار بكوادر نسائية مؤهلة، لتمكين المرأة من مناقشة تفاصيل عقاراتها بكل ارتياح وثقة، في بيئة تراعي احتياجاتها وتلبي تطلعاتها.",
    href: "/services/inspection",
  },
  {
    id: 7,
    title: " قسم التمويل العقاري",
    description:
      "نُسهم في تسهيل رحلتك نحو التملك من خلال توجيهك إلى الجهات التمويلية الأنسب، بما يتوافق مع احتياجاتك وإمكاناتك، بكل حيادية وموثوقية.",
    href: "/services/other",
  },
];

const Service: React.FC = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const sliderRef = React.useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [cardWidth, setCardWidth] = React.useState(0);
  const navigate = useNavigate();

  // Measure card width (card + gap). fallbackWidth used if measurement not ready.
  React.useEffect(() => {
    const calc = () => {
      const el = sliderRef.current;
      if (!el || !el.firstElementChild) {
        setCardWidth(0);
        return;
      }
      const child = el.firstElementChild as HTMLElement;
      // Use 16px as default gap if not computed
      const gap = parseInt(getComputedStyle(el).gap || "16", 10) || 16;
      setCardWidth(child.offsetWidth + gap);
    };

    calc();
    const ro = new ResizeObserver(calc);
    if (sliderRef.current) ro.observe(sliderRef.current);
    window.addEventListener("resize", calc);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", calc);
    };
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
        // Use cardWidth for accurate index calculation, defaulting to 0 if not measured
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
  }, [cardWidth]);

  // robust scrollBy: uses measured cardWidth or sensible fallback
  const scrollByCard = (direction: "left" | "right") => {
    const el = sliderRef.current;
    if (!el) return;

    // Choose a sensible fallback if cardWidth not measured: use 86% of container width
    const fallbackWidth = Math.round(
      (el.clientWidth || window.innerWidth) * 0.86
    );
    const step = cardWidth && cardWidth > 0 ? cardWidth : fallbackWidth;
    const delta = direction === "left" ? -step : step;

    // perform smooth scroll
    el.scrollBy({ left: delta, behavior: "smooth" });

    // optimistic update (onScroll will correct if needed)
    const approxIndex = cardWidth
      ? Math.round(el.scrollLeft / (cardWidth || 1))
      : currentIndex;
    const targetIndex = Math.max(
      0,
      Math.min(
        serviceCards.length - 1,
        direction === "left" ? approxIndex - 1 : approxIndex + 1
      )
    );
    setCurrentIndex(targetIndex);
  };

  const scrollToIndex = (index: number) => {
    const el = sliderRef.current;
    if (!el) return;
    const size =
      cardWidth && cardWidth > 0
        ? cardWidth
        : Math.round((el.clientWidth || window.innerWidth) * 0.86);
    const left = index * size;
    el.scrollTo({ left, behavior: "smooth" });
    setCurrentIndex(Math.max(0, Math.min(serviceCards.length - 1, index)));
  };

  // helper to navigate when clicking a card
  const handleCardClick = (href?: string) => {
    if (!href) return;
    if (href.startsWith("http://") || href.startsWith("https://")) {
      window.open(href, "_blank");
    } else {
      // internal route
      navigate(href);
    }
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
          background:
            "linear-gradient(90deg, rgba(2,59,78,1), rgba(4,106,132,1))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundSize: "200% 100%",
          animation: `${sheen} 5s linear infinite`,
        }}
      >
        نبذة عن خدماتنا
      </Typography>

      {/* --- Desktop / Tablet Grid --- */}
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
            alignItems: "start",
          }}
        >
          {serviceCards.map((card, index) => {
            // Remove divider for last card in a row
            const showDivider = index % 3 !== 2 && index !== serviceCards.length - 1;
            const isLast = index === serviceCards.length - 1;

            return (
              <Box
                key={card.id}
                onClick={() => handleCardClick(card.href)}
                role={card.href ? "button" : undefined}
                tabIndex={card.href ? 0 : -1}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") handleCardClick(card.href);
                }}
                sx={{
                  position: "relative",
                  textAlign: "right",
                  mb: { xs: 4, md: index < 3 ? 6 : 0 },

                  // add top spacing specifically for the last card so it sits lower in the center column
                  mt: isLast ? { md: 6, xs: 0 } : 0,

                  // Force the 7th card into the center column on md+ screens
                  gridColumn: isLast
                    ? { md: "2 / span 1" }
                    : index === 3
                    ? "1 / span 1"
                    : index === 4
                    ? "2 / span 1"
                    : "auto",

                  // center the last card horizontally when it spans the center column
                  justifySelf: isLast ? "center" : "stretch",

                  // single width entry (no duplicate property)
                  width: isLast ? { md: "140%", xs: "100%" } : "100%",

                  // cap the maximum visual width to avoid extreme overflow
                  maxWidth: isLast ? { md: "1100px", xs: "100%" } : "100%",

                  fontFamily: "'Tajawal', sans-serif",
                  p: 3,
                  borderRadius: 2,
                  transition:
                    "transform 0.36s cubic-bezier(.2,.9,.2,1), box-shadow 0.36s",
                  boxShadow: "0 10px 30px rgba(2,59,78,0.06)",
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.75), rgba(250,250,250,0.6))",
                  cursor: card.href ? "pointer" : "default",
                  '&:hover': {
                    transform: card.href ? "translateY(-8px)" : undefined,
                    boxShadow: card.href ? "0 22px 50px rgba(2,59,78,0.12)" : undefined,
                  },

                  // allow the wider element to overflow the grid container bounds horizontally
                  overflow: "visible",
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

                  <Box
                    sx={{
                      display: { xs: "none", md: "inline-flex" },
                      alignItems: "center",
                    }}
                  >
                    <ArrowBackIosNewIcon
                      sx={{
                        transform: "rotateY(180deg)",
                        transition: "transform .28s",
                        "&:hover": {
                          transform: "translateX(6px) rotateY(180deg)",
                        },
                      }}
                    />
                  </Box>
                </Typography>

                <Typography
                  sx={{
                    lineHeight: 2,
                    mb: 4,
                    fontFamily: "'Tajawal', sans-serif",
                  }}
                >
                  {card.description}
                </Typography>

                <Button
                  variant="outlined"
                  endIcon={<ArrowBackIosNewIcon />}
                  component={card.href && !card.href.startsWith("http") ? RouterLink : "a"}
                  to={card.href && !card.href.startsWith("http") ? card.href : undefined}
                  href={card.href && card.href.startsWith("http") ? card.href : undefined}
                  onClick={(e) => {
                    // prevent double navigation when card href exists (card click already handles)
                    if (card.href) e.stopPropagation();
                  }}
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

      {/* --- Mobile Slider with dots + arrows --- */}
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
                onClick={() => handleCardClick(card.href)}
                role={card.href ? "button" : undefined}
                tabIndex={card.href ? 0 : -1}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") handleCardClick(card.href);
                }}
                sx={{
                  flex: "0 0 86%",
                  scrollSnapAlign: "center",
                  mx: "auto",
                  position: "relative",
                  textAlign: "right",
                  p: 3,
                  borderRadius: 2,
                  transition:
                    "transform 0.36s cubic-bezier(.2,.9,.2,1), box-shadow 0.36s",
                  boxShadow: "0 10px 30px rgba(2,59,78,0.06)",
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.95), rgba(250,250,250,0.9))",
                  cursor: card.href ? "pointer" : "default",
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

                <Typography
                  sx={{
                    lineHeight: 1.9,
                    mb: 3,
                    fontFamily: "'Tajawal', sans-serif",
                    fontSize: "0.95rem",
                  }}
                >
                  {card.description}
                </Typography>

                <Button
                  variant="outlined"
                  endIcon={<ArrowBackIosNewIcon />}
                  component={card.href && !card.href.startsWith("http") ? RouterLink : "a"}
                  to={card.href && !card.href.startsWith("http") ? card.href : undefined}
                  href={card.href && card.href.startsWith("http") ? card.href : undefined}
                  onClick={(e) => {
                    if (card.href) e.stopPropagation();
                  }}
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
                  background:
                    currentIndex === i ? "#023B4E" : "rgba(2,59,78,0.18)",
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

export default Service;
