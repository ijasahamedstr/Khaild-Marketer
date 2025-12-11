// src/Page/About.tsx (or FadeCarousel.tsx)
import React, { useEffect } from "react";
import { Box } from "@mui/material";
import {
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaSnapchat,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

type SocialLink = {
  icon: React.ReactNode;
  link: string;
};

// ⭐ Direct URL for the hero image
const heroImage =
  "https://i.ibb.co/VnhmX3m/D.jpg";

const socialLinks: SocialLink[] = [
  { icon: <FaXTwitter size={22} />, link: "https://x.com/digilasersa" },
  { icon: <FaInstagram size={25} />, link: "https://www.instagram.com/digilasersa" },
  { icon: <FaLinkedin size={25} />, link: "https://www.linkedin.com/company/digilasersa" },
  { icon: <FaYoutube size={25} />, link: "https://youtube.com/@digilaserSa" },
  { icon: <FaSnapchat size={25} />, link: "https://www.snapchat.com/add/digilasersa" },
  { icon: <FaTiktok size={25} />, link: "https://www.tiktok.com/@digilasersa" },
  { icon: <FaWhatsapp size={25} />, link: "http://wa.me/966571978888" },
];

const FadeCarousel = () => {
  // Scroll to top on load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Box sx={{ mt: 0 }}>
      {/* ⭐ Full-Width, Responsive Hero Image */}
      <Box
        component="img"
        src={heroImage}
        alt="Digilaser Hero"
        sx={{
          width: "100%",
          height: "auto",
          objectFit: "cover",
          display: "block",
        }}
      />

      {/* ⭐ Social Media Icons (Fixed Sidebar on Desktop/Tablet) */}
      <Box
        sx={{
          position: "fixed",
          top: "50%",
          left: 0,
          transform: "translateY(-50%)",
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          gap: 2,
          zIndex: 1200,
          pl: 2,
        }}
      >
        {socialLinks.map(({ icon, link }, index) => (
          <a key={index} href={link} target="_blank" rel="noopener noreferrer">
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                // 🎨 Gradient باستخدام #023B4E
                background: "linear-gradient(135deg, #023B4E 0%, #06f9f3 100%)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#ffffff", // أيقونات بيضاء
                boxShadow: 3,
                cursor: "pointer",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.2)",
                  boxShadow: 6,
                },
              }}
            >
              {icon}
            </Box>
          </a>
        ))}
      </Box>
    </Box>
  );
};

export default FadeCarousel;
