import BannerCard from "./BannerCard";
import FadeCarousel from "./FadeCarousel";
import BannerCard01 from "./BannerCard01";
import Serviece from "./Service";
import Mapsection from "./Mapsection";
import Partner from "./Partner";


const Home: React.FC = () => {
  return (
    <>
    <FadeCarousel/>
    <BannerCard/>
    <BannerCard01/>
    <Serviece/>
    <Mapsection/>
    <Partner/>
    </>
  );
};

export default Home;
