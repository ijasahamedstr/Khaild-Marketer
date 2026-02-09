// src/components/Footer.tsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Link,
  Divider,
  Button,
} from "@mui/material";

// تعريف متغير الخط
const TAJAWAL = "'Tajawal', sans-serif";

const Footer: React.FC = () => {

  const navLinks = ["الرئيسية", "معرض المشاريع", "المشاريع", "الخبرات", "اتصل بنا"];

  return (
    <Box component="footer" sx={{ direction: "rtl", fontFamily: TAJAWAL }}>
      {/* Main Footer Section */}
      <Box sx={{ background: "#023B4E", color: "#fff", py: { xs: 6, sm: 8 }, px: { xs: 3, sm: 6 } }}>
        <Container   maxWidth={false}
          sx={{ maxWidth: 1700, px: { xs: 3, sm: 6 } }}>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", alignItems: { xs: "center", md: "flex-start" }, gap: 6, textAlign: { xs: "center", md: "right" } }}>
            
            {/* Column 1: Logo & Social */}
            <Box sx={{ flexBasis: { xs: "100%", md: "22%" }, display: "flex", flexDirection: "column", alignItems: { xs: "center", md: "flex-end" }, gap: 3 }}>
              <Box component="img" src="https://i.ibb.co/XR3RFDD/logo-DAR.webp" alt="شعار الشركة" sx={{ width: { xs: 180, sm: 200, md: 240 }, height: "auto", mb: 2 }} />
            </Box>

            <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", md: "block" }, borderColor: "rgba(255,255,255,0.25)" }} />

            {/* Column 2: Address */}
            <Box sx={{ flexBasis: { xs: "100%", md: "22%" }, pt: { xs: 4, md: 8 } }}>
              <Typography variant="h6" sx={{ mb: 2, fontSize: "1.2rem", fontWeight: 700, fontFamily: TAJAWAL }}>
                العنوان
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 2, fontSize: "1rem", maxWidth: 280, direction: "rtl", fontFamily: TAJAWAL }}>
                Khalid Marketer
                <br />
                ص.ب 23693
                <br />
                هاتف: <Box component="span" sx={{ direction: "ltr", unicodeBidi: "bidi-override", fontWeight: 700, fontFamily: TAJAWAL }}>+966 000 000 0000</Box>
                <br />
               المملكة العربية السعودية - الدمام - حي البادية - شارع المستشفى
                <br />
               
              </Typography>
            </Box>

            <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", md: "block" }, borderColor: "rgba(255,255,255,0.25)" }} />

            {/* Column 3: Contact */}
            <Box sx={{ flexBasis: { xs: "100%", md: "18%" }, pt: { xs: 4, md: 8 } }}>
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

            {/* <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", md: "block" }, borderColor: "rgba(255,255,255,0.25)" }} /> */}

            {/* Column 4: Opening Hours */}
            {/* <Box sx={{ flexBasis: { xs: "100%", md: "18%" } }}>
            </Box> */}

            {/* <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", md: "block" }, borderColor: "rgba(255,255,255,0.25)" }} /> */}

            {/* Column 5: Partners */}

            <Box sx={{ flexBasis: { xs: "100%", md: "20%" }, mt: { xs: 0, md: "150px" } }}>
            <Box
              role="list"
              sx={{
                display: "flex",
                flexWrap: "nowrap",
                gap: 3,
                alignItems: "center",
                overflowX: "auto",
                pb: 2,
              }}
            >
            </Box>
          </Box>        
          </Box>
        </Container>
      </Box>

      {/* Bottom Bar */}
      <Box sx={{ backgroundColor: "#001f26", py: 3 }}>
        <Container maxWidth="xl" sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: "center", gap: 2, color: "#fff" }}>
          <Typography variant="body1" sx={{ fontSize: "1rem", fontFamily: TAJAWAL }}>
            Copyright © 2026 | Khalid Marketer All rights reserved
          </Typography>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {navLinks.map((text, index, array) => (
              <React.Fragment key={text}>
                <Link href="#" underline="hover" sx={{ fontSize: "1.05rem", color: "#FFF", "&:hover": { color: "#9eefff" }, fontFamily: TAJAWAL }}>
                  {text}
                </Link>
                {index < array.length - 1 && <Typography component="span" sx={{ mx: 1, fontFamily: TAJAWAL }}>|</Typography>}
              </React.Fragment>
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
