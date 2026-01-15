// src/Page/Service/Service01.tsx
import React, { useEffect } from "react";
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
  styled 
} from "@mui/material";
import { Send } from "lucide-react";

/* ---------------- ICONS ---------------- */
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import StraightenIcon from "@mui/icons-material/Straighten";
import EditNoteIcon from "@mui/icons-material/EditNote";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneIcon from "@mui/icons-material/Phone";
import { keyframes } from "@mui/system";
import { Sparkles } from "lucide-react";

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
  }) => void;
};

/* ---------------- CONSTANTS ---------------- */
const TAJAWAL = "'Tajawal', sans-serif";
const COLOR_PRIMARY_CYAN = "#06f9f3";
const COLOR_DEEP_BLUE = "#023B4E";
const LABEL_COLOR = "#023B4E";

// VITE ENVIRONMENT VARIABLE
const API_BASE_URL = import.meta.env.VITE_API_URL;

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

/* ---------------- DROPDOWN CONFIG ---------------- */
const DROPDOWN_FIELDS = [
  {
    label: "نوع العقار",
    icon: <HomeWorkIcon fontSize="small" />,
    options: ["قصر", "فيلا", "تاون هاوس", "شقة", "ملحق", "مزرعة", "استراحة", "مستودع", "أرض"],
  },
];

/* ---------------- COMPONENT ---------------- */
const Service2: React.FC<Props> = ({ onSubmit }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // --- STATE MANAGEMENT ---
  const [dropdownValues, setDropdownValues] = React.useState<Record<number, string>>({});
  const [notes, setNotes] = React.useState("");
  const [search] = React.useState("");

  const [channels, setChannels] = React.useState({
    chat: true,
    whatsapp: true,
    call: false,
  });

  const [name, setName] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [developer, setDeveloper] = React.useState("");
  const [area, setArea] = React.useState("");
  const [priceLimit, setPriceLimit] = React.useState("");
  const [priceOffer, setPriceOffer] = React.useState("");
  const [isChecked1, setIsChecked1] = React.useState(false);
  const [isChecked2, setIsChecked2] = React.useState(false);
  const [checkboxValues, setCheckboxValues] = React.useState<boolean[]>([false, false]);

  // --- POPUP ALERT STATES ---
  const [openPopup, setOpenPopup] = React.useState(false);
  const [alertSeverity, setAlertSeverity] = React.useState<"success" | "error">("success");
  const [alertMessage, setAlertMessage] = React.useState("");

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

  const handleCheckboxChange = (index: number, value: boolean) => {
    const updated = [...checkboxValues];
    updated[index] = value;
    setCheckboxValues(updated);
  };

  const propertyStatus = isChecked1 ? "جاهز" : isChecked2 ? "على الخارطة" : "غير محدد";

  const buildWhatsAppMessage = () => {
    return `
🏷 *حالة العقار:* ${propertyStatus}
🛒 *طلب بيع عقار جديد*
🏠 *نوع العقار:* ${dropdownValues[0] || "غير محدد"}
📍 *الموقع:* ${location || "غير محدد"}
🏗 *اسم المطور العقاري:* ${developer || "غير محدد"}
📐 *المساحة:* ${area || "غير محدد"}
💰 *سعر البيع:*
${checkboxValues[0] ? `- حد: ${priceLimit || "غير محدد"}` : ""}
${checkboxValues[1] ? `- على السوم: ${priceOffer || "غير محدد"}` : ""}
📝 *تفاصيل إضافية:*
${notes || "لا يوجد"}
📞 *قنوات التواصل:*
${channels.call ? "- اتصال هاتفي\n" : ""}${channels.whatsapp ? "- واتساب\n" : ""}${channels.chat ? "- اترك اسمك وجوالك\n" : ""}
👤 *الاسم:* ${name || "غير مدخل"}
📱 *الجوال:* ${mobile || "غير مدخل"}
`;
  };

  const handleSubmit = async () => {
    if (!channels.call && !channels.whatsapp && !channels.chat) {
      setAlertSeverity("error");
      setAlertMessage("يرجى اختيار وسيلة للتواصل");
      setOpenPopup(true);
      return;
    }
    if (channels.chat && (!name || !mobile)) {
      setAlertSeverity("error");
      setAlertMessage("يرجى إدخال الاسم والجوال للتواصل");
      setOpenPopup(true);
      return;
    }

    const payload = {
      propertyStatus,
      propertyType: dropdownValues[0] || "",
      location,
      developer,
      area,
      priceLimit,
      priceOffer,
      notes,
      contactChannels: channels,
      clientName: name,
      clientMobile: mobile,
      date: new Date().toISOString(),
    };

    try {
        const response = await fetch(`${API_BASE_URL}/api/save-request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setAlertSeverity("success");
        setAlertMessage("تم حفظ البيانات بنجاح!");
        setOpenPopup(true);

        const phoneNumber = "966509855666";
        const message = buildWhatsAppMessage();
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, "_blank");

        // RESET FORM
        setDropdownValues({});
        setNotes("");
        setChannels({ chat: true, whatsapp: true, call: false });
        setName("");
        setMobile("");
        setLocation("");
        setDeveloper("");
        setArea("");
        setPriceLimit("");
        setPriceOffer("");
        setIsChecked1(false);
        setIsChecked2(false);
        setCheckboxValues([false, false]);

        if (onSubmit) {
          onSubmit({
            dropdowns: DROPDOWN_FIELDS.map((_, i) => dropdownValues[i] || ""),
            notes,
            search,
            channels,
          });
        }
      } else {
        throw new Error("Server Response Failed");
      }
    } catch (error) {
      setAlertSeverity("error");
      setAlertMessage("حدث خطأ في حفظ البيانات، يرجى المحاولة لاحقاً");
      setOpenPopup(true);
    }
  };

  return (
    <Box
      sx={{ 
      minHeight: "100vh", 
      background: `linear-gradient(rgba(203, 242, 239, 0.85), rgba(203, 242, 239, 0.85)), url('https://i.ibb.co/hxkmfnF6/4.webp')`,
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      py: 2,
      direction: "rtl"
    }}
    >
           {/* MATERIAL UI POPUP ALERT */}
        <Snackbar open={openPopup} autoHideDuration={6000} onClose={() => setOpenPopup(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <Alert onClose={() => setOpenPopup(false)} severity={alertSeverity} variant="filled" sx={{ width: '100%', fontSize: '1.2rem', fontFamily: TAJAWAL }}>
            {alertMessage}
          </Alert>
        </Snackbar>
      <Container maxWidth="md" sx={{ mt: { xs: 4, md: 8 }, mb: { xs: 6, md: 12 }, direction: "rtl", fontFamily: TAJAWAL }}>
        <Box 
          sx={{ 
            textAlign: "center", 
            mb: 8, 
            animation: `${float} 4s ease-in-out infinite`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Typography 
            variant="h1"
            sx={{ 
              fontWeight: 900, 
              fontSize: { xs: "2.5rem", md: "4rem" }, 
              color: COLOR_DEEP_BLUE, 
              fontFamily: TAJAWAL,
              textShadow: "0 10px 20px rgba(0,0,0,0.3)",
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            بيع العقار <Sparkles size={32} style={{ color: COLOR_DEEP_BLUE }} />
          </Typography>

          <Typography 
            sx={{ 
              color: "#000000", 
              opacity: 0.9, 
              fontSize: "1.2rem", 
              mt: 2, 
              fontFamily: TAJAWAL,
              maxWidth: "600px" 
            }}
          >
            نحول رؤيتك إلى واقع ملموس بدقة واحترافية
          </Typography>
        </Box>

        <GlassCard sx={{ p: { xs: 2, md: 4 } }}>
          {/* STATUS SELECTION CARDS */}
          <Box sx={{ display: "flex", flexDirection: "row", gap: { xs: 2, sm: 3 }, mb: 4, overflowX: "visible", p: 2, perspective: "1000px" }}>
            <Box sx={{ flex: 1, minWidth: { xs: 120, sm: "auto" }, position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Box sx={{ position: "absolute", inset: "-2px", borderRadius: "28px", background: "linear-gradient(135deg,#06f9f3,#00b3ff,#06f9f3)", filter: "blur(4px)", zIndex: 6 }} />
              <Box onClick={() => handleDeveloperCheckbox(0)} sx={{ width: "100%", p: { xs: 1, sm: 2 }, borderRadius: 3, border: "1px solid #E2E8F0", background: "#E2E8F0", textAlign: "center", cursor: "pointer", position: "relative", zIndex: 10 }}>
                <FormControlLabel sx={{ width: "100%", m: 0, pointerEvents: "none" }} control={<Checkbox checked={isChecked1} sx={{ "& .MuiSvgIcon-root": { fontSize: { xs: 28, sm: 40 } } }} />} label={<Typography sx={{ fontFamily: TAJAWAL, fontSize: { xs: "1rem", sm: "1.5rem" }, fontWeight: "bold" }}>جاهز</Typography>} />
              </Box>
            </Box>
            <Box sx={{ flex: 1, minWidth: { xs: 120, sm: "auto" }, position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Box sx={{ position: "absolute", inset: "-2px", borderRadius: "28px", background: "linear-gradient(135deg,#06f9f3,#00b3ff,#06f9f3)", filter: "blur(4px)", zIndex: 6 }} />
              <Box onClick={() => handleDeveloperCheckbox(1)} sx={{ width: "100%", p: { xs: 1, sm: 2 }, borderRadius: 3, border: "1px solid #E2E8F0", background: "#E2E8F0", textAlign: "center", cursor: "pointer", position: "relative", zIndex: 10 }}>
                <FormControlLabel sx={{ width: "100%", m: 0, pointerEvents: "none" }} control={<Checkbox checked={isChecked2} sx={{ "& .MuiSvgIcon-root": { fontSize: { xs: 28, sm: 40 } } }} />} label={<Typography sx={{ fontFamily: TAJAWAL, fontSize: { xs: "1rem", sm: "1.5rem" }, fontWeight: "bold" }}>على الخارطة</Typography>} />
              </Box>
            </Box>
          </Box>

          {/* DROPDOWN OPTIONS GRID */}
          <Box sx={{ display: "grid", gap: 3 }}>
            {DROPDOWN_FIELDS.map((field, i) => (
              <Box key={i} sx={{ position: "relative" }}>
                <Box sx={{ position: "absolute", inset: "-2px", borderRadius: "16px", background: "linear-gradient(135deg,#06f9f3,#00b3ff,#06f9f3)", filter: "blur(4px)", zIndex: 0 }} />
                <Box sx={{ position: "relative", zIndex: 10, p: 3, borderRadius: 3, border: "1px solid #E2E8F0", background: "#E2E8F0" }}>
                  <Box sx={{ display: "flex", gap: 1, mb: 2, color: LABEL_COLOR, alignItems: 'center' }}>
                    {field.icon}
                    <Typography sx={{ fontWeight: 800, fontSize: { xs: "1.2rem", md: "1.6rem" }, fontFamily: TAJAWAL }}>{field.label}</Typography>
                  </Box>
                  <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }, gap: 2 }}>
                    {field.options.map((opt, idx) => (
                      <FormControlLabel key={idx} control={<Checkbox checked={dropdownValues[i] === opt} onChange={(e) => setDropdownValues({ ...dropdownValues, [i]: e.target.checked ? opt : "" })} />} label={<Typography sx={{ fontFamily: TAJAWAL, fontSize: { xs: "1.6rem", md: "1.7rem" }, fontWeight: 500 }}>{opt}</Typography>} />
                    ))}
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>

          {/* LOCATION FIELD */}
          <Box sx={{ display: "grid", gap: 3, mt: 3 }}>
            <Box sx={{ position: "relative" }}>
              <Box sx={{ position: "absolute", inset: "-2px", borderRadius: "16px", background: "linear-gradient(135deg,#06f9f3,#00b3ff,#06f9f3)", filter: "blur(4px)", zIndex: 0 }} />
              <Box sx={{ position: "relative", zIndex: 10, p: 2, borderRadius: 3, border: "1px solid #E2E8F0", background: "#E2E8F0" }}>
                <Box sx={{ display: "flex", gap: 1, mb: 0.5, color: LABEL_COLOR }}><HomeWorkIcon /><Typography sx={{ fontWeight: 700, fontSize: "1.3rem", fontFamily: TAJAWAL }}>الموقع</Typography></Box>
                <Typography sx={{ fontSize: "1rem", mb: 3, color: "#242629ff", fontFamily: TAJAWAL, fontWeight: 'bold' }}>الرجاء كتابة موقع العقار المراد بيعه بالتفصيل</Typography>
                <StyledTextField fullWidth multiline minRows={3} value={location} onChange={(e) => setLocation(e.target.value)} />
              </Box>
            </Box>

            {/* DEVELOPER FIELD */}
            <Box sx={{ position: "relative" }}>
              <Box sx={{ position: "absolute", inset: "-2px", borderRadius: "16px", background: "linear-gradient(135deg,#06f9f3,#00b3ff,#06f9f3)", filter: "blur(4px)", zIndex: 0 }} />
              <Box sx={{ position: "relative", zIndex: 10, p: 2, borderRadius: 3, border: "1px solid #E2E8F0", background: "#E2E8F0" }}>
                <Box sx={{ display: "flex", gap: 1, mb: 1, color: LABEL_COLOR }}><LocationCityIcon /><Typography sx={{ fontWeight: 700, fontSize: "1.3rem", fontFamily: TAJAWAL }}>اسم المطور العقاري</Typography></Box>
                <Typography sx={{ fontSize: "1rem", mb: 3, color: "#242629ff", fontFamily: TAJAWAL, fontWeight: 'bold' }}>الرجاء كتابة اسم المطور العقاري إن أمكن</Typography>
                <StyledTextField fullWidth value={developer} onChange={(e) => setDeveloper(e.target.value)} />
              </Box>
            </Box>

            {/* AREA FIELD */}
            <Box sx={{ position: "relative" }}>
              <Box sx={{ position: "absolute", inset: "-2px", borderRadius: "16px", background: "linear-gradient(135deg,#06f9f3,#00b3ff,#06f9f3)", filter: "blur(4px)", zIndex: 0 }} />
              <Box sx={{ position: "relative", zIndex: 10, p: 2, borderRadius: 3, border: "1px solid #E2E8F0", background: "#E2E8F0" }}>
                <Box sx={{ display: "flex", gap: 1, mb: 1, color: LABEL_COLOR }}><StraightenIcon /><Typography sx={{ fontWeight: 700, fontSize: "1.3rem", fontFamily: TAJAWAL }}>المساحة</Typography></Box>
                <Typography sx={{ fontSize: "1rem", mb: 3, color: "#242629ff", fontFamily: TAJAWAL, fontWeight: 'bold' }}>الرجاء كتابة المساحة</Typography>
                <StyledTextField sx={{ width: "40%" }} value={area} onChange={(e) => setArea(e.target.value)} />
              </Box>
            </Box>

            {/* BUDGET/PRICE FIELD */}
            <Box sx={{ position: "relative" }}>
              <Box sx={{ position: "absolute", inset: "-2px", borderRadius: "16px", background: "linear-gradient(135deg,#06f9f3,#00b3ff,#06f9f3)", filter: "blur(4px)", zIndex: 0 }} />
              <Box sx={{ position: "relative", zIndex: 10, p: 2, borderRadius: 3, border: "1px solid #E2E8F0", background: "#E2E8F0" }}>
                <Box sx={{ display: "flex", gap: 1, mb: 2, color: LABEL_COLOR }}><AccountBalanceWalletIcon /><Typography sx={{ fontWeight: 700, fontSize: "1.3rem", fontFamily: TAJAWAL }}>سعر البيع</Typography></Box>
                <Typography sx={{ fontSize: "1rem", mb: 3, color: "#242629ff", fontFamily: TAJAWAL, fontWeight: 'bold' }}>الرجاء اختيار أحد الطرق لتقييم سعر البيع</Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1.5 }}>
                  <Checkbox checked={checkboxValues[0]} onChange={(e) => handleCheckboxChange(0, e.target.checked)} />
                  <Typography sx={{ minWidth: 120, fontFamily: TAJAWAL }}>حد</Typography>
                  <StyledTextField size="small" value={priceLimit} onChange={(e) => setPriceLimit(e.target.value)} />
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Checkbox checked={checkboxValues[1]} onChange={(e) => handleCheckboxChange(1, e.target.checked)} />
                  <Typography sx={{ minWidth: 120, fontFamily: TAJAWAL }}>على السوم</Typography>
                  <StyledTextField size="small" value={priceOffer} onChange={(e) => setPriceOffer(e.target.value)} />
                </Box>
              </Box>
            </Box>
          </Box>

          {/* ADDITIONAL NOTES FIELD */}
          <Box sx={{ mt: 5, position: "relative" }}>
            <Box sx={{ position: "absolute", inset: "-2px", borderRadius: "16px", background: "linear-gradient(135deg,#06f9f3,#00b3ff,#06f9f3)", filter: "blur(4px)", zIndex: 0 }} />
            <Box sx={{ position: "relative", zIndex: 10, border: "1px solid #E2E8F0", background: "#E2E8F0", borderRadius: 3, p: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}><EditNoteIcon sx={{ color: LABEL_COLOR }} /><Typography sx={{ fontWeight: 800, fontSize: "1.6rem", color: LABEL_COLOR, fontFamily: TAJAWAL }}>تفاصيل إضافية</Typography></Box>
              <Typography sx={{ mt: 0.5, mb: 1.5, fontSize: "0.95rem", color: "#222324ff", fontFamily: TAJAWAL, fontWeight: 'bold' }}>اذكر أي ملاحظات أو متطلبات خاصة تساعدنا في خدمتك بشكل أفضل</Typography>
              <StyledTextField multiline minRows={4} fullWidth placeholder="اكتب ملاحظاتك هنا..." value={notes} onChange={(e) => setNotes(e.target.value)} />
            </Box>
          </Box>
          {/* CONTACT CHANNELS FIELD */}
          <Box sx={{ mt: 6, position: "relative" }}>
            <Box sx={{ position: "absolute", inset: "-2px", borderRadius: "16px", background: "linear-gradient(135deg,#06f9f3,#00b3ff,#06f9f3)", filter: "blur(4px)", zIndex: 0 }} />
            <Box sx={{ position: "relative", zIndex: 10, p: 3, borderRadius: 3, border: "1px solid #E2E8F0", background: "#E2E8F0" }}>
              <Typography sx={{ fontWeight: 800, fontSize: "1.3rem", mb: 0.5, color: LABEL_COLOR, fontFamily: TAJAWAL }}>قنوات التواصل</Typography>
              <Typography sx={{ fontSize: "1rem", mb: 3, color: "#242629ff", fontFamily: TAJAWAL, fontWeight: 'bold' }}>وسائل التواصل المتعددة تتيح الرد السريع من الفريق المختص</Typography>
              <Box 
                sx={{ 
                  display: "flex", 
                  flexDirection: "row", // Force same row on all screens
                  alignItems: "center", 
                  justifyContent: "space-between",
                  gap: 1, 
                  mb: 2,
                  width: "100%",
                  flexWrap: "nowrap" // Prevents wrapping to a new line
                }}
              >
                <FormControlLabel 
                  sx={{ 
                    mr: 0, 
                    flexShrink: 0, // Prevents the label from shrinking too much
                    '& .MuiFormControlLabel-label': { width: 'auto' } 
                  }}
                  control={
                    <Checkbox 
                      size="small" // Smaller checkbox helps fit on one row
                      checked={channels.call} 
                      onChange={(e) => setChannels({ ...channels, call: e.target.checked })} 
                    />
                  } 
                  label={
                    <Typography 
                      sx={{ 
                        fontFamily: TAJAWAL, 
                        fontSize: { xs: '12px', sm: '16px', md: '18px' }, // Slightly smaller on mobile
                        whiteSpace: "nowrap"
                      }}
                    > 
                      الرجاء التواصل على الرقم 
                    </Typography>
                  } 
                />

                <Box 
                  sx={{ 
                    display: "flex", 
                    justifyContent: "flex-end",
                    minWidth: 0, // Important for flex children with text-overflow
                    flexShrink: 1 
                  }}
                >
                  <Typography 
                    sx={{ 
                      fontFamily: "TAJAWAL", 
                      fontWeight: 800, 
                      fontSize: { xs: "11px", sm: "16px", md: "20px" }, // Scaled down for mobile fit
                      color: "#1D4ED8", 
                      backgroundColor: "#F8FAFC", 
                      px: { xs: 1, md: 3 }, // Reduced padding on mobile
                      py: 0.5, 
                      borderRadius: "999px", 
                      boxShadow: "0 4px 12px rgba(37,99,235,0.25)", 
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      border: "1px solid rgba(29, 78, 216, 0.1)"
                    }}
                  >
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
                <StyledTextField value={name} onChange={(e) => setName(e.target.value)} />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography sx={{ minWidth: 120, fontFamily: TAJAWAL, fontWeight: 600, fontSize: '18px' }}> الجوال </Typography>
                <StyledTextField value={mobile} onChange={(e) => setMobile(e.target.value)} />
              </Box>
            </Box>
          </Box>

          {/* SUBMIT BUTTON */}
          <Box sx={{ mt: 5, textAlign: "center" }}>
            <SubmitButton onClick={handleSubmit} endIcon={<Send size={24} style={{ marginRight: '8px' }} />}>
              ارسال الطلب وحفظ البيانات
            </SubmitButton>
          </Box>
        </GlassCard>
      </Container>
    </Box>
  );
};

export default Service2;