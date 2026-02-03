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
import PublicIcon from "@mui/icons-material/Public";
import WcIcon from "@mui/icons-material/Wc";
import { keyframes } from "@mui/system";
import { Sparkles } from "lucide-react";
import HotelIcon from '@mui/icons-material/Hotel';          
import BathtubIcon from '@mui/icons-material/Bathtub';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

/* ---------------- TYPES & INTERFACES ---------------- */
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

interface FormPayload {
  propertyStatus: string;
  propertyType: string;
  location: string;
  developer: string;
  area: string;
  rooms: string;
  bathrooms: string;
  propertyAge: string;
  priceLimit: string;
  priceOffer: string;
  isNegotiable: string;
  notes: string;
  contactChannels: {
    chat: boolean;
    whatsapp: boolean;
    call: boolean;
  };
  clientName: string;
  clientMobile: string;
  ownerName: string;
  nationality: string;
  gender: string;
  date: string;
}

/* ---------------- CONSTANTS & THEME ---------------- */
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
const GlassCard = styled(Box)(() => ({
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

/* ---------------- COMPONENT LOGIC ---------------- */
const Service02: React.FC<Props> = ({ }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  /* --- State Management --- */
  const [dropdownValues, setDropdownValues] = useState<Record<number, string>>({});
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [channels, setChannels] = useState({
    chat: true,
    whatsapp: true,
    call: false,
  });

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [location, setLocation] = useState("");
  const [developer, setDeveloper] = useState("");
  
  // Personal Data States
  const [ownerName, setOwnerName] = useState("");
  const [nationality, setNationality] = useState("");
  const [gender, setGender] = useState("");

  // Specs States
  const [area, setArea] = useState("");
  const [rooms, setRooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [propertyAgeSelection, setPropertyAgeSelection] = useState(""); 
  const [customAgeInput, setCustomAgeInput] = useState("");

  const [priceLimit, setPriceLimit] = useState("");
  const [priceOffer, setPriceOffer] = useState("");
  const [checkboxValues, setCheckboxValues] = useState<boolean[]>([false, false]);
  const [isNegotiable, setIsNegotiable] = useState<'yes' | 'no' | null>(null); 
  
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const [openPopup, setOpenPopup] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">("success");
  const [alertMessage, setAlertMessage] = useState("");

  /* --- Event Handlers --- */
  const handleAgeCheckboxChange = (type: string) => {
    setPropertyAgeSelection(type);
    if (type !== "custom") setCustomAgeInput("");
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

  const handleResetForm = () => {
    setDropdownValues({});
    setNotes("");
    setChannels({ chat: true, whatsapp: true, call: false });
    setName("");
    setMobile("");
    setLocation("");
    setDeveloper("");
    setOwnerName("");
    setNationality("");
    setGender("");
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
    setUploadProgress(0);
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
    const payload: FormPayload = {
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
      notes,
      contactChannels: channels,
      clientName: name,
      clientMobile: mobile,
      ownerName,
      nationality,
      gender,
      date: new Date().toISOString(),
    };

    formData.append("payload", JSON.stringify(payload));
    selectedFiles.forEach((file) => formData.append("files", file));

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
        handleResetForm();
      }
    } catch (error) {
      setAlertSeverity("error");
      setAlertMessage("حدث خطأ في حفظ البيانات في قاعدة البيانات");
      setOpenPopup(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", background: `url('https://i.ibb.co/BVVmKKnJ/green-paint-wall-background-texture-jpg.webp')`, backgroundSize: "cover", backgroundAttachment: "fixed", py: 2, direction: "rtl" }}>
      <Snackbar open={openPopup} autoHideDuration={6000} onClose={() => setOpenPopup(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={() => setOpenPopup(false)} severity={alertSeverity} variant="filled" sx={{ width: '100%', fontSize: '1.2rem', fontFamily: TAJAWAL }}>
          {alertMessage}
        </Alert>
      </Snackbar>

      <Container maxWidth="md" sx={{ mt: { xs: 4, md: 8 }, mb: { xs: 6, md: 12 }, direction: "rtl", fontFamily: TAJAWAL }}>
        
        <Box sx={{ textAlign: "center", mb: 8, animation: `${float} 4s ease-in-out infinite`, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h1" sx={{ fontWeight: 800, fontSize: { xs: "2.5rem", md: "4rem" }, color: COLOR_PRIMARY_CYAN, fontFamily: TAJAWAL, textShadow: "0 10px 20px rgba(0,0,0,0.3)", display: 'flex', alignItems: 'center', gap: 1 }}>
            بيع العقار <Sparkles size={32} style={{ color: COLOR_PRIMARY_CYAN }} />
          </Typography>
          <Typography sx={{ color: "#fff", opacity: 0.9, fontSize: "1.2rem", mt: 2, fontFamily: TAJAWAL, maxWidth: "600px" }}>
            نحول رؤيتك إلى واقع ملموس بدقة واحترافية
          </Typography>
        </Box>

        <GlassCard sx={{ p: { xs: 2, md: 4 } }}>
          
          {/* Status Selection */}
          <Box sx={{ display: "flex", flexDirection: "row", gap: { xs: 2, sm: 3 }, mb: 4, overflowX: "visible", p: 2, perspective: "1000px" }}>
         <Box sx={{ flex: 1, position: "relative", display: "flex", justifyContent: "center", alignItems: "center", p: 4 }}>
  
          {/* Layer 1: The Deep 3D Shadow (Updating your original absolute Box) */}
          <Box 
            sx={{ 
              position: "absolute", 
              inset: "4px", 
              borderRadius: "28px", 
              background: "rgba(0, 0, 0, 0.3)", // Deep shadow color like the image
              filter: "blur(15px)", 
              transform: "translate(12px, 15px)", // Pushes shadow to bottom-right
              zIndex: 6,
              transition: "0.4s ease" 
            }} 
          />

          {/* Layer 2: The Main Card (Updating your original interactive Box) */}
          <Box 
            onClick={() => handleDeveloperCheckbox(0)} 
            sx={{ 
              width: "100%", 
              p: { xs: 2, sm: 3 }, 
              borderRadius: 3, 
              background: "#E2E8F0", // Pure white like the image
              textAlign: "center", 
              cursor: "pointer", 
              position: "relative", 
              zIndex: 10,
              border: "1px solid rgba(0,0,0,0.05)",
              
              // THE 3D POP HOVER EFFECT
              transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)", 
              "&:hover": {
                transform: "translateY(-15px) scale(1.02)", // Moves UP every time you hover
                boxShadow: "0px 20px 40px rgba(0,0,0,0.25)" // Shadow gets deeper
              }
            }}
          >
            <FormControlLabel 
              sx={{ width: "100%", m: 0, pointerEvents: "none" }} 
              control={
                <Checkbox 
                  checked={isChecked1} 
                  sx={{ "& .MuiSvgIcon-root": { fontSize: { xs: 28, sm: 40 } } }} 
                />
              } 
              label={
                <Typography 
                  sx={{ 
                    fontFamily: TAJAWAL, 
                    fontSize: { xs: "1rem", sm: "1.5rem" }, 
                    fontWeight: "800", // Thicker font for high contrast
                    color: "#1e293b"
                  }}
                >
                  جاهز
                </Typography>
              } 
            />
          </Box>
        </Box>
        <Box sx={{ flex: 1, position: "relative", display: "flex", justifyContent: "center", alignItems: "center", p: 4 }}>
  
        {/* Layer 1: The Deep Directional Shadow (Replaces the neon glow) */}
          <Box 
            sx={{ 
              position: "absolute", 
              inset: "4px", 
              borderRadius: "28px", 
              background: "rgba(0, 0, 0, 0.3)", // Heavy shadow like your reference image
              filter: "blur(18px)", 
              transform: "translate(12px, 15px)", // Pushes shadow down/right for 3D depth
              zIndex: 6,
              transition: "0.4s ease" 
            }} 
          />

          {/* Layer 2: The Main Card with Hover Lift */}
          <Box 
            onClick={() => handleDeveloperCheckbox(1)} 
            sx={{ 
              width: "100%", 
              p: { xs: 2, sm: 3 }, 
              borderRadius: 3, 
              background: "#E2E8F0", // Changed to White for better contrast with the shadow
              textAlign: "center", 
              cursor: "pointer", 
              position: "relative", 
              zIndex: 10,
              border: "1px solid rgba(0, 0, 0, 0.05)",
              
              // THE MOUSE HOVER EFFECT
              transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)", 
              "&:hover": {
                transform: "translateY(-15px) scale(1.02)", // Pops UP toward the user
                boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.2)" // Shadow expands on hover
              },
              "&:active": {
                transform: "translateY(-5px) scale(0.98)" // Sinks down when clicked
              }
            }}
          >
            <FormControlLabel 
              sx={{ width: "100%", m: 0, pointerEvents: "none" }} 
              control={
                <Checkbox 
                  checked={isChecked2} 
                  sx={{ "& .MuiSvgIcon-root": { fontSize: { xs: 28, sm: 40 } } }} 
                />
              } 
              label={
                <Typography 
                  sx={{ 
                    fontFamily: TAJAWAL, 
                    fontSize: { xs: "1rem", sm: "1.5rem" }, 
                    fontWeight: "800", // Thicker font for that bold artistic look
                    color: "#1e293b" 
                  }}
                >
                  على الخارطة
                </Typography>
              } 
            />
          </Box>
        </Box>
        </Box>

      {/* Property Type Dropdown */}
        <Box sx={{ display: "grid", gap: 5, p: 2 }}>
          {DROPDOWN_FIELDS.map((field, i) => (
            <Box key={i} sx={{ position: "relative" }}>
              
              {/* 1. THE DEEP 3D SHADOW (Replaced your neon gradient) */}
              <Box 
                sx={{ 
                  position: "absolute", 
                  inset: "10px", 
                  borderRadius: "16px", 
                  background: "rgba(0, 0, 0, 0.25)", // Darker shadow like the image branches
                  filter: "blur(20px)", 
                  transform: "translate(15px, 20px)", // Moves shadow down and right for depth
                  zIndex: 0,
                  transition: "0.4s ease" 
                }} 
              />

              {/* 2. THE MAIN CONTAINER BOX */}
              <Box 
                sx={{ 
                  position: "relative", 
                  zIndex: 10, 
                  p: 3, 
                  borderRadius: 3, 
                  background: "#E2E8F0", // Switched to white for high contrast
                  border: "1px solid rgba(0,0,0,0.05)",
                  
                  // THE 3D POP HOVER EFFECT
                  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  "&:hover": {
                    transform: "translateY(-10px)", // Lifts entire field on hover
                    boxShadow: "0px 20px 40px rgba(0,0,0,0.15)"
                  }
                }}
              >
                {/* Label & Icon Header */}
                <Box sx={{ display: "flex", gap: 1, mb: 2, color: LABEL_COLOR, alignItems: 'center' }}>
                  {field.icon}
                  <Typography sx={{ fontWeight: 800, fontSize: { xs: "1.2rem", md: "1.6rem" }, fontFamily: TAJAWAL, color: "#1e293b" }}>
                    {field.label}
                  </Typography>
                </Box>

                {/* Options Grid */}
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }, gap: 2 }}>
                  {field.options.map((opt, idx) => (
                    <FormControlLabel 
                      key={idx} 
                      sx={{
                        // Individual option hover effect
                        transition: "0.2s",
                        "&:hover": { transform: "scale(1.05)", color: "#00b3ff" }
                      }}
                      control={
                        <Checkbox 
                          checked={dropdownValues[i] === opt} 
                          onChange={(e) => setDropdownValues({ ...dropdownValues, [i]: e.target.checked ? opt : "" })} 
                        />
                      } 
                      label={
                        <Typography sx={{ fontFamily: TAJAWAL, fontSize: "1.4rem", fontWeight: 700 }}>
                          {opt}
                        </Typography>
                      } 
                    />
                  ))}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

          {/* Personal Data Section */}
    
       {/* Personal Data Section */}
        <Box sx={{ position: "relative", borderRadius: 4, mt: 5, mb: 5, p: 2 }}>
          
          {/* Layer 1: The Deep 3D Shadow (Replaces the neon glow) */}
          <Box 
            sx={{ 
              position: "absolute", 
              inset: "10px", 
              borderRadius: 4, 
              background: "rgba(0, 0, 0, 0.3)", // Heavy shadow like your reference
              filter: "blur(20px)", 
              transform: "translate(15px, 20px)", // Massive offset for depth
              zIndex: 0,
              transition: "0.4s ease" 
            }} 
          />

          {/* Layer 2: The Main Section Container */}
          <Box 
            sx={{ 
              position: "relative", 
              zIndex: 1, 
              p: { xs: 2, sm: 3 }, 
              borderRadius: 4, 
              border: "1px solid rgba(0, 0, 0, 0.05)", 
              backgroundColor: "#E2E8F0", // Switched to White for 3D Pop contrast
              
              // THE 3D POP HOVER EFFECT
              transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              "&:hover": {
                transform: "translateY(-12px)", // Lifts the entire section
                boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.15)"
              }
            }}
          >
            
            {/* SECTION TITLE */}
            <Box sx={{ display: "flex", gap: 1, mb: 3, color: LABEL_COLOR, alignItems: "center" }}>
              <AccountBoxIcon sx={{ fontSize: "1.7rem" }} /> 
              <Typography sx={{ fontWeight: 800, fontSize: "1.5rem", fontFamily: TAJAWAL, color: "#1e293b" }}>
                البيانات الشخصية
              </Typography>
            </Box>

            {/* 1. ROW: OWNER NAME */}
            <Box sx={{ 
              display: "flex", 
              flexDirection: { xs: "column", sm: "row" }, 
              alignItems: { xs: "flex-start", sm: "center" }, 
              gap: { xs: 1, sm: 2 }, 
              mb: 3 
            }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 165 }}>
                <AssignmentIndIcon sx={{ color: LABEL_COLOR, fontSize: "1.2rem" }} />
                <Typography sx={{ fontFamily: TAJAWAL, fontWeight: 800 }}>اسم المالك أو الوكيل</Typography>
              </Box>
              <StyledTextField
                size="small"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                placeholder="أدخل الاسم هنا"
                sx={{
                      // Keep your responsive width
                      width: { xs: "100%", sm: "50%", md: "40%" },

                      // 1. Background and Shape
                      "& .MuiInputBase-root": {
                        borderRadius: "8px",
                        backgroundColor: "#E2E8F0", // Kept white as per your second snippet
                      },

                      // 2. Standard border state
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#000000 !important",
                        borderWidth: "1px !important",
                      },

                      // 3. Hover state (remains black)
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#000000 !important",
                      },

                      // 4. Focused state (prevents the default blue/thick border)
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#000000 !important",
                        borderWidth: "1px !important",
                      },
                    }}
              />
            </Box>

            {/* 2. ROW: NATIONALITY */}
            <Box sx={{ 
              display: "flex", 
              flexDirection: { xs: "column", sm: "row" }, 
              alignItems: { xs: "flex-start", sm: "center" }, 
              gap: { xs: 1, sm: 2 }, 
              mb: 3 
            }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 165 }}>
                <PublicIcon sx={{ color: LABEL_COLOR, fontSize: "1.2rem" }} />
                <Typography sx={{ fontFamily: TAJAWAL, fontWeight: 800 }}>جنسية المالك</Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 1 }}>
                <FormControlLabel
                  control={<Checkbox checked={nationality === "saudi"} onChange={() => setNationality("saudi")} />}
                  label={<Typography sx={{ fontFamily: TAJAWAL, fontSize: "1rem", fontWeight: 600 }}>سعودي</Typography>}
                />
                <FormControlLabel
                  control={<Checkbox checked={nationality === "non-saudi"} onChange={() => setNationality("non-saudi")} />}
                  label={<Typography sx={{ fontFamily: TAJAWAL, fontSize: "1rem", fontWeight: 600 }}>غير سعودي</Typography>}
                />
              </Box>
            </Box>

            {/* 3. ROW: GENDER */}
            <Box sx={{ 
              display: "flex", 
              flexDirection: { xs: "column", sm: "row" }, 
              alignItems: { xs: "flex-start", sm: "center" }, 
              gap: { xs: 1, sm: 2 } 
            }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 165 }}>
                <WcIcon sx={{ color: LABEL_COLOR, fontSize: "1.2rem" }} />
                <Typography sx={{ fontFamily: TAJAWAL, fontWeight: 800 }}>النوع</Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 1 }}>
                <FormControlLabel
                  control={<Checkbox checked={gender === "male"} onChange={() => setGender("male")} />}
                  label={<Typography sx={{ fontFamily: TAJAWAL, fontSize: "1rem", fontWeight: 600 }}>ذكر</Typography>}
                />
                <FormControlLabel
                  control={<Checkbox checked={gender === "female"} onChange={() => setGender("female")} />}
                  label={<Typography sx={{ fontFamily: TAJAWAL, fontSize: "1rem", fontWeight: 600 }}>أنثى</Typography>}
                />
              </Box>
            </Box>

          </Box>
        </Box>
        {/* Location Details */}
        <Box sx={{ mt: 3, position: "relative", p: 2 }}>
          
          {/* Layer 1: The Deep 3D Shadow (Replacing neon glow) */}
          <Box 
            sx={{ 
              position: "absolute", 
              inset: "10px", 
              borderRadius: "16px", 
              background: "rgba(0, 0, 0, 0.3)", // Heavy depth shadow
              filter: "blur(20px)", 
              transform: "translate(15px, 20px)", // Moves shadow down and right
              zIndex: 0,
              transition: "0.4s ease" 
            }} 
          />

          {/* Layer 2: Main Section Container */}
          <Box 
            sx={{ 
              position: "relative", 
              zIndex: 10, 
              p: 3, 
              borderRadius: 3, 
              background: "#E2E8F0", // Switched to White for the 3D Pop effect
              border: "1px solid rgba(0, 0, 0, 0.05)",
              
              // THE 3D POP HOVER EFFECT
              transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              "&:hover": {
                transform: "translateY(-12px)", // Lifts every time mouse hovers
                boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.15)"
              }
            }}
          >
            {/* Header */}
            <Box sx={{ display: "flex", gap: 1, mb: 0.5, color: LABEL_COLOR }}>
              <HomeWorkIcon />
              <Typography sx={{ fontWeight: 800, fontSize: "1.5rem", fontFamily: TAJAWAL, color: "#1e293b" }}>
                الموقع
              </Typography>
            </Box>
            
            <Typography sx={{ fontSize: "1rem", mb: 3, color: "#475569", fontFamily: TAJAWAL, fontWeight: 800 }}>
              اكتب موقع العقار بالتفصيل
            </Typography>

            <StyledTextField
              fullWidth
              multiline
              minRows={3}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              sx={{
                  // 1. Background Color and Radius
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                    backgroundColor: "#E2E8F0",
                    padding: "12px", // Adjust padding for multiline comfort
                  },
                  // 2. Persistent Black Border (Normal State)
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#000000 !important",
                    borderWidth: "1px !important",
                  },
                  // 3. Hover State
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#000000 !important",
                  },
                  // 4. Focused State (While typing)
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#000000 !important",
                    borderWidth: "1px !important", // Prevents the border from thickening
                  },
                }}
            />
          </Box>
        </Box>

       {/* Developer Details */}
        <Box sx={{ mt: 3, position: "relative", p: 2 }}>
          
          {/* Layer 1: The Deep Directional Shadow */}
          <Box 
            sx={{ 
              position: "absolute", 
              inset: "10px", 
              borderRadius: "16px", 
              background: "rgba(0, 0, 0, 0.35)", // Strong depth for the "Pop"
              filter: "blur(20px)", 
              transform: "translate(15px, 20px)", // Moves shadow to bottom-right
              zIndex: 0,
              transition: "0.4s ease" 
            }} 
          />

          {/* Layer 2: Main Section Container */}
          <Box 
            sx={{ 
              position: "relative", 
              zIndex: 10, 
              p: 3, 
              borderRadius: 3, 
              background: "#E2E8F0", // High contrast white
              border: "1px solid rgba(0, 0, 0, 0.05)",
              
              // THE MOUSE HOVER POP EFFECT
              transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              "&:hover": {
                transform: "translateY(-12px) scale(1.01)", // High lift
                boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.2)"
              }
            }}
          >
            {/* Header */}
            <Box sx={{ display: "flex", gap: 1, mb: 1, color: LABEL_COLOR, alignItems: "center" }}>
              <LocationCityIcon sx={{ fontSize: "1.7rem" }} />
              <Typography sx={{ fontWeight: 800, fontSize: "1.5rem", fontFamily: TAJAWAL, color: "#1e293b" }}>
                اسم المطور العقاري
              </Typography>
            </Box>
            
            <Typography sx={{ fontSize: "1rem", mb: 3, color: "#475569", fontFamily: TAJAWAL, fontWeight: 800 }}>
              اكتب اسم المطور العقاري إن أمكن
            </Typography>

            <StyledTextField
              fullWidth
              value={developer}
              onChange={(e) => setDeveloper(e.target.value)}
              sx={{
                  // Container background and shape
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                    backgroundColor: "#E2E8F0",
                  },
                  // Standard border state
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#000000 !important",
                    borderWidth: "1px !important",
                  },
                  // Hover state (remains black)
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#000000 !important",
                  },
                  // Active/Focused state (remains 1px and black)
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#000000 !important",
                    borderWidth: "1px !important",
                  },
                }}
            />
          </Box>
        </Box>

            {/* Specs: Area, Rooms, Bathrooms */}
        <Box sx={{ display: "grid", gap: 3, mt: 3, p: 2 }}>
          <Box sx={{ position: "relative", borderRadius: 4 }}>
            
            {/* Layer 1: The Deep Directional Shadow (Replaces neon glow) */}
            <Box 
              sx={{ 
                position: "absolute", 
                inset: "10px", 
                borderRadius: 4, 
                background: "rgba(0, 0, 0, 0.3)", // Heavy depth shadow
                filter: "blur(20px)", 
                transform: "translate(15px, 20px)", // Directional drop
                zIndex: 0,
                transition: "0.4s ease" 
              }} 
            />

            {/* Layer 2: Main Section Container */}
            <Box 
              sx={{ 
                position: "relative", 
                zIndex: 1, 
                p: 3, 
                borderRadius: 4, 
                backgroundColor: "#E2E8F0", // Switched to White for 3D Pop contrast
                border: "1px solid rgba(0, 0, 0, 0.05)",
                
                // THE 3D POP HOVER EFFECT
                transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                "&:hover": {
                  transform: "translateY(-12px)", // Lifts the entire section
                  boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.15)"
                }
              }}
            >
              
              {/* 1. ROW: AREA */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 165 }}>
                  <StraightenIcon sx={{ color: LABEL_COLOR, fontSize: "1.2rem" }} />
                  <Typography sx={{ fontFamily: TAJAWAL, fontWeight: 800, display: "flex", alignItems: "center", gap: "5px" }}>
                    المساحة <Box component="span" sx={{ fontSize: "0.8rem", fontWeight: 400, color: "#475569" }}>(اختياري)</Box>
                  </Typography>
                </Box>
                <StyledTextField
                  size="small"
                  placeholder="الرجاء كتابة المساحة"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  sx={{
                      width: { xs: "100%", sm: "40%" },
                      // 1. Updated Background and Radius
                      "& .MuiInputBase-root": {
                        borderRadius: "8px",
                        backgroundColor: "#E2E8F0",
                      },
                      // 2. Fixed Black Border (Normal)
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#000000 !important",
                        borderWidth: "1px !important",
                      },
                      // 3. Keep Black on Hover
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#000000 !important",
                      },
                      // 4. Keep Black and 1px on Focus (Click)
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#000000 !important",
                        borderWidth: "1px !important",
                      },
                    }}
                />
              </Box>

              {/* 2. ROW: ROOMS */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 165 }}>
                  <HotelIcon sx={{ color: LABEL_COLOR, fontSize: "1.2rem" }} />
                  <Typography sx={{ fontFamily: TAJAWAL, fontWeight: 800 }}>عدد الغرف</Typography>
                </Box>
                <StyledTextField
                  size="small"
                  value={rooms}
                  onChange={(e) => setRooms(e.target.value)}
                 sx={{
                      width: { xs: "100%", sm: "40%" },
                      // 1. Background and Shape
                      "& .MuiInputBase-root": {
                        borderRadius: "8px",
                        backgroundColor: "#E2E8F0",
                      },
                      // 2. Fixed Black Border (Normal State)
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#000000 !important",
                        borderWidth: "1px !important",
                      },
                      // 3. Keep Black on Hover
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#000000 !important",
                      },
                      // 4. Keep Black and Thin on Focus
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#000000 !important",
                        borderWidth: "1px !important",
                      },
                    }}
                />
              </Box>

              {/* 3. ROW: BATHROOMS */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 165 }}>
                  <BathtubIcon sx={{ color: LABEL_COLOR, fontSize: "1.2rem" }} />
                  <Typography sx={{ fontFamily: TAJAWAL, fontWeight: 800 }}>عدد دورات المياه</Typography>
                </Box>
                <StyledTextField
                  size="small"
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value)}
                   sx={{
                      width: { xs: "100%", sm: "40%" },
                      // 1. Background Color and Radius
                      "& .MuiInputBase-root": {
                        borderRadius: "8px",
                        backgroundColor: "#E2E8F0",
                      },
                      // 2. Fixed Black Border (Standard)
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#000000 !important",
                        borderWidth: "1px !important",
                      },
                      // 3. Keep Black on Hover
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#000000 !important",
                      },
                      // 4. Keep Black and Fixed Width on Focus
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#000000 !important",
                        borderWidth: "1px !important",
                      },
                    }}
                />
              </Box>

              {/* 4. ROW: PROPERTY AGE */}
              <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 3, mt: 1 }}>
                <Typography sx={{ minWidth: 120, fontFamily: TAJAWAL, fontWeight: 800 }}>عمر العقار</Typography>
                <FormControlLabel control={<Checkbox checked={propertyAgeSelection === "new"} onChange={() => handleAgeCheckboxChange("new")} />} label={<Typography sx={{ fontFamily: TAJAWAL, fontWeight: 600 }}>جديد</Typography>} />
                <FormControlLabel control={<Checkbox checked={propertyAgeSelection === "custom"} onChange={() => handleAgeCheckboxChange("custom")} />} label={<Typography sx={{ fontFamily: TAJAWAL, fontWeight: 600 }}>أكثر من سنة</Typography>} />
                <TextField
                  size="small"
                  value={customAgeInput}
                  onChange={(e) => {
                    const val = e.target.value;
                    setCustomAgeInput(val);
                    handleAgeCheckboxChange(val.trim() !== "" ? "custom" : "");
                  }}
                 sx={{
                      width: 120,
                      // 1. Updated Background and Radius
                      "& .MuiInputBase-root": {
                        borderRadius: "8px",
                        backgroundColor: "#E2E8F0",
                      },
                      // 2. Fixed Black Border (Normal State)
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#000000 !important",
                        borderWidth: "1px !important",
                      },
                      // 3. Keep Black on Hover
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#000000 !important",
                      },
                      // 4. Keep Black and 1px Width on Focus
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

       {/* Additional Notes Area */}
        <Box sx={{ mt: 5, position: "relative", p: 2 }}>
          
          {/* Layer 1: The Deep 3D Directional Shadow */}
          <Box 
            sx={{ 
              position: "absolute", 
              inset: "10px", 
              borderRadius: "16px", 
              background: "rgba(0, 0, 0, 0.35)", // Stronger shadow for the larger card
              filter: "blur(25px)", 
              transform: "translate(18px, 22px)", // Greater offset for the final section
              zIndex: 0,
              transition: "0.4s ease" 
            }} 
          />

          {/* Layer 2: The Main Card Container */}
          <Box 
            sx={{ 
              position: "relative", 
              zIndex: 10, 
              background: "#E2E8F0", // High-contrast white for maximum 3D Pop
              borderRadius: 3, 
              p: 3,
              border: "1px solid rgba(0, 0, 0, 0.05)",
              
              // THE 3D LIFT HOVER EFFECT
              transition: "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              "&:hover": {
                transform: "translateY(-15px) scale(1.01)", // High lift effect
                boxShadow: "0px 25px 50px rgba(0, 0, 0, 0.2)"
              }
            }}
          >
            {/* Header */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <EditNoteIcon sx={{ color: LABEL_COLOR, fontSize: "2rem" }} />
              <Typography 
                sx={{ 
                  fontWeight: 800, 
                  fontSize: "1.8rem", 
                  fontFamily: TAJAWAL,
                  color: "#1e293b" 
                }}
              >
                تفاصيل إضافية
              </Typography>
            </Box>

            <StyledTextField
              multiline
              minRows={4}
              fullWidth
              placeholder="اكتب ملاحظاتك..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              sx={{
                  mt: 2,
                  // 1. Background and Radius
                  "& .MuiInputBase-root": {
                    backgroundColor: "#E2E8F0",
                    borderRadius: "8px",
                  },
                  // 2. Fixed Black Border (Normal)
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#000000 !important",
                    borderWidth: "1px !important",
                  },
                  // 3. Keep Black on Hover
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#000000 !important",
                  },
                  // 4. Keep Black and 1px on Focus (typing)
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#000000 !important",
                    borderWidth: "1px !important",
                  },
                }}
            />
          </Box>
        </Box>

        {/* Media Upload Section */}
        <Box sx={{ mt: 4, mb: 4, position: "relative", p: 2 }}>
          
          {/* Layer 1: The Deep 3D Directional Shadow */}
          <Box 
            sx={{ 
              position: "absolute", 
              inset: "10px", 
              borderRadius: "16px", 
              background: "rgba(0, 0, 0, 0.35)", 
              filter: "blur(25px)", 
              transform: "translate(18px, 22px)", // Consistent directional lighting
              zIndex: 0,
              transition: "0.4s ease" 
            }} 
          />

          {/* Layer 2: Main Card Container */}
          <Box 
            sx={{ 
              position: "relative", 
              zIndex: 10, 
              p: 3, 
              borderRadius: 3, 
              background: "#E2E8F0", // High-contrast White for 3D Pop
              border: "1px solid rgba(0, 0, 0, 0.05)",
              
              // THE 3D POP HOVER EFFECT
              transition: "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              "&:hover": {
                transform: "translateY(-15px)", // Section lifts on hover
                boxShadow: "0px 25px 50px rgba(0, 0, 0, 0.15)"
              }
            }}
          >
            {/* Header */}
            <Box sx={{ display: "flex", gap: 1, mb: 1, color: LABEL_COLOR, alignItems: "center" }}>
              <CloudUpload  />
              <Typography sx={{ fontWeight: 800, fontSize: "1.5rem", fontFamily: TAJAWAL, color: "#1e293b" }}>
                إرفاق الصور والفيديو
              </Typography>
            </Box>
            
            <Typography sx={{ fontSize: "1rem", mb: 3, color: "#475569", fontFamily: TAJAWAL, fontWeight: 800 }}>
              يمكنك رفع صور العقار ومقاطع الفيديو التوضيحية
            </Typography>

            <input type="file" multiple id="file-upload" style={{ display: 'none' }} onChange={handleFileChange} accept="image/*,video/*,.pdf,.doc,.docx" />
            
            <label htmlFor="file-upload">
              <UploadBox sx={{
                cursor: 'pointer',
                transition: '0.3s',
                backgroundColor: '#F1F5F9', // Inset look
                borderRadius: '12px',
                p: 4,
                border: '2px dashed #CBD5E1',
                '&:hover': {
                  backgroundColor: '#E2E8F0',
                  borderColor: '#00b3ff',
                  transform: 'scale(1.02)' // Internal pop effect
                }
              }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 1 }}>
                  <CloudUpload size={40} color={COLOR_DEEP_BLUE} />
                  <Video size={40} color={COLOR_DEEP_BLUE} />
                </Box>
                <Typography sx={{ fontWeight: 800, fontFamily: TAJAWAL, textAlign: 'center', color: '#334155' }}>
                  اضغط هنا لرفع الصور أو الفيديو
                </Typography>
              </UploadBox>
            </label>

            {/* Progress Bar Section */}
            {loading && (
              <Box sx={{ mt: 3, width: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography sx={{ color: COLOR_DEEP_BLUE, fontWeight: 800, fontSize: '0.9rem' }}>جاري التحميل...</Typography>
                  <Typography sx={{ color: COLOR_DEEP_BLUE, fontWeight: 800, fontSize: '0.9rem' }}>{uploadProgress}%</Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={uploadProgress} 
                  sx={{ 
                    height: 12, 
                    borderRadius: 6, 
                    backgroundColor: '#E2E8F0', 
                    '& .MuiLinearProgress-bar': { 
                      backgroundColor: COLOR_PRIMARY_CYAN, 
                      boxShadow: `0 0 15px ${COLOR_PRIMARY_CYAN}`,
                      borderRadius: 6
                    }
                  }} 
                />
              </Box>
            )}

            {/* File Preview Chips */}
            {selectedFiles.length > 0 && (
              <Box sx={{ mt: 3, display: "flex", flexWrap: "wrap", gap: 1.5 }}>
                {selectedFiles.map((file, idx) => (
                  <Box 
                    key={idx} 
                    sx={{ 
                      display: "flex", 
                      alignItems: "center", 
                      p: 1.5, 
                      borderRadius: "12px", 
                      border: "1px solid #E2E8F0", 
                      background: "#F8FAFC",
                      boxShadow: "0px 4px 10px rgba(0,0,0,0.05)",
                      transition: "0.2s",
                      "&:hover": { transform: "translateY(-3px)", boxShadow: "0px 8px 15px rgba(0,0,0,0.1)" }
                    }}
                  >
                    {file.type.startsWith('video/') ? <Video size={18} style={{ marginLeft: '8px', color: '#023B4E' }} /> : <FileText size={18} style={{ marginLeft: '8px' }} />}
                    <Typography sx={{ fontSize: "0.85rem", fontWeight: 700, maxWidth: "150px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{file.name}</Typography>
                    <IconButton size="small" onClick={() => removeFile(idx)} sx={{ color: "red", ml: 1 }}><X size={16} /></IconButton>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Box>

     {/* Pricing Section */}
        <Box sx={{ position: "relative", mb: 4, p: 2 }}>
          
          {/* Layer 1: The Deep 3D Directional Shadow */}
          <Box 
            sx={{ 
              position: "absolute", 
              inset: "10px", 
              borderRadius: "16px", 
              background: "rgba(0, 0, 0, 0.35)", // Strong depth shadow
              filter: "blur(25px)", 
              transform: "translate(18px, 22px)", // Pushes shadow down and right
              zIndex: 0,
              transition: "0.4s ease" 
            }} 
          />

          {/* Layer 2: Main Pricing Container */}
          <Box 
            sx={{ 
              position: "relative", 
              zIndex: 10, 
              p: 3, 
              borderRadius: 3, 
              background: "#E2E8F0", // High-contrast White for the 3D Pop
              border: "1px solid rgba(0, 0, 0, 0.05)",
              
              // THE 3D POP HOVER EFFECT
              transition: "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              "&:hover": {
                transform: "translateY(-15px) scale(1.01)", // Card lifts every time
                boxShadow: "0px 25px 50px rgba(0, 0, 0, 0.15)"
              }
            }}
          >
            {/* Section Header */}
            <Box sx={{ display: "flex", gap: 1, mb: 2, color: LABEL_COLOR, alignItems: "center" }}>
              <AccountBalanceWalletIcon sx={{ fontSize: "1.8rem" }} />
              <Typography sx={{ fontWeight: 800, fontSize: "1.5rem", fontFamily: TAJAWAL, color: "#1e293b" }}>
                سعر البيع
              </Typography>
            </Box>

            <Typography sx={{ fontSize: "1rem", mb: 3, color: "#475569", fontFamily: TAJAWAL, fontWeight: 800 }}>
              الرجاء اختيار أحد الطرق لتقييم سعر البيع
            </Typography>

            {/* Price Option 1 */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <Checkbox checked={checkboxValues[0]} onChange={(e) => handleCheckboxChange(0, e.target.checked)} />
              <Typography sx={{ minWidth: 100, fontFamily: TAJAWAL, fontWeight: 700 }}>سعر محدد</Typography>
              <StyledTextField
                size="small"
                value={priceLimit}
                onChange={(e) => {
                  const val = e.target.value;
                  setPriceLimit(val);
                  handleCheckboxChange(0, val.trim() !== "");
                }}
                sx={{
                    // 1. Background and Radius
                    "& .MuiInputBase-root": {
                      borderRadius: "8px",
                      backgroundColor: "#E2E8F0",
                    },
                    // 2. Fixed Black Border (Normal)
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#000000 !important",
                      borderWidth: "1px !important",
                    },
                    // 3. Keep Black on Hover
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#000000 !important",
                    },
                    // 4. Keep Black and 1px on Focus
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#000000 !important",
                      borderWidth: "1px !important",
                    },
                  }}
              />
            </Box>

            {/* Price Option 2 */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
              <Checkbox checked={checkboxValues[1]} onChange={(e) => handleCheckboxChange(1, e.target.checked)} />
              <Typography sx={{ minWidth: 100, fontFamily: TAJAWAL, fontWeight: 700 }}>على السوم</Typography>
              <StyledTextField
                size="small"
                value={priceOffer}
                onChange={(e) => {
                  const val = e.target.value;
                  setPriceOffer(val);
                  handleCheckboxChange(1, val.trim() !== "");
                }}
                sx={{
                    // 1. Background and Border Radius
                    "& .MuiInputBase-root": {
                      borderRadius: "8px",
                      backgroundColor: "#E2E8F0",
                    },
                    // 2. Fixed Black Border (Normal State)
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#000000 !important",
                      borderWidth: "1px !important",
                    },
                    // 3. Keep Black on Hover
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#000000 !important",
                    },
                    // 4. Keep Black and 1px Width on Focus
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#000000 !important",
                      borderWidth: "1px !important",
                    },
                  }}
              />
            </Box>

            <Divider sx={{ mb: 3, borderColor: "rgba(0,0,0,0.1)" }} />

            {/* Negotiable Section */}
            <Box sx={{ display: "flex", gap: 1, mb: 2, color: LABEL_COLOR, alignItems: "center" }}>
              <HandshakeIcon sx={{ fontSize: "1.7rem" }} />
              <Typography sx={{ fontWeight: 800, fontSize: "1.4rem", fontFamily: TAJAWAL, color: "#1e293b" }}>
                هل السعر قابل للتفاوض؟
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 8, mt: 4, mb: 2, width: "100%", justifyContent: "flex-start", px: 2 }}>
              {/* Yes Toggle */}
              <Box onClick={() => setIsNegotiable('yes')} sx={{ display: "flex", alignItems: "center", cursor: "pointer", transition: "0.3s", "&:hover": { transform: "scale(1.1)" } }}>
                <Switch checked={isNegotiable === 'yes'} color="success" size="medium" sx={{ transform: "scale(1.2)", ml: 1 }} />
                <Typography sx={{ fontFamily: TAJAWAL, fontWeight: 800, fontSize: "1.6rem", color: isNegotiable === 'yes' ? '#2e7d32' : '#64748B' }}>نعم</Typography>
              </Box>
              
              {/* No Toggle */}
              <Box onClick={() => setIsNegotiable('no')} sx={{ display: "flex", alignItems: "center", cursor: "pointer", transition: "0.3s", "&:hover": { transform: "scale(1.1)" } }}>
                <Switch checked={isNegotiable === 'no'} sx={{ transform: "scale(1.2)", ml: 1, '& .MuiSwitch-switchBase.Mui-checked': { color: '#d32f2f' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#d32f2f' } }} size="medium" />
                <Typography sx={{ fontFamily: TAJAWAL, fontWeight: 800, fontSize: "1.6rem", color: isNegotiable === 'no' ? '#d32f2f' : '#64748B' }}>لا</Typography>
              </Box>
            </Box>
          </Box>
        </Box>

          {/* Contact Channels Section */}
          {/* Contact Channels Section */}
        <Box sx={{ mb: 6, position: "relative", p: 2 }}>
          
          {/* Layer 1: The Deep 3D Directional Shadow */}
          <Box 
            sx={{ 
              position: "absolute", 
              inset: "10px", 
              borderRadius: "16px", 
              background: "rgba(0, 0, 0, 0.35)", // Strong depth shadow
              filter: "blur(25px)", 
              transform: "translate(18px, 22px)", // Pushes shadow down and right
              zIndex: 0,
              transition: "0.4s ease" 
            }} 
          />

          {/* Layer 2: Main Card Container */}
          <Box 
            sx={{ 
              position: "relative", 
              zIndex: 10, 
              p: 3, 
              borderRadius: 3, 
              background: "#E2E8F0", // High-contrast White for the 3D Pop
              border: "1px solid rgba(0, 0, 0, 0.05)",
              
              // THE 3D POP HOVER EFFECT
              transition: "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              "&:hover": {
                transform: "translateY(-15px)", // Card lifts on hover
                boxShadow: "0px 25px 50px rgba(0, 0, 0, 0.15)"
              }
            }}
          >
            {/* Header */}
            <Typography sx={{ fontWeight: 800, fontSize: "1.6rem", mb: 0.5, color: LABEL_COLOR, fontFamily: TAJAWAL }}>
              قنوات التواصل
            </Typography>
            <Typography sx={{ fontSize: "1.1rem", mb: 3, color: "#475569", fontFamily: TAJAWAL, fontWeight: 800 }}>
              وسائل التواصل المتعددة تتيح الرد السريع من الفريق المختص
            </Typography>
            
            {/* Phone Number Row */}
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 1, mb: 2, width: "100%", flexWrap: "nowrap" }}>
              <FormControlLabel 
                sx={{ mr: 0, flexShrink: 0 }} 
                control={<Checkbox size="small" checked={channels.call} onChange={(e) => setChannels({ ...channels, call: e.target.checked })} />} 
                label={<Typography sx={{ fontFamily: TAJAWAL, fontSize: { xs: '12px', sm: '16px', md: '18px' }, fontWeight: 700, whiteSpace: "nowrap" }}>الرجاء التواصل على الرقم</Typography>} 
              />
              <Box sx={{ display: "flex", justifyContent: "flex-end", minWidth: 0, flexShrink: 1 }}>
                <Typography 
                  sx={{ 
                    fontFamily: "TAJAWAL", 
                    fontWeight: 800, 
                    fontSize: { xs: "11px", sm: "16px", md: "20px" }, 
                    color: "#E2E8F0", 
                    backgroundColor: "#1D4ED8", // Solid blue for 3D visibility
                    px: { xs: 1, md: 3 }, 
                    py: 1, 
                    borderRadius: "999px", 
                    boxShadow: "0 8px 20px rgba(29,78,216,0.35)", 
                    cursor: "pointer",
                    transition: "0.3s",
                    "&:hover": { transform: "scale(1.05) translateY(-3px)" } 
                  }}
                >
                  📞 +966 50 985 5666
                </Typography>
              </Box>
            </Box>

            {/* Icons Row */}
            <Box sx={{ display: "flex", justifyContent: "flex-start", gap: 8, alignItems: "center", mb: 3, marginRight: '27px' }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}><WhatsAppIcon sx={{ color: "#25D366", fontSize: "1.8rem" }} /><Typography sx={{ fontFamily: TAJAWAL, fontWeight: 700 }}>واتساب</Typography></Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}><PhoneIcon sx={{ color: LABEL_COLOR, fontSize: "1.8rem" }} /><Typography sx={{ fontFamily: TAJAWAL, fontWeight: 700 }}>جوال</Typography></Box>
            </Box>
            
            <Divider sx={{ my: 3, borderColor: "rgba(0,0,0,0.15)", borderBottomWidth: "2px" }} />
            
            {/* Chat Checkbox */}
            <FormControlLabel 
              sx={{ mb: 3 }} 
              control={<Checkbox checked={channels.chat} onChange={(e) => setChannels({ ...channels, chat: e.target.checked })} />} 
              label={<Typography sx={{ fontFamily: TAJAWAL, fontSize: '18px', fontWeight: 800, color: "#1e293b" }}> اترك اسمك وجوالك للتواصل معك لاحقًا </Typography>} 
            />
            
            {/* Name Input */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <Typography sx={{ minWidth: 120, fontFamily: TAJAWAL, fontWeight: 800, fontSize: '18px' }}> الاسم </Typography>
              <StyledTextField
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{
                    // 1. Background and Shape
                    "& .MuiInputBase-root": {
                      borderRadius: "8px",
                      backgroundColor: "#E2E8F0",
                    },
                    // 2. Fixed Black Border (Normal)
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#000000 !important",
                      borderWidth: "1px !important",
                    },
                    // 3. Keep Black on Hover
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#000000 !important",
                    },
                    // 4. Keep Black and 1px on Focus
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#000000 !important",
                      borderWidth: "1px !important",
                    },
                  }}
              />
            </Box>

            {/* Mobile Input */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography sx={{ minWidth: 120, fontFamily: TAJAWAL, fontWeight: 800, fontSize: '18px' }}> الجوال </Typography>
              <StyledTextField
                fullWidth
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                 sx={{
                    // 1. Background Color and Radius
                    "& .MuiInputBase-root": {
                      borderRadius: "8px",
                      backgroundColor: "#E2E8F0",
                    },
                    // 2. Fixed Black Border (Standard State)
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#000000 !important",
                      borderWidth: "1px !important",
                    },
                    // 3. Persistent Black Border on Hover
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#000000 !important",
                    },
                    // 4. Persistent Black Border on Focus (Active)
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#000000 !important",
                      borderWidth: "1px !important", 
                    },
                  }}
              />
            </Box>
          </Box>
        </Box>

          {/* Submit Button */}
      <Box sx={{ textAlign: "center", mt: 6, mb: 8, p: 2 }}>
      <SubmitButton 
        onClick={handleSubmit} 
        disabled={loading} 
        endIcon={loading ? <CircularProgress size={24} color="inherit" /> : <Send size={24} />}
        sx={{
          // 1. DIMENSIONS & TYPOGRAPHY
          px: 6,
          py: 2,
          fontSize: "1.4rem",
          fontWeight: 800,
          fontFamily: TAJAWAL,
          borderRadius: "16px",
          
          // 2. 3D COLORS (Matching your theme)
          background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)", 
          color: "#E2E8F0",
          border: "1px solid rgba(255, 255, 255, 0.1)",

          // 3. THE "POP" EFFECT (Shadows)
          boxShadow: `
            0px 10px 20px rgba(0, 0, 0, 0.3),
            0px 20px 40px rgba(0, 0, 0, 0.2)
          `,

          // 4. INTERACTIVE HOVER (The "Lift")
          transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          "&:hover": {
            transform: "translateY(-10px) scale(1.03)", // Lifts off the screen
            background: "linear-gradient(135deg, #00b3ff 0%, #1D4ED8 100%)", // Glows blue on hover
            boxShadow: "0px 30px 60px rgba(0, 179, 255, 0.35)", // Neon-colored shadow
          },

          // 5. CLICK EFFECT (The "Press")
          "&:active": {
            transform: "translateY(2px) scale(0.98)", // Presses into the screen
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
          },

          // 6. DISABLED STATE
          "&.Mui-disabled": {
            background: "#E2E8F0",
            color: "#94A3B8",
            boxShadow: "none"
          }
        }}
      >
        {loading ? `جاري الحفظ ${uploadProgress}%` : "ارسال الطلب وحفظ البيانات"}
      </SubmitButton>
    </Box>
        </GlassCard>
      </Container>
    </Box>
  );
};

export default Service02;