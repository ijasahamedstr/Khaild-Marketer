import React from "react";
import {
  Container,
  CardMedia,
  Typography,
  Box,
  styled,
  keyframes,
} from "@mui/material";

// 1. Define Keyframes for the Infinite Smooth Scroll
const scrollLeft = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;

const scrollRight = keyframes`
  from { transform: translateX(-50%); }
  to { transform: translateX(0); }
`;

interface PartnerData {
  id: number;
  partnerimagelink: string;
}

// 2. Static Data
const PARTNERS: PartnerData[] = [
  { id: 1, partnerimagelink: "https://i.ibb.co/TMh6gqGh/image-1738846927311-782364e0-72cc-4084-88cd-31cb57122c57-removebg-preview-removebg-preview.webp" },
  { id: 2, partnerimagelink: "https://i.ibb.co/Kj26ksTM/image-1750578846840-SVG.webp" },
  { id: 3, partnerimagelink: "https://i.ibb.co/TMh6gqGh/image-1738846927311-782364e0-72cc-4084-88cd-31cb57122c57-removebg-preview-removebg-preview.webp" },
  { id: 4, partnerimagelink: "https://i.ibb.co/Kj26ksTM/image-1750578846840-SVG.webp" },
  { id: 5, partnerimagelink: "https://i.ibb.co/TMh6gqGh/image-1738846927311-782364e0-72cc-4084-88cd-31cb57122c57-removebg-preview-removebg-preview.webp" },
  { id: 6, partnerimagelink: "https://i.ibb.co/Kj26ksTM/image-1750578846840-SVG.webp" },
];

const PARTNERS_EXTENDED = [...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS];

const Partner: React.FC = () => {
  return (
    <Box sx={{ py: 10, bgcolor: "#ffffff", overflow: "hidden" }}>
      <Container maxWidth="xl">
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontFamily: "Tajawal, sans-serif",
            fontWeight: 800,
             color:
            "linear-gradient(90deg, rgba(2,59,78,1), rgba(4,106,132,1))",
            mb: 8,
            fontSize: { xs: "2rem", md: "3rem" }, // Larger heading
          }}
        >
          شركاء النجاح
        </Typography>

        {/* Row 1: Moving Left */}
        <Box sx={{ mb: 6, overflow: "hidden" }}>
          <MarqueeWrapper animation={`${scrollLeft} 40s linear infinite`}>
            {PARTNERS_EXTENDED.map((partner, index) => (
              <PartnerCard key={`row1-${index}`} imageUrl={partner.partnerimagelink} />
            ))}
          </MarqueeWrapper>
        </Box>

        {/* Row 2: Moving Right */}
        <Box sx={{ overflow: "hidden" }}>
          <MarqueeWrapper animation={`${scrollRight} 40s linear infinite`}>
            {PARTNERS_EXTENDED.map((partner, index) => (
              <PartnerCard key={`row2-${index}`} imageUrl={partner.partnerimagelink} />
            ))}
          </MarqueeWrapper>
        </Box>
      </Container>
    </Box>
  );
};

// --- Styled Components for Animation ---

const MarqueeWrapper = styled(Box)<{ animation: string }>(({ animation }) => ({
  display: "flex",
  width: "max-content",
  animation: animation,
  "&:hover": {
    animationPlayState: "paused",
  },
}));

const PartnerCard: React.FC<{ imageUrl: string }> = ({ imageUrl }) => (
  <Box
    sx={{
      mx: 2, // Increased spacing between cards
      // BIGGER DIMENSIONS HERE:
      width: { xs: 180, sm: 220, md: 280 }, 
      height: { xs: 100, sm: 120, md: 150 },
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      bgcolor: "#f8faf9",
      borderRadius: "16px",
      p: 1.5, // Reduced padding to let the logo fill more space
      transition: "all 0.4s ease",
      cursor: "pointer",
      border: "1px solid #eee",
      "&:hover": {
        bgcolor: "#ffffff",
        borderColor: "#096e69",
        transform: "scale(1.05)", // Slight pop-out effect
        boxShadow: "0 15px 35px rgba(9, 110, 105, 0.15)",
      },
    }}
  >
    <CardMedia
      component="img"
      image={imageUrl}
      sx={{
        width: "90%", // Logo takes up 90% of the card width
        height: "90%",
        objectFit: "contain",
        filter: "none", // Original colors
        transition: "all 0.4s ease",
      }}
    />
  </Box>
);

export default Partner;