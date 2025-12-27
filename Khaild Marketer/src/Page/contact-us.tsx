// Contactus.tsx
import React from "react";
import { Box, Typography, Container, GlobalStyles } from "@mui/material";
import { Phone, Email } from "@mui/icons-material";

const Contactus: React.FC = () => {
  const fontSizes = {
    title: { xs: "30px", md: "38px" },
    description: { xs: "20px", md: "24px" },
    sectionTitle: { xs: "24px", md: "32px" },
    label: { xs: "18px", md: "22px" },
    value: { xs: "22px", md: "28px" },
  };

  return (
    <Box sx={{ direction: "rtl" }}>
      <GlobalStyles
        styles={{
          "*": { fontFamily: '"Tajawal", sans-serif !important' },
        }}
      />

      <Container maxWidth="lg" sx={{ my: 6, px: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 6,
          }}
        >
          {/* LEFT SECTION */}
          <Box sx={{ flex: 1 }}>
            {/* PAGE TITLE */}
            <Typography
              sx={{
                fontWeight: 800,
                mt: 4,
                mb: 3,
                borderBottom: "3px solid #E5E7EB",
                pb: 1,
                fontSize: fontSizes.title,
              }}
            >
              Khalid Marketer
            </Typography>

            {/* DESCRIPTION */}
            <Typography
              sx={{
                color: "#4B5563",
                mt: 2,
                mb: 5,
                lineHeight: 2,
                fontSize: fontSizes.description,
              }}
            >
              <strong>Khalid Marketer</strong> تواصل معنا لأي معلومات إضافية أو
              استفسارات.
            </Typography>

            {/* CONTACT INFORMATION */}
            <Box>
              <Typography
                sx={{
                  fontWeight: 800,
                  mb: 4,
                  fontSize: fontSizes.sectionTitle,
                }}
              >
                Saudi Arabia - Contact Information
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {[
                  {
                    icon: <Phone sx={{ fontSize: 28 }} />,
                    label: "لبيع وشراء العقارات",
                    value: "057 081 9999",
                  },
                  {
                    icon: <Phone sx={{ fontSize: 28 }} />,
                    label: "استئجار وتسليم واستلام العقارات",
                    value: "057 082 9999",
                  },
                  {
                    icon: <Phone sx={{ fontSize: 28 }} />,
                    label: "لتشطيب العقار",
                    value: "057 083 9999",
                  },
                  {
                    icon: <Phone sx={{ fontSize: 28 }} />,
                    label: "للقسم النسائي",
                    value: "057 084 9999",
                  },
                  {
                    icon: <Phone sx={{ fontSize: 28 }} />,
                    label: "لقسم التمويل العقاري",
                    value: "057 085 9999",
                  },
                  {
                    icon: <Email sx={{ fontSize: 28 }} />,
                    label: "ايميل الموقع",
                    value: "info@waseetaqary.com",
                  },
                ].map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "1fr 24px 1fr",
                      alignItems: "center",
                    }}
                  >
                    {/* ICON + LABEL */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <Box sx={{ color: "#0F172A" }}>{item.icon}</Box>
                      <Typography
                        sx={{
                          fontSize: fontSizes.label,
                          color: "#4B5563",
                          fontWeight: 600,
                        }}
                      >
                        {item.label}
                      </Typography>
                    </Box>

                    {/* COLON */}
                    <Typography
                      sx={{
                        fontSize: fontSizes.label,
                        color: "#4B5563",
                        textAlign: "center",
                        fontWeight: 700,
                      }}
                    >
                      :
                    </Typography>

                    {/* VALUE */}
                    <Typography
                      sx={{
                        fontSize: fontSizes.value,
                        fontWeight: 800,
                        color: "#0F172A",
                        direction: "ltr",
                        unicodeBidi: "bidi-override",
                        letterSpacing: "1.5px",
                      }}
                    >
                      {item.value}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
          <Box sx={{ flex: 1 }} />
        </Box>
      </Container>
    </Box>
  );
};

export default Contactus;
