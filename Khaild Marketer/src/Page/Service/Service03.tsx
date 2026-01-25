/**
 * src/Page/Service/Service03.tsx
 * Property Rental & Management Component - Saudi Market Specialized
 * * Technical Features:
 * - Neon Gradient Glow Border (Inset -2px logic)
 * - Glassmorphism UI Depth
 * - RTL Layout (Tajawal Typography)
 * - Comprehensive State Management (Sale/Rent logic)
 * - API & WhatsApp Dual-Submission Logic
 */

import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Divider,
  Snackbar,
  Alert,
  styled,
  keyframes,
  LinearProgress,
  IconButton
} from "@mui/material";

/* ---------------- ICONS ---------------- */
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import StraightenIcon from "@mui/icons-material/Straighten";
import EditNoteIcon from "@mui/icons-material/EditNote";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneIcon from "@mui/icons-material/Phone";
import { Send, Sparkles, CloudUpload, Video, X, FileText } from "lucide-react";
import HotelIcon from '@mui/icons-material/Hotel';          // For Rooms
import BathtubIcon from '@mui/icons-material/Bathtub';      // For Bathrooms
import PublicIcon from "@mui/icons-material/Public";
import WcIcon from "@mui/icons-material/Wc";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

/* ---------------- CONSTANTS ---------------- */
const COLOR_PRIMARY_CYAN = "#06f9f3";
const COLOR_DEEP_BLUE = "#023B4E";
const TAJAWAL = "'Tajawal', sans-serif";
const BASE_URL = import.meta.env.VITE_API_URL;
const LABEL_COLOR = "#023B4E";

/* ---------------- ANIMATIONS ---------------- */
const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

/* ---------------- STYLED COMPONENTS ---------------- */
const GlassCard = styled(Box)({
  position: "relative",
  background: "rgba(226, 232, 240, 0.98)",
  backdropFilter: "blur(12px)",
  borderRadius: "30px",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
  overflow: "hidden",
  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  zIndex: 10,
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 30px 60px -12px rgba(0, 0, 0, 0.2)",
  },
});

const NeonGlowLayer = styled(Box)({
  position: "absolute",
  inset: "-2px",
  borderRadius: "32px",
  background: "linear-gradient(135deg, #06f9f3, #00b3ff, #06f9f3)",
  filter: "blur(4px)",
  zIndex: 0,
});

const UploadBox = styled(Box)({
  border: `2px dashed ${COLOR_DEEP_BLUE}44`,
  borderRadius: "16px",
  padding: "30px",
  textAlign: "center",
  cursor: "pointer",
  backgroundColor: "rgba(255,255,255,0.5)",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "rgba(6, 249, 243, 0.05)",
    borderColor: COLOR_PRIMARY_CYAN,
  }
});

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
  "& .MuiInputBase-input::placeholder": {
    fontWeight: 300,
    opacity: 0.7,
    fontFamily: TAJAWAL,
  },
});

const SubmitButton = styled(Button)({
  background: `linear-gradient(45deg, ${COLOR_DEEP_BLUE} 30%, #086d8d 90%)`,
  color: "white",
  padding: "16px 60px",
  borderRadius: "50px",
  fontSize: "1.4rem",
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

/* ---------------- TYPES ---------------- */
type Props = {
  onSubmit?: (data: any) => void;
};

/* ---------------- DROPDOWN CONFIG ---------------- */
const DROPDOWN_FIELDS = [
  {
    label: "نوع العقار",
    icon: <HomeWorkIcon fontSize="small" />,
    options: ["قصر", "فيلا", "تاون هاوس", "شقة", "ملحق", "مزرعة", "استراحة", "مستودع", "أرض"],
  },
];

/* ---------------- COMPONENT ---------------- */
const Service03: React.FC<Props> = ({  }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  /* ---------------- STATES ---------------- */
  const [dropdownValues, setDropdownValues] = useState<Record<number, string>>({});
  const [notes, setNotes] = useState("");
  const [channels, setChannels] = useState({ chat: true, whatsapp: true, call: false });
  const [openPopup, setOpenPopup] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">("success");
  const [alertMessage, setAlertMessage] = useState("");

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [location, setLocation] = useState("");
  const [developer, setDeveloper] = useState("");
  const [area, setArea] = useState("");
  const [rooms, setRooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [propertyAgeSelection, setPropertyAgeSelection] = useState("");
  const [customAgeInput, setCustomAgeInput] = useState("");

  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [checkboxValues] = useState<boolean[]>([false, false]);
  const [priceLimit, setPriceLimit] = useState("");
  const [priceOffer, setPriceOffer] = useState("");

    const [ownerName, setOwnerName] = useState("");
    const [nationality, setNationality] = useState("");
    const [gender, setGender] = useState("");

  // Media States
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const shouldShowCard = isChecked2 || checkboxValues[0];

  /* ---------------- HANDLERS ---------------- */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles((prev) => [...prev, ...filesArray]);
      setLoading(true);
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setLoading(false);
        }
      }, 100);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // const handleCheckboxChange = (index: number, value: boolean) => {
  //   const updated = [...checkboxValues];
  //   updated[index] = value;
  //   setCheckboxValues(updated);
  // };

  const handleDeveloperCheckbox = (index: number) => {
    if (index === 0) {
      setIsChecked1(true);
      setIsChecked2(false);
    } else {
      setIsChecked1(false);
      setIsChecked2(true);
      setDeveloper("");
      setSelectedFiles([]); 
    }
  };

  const handleAgeCheckboxChange = (type: string) => {
    setPropertyAgeSelection(type);
    if (type !== "custom") setCustomAgeInput("");
  };

  const handleSubmit = async () => {
    if (channels.chat && (!name || !mobile)) {
      setAlertSeverity("error");
      setAlertMessage("يرجى إدخال الاسم والجوال للتواصل");
      setOpenPopup(true);
      return;
    }

    const formData = new FormData();
    const textData = {
      role: isChecked1 ? "مؤجر" : "مستأجر",
      propertyType: dropdownValues[0] || "",
      location,
      developer,
      area,
      rooms,
      bathrooms,
      age: propertyAgeSelection === "new" ? "جديد" : customAgeInput,
      priceLimit,
      priceOffer,
      notes,
      name,
      mobile,
      channels,
      ownerName,
      nationality,
      gender
    };

    formData.append("data", JSON.stringify(textData));
    selectedFiles.forEach((file) => {
      formData.append("media", file);
    });

    try {
      const response = await fetch(`${BASE_URL}/api/submit`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setOpenPopup(true);
        setAlertSeverity("success");
        setAlertMessage("تم إرسال طلبك بنجاح");

        if (channels.whatsapp) {
          const roleText = isChecked1 ? "مؤجر" : "مستأجر";
          const message = `🏠 طلب إيجار عقار\nالحالة: ${roleText}\nالنوع: ${dropdownValues[0] || "غير محدد"}\nالموقع: ${location}\nالاسم: ${name}`;
          window.open(`https://wa.me/966509855666?text=${encodeURIComponent(message)}`, "_blank");
        }
      } else {
        throw new Error();
      }
    } catch (e) {
      setAlertSeverity("error");
      setAlertMessage("حدث خطأ أثناء حفظ البيانات");
      setOpenPopup(true);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", background: `url('https://i.ibb.co/DgtZg2Dn/texture-wall-background-jpg.webp')`, backgroundSize: "cover", backgroundAttachment: "fixed", py: 4, direction: "rtl" }}>
      <Snackbar open={openPopup} autoHideDuration={6000} onClose={() => setOpenPopup(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity={alertSeverity} variant="filled" sx={{ width: '100%', fontSize: '1.2rem', fontFamily: TAJAWAL }}>{alertMessage}</Alert>
      </Snackbar>

      <Container maxWidth="md" sx={{ mt: { xs: 4, md: 8 }, mb: { xs: 6, md: 12 }, direction: "rtl", fontFamily: TAJAWAL }}>

        {/* --- HEADER TITLE --- */}
        <Box sx={{ textAlign: "center", mb: 10, animation: `${float} 4s ease-in-out infinite`, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h1" sx={{ fontWeight: 900, fontSize: { xs: "2.5rem", md: "4.5rem" }, color: COLOR_PRIMARY_CYAN, fontFamily: TAJAWAL, textShadow: "0 10px 20px rgba(0,0,0,0.3)", display: 'flex', alignItems: 'center', gap: 2 }}>
            إيجار العقار <Sparkles size={40} style={{ color: COLOR_PRIMARY_CYAN }} />
          </Typography>
          <Typography sx={{ color: "#fff", opacity: 0.9, fontSize: "1.3rem", mt: 2, fontFamily: TAJAWAL, maxWidth: "600px" }}>نحول رؤيتك إلى واقع ملموس بدقة واحترافية</Typography>
        </Box>

        <GlassCard sx={{ p: { xs: 2, md: 4 } }}>

          {/* --- 1. DEVELOPER ROLE SECTION --- */}
          <Box sx={{ display: "flex", flexDirection: "row", gap: { xs: 1.5, sm: 3 }, mb: 6 }}>
            <Box sx={{ flex: 1, position: "relative" }}>
              <NeonGlowLayer sx={{ borderRadius: { xs: "18px", sm: "32px" } }} />
              <GlassCard sx={{ p: { xs: 0.5, sm: 2 }, textAlign: "center", cursor: "pointer", borderRadius: { xs: "16px", sm: "30px" } }} onClick={() => handleDeveloperCheckbox(0)}>
                <FormControlLabel sx={{ width: '100%', m: 0, justifyContent: 'center' }} control={<Checkbox checked={isChecked1} sx={{ '& .MuiSvgIcon-root': { fontSize: { xs: 24, sm: 45 } } }} />} label={<Typography sx={{ fontFamily: TAJAWAL, fontSize: { xs: "0.95rem", sm: "1.8rem" }, fontWeight: 800 }}>مؤجر</Typography>} />
              </GlassCard>
            </Box>
            <Box sx={{ flex: 1, position: "relative" }}>
              <NeonGlowLayer sx={{ borderRadius: { xs: "18px", sm: "32px" } }} />
              <GlassCard sx={{ p: { xs: 0.5, sm: 2 }, textAlign: "center", cursor: "pointer", borderRadius: { xs: "16px", sm: "30px" } }} onClick={() => handleDeveloperCheckbox(1)}>
                <FormControlLabel sx={{ width: '100%', m: 0, justifyContent: 'center' }} control={<Checkbox checked={isChecked2} sx={{ '& .MuiSvgIcon-root': { fontSize: { xs: 24, sm: 45 } } }} />} label={<Typography sx={{ fontFamily: TAJAWAL, fontSize: { xs: "0.95rem", sm: "1.8rem" }, fontWeight: 800 }}>مستأجر</Typography>} />
              </GlassCard>
            </Box>
          </Box>

          {/* --- 2. PROPERTY TYPE SECTION --- */}
          <Box sx={{ display: "grid", gap: 5, mb: 5 }}>
            {DROPDOWN_FIELDS.map((field, i) => (
              <Box key={i} sx={{ position: "relative" }}>
                <NeonGlowLayer sx={{ borderRadius: "32px" }} />
                <GlassCard sx={{ p: 4 }}>
                  <Box sx={{ display: "flex", gap: 2, mb: 3, color: LABEL_COLOR, alignItems: 'center' }}>
                    {field.icon}
                    <Typography sx={{ fontWeight: 900, fontSize: "1.8rem", fontFamily: TAJAWAL }}>{field.label}</Typography>
                  </Box>
                  <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }, gap: 3 }}>
                    {field.options.map((opt, idx) => (
                      <FormControlLabel key={idx} control={<Checkbox checked={dropdownValues[i] === opt} onChange={(e) => setDropdownValues({ ...dropdownValues, [i]: e.target.checked ? opt : "" })} />} label={<Typography sx={{ fontFamily: TAJAWAL, fontSize: "1.4rem", fontWeight: 500 }}>{opt}</Typography>} />
                    ))}
                  </Box>
                </GlassCard>
              </Box>
            ))}
          </Box>
            {/* Personal Data Section - Added mt: 5 for top space */}
            <Box sx={{ position: "relative", borderRadius: 4, mt: 5 }}>
              {/* Glow Border Effect */}
              <Box sx={{ position: "absolute", inset: "-2px", borderRadius: 4, background: "linear-gradient(135deg, #06f9f3, #00b3ff, #06f9f3)", filter: "blur(6px)", zIndex: 0 }} />

              <Box sx={{ position: "relative", zIndex: 1, p: { xs: 2, sm: 3 }, borderRadius: 4, border: "1px solid #CBD5E1", backgroundColor: "#E2E8F0" }}>
                
                {/* SECTION TITLE */}
                <Box sx={{ display: "flex", gap: 1, mb: 3, color: LABEL_COLOR, alignItems: "center" }}>
                  <AccountBoxIcon sx={{ fontSize: "1.7rem" }} /> 
                  <Typography sx={{ fontWeight: 700, fontSize: "1.3rem", fontFamily: TAJAWAL }}>
                    البيانات الشخصية
                  </Typography>
                </Box>

                {/* 1. ROW: OWNER NAME - Responsive Stack */}
                <Box sx={{ 
                  display: "flex", 
                  flexDirection: { xs: "column", sm: "row" }, 
                  alignItems: { xs: "flex-start", sm: "center" }, 
                  gap: { xs: 1, sm: 2 }, 
                  mb: 3 
                }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 165 }}>
                    <AssignmentIndIcon sx={{ color: LABEL_COLOR, fontSize: "1.2rem" }} />
                    <Typography sx={{ fontFamily: TAJAWAL, fontWeight: 600 }}>اسم   المالك  أو الوكيل</Typography>
                  </Box>
                  <StyledTextField
                    size="small"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    placeholder="أدخل الاسم هنا"
                    sx={{
                      // Keep your specific responsive width
                      width: { xs: "100%", sm: "50%", md: "40%" },

                      // 1. Container background and shape (White as requested)
                      "& .MuiInputBase-root": {
                        borderRadius: "8px",
                        backgroundColor: "#fff",
                      },

                      // 2. Standard border state (Black 1px)
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#000000 !important",
                        borderWidth: "1px !important",
                      },

                      // 3. Hover state
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#000000 !important",
                      },

                      // 4. Focused state (stays 1px and black)
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#000000 !important",
                        borderWidth: "1px !important",
                      },
                    }}
                  />
                </Box>

                {/* 2. ROW: NATIONALITY - Responsive Wrap */}
                <Box sx={{ 
                  display: "flex", 
                  flexDirection: { xs: "column", sm: "row" }, 
                  alignItems: { xs: "flex-start", sm: "center" }, 
                  gap: { xs: 1, sm: 2 }, 
                  mb: 3 
                }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 165 }}>
                    <PublicIcon sx={{ color: LABEL_COLOR, fontSize: "1.2rem" }} />
                    <Typography sx={{ fontFamily: TAJAWAL, fontWeight: 600 }}>جنسية المالك</Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <FormControlLabel
                      control={<Checkbox checked={nationality === "saudi"} onChange={() => setNationality("saudi")} />}
                      label={<Typography sx={{ fontFamily: TAJAWAL, fontSize: "0.95rem" }}>سعودي</Typography>}
                    />
                    <FormControlLabel
                      control={<Checkbox checked={nationality === "non-saudi"} onChange={() => setNationality("non-saudi")} />}
                      label={<Typography sx={{ fontFamily: TAJAWAL, fontSize: "0.95rem" }}>غير سعودي</Typography>}
                    />
                  </Box>
                </Box>

                {/* 3. ROW: GENDER - Responsive Wrap */}
                <Box sx={{ 
                  display: "flex", 
                  flexDirection: { xs: "column", sm: "row" }, 
                  alignItems: { xs: "flex-start", sm: "center" }, 
                  gap: { xs: 1, sm: 2 } 
                }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 165 }}>
                    <WcIcon sx={{ color: LABEL_COLOR, fontSize: "1.2rem" }} />
                    <Typography sx={{ fontFamily: TAJAWAL, fontWeight: 600 }}>النوع</Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <FormControlLabel
                      control={<Checkbox checked={gender === "male"} onChange={() => setGender("male")} />}
                      label={<Typography sx={{ fontFamily: TAJAWAL, fontSize: "0.95rem" }}>ذكر</Typography>}
                    />
                    <FormControlLabel
                      control={<Checkbox checked={gender === "female"} onChange={() => setGender("female")} />}
                      label={<Typography sx={{ fontFamily: TAJAWAL, fontSize: "0.95rem" }}>أنثى</Typography>}
                    />
                  </Box>
                </Box>

              </Box>
            </Box>

          

          {/* --- 3. LOCATION SECTION --- */}
          <Box sx={{ mt: 5, position: "relative" }}>
            <NeonGlowLayer />
            <GlassCard sx={{ p: 3 }}>
              <Box sx={{ display: "flex", gap: 1, mb: 2, color: LABEL_COLOR, alignItems: 'center' }}><HomeWorkIcon /><Typography sx={{ fontWeight: 800, fontSize: "1.5rem", fontFamily: TAJAWAL }}>الموقع</Typography></Box>
              <StyledTextField
                fullWidth
                placeholder="اكتب الموقع بالتفصيل..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                sx={{
                  // 1. Container background and shape
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                    backgroundColor: "#E2E8F0",
                  },

                  // 2. Standard border state
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#000000 !important",
                    borderWidth: "1px !important",
                  },

                  // 3. Hover state
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#000000 !important",
                  },

                  // 4. Active/Focused state (prevents blue/thick border)
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#000000 !important",
                    borderWidth: "1px !important",
                  },
                }}
              />
            </GlassCard>
          </Box>

          {/* --- 4. DEVELOPER NAME SECTION --- */}
          {!isChecked2 && (
            <Box sx={{ mt: 5, position: "relative" }}>
              <NeonGlowLayer />
              <GlassCard sx={{ p: 3 }}>
                <Box sx={{ display: "flex", gap: 1, mb: 2, color: LABEL_COLOR, alignItems: 'center' }}><LocationCityIcon /><Typography sx={{ fontWeight: 800, fontSize: "1.5rem", fontFamily: TAJAWAL }}>اسم المطور العقاري</Typography></Box>
                <StyledTextField
                fullWidth
                placeholder="اسم المطور (إن وجد)..."
                value={developer}
                onChange={(e) => setDeveloper(e.target.value)}
                sx={{
                  // 1. Container background and shape
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                    backgroundColor: "#E2E8F0",
                  },

                  // 2. Standard border state
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#000000 !important",
                    borderWidth: "1px !important",
                  },

                  // 3. Hover state
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#000000 !important",
                  },

                  // 4. Active/Focused state (locks border at 1px black)
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#000000 !important",
                    borderWidth: "1px !important",
                  },
                }}
              />
              </GlassCard>
            </Box>
          )}

          {/* --- 5. Specs Section --- */}
<Box sx={{ mt: 5, position: "relative" }}>
  <NeonGlowLayer sx={{ borderRadius: "16px" }} />
  <Box sx={{ position: "relative", zIndex: 1, p: 3, borderRadius: 4, border: "1px solid #CBD5E1", backgroundColor: "#E2E8F0" }}>

    {/* 1. AREA FIELD */}
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 160 }}>
        <StraightenIcon sx={{ color: LABEL_COLOR, fontSize: "1.2rem" }} />
        <Typography sx={{ fontFamily: TAJAWAL, fontWeight: 600, display: "flex", alignItems: "center", gap: "5px" }}>
          المساحة
          <Box component="span" sx={{ fontSize: "0.8rem", fontWeight: 400, color: "#475569" }}>(اختياري)</Box>
        </Typography>
      </Box>
      <StyledTextField
        size="small"
        placeholder="الرجاء كتابة المساحة"
        value={area}
        onChange={(e) => setArea(e.target.value)}
        sx={{
          // 1. Responsive Width
          width: { xs: "100%", sm: "40%" },

          // 2. Container background and shape
          "& .MuiInputBase-root": {
            borderRadius: "8px",
            backgroundColor: "#fff",
          },

          // 3. Custom Typography (Tajawal)
          "& .MuiInputBase-input": {
            fontFamily: TAJAWAL,
            fontWeight: 300,
            fontSize: "0.95rem",
          },
          "& .MuiInputBase-input::placeholder": {
            opacity: 0.6,
          },

          // 4. Standard border state (Fixed Black 1px)
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#000000 !important",
            borderWidth: "1px !important",
          },

          // 5. Hover state
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#000000 !important",
          },

          // 6. Focused state (locks border at 1px black)
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#000000 !important",
            borderWidth: "1px !important",
          },
        }}
      />
    </Box>

    {/* 2. ROOMS FIELD */}
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 160 }}>
        <HotelIcon sx={{ color: LABEL_COLOR, fontSize: "1.2rem" }} />
        <Typography sx={{ fontFamily: TAJAWAL, fontWeight: 600 }}>عدد الغرف</Typography>
      </Box>
      <StyledTextField
        size="small"
        value={rooms}
        onChange={(e) => setRooms(e.target.value)}
        sx={{
          // 1. Responsive Width
          width: { xs: "100%", sm: "40%" },

          // 2. Background and Shape
          "& .MuiInputBase-root": {
            borderRadius: "8px",
            backgroundColor: "#fff",
          },

          // 3. Custom Typography (Tajawal)
          "& .MuiInputBase-input": {
            fontFamily: TAJAWAL,
            fontWeight: 300,
            fontSize: "0.95rem",
          },
          "& .MuiInputBase-input::placeholder": {
            opacity: 0.6,
          },

          // 4. Standard border state (Fixed Black 1px)
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#000000 !important",
            borderWidth: "1px !important",
          },

          // 5. Hover state
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#000000 !important",
          },

          // 6. Focused state (locks border at 1px black)
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#000000 !important",
            borderWidth: "1px !important",
          },
        }}
      />
      </Box>

    {/* 3. BATHROOMS FIELD */}
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 160 }}>
        <BathtubIcon sx={{ color: LABEL_COLOR, fontSize: "1.2rem" }} />
        <Typography sx={{ fontFamily: TAJAWAL, fontWeight: 600 }}>عدد دورات المياه</Typography>
      </Box>
     <StyledTextField
      size="small"
      value={bathrooms}
      onChange={(e) => setBathrooms(e.target.value)}
      sx={{
        // 1. Responsive Width
        width: { xs: "100%", sm: "40%" },

        // 2. Background and Shape
        "& .MuiInputBase-root": {
          borderRadius: "8px",
          backgroundColor: "#fff",
        },

        // 3. Custom Typography (Tajawal)
        "& .MuiInputBase-input": {
          fontFamily: TAJAWAL,
          fontWeight: 300,
          fontSize: "0.95rem",
        },
        "& .MuiInputBase-input::placeholder": {
          opacity: 0.6,
        },

        // 4. Standard border state (Fixed Black 1px)
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#000000 !important",
          borderWidth: "1px !important",
        },

        // 5. Hover state
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "#000000 !important",
        },

        // 6. Focused state (Prevents blue color and 2px thickness)
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "#000000 !important",
          borderWidth: "1px !important",
        },
      }}
    />
    </Box>

    {/* 4. PROPERTY AGE SECTION */}
        <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 3, mt: 1 }}>
          {/* LABEL - Fixed width for vertical alignment with other rows */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 160 }}>
            <Typography sx={{ fontFamily: TAJAWAL, fontWeight: 600 }}>عمر العقار</Typography>
          </Box>

          {/* CONTROLS GROUP - Added larger gap here */}
          <Box sx={{ 
            display: "flex", 
            alignItems: "center", 
            gap: 4, // Increased space between checkboxes and textbox
            flexWrap: "wrap" 
          }}>
            
            {/* CHECKBOXES GROUP - Kept close together */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <FormControlLabel
                control={<Checkbox checked={propertyAgeSelection === "new"} onChange={() => handleAgeCheckboxChange("new")} />}
                label={<Typography sx={{ fontFamily: TAJAWAL }}>جديد</Typography>}
              />
              <FormControlLabel
                control={<Checkbox checked={propertyAgeSelection === "custom"} onChange={() => handleAgeCheckboxChange("custom")} />}
                label={<Typography sx={{ fontFamily: TAJAWAL }}>أكثر من سنة</Typography>}
              />
            </Box>

            {/* TEXTBOX - The "How many years?" field */}
            <TextField
              size="small"
              value={customAgeInput}
              onChange={(e) => {
                const val = e.target.value;
                setCustomAgeInput(val);
                handleAgeCheckboxChange(val.trim() !== "" ? "custom" : "");
              }}
              sx={{
                // 1. Keep your specific dimensions and background
                width: 100,
                backgroundColor: "white",
                borderRadius: "8px",

                // 2. Container shape
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },

                // 3. Custom Placeholder style
                "& .MuiInputBase-input::placeholder": {
                  fontWeight: 300,
                  opacity: 0.6,
                  fontSize: "0.8rem",
                },

                // 4. Standard border state (Fixed Black 1px)
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#000000 !important",
                  borderWidth: "1px !important",
                },

                // 5. Hover state
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#000000 !important",
                },

                // 6. Focused state (locks border at 1px black)
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#000000 !important",
                  borderWidth: "1px !important",
                },
              }}
            />
          </Box>
        </Box>
          </Box>
        </Box>

          {/* --- 7. ADDITIONAL NOTES SECTION --- */}
          <Box sx={{ mt: 5, position: "relative" }}>
            <NeonGlowLayer />
            <GlassCard sx={{ p: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}><EditNoteIcon sx={{ color: LABEL_COLOR, fontSize: 35 }} /><Typography sx={{ fontWeight: 900, fontSize: "1.8rem", color: LABEL_COLOR, fontFamily: TAJAWAL }}>تفاصيل إضافية</Typography></Box>
              <StyledTextField
                multiline
                minRows={5}
                fullWidth
                placeholder="اكتب ملاحظاتك وتفاصيل العقار هنا..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                sx={{
                  // 1. Container background and shape
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                    backgroundColor: "#fff",
                    padding: "12px", // Added for multiline text comfort
                  },

                  // 2. Standard border state
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#000000 !important",
                    borderWidth: "1px !important",
                  },

                  // 3. Hover state
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#000000 !important",
                  },

                  // 4. Active/Focused state (remains 1px and black)
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#000000 !important",
                    borderWidth: "1px !important",
                  },
                }}
              />
            </GlassCard>
          </Box>

          {/* --- 8. Media Upload Area --- */}
          {isChecked1 && (
            <Box sx={{ mt: 4, mb: 4, position: "relative" }}>
              <Box sx={{ position: "absolute", inset: "-2px", borderRadius: "16px", background: "linear-gradient(135deg,#06f9f3,#00b3ff,#06f9f3)", filter: "blur(4px)", zIndex: 0 }} />
              <Box sx={{ position: "relative", zIndex: 10, p: 3, borderRadius: 3, background: "#E2E8F0", border: "1px solid #E2E8F0" }}>
                <Box sx={{ display: "flex", gap: 1, mb: 1, color: LABEL_COLOR }}>
                  <CloudUpload size={24} />
                  <Typography sx={{ fontWeight: 700, fontSize: "1.3rem", fontFamily: TAJAWAL }}>إرفاق الصور والفيديو</Typography>
                </Box>
                <Typography sx={{ fontSize: "0.9rem", mb: 2, color: "#475569", fontFamily: TAJAWAL }}>يمكنك رفع صور العقار ومقاطع الفيديو التوضيحية</Typography>
                
                <input type="file" multiple id="file-upload" style={{ display: 'none' }} onChange={handleFileChange} accept="image/*,video/*" />
                <label htmlFor="file-upload">
                  <UploadBox>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 1 }}>
                      <CloudUpload size={32} color={COLOR_DEEP_BLUE} />
                      <Video size={32} color={COLOR_DEEP_BLUE} />
                    </Box>
                    <Typography sx={{ fontWeight: 700, fontFamily: TAJAWAL }}>اضغط هنا لرفع الصور أو الفيديو</Typography>
                  </UploadBox>
                </label>

                {loading && (
                  <Box sx={{ mt: 2, width: '100%' }}>
                    <LinearProgress variant="determinate" value={uploadProgress} sx={{ height: 10, borderRadius: 5, backgroundColor: '#CBD5E1', '& .MuiLinearProgress-bar': { backgroundColor: COLOR_PRIMARY_CYAN }}} />
                  </Box>
                )}

                {selectedFiles.length > 0 && (
                  <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {selectedFiles.map((file, idx) => (
                      <Box key={idx} sx={{ display: "flex", alignItems: "center", p: 1, borderRadius: "10px", border: "1px solid #cbd5e1", background: "#fff" }}>
                        {file.type.startsWith('video/') ? <Video size={16} style={{ marginLeft: '8px', color: '#023B4E' }} /> : <FileText size={16} style={{ marginLeft: '8px' }} />}
                        <Typography sx={{ fontSize: "0.75rem", maxWidth: "120px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{file.name}</Typography>
                        <IconButton size="small" onClick={() => removeFile(idx)} sx={{ color: "red" }}><X size={14} /></IconButton>
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            </Box>
          )}

          {/* --- 9. Price --- */}
          {!isChecked2 && dropdownValues[0] !== "شقة" && (
            <Box sx={{ mt: 5, position: "relative" }}>
              <NeonGlowLayer />
              <GlassCard sx={{ p: 3 }}>
                <Box sx={{ display: "flex", gap: 1, mb: 2, color: LABEL_COLOR, alignItems: 'center' }}><StraightenIcon /><Typography sx={{ fontWeight: 800, fontSize: "1.5rem", fontFamily: TAJAWAL }}>قيمة الإيجار</Typography></Box>
                <StyledTextField
                  fullWidth
                  placeholder={isChecked1 ? "اكتب السعر المقترح..." : "قيمة الإيجار"}
                  sx={{
                    // 1. Responsive Width
                    width: { xs: "100%", md: "40%" },

                    // 2. Container background and shape
                    "& .MuiInputBase-root": {
                      borderRadius: "8px",
                      backgroundColor: "#fff",
                    },

                    // 3. Standard border state (Fixed Black 1px)
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#000000 !important",
                      borderWidth: "1px !important",
                    },

                    // 4. Hover state
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#000000 !important",
                    },

                    // 5. Focused state (locks border at 1px black)
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#000000 !important",
                      borderWidth: "1px !important",
                    },
                  }}
                />
              </GlassCard>
            </Box>
          )}

          {shouldShowCard && (
            <Box sx={{ mt: 5, position: "relative" }}>
              <NeonGlowLayer />
              <GlassCard sx={{ p: 4 }}>
                {/* HEADER */}
                <Box sx={{ display: "flex", gap: 1, mb: 4, color: LABEL_COLOR, alignItems: 'center' }}>
                  <AccountBalanceWalletIcon sx={{ fontSize: "1.8rem" }} />
                  <Typography sx={{ fontWeight: 800, fontSize: "1.6rem", fontFamily: TAJAWAL }}>
                    القيمة الإيجارية
                  </Typography>
                </Box>

                {/* ROW CONTAINER - Desktop: Row, Mobile: Column */}
                <Box sx={{ 
                  display: "flex", 
                  flexDirection: { xs: "column", md: "row" }, 
                  gap: 2, // Space between the two groups (From and To)
                  alignItems: "center" 
                }}>
                  
                  {/* 1. From (من) */}
                  <Box sx={{ display: "flex", alignItems: "center", flex: 1, width: "100%" }}>
                    <Box sx={{ display: "flex", alignItems: "center", minWidth: "40px" }}> {/* Reduced minWidth */}
                      <Typography sx={{ fontFamily: TAJAWAL, fontSize: "1.1rem", fontWeight: 600 }}>
                        من
                      </Typography>
                    </Box>
                   <StyledTextField
                    size="small"
                    value={priceLimit}
                    onChange={(e) => setPriceLimit(e.target.value)}
                    sx={{
                      // 1. Maintain flex layout
                      flex: 1,

                      // 2. Container background and shape
                      "& .MuiInputBase-root": {
                        borderRadius: "8px",
                        backgroundColor: "#fff",
                      },

                      // 3. Standard border state (Fixed Black 1px)
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#000000 !important",
                        borderWidth: "1px !important",
                      },

                      // 4. Hover state
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#000000 !important",
                      },

                      // 5. Focused state (locks border at 1px black)
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#000000 !important",
                        borderWidth: "1px !important",
                      },
                    }}
                  />
                  </Box>

                  {/* 2. To (إلى) */}
                  <Box sx={{ display: "flex", alignItems: "center", flex: 1, width: "100%" }}>
                    <Box sx={{ display: "flex", alignItems: "center", minWidth: "40px" }}> {/* Reduced minWidth */}
                      <Typography sx={{ fontFamily: TAJAWAL, fontSize: "1.1rem", fontWeight: 600 }}>
                        إلى
                      </Typography>
                    </Box>
                <StyledTextField
                  size="small"
                  value={priceOffer}
                  onChange={(e) => setPriceOffer(e.target.value)}
                  sx={{
                    // 1. Maintain your flex layout
                    flex: 1,

                    // 2. Container background and shape
                    "& .MuiInputBase-root": {
                      borderRadius: "8px",
                      backgroundColor: "#fff",
                    },

                    // 3. Standard border state (Fixed Black 1px)
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#000000 !important",
                      borderWidth: "1px !important",
                    },

                    // 4. Hover state
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#000000 !important",
                    },

                    // 5. Focused state (Stays 1px and black)
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#000000 !important",
                      borderWidth: "1px !important",
                    },
                  }}
                />
                  </Box>
                </Box>
              </GlassCard>
            </Box>
          )}

          {/* --- 10. CONTACT CHANNELS SECTION --- */}
          <Box sx={{ mb: 6, position: "relative", mt: 5 }}>
            <NeonGlowLayer sx={{ borderRadius: "16px" }} />
            <Box sx={{ position: "relative", zIndex: 10, p: 3, borderRadius: 3, border: "1px solid #E2E8F0", background: "#E2E8F0" }}>
              <Typography sx={{ fontWeight: 800, fontSize: "1.3rem", mb: 0.5, color: LABEL_COLOR, fontFamily: TAJAWAL }}>قنوات التواصل</Typography>
              <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 1, mb: 2, width: "100%" }}>
                <FormControlLabel control={<Checkbox size="small" checked={channels.call} onChange={(e) => setChannels({ ...channels, call: e.target.checked })} />} label={<Typography sx={{ fontFamily: TAJAWAL, fontSize: { xs: '12px', sm: '18px' } }}>الرجاء التواصل على الرقم</Typography>} />
                <Typography sx={{ fontFamily: "TAJAWAL", fontWeight: 800, fontSize: { xs: "11px", sm: "16px" }, color: "#1D4ED8", backgroundColor: "#F8FAFC", px: 3, py: 0.5, borderRadius: "999px", boxShadow: "0 4px 12px rgba(37,99,235,0.25)" }}>📞 +966 50 985 5666</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "flex-start", gap: 8, alignItems: "center", mb: 3, marginRight: '27px' }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}><WhatsAppIcon sx={{ color: "#25D366" }} /><Typography sx={{ fontFamily: TAJAWAL }}>واتساب</Typography></Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}><PhoneIcon sx={{ color: LABEL_COLOR }} /><Typography sx={{ fontFamily: TAJAWAL }}>جوال</Typography></Box>
              </Box>
              <Divider sx={{ my: 3, borderColor: "#1f2937", borderBottomWidth: "2px" }} />
              <FormControlLabel sx={{ mb: 3 }} control={<Checkbox checked={channels.chat} onChange={(e) => setChannels({ ...channels, chat: e.target.checked })} />} label={<Typography sx={{ fontFamily: TAJAWAL, fontSize: '18px', fontWeight: 'bold' }}> اترك اسمك وجوالك للتواصل معك لاحقًا </Typography>} />
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}><Typography sx={{ minWidth: 120, fontFamily: TAJAWAL, fontWeight: 600 }}> الاسم </Typography><StyledTextField
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{
                  // 1. Container background and shape
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                    backgroundColor: "#fff", // White background to match your recent inputs
                  },

                  // 2. Standard border state (Fixed Black 1px)
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#000000 !important",
                    borderWidth: "1px !important",
                  },

                  // 3. Hover state
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#000000 !important",
                  },

                  // 4. Active/Focused state (locks border at 1px black)
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#000000 !important",
                    borderWidth: "1px !important",
                  },
                }}
              /></Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}><Typography sx={{ minWidth: 120, fontFamily: TAJAWAL, fontWeight: 600 }}> الجوال </Typography><StyledTextField
                fullWidth
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                sx={{
                  // 1. Container background and shape
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                    backgroundColor: "#fff", 
                  },

                  // 2. Standard border state (Fixed Black 1px)
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#000000 !important",
                    borderWidth: "1px !important",
                  },

                  // 3. Hover state
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#000000 !important",
                  },

                  // 4. Active/Focused state (locks border at 1px black)
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#000000 !important",
                    borderWidth: "1px !important",
                  },
                }}
              /></Box>
            </Box>
          </Box>

          <Box sx={{ mt: 10, textAlign: "center", pb: 5 }}>
            <SubmitButton onClick={handleSubmit} endIcon={<Send size={30} style={{ marginRight: '15px' }} />}>إرسال الطلب وحفظ البيانات</SubmitButton>
          </Box>
        </GlassCard>
      </Container>
    </Box>
  );
};

export default Service03;