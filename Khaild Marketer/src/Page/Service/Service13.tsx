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

const Service13: React.FC = () => {
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
        backgroundColor: "#D1D5DC",
        py: { xs: 2, md: 4 },
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
        <Box
          sx={{
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
            🌍 تملّك الأجانب للعقارات في السعودية
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
          خلال السنوات الماضية، شهدت المملكة العربية السعودية تغييرات كبيرة في سياساتها العقارية من أجل جذب المزيد من الاستثمار الأجنبي وتفعيل دور السوق العقاري في دعم الاقتصاد وفق رؤية 2030. جزء مهم من هذه التغييرات هو نظام تملّك غير السعوديين للعقار الذي أُقرّ حديثًا، ويعد من أهم التطورات التشريعية في سوق العقار السعودي. 
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
         📌 ما الذي ينص عليه القانون الجديد؟  
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
            "يسمح القانون لغير السعودي تملّك عقار أو اكتساب الحقوق العينية داخل المملكة في النطاق الجغرافي الذي يحدده مجلس الوزراء.",
            "المقيمون نظاميًا يحق لهم تملّك عقار للسكن الخاص بعد الحصول على الترخيص اللازم من الجهات الرسمية.",
            "بالنسبة للعقارات في مكة المكرّمة والمدينة المنوّرة، فإن التملك متاح فقط للأشخاص ذوي الصفة الطبيعية من المسلمين وفق ضوابط مُحددة.",
            "تسمح اللائحة التنفيذية أيضًا بتملك الحقوق العينية الأخرى مثل الانتفاع والإيجار طويل الأمد بعد التسجيل لدى السجل العقاري",
            "ستعلن الوثيقة الرسمية لاحقًا المناطق الجغرافية المسموح فيها بالملكية الأجنبية*وتفاصيل نسب الملكية",
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
         📌 لماذا هذا النظام مهم؟ 
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
         يأتي القانون الجديد في إطار جهود المملكة لتوسيع دور الاستثمار الأجنبي في قطاع العقار، وتنويع مصادر الدخل الوطني وتعزيز النمو الاقتصادي في قطاعات غير النفط، وهو ما يتماشى مع برامج رؤية السعودية 2030.
          </Typography>

        </Box>
      </Container>





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
        <Box
          sx={{
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
            📌 *بعض الشروط العامة التي تهم المتملك الأجنبي: 
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
         يجب أن يكون لدى غير السعودي إقامة نظامية أو تصريح قانوني بحسب نوع التملك والغرض منه.  
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
            "يمكن أن تُطبّق ضوابط إضافية على العقارات التجارية أو الاستثمارية، وقد تتطلب موافقات خاصة من وزارة الداخلية أو الجهات المختصة",
            "في بعض الحالات يتعين على المستثمر تقديم دليل على قدرته المالية أو الالتزام بالشروط النظامية لتسجيل الملكية",

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
         📌 فرص ومزايا التملك:  
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
            "تتيح هذه السياسة الجديدة غير السعوديين فرصة الاستقرار السكني أو الاستثمار العقاري في السعودية في مناطق محددة",
            "توضح التشريعات أن السوق سيكون أكثر انفتاحًا مع تنظيمات واضحة ومدروسة.",

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
          
        </Box>
      </Container>
    </Box>
  );
};

export default Service13;
