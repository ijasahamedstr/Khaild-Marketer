// src/Page/About.tsx (or FadeCarousel.tsx)
import { useEffect } from "react";
import { Box } from "@mui/material";


// ⭐ Direct URL for the hero image
const heroImage =
  "https://i.ibb.co/BVXWZJkr/00001-jpg.webp";

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
      </Box>
    </Box>
  );
};

export default FadeCarousel;
