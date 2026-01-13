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
  keyframes,
  Alert,
  styled
} from "@mui/material";

/* ---------------- ICONS ---------------- */
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import StraightenIcon from "@mui/icons-material/Straighten";
import EditNoteIcon from "@mui/icons-material/EditNote";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneIcon from "@mui/icons-material/Phone";
import { Send, Sparkles } from "lucide-react";


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
    priceLimit: string;
    priceOffer: string;
    checkboxValues: boolean[];
  }) => void;
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
const Service03: React.FC<Props> = ({ onSubmit }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  /* ---------------- STATES ---------------- */
  const [dropdownValues, setDropdownValues] = React.useState<Record<number, string>>({});
  const [notes, setNotes] = React.useState("");
  const [search] = React.useState("");
  const [channels, setChannels] = React.useState({ chat: true, whatsapp: true, call: false });
  const [openPopup, setOpenPopup] = React.useState(false);
  const [alertSeverity, setAlertSeverity] = React.useState<"success" | "error">("success");
  const [alertMessage, setAlertMessage] = React.useState("");

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

  const shouldShowCard = isChecked2 || checkboxValues[0];

  /* ---------------- HANDLERS ---------------- */
  const handleCheckboxChange = (index: number, value: boolean) => {
    const updated = [...checkboxValues];
    updated[index] = value;
    setCheckboxValues(updated);
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

  const buildWhatsAppMessage = () => {
    const developerStatus = isChecked1 ? "مؤجر" : isChecked2 ? "مستأجر" : "غير محدد";

    return `
🛒 *طلب بيع عقار جديد*

✅ *حالة المطور:* ${developerStatus}

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
      return;
    }
    if (channels.chat && (!name || !mobile)) {
      setAlertSeverity("error");
      setAlertMessage("يرجى إدخال الاسم والجوال للتواصل");
      return;
    }

    const dataToSubmit = {
      dropdowns: DROPDOWN_FIELDS.map((_, i) => dropdownValues[i] || ""),
      notes,
      search,
      channels,
      name,
      mobile,
      location,
      developer,
      area,
      priceLimit,
      priceOffer,
      checkboxValues,
      developerStatus: isChecked1 ? "مؤجر" : isChecked2 ? "مستأجر" : "غير محدد"
    };

    try {
      const response = await fetch(`${BASE_URL}/api/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSubmit),
      });

      if (!response.ok) {
        console.error("Database save failed");
      }
    } catch (error) {
      console.error("Connection error:", error);
    }

    if (onSubmit) {
      onSubmit(dataToSubmit);
    }
    
    setOpenPopup(true);
    const phoneNumber = "966509855666";
    const message = buildWhatsAppMessage();
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");

    // Reset Form
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
    setCheckboxValues([false, false]);
    setIsChecked1(false);
    setIsChecked2(false);
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
             {/* MATERIAL UI POPUP ALERT */}
              <Snackbar open={openPopup} autoHideDuration={6000} onClose={() => setOpenPopup(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                  <Alert onClose={() => setOpenPopup(false)} severity={alertSeverity} variant="filled" sx={{ width: '100%', fontSize: '1.2rem', fontFamily: TAJAWAL }}>
                            {alertMessage}
                  </Alert>
              </Snackbar>
      <Container maxWidth="md" sx={{ mt: { xs: 4, md: 8 }, mb: { xs: 6, md: 12 }, direction: "rtl", fontFamily: TAJAWAL }}>

        {/* TITLE */}
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
              color: COLOR_PRIMARY_CYAN, 
              fontFamily: TAJAWAL,
              textShadow: "0 10px 20px rgba(0,0,0,0.3)",
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
             إيجار العقار <Sparkles size={32} style={{ color: COLOR_PRIMARY_CYAN }} />
          </Typography>

          <Typography 
            sx={{ 
              color: "#fff", 
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
        {/* DEVELOPER CHECKBOXES */}
        <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
          {/* مؤجر */}
          <Box sx={{ flex: 1 }}>
            <GlassCard sx={{ p: 2, textAlign: "center", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <FormControlLabel sx={{ width: '100%', margin: 0, justifyContent: 'center' }} control={<Checkbox checked={isChecked1} onChange={() => handleDeveloperCheckbox(0)} sx={{ '& .MuiSvgIcon-root': { fontSize: 40 } }} />} label={<Typography sx={{ fontFamily: TAJAWAL, fontSize: "1.5rem", fontWeight: 'bold' }}>مؤجر</Typography>} />
            </GlassCard>
          </Box>
          {/* مستأجر */}
          <Box sx={{ flex: 1 }}>
            <GlassCard sx={{ p: 2, textAlign: "center", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <FormControlLabel sx={{ width: '100%', margin: 0, justifyContent: 'center' }} control={<Checkbox checked={isChecked2} onChange={() => handleDeveloperCheckbox(1)} sx={{ '& .MuiSvgIcon-root': { fontSize: 40 } }} />} label={<Typography sx={{ fontFamily: TAJAWAL, fontSize: "1.5rem", fontWeight: 'bold' }}>مستأجر</Typography>} />
            </GlassCard>
          </Box>
        </Box>

        {/* DROPDOWNS */}
        <Box sx={{ display: "grid", gap: 3 }}>
          {DROPDOWN_FIELDS.map((field, i) => (
            <GlassCard key={i} sx={{ p: 3 }}>
              <Box sx={{ display: "flex", gap: 1, mb: 2, color: LABEL_COLOR, alignItems: 'center' }}>
                {field.icon}
                <Typography sx={{ fontWeight: 800, fontSize: { xs: "1.2rem", md: "1.6rem" }, fontFamily: TAJAWAL }}>{field.label}</Typography>
              </Box>
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }, gap: 2 }}>
                {field.options.map((opt, idx) => (
                  <FormControlLabel key={idx} control={<Checkbox checked={dropdownValues[i] === opt} onChange={(e) => setDropdownValues({ ...dropdownValues, [i]: e.target.checked ? opt : "" })} />} label={<Typography sx={{ fontFamily: TAJAWAL, fontSize: { xs: "1.6rem", md: "1.7rem" }, fontWeight: 500 }}>{opt}</Typography>} />
                ))}
              </Box>
            </GlassCard>
          ))}
        </Box>

        {/* LOCATION */}
        <Box sx={{ mt: 3 }}>
          <GlassCard sx={{ p: 2 }}>
            <Box sx={{ display: "flex", gap: 1, mb: 1, color: LABEL_COLOR }}>
              <HomeWorkIcon />
              <Typography sx={{ fontWeight: 700, fontSize: { xs: "1rem", md: "1.3rem" }, fontFamily: TAJAWAL }}>الموقع</Typography>
            </Box>
            <StyledTextField fullWidth value={location} onChange={(e) => setLocation(e.target.value)} />
          </GlassCard>
        </Box>

        {/* DEVELOPER */}
        {!isChecked2 && (
          <Box sx={{ mt: 3 }}>
            <GlassCard sx={{ p: 2 }}>
              <Box sx={{ display: "flex", gap: 1, mb: 1, color: LABEL_COLOR }}>
                <LocationCityIcon />
                <Typography sx={{ fontWeight: 700, fontSize: { xs: "1rem", md: "1.3rem" }, fontFamily: TAJAWAL }}>اسم المطور العقاري</Typography>
              </Box>
              <StyledTextField fullWidth value={developer} onChange={(e) => setDeveloper(e.target.value)} />
            </GlassCard>
          </Box>
        )}

        {/* AREA/RENT */}
        {!isChecked2 && dropdownValues[0] !== "شقة" && (
          <Box sx={{ mt: 3 }}>
            <GlassCard sx={{ p: 2 }}>
              <Box sx={{ display: "flex", gap: 1, mb: 1, color: LABEL_COLOR }}>
                <StraightenIcon />
                <Typography sx={{ fontWeight: 700, fontSize: { xs: "1rem", md: "1.3rem" }, fontFamily: TAJAWAL }}>قيمة الإيجار</Typography>
              </Box>
              <StyledTextField fullWidth value={area} onChange={(e) => setArea(e.target.value)} sx={{ width: "40%" }} />
            </GlassCard>
          </Box>
        )}

        {/* PRICE SECTION */}
        {shouldShowCard && (
          <Box sx={{ mt: 3 }}>
            <GlassCard sx={{ p: 2 }}>
              <Box sx={{ display: "flex", gap: 1, mb: 2, color: LABEL_COLOR }}>
                <AccountBalanceWalletIcon />
                <Typography sx={{ fontWeight: 700, fontSize: { xs: "1rem", md: "1.3rem" }, fontFamily: TAJAWAL }}>{isChecked2 ? "سعر الإيجار" : "سعر البيع"}</Typography>
              </Box>
              {isChecked2 ? (
                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1.5 }}>
                    <Typography sx={{ minWidth: 120, fontFamily: TAJAWAL, fontSize: "1.5rem" }}>من</Typography>
                    <StyledTextField size="small" value={priceLimit} onChange={(e) => setPriceLimit(e.target.value)} sx={{ width: 220 }} />
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography sx={{ minWidth: 120, fontFamily: TAJAWAL, fontSize: "1.5rem" }}>إلى</Typography>
                    <StyledTextField size="small" value={priceOffer} onChange={(e) => setPriceOffer(e.target.value)} sx={{ width: 220 }} />
                  </Box>
                </Box>
              ) : (
                <>
                  {checkboxValues[0] && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1.5 }}>
                      <Checkbox checked={checkboxValues[0]} onChange={(e) => handleCheckboxChange(0, e.target.checked)} />
                      <Typography sx={{ minWidth: 120, fontFamily: TAJAWAL, fontSize: "1.5rem" }}>حد</Typography>
                      <StyledTextField size="small" value={priceLimit} onChange={(e) => setPriceLimit(e.target.value)} sx={{ width: 220 }} />
                    </Box>
                  )}
                  {checkboxValues[1] && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Checkbox checked={checkboxValues[1]} onChange={(e) => handleCheckboxChange(1, e.target.checked)} />
                      <Typography sx={{ minWidth: 120, fontFamily: TAJAWAL, fontSize: "1.5rem" }}>على السوم</Typography>
                      <StyledTextField size="small" value={priceOffer} onChange={(e) => setPriceOffer(e.target.value)} sx={{ width: 220 }} />
                    </Box>
                  )}
                </>
              )}
            </GlassCard>
          </Box>
        )}

        {/* NOTES */}
        <Box sx={{ mt: 5 }}>
          <GlassCard sx={{ p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <EditNoteIcon sx={{ color: LABEL_COLOR }} />
              <Typography sx={{ fontWeight: 800, fontSize: "1.2rem", color: LABEL_COLOR, fontFamily: TAJAWAL }}>تفاصيل إضافية</Typography>
            </Box>
              <Typography sx={{ mt: 0.5, mb: 1.5, fontSize: "0.95rem", color: "#222324ff", fontFamily: TAJAWAL, fontWeight: 'bold' }}>
            اذكر أي ملاحظات أو متطلبات خاصة تساعدنا في خدمتك بشكل أفضل
          </Typography>
            <StyledTextField multiline minRows={4} fullWidth value={notes} onChange={(e) => setNotes(e.target.value)} />
          </GlassCard>
        </Box>

        {/* CONTACT CHANNELS */}
        <Box sx={{ mt: 6 }}>
          <GlassCard sx={{ p: 3 }}>
            <Typography sx={{ fontWeight: 800, fontSize: "1.3rem", mb: 3, color: LABEL_COLOR, fontFamily: TAJAWAL }}>قنوات التواصل</Typography>
             <Typography sx={{ fontSize: "1rem", mb: 3, color: "#242629ff", fontFamily: TAJAWAL, fontWeight: 'bold' }}>
            وسائل التواصل المتعددة تتيح الرد السريع من الفريق المختص
          </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <FormControlLabel control={<Checkbox checked={channels.call} onChange={(e) => setChannels({ ...channels, call: e.target.checked })} />} label={<Typography sx={{ fontFamily: TAJAWAL, fontSize: '18px' }}> الرجاء التواصل على الرقم </Typography>} />
              <Typography sx={{ fontFamily: TAJAWAL, fontWeight: 800, fontSize: "20px", direction: "ltr", color: "#1D4ED8", backgroundColor: "#F8FAFC", px: 3, py: 1, borderRadius: "999px", boxShadow: "0 6px 20px rgba(37,99,235,0.35)" }}>📞 +966 00 000 0000</Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 8, mb: 3, marginRight: '27px' }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}> <WhatsAppIcon sx={{ color: "#25D366" }} /> <Typography sx={{ fontFamily: TAJAWAL }}>واتساب</Typography> </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}> <PhoneIcon /> <Typography sx={{ fontFamily: TAJAWAL }}>جوال</Typography> </Box>
            </Box>

            <Divider sx={{ my: 3, borderColor: "#1f2937", borderBottomWidth: "2px" }} />

            <FormControlLabel sx={{ mb: 3 }} control={<Checkbox checked={channels.chat} onChange={(e) => setChannels({ ...channels, chat: e.target.checked })} />} label={<Typography sx={{ fontFamily: TAJAWAL, fontSize: '18px', fontWeight: 'bold' }}> اترك اسمك وجوالك للتواصل معك لاحقًا </Typography>} />

            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <Typography sx={{ minWidth: 120, fontFamily: TAJAWAL }}>الاسم</Typography>
              <StyledTextField fullWidth value={name} onChange={(e) => setName(e.target.value)} sx={{ width: "40%" }} />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography sx={{ minWidth: 120, fontFamily: TAJAWAL }}>الجوال</Typography>
              <StyledTextField fullWidth value={mobile} onChange={(e) => setMobile(e.target.value)} sx={{ width: "40%" }} />
            </Box>
          </GlassCard>
        </Box>

        {/* SUBMIT BUTTON */}
        <Box sx={{ mt: 6, textAlign: "center" }}>
          <SubmitButton onClick={handleSubmit} endIcon={<Send size={24} style={{ marginRight: '8px' }} />}>
            إرسال الطلب
          </SubmitButton>
        </Box>

      </GlassCard>

      </Container>
    </Box>
  );
};

export default Service03;