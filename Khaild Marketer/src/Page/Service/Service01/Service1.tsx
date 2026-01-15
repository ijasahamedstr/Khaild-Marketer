// src/Page/Service/Service01.tsx
import React, {useState, useEffect } from "react";
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
import { Send, Sparkles,CheckCircle } from "lucide-react";

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

/* ---------------- CONSTANTS ---------------- */
const TAJAWAL = "'Tajawal', sans-serif";
const COLOR_PRIMARY_CYAN = "#06f9f3";
const COLOR_DEEP_BLUE = "#023B4E";
const LABEL_COLOR = "#023B4E";
// const GRADIENT = "linear-gradient(135deg, #023B4E 0%, #06f9f3 100%)";

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
const GlassCard = styled(Box)(() => ({
  position: "relative",
  background: "rgba(255, 255, 255, 0.85)",
  backdropFilter: "blur(12px)",
  borderRadius: "30px",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
  overflow: "hidden",
  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  padding: "32px",
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
const Service1: React.FC<Props> = ({ onSubmit }) => {
  const [openSuccess, setOpenSuccess] = useState(false);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

// VITE SPECIFIC: Use import.meta.env and VITE_ prefix
const API_BASE_URL = import.meta.env.VITE_API_URL;


  /* ---------------- STATES ---------------- */
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
  const [checkboxValues, setCheckboxValues] = React.useState([false, false]);

  const [isChecked1, setIsChecked1] = React.useState(false);
  const [isChecked2, setIsChecked2] = React.useState(false);

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
    return `
🏷 *حالة العقار:* ${propertyStatus}

🛒 *طلب شراء عقار جديد*

🏠 *نوع العقار:* ${dropdownValues[0] || "غير محدد"}
📍 *الموقع:* ${location || "غير محدد"}
🏗 *اسم المطور العقاري:* ${developer || "غير محدد"}
📐 *المساحة:* ${area || "غير محدد"}

💰 *السعر:*
${priceLimit ? `- الميزانية المختارة: ${priceLimit}` : ""}
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
      priceLimit,
      priceOffer,
      notes,
      name,
      mobile,
      channels,
      createdAt: new Date(),
    };

    try {
      await axios.post(`${API_BASE_URL}/api/save`, payload);
      console.log("Data saved to database successfully.");
    } catch (err) {
      console.error("Database save failed:", err);
    }

    if (onSubmit) {
      onSubmit({
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
      });
    }

     
     setOpenSuccess(true);
    const phoneNumber = "966509855666";
    const message = buildWhatsAppMessage();
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");

    /* ---------------- RESET FIELDS ---------------- */
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
  };

  return (
     <Box
         sx={{ 
         minHeight: "100vh", 
         background: `linear-gradient(rgba(220, 230, 196, 0.85), rgba(220, 230, 196, 0.85)), url('https://i.ibb.co/hxkmfnF6/4.webp')`,
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
        {/* ---------------- TITLE ---------------- */}
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
            شراء العقار <Sparkles size={32} style={{ color: COLOR_DEEP_BLUE }} />
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
        {/* STATUS SELECTOR */}
        <Box sx={{ display: "flex", gap: 3, mb: 5 }}>
          <GlassCard
            sx={{
              flex: 1,
              textAlign: "center",
              cursor: "pointer",
              border: isChecked1 ? `2px solid ${COLOR_PRIMARY_CYAN}` : "1px solid rgba(255,255,255,0.3)",
            }}
            onClick={() => handleDeveloperCheckbox(0)}
          >
            <FormControlLabel
              sx={{ margin: 0, pointerEvents: "none" }}
              control={<Checkbox checked={isChecked1} sx={{ "& .MuiSvgIcon-root": { fontSize: 35 } }} />}
              label={<Typography sx={{ fontFamily: TAJAWAL, fontSize: "1.6rem", fontWeight: 800 }}>جاهز</Typography>}
            />
          </GlassCard>

          <GlassCard
            sx={{
              flex: 1,
              textAlign: "center",
              cursor: "pointer",
              border: isChecked2 ? `2px solid ${COLOR_PRIMARY_CYAN}` : "1px solid rgba(255,255,255,0.3)",
            }}
            onClick={() => handleDeveloperCheckbox(1)}
          >
            <FormControlLabel
              sx={{ margin: 0, pointerEvents: "none" }}
              control={<Checkbox checked={isChecked2} sx={{ "& .MuiSvgIcon-root": { fontSize: 35 } }} />}
              label={<Typography sx={{ fontFamily: TAJAWAL, fontSize: "1.6rem", fontWeight: 800 }}>على الخارطة</Typography>}
            />
          </GlassCard>
        </Box>

        {/* ---------------- DROPDOWNS ---------------- */}
        <Box sx={{ display: "grid", gap: 4 }}>
          {DROPDOWN_FIELDS.map((field, i) => (
            <GlassCard key={i}>
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
            </GlassCard>
          ))}

          {/* ---------------- LOCATION ---------------- */}
          <GlassCard>
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
            />
          </GlassCard>

          {/* ---------------- AREA ---------------- */}
          <GlassCard>
            <Box sx={{ display: "flex", gap: 1.5, mb: 1, color: LABEL_COLOR, alignItems: "center" }}>
              <StraightenIcon />
              <Typography sx={{ fontWeight: 800, fontSize: "1.5rem", fontFamily: TAJAWAL }}>المساحة</Typography>
            </Box>
            <Typography sx={{ fontSize: "1.1rem", mb: 3, color: "#475569", fontFamily: TAJAWAL, fontWeight: 700 }}>
              الرجاء كتابة المساحة التقريبية
            </Typography>
            <StyledTextField
              sx={{ width: { xs: "100%", md: "45%" } }}
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="المساحة (م²)"
            />
          </GlassCard>

          {/* ---------------- BUDGET ---------------- */}
          <GlassCard>
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
                <MenuItem value="أقل من     500000" sx={{ fontFamily: TAJAWAL, display: "flex", justifyContent: "flex-end", width: "100%" }}>
                <span style={{ marginRight: "0.5rem" }}></span>
                <span style={{ marginRight: "1rem" }}></span>
                <span style={{ marginRight: "0.5rem" }}>500,000</span>
                <span style={{ marginRight: "0.5rem" }}>أقل من</span>
              </MenuItem>
              <MenuItem value="500,000 إلى 1,000,000" sx={{ fontFamily: TAJAWAL, display: "flex", justifyContent: "flex-end", width: "100%" }}>
                <span style={{ marginRight: "0.5rem" }}>1,000,000</span>
                <span style={{ marginRight: "1rem" }}>إلى</span>
                <span style={{ marginRight: "0.5rem" }}>500,000</span>
                <span style={{ marginRight: "0.5rem" }}>من</span>
              </MenuItem>

              <MenuItem value="1,000,000 إلى 1,500,000" sx={{ fontFamily: TAJAWAL, display: "flex", justifyContent: "flex-end", width: "100%" }}>
                <span style={{ marginRight: "0.5rem" }}>1,500,000</span>
                <span style={{ marginRight: "0.5rem" }}>إلى</span>
                <span style={{ marginRight: "0.5rem" }}>1,000,000</span>
                <span style={{ marginRight: "0.5rem" }}>من</span>
              </MenuItem>

              <MenuItem value="1,500,000 إلى 2,000,000" sx={{ fontFamily: TAJAWAL, display: "flex", justifyContent: "flex-end", width: "100%" }}>
                <span style={{ marginRight: "0.5rem" }}>2,000,000</span>
                <span style={{ marginRight: "0.5rem" }}>إلى</span>
                <span style={{ marginRight: "0.5rem" }}>1,500,000</span>
                <span style={{ marginRight: "0.5rem" }}>من</span>
              </MenuItem>

              <MenuItem value="2,000,000 فأكثر" sx={{ fontFamily: TAJAWAL, display: "flex", justifyContent: "flex-end", width: "100%" }}>
                <span style={{ marginRight: "2.1rem" }}>فأكثر</span>
                <span style={{ marginRight: "0.5rem" }}>2,000,000</span>
                <span style={{ marginRight: "0.5rem" }}>من</span>
              </MenuItem>
            </StyledTextField>
          </GlassCard>

          {/* ---------------- ADDITIONAL NOTES ---------------- */}
          <GlassCard>
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
            />
          </GlassCard>

          {/* ---------------- CONTACT CHANNELS ---------------- */}
          <GlassCard>
            <Typography sx={{ fontWeight: 900, fontSize: "1.8rem", mb: 1, color: LABEL_COLOR, fontFamily: TAJAWAL }}>
              قنوات التواصل
            </Typography>
            <Typography sx={{ fontSize: "1.1rem", mb: 4, color: "#475569", fontFamily: TAJAWAL, fontWeight: 700 }}>
              وسائل التواصل المتعددة تتيح الرد السريع من الفريق المختص
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%", gap: 2, mb: 3 }}>
              <FormControlLabel
                control={<Checkbox checked={channels.call} onChange={(e) => setChannels({ ...channels, call: e.target.checked })} />}
                label={<Typography sx={{ fontFamily: TAJAWAL, fontSize: "1.2rem", fontWeight: 700 }}>التواصل الهاتفي</Typography>}
              />
              <Typography sx={{
                fontFamily: TAJAWAL,
                fontWeight: 900,
                fontSize: { xs: "1.1rem", md: "1.5rem" },
                direction: "ltr",
                color: "#1D4ED8",
                backgroundColor: "#F8FAFC",
                px: 4, py: 1.5,
                borderRadius: "999px",
                boxShadow: "0 10px 20px rgba(37,99,235,0.2)",
              }}>
                📞 +966 50 985 5666
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 6, mb: 4, pr: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <WhatsAppIcon sx={{ color: "#25D366", fontSize: "2rem" }} />
                <Typography sx={{ fontFamily: TAJAWAL, fontWeight: 700 }}>واتساب</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <PhoneIcon sx={{ fontSize: "2rem" }} />
                <Typography sx={{ fontFamily: TAJAWAL, fontWeight: 700 }}>جوال</Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 4, borderColor: "#CBD5E1", borderBottomWidth: "2px" }} />

            <FormControlLabel
              sx={{ mb: 4 }}
              control={<Checkbox checked={channels.chat} onChange={(e) => setChannels({ ...channels, chat: e.target.checked })} />}
              label={<Typography sx={{ fontFamily: TAJAWAL, fontSize: "1.3rem", fontWeight: 900 }}>اترك اسمك وجوالك للتواصل معك لاحقًا</Typography>}
            />

            <Box sx={{ display: "grid", gap: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                <Typography sx={{ minWidth: 100, fontFamily: TAJAWAL, fontWeight: 800, fontSize: "1.2rem" }}>الاسم</Typography>
                <StyledTextField fullWidth value={name} onChange={(e) => setName(e.target.value)} />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                <Typography sx={{ minWidth: 100, fontFamily: TAJAWAL, fontWeight: 800, fontSize: "1.2rem" }}>الجوال</Typography>
                <StyledTextField fullWidth value={mobile} onChange={(e) => setMobile(e.target.value)} />
              </Box>
            </Box>
          </GlassCard>
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

export default Service1;