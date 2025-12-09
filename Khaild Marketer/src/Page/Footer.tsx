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

const Footer: React.FC = () => {
  const socialItems = [
    { icon: <Phone sx={{ fontSize: 24 }} />, link: "#", label: "اتصال" },
    { icon: <Email sx={{ fontSize: 24 }} />, link: "#", label: "بريد" },
    { icon: <Facebook sx={{ fontSize: 24 }} />, link: "https://facebook.com", label: "فيسبوك" },
    { icon: <Instagram sx={{ fontSize: 24 }} />, link: "https://instagram.com", label: "انستجرام" },
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
    {
      src: "https://alrossais.com/wp-content/uploads/2025/09/rega-2.png",
      alt: "Partner 3",
      href: "#",
      label: "شريك 3",
    },
    // يمكن إضافة شركاء آخرين هنا إذا رغبت
  ];

  const navLinks = ["الرئيسية", "معرض المشاريع", "المشاريع", "الخبرات", "اتصل بنا"];

  return (
    <Box
      component="footer"
      sx={{ direction: "rtl", fontFamily: "'Tajawal', sans-serif" }}
    >
      {/* Main Footer Section */}
      <Box
        sx={{
          background: "#023B4E",
          color: "#fff",
          py: { xs: 5, sm: 6 },
          px: { xs: 2, sm: 4 },
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "center", md: "flex-start" },
              gap: 4,
              textAlign: { xs: "center", md: "right" },
            }}
          >
            {/* Logo & Social Icons */}
            <Box
              sx={{
                flexBasis: { xs: "100%", md: "25%" },
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", md: "flex-end" },
                gap: 2,
              }}
            >
              <Box
                component="img"
                src="https://i.ibb.co/yn0gbKdZ/Gemini-Generated-Image-pua0mbpua0mbpua0-removebg-preview.png"
                alt="شعار الشركة"
                sx={{
                  width: { xs: 180, sm: 200, md: 230 },
                  height: "auto",
                  mb: 1,
                }}
              />

              <Typography variant="body2" sx={{ fontWeight: 600, fontSize: "1rem", fontFamily: "Tajawal, sans-serif" }}>
                تواصل معنا
              </Typography>

              <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                {socialItems.map((item, index) => (
                  <IconButton
                    key={index}
                    href={item.link}
                    target="_blank"
                    sx={{
                      color: "#fff",
                      backgroundColor: "rgba(255,255,255,0.18)",
                      transition: "0.3s",
                      "&:hover": {
                        backgroundColor: "#fff",
                        color: "#023B4E",
                        transform: "scale(1.15)",
                      },
                      width: 42,
                      height: 42,
                    }}
                    aria-label={item.label}
                  >
                    {item.icon}
                  </IconButton>
                ))}
              </Box>
            </Box>

            <Divider
              orientation="vertical"
              flexItem
              sx={{
                display: { xs: "none", md: "block" },
                borderColor: "rgba(255,255,255,0.2)",
              }}
            />

            {/* Address */}
            <Box sx={{ flexBasis: { xs: "100%", md: "25%" } }}>
              <Typography
                variant="h6"
                sx={{ mb: 1.5, fontSize: "1.15rem", fontWeight: 700, fontFamily: "Tajawal, sans-serif" }}
              >
                العنوان
              </Typography>
              <Typography
                variant="body2"
                sx={{ lineHeight: 1.8, fontSize: "0.95rem", maxWidth: 260, fontFamily: "Tajawal, sans-serif" }}
              >
                Khalid Marketer<br />
                ص.ب 23693<br />
                هاتف: +974 502260200<br />
                المنتزه، شارع الروابي، الدوحة<br />
                مكتب الدوحة - قطر
              </Typography>
            </Box>

            <Divider
              orientation="vertical"
              flexItem
              sx={{
                display: { xs: "none", md: "block" },
                borderColor: "rgba(255,255,255,0.2)",
              }}
            />

            {/* Contact */}
            <Box sx={{ flexBasis: { xs: "100%", md: "25%" } }}>
              <Typography
                variant="h6"
                sx={{ mb: 1.5, fontSize: "1.15rem", fontWeight: 700, fontFamily: "Tajawal, sans-serif" }}
              >
                التواصل
              </Typography>
              <Typography
                variant="body2"
                sx={{ lineHeight: 1.8, fontSize: "0.95rem", direction: "ltr", fontFamily: "Tajawal, sans-serif" }}
              >
                +94 672260200<br />
                <Link
                  href="mailto:info@almtcqatar.com"
                  underline="hover"
                  color="inherit"
                  sx={{ "&:hover": { color: "#9eefff" }, fontSize: "0.95rem", fontFamily: "Tajawal, sans-serif" }}
                >
                  info@almtcqatar.com
                </Link>
              </Typography>
            </Box>

            <Divider
              orientation="vertical"
              flexItem
              sx={{
                display: { xs: "none", md: "block" },
                borderColor: "rgba(255,255,255,0.2)",
              }}
            />

            {/* Opening Hours + Partners */}
            <Box sx={{ flexBasis: { xs: "100%", md: "25%" } }}>
              <Typography
                variant="h6"
                sx={{ mb: 1.5, fontSize: "1.15rem", fontWeight: 700, fontFamily: "Tajawal, sans-serif" }}
              >
                تغيير في ساعات العمل
              </Typography>

              <Typography
                variant="body2"
                sx={{ lineHeight: 1.8, fontSize: "0.95rem", fontFamily: "Tajawal, sans-serif" }}
              >
                من السبت إلى الخميس<br />
                ٨:٠٠ صباحًا – ٦:٠٠ مساءً<br />
                الجمعة: مغلق
              </Typography>

              {/* Partners Section - always on one line (no wrap) */}
              <Typography
                variant="h6"
                sx={{ mt: 3, mb: 1.5, fontSize: "1.15rem", fontWeight: 700, fontFamily: "Tajawal, sans-serif" }}
              >
                شركاؤنا
              </Typography>

              <Box
                role="list"
                sx={{
                  display: "flex",
                  flexWrap: "nowrap",    // يمنع الالتفاف لسطر ثاني
                  gap: 2,
                  alignItems: "center",
                  justifyContent: "center",
                  overflowX: "auto",     // يتيح السحب أفقيًا على الشاشات الضيقة
                  WebkitOverflowScrolling: "touch",
                  pb: 1,
                  // إخفاء شريط التمرير في بعض المتصفحات (تجميل)
                  "&::-webkit-scrollbar": {
                    height: 6,
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: "rgba(255,255,255,0.14)",
                    borderRadius: 3,
                  },
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
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minWidth: { xs: 70, sm: 80, md: 85 },
                      px: 0.5,
                      py: 0.5,
                      backgroundColor: "transparent",
                      borderRadius: 1,
                      transition: "transform 0.22s, box-shadow 0.22s",
                      "&:hover": {
                        transform: "translateY(-4px) scale(1.02)",
                        boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src={p.src}
                      alt={p.alt}
                      sx={{
                        width: { xs: 60, sm: 70, md: 85 },
                        height: "auto",
                        opacity: 0.95,
                        objectFit: "contain",
                        display: "block",
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
      <Box sx={{ backgroundColor: "#001f26", py: 2.5 }}>
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1,
            color: "#fff",
          }}
        >
          <Typography variant="body2" sx={{ fontSize: "0.95rem", fontFamily: "Tajawal, sans-serif" }}>
            Copyright © 2026 | Khalid Marketer All rights reserved
          </Typography>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1.3,
              fontFamily: "Tajawal, sans-serif",
            }}
          >
            {navLinks.map((text, index, array) => (
              <React.Fragment key={text}>
                <Link
                  href="#"
                  underline="hover"
                  sx={{
                    fontSize: "1rem",
                    color: "#FFF",
                    "&:hover": { color: "#9eefff" },
                    fontFamily: "Tajawal, sans-serif",
                  }}
                >
                  {text}
                </Link>
                {index < array.length - 1 && (
                  <Typography component="span" sx={{ mx: 0.7 }}>
                    |
                  </Typography>
                )}
              </React.Fragment>
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
