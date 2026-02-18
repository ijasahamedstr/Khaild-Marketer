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

/* ================= ANIMATIONS ================= */

// const floatUp = keyframes`
//   0% { transform: translateY(0); }
//   50% { transform: translateY(-6px); }
//   100% { transform: translateY(0); }
// `;

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

const TAJAWAL = "'Tajawal', sans-serif";

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
      "نساعدك في إيجاد العقار الأمثل وفق احتياجك وميزانيتك، من خلال شبكة واسعة من العروض العقارية، مع تقديم استشارات لضمان قرارك الإستثماري أو السكني.",
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
      "نقدم خدمة التشطيب المتكامل للعقارات، بأفضل المواد والمعايير، لتسكن أو تستثمر في مساحة تعكس ذوقك وقيمتك.",
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
      "تحكيم تجاري لحل النزاعات بكل احترافية. اطلب خدمة محكّم معتمد واحمِ حقوقك بثقة",
    href: "/services/محكم معتمد",
  },
  {
    id: 8,
    title: "خدمات التوثيق",
    description:
      "نوفر خدمة التوثيق والتسجيل العيني للعقارات لضمان حقوق جميع الأطراف",
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
    id: 12,
    title: "التقييم العقاري",
    description: "نقدّم لك خدمة تقييم عقاري دقيقة ومعتمدة تساعدك في اتخاذ القرار الصحيح. اعرف القيمة الحقيقية لعقارك من أهل الخبرة والاختصاص.",
    href: "/services/التقييم العقاري",
  },
  {
    id: 13,
    title: "تملّك الأجانب للعقارات  ",
    description: "نوفر لك المعلومات والإجراءات الرسمية لتملّك العقارات لغير السعوديين. نرشدك خطوة بخطوة لتحقيق حلم التملّك داخل المملكة.",
    href: "/services/تملّك الأجانب للعقارات ",
  },
  {
    id: 14,
    title: " الوقف العقاري",
    description: " يضم نخبة من المختصين للرد على استفساراتكم حول عقارات الوقف بيع وشراء وتأجير العقارات الوقفية وبما يتوافق مع الأنظمة الشرعية والتنظيمية.",
    href: "/services/الوقف العقاري",
  },
  {
    id: 11,
    title: "قسم التمويل العقاري",
    description:
      "نُقدم استشارات مهنية لتوجيه عملائنا نحو خيارات التمويل العقاري الأنسب، من خلال ربطهم مع الجهات التمويلية المعتمدة ومساعدتهم في اتخاذ قرارات مبنية على احتياجاتهم وقدراتهم، بكل شفافية ومصداقية.",
    href: "/services/قسم التمويل العقاري",
  },
  {
    id: 10,
    title: "القسم النسائي",
    description:
      "انطلاقًا من إيماننا بأهمية الخصوصية وراحة التعامل، تم تخصيص قسم نسائي مستقل، يُدار بكوادر نسائية مؤهلة، لتمكين المرأة من مناقشة تفاصيل عقاراتها بكل ارتياح وثقة، في بيئة تراعي احتياجاتها وتلبي تطلعاتها.",
    href: "/services/القسم النسائي",
  },
];

/* ================= COMPONENT ================= */

const Service: React.FC = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const sliderRef = React.useRef<HTMLDivElement | null>(null);
  const [cardWidth, setCardWidth] = React.useState(0);
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const scrollToIndex = (index: number) => {
    const el = sliderRef.current;
    if (!el || cardWidth === 0) return;
    el.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });
    setCurrentIndex(index);
  };

  const scrollByCard = (direction: "left" | "right") => {
    const nextIndex =
      direction === "right"
        ? Math.min(currentIndex + 1, serviceCards.length - 1)
        : Math.max(currentIndex - 1, 0);
    scrollToIndex(nextIndex);
  };

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

  const handleCardClick = (href?: string) => {
    if (!href) return;
    if (href.startsWith("http")) {
      window.open(href, "_blank");
    } else {
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
        fontFamily: TAJAWAL,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          color: "#003c46",
          mb: 3,
          textAlign: "right",
          fontFamily: TAJAWAL,
          background: "linear-gradient(90deg, rgba(2,59,78,1), rgba(4,106,132,1))",
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
          background: "linear-gradient(90deg, rgba(2,59,78,0), rgba(2,59,78,0.6), rgba(2,59,78,0))",
        }}
      />

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
          {serviceCards.map((card) => {
            const isCenterWide = card.id === 11 || card.id === 10;
            const isId10 = card.id === 10;

            return (
              <Box
                key={card.id}
                onClick={() => handleCardClick(card.href)}
                role={card.href ? "button" : undefined}
                tabIndex={card.href ? 0 : -1}
                sx={{
                  position: "relative",
                  textAlign: "right",
                  p: 3,
                  borderRadius: 2,
                  transition: "transform 0.36s cubic-bezier(.2,.9,.2,1), box-shadow 0.36s",
                  boxShadow: "0 14px 34px rgba(2,59,78,0.14)",
                  cursor: card.href ? "pointer" : "default",
                  gridColumn: isCenterWide ? { md: "2 / span 1" } : "auto",
                  width: isCenterWide ? { xs: "100%", md: isId10 ? "170%" : "130%" } : "100%",
                  justifySelf: isCenterWide ? "center" : "stretch",
                  maxWidth: isCenterWide ? { xs: "100%", md: card.id === 11 ? "none" : "1100px" } : "100%",
                  
                  /* LOGIC FOR ID 10: CLEAN IMAGE */
                  background: isId10
                    ? `url("https://i.ibb.co/Y4bB1Ptk/Gemini-Generated-Image-iu1j9fiu1j9fiu1j.png")`
                    : `linear-gradient(145deg, #CAD5E2 0%, #a2adbbff 45%, #E4E4E7 100%)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",

                  "&:hover": {
                    transform: card.href ? "translateY(-8px)" : undefined,
                    boxShadow: card.href ? "0 22px 50px rgba(2,59,78,0.12)" : undefined,
                  },
                }}
              >
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
                    fontFamily: TAJAWAL,
                    textShadow: isId10 ? "0px 2px 4px rgba(255,255,255,0.8)" : "none",
                  }}
                >
                  <span>{card.title}</span>
                  <ArrowBackIosNewIcon sx={{ transform: "rotateY(180deg)", display: { xs: "none", md: "block" } }} />
                </Typography>

                <Typography
                  sx={{
                    lineHeight: 2,
                    mb: 4,
                    fontSize: "18px",
                    fontFamily: TAJAWAL,
                    color: "#000",
                    fontWeight: isId10 ? 700 : 500,
                  }}
                >
                  {card.description}
                </Typography>

                <Button
                  variant="outlined"
                  sx={{
                    borderColor: "#023B4E",
                    color: "#023B4E",
                    fontFamily: TAJAWAL,
                    px: 3,
                    backgroundColor: isId10 ? "rgba(255,255,255,0.6)" : "transparent",
                    "&:hover": { background: "rgba(4,106,132,0.1)" },
                  }}
                >
                  اكتشف المزيد
                </Button>
              </Box>
            );
          })}
        </Box>
      )}

      {isMobile && (
        <Box sx={{ position: "relative", mt: 4 }}>
          <IconButton onClick={() => scrollByCard("right")} disabled={currentIndex === 0} sx={{ position: "absolute", right: 6, top: "40%", zIndex: 2 }}>
            <ArrowForwardIosIcon />
          </IconButton>
          <IconButton onClick={() => scrollByCard("left")} disabled={currentIndex === serviceCards.length - 1} sx={{ position: "absolute", left: 6, top: "40%", zIndex: 2, transform: "rotate(180deg)" }}>
            <ArrowForwardIosIcon />
          </IconButton>

          <Box
            ref={sliderRef}
            sx={{
              display: "flex",
              gap: 2,
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {serviceCards.map((card) => (
              <Box
                key={card.id}
                sx={{
                  flex: "0 0 86%",
                  scrollSnapAlign: "center",
                  p: 3,
                  borderRadius: 2,
                  boxShadow: "0 14px 34px rgba(2,59,78,0.14)",
                  background: card.id === 10 
                    ? `url("https://i.ibb.co/svgXHBTW/Pi7-image-tool.webp")` 
                    : `linear-gradient(145deg, #CAD5E2 0%, #a2adbbff 45%, #E4E4E7 100%)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <Typography variant="h6" sx={{ mb: 2, fontFamily: TAJAWAL, fontWeight: 700 }}>
                  {card.title}
                </Typography>
                <Typography sx={{ mb: 3, fontFamily: TAJAWAL, color: "#000" }}>
                  {card.description}
                </Typography>
                <Button variant="outlined" component={RouterLink} to={card.href || "#"} sx={{ fontFamily: TAJAWAL, backgroundColor: card.id === 10 ? "rgba(255,255,255,0.6)" : "transparent" }}>
                  اكتشف المزيد
                </Button>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default Service;