// src/components/Footer.tsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Link,
  IconButton,
  Divider,
} from "@mui/material";
import { Facebook, Instagram, Email, Phone } from "@mui/icons-material";

// تعريف متغير الخط
const TAJAWAL = "'Tajawal', sans-serif";

const Footer: React.FC = () => {
  const socialItems = [
    { icon: <Phone sx={{ fontSize: 28 }} />, link: "#", label: "اتصال" },
    { icon: <Email sx={{ fontSize: 28 }} />, link: "#", label: "بريد" },
    { icon: <Facebook sx={{ fontSize: 28 }} />, link: "https://facebook.com", label: "فيسبوك" },
    { icon: <Instagram sx={{ fontSize: 28 }} />, link: "https://instagram.com", label: "انستجرام" },
  ];

  const partners = [
    {
      src: "https://alrossais.com/wp-content/uploads/2025/06/logo-5-150x150.png",
      alt: "Partner 1",
      href: "#",
      label: "شريك 1",
    },
    {
      src: "https://alrossais.com/wp-content/uploads/2025/09/ejar-4.png",
      alt: "Partner 2",
      href: "#",
      label: "شريك 2",
    },
  ];

  const navLinks = ["الرئيسية", "معرض المشاريع", "المشاريع", "الخبرات", "اتصل بنا"];

  return (
    <Box component="footer" sx={{ direction: "rtl", fontFamily: TAJAWAL }}>
      {/* Main Footer Section */}
      <Box sx={{ background: "#023B4E", color: "#fff", py: { xs: 6, sm: 8 }, px: { xs: 3, sm: 6 } }}>
        <Container maxWidth="xl">
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", alignItems: { xs: "center", md: "flex-start" }, gap: 6, textAlign: { xs: "center", md: "right" } }}>
            
            {/* Column 1: Logo & Social */}
            <Box sx={{ flexBasis: { xs: "100%", md: "22%" }, display: "flex", flexDirection: "column", alignItems: { xs: "center", md: "flex-end" }, gap: 3 }}>
              <Box component="img" src="https://i.ibb.co/yn0gbKdZ/Gemini-Generated-Image-pua0mbpua0mbpua0-removebg-preview.png" alt="شعار الشركة" sx={{ width: { xs: 180, sm: 200, md: 240 }, height: "auto", mb: 2 }} />
              <Typography variant="body1" sx={{ fontWeight: 700, fontSize: "1.1rem", fontFamily: TAJAWAL }}>
                تواصل معنا
              </Typography>
              <Box sx={{ display: "flex", gap: 1.5, justifyContent: "center" }}>
                {socialItems.map((item, index) => (
                  <IconButton
                    key={index}
                    href={item.link}
                    target="_blank"
                    sx={{
                      color: "#fff",
                      backgroundColor: "rgba(255,255,255,0.2)",
                      transition: "0.3s",
                      "&:hover": { backgroundColor: "#fff", color: "#023B4E", transform: "scale(1.2)" },
                      width: 48,
                      height: 48,
                    }}
                    aria-label={item.label}
                  >
                    {item.icon}
                  </IconButton>
                ))}
              </Box>
            </Box>

            <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", md: "block" }, borderColor: "rgba(255,255,255,0.25)" }} />

            {/* Column 2: Address */}
            <Box sx={{ flexBasis: { xs: "100%", md: "22%" } }}>
              <Typography variant="h6" sx={{ mb: 2, fontSize: "1.2rem", fontWeight: 700, fontFamily: TAJAWAL }}>
                العنوان
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 2, fontSize: "1rem", maxWidth: 280, direction: "rtl", fontFamily: TAJAWAL }}>
                Khalid Marketer
                <br />
                ص.ب 23693
                <br />
                هاتف: <Box component="span" sx={{ direction: "ltr", unicodeBidi: "bidi-override", fontWeight: 700, fontFamily: TAJAWAL }}>+974 000 000 0000</Box>
                <br />
                المنتزه، شارع الروابي، الدوحة
                <br />
                مكتب الدوحة - قطر
              </Typography>
            </Box>

            <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", md: "block" }, borderColor: "rgba(255,255,255,0.25)" }} />

            {/* Column 3: Contact */}
            <Box sx={{ flexBasis: { xs: "100%", md: "18%" } }}>
              <Typography variant="h6" sx={{ mb: 2, fontSize: "1.2rem", fontWeight: 700, fontFamily: TAJAWAL }}>
                التواصل
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 2, fontSize: "1rem", direction: "ltr", fontFamily: TAJAWAL }}>
                +966 000 000 0000<br />
                <Link href="mailto:info@almtcqatar.com" underline="hover" color="inherit" sx={{ "&:hover": { color: "#9eefff" }, fontFamily: TAJAWAL }}>
                  info@almtcqatar.com
                </Link>
              </Typography>
            </Box>

            <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", md: "block" }, borderColor: "rgba(255,255,255,0.25)" }} />

            {/* Column 4: Opening Hours */}
            <Box sx={{ flexBasis: { xs: "100%", md: "18%" } }}>
              <Typography variant="h6" sx={{ mb: 2, fontSize: "1.2rem", fontWeight: 700, fontFamily: TAJAWAL }}>
                ساعات العمل
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 2, fontSize: "1rem", fontFamily: TAJAWAL }}>
                من السبت إلى الخميس<br />
                ٨:٠٠ صباحًا – ٦:٠٠ مساءً<br />
                الجمعة: مغلق
              </Typography>
            </Box>

            <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", md: "block" }, borderColor: "rgba(255,255,255,0.25)" }} />

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
              {partners.map((p, idx) => (
                <Box
                  component={Link}
                  key={idx}
                  href={p.href}
                  target="_blank"
                  rel="noopener"
                  aria-label={p.label}
                  sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                >
                  <Box
                    component="img"
                    src={p.src}
                    alt={p.alt}
                    sx={{
                      width: { xs: 100, sm: 130, md: 150 },
                      height: "auto",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              ))}
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
