// src/Page/Service/Service01.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  MenuItem,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Divider,
  Snackbar,
  styled,
  Alert,
  keyframes,
} from "@mui/material";

/* ---------------- ICONS ---------------- */
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import StraightenIcon from "@mui/icons-material/Straighten";
import EditNoteIcon from "@mui/icons-material/EditNote";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneIcon from "@mui/icons-material/Phone";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { Send, Sparkles, CheckCircle } from "lucide-react";

/* ---------------- TYPES ---------------- */
type Props = {
  onSubmit?: (data: {
    dropdowns: string[];
    notes: string;
    search: string;
    channels: {
      chat: boolean;
      whatsapp: boolean;
      call: boolean;
    };
    name: string;
    mobile: string;
    location: string;
    developer: string;
    area: string;
    rooms: string;
    bathrooms: string;
    propertyAge: string;
    priceLimit: string;
    priceOffer: string;
    checkboxValues: boolean[];
    paymentMethod: string;
  }) => void;
};

/* ---------------- CONSTANTS ---------------- */
const TAJAWAL = "'Tajawal', sans-serif";
const COLOR_PRIMARY_CYAN = "#06f9f3";
const COLOR_DEEP_BLUE = "#023B4E";
const LABEL_COLOR = "#023B4E";

const GlassCard = styled(Box)(({ }) => ({
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

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

/* ---------------- ANIMATIONS ---------------- */
const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

/* ---------------- REUSABLE GLOW WRAPPER ---------------- */
const GlowWrapper: React.FC<{ children: React.ReactNode; sx?: any; onClick?: () => void }> = ({ children, sx, onClick }) => (
  <Box sx={{ position: "relative", borderRadius: 4, ...sx }} onClick={onClick}>
    <Box sx={{ position: "absolute", inset: "-2px", borderRadius: 4, background: "linear-gradient(135deg, #06f9f3, #00b3ff, #06f9f3)", filter: "blur(6px)", zIndex: 0 }} />
    <Box sx={{ position: "relative", zIndex: 1, p: 3, borderRadius: 4, border: "1px solid #CBD5E1", backgroundColor: "#E2E8F0", height: '100%' }}>
      {children}
    </Box>
  </Box>
);

/* ---------------- STYLED COMPONENTS ---------------- */
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
    fontSize: "1.2rem",
    fontWeight: 600,
    color: "#000",
  },
});

const SubmitButton = styled(Button)({
  background: `linear-gradient(45deg, ${COLOR_DEEP_BLUE} 30%, #086d8d 90%)`,
  color: "white",
  padding: "16px 48px",
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
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
    animation: `${shimmer} 3s infinite`,
  },
});

/* ---------------- DROPDOWN CONFIG ---------------- */
const DROPDOWN_FIELDS = [
  {
    label: "نوع العقار",
    icon: <HomeWorkIcon fontSize="small" />,
    options: ["قصر", "فيلا", "تاون هاوس", "شقة", "ملحق", "مزرعة", "استراحة", "مستودع", "أرض"],
  },
];

/* ---------------- COMPONENT ---------------- */
const Service01: React.FC<Props> = ({ onSubmit }) => {
  const [openSuccess, setOpenSuccess] = useState(false);
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  /* ---------------- STATES ---------------- */
  const [dropdownValues, setDropdownValues] = useState<Record<number, string>>({});
  const [notes, setNotes] = useState("");
  const [search] = useState("");
  const [channels, setChannels] = useState({
    chat: true,
    whatsapp: true,
    call: false,
  });
  
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [location, setLocation] = useState("");
  const [developer, setDeveloper] = useState("");
  const [area, setArea] = useState("");
  const [rooms, setRooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [propertyAgeSelection, setPropertyAgeSelection] = useState("");
  const [customAgeInput, setCustomAgeInput] = useState("");
  const [priceLimit, setPriceLimit] = useState("");
  const [priceOffer, setPriceOffer] = useState("");
  const [checkboxValues, setCheckboxValues] = useState([false, false]);
  const [isPaymentmethod, setisPaymentmethod] = useState<'yes' | 'no' | null>(null);

  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);

  /* ---------------- HANDLERS ---------------- */
  const handleAgeCheckboxChange = (type: string) => {
    setPropertyAgeSelection(type);
    if (type !== "custom") setCustomAgeInput("");
  };

  const handleDeveloperCheckbox = (index: number) => {
    if (index === 0) {
      setIsChecked1(true);
      setIsChecked2(false);
    } else {
      setIsChecked1(false);
      setIsChecked2(true);
      setDeveloper(""); 
    }
  };

  const propertyStatus = isChecked1 ? "جاهز" : isChecked2 ? "على الخارطة" : "غير محدد";

  /* ---------------- BUILD WHATSAPP MESSAGE ---------------- */
  const buildWhatsAppMessage = () => {
    const ageText = propertyAgeSelection === "new" ? "جديد" : propertyAgeSelection === "custom" ? customAgeInput : "غير محدد";
    const paymentText = isPaymentmethod === 'yes' ? "نقداً" : isPaymentmethod === 'no' ? "تمويل" : "غير محدد";

    return `
🏷 *حالة العقار:* ${propertyStatus}

🛒 *طلب شراء عقار جديد*

🏠 *نوع العقار:* ${dropdownValues[0] || "غير محدد"}
📍 *الموقع:* ${location || "غير محدد"}
🏗 *اسم المطور العقاري:* ${developer || "غير محدد"}
📐 *المساحة:* ${area || "غير محدد"}
🛏 *عدد الغرف:* ${rooms || "غير محدد"}
🚿 *دورات المياه:* ${bathrooms || "غير محدد"}
⏳ *عمر العقار:* ${ageText}
💳 *طريقة الدفع:* ${paymentText}

💰 *السعر:*
${priceLimit ? `- الميزانية المختارة: ${priceLimit}` : ""}
${checkboxValues[0] ? `- حد: ${priceLimit || "غير محدد"}` : ""}
${checkboxValues[1] ? `- على السوم: ${priceOffer || "غير محدد"}` : ""}

📝 *تفاصيل إضافية:*
${notes || "لا يوجد"}

👤 *الاسم:* ${name || "غير مدخل"}
📱 *الجوال:* ${mobile || "غير مدخل"}
    `;
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async () => {
    if (!channels.call && !channels.whatsapp && !channels.chat) {
      alert("يرجى اختيار وسيلة للتواصل");
      return;
    }
    if (channels.chat && (!name || !mobile)) {
      alert("يرجى إدخال الاسم والجوال للتواصل عبر الدردشة");
      return;
    }

    const payload = {
      propertyStatus,
      propertyType: dropdownValues[0] || "غير محدد",
      location,
      developer,
      area,
      rooms,
      bathrooms,
      propertyAge: propertyAgeSelection === "new" ? "جديد" : customAgeInput,
      priceLimit,
      priceOffer,
      paymentMethod: isPaymentmethod === 'yes' ? "نقداً" : isPaymentmethod === 'no' ? "تمويل" : "غير محدد",
      notes,
      name,
      mobile,
      channels,
      createdAt: new Date(),
    };

    try {
      await axios.post(`${API_BASE_URL}/api/save`, payload);
      setOpenSuccess(true);
      
      const phoneNumber = "966509855666";
      const message = buildWhatsAppMessage();
      const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappURL, "_blank");

      // RESET FIELDS
      setDropdownValues({});
      setNotes("");
      setChannels({ chat: true, whatsapp: true, call: false });
      setName("");
      setMobile("");
      setLocation("");
      setDeveloper("");
      setArea("");
      setRooms("");
      setBathrooms("");
      setPropertyAgeSelection("");
      setCustomAgeInput("");
      setPriceLimit("");
      setPriceOffer("");
      setCheckboxValues([false, false]);
      setisPaymentmethod(null);
      setIsChecked1(false);
      setIsChecked2(false);

      if (onSubmit) {
        onSubmit({
          ...payload,
          dropdowns: DROPDOWN_FIELDS.map((_, i) => dropdownValues[i] || ""),
          search,
          checkboxValues
        });
      }
    } catch (err) {
      console.error("Database save failed:", err);
      alert("حدث خطأ في الاتصال بالسيرفر");
    }
  };

  return (
    <Box
      sx={{ 
        minHeight: "100vh", 
        background: `linear-gradient(rgba(2, 59, 78, 0.8), rgba(2, 59, 78, 0.9)), url('https://i.ibb.co/hxkmfnF6/4.webp')`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        py: 2,
        direction: "rtl"
      }}
    >
      <Snackbar open={openSuccess} autoHideDuration={5000} onClose={() => setOpenSuccess(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="success" variant="filled" icon={<CheckCircle size={24} />} sx={{ borderRadius: "15px", fontFamily: TAJAWAL, fontSize: "1.1rem" }}>
          تم استلام طلبك! جاري تحويلك لواتساب...
        </Alert>
      </Snackbar>

      <Container maxWidth="md" sx={{ mt: { xs: 4, md: 8 }, mb: { xs: 6, md: 12 }, direction: "rtl", fontFamily: TAJAWAL }}>
        
        <Box sx={{ textAlign: "center", mb: 8, animation: `${float} 4s ease-in-out infinite`, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h1" sx={{ fontWeight: 900, fontSize: { xs: "2.5rem", md: "4rem" }, color: COLOR_PRIMARY_CYAN, fontFamily: TAJAWAL, textShadow: "0 10px 20px rgba(0,0,0,0.3)", display: 'flex', alignItems: 'center', gap: 1 }}>
            شراء العقار <Sparkles size={32} style={{ color: COLOR_PRIMARY_CYAN }} />
          </Typography>
          <Typography sx={{ color: "#fff", opacity: 0.9, fontSize: "1.2rem", mt: 2, fontFamily: TAJAWAL, maxWidth: "600px" }}>
            نحول رؤيتك إلى واقع ملموس بدقة واحترافية
          </Typography>
        </Box>
      <GlassCard sx={{ p: { xs: 2, md: 4 } }}>
        <Box sx={{ p: 0 }}>
            {/* STATUS SELECTOR - Added mb: 4 for space */}

            <Box 
            sx={{ 
              display: 'flex', 
              gap: { xs: 1, sm: 2 }, // Tight gap on mobile to save space
              mb: 4,
              flexDirection: 'row', // Force horizontal
              flexWrap: 'nowrap',   // Strictly prevent jumping to next line
              width: '100%'
            }}
          >
            {/* Ready / جاهز Option */}
            <GlowWrapper 
              sx={{ 
                flex: 1, 
                cursor: "pointer",
                minWidth: 0 // Prevents flex child from overflowing
              }} 
              onClick={() => handleDeveloperCheckbox(0)}
            >
              <Box sx={{ textAlign: "center", display: 'flex', justifyContent: 'center' }}>
                <FormControlLabel
                  sx={{ 
                    margin: 0, 
                    pointerEvents: "none",
                    '& .MuiFormControlLabel-label': { width: '100%' }
                  }}
                  control={
                    <Checkbox 
                      checked={isChecked1} 
                      sx={{ 
                        p: { xs: 0.5, sm: 1 }, // Reduce padding around checkbox on mobile
                        "& .MuiSvgIcon-root": { 
                          fontSize: { xs: 24, sm: 30, md: 35 } 
                        } 
                      }} 
                    />
                  }
                  label={
                    <Typography 
                      sx={{ 
                        fontFamily: TAJAWAL, 
                        fontSize: { xs: "0.9rem", sm: "1.2rem", md: "1.6rem" }, 
                        fontWeight: 800,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      جاهز
                    </Typography>
                  }
                />
              </Box>
            </GlowWrapper>

            {/* Off-plan / على الخارطة Option */}
            <GlowWrapper 
              sx={{ 
                flex: 1, 
                cursor: "pointer",
                minWidth: 0 
              }} 
              onClick={() => handleDeveloperCheckbox(1)}
            >
              <Box sx={{ textAlign: "center", display: 'flex', justifyContent: 'center' }}>
                <FormControlLabel
                  sx={{ 
                    margin: 0, 
                    pointerEvents: "none",
                    '& .MuiFormControlLabel-label': { width: '100%' }
                  }}
                  control={
                    <Checkbox 
                      checked={isChecked2} 
                      sx={{ 
                        p: { xs: 0.5, sm: 1 },
                        "& .MuiSvgIcon-root": { 
                          fontSize: { xs: 24, sm: 30, md: 35 } 
                        } 
                      }} 
                    />
                  }
                  label={
                    <Typography 
                      sx={{ 
                        fontFamily: TAJAWAL, 
                        fontSize: { xs: "0.9rem", sm: "1.2rem", md: "1.6rem" }, 
                        fontWeight: 800,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      على الخارطة
                    </Typography>
                  }
                />
              </Box>
            </GlowWrapper>
          </Box>


            {/* ---------------- DROPDOWNS - Added mb: 4 ---------------- */}
              {DROPDOWN_FIELDS.map((field, i) => (
                <GlowWrapper key={i} sx={{ mb: 4 }}>
                  <Box sx={{ display: "flex", gap: 1.5, mb: 3, color: LABEL_COLOR, alignItems: "center" }}>
                    <Box sx={{ p: 1, borderRadius: "50%", backgroundColor: "rgba(2, 59, 78, 0.1)", display: "flex" }}>
                      {field.icon}
                    </Box>
                    <Typography sx={{ fontWeight: 800, fontSize: "1.8rem", fontFamily: TAJAWAL }}>
                      {field.label}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }, gap: 2 }}>
                    {field.options.map((opt, idx) => (
                      <FormControlLabel
                        key={idx}
                        control={
                          <Checkbox
                            checked={dropdownValues[i] === opt}
                            onChange={(e) =>
                              setDropdownValues({ ...dropdownValues, [i]: e.target.checked ? opt : "" })
                            }
                          />
                        }
                        label={<Typography sx={{ fontFamily: TAJAWAL, fontSize: "1.3rem", fontWeight: 600 }}>{opt}</Typography>}
                      />
                    ))}
                  </Box>
                </GlowWrapper>
              ))}

              {/* ---------------- LOCATION - Added mb: 4 ---------------- */}
              <GlowWrapper sx={{ mb: 4 }}>
                <Box sx={{ display: "flex", gap: 1.5, mb: 1, color: LABEL_COLOR, alignItems: "center" }}>
                  <HomeWorkIcon />
                  <Typography sx={{ fontWeight: 800, fontSize: "1.5rem", fontFamily: TAJAWAL }}>الموقع</Typography>
                </Box>
                <Typography sx={{ fontSize: "1.1rem", mb: 3, color: "#475569", fontFamily: TAJAWAL, fontWeight: 700 }}>
                  الرجاء كتابة موقع العقار المراد شرائه بالتفصيل
                </Typography>
               <StyledTextField
                fullWidth
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="اكتب الموقع هنا..."
                sx={{
                  // Targets the input text
                  "& .MuiInputBase-input": {
                    fontFamily: TAJAWAL,
                    fontWeight: 300, // Light weight
                    fontSize: { xs: "0.95rem", md: "1.1rem" },
                    padding: { xs: "10px 14px", md: "12px 16px" }, // Optimized padding for touch
                  },
                  // Targets the placeholder
                  "& .MuiInputBase-input::placeholder": {
                    fontWeight: 300,
                    opacity: 0.7,
                    fontSize: { xs: "0.9rem", md: "1rem" },
                  },
                  // Responsive margin bottom if needed
                  mb: 2,
                }}
              />
              </GlowWrapper>

              {/* ---------------- AREA & DETAILS - Added mb: 4 ---------------- */}
              <GlowWrapper sx={{ mb: 4 }}>
                <Box 
                  sx={{ 
                    display: "flex", 
                    flexDirection: { xs: "column", md: "row" }, // Vertical on mobile, Horizontal on desktop
                    alignItems: { xs: "flex-start", md: "center" }, 
                    justifyContent: "space-between", // Pushes content to opposite sides if needed
                    gap: 2, 
                    mb: 3, 
                    width: "100%" 
                  }}
                >
                  {/* LABEL SECTION */}
                  <Box sx={{ flexShrink: 0 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5, color: LABEL_COLOR }}>
                      <StraightenIcon />
                      <Typography 
                        sx={{ 
                          fontWeight: 700, 
                          fontSize: "1.2rem", 
                          fontFamily: TAJAWAL,
                          display: "flex",
                          alignItems: "center",
                          gap: "10px"
                        }}
                      >
                        المساحة
                        <Box 
                          component="span" 
                          sx={{ 
                            fontSize: "1rem", 
                            fontWeight: 400,
                            color: "gray"
                          }}
                        >
                          (اختياري)
                        </Box>
                      </Typography>
                    </Box>
                    
                    <Typography sx={{ fontSize: "1.1rem", mb: 3, color: "#475569", fontFamily: TAJAWAL, fontWeight: 700 }}>
                      الرجاء كتابة المساحة
                    </Typography>
                  </Box>

                  {/* TEXTBOX SECTION - 50% Width on Desktop */}

                <Box sx={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
                  <StyledTextField 
                    value={area} 
                    onChange={(e) => setArea(e.target.value)} 
                    sx={{
                      width: { xs: '100%', md: '30%' }
                    }}
                  />
                </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                  <Typography sx={{ minWidth: 120, fontFamily: TAJAWAL, fontWeight: 600 }}>عدد الغرف</Typography>
                  <StyledTextField
                    size="small"
                    placeholder="عدد الغرف"
                    value={rooms}
                    onChange={(e) => setRooms(e.target.value)}
                    sx={{ 
                      // Responsive width: 48% on mobile to fit two per line, 40% on desktop
                      width: { xs: "48%", sm: "40%" }, 
                      "& .MuiInputBase-input": {
                        fontFamily: TAJAWAL,
                        fontWeight: 300, // Light weight
                        fontSize: { xs: "0.85rem", md: "0.95rem" },
                      },
                      "& .MuiInputBase-input::placeholder": {
                        fontWeight: 300,
                        fontSize: { xs: "0.8rem", md: "0.9rem" },
                      }
                    }}
                  />             
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                  <Typography sx={{ minWidth: 120, fontFamily: TAJAWAL, fontWeight: 600 }}>عدد دورات المياه</Typography>
                  <StyledTextField
                    size="small"
                    placeholder="عدد دورات المياه"
                    value={bathrooms}
                    onChange={(e) => setBathrooms(e.target.value)}
                    sx={{ 
                      // Responsive width: wider on mobile, 40% on desktop
                      width: { xs: "100%", sm: "40%" }, 
                      "& .MuiInputBase-input": {
                        fontFamily: TAJAWAL,
                        fontWeight: 300, // Light weight
                        fontSize: { xs: "0.85rem", md: "0.95rem" }, // Slightly smaller for "small" variant
                      },
                      "& .MuiInputBase-input::placeholder": {
                        fontWeight: 300,
                        fontSize: { xs: "0.8rem", md: "0.9rem" },
                        opacity: 0.8
                      },
                      // Ensure the height looks balanced with the light font
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                      }
                    }}
                  />             
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 3 }}>
                  <Typography sx={{ minWidth: 120, fontFamily: TAJAWAL, fontWeight: 600 }}>عمر العقار</Typography>
                  <FormControlLabel
                    control={<Checkbox checked={propertyAgeSelection === "new"} onChange={() => handleAgeCheckboxChange("new")} />}
                    label={<Typography sx={{ fontFamily: TAJAWAL }}>جديد</Typography>}
                  />
                  <FormControlLabel
                    control={<Checkbox checked={propertyAgeSelection === "custom"} onChange={() => handleAgeCheckboxChange("custom")} />}
                    label={<Typography sx={{ fontFamily: TAJAWAL }}>أكثر من سنة</Typography>}
                  />
                  <TextField
                    size="small"
                    value={customAgeInput}
                    onChange={(e) => {
                      const val = e.target.value;
                      setCustomAgeInput(val);
                      if (val.trim() !== "") handleAgeCheckboxChange("custom");
                      else handleAgeCheckboxChange("");
                    }}
                    sx={{ width: 120, backgroundColor: "white", borderRadius: "8px" }}
                  />
                </Box>
              </GlowWrapper>

              {/* ---------------- ADDITIONAL NOTES - Added mb: 4 ---------------- */}
              <GlowWrapper sx={{ mb: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
                  <EditNoteIcon sx={{ color: LABEL_COLOR, fontSize: "2rem" }} />
                  <Typography sx={{ fontWeight: 800, fontSize: "1.8rem", color: LABEL_COLOR, fontFamily: TAJAWAL }}>
                    تفاصيل إضافية
                  </Typography>
                </Box>
                <Typography sx={{ mt: 0.5, mb: 2, fontSize: "1.1rem", color: "#475569", fontFamily: TAJAWAL, fontWeight: 700 }}>
                  اذكر أي ملاحظات أو متطلبات خاصة تساعدنا في خدمتك بشكل أفضل
                </Typography>
                  <StyledTextField
                    multiline
                    minRows={4}
                    fullWidth
                    placeholder="اكتب ملاحظاتك هنا..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    sx={{
                      // Targets the actual text inside the field
                      "& .MuiInputBase-input": {
                        fontFamily: TAJAWAL,
                        fontWeight: 300, // Light weight
                        fontSize: { xs: "0.95rem", md: "1.1rem" }, // Smaller on mobile
                        lineHeight: 1.6,
                      },
                      // Targets the placeholder specifically to ensure it's also light
                      "& .MuiInputBase-input::placeholder": {
                        fontWeight: 300,
                        opacity: 0.7,
                      },
                      // Optional: Adds a bit of padding for better mobile touch experience
                      "& .MuiOutlinedInput-root": {
                        px: { xs: 1.5, md: 2 },
                        py: { xs: 1.5, md: 2 },
                      }
                    }}
                  />
              </GlowWrapper>

              {/* ---------------- BUDGET - Added mb: 4 ---------------- */}
              <GlowWrapper sx={{ mb: 4 }}>
                <Box sx={{ display: "flex", gap: 1.5, mb: 1, color: LABEL_COLOR, alignItems: "center" }}>
                  <AccountBalanceWalletIcon />
                  <Typography sx={{ fontWeight: 800, fontSize: "1.5rem", fontFamily: TAJAWAL }}>الميزانية</Typography>
                </Box>
                <Typography sx={{ fontSize: "1.1rem", mb: 3, color: "#475569", fontFamily: TAJAWAL, fontWeight: 700 }}>
                  الرجاء اختيار الميزانية المتاحة
                </Typography>
                <StyledTextField
                  select
                  fullWidth
                  value={priceLimit}
                  onChange={(e) => setPriceLimit(e.target.value)}
                >
              {/* Option 1: Less than 500,000 */}
              <MenuItem value="أقل من 500,000" sx={{ fontFamily: TAJAWAL, display: "flex", justifyContent: "flex-end", width: "100%" }}>
                <span style={{ marginRight: "1.5rem" }}>500,000</span>
                <span style={{ marginRight: "0.5rem" }}>أقل من</span>
              </MenuItem>

              {/* Option 2: 500,000 to 1,000,000 */}
              <MenuItem value="500,000 إلى 1,000,000" sx={{ fontFamily: TAJAWAL, display: "flex", justifyContent: "flex-end", width: "100%" }}>
                <span style={{ marginRight: "1.5rem" }}>1,000,000</span>
                <span style={{ marginRight: "1.5rem" }}>إلى</span>
                <span style={{ marginRight: "1.5rem" }}>500,000</span>
                <span style={{ marginRight: "0.5rem" }}>من</span>
              </MenuItem>

              {/* Option 3: 1,000,000 to 1,500,000 */}
              <MenuItem value="1,000,000 إلى 1,500,000" sx={{ fontFamily: TAJAWAL, display: "flex", justifyContent: "flex-end", width: "100%" }}>
                <span style={{ marginRight: "1.5rem" }}>1,500,000</span>
                <span style={{ marginRight: "1.5rem" }}>إلى</span>
                <span style={{ marginRight: "1.5rem" }}>1,000,000</span>
                <span style={{ marginRight: "0.5rem" }}>من</span>
              </MenuItem>

              {/* Option 4: 1,500,000 to 2,000,000 */}
              <MenuItem value="1,500,000 إلى 2,000,000" sx={{ fontFamily: TAJAWAL, display: "flex", justifyContent: "flex-end", width: "100%" }}>
                <span style={{ marginRight: "1.5rem" }}>2,000,000</span>
                <span style={{ marginRight: "1.5rem" }}>إلى</span>
                <span style={{ marginRight: "1.5rem" }}>1,500,000</span>
                <span style={{ marginRight: "0.5rem" }}>من</span>
              </MenuItem>

              {/* Option 5: More than 2,000,000 */}
              <MenuItem value="2,000,000 فأكثر" sx={{ fontFamily: TAJAWAL, display: "flex", justifyContent: "flex-end", width: "100%" }}>
                <span style={{ marginRight: "2.1rem" }}>فأكثر</span>
                <span style={{ marginRight: "1.5rem" }}>2,000,000</span>
                <span style={{ marginRight: "0.5rem" }}>من</span>
              </MenuItem>
                </StyledTextField>
              </GlowWrapper>

              {/* ---------------- PAYMENT METHOD - Added mb: 4 ---------------- */}
              <GlowWrapper sx={{ mb: 4 }}>
                {/* Header Section */}
                <Box sx={{ display: "flex", gap: 1, mb: 2, color: LABEL_COLOR }}>
                  <LocalOfferIcon />
                  <Typography 
                    sx={{ 
                      fontWeight: 700, 
                      // Responsive Font Size: 1.1rem on mobile, 1.3rem on desktop
                      fontSize: { xs: "1.1rem", md: "1.3rem" }, 
                      fontFamily: TAJAWAL 
                    }}
                  >
                    طريقة الدفع
                  </Typography>
                </Box>

                {/* Selection Section */}
                <Box 
                  sx={{ 
                    display: "flex", 
                    // Reduce gap on mobile (2) vs desktop (8)
                    gap: { xs: 4, sm: 8 }, 
                    mt: 4, 
                    mb: 2, 
                    justifyContent: "flex-start", 
                    px: 2 
                  }}
                >
                  {/* Cash Option */}
                  <Box onClick={() => setisPaymentmethod('yes')} sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                    <Checkbox 
                      checked={isPaymentmethod === "yes"} 
                      color="success" 
                      // Slightly smaller scale for mobile
                      sx={{ transform: { xs: "scale(1.1)", md: "scale(1.4)" }, ml: 1 }} 
                    />
                    <Typography 
                      sx={{ 
                        fontFamily: TAJAWAL, 
                        fontWeight: 800, 
                        // Responsive Font Size: 1.2rem on mobile, 1.6rem on desktop
                        fontSize: { xs: "1.2rem", md: "1.6rem" }, 
                        color: isPaymentmethod === "yes" ? "#2e7d32" : "#64748B" 
                      }}
                    >
                      نقدا
                    </Typography>
                  </Box>

                  {/* Finance Option */}
                  <Box onClick={() => setisPaymentmethod('no')} sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                    <Checkbox 
                      checked={isPaymentmethod === "no"} 
                      color="success" 
                      sx={{ transform: { xs: "scale(1.1)", md: "scale(1.4)" }, ml: 1 }} 
                    />
                    <Typography 
                      sx={{ 
                        fontFamily: TAJAWAL, 
                        fontWeight: 800, 
                        fontSize: { xs: "1.2rem", md: "1.6rem" }, 
                        color: isPaymentmethod === "no" ? "#2e7d32" : "#64748B" 
                      }}
                    >
                      تمويل
                    </Typography>
                  </Box>
                </Box>
              </GlowWrapper>

              {/* ---------------- CONTACT CHANNELS - Added mb: 4 ---------------- */}
              <Box sx={{ mb: 4, position: "relative" }}>
                <Box sx={{ position: "absolute", inset: "-2px", borderRadius: "16px", background: "linear-gradient(135deg,#06f9f3,#00b3ff,#06f9f3)", filter: "blur(4px)", zIndex: 0 }} />
                <Box sx={{ position: "relative", zIndex: 10, p: 3, borderRadius: 3, border: "1px solid #E2E8F0", background: "#E2E8F0" }}>
                  <Typography sx={{ fontWeight: 800, fontSize: "1.3rem", mb: 0.5, color: LABEL_COLOR, fontFamily: TAJAWAL }}>قنوات التواصل</Typography>
                  <Typography sx={{ fontSize: "1rem", mb: 3, color: "#242629ff", fontFamily: TAJAWAL, fontWeight: 'bold' }}>وسائل التواصل المتعددة تتيح الرد السريع من الفريق المختص</Typography>
                  
                  <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 1, mb: 2, width: "100%", flexWrap: "nowrap" }}>
                    <FormControlLabel sx={{ mr: 0, flexShrink: 0 }} control={<Checkbox size="small" checked={channels.call} onChange={(e) => setChannels({ ...channels, call: e.target.checked })} />} label={<Typography sx={{ fontFamily: TAJAWAL, fontSize: { xs: '12px', sm: '16px', md: '18px' }, whiteSpace: "nowrap" }}>الرجاء التواصل على الرقم</Typography>} />
                    <Box sx={{ display: "flex", justifyContent: "flex-end", minWidth: 0, flexShrink: 1 }}>
                      <Typography sx={{ fontFamily: "TAJAWAL", fontWeight: 800, fontSize: { xs: "11px", sm: "16px", md: "20px" }, color: "#1D4ED8", backgroundColor: "#F8FAFC", px: { xs: 1, md: 3 }, py: 0.5, borderRadius: "999px", boxShadow: "0 4px 12px rgba(37,99,235,0.25)", cursor: "pointer", whiteSpace: "nowrap", border: "1px solid rgba(29, 78, 216, 0.1)" }}>
                        📞 +966 50 985 5666
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", justifyContent: "flex-start", gap: 8, alignItems: "center", mb: 3, marginRight: '27px' }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}><WhatsAppIcon sx={{ color: "#25D366" }} /><Typography sx={{ fontFamily: TAJAWAL }}>واتساب</Typography></Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}><PhoneIcon /><Typography sx={{ fontFamily: TAJAWAL }}>جوال</Typography></Box>
                  </Box>
                  
                  <Divider sx={{ my: 3, borderColor: "#1f2937", borderBottomWidth: "2px" }} />
                  <FormControlLabel sx={{ mb: 3 }} control={<Checkbox checked={channels.chat} onChange={(e) => setChannels({ ...channels, chat: e.target.checked })} />} label={<Typography sx={{ fontFamily: TAJAWAL, fontSize: '18px', fontWeight: 'bold' }}> اترك اسمك وجوالك للتواصل معك لاحقًا </Typography>} />
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                    <Typography sx={{ minWidth: 120, fontFamily: TAJAWAL, fontWeight: 600, fontSize: '18px' }}> الاسم </Typography>
                    <StyledTextField fullWidth value={name} onChange={(e) => setName(e.target.value)} />
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography sx={{ minWidth: 120, fontFamily: TAJAWAL, fontWeight: 600, fontSize: '18px' }}> الجوال </Typography>
                    <StyledTextField fullWidth value={mobile} onChange={(e) => setMobile(e.target.value)} />
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* ---------------- SUBMIT ---------------- */}
            <Box sx={{ mt: 8, textAlign: "center", pb: 10 }}>
              <SubmitButton onClick={handleSubmit} endIcon={<Send size={24} style={{ marginRight: '8px' }} />}>
                ارسال الطلب الآن
              </SubmitButton>
            </Box>
      </GlassCard> 
      </Container> 
    </Box>  
  );
};

export default Service01;