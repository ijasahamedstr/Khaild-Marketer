// src/Page/Service/Service04.tsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  styled,
  FormControl,
} from "@mui/material";
import { keyframes } from "@mui/system";

// ---------------- CONSTANTS & TYPES ----------------

type FormData = {
  name: string;
  mobile: string;
};

type Props = {
  onSubmit?: (selectedItems: {
    seventhRows?: string[];
  }) => void;
};

const FORM_BACKGROUND_COLOR = "#fff";
const COLOR_PRIMARY_CYAN = "#E7E5E4";
const GRADIENT1 = "linear-gradient(135deg, #023B4E 0%, #06f9f3 100%)";
const TAJAWAL = "'Tajawal', sans-serif";

// ---------------- STYLED COMPONENT ----------------

const DarkTextField = styled(TextField)(({}) => ({
  "& .MuiFilledInput-root": {
    borderRadius: "12px",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    color: "#000",
    border: `1px solid ${COLOR_PRIMARY_CYAN}`,
    transition: "none",
    "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.9)" },
    "&.Mui-focused": {
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      borderColor: COLOR_PRIMARY_CYAN,
      boxShadow: "none",
    },
  },
  "& .MuiInputBase-input": {
    padding: "16px 12px",
    color: "#000",
    "&::placeholder": { color: "rgba(0, 0, 0, 0.5)", opacity: 1 },
  },
  "& .MuiInputLabel-filled": { color: "#000" },
}));

// ---------------- ANIMATION ----------------

const fadeUp = keyframes`
  0% { opacity: 0; transform: translateY(18px) scale(0.995); }
  60% { opacity: 1; transform: translateY(0) scale(1); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
`;

// ---------------- SEVENTH ROWS ----------------

const SEVENTH_ROWS = [
  { label: " التواصل مباشرةعلى هذا الرقم", hasInput: true },
  { label: "", hasInput: false },
];

// ---------------- COMPONENT ----------------

const Service04: React.FC<Props> = ({ onSubmit }) => {
  const topRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const t = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 120);
    return () => clearTimeout(t);
  }, []);

  const [seventhText, setSeventhText] = React.useState<Record<number, string>>({});
  const [formData, setFormData] = React.useState<FormData>({
    name: "",
    mobile: "",
  });

  const handleSeventhTextChange = (i: number, val: string) =>
    setSeventhText((s) => ({ ...s, [i]: val }));
  const handleChange = (field: keyof FormData, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  // ---------------- WHATSAPP MESSAGE BUILDER ----------------
  const buildWhatsAppMessage = () => {
    const seventhRowsArr = SEVENTH_ROWS.map((r, i) =>
      r.hasInput ? seventhText[i] ?? "" : r.label
    );

    return `
🛠️ *تشطيب العقار* 🏠

📞 التواصل: ${seventhRowsArr[0] || "لم يتم إدخال رقم"}
👤 الاسم: ${formData.name || "غير محدد"}
📱 الجوال: ${formData.mobile || "غير محدد"}
    `;
  };

  const handleSubmit = () => {
    const seventhRowsArr = SEVENTH_ROWS.map((r, i) =>
      r.hasInput ? (seventhText[i] ?? "").trim() : r.label
    );

    console.log("Contact Form Data:", formData);

    if (onSubmit) {
      onSubmit({ seventhRows: seventhRowsArr });
    }

    // ---------------- OPEN WHATSAPP ----------------
    const phoneNumber = "966509855666"; // Replace with your WhatsApp number
    const message = buildWhatsAppMessage();
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");

    // ---------------- RESET FORM ----------------
    setFormData({ name: "", mobile: "" });
    setSeventhText({});
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: { xs: 4, md: 8 },
        mb: { xs: 6, md: 12 },
        direction: "rtl",
        px: { xs: 2, md: 4 },
        fontFamily: TAJAWAL,
        backgroundColor: FORM_BACKGROUND_COLOR,
        borderRadius: "16px",
        py: { xs: 4, md: 8 },
      }}
    >
      <div ref={topRef} />

      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: { xs: "1.6rem", md: "2.4rem" },
            color: "#023B4E",
            fontFamily: TAJAWAL,
          }}
        >
          تشطيب العقار
        </Typography>
      </Box>

      {/* ---------------- SEVENTH GROUP ---------------- */}
      <Box
        sx={{
          mt: 5,
          mb: 4,
          p: 3,
          backgroundColor: "rgba(2, 59, 78, 0.05)",
          borderRadius: "12px",
        }}
      >
<Box sx={{ display: "grid", gap: 3, maxWidth: 1100, mx: "auto" }}>
  {SEVENTH_ROWS.map((r, i) => (
    <Box
      key={`seventh-row-${i}`}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        flexDirection: "row",
        width: "100%",
      }}
    >
      <Typography
        sx={{
          fontWeight: 900,
          fontSize: { xs: "24px", sm: "27px" },
          fontFamily: TAJAWAL,
          color: "#000",
          lineHeight: 1.3,
          width: "35%", // Label takes 30%
        }}
      >
        {r.label}
      </Typography>

      {r.hasInput && (
        <TextField
          value={seventhText[i] ?? ""}
          onChange={(e) => handleSeventhTextChange(i, e.target.value)}
          placeholder="أدخل قيمة..."
          variant="filled"
          hiddenLabel
          inputProps={{
            dir: "rtl",
            style: { fontFamily: TAJAWAL, color: "#000", fontSize: "14px" },
          }}
          sx={{
            width: "30%", // Textbox takes 70%
            "& .MuiInputBase-root": {
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              transition: "none",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.95)" },
              "&.Mui-focused": { backgroundColor: "rgba(255, 255, 255, 0.95)", boxShadow: "none" },
            },
            "& .MuiInputBase-input": { padding: "12px 14px" },
            "& .MuiFilledInput-underline:before": { borderBottom: "none" },
            "& .MuiFilledInput-underline:after": { borderBottom: "none" },
          }}
        />
      )}
    </Box>
  ))}
</Box>






      </Box>

      {/* ---------------- CONTACT FORM ---------------- */}
      <Box sx={{ mt: 6, p: 4, borderRadius: "16px", animation: `${fadeUp} 1000ms 300ms backwards` }}>
        <FormControl component="fieldset" sx={{ width: "100%", maxWidth: 1100, mx: "auto" }}>
          <Box sx={{ mb: 4, textAlign: "right" }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 800, fontSize: { xs: "1.6rem", md: "2.2rem" }, color: "#023B4E", fontFamily: TAJAWAL, mb: 1 }}
            >
              أو الرجاء ترك الإسم ورقم الجوال وسوف نعاود الإتصال بك
            </Typography>
          </Box>

          <Box sx={{ display: "grid", gap: 3, width: "100%", mx: "auto" }}>
            {/* Name */}
            <Box sx={{ display: "flex", gap: 2, alignItems: "top" }}>
              <Typography sx={{ fontFamily: TAJAWAL, fontSize: "28px", fontWeight: 600, color: "#000", lineHeight: 1.5 }}>
                الاسم
              </Typography>
              <Box sx={{ width: "40%" }}>
                <DarkTextField
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="أدخل الاسم"
                  fullWidth
                  variant="filled"
                  hiddenLabel
                  inputProps={{ dir: "rtl", style: { fontFamily: TAJAWAL, color: "#000" } }}
                />
              </Box>
            </Box>

            {/* Mobile */}
            <Box sx={{ display: "flex", gap: 2, alignItems: "top" }}>
              <Typography sx={{ fontFamily: TAJAWAL, fontSize: "28px", fontWeight: 600, color: "#000", lineHeight: 1.5 }}>
                جوال
              </Typography>
              <Box sx={{ width: "40%" }}>
                <DarkTextField
                  value={formData.mobile}
                  onChange={(e) => handleChange("mobile", e.target.value)}
                  placeholder="أدخل رقم الجوال"
                  fullWidth
                  variant="filled"
                  hiddenLabel
                  inputProps={{ dir: "rtl", style: { fontFamily: TAJAWAL, color: "#000" } }}
                />
              </Box>
            </Box>
          </Box>

          {/* Submit */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                px: 6,
                py: 1.5,
                borderRadius: 3,
                fontWeight: 700,
                fontFamily: TAJAWAL,
                fontSize: "1.2rem",
                textTransform: "none",
                background: GRADIENT1,
                color: "#000",
                boxShadow: "0 8px 28px rgba(6, 249, 243, 0.4)",
                "&:hover": { background: GRADIENT1, boxShadow: "0 8px 28px rgba(6, 249, 243, 0.4)" },
              }}
            >
              إرسال
            </Button>
          </Box>
        </FormControl>
      </Box>
    </Container>
  );
};

export default Service04;
