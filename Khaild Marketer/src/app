import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, Typography, Fade } from "@mui/material";
import Confetti from "react-confetti";

// Pages & Components
import Navbar from './Page/Navbar';
import Footer from './Page/Footer';
import Home from './Page/Home';
import Contactus from './Page/contact-us';
import Service01 from './Page/Service/Service01';
import Service02 from './Page/Service/Service02';
import Service03 from './Page/Service/Service03';
import Service04 from './Page/Service/Service04';
import Service05 from './Page/Service/Service05';
import Whoweare from './Page/Who-we-are';
import Service06 from './Page/Service/Service06';
import Service07 from './Page/Service/Service07';
import Service08 from './Page/Service/Service08';
import Service09 from './Page/Service/Service09';
import Service10 from './Page/Service/Service10';
import Service11 from './Page/Service/Service11';

function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);

          // Start confetti
          setShowConfetti(true);

          // Stop confetti after 15 seconds
          setTimeout(() => {
            setShowConfetti(false);
            setLoading(false);
          }, 8000);

          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "radial-gradient(circle, #001219 0%, #000000 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999,
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Confetti */}
        {showConfetti && (
          <Confetti
            numberOfPieces={600}
            recycle={true}
            gravity={0.12}
            wind={0.02}
            tweenDuration={15000}
            colors={["#00fffc", "#fdf0d5", "#c1121f", "#ffd166", "#06d6a0"]}
          />
        )}

        {/* Logo / Title */}
        <Typography
          variant="h1"
          sx={{
            color: "#fff",
            fontWeight: "900",
            fontSize: { xs: "5rem", md: "8rem" },
            letterSpacing: "10px",
            textShadow: "0 0 20px #00fffc, 0 0 40px #00fffc",
            opacity: progress / 100,
          }}
        >
          2026
        </Typography>
        <Typography
          sx={{
            color: "#00fffc",
            fontSize: "1.2rem",
            fontWeight: "bold",
            letterSpacing: "5px",
            mt: -2,
          }}
        >
          HAPPY NEW YEAR
        </Typography>

        {/* Loading Bar */}
        <Box sx={{ width: "300px", textAlign: "center", mt: 3 }}>
          <Box
            sx={{
              width: "100%",
              height: "4px",
              bgcolor: "rgba(255,255,255,0.1)",
              borderRadius: "10px",
              mb: 1,
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                width: `${progress}%`,
                height: "100%",
                bgcolor: "#00fffc",
                boxShadow: "0 0 10px #00fffc",
                transition: "width 0.1s linear",
              }}
            />
          </Box>
          <Typography
            sx={{ color: "#fff", fontSize: "0.9rem", fontFamily: "monospace" }}
          >
            {progress}% INITIALIZING CELEBRATION...
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Fade in={!loading} timeout={1200}>
      <Box>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/إتصل بنا" element={<Contactus />} />
            <Route path="/services/بيع العقار" element={<Service02 />} />
            <Route path="/services/شراء العقار" element={<Service01 />} />
            <Route path="/services/إيجار العقار" element={<Service03 />} />
            <Route path="/services/تشطيب العقار" element={<Service04 />} />
            <Route path="/services/تسليم واستلام العقار" element={<Service05 />} />
            <Route path="/services/النظام يجيب" element={<Service06 />} />
            <Route path="/services/خدمات التوثيق" element={<Service07 />} />
            <Route path="/services/خدمات التصوير العقاري" element={<Service08 />} />
            <Route path="/services/القسم النسائي" element={<Service09 />} />
            <Route path="/services/محكم معتمد" element={<Service11 />} />
            <Route path="/services/قسم التمويل العقاري" element={<Service10 />} />
            <Route path="/من نحن" element={<Whoweare />} />
          </Routes>
          <Footer />
        </Router>
      </Box>
    </Fade>
  );
}

export default App;
