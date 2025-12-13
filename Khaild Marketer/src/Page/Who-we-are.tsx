import { Box } from "@mui/material";
import BannerCard from "./BannerCard";
import BannerCard01 from "./BannerCard01";

const Whoweare: React.FC = () => {
  return (
    <Box mt={5}>
      <BannerCard />
      <BannerCard01 />
    </Box>
  );
};

export default Whoweare;
