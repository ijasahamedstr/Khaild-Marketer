// src/components/Footer.tsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Divider,
  Button,
} from "@mui/material";

const TAJAWAL = "'Tajawal', sans-serif";

const Footer: React.FC = () => {


  return (
    <Box component="footer" sx={{ direction: "rtl", fontFamily: TAJAWAL }}>
      {/* Main Footer Section */}
      <Box sx={{ background: "#023B4E", color: "#fff", py: { xs: 6, sm: 8 } }}>
        {/* Updated Container for better Large Screen (lg) behavior */}
        <Container maxWidth="lg" sx={{ px: { xs: 3, sm: 6 } }}>
          <Box 
            sx={{ 
              display: "flex", 
              flexDirection: { xs: "column", md: "row" }, 
              justifyContent: "space-between", 
              alignItems: { xs: "center", md: "flex-start" }, 
              gap: { xs: 4, md: 2 }, 
              textAlign: { xs: "center", md: "right" } 
            }}
          >
            
            {/* Column 1: Logo & Social */}
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: { xs: "center", md: "flex-start" }, gap: 2 }}>
              <Box 
                component="img" 
                src="https://i.ibb.co/XR3RFDD/logo-DAR.webp" 
                alt="شعار الشركة" 
                sx={{ width: { xs: 180, md: 220 }, height: "auto" }} 
              />
            </Box>

            <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", md: "block" }, borderColor: "rgba(255,255,255,0.1)" }} />

            {/* Column 2: Address */}
            <Box sx={{ flex: 1, px: { md: 4 } }}>
              <Typography variant="h6" sx={{ mb: 2, fontSize: "1.2rem", fontWeight: 700, fontFamily: TAJAWAL }}>
                العنوان
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: "0.95rem", fontFamily: TAJAWAL }}>
                Khalid Marketer
                <br />
                ص.ب 23693
                <br />
                هاتف: <Box component="span" sx={{ direction: "ltr", unicodeBidi: "bidi-override", fontWeight: 700 }}>+966 000 000 0000</Box>
                <br />
                المملكة العربية السعودية - الدمام
                <br />
                حي البادية - شارع المستشفى
              </Typography>
            </Box>

            <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", md: "block" }, borderColor: "rgba(255,255,255,0.1)" }} />

            {/* Column 3: Contact Button */}
               <Box sx={{ flexBasis: { xs: "100%", md: "18%" } }}>
             <Typography
              variant="h6"
              sx={{
                mb: 2,
                fontSize: "2rem",     
                fontWeight: 700,
                fontFamily: TAJAWAL,
                textAlign: "center",    
              }}
            >
              للشكاوى
            </Typography>

               <Button
                  variant="contained"
                  startIcon={
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                      alt="WhatsApp"
                      style={{ width: 24, height: 24 }}
                    />
                  }
                  sx={{
                    gap: 1.5,               // space between icon and text
                    textTransform: "none",   // keeps text normal
                    fontSize: "1.5rem",
                    fontFamily: TAJAWAL,
                    width: 300,              // increase button width
                    background: "linear-gradient(135deg, #023B4E 0%, #06f9f3 100%)",
                    "&:hover": {
                      background: "linear-gradient(135deg, #06f9f3 0%, #023B4E 100%)", // hover effect
                    },
                    borderRadius: 3,         // rounded corners
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                  }}
                  onClick={() =>
                    window.open("https://wa.me/+966505868888?text=مرحبا", "_blank")
                  }
                >
                  اضغط هنا
                </Button>

            </Box>
          </Box>
        </Container>
      </Box>

      {/* Bottom Bar */}
      <Box sx={{ backgroundColor: "#001f26", py: 2 }}>
        <Container maxWidth="lg" sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: "center", gap: 2, color: "#fff" }}>
          <Typography variant="body2" sx={{ opacity: 0.8, fontFamily: TAJAWAL }}>
            Copyright © 2026 | Khalid Marketer All rights reserved
          </Typography>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;