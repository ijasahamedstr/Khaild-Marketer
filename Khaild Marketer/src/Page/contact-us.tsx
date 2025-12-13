// Contactus.tsx
import React from "react";
import { Box, Typography, Container, GlobalStyles } from "@mui/material";
import { Phone, Email } from "@mui/icons-material";

const Contactus: React.FC = () => {
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
            <Typography
              sx={{
                fontWeight: 700,
                mt: 4,
                mb: 2,
                borderBottom: "3px solid #E5E7EB",
                pb: 0.5,
                fontSize: "28px",
              }}
            >
              Khalid Marketer
            </Typography>

            <Typography
              sx={{
                color: "#4B5563",
                mt: 2,
                mb: 4,
                lineHeight: 1.9,
                fontSize: "20px",
              }}
            >
              <strong>Khalid Marketer</strong> تواصل معنا لأي معلومات إضافية أو
              استفسارات.
            </Typography>

            {/* CONTACT INFORMATION */}
            <Box>
              <Typography sx={{ fontWeight: 700, mb: 3, fontSize: "22px" }}>
                Saudi Arabia - Contact Information
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {[
                  {
                    icon: <Phone sx={{ fontSize: 22 }} />,
                    label: "لبيع وشراء العقارات",
                    value: "057 081 9999",
                  },
                  {
                    icon: <Phone sx={{ fontSize: 22 }} />,
                    label: "استئجار وتسليم واستلام العقارات",
                    value: "057 082 9999",
                  },
                  {
                    icon: <Phone sx={{ fontSize: 22 }} />,
                    label: "لتشطيب العقار",
                    value: "057 083 9999",
                  },
                  {
                    icon: <Phone sx={{ fontSize: 22 }} />,
                    label: "للقسم النسائي",
                    value: "057 084 9999",
                  },
                  {
                    icon: <Phone sx={{ fontSize: 22 }} />,
                    label: "لقسم التمويل العقاري",
                    value: "057 085 9999",
                  },
                  {
                    icon: <Email sx={{ fontSize: 22 }} />,
                    label: "ايميل الموقع",
                    value: "info@waseetaqary.com",
                  },
                ].map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "1fr 24px 1fr", // ✅ 3 COLUMNS
                      alignItems: "center",
                    }}
                  >
                    {/* COLUMN 1 – ICON + TEXT */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box sx={{ color: "#0F172A" }}>{item.icon}</Box>
                      <Typography
                        sx={{
                          fontSize: "18px",
                          color: "#4B5563",
                        }}
                      >
                        {item.label}
                      </Typography>
                    </Box>

                    {/* COLUMN 2 – : */}
                    <Typography
                      sx={{
                        fontSize: "18px",
                        color: "#4B5563",
                        textAlign: "center",
                      }}
                    >
                      :
                    </Typography>

                    {/* COLUMN 3 – NUMBER / EMAIL */}
                    <Typography
                      sx={{
                        fontSize: "20px",
                        fontWeight: 700,
                        color: "#0F172A",
                        direction: "ltr",
                        unicodeBidi: "bidi-override",
                        letterSpacing: "1px",
                      }}
                    >
                      {item.value}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>

          {/* RIGHT SECTION */}
          <Box sx={{ flex: 1 }} />
        </Box>
      </Container>
    </Box>
  );
};

export default Contactus;
