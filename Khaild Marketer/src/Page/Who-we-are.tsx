import React, { useEffect } from "react";
import { Box } from "@mui/material";
import BannerCard from "./BannerCard";
import BannerCard01 from "./BannerCard01";

const Whoweare: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Box>
      <BannerCard />
      <BannerCard01 />
    </Box>
  );
};

export default Whoweare;
