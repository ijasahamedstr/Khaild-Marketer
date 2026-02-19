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
import { useNavigate } from "react-router-dom";

/* ================= ANIMATIONS ================= */
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
  { id: 1, title: " بيع العقار  ", description: "نقدم لك خدمة بيع عقارك بأفضل الأدوات التسويقية، ونستهدف الفئة المناسبة لضمان بيع سريع وبأعلى سعر ممكن، مع متابعة كاملة حتى إتمام العملية.", href: "/services/بيع العقار" },
  { id: 2, title: "شراء العقار", description: "نساعدك في إيجاد العقار الأمثل وفق احتياجك وميزانيتك، من خلال شبكة واسعة من العروض العقارية، مع تقديم استشارات لضمان قرارك الإستثماري أو السكني.", href: "/services/شراء العقار" },
  { id: 3, title: "إيجار العقار", description: "نوفر لك خيارات متعددة من الوحدات السكنية أو التجارية للإيجار، مع متابعة دقيقة لكافة الإجراءات لتضمن تجربة سلسة وموثوقة.", href: "/services/إيجار العقار" },
  { id: 4, title: "تشطيب العقار", description: "نقدم خدمة التشطيب المتكامل للعقارات، بأفضل المواد والمعايير، لتسكن أو تستثمر في مساحة تعكس ذوقك وقيمتك.", href: "/services/تشطيب العقار" },
  { id: 5, title: "تسليم واستلام العقار", description: "نقوم بتمثيلك في استلام العقار أو تسليمه، ونتحقق من مطابقة المواصفات، لضمان حماية حقوقك وضمان جودة العقار كما تم الاتفاق عليه.", href: "/services/تسليم واستلام العقار" },
  { id: 7, title: " النظام يجيب", description: "في هذا القسم، نسلّط الضوء بشكل دوري على أبرز الأنظمة واللوائح العقارية، لنقدّم لمتابعينا محتوى توعوي يُثري معرفتهم ويعزز وعيهم قبل اتخاذ أي قرار.", href: "/services/النظام يجيب" },
  { id: 6, title: "محكّم معتمد", description: "تحكيم تجاري لحل النزاعات بكل احترافية. اطلب خدمة محكّم معتمد واحمِ حقوقك بثقة", href: "/services/محكم معتمد" },
  { id: 8, title: "خدمات التوثيق", description: "نوفر خدمة التوثيق والتسجيل العيني للعقارات لضمان حقوق جميع الأطراف", href: "/services/خدمات التوثيق" },
  { id: 9, title: "خدمات التصوير العقاري", description: "نوفر تصويرًا احترافيًا للعقار يعكس جماله ويعزز فرص البيع أو التأجير بشكل جذاب ودقيق.", href: "/services/خدمات التصوير العقاري" },
  { id: 12, title: "التقييم العقاري", description: "نقدّم لك خدمة تقييم عقاري دقيقة ومعتمدة تساعدك في اتخاذ القرار الصحيح. اعرف القيمة الحقيقية لعقارك من أهل الخبرة والاختصاص.", href: "/services/التقييم العقاري" },
  { id: 13, title: "تملّك الأجانب للعقارات  ", description: "نوفر لك المعلومات والإجراءات الرسمية لتملّك العقارات لغير السعوديين. نرشدك خطوة بخطوة لتحقيق حلم التملّك داخل المملكة.", href: "/services/تملّك الأجانب للعقارات " },
  { id: 14, title: " الوقف العقاري", description: " يضم نخبة من المختصين للرد على استفساراتكم حول عقارات الوقف بيع وشراء وتأجير العقارات الوقفية وبما يتوافق مع الأنظمة الشرعية والتنظيمية.", href: "/services/الوقف العقاري" },
  { id: 11, title: "قسم التمويل العقاري", description: "نُقدم استشارات مهنية لتوجيه عملائنا نحو خيارات التمويل العقاري الأنسب، من خلال ربطهم مع الجهات التمويلية المعتمدة ومساعدتهم في اتخاذ قرارات مبنية على احتياجاتهم وقدراتهم، بكل شفافية ومصداقية.", href: "/services/قسم التمويل العقاري" },
];

const Service: React.FC = () => {
  const navigate = useNavigate();

  const handleCardClick = (href?: string) => {
    if (!href) return;
    navigate(href);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 6, mb: 10, direction: "rtl", px: { xs: 2, md: 4 }, fontFamily: TAJAWAL }}>
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

      <Box component="hr" sx={{ border: "none", height: "2px", mb: 6, background: "linear-gradient(90deg, rgba(2,59,78,0), rgba(2,59,78,0.6), rgba(2,59,78,0))" }} />

      {/* Main Grid */}
      <Box sx={{ 
        display: "grid", 
        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }, 
        gap: { xs: 3, md: 6 }, 
        alignItems: "start" 
      }}>
        {serviceCards.map((card) => {
          const isCenterWide = card.id === 11;
          return (
            <Box
              key={card.id}
              onClick={() => handleCardClick(card.href)}
              sx={{
                textAlign: "right",
                p: 3,
                borderRadius: 2,
                transition: "transform 0.36s cubic-bezier(.2,.9,.2,1), box-shadow 0.36s",
                boxShadow: "0 14px 34px rgba(2,59,78,0.14)",
                cursor: "pointer",
                // Grid Logic for ID 11
                gridColumn: isCenterWide ? { md: "2 / span 1" } : "auto",
                width: isCenterWide ? { xs: "100%", md: "130%" } : "100%",
                justifySelf: isCenterWide ? "center" : "stretch",
                
                background: `linear-gradient(145deg, #CAD5E2 0%, #a2adbbff 45%, #E4E4E7 100%)`,
                "&:hover": { 
                  transform: "translateY(-8px)", 
                  boxShadow: "0 22px 50px rgba(2,59,78,0.12)" 
                },
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: "#003c46", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "25px", fontFamily: TAJAWAL }}>
                <span>{card.title}</span>
                <ArrowBackIosNewIcon sx={{ transform: "rotateY(180deg)", display: { xs: "none", md: "block" } }} />
              </Typography>
              <Typography sx={{ lineHeight: 2, mb: 4, fontSize: "18px", fontFamily: TAJAWAL, color: "#000", fontWeight: 500 }}>
                {card.description}
              </Typography>
              <Button variant="outlined" sx={{ borderColor: "#023B4E", color: "#023B4E", fontFamily: TAJAWAL, px: 3, "&:hover": { background: "rgba(4,106,132,0.1)" } }}>
                اكتشف المزيد
              </Button>
            </Box>
          );
        })}
      </Box>

      {/* ================= SEPARATED ID 10 SECTION (MOBILE RESPONSIVE) ================= */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <Box
          onClick={() => navigate("/services/القسم النسائي")}
          sx={{
            /* RESPONSIVE DIMENSIONS */
            width: { xs: "100%", md: "900px" }, 
            height: { xs: "220px", sm: "280px", md: "310px" }, 
            
            borderRadius: 2,
            cursor: "pointer",
            transition: "transform 0.36s cubic-bezier(.2,.9,.2,1), box-shadow 0.36s",
            boxShadow: "0 14px 34px rgba(2,59,78,0.2)",
            
            /* BACKGROUND SETTINGS */
            background: `url("https://i.ibb.co/svgXHBTW/Pi7-image-tool.webp")`,
            backgroundSize: { xs: "contain", md: "cover" }, // Contain on mobile, Cover on desktop
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundColor: "#fcfcfc", // Blends with the image edges on 'contain'

            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            pb: 5,

            "&:hover": { 
              transform: "translateY(-8px)", 
              boxShadow: "0 22px 50px rgba(2,59,78,0.25)" 
            },
          }}
        />
      </Box>
    </Container>
  );
};

export default Service;