// src/Page/Service/Service01.tsx
import React, { useEffect, useState } from "react";
import axios from "axios"; 
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
  IconButton,
  CircularProgress,
  LinearProgress,
  Switch
} from "@mui/material";
import { Send, CloudUpload, X, FileText, Video } from "lucide-react";

/* ---------------- ICONS ---------------- */
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import StraightenIcon from "@mui/icons-material/Straighten";
import EditNoteIcon from "@mui/icons-material/EditNote";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneIcon from "@mui/icons-material/Phone";
import HandshakeIcon from '@mui/icons-material/Handshake';
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
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

const UploadBox = styled(Box)({
  border: `2px dashed ${COLOR_DEEP_BLUE}`,
  borderRadius: "16px",
  padding: "30px 20px",
  textAlign: "center",
  cursor: "pointer",
  backgroundColor: "rgba(6, 249, 243, 0.05)",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "rgba(6, 249, 243, 0.1)",
    borderColor: COLOR_PRIMARY_CYAN
  }
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

const DROPDOWN_FIELDS = [
  {
    label: "نوع العقار",
    icon: <HomeWorkIcon fontSize="small" />,
    options: ["قصر", "فيلا", "تاون هاوس", "شقة", "ملحق", "مزرعة", "استراحة", "مستودع", "أرض"],
  },
];

const Service02: React.FC<Props> = ({ onSubmit }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const [dropdownValues, setDropdownValues] = React.useState<Record<number, string>>({});
  const [notes, setNotes] = React.useState("");
  const [search] = React.useState("");
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

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
  const [rooms, setRooms] = React.useState("");
  const [bathrooms, setBathrooms] = React.useState("");
  const [propertyAgeSelection, setPropertyAgeSelection] = React.useState(""); 
  const [customAgeInput, setCustomAgeInput] = React.useState("");

  const [priceLimit, setPriceLimit] = React.useState("");
  const [priceOffer, setPriceOffer] = React.useState("");
  const [isChecked1, setIsChecked1] = React.useState(false);
  const [isChecked2, setIsChecked2] = React.useState(false);
  const [checkboxValues, setCheckboxValues] = React.useState<boolean[]>([false, false]);
  const [isNegotiable, setIsNegotiable] = useState<'yes' | 'no' | null>(null); 
  const [isPaymentmethod, setisPaymentmethod] = useState<'yes' | 'no' | null>(null); 
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const [openPopup, setOpenPopup] = React.useState(false);
  const [alertSeverity, setAlertSeverity] = React.useState<"success" | "error">("success");
  const [alertMessage, setAlertMessage] = React.useState("");

  const handleAgeCheckboxChange = (value: string) => {
    if (propertyAgeSelection === value || value === "") {
      setPropertyAgeSelection("");
    } else {
      setPropertyAgeSelection(value);
    }
    if (value === "new") {
      setCustomAgeInput("");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles((prev) => [...prev, ...filesArray]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
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

  const handleCheckboxChange = (index: number, value: boolean) => {
    const updated = [...checkboxValues];
    updated[index] = value;
    setCheckboxValues(updated);
  };

  const propertyStatus = isChecked1 ? "جاهز" : isChecked2 ? "على الخارطة" : "غير محدد";

  const resetForm = () => {
    setDropdownValues({});
    setNotes("");
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
    setIsChecked1(false);
    setIsChecked2(false);
    setCheckboxValues([false, false]);
    setSelectedFiles([]);
    setIsNegotiable(null);
    setisPaymentmethod(null);
    setUploadProgress(0);
  };

  const buildWhatsAppMessage = () => {
    const negotiableText = isNegotiable === 'yes' ? "نعم" : isNegotiable === 'no' ? "لا" : "غير محدد";
    const paymentText = isPaymentmethod === 'yes' ? "نقداً" : isPaymentmethod === 'no' ? "تمويل" : "غير محدد";
    const ageText = propertyAgeSelection === "new" ? "جديد" : propertyAgeSelection === "custom" ? customAgeInput : "غير محدد";
    
    return `
🏷 *حالة العقار:* ${propertyStatus}
🛒 *طلب بيع عقار جديد*
🏠 *نوع العقار:* ${dropdownValues[0] || "غير محدد"}
📍 *الموقع:* ${location || "غير محدد"}
🏗 *اسم المطور العقاري:* ${developer || "غير محدد"}
📐 *المساحة:* ${area || "غير محدد"}
🛏 *عدد الغرف:* ${rooms || "غير محدد"}
🚿 *دورات المياه:* ${bathrooms || "غير محدد"}
⏳ *عمر العقار:* ${ageText}
💰 *سعر البيع:*
${checkboxValues[0] ? `- حد: ${priceLimit || "غير محدد"}` : ""}
${checkboxValues[1] ? `- على السوم: ${priceOffer || "غير محدد"}` : ""}
🤝 *قابل للتفاوض:* ${negotiableText}
💳 *طريقة الدفع:* ${paymentText}
📝 *تفاصيل إضافية:*
${notes || "لا يوجد"}
📎 *المرفقات:* ${selectedFiles.length} ملف/فيديو
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

    setLoading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("payload", JSON.stringify({
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
      isNegotiable: isNegotiable === 'yes' ? "نعم" : isNegotiable === 'no' ? "لا" : "غير محدد",
      paymentMethod: isPaymentmethod === 'yes' ? "نقداً" : isPaymentmethod === 'no' ? "تمويل" : "غير محدد",
      notes,
      contactChannels: channels,
      clientName: name,
      clientMobile: mobile,
      date: new Date().toISOString(),
    }));

    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await axios.post(`${API_BASE_URL}/api/save-request`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 100));
          setUploadProgress(percentCompleted);
        }
      });

      if (response.status === 201 || response.status === 200) {
        setAlertSeverity("success");
        setAlertMessage("تم حفظ البيانات والملفات بنجاح!");
        setOpenPopup(true);

        const phoneNumber = "966509855666";
        const message = buildWhatsAppMessage();
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");

        resetForm();

        if (onSubmit) {
          onSubmit({
            dropdowns: DROPDOWN_FIELDS.map((_, i) => dropdownValues[i] || ""),
            notes,
            search,
            channels,
          });
        }
      }
    } catch (error) {
      setAlertSeverity("error");
      setAlertMessage("حدث خطأ في حفظ البيانات، يرجى المحاولة لاحقاً");
      setOpenPopup(true);
    } finally {
      setLoading(false);
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
      <Snackbar open={openPopup} autoHideDuration={6000} onClose={() => setOpenPopup(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={() => setOpenPopup(false)} severity={alertSeverity} variant="filled" sx={{ width: '100%', fontSize: '1.2rem', fontFamily: TAJAWAL }}>
          {alertMessage}
        </Alert>
      </Snackbar>

      <Container maxWidth="md" sx={{ mt: { xs: 4, md: 8 }, mb: { xs: 6, md: 12 }, direction: "rtl", fontFamily: TAJAWAL }}>
        <Box sx={{ textAlign: "center", mb: 8, animation: `${float} 4s ease-in-out infinite`, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h1" sx={{ fontWeight: 900, fontSize: { xs: "2.5rem", md: "4rem" }, color: COLOR_PRIMARY_CYAN, fontFamily: TAJAWAL, textShadow: "0 10px 20px rgba(0,0,0,0.3)", display: 'flex', alignItems: 'center', gap: 1 }}>
            بيع العقار <Sparkles size={32} style={{ color: COLOR_PRIMARY_CYAN }} />
          </Typography>
          <Typography sx={{ color: "#fff", opacity: 0.9, fontSize: "1.2rem", mt: 2, fontFamily: TAJAWAL, maxWidth: "600px" }}>
            نحول رؤيتك إلى واقع ملموس بدقة واحترافية
          </Typography>
        </Box>

        <GlassCard sx={{ p: { xs: 2, md: 4 } }}>
          
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

          <Box sx={{ display: "grid", gap: 3, mt: 3 }}>
            <Box sx={{ position: "relative" }}>
              <Box sx={{ position: "absolute", inset: "-2px", borderRadius: "16px", background: "linear-gradient(135deg,#06f9f3,#00b3ff,#06f9f3)", filter: "blur(4px)", zIndex: 0 }} />
              <Box sx={{ position: "relative", zIndex: 10, p: 2, borderRadius: 3, border: "1px solid #E2E8F0", background: "#E2E8F0" }}>
                <Box sx={{ display: "flex", gap: 1, mb: 0.5, color: LABEL_COLOR }}><HomeWorkIcon /><Typography sx={{ fontWeight: 700, fontSize: "1.3rem", fontFamily: TAJAWAL }}>الموقع</Typography></Box>
                <Typography sx={{ fontSize: "1rem", mb: 3, color: "#242629ff", fontFamily: TAJAWAL, fontWeight: 'bold' }}>الرجاء كتابة موقع العقار المراد بيعه بالتفصيل</Typography>
                <StyledTextField fullWidth multiline minRows={3} value={location} onChange={(e) => setLocation(e.target.value)} />
              </Box>
            </Box>

            <Box sx={{ position: "relative" }}>
              <Box sx={{ position: "absolute", inset: "-2px", borderRadius: "16px", background: "linear-gradient(135deg,#06f9f3,#00b3ff,#06f9f3)", filter: "blur(4px)", zIndex: 0 }} />
              <Box sx={{ position: "relative", zIndex: 10, p: 2, borderRadius: 3, border: "1px solid #E2E8F0", background: "#E2E8F0" }}>
                <Box sx={{ display: "flex", gap: 1, mb: 1, color: LABEL_COLOR }}><LocationCityIcon /><Typography sx={{ fontWeight: 700, fontSize: "1.3rem", fontFamily: TAJAWAL }}>اسم المطور العقاري</Typography></Box>
                <Typography sx={{ fontSize: "1rem", mb: 3, color: "#242629ff", fontFamily: TAJAWAL, fontWeight: 'bold' }}>الرجاء كتابة اسم المطور العقاري إن أمكن</Typography>
                <StyledTextField fullWidth value={developer} onChange={(e) => setDeveloper(e.target.value)} />
              </Box>
            </Box>

            <Box sx={{ position: "relative", borderRadius: 4 }}>
              <Box sx={{ position: "absolute", inset: "-2px", borderRadius: 4, background: "linear-gradient(135deg, #06f9f3, #00b3ff, #06f9f3)", filter: "blur(6px)", zIndex: 0 }} />
              <Box sx={{ position: "relative", zIndex: 1, p: 3, borderRadius: 4, border: "1px solid #CBD5E1", backgroundColor: "#E2E8F0" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1, color: LABEL_COLOR }}>
                  <StraightenIcon />
                  <Typography sx={{ fontWeight: 700, fontSize: "1.3rem", fontFamily: TAJAWAL }}>المساحة</Typography>
                </Box>
                <Typography sx={{ fontSize: "1rem", mb: 2, color: "#242629", fontFamily: TAJAWAL, fontWeight: "bold" }}>الرجاء كتابة المساحة</Typography>
                
                <Box sx={{ mb: 3 }}>
                  <StyledTextField fullWidth value={area} onChange={(e) => setArea(e.target.value)} />
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                  <Typography sx={{ minWidth: 120, fontFamily: TAJAWAL, fontWeight: 600 }}>عدد الغرف</Typography>
                  <StyledTextField size="small" placeholder="عدد الغرف" value={rooms} onChange={(e) => setRooms(e.target.value)} sx={{ width: "40%" }} />              
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                  <Typography sx={{ minWidth: 120, fontFamily: TAJAWAL, fontWeight: 600 }}>عدد دورات المياه</Typography>
                  <StyledTextField size="small" placeholder="عدد دورات المياه" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} sx={{ width: "40%" }} />              
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 3 }}>
                  <Typography sx={{ minWidth: 120, fontFamily: TAJAWAL, fontWeight: 600 }}>عمر العقار</Typography>

                  <FormControlLabel
                    control={
                      <Checkbox 
                        checked={propertyAgeSelection === "new"} 
                        onChange={() => handleAgeCheckboxChange("new")} 
                      />
                    }
                    label={<Typography sx={{ fontFamily: TAJAWAL }}>جديد</Typography>}
                  />

                  <FormControlLabel
                    control={
                      <Checkbox 
                        checked={propertyAgeSelection === "custom"} 
                        onChange={() => handleAgeCheckboxChange("custom")} 
                      />
                    }
                    label={<Typography sx={{ fontFamily: TAJAWAL }}>أكثر من سنة</Typography>}
                  />

                  <TextField
                    size="small"
                    value={customAgeInput}
                    placeholder="كم سنة؟"
                    onChange={(e) => {
                      const val = e.target.value;
                      setCustomAgeInput(val);
                      if (val.trim() !== "") {
                        handleAgeCheckboxChange("custom");
                      } else {
                        handleAgeCheckboxChange("");
                      }
                    }}
                    sx={{ width: 120, backgroundColor: "white", borderRadius: "8px" }}
                  />
                </Box>
              </Box>
            </Box>

          <Box sx={{ mt: 5, position: "relative" }}>
            <Box sx={{ position: "absolute", inset: "-2px", borderRadius: "16px", background: "linear-gradient(135deg,#06f9f3,#00b3ff,#06f9f3)", filter: "blur(4px)", zIndex: 0 }} />
            <Box sx={{ position: "relative", zIndex: 10, border: "1px solid #E2E8F0", background: "#E2E8F0", borderRadius: 3, p: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}><EditNoteIcon sx={{ color: LABEL_COLOR }} /><Typography sx={{ fontWeight: 800, fontSize: "1.6rem", color: LABEL_COLOR, fontFamily: TAJAWAL }}>تفاصيل إضافية</Typography></Box>
              <Typography sx={{ mt: 0.5, mb: 1.5, fontSize: "0.95rem", color: "#222324ff", fontFamily: TAJAWAL, fontWeight: 'bold' }}>اذكر أي ملاحظات أو متطلبات خاصة تساعدنا في خدمتك بشكل أفضل</Typography>
              <StyledTextField multiline minRows={4} fullWidth placeholder="اكتب ملاحظاتك هنا..." value={notes} onChange={(e) => setNotes(e.target.value)} />
            </Box>
          </Box>

          <Box sx={{ mt: 4, mb: 4, position: "relative" }}>
            <Box sx={{ position: "absolute", inset: "-2px", borderRadius: "16px", background: "linear-gradient(135deg,#06f9f3,#00b3ff,#06f9f3)", filter: "blur(4px)", zIndex: 0 }} />
            <Box sx={{ position: "relative", zIndex: 10, p: 3, borderRadius: 3, background: "#E2E8F0", border: "1px solid #E2E8F0" }}>
              <Box sx={{ display: "flex", gap: 1, mb: 1, color: LABEL_COLOR }}><CloudUpload /><Typography sx={{ fontWeight: 700, fontSize: "1.3rem", fontFamily: TAJAWAL }}>إرفاق الصور والفيديو</Typography></Box>
              <Typography sx={{ fontSize: "0.9rem", mb: 2, color: "#475569", fontFamily: TAJAWAL }}>يمكنك رفع صور العقار ومقاطع الفيديو التوضيحية</Typography>
              <input type="file" multiple id="file-upload" style={{ display: 'none' }} onChange={handleFileChange} accept="image/*,video/*,.pdf,.doc,.docx" />
              <label htmlFor="file-upload">
                <UploadBox>
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 1 }}><CloudUpload size={32} color={COLOR_DEEP_BLUE} /><Video size={32} color={COLOR_DEEP_BLUE} /></Box>
                  <Typography sx={{ fontWeight: 700, fontFamily: TAJAWAL }}>اضغط هنا لرفع الصور أو الفيديو</Typography>
                </UploadBox>
              </label>

              {loading && (
                <Box sx={{ mt: 2, width: '100%' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography sx={{ color: COLOR_DEEP_BLUE, fontWeight: 'bold', fontSize: '0.8rem' }}>جاري التحميل...</Typography>
                    <Typography sx={{ color: COLOR_DEEP_BLUE, fontWeight: 'bold', fontSize: '0.8rem' }}>{uploadProgress}%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={uploadProgress} sx={{ height: 10, borderRadius: 5, backgroundColor: '#CBD5E1', '& .MuiLinearProgress-bar': { backgroundColor: COLOR_PRIMARY_CYAN, boxShadow: `0 0 10px ${COLOR_PRIMARY_CYAN}` }}} />
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

          <Box sx={{ position: "relative", mb: 4 }}> 
            <Box 
              sx={{ 
                position: "absolute", 
                inset: "-2px", 
                borderRadius: "16px", 
                background: "linear-gradient(135deg,#06f9f3,#00b3ff,#06f9f3)", 
                filter: "blur(4px)", 
                zIndex: 0 
              }} 
            />

            <Box 
              sx={{ 
                position: "relative", 
                zIndex: 10, 
                p: 3, 
                borderRadius: 3, 
                border: "1px solid #E2E8F0", 
                background: "#E2E8F0" 
              }}
            >
              <Box sx={{ display: "flex", gap: 1, mb: 2, color: LABEL_COLOR }}>
                <AccountBalanceWalletIcon />
                <Typography sx={{ fontWeight: 700, fontSize: "1.3rem", fontFamily: TAJAWAL }}>
                  سعر البيع
                </Typography>
              </Box>

              <Typography sx={{ fontSize: "1rem", mb: 3, color: "#242629ff", fontFamily: TAJAWAL, fontWeight: 'bold' }}>
                الرجاء اختيار أحد الطرق لتقييم سعر البيع
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                <Checkbox 
                  checked={checkboxValues[0]} 
                  onChange={(e) => handleCheckboxChange(0, e.target.checked)} 
                />
                <Typography sx={{ minWidth: 100, fontFamily: TAJAWAL }}>حد</Typography>
                <StyledTextField 
                  size="small" 
                  placeholder="اكتب سعر البيع"
                  value={priceLimit} 
                  onChange={(e) => {
                    const val = e.target.value;
                    setPriceLimit(val);
                    handleCheckboxChange(0, val.trim() !== "");
                  }} 
                />
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
                <Checkbox 
                  checked={checkboxValues[1]} 
                  onChange={(e) => handleCheckboxChange(1, e.target.checked)} 
                />
                <Typography sx={{ minWidth: 100, fontFamily: TAJAWAL }}>على السوم</Typography>
                <StyledTextField 
                  size="small" 
                  placeholder="اكتب السعر المتوقع"
                  value={priceOffer} 
                  onChange={(e) => {
                    const val = e.target.value;
                    setPriceOffer(val);
                    handleCheckboxChange(1, val.trim() !== "");
                  }} 
                />
              </Box>

              <Divider sx={{ mb: 3, borderColor: "rgba(0,0,0,0.1)" }} />

              <Box sx={{ display: "flex", gap: 1, mb: 2, color: LABEL_COLOR }}>
                <HandshakeIcon />
                <Typography sx={{ fontWeight: 700, fontSize: "1.3rem", fontFamily: TAJAWAL }}>
                  هل السعر قابل للتفاوض؟
                </Typography>
              </Box>

              <Box 
                sx={{ 
                  display: "flex", 
                  gap: 8, 
                  mt: 4, 
                  mb: 2, 
                  width: "100%", 
                  justifyContent: "flex-start", 
                  px: 2 
                }}
              >
                <Box
                  onClick={() => setIsNegotiable('yes')}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    transition: "0.2s",
                    "&:hover": { opacity: 0.7 }
                  }}
                >
                  <Switch 
                    checked={isNegotiable === 'yes'} 
                    color="success" 
                    size="medium"
                    sx={{ transform: "scale(1.2)", ml: 1 }}
                  />
                  <Typography sx={{ 
                    fontFamily: TAJAWAL, 
                    fontWeight: 800, 
                    fontSize: "1.6rem", 
                    color: isNegotiable === 'yes' ? '#2e7d32' : '#64748B', 
                  }}>
                    نعم
                  </Typography>
                </Box>

                <Box
                  onClick={() => setIsNegotiable('no')}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    transition: "0.2s",
                    "&:hover": { opacity: 0.7 }
                  }}
                >
                  <Switch 
                    checked={isNegotiable === 'no'} 
                    sx={{
                      transform: "scale(1.2)", 
                      ml: 1,
                      '& .MuiSwitch-switchBase.Mui-checked': { color: '#d32f2f' },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#d32f2f' },
                    }}
                    size="medium"
                  />
                  <Typography sx={{ 
                    fontFamily: TAJAWAL, 
                    fontWeight: 800, 
                    fontSize: "1.6rem", 
                    color: isNegotiable === 'no' ? '#d32f2f' : '#64748B', 
                  }}>
                    لا
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>  

        <Box sx={{ position: "relative", mb: 4 }}>
          <Box
            sx={{
              position: "absolute",
              inset: "-2px",
              borderRadius: "16px",
              background: "linear-gradient(135deg,#06f9f3,#00b3ff,#06f9f3)",
              filter: "blur(4px)",
              zIndex: 0,
            }}
          />

          <Box
            sx={{
              position: "relative",
              zIndex: 10,
              p: 3,
              borderRadius: 3,
              border: "1px solid #E2E8F0",
              background: "#E2E8F0",
            }}
          >
            <Box sx={{ display: "flex", gap: 1, mb: 2, color: LABEL_COLOR }}>
              <LocalOfferIcon />
              <Typography sx={{ fontWeight: 700, fontSize: "1.3rem", fontFamily: TAJAWAL }}>
                قابلية التفاوض
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: 8,
                mt: 4,
                mb: 2,
                width: "100%",
                justifyContent: "flex-start",
                px: 2,
              }}
            >
              <Box
                onClick={() => setisPaymentmethod('yes')}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  transition: "0.2s",
                  "&:hover": { opacity: 0.7 },
                }}
              >
                <Checkbox
                  checked={isPaymentmethod === "yes"}
                  color="success"
                  sx={{ transform: "scale(1.4)", ml: 1 }}
                />
                <Typography
                  sx={{
                    fontFamily: TAJAWAL,
                    fontWeight: 800,
                    fontSize: "1.6rem",
                    color: isPaymentmethod === "yes" ? "#2e7d32" : "#64748B",
                  }}
                >
                  نقدا
                </Typography>
              </Box>

              <Box
               onClick={() => setisPaymentmethod('no')}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  transition: "0.2s",
                  "&:hover": { opacity: 0.7 },
                }}
              >
                <Checkbox
                  checked={isPaymentmethod === "no"}
                  color="success" 
                  sx={{ transform: "scale(1.4)", ml: 1 }}
                />
                <Typography
                  sx={{
                    fontFamily: TAJAWAL,
                    fontWeight: 800,
                    fontSize: "1.6rem",
                    color: isPaymentmethod === "no" ? "#2e7d32" : "#64748B",
                  }}
                >
                  تمويل
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
                           
        </Box>

          <Box sx={{ mb: 6, position: "relative" }}>
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

          <Box sx={{ mt: 5, textAlign: "center" }}>
            <SubmitButton onClick={handleSubmit} disabled={loading} endIcon={loading ? <CircularProgress size={24} color="inherit" /> : <Send size={24} style={{ marginRight: '8px' }} />}>
              {loading ? `جاري الحفظ ${uploadProgress}%` : "ارسال الطلب وحفظ البيانات"}
            </SubmitButton>
          </Box>
        </GlassCard>
      </Container>
    </Box>
  );
};

export default Service02;