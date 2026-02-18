// Contactus.tsx
import React from "react";
import { Box, Typography, Container, GlobalStyles } from "@mui/material";

const Contactus: React.FC = () => {
  const fontSizes = {
    title: { xs: "30px", md: "44px" }, // Slightly increased for XL layout
    description: { xs: "20px", md: "26px" },
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

      {/* CHANGED TO maxWidth="xl" FOR MAXIMUM WIDTH */}
      <Container maxWidth="xl" sx={{ my: 8, px: { xs: 3, md: 6 } }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 8,
          }}
        >
          {/* LEFT SECTION - SET TO FLEX 3 TO DOMINATE THE SCREEN */}
          <Box sx={{ flex: 3 }}> 
            {/* PAGE TITLE */}
            <Typography
              sx={{
                fontWeight: 900, // Thicker for XL look
                mt: 4,
                mb: 3,
                borderBottom: "4px solid #E5E7EB",
                pb: 1,
                fontSize: fontSizes.title,
                width: "fit-content"
              }}
            >
              Khalid Marketer
            </Typography>

            {/* DESCRIPTION */}
            <Typography
              sx={{
                color: "#4B5563",
                mt: 2,
                mb: 6,
                lineHeight: 2,
                fontSize: fontSizes.description,
                maxWidth: "800px" // Keeps text readable on XL screens
              }}
            >
              <strong>Khalid Marketer</strong> تواصل معنا لأي معلومات إضافية أو
              استفسارات.
            </Typography>

            {/* --- XL IMAGE SECTION --- */}
            <Box 
              sx={{ 
                width: "100%", 
                position: "relative", 
                overflow: "hidden",
                borderRadius: "24px", // More pronounced curve for XL
                boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
                backgroundColor: "#f9fafb"
              }}
            >
              {/* Inset Shadow Overlay */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 1,
                  pointerEvents: 'none',
                  boxShadow: "inset 0 0 30px rgba(0, 0, 0, 0.2)",
                }}
              />

              {/* Main Banner Image */}
              <Box
                component="img"
                src="https://i.ibb.co/VYgM4n7L/compressed-01-jpg.jpg"
                alt="main-slide"
                sx={{
                  width: "100%", 
                  height: "auto",
                  maxHeight: "800px", // Prevents it from becoming too tall
                  display: "block",
                  objectFit: "cover",
                }}
              />
            </Box>
          </Box>

          {/* RIGHT SECTION - MINIMAL FLEX FOR XL BALANCE */}
          <Box sx={{ flex: 0.5, display: { xs: "none", lg: "block" } }} />
        </Box>
      </Container>
    </Box>
  );
};

export default Contactus;