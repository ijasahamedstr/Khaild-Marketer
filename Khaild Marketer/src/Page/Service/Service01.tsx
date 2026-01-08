// src/Page/Service/Service01.tsx
import React, { useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  MenuItem,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Divider
} from "@mui/material";

/* ---------------- ICONS ---------------- */
import HomeWorkIcon from "@mui/icons-material/HomeWork";
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
const GRADIENT = "linear-gradient(135deg, #023B4E 0%, #06f9f3 100%)";
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
const Service01: React.FC<Props> = ({ onSubmit }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  /* ---------------- STATES ---------------- */
  const [dropdownValues, setDropdownValues] =
     React.useState<Record<number, string>>({});
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
      setDeveloper(""); // Clear developer when مستأجر is selected
    }
  };


  /* ---------------- HANDLERS ---------------- */

   const propertyStatus = isChecked1
  ? "جاهز"
  : isChecked2
  ? "على الخارطة"
  : "غير محدد";

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

    const phoneNumber = "966509855666"; // Replace with your WhatsApp number
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
            width: "100%",
            minHeight: "100vh",
            backgroundImage: "url('https://i.ibb.co/F4rBMk3h/55-2-1.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            position: "relative",
    
            // 🔥 زيادة المسافة أعلى وأسفل
            py: { xs: 8, sm: 12, md: 3 }, // padding top & bottom
          }}
        >
          <Container
            maxWidth="md"
            sx={{ mt: { xs: 4, md: 8 }, mb: { xs: 6, md: 12 }, direction: "rtl", fontFamily: TAJAWAL }}
          >
      {/* ---------------- TITLE ---------------- */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography
          sx={{ fontWeight: 800, fontSize: { xs: "1.6rem", md: "2.4rem" }, color: LABEL_COLOR, fontFamily: TAJAWAL }}
        >
          شراء العقار
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
        
        {/* ==================== ITEM 1: JAHIZ (READY) ==================== */}
        <Box sx={{ flex: 1, position: "relative" }}>
          {/* --- GLOW EFFECT --- */}
          <Box
            sx={{
              position: "absolute",
              inset: "-2px", // Tight small border effect
              borderRadius: "16px", // Matches content radius
              background: "linear-gradient(135deg,#06f9f3,#00b3ff,#06f9f3)",
              filter: "blur(4px)", // Sharp small blur
              zIndex: 0,
            }}
          />

          {/* --- CONTENT CARD --- */}
          <Box
            sx={{
              position: "relative",
              zIndex: 10,
              p: 2,
              borderRadius: 3,
              border: "1px solid #E2E8F0",
              background: "#E2E8F0",
              textAlign: "center",
              height: "100%", // Ensures full height
              display: "flex", // Helps center the content
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FormControlLabel
              sx={{ width: "50%", margin: 0, justifyContent: "center" }}
              control={
                <Checkbox
                  checked={isChecked1}
                  onChange={() => handleDeveloperCheckbox(0)}
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 40 } }}
                />
              }
              label={
                <Typography sx={{ fontFamily: TAJAWAL, fontSize: "1.5rem", fontWeight: "bold" }}>
                  جاهز
                </Typography>
              }
            />
          </Box>
        </Box>

        {/* ==================== ITEM 2: ON MAP ==================== */}
        <Box sx={{ flex: 1, position: "relative" }}>
          {/* --- GLOW EFFECT --- */}
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

          {/* --- CONTENT CARD --- */}
          <Box
            sx={{
              position: "relative",
              zIndex: 10,
              p: 2,
              borderRadius: 3,
              border: "1px solid #E2E8F0",
              background: "#E2E8F0",
              textAlign: "center",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FormControlLabel
              sx={{ width: "50%", margin: 0, justifyContent: "center" }}
              control={
                <Checkbox
                  checked={isChecked2}
                  onChange={() => handleDeveloperCheckbox(1)}
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 40 } }}
                />
              }
              label={
                <Typography sx={{ fontFamily: TAJAWAL, fontSize: "1.5rem", fontWeight: "bold" }}>
                  على الخارطة
                </Typography>
              }
            />
          </Box>
        </Box>

      </Box>

      {/* ---------------- DROPDOWNS ---------------- */}
      <Box sx={{ display: "grid", gap: 3 }}>
        {DROPDOWN_FIELDS.map((field, i) => (
          // Wrapper Box for positioning
          <Box key={i} sx={{ position: "relative" }}>
            
            {/* --- GLOW EFFECT --- */}
            <Box
              sx={{
                position: "absolute",
                inset: "-2px", // Tight small border effect
                borderRadius: "16px", // Matches the card radius
                background: "linear-gradient(135deg,#06f9f3,#00b3ff,#06f9f3)",
                filter: "blur(4px)", // Sharp small blur
                zIndex: 0,
              }}
            />

            {/* --- CONTENT CARD --- */}
            <Box
              sx={{
                position: "relative",
                zIndex: 10, // Sits on top of glow
                p: 3, // slightly bigger padding
                borderRadius: 3,
                border: "1px solid #E2E8F0",
                background: "#E2E8F0",
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
                      <Typography sx={{ fontFamily: TAJAWAL, fontSize: { xs: "1.6rem", md: "1.7rem" }, fontWeight: 500 }}>
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

      {/* ---------------- LOCATION & AREA ---------------- */}
      <Box sx={{ display: "grid", gap: 3, mt: 3 }}>
        
        {/* ==================== 1. LOCATION ==================== */}
        <Box sx={{ position: "relative" }}>
          {/* --- GLOW EFFECT --- */}
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

          {/* --- CONTENT CARD --- */}
          <Box
            sx={{
              position: "relative",
              zIndex: 10,
              p: 2,
              borderRadius: 3,
              border: "1px solid #E2E8F0",
              background: "#E2E8F0",
            }}
          >
            <Box sx={{ display: "flex", gap: 1, mb: 1, color: LABEL_COLOR }}>
              <HomeWorkIcon />
              <Typography sx={{ fontWeight: 700, fontSize: { xs: "1rem", md: "1.3rem" }, fontFamily: TAJAWAL }}>
                الموقع
              </Typography>
            </Box>
            <TextField
              fullWidth
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              sx={{
                "& .MuiInputBase-input": {
                  fontSize: "1.8rem",
                  color: "black",
                  WebkitTextFillColor: "black"
                },
                "& .MuiInputBase-input::placeholder": {
                  fontSize: "1.8rem",
                  opacity: 0.7
                }
              }}
            />
          </Box>
        </Box>

        {/* ==================== 2. AREA ==================== */}
        <Box sx={{ position: "relative" }}>
          {/* --- GLOW EFFECT --- */}
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

          {/* --- CONTENT CARD --- */}
          <Box
            sx={{
              position: "relative",
              zIndex: 10,
              p: 2,
              borderRadius: 3,
              border: "1px solid #E2E8F0",
              background: "#E2E8F0",
            }}
          >
            <Box sx={{ display: "flex", gap: 1, mb: 1, color: LABEL_COLOR }}>
              <StraightenIcon />
              <Typography sx={{ fontWeight: 700, fontSize: { xs: "1rem", md: "1.3rem" }, fontFamily: TAJAWAL }}>
                المساحة
              </Typography>
            </Box>
            <TextField
              fullWidth
              value={area}
              onChange={(e) => setArea(e.target.value)}
              sx={{
                width: "40%",
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
        </Box>

        {/* ==================== 3. BUDGET ==================== */}
        <Box sx={{ position: "relative" }}>
          {/* --- GLOW EFFECT --- */}
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

          {/* --- CONTENT CARD --- */}
          <Box
            sx={{
              position: "relative",
              zIndex: 10,
              p: 2,
              borderRadius: 3,
              border: "1px solid #E2E8F0",
              background: "#E2E8F0",
            }}
          >
            <Box sx={{ display: "flex", gap: 1, mb: 2, color: LABEL_COLOR }}>
              <AccountBalanceWalletIcon />
              <Typography sx={{ fontWeight: 700, fontSize: { xs: "1rem", md: "1.3rem" }, fontFamily: TAJAWAL }}>
                الميزانية
              </Typography>
            </Box>
            <TextField
              select
              fullWidth
              value={priceLimit}
              onChange={(e) => setPriceLimit(e.target.value)}
              SelectProps={{ native: false }}
              sx={{ "& .MuiSelect-select": { fontSize: "1.2rem", color: "black", fontFamily: TAJAWAL, py: 1.5 } }}
            >
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
            </TextField>
          </Box>
        </Box>
      </Box>

      {/* ---------------- ADDITIONAL NOTES ---------------- */}
      <Box sx={{ mt: 5, position: "relative" }}>
        
        {/* --- GLOW EFFECT --- */}
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

        {/* --- CONTENT CARD --- */}
        <Box
          sx={{
            position: "relative",
            zIndex: 10,
            border: "1px solid #E2E8F0",
            background: "#E2E8F0",
            borderRadius: 3,
            p: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <EditNoteIcon sx={{ color: LABEL_COLOR }} />
            <Typography sx={{ fontWeight: 800, fontSize: { xs: "1.2rem", md: "1.6rem" }, color: LABEL_COLOR, fontFamily: TAJAWAL }}>
              تفاصيل إضافية
            </Typography>
          </Box>
          <Typography sx={{ mt: 0.5, mb: 1.5, fontSize: "0.95rem", color: "#222324ff", fontFamily: TAJAWAL, fontWeight: "bold" }}>
            اذكر أي ملاحظات أو متطلبات خاصة تساعدنا في خدمتك بشكل أفضل
          </Typography>
          <TextField
            multiline
            minRows={4}
            fullWidth
            placeholder="اكتب ملاحظاتك هنا..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            sx={{
              "& .MuiInputBase-input": {
                fontSize: "1.8rem",
                color: "black",
                WebkitTextFillColor: "black",
                fontFamily: TAJAWAL, // Applied directly here
              },
              "& .MuiInputBase-input::placeholder": {
                fontSize: "1.8rem",
                opacity: 0.7,
                fontFamily: TAJAWAL,
              },
            }}
          />
        </Box>
      </Box>

 

      {/* ---------------- CONTACT CHANNELS ---------------- */}
   {/* ---------------- CONTACT CHANNELS ---------------- */}
      <Box sx={{ mt: 6, position: "relative" }}>
        
        {/* --- GLOW EFFECT --- */}
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

        {/* --- CONTENT CARD --- */}
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
          <Typography sx={{ fontWeight: 800, fontSize: "1.3rem", mb: 0.5, color: LABEL_COLOR, fontFamily: TAJAWAL }}>
            قنوات التواصل
          </Typography>
          <Typography sx={{ fontSize: "1rem", mb: 3, color: "#242629ff", fontFamily: TAJAWAL, fontWeight: 'bold' }}>
            وسائل التواصل المتعددة تتيح الرد السريع من الفريق المختص
          </Typography>

          {/* ---------------- CALL ---------------- */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <FormControlLabel
              control={
                <Checkbox checked={channels.call} onChange={(e) => setChannels({ ...channels, call: e.target.checked })} />
              }
              label={<Typography sx={{ fontFamily: TAJAWAL, fontSize: '18px' }}>الرجاء التواصل على الرقم</Typography>}
            />
            <Box sx={{ flexGrow: 1, textAlign: "center", marginLeft: "150px" }}>
              <Typography sx={{
                fontFamily: TAJAWAL,
                fontWeight: 800,
                fontSize: "20px",
                direction: "ltr",
                color: "#1D4ED8",
                backgroundColor: "#F8FAFC",
                px: 3,
                py: 1,
                borderRadius: "999px",
                display: "inline-block",
                boxShadow: "0 6px 20px rgba(37,99,235,0.35)",
                letterSpacing: "0.5px"
              }}>
                📞 +966 00 000 0000
              </Typography>
            </Box>
          </Box>

          {/* ---------------- WHATSAPP & MOBILE ---------------- */}
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

          <FormControlLabel
            sx={{ mb: 3 }}
            control={<Checkbox checked={channels.chat} onChange={(e) => setChannels({ ...channels, chat: e.target.checked })} />}
            label={<Typography sx={{ fontFamily: TAJAWAL, fontSize: '18px', fontWeight: 'bold' }}>اترك اسمك وجوالك للتواصل معك لاحقًا</Typography>}
          />

          {/* ---------------- NAME & MOBILE ---------------- */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Typography sx={{ minWidth: 120, fontFamily: TAJAWAL, fontWeight: 600, fontSize: '18px' }}>الاسم</Typography>
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{
                "& .MuiInputBase-input": {
                  fontSize: "1.8rem",
                  color: "black",
                  WebkitTextFillColor: "black",
                  width: { xs: "100%", sm: "60%", md: "50%" }
                },
                "& .MuiInputBase-input::placeholder": {
                  fontSize: "1.8rem",
                  opacity: 0.7,
                  width: { xs: "100%", sm: "60%", md: "50%" }
                },
              }}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography sx={{ minWidth: 120, fontFamily: TAJAWAL, fontWeight: 600, fontSize: '18px' }}>الجوال</Typography>
            <TextField
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              sx={{
                "& .MuiInputBase-input": {
                  fontSize: "1.8rem",
                  color: "black",
                  WebkitTextFillColor: "black",
                  width: { xs: "100%", sm: "60%", md: "50%" }
                },
                "& .MuiInputBase-input::placeholder": {
                  fontSize: "1.8rem",
                  opacity: 0.7,
                  width: { xs: "100%", sm: "60%", md: "50%" }
                },
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* ---------------- SUBMIT ---------------- */}
      <Box sx={{ mt: 5, textAlign: "center" }}>
        <Button variant="contained" onClick={handleSubmit} sx={{ px: 5, py: 1.4, fontSize:'18px', fontWeight: 800, background: GRADIENT, fontFamily: TAJAWAL }}>
          ارسال الطلب
        </Button>
      </Box>
    </Container>

    </Box>
  );
};

export default Service01;
