// src/Page/Service/Service02.tsx
import React from "react";
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const TAJAWAL = "'Tajawal', sans-serif";

const Service12: React.FC = () => {
  // Scroll to top on mount
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
              backgroundImage: "url('https://i.ibb.co/cq3Fj2K/000.webp')",
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
          mb: { xs: 6, md: 12 },
          direction: "rtl",
          px: { xs: 2, md: 4 },
          fontFamily: TAJAWAL,
        }}
      >
        {/* Content Box */}

        <Box sx={{ position: "relative" }}>
        
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
            borderRadius: 3,
            p: { xs: 5, md: 8 },
            display: "flex",
            flexDirection: "column",
            gap: 3,
            border: "1px solid #F5F5F4",
            background: "#F5F5F4",
            textAlign: "center",
          }}
        >
          {/* Heading */}
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              fontFamily: TAJAWAL,
              color: "#023B4E",
              textAlign: "center",
              mb: { xs: 6, md: 8 },
            }}
          >
            🏡 التقييم العقاري
          </Typography>

          {/* Paragraph */}
          <Typography
            sx={{
              fontWeight: 700,
              fontFamily: TAJAWAL,
              fontSize: { xs: "1.5rem", md: "1.8rem" },
              lineHeight: 1.6,
              color: "#023B4E",
              textAlign: "right",
            }}
          >
            التقييم العقاري هو خطوة أساسية لكل من يود بيع أو شراء أو حتى إعادة
            تمويل عقاره، فهو يساعد في معرفة القيمة السوقية الحقيقية للعقار في وقت
            محدد، بعيدًا عن التقديرات الشخصية أو التخمينات. التقييم لا يقتصر على
            السعر فحسب، بل يأخذ بعين الاعتبار عدة عوامل تُحدد قيمة العقار بدقة،
            مثل:
          </Typography>

          <List
            sx={{
              direction: "rtl",
              textAlign: "right",
              mt: 2,
              fontFamily: TAJAWAL,
            }}
          >
            {[
              "الموقع الجغرافي وأهميته في السوق",
              "مساحة العقار وتصميمه",
              "عمر العقار وحالته الإنشائية",
              "البيئة المحيطة والخدمات المتاحة",
              "الأسعار الحديثة لعقارات مماثلة في المنطقة",
            ].map((text, index) => (
              <ListItem
                key={index}
                sx={{
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  px: 0,
                }}
              >
                {/* Bullet */}
                <Box
                  sx={{
                    minWidth: 24,
                    textAlign: "center",
                    color: "#023B4E",
                    fontSize: "1.3rem",
                    ml: 1.5,
                  }}
                >
                  •
                </Box>

                {/* Text */}
                <ListItemText
                  primary={text}
                  sx={{
                    textAlign: "right",
                    margin: 0,
                  }}
                  primaryTypographyProps={{
                    fontFamily: TAJAWAL,
                    fontSize: "1.2rem",
                    fontWeight: 600,
                    lineHeight: 1.8,
                    color: "#023B4E",
                  }}
                />
              </ListItem>
            ))}
          </List>

          <Typography
            sx={{
              fontWeight: 700,
              fontFamily: TAJAWAL,
              fontSize: { xs: "1.5rem", md: "1.8rem" },
              lineHeight: 1.6,
              color: "#023B4E",
              textAlign: "right",
            }}
          >
            في قسم التقييم العقاري بالموقع، ستجد فريق من المقيمين العقاريين المعتمدين الذين يمتلكون خبرة واسعة في السوق المحلي. خبراؤنا مجهزون بأدوات وتقنيات التقييم المعاصرة، ويستند عملهم إلى مصادر موثوقة وإحصاءات السوق الحالية، لضمان أن تكون تقديراتهم دقيقة ومحايدة.
          </Typography>

          <Typography
            sx={{
              fontWeight: 700,
              fontFamily: TAJAWAL,
              fontSize: { xs: "1.5rem", md: "1.8rem" },
              lineHeight: 1.6,
              color: "#023B4E",
              textAlign: "right",
            }}
          >
            هذا القسم صُمم ليساعدك في:
          </Typography>

          <List
            sx={{
              direction: "rtl",
              textAlign: "right",
              mt: 2,
              fontFamily: TAJAWAL,
            }}
          >
            {[
              "تحديد سعر عرض العقار للبيع بشكل صحيح",
              "فهم القيمة الاستثمارية للعقار",
              "اتخاذ قرارات شرائية سليمة عند البحث عن منزل أو عقار استثماري",
              "تقييم العقار قبل التأجير أو إعادة التقييم حسب تغيّر السوق",
            ].map((text, index) => (
              <ListItem
                key={index}
                sx={{
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  px: 0,
                }}
              >
                {/* Bullet */}
                <Box
                  sx={{
                    minWidth: 24,
                    textAlign: "center",
                    color: "#023B4E",
                    fontSize: "1.3rem",
                    ml: 1.5,
                  }}
                >
                  •
                </Box>

                {/* Text */}
                <ListItemText
                  primary={text}
                  sx={{
                    textAlign: "right",
                    margin: 0,
                  }}
                  primaryTypographyProps={{
                    fontFamily: TAJAWAL,
                    fontSize: "1.2rem",
                    fontWeight: 600,
                    lineHeight: 1.8,
                    color: "#023B4E",
                  }}
                />
              </ListItem>
            ))}
          </List>

          <Typography
            sx={{
              fontWeight: 700,
              fontFamily: TAJAWAL,
              fontSize: { xs: "1.5rem", md: "1.8rem" },
              lineHeight: 1.6,
              color: "#023B4E",
              textAlign: "center",
            }}
          >
            في النهاية التقييم الجيد يعني قرارًا أكثر حكمة، وسوقًا أكثر شفافية وثقة
          </Typography>
        </Box>
      </Box>

      </Container>
    </Box>
  );
};

export default Service12;
