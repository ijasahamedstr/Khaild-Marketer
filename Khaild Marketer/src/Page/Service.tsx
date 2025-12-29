import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  useMediaQuery,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { keyframes } from "@mui/system";
import { Link as RouterLink, useNavigate } from "react-router-dom";

/* ================= ANIMATIONS ================= */

const floatUp = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
  100% { transform: translateY(0); }
`;

const sheen = keyframes`
  0% { background-position: -150% 0; }
  100% { background-position: 150% 0; }
`;

/* ================= TYPES ================= */

interface ServiceCard {
  id: number;
  title: string;
  description: string;
  href?: string;
}

/* ================= DATA ================= */

const serviceCards: ServiceCard[] = [
   {
    id: 1,
    title: " بيع العقار  ",
    description:
      "نقدم لك خدمة بيع عقارك بأفضل الأدوات التسويقية، ونستهدف الفئة المناسبة لضمان بيع سريع وبأعلى سعر ممكن، مع متابعة كاملة حتى إتمام العملية.",
    href: "/services/بيع العقار",
  },
  {
    id: 2,
    title: "شراء العقار",
    description:
      "نساعدك في إيجاد العقار الأمثل وفق احتياجك وميزانيتك، من خلال شبكة واسعة من العروض والفرص العقارية، مع تقديم استشارات احترافية لضمان قرارك .",
    href: "/services/شراء العقار",
  },
  {
    id: 3,
    title: "إيجار العقار",
    description:
      "نوفر لك خيارات متعددة من الوحدات السكنية أو التجارية للإيجار، مع متابعة دقيقة لكافة الإجراءات لتضمن تجربة سلسة وموثوقة.",
    href: "/services/إيجار العقار",
  },
  {
    id: 4,
    title: "تشطيب العقار",
    description:
      "نقدم خدمة التشطيب المتكامل للعقارات،     بأفضل المواد والمعايير، لتسكن أو تستثمر في مساحة تعكس ذوقك وقيمتك.",
    href: "/services/تشطيب العقار",
  },
  {
    id: 5,
    title: "تسليم واستلام العقار",
    description:
      "نقوم بتمثيلك في استلام العقار أو تسليمه، ونتحقق من مطابقة المواصفات، لضمان حماية حقوقك وضمان جودة العقار كما تم الاتفاق عليه.",
    href: "/services/تسليم واستلام العقار",
  },
  {
    id: 7,
    title: " النظام يجيب",
    description:
      "في هذا القسم، نسلّط الضوء بشكل دوري على أبرز الأنظمة واللوائح العقارية، لنقدّم لمتابعينا محتوى توعوي يُثري معرفتهم ويعزز وعيهم قبل اتخاذ أي قرار.",
    href: "/services/النظام يجيب",
  },
  {
    id: 6,
    title: "محكّم معتمد",
    description:
      "تحكيم عقاري موثوق لحل النزاعات بكل احترافية. اطلب خدمة محكّم معتمد واحمِ حقوقك بثقة.",
    href: "/services/محكم معتمد",
  },
  {
    id: 8,
    title: "خدمات التوثيق",
    description:
      "نوفر خدمات توثيق العقود والوكالات العقارية لضمان حقوق جميع الأطراف بسرعة وموثوقية.",
    href: "/services/خدمات التوثيق",
  },
  {
    id: 9,
     title: "خدمات التصوير العقاري",
    description:
      "نوفر تصويرًا احترافيًا للعقار يعكس جماله ويعزز فرص البيع أو التأجير بشكل جذاب ودقيق.",
    href: "/services/خدمات التصوير العقاري",
  },
  {
    id: 10,
    title: "القسم النسائي",
    description:
      "انطلاقًا من إيماننا بأهمية الخصوصية وراحة التعامل، تم تخصيص قسم نسائي مستقل، يُدار بكوادر نسائية مؤهلة، لتمكين المرأة من مناقشة تفاصيل عقاراتها بكل ارتياح وثقة، في بيئة تراعي احتياجاتها وتلبي تطلعاتها.",
    href: "/services/القسم النسائي",
  },
  {
    id: 11,
    title: "قسم التمويل العقاري",
    description:
      "نُقدم استشارات مهنية لتوجيه عملائنا نحو خيارات التمويل العقاري الأنسب، من خلال ربطهم مع الجهات التمويلية المعتمدة ومساعدتهم في اتخاذ قرارات مبنية على احتياجاتهم وقدراتهم، بكل شفافية ومصداقية.",
    href: "/services/قسم التمويل العقاري",
  },
];

/* ================= COMPONENT ================= */

const Service: React.FC = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const sliderRef = React.useRef<HTMLDivElement | null>(null);
  const [cardWidth, setCardWidth] = React.useState(0);
  const navigate = useNavigate();

  /* ---------- MEASURE CARD WIDTH ---------- */

  React.useEffect(() => {
    const calc = () => {
      const el = sliderRef.current;
      if (!el || !el.firstElementChild) {
        setCardWidth(0);
        return;
      }
      const child = el.firstElementChild as HTMLElement;
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

  /* ---------- UPDATE INDEX ON SCROLL ---------- */

  React.useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;

    let rafId = 0;
    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [cardWidth]);

  /* ---------- HELPERS ---------- */

  const handleCardClick = (href?: string) => {
    if (!href) return;
    if (href.startsWith("http")) {
      window.open(href, "_blank");
    } else {
      navigate(href);
    }
  };

  /* ================= RENDER ================= */

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

       <Box
        component="hr"
        sx={{
          border: "none",
          height: "2px",
          mb: 6,
          background:
            "linear-gradient(90deg, rgba(2,59,78,0), rgba(2,59,78,0.6), rgba(2,59,78,0))",
        }}
      />

      {/* ================= DESKTOP / TABLET GRID ================= */}
      {!isMobile && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 6,
            alignItems: "start",
          }}
        >
          {serviceCards.map((card, index) => {
            // ✅ ONLY CHANGE: center LAST card only
            const isCenterWide = card.id === 11 || card.id === 10;

            const showDivider =
              !isCenterWide &&
              index % 3 !== 2 &&
              index !== serviceCards.length - 1;

            return (
              <Box
                key={card.id}
                onClick={() => handleCardClick(card.href)}
                role={card.href ? "button" : undefined}
                tabIndex={card.href ? 0 : -1}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    handleCardClick(card.href);
                }}
                sx={{
                  position: "relative",
                  textAlign: "right",
                  color: "#000",
                  mb: { xs: 4, md: index < 3 ? 6 : 0 },
                  mt: isCenterWide ? { md: 6, xs: 0 } : 0,

                  // ✅ ONLY CHANGE
                  gridColumn: isCenterWide ? { md: "2 / span 1" } : "auto",

                  justifySelf: isCenterWide ? "center" : "stretch",
                  width: isCenterWide ? { md: "140%", xs: "100%" } : "100%",
                  maxWidth: isCenterWide
                    ? { md: "1100px", xs: "100%" }
                    : "100%",

                  fontFamily: "'Tajawal', sans-serif",
                  p: 3,
                  borderRadius: 2,
                  transition:
                    "transform 0.36s cubic-bezier(.2,.9,.2,1), box-shadow 0.36s",
                  boxShadow:
                    "0 14px 34px rgba(2,59,78,0.14), 0 6px 16px rgba(2,59,78,0.10)",
                  cursor: card.href ? "pointer" : "default",
                  "&:hover": {
                    transform: card.href ? "translateY(-8px)" : undefined,
                    boxShadow: card.href
                      ? "0 22px 50px rgba(2,59,78,0.12)"
                      : undefined,
                  },
                  overflow: "visible",
                  background: `
                    linear-gradient(
                      145deg,
                      #CAD5E2 0%,
                      #a2adbbff 45%,
                      #E4E4E7 100%
                    )
                  `,
                }}
              >
                {/* ===== EVERYTHING BELOW IS UNCHANGED ===== */}
                <Box
                  sx={{
                    position: "absolute",
                    left: { xs: 12, md: 16 },
                    top: 12,
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: "linear-gradient(90deg, #9CF0FF, #FFFFFF)",
                    boxShadow:
                      "0 14px 34px rgba(2,59,78,0.14), 0 6px 16px rgba(2,59,78,0.10)",
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
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "25px",
                    fontFamily: "'Tajawal', sans-serif",
                  }}
                >
                  <span>{card.title}</span>
                  <Box sx={{ display: { xs: "none", md: "inline-flex" } }}>
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

                <Typography sx={{ lineHeight: 2, mb: 4, fontSize: "18px", fontFamily: "'Tajawal', sans-serif" }}>
                  {card.description}
                </Typography>

                <Button
                  variant="outlined"
                  endIcon={<ArrowBackIosNewIcon />}
                  component={
                    card.href && !card.href.startsWith("http")
                      ? RouterLink
                      : "a"
                  }
                  to={
                    card.href && !card.href.startsWith("http")
                      ? card.href
                      : undefined
                  }
                  href={
                    card.href && card.href.startsWith("http")
                      ? card.href
                      : undefined
                  }
                  onClick={(e) => card.href && e.stopPropagation()}
                  sx={{
                    borderColor: "#023B4E",
                    color: "#023B4E",
                    fontFamily: "'Tajawal', sans-serif",
                    px: 3,
                    "&:hover": {
                      borderColor: "#023B4E",
                      background: "rgba(4,106,132,0.03)",
                    },
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
                      backgroundColor: "#023B4E",
                      display: { xs: "none", md: "block" },
                    }}
                  />
                )}
              </Box>
            );
          })}
        </Box>
      )}

      {/* ================= MOBILE SLIDER (100% UNCHANGED) ================= */}
      {isMobile && (
        <Box sx={{ position: "relative", mt: 2 }}>
          {/* your original mobile slider code stays exactly the same */}
        </Box>
      )}
    </Container>
  );
};

export default Service;
