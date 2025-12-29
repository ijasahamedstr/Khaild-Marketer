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
  }) => void;
};

/* ---------------- CONSTANTS ---------------- */

const TAJAWAL = "'Tajawal', sans-serif";
const GRADIENT = "linear-gradient(135deg, #023B4E 0%, #06f9f3 100%)";
const LABEL_COLOR = "#023B4E";

/* ---------------- DROPDOWN CONFIG ---------------- */

const DROPDOWN_FIELDS = [
  {
    label: "نوع العقار",
    icon: <HomeWorkIcon fontSize="small" />,
    options: ["قصر", "فيلا", "تاون هاوس", "شقة", "مستودعات", "أرض","ملحق","مزرعة","استراحة"],
  },
];

/* ---------------- COMPONENT ---------------- */

const Service02: React.FC<Props> = ({ onSubmit }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const [dropdownValues, setDropdownValues] =
    React.useState<Record<number, string[]>>({});
  const [notes, setNotes] = React.useState("");
  const [search] = React.useState("");

  const [channels, setChannels] = React.useState({
    chat: true,
    whatsapp: true,
    call: false,
  });

  // States for inputs
  const [name, setName] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [developer, setDeveloper] = React.useState("");
  const [area, setArea] = React.useState("");
  const [priceLimit, setPriceLimit] = React.useState("");
  const [priceOffer, setPriceOffer] = React.useState("");

  const [checkboxValues, setCheckboxValues] = React.useState<boolean[]>([
    false,
    false,
  ]);

  const handleCheckboxChange = (index: number, value: boolean) => {
    const updated = [...checkboxValues];
    updated[index] = value;
    setCheckboxValues(updated);
  };

  const buildWhatsAppMessage = () => {
    return `
🛒 *طلب بيع عقار جديد*

🏠 *نوع العقار:* ${dropdownValues[0]?.join(", ") || "غير محدد"}
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
        dropdowns: DROPDOWN_FIELDS.map((_, i) => dropdownValues[i]?.join(",") || ""),
        notes,
        search,
        channels,
      });
    }
    const phoneNumber = "966509855666"; // Replace with your WhatsApp number
    const message = buildWhatsAppMessage();
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappURL, "_blank");

    // ---------------- RESET ALL FIELDS ----------------
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
    <Container
      maxWidth="md"
      sx={{
        mt: { xs: 4, md: 8 },
        mb: { xs: 6, md: 12 },
        direction: "rtl",
        fontFamily: TAJAWAL,
      }}
    >
      {/* ---------------- TITLE ---------------- */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: { xs: "1.6rem", md: "2.4rem" },
            color: LABEL_COLOR,
            fontFamily: TAJAWAL,
          }}
        >
          بيع العقار
        </Typography>
      </Box>

      {/* ---------------- DROPDOWNS ---------------- */}
      <Box sx={{ display: "grid", gap: 3 }}>
        {DROPDOWN_FIELDS.map((field, i) => (
          <Box
            key={i}
            sx={{
              p: 2,
              borderRadius: 3,
              border: "1px solid #eef3f3",
            }}
          >
            {/* Label + Icon */}
            <Box sx={{ display: "flex", gap: 1, mb: 2, color: LABEL_COLOR }}>
              {field.icon}
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "1rem", md: "1.3rem" },
                  fontFamily: TAJAWAL,
                }}
              >
                {field.label}
              </Typography>
            </Box>

            {/* Checkboxes Grid */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 1,
              }}
            >
              {field.options.map((opt, idx) => (
                <FormControlLabel
                  key={idx}
                  control={
                    <Checkbox
                      checked={dropdownValues[i]?.includes(opt) || false}
                      onChange={(e) => {
                        const prev = dropdownValues[i] || [];
                        const newValues = [...prev];
                        if (e.target.checked) {
                          newValues.push(opt);
                        } else {
                          const index = newValues.indexOf(opt);
                          if (index > -1) newValues.splice(index, 1);
                        }
                        setDropdownValues({ ...dropdownValues, [i]: newValues });
                      }}
                    />
                  }
                  label={opt}
                  sx={{
                    fontFamily: TAJAWAL,
                    "& .MuiTypography-root": {
                      fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" },
                      fontFamily: TAJAWAL,
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
        ))}
      </Box>

      {/* ---------------- OTHER INPUTS ---------------- */}
      <Box sx={{ display: "grid", gap: 3, mt: 3 }}>
        {/* Location */}
        <Box sx={{ p: 2, borderRadius: 3, border: "1px solid #eef3f3" }}>
          <Box sx={{ display: "flex", gap: 1, mb: 1, color: LABEL_COLOR }}>
            <HomeWorkIcon />
            <Typography sx={{ fontWeight: 700, fontSize: { xs: "1rem", md: "1.3rem" }, fontFamily: TAJAWAL }}>
              الموقع
            </Typography>
          </Box>
          <TextField
            fullWidth
            placeholder=" المنطقة الوسطى - الرياض  - شمال الرياض "
            value={location}
            onChange={(e) => setLocation(e.target.value)}
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

        {/* Developer */}
        <Box sx={{ p: 2, borderRadius: 3, border: "1px solid #eef3f3" }}>
          <Box sx={{ display: "flex", gap: 1, mb: 1, color: LABEL_COLOR }}>
            <LocationCityIcon />
            <Typography sx={{ fontWeight: 700, fontSize: { xs: "1rem", md: "1.3rem" }, fontFamily: TAJAWAL }}>
              اسم المطور العقاري 
            </Typography>
          </Box>
          <TextField
            fullWidth
            placeholder="اسم المطور العقاري"
            value={developer}
            onChange={(e) => setDeveloper(e.target.value)}
          />
        </Box>

        {/* Area */}
        <Box sx={{ p: 2, borderRadius: 3, border: "1px solid #eef3f3" }}>
          <Box sx={{ display: "flex", gap: 1, mb: 1, color: LABEL_COLOR }}>
            <StraightenIcon />
            <Typography sx={{ fontWeight: 700, fontSize: { xs: "1rem", md: "1.3rem" }, fontFamily: TAJAWAL }}>
              المساحة
            </Typography>
          </Box>
          <TextField
            fullWidth
            placeholder="المساحة"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />
        </Box>

        {/* Budget */}
        <Box sx={{ p: 2, borderRadius: 3, border: "1px solid #eef3f3" }}>
          <Box sx={{ display: "flex", gap: 1, mb: 2, color: LABEL_COLOR }}>
            <AccountBalanceWalletIcon />
            <Typography sx={{ fontWeight: 700, fontSize: { xs: "1rem", md: "1.3rem" }, fontFamily: TAJAWAL }}>
              سعر البيع
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1.5 }}>
            <Checkbox checked={checkboxValues[0]} onChange={(e)=>handleCheckboxChange(0, e.target.checked)} />
            <Typography sx={{ minWidth: 120, fontFamily: TAJAWAL }}>حد</Typography>
            <TextField size="small"  value={priceLimit} onChange={(e)=>setPriceLimit(e.target.value)} sx={{width:{xs:120, sm:160, md:220}}} type="text"/>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Checkbox checked={checkboxValues[1]} onChange={(e)=>handleCheckboxChange(1, e.target.checked)} />
            <Typography sx={{ minWidth: 120, fontFamily: TAJAWAL }}>على السوم</Typography>
            <TextField size="small"  value={priceOffer} onChange={(e)=>setPriceOffer(e.target.value)} sx={{width:{xs:120, sm:160, md:220}}} type="text"/>
          </Box>
        </Box>
      </Box>

      {/* ---------------- TEXT AREA ---------------- */}
      <Box sx={{ mt: 5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <EditNoteIcon sx={{ color: LABEL_COLOR }} />
          <Typography sx={{ fontWeight: 800, fontSize: { xs: "1.2rem", md: "1.6rem" }, color: LABEL_COLOR, fontFamily: TAJAWAL }}>تفاصيل إضافية</Typography>
        </Box>
        <Typography sx={{ mt: 0.5, mb: 1.5, fontSize: "0.95rem", color: "#222324ff", fontFamily: TAJAWAL }}>
          اذكر أي ملاحظات أو متطلبات خاصة تساعدنا في خدمتك بشكل أفضل
        </Typography>
        <TextField multiline minRows={4} fullWidth placeholder="اكتب ملاحظاتك هنا..." value={notes} onChange={(e)=>setNotes(e.target.value)} sx={{"& .MuiInputBase-input":{fontFamily: TAJAWAL}}}/>
      </Box>

      {/* ---------------- CONTACT CHANNELS ---------------- */}
      <Box sx={{ mt: 6, p: 3, borderRadius: 3, border: "1px solid #eef3f3", backgroundColor: "#fafafa" }}>
        <Typography sx={{ fontWeight: 800, fontSize: "1.3rem", mb: 0.5, color: LABEL_COLOR, fontFamily: TAJAWAL }}>
          قنوات التواصل
        </Typography>
        <Typography sx={{ fontSize: "1rem", mb: 3, color: "#242629ff", fontFamily: TAJAWAL }}>
          وسائل التواصل المتعددة تتيح الرد السريع من الفريق المختص
        </Typography>

        {/* Call */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <FormControlLabel
            control={
              <Checkbox checked={channels.call} onChange={(e)=>setChannels({...channels, call:e.target.checked})} />
            }
            label={<Typography sx={{ fontFamily: TAJAWAL ,fontSize:'18px'}}> الرجاء التواصل على الرقم </Typography>}
          />
          <Box sx={{ flexGrow: 1, textAlign: "center", marginLeft: "150px" }}>
            <Typography
              sx={{
                fontFamily: TAJAWAL,
                fontWeight: 800,
                fontSize: "20px",
                direction: "ltr",
                color: "#1D4ED8", // Blue text color
                backgroundColor: "#F8FAFC", // Light gray background
                px: 3,
                py: 1,
                borderRadius: "999px",
                display: "inline-block",
                boxShadow: "0 6px 20px rgba(37,99,235,0.35)",
                letterSpacing: "0.5px",
              }}
            >
              📞 +966 00 000 0000
            </Typography>
          </Box>
        </Box>

        {/* WhatsApp & Mobile */}
        <Box sx={{ display:"flex", justifyContent:"flex-start", gap:8, alignItems:"center", mb:3, marginRight:'27px'}}>
          <Box sx={{ display:"flex", alignItems:"center", gap:1 }}>
            <WhatsAppIcon sx={{ color:"#25D366" }}/>
            <Typography sx={{ fontFamily: TAJAWAL }}>واتساب</Typography>
          </Box>
          <Box sx={{ display:"flex", alignItems:"center", gap:1 }}>
            <PhoneIcon/>
            <Typography sx={{ fontFamily: TAJAWAL }}>جوال</Typography>
          </Box>
        </Box>

        <Divider sx={{ my:3, borderColor:"#1f2937", borderBottomWidth:"2px"}}/>

        {/* Chat checkbox */}
        <FormControlLabel sx={{ mb:3 }} control={<Checkbox checked={channels.chat} onChange={(e)=>setChannels({...channels, chat:e.target.checked})}/>} label={<Typography sx={{ fontFamily:TAJAWAL,fontSize:'18px'}}> اترك اسمك وجوالك للتواصل معك لاحقًا </Typography>}/>

        {/* Name */}
        <Box sx={{ display:"flex", alignItems:"center", gap:2, mb:2 }}>
          <Typography sx={{ minWidth:120, fontFamily:TAJAWAL, fontWeight:600, fontSize:'18px'}}> الاسم </Typography>
          <TextField placeholder="أدخل الاسم" value={name} onChange={(e)=>setName(e.target.value)} sx={{ width:{ xs:"100%", sm:"60%", md:"50%"}}}/>
        </Box>

        {/* Mobile */}
        <Box sx={{ display:"flex", alignItems:"center", gap:2 }}>
          <Typography sx={{ minWidth:120, fontFamily:TAJAWAL, fontWeight:600, fontSize:'18px'}}> الجوال </Typography>
          <TextField placeholder="أدخل رقم الاتصال" value={mobile} onChange={(e)=>setMobile(e.target.value)} sx={{ width:{ xs:"100%", sm:"60%", md:"50%"}}}/>
        </Box>
      </Box>

      {/* ---------------- SUBMIT ---------------- */}
      <Box sx={{ mt: 5, textAlign: "center" }}>
        <Button variant="contained" onClick={handleSubmit} sx={{px:5, py:1.4, fontSize:"18px", fontWeight:800, background:GRADIENT, fontFamily:TAJAWAL}}>
          ارسال الطلب
        </Button>
      </Box>
    </Container>
  );
};

export default Service02;
