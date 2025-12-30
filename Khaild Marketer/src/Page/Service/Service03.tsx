// src/Page/Service/Service03.tsx
import React, { useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Divider
} from "@mui/material";

/* ---------------- ICONS ---------------- */
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import StraightenIcon from "@mui/icons-material/Straighten";
import EditNoteIcon from "@mui/icons-material/EditNote";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneIcon from "@mui/icons-material/Phone";

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
const LABEL_COLOR = "#023B4E";

/* ---------------- DROPDOWN CONFIG ---------------- */
const DROPDOWN_FIELDS = [
  {
    label: "نوع العقار",
    icon: <HomeWorkIcon fontSize="small" />,
    options: ["قصر","فيلا","تاون هاوس","شقة","ملحق","مزرعة","استراحة","مستودع","أرض"],
  },
];

/* ---------------- COMPONENT ---------------- */
const Service03: React.FC<Props> = ({ onSubmit }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  /* ---------------- STATES ---------------- */
   const [dropdownValues, setDropdownValues] =
      React.useState<Record<number, string>>({});
  const [notes, setNotes] = React.useState("");
  const [search] = React.useState("");
  const [channels, setChannels] = React.useState({ chat: true, whatsapp: true, call: false });

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
      setDeveloper(""); // Clear developer when مستأجر is selected
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

  const handleSubmit = () => {
    if (!channels.call && !channels.whatsapp && !channels.chat) {
      alert("يرجى اختيار وسيلة للتواصل");
      return;
    }
    if (channels.chat && (!name || !mobile)) {
      alert("يرجى إدخال الاسم والجوال للتواصل عبر الدردشة");
      return;
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

    const phoneNumber = "966509855666";
    const message = buildWhatsAppMessage();
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");

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
    <Container maxWidth="md" sx={{ mt: { xs: 4, md: 8 }, mb: { xs: 6, md: 12 }, direction: "rtl", fontFamily: TAJAWAL }}>

      {/* TITLE */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography sx={{ fontWeight: 800, fontSize: { xs: "1.6rem", md: "2.4rem" }, color: LABEL_COLOR, fontFamily: TAJAWAL }}>
          إيجار العقار
        </Typography>
      </Box>

      {/* DEVELOPER CHECKBOXES */}
      <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
        <Box sx={{ flex: 1, p: 2, borderRadius: 3, border: "1px solid #ADADAD", textAlign: "center" }}>
          <FormControlLabel
            sx={{ width: '50%' }}
            control={<Checkbox checked={isChecked1} onChange={() => handleDeveloperCheckbox(0)} sx={{ '& .MuiSvgIcon-root': { fontSize: 40 } }} />}
            label={<Typography sx={{ fontFamily: TAJAWAL, fontSize: "1.5rem", fontWeight: 'bold' }}>مؤجر</Typography>}
          />
        </Box>
        <Box sx={{ flex: 1, p: 2, borderRadius: 3, border: "1px solid #ADADAD", textAlign: "center" }}>
          <FormControlLabel
            sx={{ width: '50%' }}
            control={<Checkbox checked={isChecked2} onChange={() => handleDeveloperCheckbox(1)} sx={{ '& .MuiSvgIcon-root': { fontSize: 40 } }} />}
            label={<Typography sx={{ fontFamily: TAJAWAL, fontSize: "1.5rem", fontWeight: 'bold' }}>مستأجر</Typography>}
          />
        </Box>
      </Box>

      {/* DROPDOWNS */}
       <Box sx={{ display: "grid", gap: 3 }}>
                {DROPDOWN_FIELDS.map((field, i) => (
                  <Box
                    key={i}
                    sx={{
                      p: 3, // slightly bigger padding
                      borderRadius: 3,
                      border: "1px solid #eef3f3",
                    }}
                  >
                    {/* Field Label */}
                    <Box sx={{ display: "flex", gap: 1, mb: 2, color: LABEL_COLOR, alignItems: 'center' }}>
                      {field.icon}
                      <Typography
                        sx={{
                          fontWeight: 800,
                          fontSize: { xs: "1.2rem", md: "1.6rem" }, // bigger font
                          fontFamily: TAJAWAL,
                        }}
                      >
                        {field.label}
                      </Typography>
                    </Box>
          
                    {/* Single-select Checkboxes */}
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: {
                          xs: "1fr",
                          sm: "repeat(2, 1fr)",
                          md: "repeat(3, 1fr)",
                        },
                        gap: 2, // more gap between checkboxes
                      }}
                    >
                      {field.options.map((opt, idx) => (
                        <FormControlLabel
                          key={idx}
                          control={
                            <Checkbox
                              checked={dropdownValues[i] === opt}
                              onChange={(e) =>
                                setDropdownValues({
                                  ...dropdownValues,
                                  [i]: e.target.checked ? opt : "",
                                })
                              }
                            />
                          }
                          label={
                            <Typography sx={{ fontFamily: TAJAWAL, fontSize: { xs: "1.6rem", md: "1.7rem" }, fontWeight: 600 }}>
                              {opt}
                            </Typography>
                          }
                        />
                      ))}
                    </Box>
                  </Box>
                ))}
              </Box>

      {/* LOCATION */}
      <Box sx={{ p: 2, borderRadius: 3, border: "1px solid #eef3f3", mt: 3 }}>
        <Box sx={{ display: "flex", gap: 1, mb: 1, color: LABEL_COLOR }}>
          <HomeWorkIcon />
          <Typography sx={{ fontWeight: 700, fontSize: { xs: "1rem", md: "1.3rem" }, fontFamily: TAJAWAL }}>الموقع</Typography>
        </Box>
        <TextField fullWidth placeholder="المنطقة الوسطى - الرياض - شمال الرياض" value={location} onChange={(e) => setLocation(e.target.value)} sx={{ "& .MuiInputBase-input": { fontSize: "1.8rem", WebkitTextFillColor: "black" } }} />
      </Box>

      {/* DEVELOPER - HIDE IF مستأجر */}
      {!isChecked2 && (
        <Box sx={{ p: 2, borderRadius: 3, border: "1px solid #eef3f3", mt: 3 }}>
          <Box sx={{ display: "flex", gap: 1, mb: 1, color: LABEL_COLOR }}>
            <LocationCityIcon />
            <Typography sx={{ fontWeight: 700, fontSize: { xs: "1rem", md: "1.3rem" }, fontFamily: TAJAWAL }}>اسم المطور العقاري</Typography>
          </Box>
          <TextField fullWidth placeholder="اسم المطور العقاري" value={developer} onChange={(e) => setDeveloper(e.target.value)} 	   sx={{
              "& .MuiInputBase-input": {
                fontSize: "1.8rem",
                color: "black",
                WebkitTextFillColor: "black",
              },
              "& .MuiInputBase-input::placeholder": {
                fontSize: "1.8rem",
                opacity: 0.7,
              },
            }}
 />
        </Box>
      )}

      
      {/* AREA - HIDDEN IF مستأجر (isChecked2) */}
      {!isChecked2 && dropdownValues[0] !== "شقة" && (
        <Box sx={{ p: 2, borderRadius: 3, border: "1px solid #eef3f3", mt: 3 }}>
          <Box sx={{ display: "flex", gap: 1, mb: 1, color: LABEL_COLOR }}>
            <StraightenIcon />
            <Typography>المساحة</Typography>
          </Box>
          <TextField
            fullWidth
            placeholder="المساحة"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            sx={{
              "& .MuiInputBase-input": {
                fontSize: "1.8rem",
                color: "black",
                WebkitTextFillColor: "black",
              },
              "& .MuiInputBase-input::placeholder": {
                fontSize: "1.8rem",
                opacity: 0.7,
              },
            }}
          />
        </Box>
      )}


      {/* PRICE */}
      <Box sx={{ p: 2, borderRadius: 3, border: "1px solid #eef3f3", mt: 3 }}>
      <Box sx={{ display: "flex", gap: 1, mb: 2, color: LABEL_COLOR }}>
        <AccountBalanceWalletIcon />
        <Typography sx={{ fontWeight: 700, fontSize: { xs: "1rem", md: "1.3rem" }, fontFamily: TAJAWAL }}>
          {isChecked2 ? "سعر الإيجار" : "سعر البيع"}
        </Typography>
      </Box>


        {isChecked2 ? (
          
          <Typography sx={{ fontFamily: TAJAWAL, fontSize: "1.2rem", color: "#555" }}>
               <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1.5 }}>
              <Typography sx={{ minWidth: 120, fontFamily: TAJAWAL,fontSize: { xs: "1.5rem", md: "1.8rem" } }}>من</Typography>
              <TextField size="small" value={priceLimit} onChange={(e) => setPriceLimit(e.target.value)} type="text" sx={{
              "& .MuiInputBase-input": {
                fontSize: "1.8rem",
                color: "black",
                WebkitTextFillColor: "black",
                width: 220
              },
              "& .MuiInputBase-input::placeholder": {
                fontSize: "1.8rem",
                opacity: 0.7,
              },
            }} />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography sx={{ minWidth: 120, fontFamily: TAJAWAL, fontSize: { xs: "1.5rem", md: "1.8rem" } }}>إلى</Typography>
              <TextField size="small" value={priceOffer} onChange={(e) => setPriceOffer(e.target.value)} type="text" sx={{
              "& .MuiInputBase-input": {
                fontSize: "1.8rem",
                color: "black",
                WebkitTextFillColor: "black",
                width: 220
              },
              "& .MuiInputBase-input::placeholder": {
                fontSize: "1.8rem",
                opacity: 0.7,
              },
            }}
/>
            </Box>
          </Typography>
        ) : (
          <>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1.5 }}>
              <Checkbox checked={checkboxValues[0]} onChange={(e) => handleCheckboxChange(0, e.target.checked)} />
              <Typography sx={{ minWidth: 120, fontFamily: TAJAWAL, fontSize: { xs: "1.5rem", md: "1.8rem" } }}>حد</Typography>
              <TextField size="small" value={priceLimit} onChange={(e) => setPriceLimit(e.target.value)}  type="text" sx={{
              "& .MuiInputBase-input": {
                fontSize: "1.8rem",
                color: "black",
                WebkitTextFillColor: "black",
                width: 220
              },
              "& .MuiInputBase-input::placeholder": {
                fontSize: "1.8rem",
                opacity: 0.7,
              },
            }} />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Checkbox checked={checkboxValues[1]} onChange={(e) => handleCheckboxChange(1, e.target.checked)} />
              <Typography sx={{ minWidth: 120, fontFamily: TAJAWAL, fontSize: { xs: "1.5rem", md: "1.8rem" } }}>على السوم</Typography>
              <TextField size="small" value={priceOffer} onChange={(e) => setPriceOffer(e.target.value)}  type="text" sx={{
              "& .MuiInputBase-input": {
                fontSize: "1.8rem",
                color: "black",
                WebkitTextFillColor: "black",
                width: 220
              },
              "& .MuiInputBase-input::placeholder": {
                fontSize: "1.8rem",
                opacity: 0.7,
              },
            }} />
            </Box>
          </>
        )}
      </Box>

      {/* NOTES */}
      <Box sx={{ mt: 5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <EditNoteIcon sx={{ color: LABEL_COLOR }} />
          <Typography sx={{ fontWeight: 800, fontSize: { xs: "1.2rem", md: "1.6rem" }, color: LABEL_COLOR, fontFamily: TAJAWAL }}>تفاصيل إضافية</Typography>
        </Box>
        <Typography sx={{ mt: 0.5, mb: 1.5, fontSize: "0.95rem", color: "#222324ff", fontFamily: TAJAWAL ,fontWeight:'bold'}}>اذكر أي ملاحظات أو متطلبات خاصة تساعدنا في خدمتك بشكل أفضل</Typography>
        <TextField multiline minRows={4} fullWidth placeholder="اكتب ملاحظاتك هنا..." value={notes} onChange={(e) => setNotes(e.target.value)} 	   sx={{
              "& .MuiInputBase-input": {
                fontSize: "1.8rem",
                color: "black",
                WebkitTextFillColor: "black",
                "& .MuiInputBase-input": { fontFamily: TAJAWAL }
              },
              "& .MuiInputBase-input::placeholder": {
                fontSize: "1.8rem",
                opacity: 0.7,
                "& .MuiInputBase-input": { fontFamily: TAJAWAL }
              },
            }}
 />
      </Box>

      {/* CONTACT CHANNELS */}
      <Box sx={{ mt: 6, p: 3, borderRadius: 3, border: "1px solid #eef3f3", backgroundColor: "#fafafa" }}>
        <Typography sx={{ fontWeight: 800, fontSize: "1.3rem", mb: 0.5, color: LABEL_COLOR, fontFamily: TAJAWAL }}>قنوات التواصل</Typography>
        <Typography sx={{ fontSize: "1rem", mb: 3, color: "#242629ff", fontFamily: TAJAWAL,fontWeight:'bold' }}>وسائل التواصل المتعددة تتيح الرد السريع من الفريق المختص</Typography>

        {/* CALL */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <FormControlLabel
            control={<Checkbox checked={channels.call} onChange={(e) => setChannels({ ...channels, call: e.target.checked })} />}
            label={<Typography sx={{ fontFamily: TAJAWAL, fontSize: '18px' }}> الرجاء التواصل على الرقم </Typography>}
          />
          <Box sx={{ flexGrow: 1, textAlign: "center", marginLeft: "150px" }}>
            <Typography sx={{ fontFamily: TAJAWAL, fontWeight: 800, fontSize: "20px", direction: "ltr", color: "#1D4ED8", backgroundColor: "#F8FAFC", px: 3, py: 1, borderRadius: "999px", display: "inline-block", boxShadow: "0 6px 20px rgba(37,99,235,0.35)", letterSpacing: "0.5px" }}>📞 +966 00 000 0000</Typography>
          </Box>
        </Box>

        {/* WhatsApp & Mobile */}
        <Box sx={{ display: "flex", justifyContent: "flex-start", gap: 8, alignItems: "center", mb: 3, marginRight: '27px' }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <WhatsAppIcon sx={{ color: "#25D366" }} />
            <Typography sx={{ fontFamily: TAJAWAL }}>واتساب</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <PhoneIcon />
            <Typography sx={{ fontFamily: TAJAWAL }}>جوال</Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3, borderColor: "#1f2937", borderBottomWidth: "2px" }} />

        {/* CHAT */}
        <FormControlLabel sx={{ mb: 3 }} control={<Checkbox checked={channels.chat} onChange={(e) => setChannels({ ...channels, chat: e.target.checked })} />} label={<Typography sx={{ fontFamily: TAJAWAL, fontSize: '18px',fontWeight:'bold' }}> اترك اسمك وجوالك للتواصل معك لاحقًا </Typography>} />

        {/* NAME */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <Typography sx={{ minWidth: 120, fontFamily: TAJAWAL }}>الاسم</Typography>
          <TextField fullWidth placeholder="أدخل اسمك" value={name} onChange={(e) => setName(e.target.value)} 	   sx={{
              "& .MuiInputBase-input": {
                fontSize: "1.8rem",
                color: "black",
                WebkitTextFillColor: "black",
              },
              "& .MuiInputBase-input::placeholder": {
                fontSize: "1.8rem",
                opacity: 0.7,
              },
            }}/>
        </Box>

        {/* MOBILE */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography sx={{ minWidth: 120, fontFamily: TAJAWAL }}>الجوال</Typography>
          <TextField fullWidth placeholder="أدخل رقم الجوال" value={mobile} onChange={(e) => setMobile(e.target.value)} 	   sx={{
              "& .MuiInputBase-input": {
                fontSize: "1.8rem",
                color: "black",
                WebkitTextFillColor: "black",
              },
              "& .MuiInputBase-input::placeholder": {
                fontSize: "1.8rem",
                opacity: 0.7,
              },
            }}/>
        </Box>
      </Box>

      {/* SUBMIT BUTTON */}
      <Box sx={{ mt: 6, textAlign: "center" }}>
        <Button variant="contained" color="primary" size="large" sx={{ fontFamily: TAJAWAL, fontWeight: 700, px: 8, py: 1.5, fontSize: "1.3rem" }} onClick={handleSubmit}>
          إرسال الطلب
        </Button>
      </Box>

    </Container>
  );
};

export default Service03;
