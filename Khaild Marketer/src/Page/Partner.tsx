import React from "react";
import {
  Container,
  CardMedia,
  Typography,
  Box,
  styled,
  keyframes,
} from "@mui/material";

// 1. Animations: We move -50% because the container holds 2 copies.
// This makes the transition back to 0% invisible to the eye.
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

const PARTNERS: PartnerData[] = [
  { id: 1, partnerimagelink: "https://i.ibb.co/rGNB81qX/369118.webp" },
  { id: 2, partnerimagelink: "https://i.ibb.co/mFHMMZMS/372124.webp" },
  { id: 3, partnerimagelink: "https://i.ibb.co/Myn8Dfqw/387539-1.webp" },
  { id: 4, partnerimagelink: "https://i.ibb.co/gLbFhmyZ/390768.webp" },
  { id: 5, partnerimagelink: "https://i.ibb.co/zWwZkrnx/Ejar.webp" },
  { id: 6, partnerimagelink: "https://i.ibb.co/wrzNBWNP/Real-Estate-Market.webp" },
  { id: 7, partnerimagelink: "https://i.ibb.co/tw5GhL58/Riyadh-region-municipality-01.webp" },
  { id: 8, partnerimagelink: "https://i.ibb.co/qFYwvSwz/Taqeem-01.webp" },
  { id: 9, partnerimagelink: "https://i.ibb.co/NgcnRQJH/wafi.webp" },
  { id: 10, partnerimagelink: "https://i.ibb.co/0ywPm34T/svg.webp" },
];

// Exactly 2 copies for the infinite loop effect
const PARTNERS_FOR_LOOP = [...PARTNERS, ...PARTNERS];

const Partner: React.FC = () => {
  return (
    <Box sx={{ py: 10, bgcolor: "#ffffff", overflow: "hidden" }}>
      <Container maxWidth="xl">
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontFamily: "Tajawal, sans-serif",
            fontWeight: 700,
            color: "#086d6d", 
            mb: 8,
            fontSize: { xs: "1.8rem", md: "2.5rem" },
          }}
        >
          شركاء النجاح
        </Typography>

        {/* Moving Left */}
        <Box sx={{ mb: 4, overflow: "hidden" }}>
          <MarqueeWrapper animation={`${scrollLeft} 25s linear infinite`}>
            {PARTNERS_FOR_LOOP.map((partner, index) => (
              <PartnerCard key={`row1-${index}`} imageUrl={partner.partnerimagelink} />
            ))}
          </MarqueeWrapper>
        </Box>

        {/* Moving Right */}
        <Box sx={{ overflow: "hidden" }}>
          <MarqueeWrapper animation={`${scrollRight} 25s linear infinite`}>
            {PARTNERS_FOR_LOOP.map((partner, index) => (
              <PartnerCard key={`row2-${index}`} imageUrl={partner.partnerimagelink} />
            ))}
          </MarqueeWrapper>
        </Box>
      </Container>
    </Box>
  );
};

// --- Styled Components ---

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
      mx: 2,
      width: { xs: 130, sm: 160, md: 180 }, 
      height: { xs: 130, sm: 160, md: 180 },
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      bgcolor: "#ffffff",
      borderRadius: "18px",
      p: 2.5,
      transition: "all 0.3s ease",
      cursor: "pointer",
      border: "1px solid #f2f2f2",
      boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
      "&:hover": {
        transform: "scale(1.03)",
        boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
        borderColor: "#086d6d33",
      },
    }}
  >
    <CardMedia
      component="img"
      image={imageUrl}
      sx={{
        width: "100%",
        height: "100%",
        objectFit: "contain",
      }}
    />
  </Box>
);

export default Partner;