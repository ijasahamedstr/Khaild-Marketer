// src/Page/Service/Service01.tsx
import React, { useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
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
    options: ["قصر","فيلا","تاون هاوس","شقة", "مستودعات", "أرض"],
  },
];

/* ---------------- COMPONENT ---------------- */

const Service01: React.FC<Props> = ({ onSubmit }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const [dropdownValues, setDropdownValues] =
    React.useState<Record<number, string>>({});
  const [notes, setNotes] = React.useState("");
  const [search] = React.useState("");

  const [channels, setChannels] = React.useState({
    chat: true,
    whatsapp: true,
    call: false,
  });

  const handleDropdownChange = (index: number, value: string) => {
    setDropdownValues((prev) => ({ ...prev, [index]: value }));
  };

  const handleSubmit = () => {
    if (!onSubmit) return;

    onSubmit({
      dropdowns: DROPDOWN_FIELDS.map((_, i) => dropdownValues[i] || ""),
      notes,
      search,
      channels,
    });
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
            شراء العقار
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
            <Box sx={{ display: "flex", gap: 1, mb: 1, color: LABEL_COLOR }}>
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

            <FormControl fullWidth>
              <Select
                value={dropdownValues[i] || ""}
                onChange={(e) =>
                  handleDropdownChange(i, e.target.value as string)
                }
                displayEmpty
                sx={{ fontFamily: TAJAWAL }}
              >
                <MenuItem value="">
                  <em>{field.label}</em>
                </MenuItem>
                {field.options.map((opt, idx) => (
                  <MenuItem key={idx} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          display: "grid",
          gap: 3,
          mt: 3,
        }}
      >
        {/* ===== 1. Property Type ===== */}
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
            value={dropdownValues[0] || ""}
            onChange={(e) => handleDropdownChange(0, e.target.value)}
            sx={{
              "& .MuiInputBase-input": {
                fontSize: "1.8rem", // Adjust size as needed (e.g., 24px)
                color: "black",     // Sets the typed text color
                WebkitTextFillColor: "black", // Ensures color stays black on all browsers
              },
              "& .MuiInputBase-input::placeholder": {
                fontSize: "1.8rem", // Optional: separate size for placeholder
                opacity: 0.7,       // Optional: makes placeholder slightly lighter
              },
            }}
          />
        </Box>

        {/* ===== 2. City ===== */}
        {/* <Box sx={{ p: 2, borderRadius: 3, border: "1px solid #eef3f3" }}>
          <Box sx={{ display: "flex", gap: 1, mb: 1, color: LABEL_COLOR }}>
            <LocationCityIcon />
            <Typography sx={{ fontWeight: 700, fontSize: { xs: "1rem", md: "1.3rem" }, fontFamily: TAJAWAL }}>
              اسم المطور العقاري 
            </Typography>
          </Box>
          <TextField
            fullWidth
            placeholder="Enter City"
            value={dropdownValues[1] || ""}
            onChange={(e) => handleDropdownChange(1, e.target.value)}
          />
        </Box> */}

        {/* ===== 3. Area ===== */}
        <Box sx={{ p: 2, borderRadius: 3, border: "1px solid #eef3f3" }}>
          <Box sx={{ display: "flex", gap: 1, mb: 1, color: LABEL_COLOR }}>
            <StraightenIcon />
            <Typography sx={{ fontWeight: 700, fontSize: { xs: "1rem", md: "1.3rem" }, fontFamily: TAJAWAL }}>
              المساحة
            </Typography>
          </Box>
          <TextField
            fullWidth
            placeholder="Enter Area"
            value={dropdownValues[2] || ""}
            onChange={(e) => handleDropdownChange(2, e.target.value)}
          />
        </Box>

        {/* ===== 4. Budget ===== */}

       <Box sx={{ p: 2, borderRadius: 3, border: "1px solid #eef3f3" }}>
  {/* ================= HEADER ================= */}
  <Box sx={{ display: "flex", gap: 1, mb: 2, color: LABEL_COLOR }}>
    <AccountBalanceWalletIcon />
    <Typography
      sx={{
        fontWeight: 700,
        fontSize: { xs: "1rem", md: "1.3rem" },
        fontFamily: TAJAWAL,
      }}
    >
       الميزانية
    </Typography>
  </Box>

    {/* ================= DROPDOWN SELECT ================= */}
    <TextField
      select // 👈 This turns the TextField into a Dropdown
      fullWidth
      value={dropdownValues[0] || ""}
      onChange={(e) => handleDropdownChange(0, e.target.value)}
      SelectProps={{
        native: false, // Set to true if you want native HTML select
      }}
      sx={{
        "& .MuiSelect-select": {
          fontSize: "1.2rem", // Bigger font
          color: "black",      // Black text
          fontFamily: TAJAWAL,
          py: 1.5,             // Added padding for better look
        },
      }}
    >
      {/* Replace these MenuItem labels with your actual price options */}
      <MenuItem value=" من 500,000 إلى 1000000 " sx={{ fontFamily: TAJAWAL }}>من 500,000 إلى 1000000 </MenuItem>
      <MenuItem value="من 1000000 إلى 1500000" sx={{ fontFamily: TAJAWAL }}>من 1000000 إلى 1500000</MenuItem>
      <MenuItem value="على امن 1500000 إلى 2000000" sx={{ fontFamily: TAJAWAL }}>من 1500000 إلى 200000</MenuItem>
       <MenuItem value="من 2000000 فأكثر" sx={{ fontFamily: TAJAWAL }}>من 2000000 فأكثر</MenuItem>
    </TextField>
  </Box>
      </Box>

      {/* ---------------- TEXT AREA ---------------- */}
      <Box sx={{ mt: 5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <EditNoteIcon sx={{ color: LABEL_COLOR }} />
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: { xs: "1.2rem", md: "1.6rem" },
              color: LABEL_COLOR,
              fontFamily: TAJAWAL,
            }}
          >
            تفاصيل إضافية
          </Typography>
        </Box>

        <Typography
          sx={{
            mt: 0.5,
            mb: 1.5,
            fontSize: "0.95rem",
            color: "#6b7280",
            fontFamily: TAJAWAL,
          }}
        >
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
              fontFamily: TAJAWAL,
            },
          }}
        />
      </Box>

     {/* ---------------- CONTACT CHANNELS ---------------- */}
      <Box
        sx={{
          mt: 6,
          p: 3,
          borderRadius: 3,
          border: "1px solid #eef3f3",
          backgroundColor: "#fafafa",
        }}
      >
        {/* ================= HEADER ================= */}
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: "1.3rem",
            mb: 0.5,
            color: LABEL_COLOR,
            fontFamily: TAJAWAL,
          }}
        >
          قنوات التواصل
        </Typography>

        <Typography
          sx={{
            fontSize: "0.9rem",
            mb: 3,
            color: "#6b7280",
            fontFamily: TAJAWAL,
          }}
        >
          وسائل التواصل المتعددة تتيح الرد السريع من الفريق المختص
        </Typography>

        {/* ================= ROW 01 : Checkbox + Centered Phone ================= */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 2,
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={channels.call}
                onChange={(e) =>
                  setChannels({ ...channels, call: e.target.checked })
                }
              />
            }
            label={
              <Typography sx={{ fontFamily: TAJAWAL ,fontSize:'18px'}}>
                الرجاء التواصل على الرقم
              </Typography>
            }
          />

          <Box sx={{ flexGrow: 1, textAlign: "center", marginLeft: "150px" }}>
          <Typography
            sx={{
              fontFamily: TAJAWAL,
              fontWeight: 800,
              fontSize: "17px",
              direction: "ltr",
              color: "#ffffff",
              background: "linear-gradient(135deg, #2563eb, #1e40af)",
              px: 3,
              py: 1,
              borderRadius: "999px",
              display: "inline-block",
              boxShadow: "0 6px 20px rgba(37,99,235,0.35)",
              letterSpacing: "0.5px",
            }}
          >
            📞 +966 50 985 5666
          </Typography>
        </Box>

        </Box>

        {/* ================= ROW 02 : WhatsApp / Mobile (Right aligned + space) ================= */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            gap: 8,
            alignItems: "center",
            mb: 3,
            marginRight:'27px',
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <WhatsAppIcon sx={{ color: "#25D366" }} />
            <Typography sx={{ fontFamily: TAJAWAL }}>
              واتساب
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <PhoneIcon />
            <Typography sx={{ fontFamily: TAJAWAL }}>
              جوال
            </Typography>
          </Box>
        </Box>

        {/* ================= ROW 03 : Checkbox ================= */}
        <FormControlLabel
          sx={{ mb: 3 }}
          control={
            <Checkbox
              checked={channels.chat}
              onChange={(e) =>
                setChannels({ ...channels, chat: e.target.checked })
              }
            />
          }
          label={
            <Typography sx={{ fontFamily: TAJAWAL,fontSize:'18px'}}>
              اترك اسمك وجوالك للتواصل معك لاحقًا
            </Typography>
          }
        />

        {/* ================= ROW 04 : Name ================= */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 2,
          }}
        >
          <Typography
            sx={{
              minWidth: 120,
              fontFamily: TAJAWAL,
              fontWeight: 600,
              fontSize:'18px'
            }}
          >
            الاسم
          </Typography>

          <TextField
            placeholder="أدخل الاسم"
            sx={{
              width: { xs: "100%", sm: "60%", md: "50%" },
            }}
          />
        </Box>

        {/* ================= ROW 05 : Mobile ================= */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography
            sx={{
              minWidth: 120,
              fontFamily: TAJAWAL,
              fontWeight: 600,
              fontSize:'18px'
            }}
          >
            الجوال
          </Typography>

          <TextField
            placeholder="أدخل رقم الاتصال"
            sx={{
              width: { xs: "100%", sm: "60%", md: "50%" },
            }}
          />
        </Box>
      </Box>



      {/* ---------------- SUBMIT ---------------- */}
      <Box sx={{ mt: 5, textAlign: "center" }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            px: 5,
            py: 1.4,
            fontSize:'18px',
            fontWeight: 800,
            background: GRADIENT,
            fontFamily: TAJAWAL,
          }}
        >
          ارسال الطلب 
        </Button>
      </Box>
    </Container>
  );
};

export default Service01;
