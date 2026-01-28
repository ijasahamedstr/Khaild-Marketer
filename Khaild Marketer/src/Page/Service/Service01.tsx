import React, { useState } from "react";
import axios from "axios";
import {
  Box, Container, Typography, MenuItem, TextField, Button, Divider,
  styled, CardMedia, CardContent, CircularProgress,
  IconButton, Checkbox, FormControlLabel,Stack
} from "@mui/material";

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MapPin, Bed, Bath, History, Phone, MessageSquare } from 'lucide-react';

/* ---------------- ICONS ---------------- */
import { Search, } from "lucide-react";
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import PublicIcon from '@mui/icons-material/Public';
import WcIcon from '@mui/icons-material/Wc';
import StraightenIcon from '@mui/icons-material/Straighten';
import HotelIcon from '@mui/icons-material/Hotel';
import BathtubIcon from '@mui/icons-material/Bathtub';
import EditNoteIcon from '@mui/icons-material/EditNote';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneIcon from "@mui/icons-material/Phone";
import {  Play 
} from 'lucide-react';

/* ---------------- CONSTANTS ---------------- */
const TAJAWAL = "'Tajawal', sans-serif";
const COLOR_PRIMARY_CYAN = "#06f9f3";
const COLOR_DEEP_BLUE = "#023B4E";
const LABEL_COLOR = "#023B4E";

const DROPDOWN_FIELDS = [
  {
    label: "نوع العقار",
    icon: <HomeWorkIcon fontSize="small" />,
    options: ["قصر", "فيلا", "تاون هاوس", "شقة", "ملحق", "مزرعة", "استراحة", "مستودع", "أرض"],
  },
];

const API_BASE_URL = import.meta.env.VITE_API_URL ;

/* ---------------- STYLED COMPONENTS ---------------- */
const GlassCard = styled(Box)(({  }) => ({
  position: "relative",
  background: "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(12px)",
  borderRadius: "30px",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
  overflow: "hidden",
  width: "100%",
  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  "&:hover": {
    transform: "translateY(-10px)",
    borderColor: COLOR_PRIMARY_CYAN,
    boxShadow: `0 30px 60px -12px rgba(6, 249, 243, 0.3)`,
  },
}));

const GlowWrapper = ({ children, sx, onClick }: any) => (
  <Box sx={{ position: "relative", borderRadius: 4, ...sx }} onClick={onClick}>
    <Box sx={{ position: "absolute", inset: "-2px", borderRadius: 4, background: "linear-gradient(135deg, #06f9f3, #00b3ff, #06f9f3)", filter: "blur(6px)", zIndex: 0 }} />
    <Box sx={{ position: "relative", zIndex: 1, p: { xs: 2, sm: 3 }, borderRadius: 4, border: "1px solid #CBD5E1", backgroundColor: "#E2E8F0" }}>
      {children}
    </Box>
  </Box>
);

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "16px",
    backgroundColor: "#fff",
    "& fieldset": { borderColor: "#E2E8F0" },
    "&:hover fieldset": { borderColor: COLOR_PRIMARY_CYAN },
  },
  "& .MuiInputBase-input": { fontFamily: TAJAWAL, fontWeight: 600 },
});

/* ---------------- MAIN COMPONENT ---------------- */
const Service01: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<"form" | "results">("form");
  const [dbResults, setDbResults] = useState<any[]>([]);

  // --- FORM STATES ---
  const [isChecked1, setIsChecked1] = useState(true); // جاهز
  const [isChecked2, setIsChecked2] = useState(false); // على الخارطة
  const [dropdownValues, setDropdownValues] = useState<{ [key: number]: string }>({});
  const [ownerName, setOwnerName] = useState("");
  const [nationality, setNationality] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [area, setArea] = useState("");
  const [rooms, setRooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [propertyAgeSelection, setPropertyAgeSelection] = useState("");
  const [customAgeInput, setCustomAgeInput] = useState("");
  const [notes, setNotes] = useState("");
  const [priceLimit, setPriceLimit] = useState("");
  const [isPaymentmethod, setisPaymentmethod] = useState("");
  const [channels, setChannels] = useState({ call: false, chat: false });
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");

  const handleDeveloperCheckbox = (index: number) => {
    if (index === 0) {
      setIsChecked1(true);
      setIsChecked2(false);
    } else {
      setIsChecked1(false);
      setIsChecked2(true);
    }
  };

  const handleAgeCheckboxChange = (val: string) => {
    setPropertyAgeSelection(val);
    if (val !== "custom") setCustomAgeInput("");
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const params = {
        propertyStatus: isChecked1 ? "جاهز" : "على الخارطة",
        propertyType: dropdownValues[0] || "",
        location,
        rooms,
        bathrooms,
        priceLimit,
        ownerName,
        nationality,
        gender,
        area,
        age: propertyAgeSelection === "custom" ? customAgeInput : propertyAgeSelection,
        paymentMethod: isPaymentmethod,
        contactName: name,
        contactMobile: mobile
      };

       const response = await axios.get(`${API_BASE_URL}/api/save-request-filter`, { params });

      if (response.data.success) {
        setDbResults(response.data.data);
        setView("results");
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (error) {
      console.error("Database Filter Error:", error);
      setDbResults([]);
      setView("results");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", background: `url('https://i.ibb.co/5hcb4GP2/texture-with-blue-paint-jpg.webp')`, backgroundSize: "cover", py: 8, direction: "rtl" }}>
      <Container maxWidth="lg">
        {view === "form" && (
          <Box sx={{ maxWidth: "900px", mx: "auto" }}>
            <Box sx={{ textAlign: "center", mb: 6 }}>
              <Typography variant="h2" sx={{ fontWeight: 900, color: COLOR_PRIMARY_CYAN, fontFamily: TAJAWAL, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, fontSize: { xs: '2rem', md: '3.5rem' } }}>
                ابحث عن عقارك <Search size={40} />
              </Typography>
            </Box>

            <GlassCard sx={{ p: { xs: 2, md: 4 } }}>
              {/* STATUS SELECTOR */}
              <Box sx={{ display: 'flex', gap: { xs: 1, sm: 2 }, mb: 4, flexDirection: 'row', flexWrap: 'nowrap', width: '100%' }}>
                <GlowWrapper sx={{ flex: 1, cursor: "pointer", minWidth: 0 }} onClick={() => handleDeveloperCheckbox(0)}>
                  <Box sx={{ textAlign: "center", display: 'flex', justifyContent: 'center' }}>
                    <FormControlLabel
                      sx={{ margin: 0, pointerEvents: "none", '& .MuiFormControlLabel-label': { width: '100%' } }}
                      control={<Checkbox checked={isChecked1} sx={{ p: { xs: 0.5, sm: 1 }, "& .MuiSvgIcon-root": { fontSize: { xs: 24, sm: 30, md: 35 } } }} />}
                      label={<Typography sx={{ fontFamily: TAJAWAL, fontSize: { xs: "0.9rem", sm: "1.2rem", md: "1.6rem" }, fontWeight: 800 }}>جاهز</Typography>}
                    />
                  </Box>
                </GlowWrapper>

                <GlowWrapper sx={{ flex: 1, cursor: "pointer", minWidth: 0 }} onClick={() => handleDeveloperCheckbox(1)}>
                  <Box sx={{ textAlign: "center", display: 'flex', justifyContent: 'center' }}>
                    <FormControlLabel
                      sx={{ margin: 0, pointerEvents: "none", '& .MuiFormControlLabel-label': { width: '100%' } }}
                      control={<Checkbox checked={isChecked2} sx={{ p: { xs: 0.5, sm: 1 }, "& .MuiSvgIcon-root": { fontSize: { xs: 24, sm: 30, md: 35 } } }} />}
                      label={<Typography sx={{ fontFamily: TAJAWAL, fontSize: { xs: "0.9rem", sm: "1.2rem", md: "1.6rem" }, fontWeight: 800 }}>على الخارطة</Typography>}
                    />
                  </Box>
                </GlowWrapper>
              </Box>

              {/* PROPERTY TYPE */}
              {DROPDOWN_FIELDS.map((field, i) => (
                <GlowWrapper key={i} sx={{ mb: 4 }}>
                  <Box sx={{ display: "flex", gap: 1.5, mb: 3, color: LABEL_COLOR, alignItems: "center" }}>
                    <Box sx={{ p: 1, borderRadius: "50%", backgroundColor: "rgba(2, 59, 78, 0.1)", display: "flex" }}>{field.icon}</Box>
                    <Typography sx={{ fontWeight: 800, fontSize: "1.8rem", fontFamily: TAJAWAL }}>{field.label}</Typography>
                  </Box>
                  <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }, gap: 2 }}>
                    {field.options.map((opt, idx) => (
                      <FormControlLabel
                        key={idx}
                        control={<Checkbox checked={dropdownValues[i] === opt} onChange={(e) => setDropdownValues({ ...dropdownValues, [i]: e.target.checked ? opt : "" })} />}
                        label={<Typography sx={{ fontFamily: TAJAWAL, fontSize: "1.3rem", fontWeight: 600 }}>{opt}</Typography>}
                      />
                    ))}
                  </Box>
                </GlowWrapper>
              ))}

              {/* PERSONAL DATA */}
              <Box sx={{ position: "relative", borderRadius: 4, mt: 5, mb: 5 }}>
                <Box sx={{ position: "absolute", inset: "-2px", borderRadius: 4, background: "linear-gradient(135deg, #06f9f3, #00b3ff, #06f9f3)", filter: "blur(6px)", zIndex: 0 }} />
                <Box sx={{ position: "relative", zIndex: 1, p: { xs: 2, sm: 3 }, borderRadius: 4, border: "1px solid #CBD5E1", backgroundColor: "#E2E8F0" }}>
                  <Box sx={{ display: "flex", gap: 1, mb: 3, color: LABEL_COLOR, alignItems: "center" }}>
                    <AccountBoxIcon sx={{ fontSize: "1.7rem" }} />
                    <Typography sx={{ fontWeight: 700, fontSize: "1.3rem", fontFamily: TAJAWAL }}>البيانات الشخصية</Typography>
                  </Box>
                  
                  {/* Buyer Name */}
                  <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: { xs: "flex-start", sm: "center" }, gap: { xs: 1, sm: 2 }, mb: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 165 }}>
                      <AssignmentIndIcon sx={{ color: LABEL_COLOR, fontSize: "1.2rem" }} />
                      <Typography sx={{ fontFamily: TAJAWAL, fontWeight: 600 }}>اسم المشتري أو الوكيل</Typography>
                    </Box>
                   <StyledTextField
                      size="small"
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      placeholder="أدخل الاسم هنا"
                      sx={{
                        // Responsive Width
                        width: { xs: "100%", sm: "50%", md: "40%" },

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

                        // Hover state
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

                  {/* Nationality */}
                  <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: { xs: "flex-start", sm: "center" }, gap: { xs: 1, sm: 2 }, mb: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 165 }}>
                      <PublicIcon sx={{ color: LABEL_COLOR, fontSize: "1.2rem" }} />
                      <Typography sx={{ fontFamily: TAJAWAL, fontWeight: 600 }}>جنسية المشتري</Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <FormControlLabel control={<Checkbox checked={nationality === "saudi"} onChange={() => setNationality("saudi")} />} label={<Typography sx={{ fontFamily: TAJAWAL, fontSize: "0.95rem" }}>سعودي</Typography>} />
                      <FormControlLabel control={<Checkbox checked={nationality === "non-saudi"} onChange={() => setNationality("non-saudi")} />} label={<Typography sx={{ fontFamily: TAJAWAL, fontSize: "0.95rem" }}>غير سعودي</Typography>} />
                    </Box>
                  </Box>

                  {/* Gender */}
                  <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: { xs: "flex-start", sm: "center" }, gap: { xs: 1, sm: 2 } }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 165 }}>
                      <WcIcon sx={{ color: LABEL_COLOR, fontSize: "1.2rem" }} />
                      <Typography sx={{ fontFamily: TAJAWAL, fontWeight: 600 }}>النوع</Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <FormControlLabel control={<Checkbox checked={gender === "male"} onChange={() => setGender("male")} />} label={<Typography sx={{ fontFamily: TAJAWAL, fontSize: "0.95rem" }}>ذكر</Typography>} />
                      <FormControlLabel control={<Checkbox checked={gender === "female"} onChange={() => setGender("female")} />} label={<Typography sx={{ fontFamily: TAJAWAL, fontSize: "0.95rem" }}>أنثى</Typography>} />
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* LOCATION */}
              <GlowWrapper sx={{ mb: 4 }}>
                <Box sx={{ display: "flex", gap: 1.5, mb: 1, color: LABEL_COLOR, alignItems: "center" }}>
                  <HomeWorkIcon />
                  <Typography sx={{ fontWeight: 800, fontSize: "1.5rem", fontFamily: TAJAWAL }}>الموقع</Typography>
                </Box>
                <Typography sx={{ fontSize: "1.1rem", mb: 3, color: "#475569", fontFamily: TAJAWAL, fontWeight: 700 }}>الرجاء كتابة موقع العقار المراد شرائه بالتفصيل</Typography>
                <StyledTextField
                  fullWidth
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="اكتب الموقع هنا..."
                  sx={{
                    mb: 2,
                    // Container background and shape
                    "& .MuiInputBase-root": {
                      borderRadius: "8px",
                      backgroundColor: "#E2E8F0", // Using the light grey from your first example
                    },
                    // Standard border state
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#000000 !important",
                      borderWidth: "1px !important",
                    },
                    // Hover state
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#000000 !important",
                    },
                    // Active/Focused state
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#000000 !important",
                      borderWidth: "1px !important",
                    },
                  }}
                />
              </GlowWrapper>

              {/* AREA & DETAILS */}
              <GlowWrapper sx={{ mb: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 150 }}>
                    <StraightenIcon sx={{ color: LABEL_COLOR, fontSize: "1.5rem" }} />
                    <Typography sx={{ fontFamily: TAJAWAL, fontWeight: 600 }}>المساحة <Box component="span" sx={{ fontSize: "0.9rem", fontWeight: 400 }}>(اختياري)</Box></Typography>
                  </Box>
                  <StyledTextField
                    size="small"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    sx={{
                      // Responsive width (100% on mobile, 40% on small screens+)
                      width: { xs: "100%", sm: "40%" },

                      // Background and border radius
                      "& .MuiInputBase-root": {
                        borderRadius: "8px",
                        backgroundColor: "#E2E8F0", 
                      },

                      // Default border: Black and 1px
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#000000 !important",
                        borderWidth: "1px !important",
                      },

                      // Hover state: Keeps border black
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#000000 !important",
                      },

                      // Focused state: Keeps border black and prevents it from getting thicker
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#000000 !important",
                        borderWidth: "1px !important",
                      },
                    }}
                  />
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 150 }}>
                    <HotelIcon sx={{ color: LABEL_COLOR, fontSize: "1.5rem" }} />
                    <Typography sx={{ fontFamily: TAJAWAL, fontWeight: 600 }}>عدد الغرف</Typography>
                  </Box>
                 <StyledTextField
                  size="small"
                  value={rooms}
                  onChange={(e) => setRooms(e.target.value)}
                  sx={{
                    // Responsive Width
                    width: { xs: "100%", sm: "40%" },

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
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 150 }}>
                    <BathtubIcon sx={{ color: LABEL_COLOR, fontSize: "1.5rem" }} />
                    <Typography sx={{ fontFamily: TAJAWAL, fontWeight: 600 }}>عدد دورات المياه</Typography>
                  </Box>
                  <StyledTextField
                  size="small"
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value)}
                  sx={{
                    // Responsive width
                    width: { xs: "100%", sm: "40%" },

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

                    // Hover state
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
                <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 3 }}>
                  <Typography sx={{ minWidth: 120, fontFamily: TAJAWAL, fontWeight: 600 }}>عمر العقار</Typography>
                  <FormControlLabel control={<Checkbox checked={propertyAgeSelection === "new"} onChange={() => handleAgeCheckboxChange("new")} />} label={<Typography sx={{ fontFamily: TAJAWAL }}>جديد</Typography>} />
                  <FormControlLabel control={<Checkbox checked={propertyAgeSelection === "custom"} onChange={() => handleAgeCheckboxChange("custom")} />} label={<Typography sx={{ fontFamily: TAJAWAL }}>أكثر من سنة</Typography>} />
                  <TextField
                    size="small"
                    placeholder="عدد السنوات"
                    value={customAgeInput}
                    onChange={(e) => {
                      setCustomAgeInput(e.target.value);
                      handleAgeCheckboxChange("custom");
                    }}
                    sx={{
                      // Specific width and background
                      width: 120,
                      "& .MuiInputBase-root": {
                        borderRadius: "8px",
                        backgroundColor: "#E2E8F0",
                      },

                      // 1. Standard border state
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#000000 !important",
                        borderWidth: "1px !important",
                      },

                      // 2. Hover state
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#000000 !important",
                      },

                      // 3. Focused state (locks it at 1px black)
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#000000 !important",
                        borderWidth: "1px !important",
                      },
                    }}
                  />
                </Box>
              </GlowWrapper>

              {/* ADDITIONAL NOTES */}
              <GlowWrapper sx={{ mb: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
                  <EditNoteIcon sx={{ color: LABEL_COLOR, fontSize: "2rem" }} />
                  <Typography sx={{ fontWeight: 800, fontSize: "1.8rem", color: LABEL_COLOR, fontFamily: TAJAWAL }}>تفاصيل إضافية</Typography>
                </Box>
                 <Typography sx={{ mt: 0.5, mb: 2, fontSize: "1.1rem", color: "#475569", fontFamily: TAJAWAL, fontWeight: 700 }}>اذكر أي ملاحظات أو متطلبات خاصة تساعدنا في خدمتك بشكل أفضل</Typography>
                <StyledTextField
                  multiline
                  minRows={4}
                  fullWidth
                  placeholder="اكتب ملاحظاتك هنا..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  sx={{
                    // 1. Container background and shape
                    "& .MuiInputBase-root": {
                      borderRadius: "8px",
                      backgroundColor: "#E2E8F0", // Using the light grey to match your first example
                      padding: "12px", // Added slight padding for multiline comfort
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

                    // 4. Focused state (stays 1px and black)
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#000000 !important",
                      borderWidth: "1px !important",
                    },
                  }}
                />
              </GlowWrapper>

              {/* BUDGET */}
              <GlowWrapper sx={{ mb: 4 }}>
                <Box sx={{ display: "flex", gap: 1.5, mb: 1, color: LABEL_COLOR, alignItems: "center" }}>
                  <AccountBalanceWalletIcon />
                  <Typography sx={{ fontWeight: 800, fontSize: "1.5rem", fontFamily: TAJAWAL }}>الميزانية</Typography>
                </Box>
                <Typography sx={{ fontSize: "1.1rem", mb: 3, color: "#475569", fontFamily: TAJAWAL, fontWeight: 700 }}>
                  الرجاء اختيار الميزانية المتاحة
                </Typography>
                <StyledTextField select fullWidth value={priceLimit} onChange={(e) => setPriceLimit(e.target.value)} sx={{
                  // 1. Container background and shape
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                    backgroundColor: "#E2E8F0",
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

                  // 4. Focused state (locks it at 1px black)
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#000000 !important",
                    borderWidth: "1px !important",
                  },

                  // Ensure the dropdown icon stays black
                  "& .MuiSelect-icon": {
                    color: "#000000",
                  },
                }}>
                   <MenuItem value="أقل من 500,000" sx={{ fontFamily: TAJAWAL, display: "flex", justifyContent: "flex-end", width: "100%" }}>
                <span style={{ marginRight: "1.5rem" }}>500,000</span>
                <span style={{ marginRight: "0.5rem" }}>أقل من</span>
              </MenuItem>

              {/* Option 2: 500,000 to 1,000,000 */}
              <MenuItem value="500,000 إلى 1,000,000" sx={{ fontFamily: TAJAWAL, display: "flex", justifyContent: "flex-end", width: "100%" }}>
                <span style={{ marginRight: "1.5rem" }}>1,000,000</span>
                <span style={{ marginRight: "2rem" }}>إلى</span>
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
                <span style={{ marginRight: "1.3rem" }}>فأكثر</span>
                <span style={{ marginRight: "1.5rem" }}>2,000,000</span>
                <span style={{ marginRight: "0.5rem" }}>من</span>
              </MenuItem>
                </StyledTextField>
              </GlowWrapper>

              {/* PAYMENT METHOD */}
              <GlowWrapper sx={{ mb: 4 }}>
                <Box sx={{ display: "flex", gap: 1, mb: 2, color: LABEL_COLOR }}><LocalOfferIcon /><Typography sx={{ fontWeight: 700, fontSize: { xs: "1.1rem", md: "1.3rem" }, fontFamily: TAJAWAL }}>طريقة الدفع</Typography></Box>
                <Box sx={{ display: "flex", gap: { xs: 4, sm: 8 }, mt: 4, mb: 2, justifyContent: "flex-start", px: 2 }}>
                  <Box onClick={() => setisPaymentmethod('yes')} sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                    <Checkbox checked={isPaymentmethod === "yes"} color="success" sx={{ transform: { xs: "scale(1.1)", md: "scale(1.4)" }, ml: 1 }} />
                    <Typography sx={{ fontFamily: TAJAWAL, fontWeight: 800, fontSize: { xs: "1.2rem", md: "1.6rem" }, color: isPaymentmethod === "yes" ? "#2e7d32" : "#64748B" }}>نقدا</Typography>
                  </Box>
                  <Box onClick={() => setisPaymentmethod('no')} sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                    <Checkbox checked={isPaymentmethod === "no"} color="success" sx={{ transform: { xs: "scale(1.1)", md: "scale(1.4)" }, ml: 1 }} />
                    <Typography sx={{ fontFamily: TAJAWAL, fontWeight: 800, fontSize: { xs: "1.2rem", md: "1.6rem" }, color: isPaymentmethod === "no" ? "#2e7d32" : "#64748B" }}>تمويل</Typography>
                  </Box>
                </Box>
              </GlowWrapper>

              {/* CONTACT CHANNELS */}
              <Box sx={{ mb: 4, position: "relative" }}>
                <Box sx={{ position: "absolute", inset: "-2px", borderRadius: "16px", background: "linear-gradient(135deg,#06f9f3,#00b3ff,#06f9f3)", filter: "blur(4px)", zIndex: 0 }} />
                <Box sx={{ position: "relative", zIndex: 10, p: 3, borderRadius: 3, border: "1px solid #E2E8F0", background: "#E2E8F0" }}>
                  <Typography sx={{ fontWeight: 800, fontSize: "1.3rem", mb: 0.5, color: LABEL_COLOR, fontFamily: TAJAWAL }}>قنوات التواصل</Typography>
                  <Typography sx={{ fontSize: "1rem", mb: 3, color: "#242629ff", fontFamily: TAJAWAL, fontWeight: 'bold' }}>وسائل التواصل المتعددة تتيح الرد السريع من الفريق المختص</Typography>
                  <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 1, mb: 2, width: "100%", flexWrap: "nowrap" }}>
                    <FormControlLabel sx={{ mr: 0, flexShrink: 0 }} control={<Checkbox size="small" checked={channels.call} onChange={(e) => setChannels({ ...channels, call: e.target.checked })} />} label={<Typography sx={{ fontFamily: TAJAWAL, fontSize: { xs: '12px', sm: '16px', md: '18px' }, whiteSpace: "nowrap" }}>الرجاء التواصل على الرقم</Typography>} />
                    <Box sx={{ display: "flex", justifyContent: "flex-end", minWidth: 0, flexShrink: 1 }}>
                      <Typography sx={{ fontFamily: "TAJAWAL", fontWeight: 800, fontSize: { xs: "11px", sm: "16px", md: "20px" }, color: "#1D4ED8", backgroundColor: "#F8FAFC", px: { xs: 1, md: 3 }, py: 0.5, borderRadius: "999px", boxShadow: "0 4px 12px rgba(37,99,235,0.25)", cursor: "pointer", whiteSpace: "nowrap" }}>📞 +966 50 985 5666</Typography>
                    </Box>
                  </Box>
                <Box sx={{ display: "flex", justifyContent: "flex-start", gap: 8, alignItems: "center", mb: 3, marginRight: '27px' }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}><WhatsAppIcon sx={{ color: "#25D366" }} /><Typography sx={{ fontFamily: TAJAWAL }}>واتساب</Typography></Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}><PhoneIcon /><Typography sx={{ fontFamily: TAJAWAL }}>جوال</Typography></Box>
                </Box>
                  <Divider sx={{ my: 3, borderColor: "#1f2937", borderBottomWidth: "2px" }} />
                  <FormControlLabel sx={{ mb: 3 }} control={<Checkbox checked={channels.chat} onChange={(e) => setChannels({ ...channels, chat: e.target.checked })} />} label={<Typography sx={{ fontFamily: TAJAWAL, fontSize: '18px', fontWeight: 'bold' }}> اترك اسمك وجوالك للتواصل معك لاحقًا </Typography>} />
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}><Typography sx={{ minWidth: 120, fontFamily: TAJAWAL, fontWeight: 600, fontSize: '18px' }}> الاسم </Typography><StyledTextField
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                  /></Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}><Typography sx={{ minWidth: 120, fontFamily: TAJAWAL, fontWeight: 600, fontSize: '18px' }}> الجوال </Typography><StyledTextField
                    fullWidth
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
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

                      // 4. Active/Focused state (remains 1px and black)
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#000000 !important",
                        borderWidth: "1px !important",
                      },
                    }}
                  /></Box>
                </Box>
              </Box>

              <Button fullWidth variant="contained" onClick={handleSearch} disabled={loading} sx={{ background: `linear-gradient(45deg, ${COLOR_DEEP_BLUE}, #086d8d)`, py: 2, borderRadius: "50px", fontSize: "1.4rem", fontWeight: 800, fontFamily: TAJAWAL }}>
                {loading ? <CircularProgress size={28} color="inherit" /> : "بحث الآن"}
              </Button>
            </GlassCard>
          </Box>
        )}

        {/* RESULTS VIEW */}


        {view === "results" && (
          <Box sx={{ fontFamily: "'Tajawal', sans-serif" }}>
            {/* Header Section */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }} 
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 8, mt: 4 }}>
                <IconButton 
                  onClick={() => setView("form")} 
                  sx={{ 
                    color: COLOR_PRIMARY_CYAN, 
                    bgcolor: "rgba(255,255,255,0.03)", 
                    backdropFilter: 'blur(12px)',
                    ml: 3,
                    p: 2,
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: `0 0 20px ${COLOR_PRIMARY_CYAN}15`,
                    '&:hover': { bgcolor: COLOR_PRIMARY_CYAN, color: '#000' }
                  }}
                >
                  <ArrowRight size={28} />
                </IconButton>
                <Box>
                  <Typography variant="h3" sx={{ color: "#fff", fontWeight: 900, fontFamily: "'Tajawal', sans-serif", lineHeight: 1 }}>
                    نتائج البحث
                  </Typography>
                  <Typography sx={{ color: COLOR_PRIMARY_CYAN, mt: 1, fontWeight: 600, opacity: 0.8, fontFamily: "'Tajawal', sans-serif" }}>
                      تم العثور على {dbResults.length} عقار مميز
                  </Typography>
                </Box>
              </Box>
            </motion.div>

            {/* Grid Container */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 5, justifyContent: 'center' }}>
              <AnimatePresence>
                {dbResults.length > 0 ? dbResults.map((prop: any, index: number) => {
                  
                  const firstFile = prop.files?.[0];
                  const isVideo: boolean = !!(firstFile?.mimeType?.includes('video') || /\.(mp4|webm|ogg)$/i.test(firstFile?.filePath));
                  const mediaUrl: string = firstFile ? `${API_BASE_URL}/${firstFile.filePath}` : "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800";

                  return (
                    <Box 
                      key={prop._id}
                      component={motion.div}
                      layout
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      sx={{ flex: { xs: '1 1 100%', sm: '0 1 48%', md: '0 1 31%' }, maxWidth: { md: '32%' } }}
                    >
                      <Box sx={{ 
                        borderRadius: '32px', 
                        overflow: 'hidden', 
                        height: '100%', 
                        display: 'flex', 
                        flexDirection: 'column',
                        bgcolor: 'rgba(15, 15, 15, 0.6)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        transition: 'all 0.4s ease',
                        position: 'relative',
                        '&:hover': {
                          transform: 'translateY(-12px)',
                          borderColor: `${COLOR_PRIMARY_CYAN}60`,
                          boxShadow: `0 30px 60px rgba(0,0,0,0.8), 0 0 30px ${COLOR_PRIMARY_CYAN}15`,
                          '& .card-media': { transform: 'scale(1.05)' },
                          '& .play-overlay': { opacity: 0, visibility: 'hidden', transform: 'translate(-50%, -50%) scale(0.5)' }
                        }
                      }}>
                        
                        {/* Media Section */}
                        <Box 
                          sx={{ position: 'relative', height: 260, overflow: 'hidden', bgcolor: '#000' }}
                          onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
                            if (isVideo) {
                              const video = e.currentTarget.querySelector('video') as HTMLVideoElement;
                              video?.play().catch(() => {});
                            }
                          }}
                          onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
                            if (isVideo) {
                              const video = e.currentTarget.querySelector('video') as HTMLVideoElement;
                              video?.pause();
                            }
                          }}
                        >
                          <CardMedia 
                            component={isVideo ? "video" : "img"} 
                            className="card-media"
                            src={mediaUrl}
                            // @ts-ignore
                            controls={isVideo}
                            // @ts-ignore
                            controlsList="nodownload nofullscreen"
                            disablePictureInPicture={isVideo}
                            muted={isVideo}
                            loop={isVideo}
                            playsInline={isVideo}
                            sx={{ 
                              height: '100%', 
                              width: '100%',
                              objectFit: 'cover', 
                              transition: 'transform 0.8s ease',
                              zIndex: 1
                            }}
                          />

                          {/* Play Button Overlay */}
                          {isVideo && (
                            <Box 
                              className="play-overlay"
                              sx={{ 
                                position: 'absolute', 
                                top: '50%', 
                                left: '50%', 
                                transform: 'translate(-50%, -50%)',
                                bgcolor: 'rgba(0,0,0,0.5)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '50%',
                                width: 70,
                                height: 70,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: `1px solid ${COLOR_PRIMARY_CYAN}`,
                                zIndex: 2,
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                pointerEvents: 'none'
                              }}
                            >
                              <Play size={32} fill={COLOR_PRIMARY_CYAN} color={COLOR_PRIMARY_CYAN} style={{ marginLeft: '4px' }} />
                            </Box>
                          )}
                          
                          {/* Visual Gradient Overlay */}
                          <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 40%, rgba(0,0,0,0.8) 100%)', pointerEvents: 'none', zIndex: 1 }} />
                          
                          {/* Status Badge */}
                          <Typography 
                            sx={{ 
                              position: 'absolute', top: 20, right: 20, 
                              bgcolor: COLOR_PRIMARY_CYAN, color: '#000', 
                              px: 2, py: 0.6, borderRadius: '12px', 
                              fontSize: '0.75rem', fontWeight: 900,
                              fontFamily: "'Tajawal', sans-serif",
                              zIndex: 3
                            }}
                          >
                            {prop.propertyStatus}
                          </Typography>

                          {/* Area Badge */}
                          <Stack direction="row" spacing={1} sx={{ position: 'absolute', bottom: isVideo ? 50 : 20, left: 20, zIndex: 3 }}>
                            {prop.area && (
                              <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '1.1rem', bgcolor: 'rgba(0,0,0,0.5)', px: 1.5, py: 0.5, borderRadius: '10px', backdropFilter: 'blur(4px)', fontFamily: "'Tajawal', sans-serif" }}>
                                {prop.area} م²
                              </Typography>
                            )}
                          </Stack>
                        </Box>
                        
                        {/* Content Section */}
                        <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                          <Typography variant="h5" sx={{ fontWeight: 900, color: '#fff', mb: 1, fontFamily: "'Tajawal', sans-serif" }}>
                            {prop.propertyType}
                          </Typography>
                          
                          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)', mb: 3, fontFamily: "'Tajawal', sans-serif" }}>
                            بواسطة: <span style={{ color: '#fff', fontWeight: 600 }}>{prop.developer || "مالك خاص"}</span>
                          </Typography>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: 'rgba(255,255,255,0.7)', mb: 4 }}>
                            <MapPin size={20} color={COLOR_PRIMARY_CYAN} /> 
                            <Typography fontSize="0.95rem" sx={{ fontFamily: "'Tajawal', sans-serif" }}>{prop.location}</Typography>
                          </Box>

                          {/* Modern Specs Grid */}
                          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, mb: 4 }}>
                            {[
                              { label: 'غرف', val: prop.rooms, icon: <Bed size={16} /> },
                              { label: 'حمام', val: prop.bathrooms, icon: <Bath size={16} /> },
                              { label: 'عمر', val: prop.propertyAge, icon: <History size={16} /> }
                            ].map((item, i) => item.val && (
                              <Box key={i} sx={{ bgcolor: 'rgba(255,255,255,0.03)', p: 1.5, borderRadius: '18px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <Box sx={{ color: COLOR_PRIMARY_CYAN, mb: 0.5, display: 'flex', justifyContent: 'center' }}>{item.icon}</Box>
                                <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '1rem', fontFamily: "'Tajawal', sans-serif" }}>{item.val}</Typography>
                                <Typography sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.65rem', fontWeight: 700, fontFamily: "'Tajawal', sans-serif" }}>{item.label}</Typography>
                              </Box>
                            ))}
                          </Box>

                          <Box sx={{ mt: 'auto' }}>
                            <Divider sx={{ mb: 3, borderColor: 'rgba(255,255,255,0.08)' }} />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                              <Box>
                                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', display: 'block', fontWeight: 700, fontFamily: "'Tajawal', sans-serif" }}>السعر النهائي</Typography>
                                <Typography sx={{ fontWeight: 900, fontSize: "1.8rem", color: '#fff', fontFamily: "'Tajawal', sans-serif", lineHeight: 1.1 }}>
                                  {prop.priceOffer || prop.priceLimit}
                                  <Box component="span" sx={{ fontSize: '0.85rem', mr: 1, color: COLOR_PRIMARY_CYAN }}>SAR</Box>
                                </Typography>
                              </Box>
                              
                              <Stack direction="row" spacing={1}>
                                {prop.contactChannels?.whatsapp && (
                                  <Box sx={{ p: 1, bgcolor: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', borderRadius: '10px' }}><MessageSquare size={20}/></Box>
                                )}
                                {prop.contactChannels?.call && (
                                  <Box sx={{ p: 1, bgcolor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', borderRadius: '10px' }}><Phone size={20}/></Box>
                                )}
                              </Stack>
                            </Box>

                            <Button 
                              fullWidth 
                              variant="contained" 
                              sx={{ 
                                py: 2, borderRadius: '16px', fontWeight: 800, fontSize: '1rem',
                                background: '#fff', color: '#000', fontFamily: "'Tajawal', sans-serif",
                                '&:hover': { background: COLOR_PRIMARY_CYAN, transform: 'scale(1.02)' }
                              }}
                            >
                              مشاهدة التفاصيل
                            </Button>
                          </Box>
                        </CardContent>
                      </Box>
                    </Box>
                  );
                }) : (
                  <Box sx={{ textAlign: 'center', py: 20, width: '100%' }}>
                    <Typography variant="h3" sx={{ color: 'rgba(255,255,255,0.1)', fontWeight: 900, fontFamily: "'Tajawal', sans-serif" }}>NO RESULTS</Typography>
                    <Typography variant="h5" color="white" sx={{ fontFamily: "'Tajawal', sans-serif", mt: 2 }}>لم يتم العثور على نتائج</Typography>
                  </Box>
                )}
              </AnimatePresence>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Service01;