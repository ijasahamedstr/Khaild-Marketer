// Contactus.tsx
import React from "react";
import { Box, Container, GlobalStyles } from "@mui/material";

const Contactus: React.FC = () => {


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