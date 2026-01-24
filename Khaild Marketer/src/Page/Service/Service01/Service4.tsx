// src/Page/Service/Service04.tsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  styled,
  Snackbar,
  Alert,
  InputAdornment,
} from "@mui/material";
import { keyframes } from "@mui/system";
import { User, Phone, CheckCircle, Send, Sparkles, ArrowRight } from "lucide-react";

// ---------------- CONSTANTS & TYPES ----------------

const BORDER_THICKNESS = 18;

type FormData = {
  name: string;
  mobile: string;
};

type Props = {
  onSubmit?: (selectedItems: { seventhRows?: string[] }) => void;
};

const COLOR_PRIMARY_CYAN = "#06f9f3";
const COLOR_DEEP_BLUE = "#023B4E";
const TAJAWAL = "'Tajawal', sans-serif"; 
const BASE_URL = import.meta.env.VITE_API_URL;

// ---------------- ANIMATIONS ----------------

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;



// ---------------- STYLED COMPONENTS ----------------

const GlassCard = styled(Box)(({  }) => ({
  position: "relative",
  background: "rgba(255, 255, 255, 0.85)",
  backdropFilter: "blur(12px)",
  borderRadius: "30px",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
  overflow: "hidden",
  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 30px 60px -12px rgba(0, 0, 0, 0.2)",
    borderColor: COLOR_PRIMARY_CYAN,
  },
}));

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "16px",
    backgroundColor: "#f8fafc",
    transition: "all 0.3s ease",
    fontFamily: TAJAWAL,
    "& fieldset": { borderColor: "#E2E8F0" },
    "&:hover fieldset": { borderColor: COLOR_PRIMARY_CYAN },
    "&.Mui-focused fieldset": {
      borderColor: COLOR_PRIMARY_CYAN,
      borderWidth: "2px",
    },
  },
  "& .MuiInputBase-input": {
    fontFamily: TAJAWAL,
    fontSize: "1.1rem",
    fontWeight: 600,
  },
});

const SubmitButton = styled(Button)({
  background: `linear-gradient(45deg, ${COLOR_DEEP_BLUE} 30%, #086d8d 90%)`,
  color: "white",
  padding: "16px 48px",
  borderRadius: "50px",
  fontSize: "1.3rem",
  fontWeight: 800,
  fontFamily: TAJAWAL,
  textTransform: "none",
  transition: "all 0.3s ease",
  position: "relative",
  overflow: "hidden",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 10px 25px rgba(6, 249, 243, 0.4)",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0, left: "-100%",
    width: "100%", height: "100%",
    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
    animation: `${shimmer} 3s infinite`,
  },
});

// ---------------- COMPONENT ----------------

const Service4: React.FC<Props> = ({  }) => {
  const [openSuccess, setOpenSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({ name: "", mobile: "" });
  const [directPhone, setDirectPhone] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleChange = (field: keyof FormData, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    const message = `🛠️ *طلب تشطيب عقار*\n\n👤 الاسم: ${formData.name}\n📱 الجوال: ${formData.mobile}\n📞 رقم التواصل المباشر: ${directPhone || "غير متوفر"}`;
    
    try {
      await fetch(`${BASE_URL}/api/save-service-contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, directPhone }),
      });
      setOpenSuccess(true);
      
      setTimeout(() => {
        const whatsappURL = `https://wa.me/966509855666?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, "_blank");
      }, 1500);
    } catch (error) {
      console.error("Submission Error:", error);
    }
  };

  return (
    <Box sx={{ 
      minHeight: "100vh", 
      background: `linear-gradient(rgba(244, 123, 112, 0.45), rgba(244, 123, 112, 0.45)), url('https://i.ibb.co/hxkmfnF6/4.webp')`,
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      py: 8,
      direction: "rtl"
    }}>
      <Snackbar open={openSuccess} autoHideDuration={5000} onClose={() => setOpenSuccess(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="success" variant="filled" icon={<CheckCircle size={24} />} sx={{ borderRadius: "15px", fontFamily: TAJAWAL, fontSize: "1.1rem" }}>
          تم استلام طلبك! جاري تحويلك لواتساب...
        </Alert>
      </Snackbar>

          <Container maxWidth="xl">
                    <Box sx={{ width: "100%", position: "relative", py: "60px", overflow: "visible" }}>
                      
                      {/* --- ADDED HEADING SECTION --- */}
                     <Box sx={{ textAlign: "center", mb: 8, animation: `${float} 4s ease-in-out infinite` }}>
                      <Typography sx={{ 
                        fontWeight: 900, 
                        fontSize: { xs: "2.5rem", md: "4rem" }, 
                        color: COLOR_DEEP_BLUE, 
                        fontFamily: TAJAWAL,
                        textShadow: "0 10px 20px rgba(0,0,0,0.3)"
                      }}>
                        تشطيب العقار <Sparkles style={{ verticalAlign: 'middle' }} />
                      </Typography>
                      <Typography sx={{ color: "#000000", opacity: 0.9, fontSize: "1.2rem", mt: 1, fontFamily: TAJAWAL }}>
                        نحول رؤيتك إلى واقع ملموس بدقة واحترافية
                      </Typography>
                    </Box>
                      {/* ---------------------------- */}
            
                      {/* Perspective Container */}
                      <Box sx={{ perspective: "2000px", display: "flex", justifyContent: "center" }}>
                        <Box
                          sx={{
                            position: "relative",
                            width: "100%",
                            transformStyle: "preserve-3d",
                          }}
                        >
                          {/* 1. TOP IMAGE LAYER */}
                          <Box
                            component="img"
                            src="https://i.ibb.co/Y7twRGkm/copy-1.jpg"
                            alt="Website Showcase"
                            sx={{
                              width: "100%",
                              height: "auto",
                              borderRadius: "20px",
                              display: "block",
                              position: "relative",
                              zIndex: 10,
                              boxShadow: "20px 30px 50px rgba(0,0,0,0.5)",
                            }}
                          />
            
                          {/* 2. NEON GLOW EDGE */}
                          <Box
                            sx={{
                              position: "absolute",
                              inset: "-4px",
                              borderRadius: "24px",
                              background: "linear-gradient(135deg, #06f9f3, #00b3ff)",
                              filter: "blur(12px)",
                              transform: `translateZ(-${BORDER_THICKNESS}px)`,
                              zIndex: 5,
                            }}
                          />
            
                          {/* 3. SOLID REAR PLATE */}
                          <Box
                            sx={{
                              position: "absolute",
                              inset: "0px",
                              borderRadius: "20px",
                              background: "#021212",
                              transform: `translateZ(-${BORDER_THICKNESS * 2}px)`,
                              zIndex: 4,
                            }}
                          />
            
                          {/* 4. AMBIENT FLOOR SHADOW */}
                          <Box
                            sx={{
                              position: "absolute",
                              inset: "-20px",
                              background: "rgba(0,0,0,0.8)",
                              filter: "blur(40px)",
                              transform: `translateZ(-${BORDER_THICKNESS * 4}px)`,
                              zIndex: 1,
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Container>

      <Container maxWidth="md">
        {/* Header Section */}
        {/* Direct Contact Card */}
        <GlassCard sx={{ p: { xs: 3, md: 5 }, mb: 4, borderLeft: `6px solid ${COLOR_PRIMARY_CYAN}` }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
            <Phone size={32} color={COLOR_DEEP_BLUE} />
            <Typography sx={{ fontWeight: 800, fontSize: { xs: "1.4rem", md: "1.8rem" }, color: COLOR_DEEP_BLUE, fontFamily: TAJAWAL }}>
              اتصال مباشر سريع
            </Typography>
          </Box>
          <StyledTextField
            fullWidth
            placeholder="أدخل رقمك للتواصل الفوري"
            value={directPhone}
            onChange={(e) => setDirectPhone(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ArrowRight size={20} color={COLOR_PRIMARY_CYAN} />
                </InputAdornment>
              ),
            }}
          />
        </GlassCard>

        {/* Full Form Card */}
        <GlassCard sx={{ p: { xs: 3, md: 6 } }}>
          <Typography sx={{ 
            textAlign: "center", 
            fontWeight: 800, 
            fontSize: "1.8rem", 
            mb: 5, 
            color: COLOR_DEEP_BLUE,
            fontFamily: TAJAWAL 
          }}>
            سجل بياناتك وسنتواصل معك
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <Box>
              <Typography 
                sx={{ 
                  mb: 1.5, 
                  px: 1, 
                  fontWeight: 700, 
                  fontFamily: TAJAWAL,
                  // Mobile size: 1.2rem, Desktop size: 2rem
                  fontSize: { xs: '1.2rem', md: '1.5rem' } 
                }}
              >
                الاسم بالكامل
              </Typography>
              <StyledTextField
                fullWidth
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="مثال: محمد أحمد"
                InputProps={{
                  startAdornment: <InputAdornment position="start"><User size={20} /></InputAdornment>
                }}
              />
            </Box>

            <Box>
              <Typography  sx={{ 
                  mb: 1.5, 
                  px: 1, 
                  fontWeight: 700, 
                  fontFamily: TAJAWAL,
                  // Mobile size: 1.2rem, Desktop size: 2rem
                  fontSize: { xs: '1.2rem', md: '1.5rem' } 
                }}>رقم الجوال</Typography>
              <StyledTextField
                fullWidth
                value={formData.mobile}
                onChange={(e) => handleChange("mobile", e.target.value)}
                placeholder="05xxxxxxxx"
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Phone size={20} /></InputAdornment>
                }}
              />
            </Box>

            <Box sx={{ textAlign: "center", mt: 4 }}>
              <SubmitButton 
                onClick={handleSubmit} 
                endIcon={<Send size={24} style={{ marginRight: '8px' }} />}
              >
                تأكيد وإرسال الطلب
              </SubmitButton>
              <Typography sx={{ mt: 3, color: "#64748b", fontSize: "0.9rem", fontFamily: TAJAWAL }}>
                * سيتم فتح واتساب تلقائياً بعد الإرسال
              </Typography>
            </Box>
          </Box>
        </GlassCard>
      </Container>
    </Box>
  );
};

export default Service4;