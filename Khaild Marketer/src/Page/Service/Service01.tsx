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
} from "@mui/material";

/* ---------------- ICONS ---------------- */
import AssignmentIcon from "@mui/icons-material/Assignment";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import StraightenIcon from "@mui/icons-material/Straighten";

/* ---------------- TYPES ---------------- */

type Props = {
  onSubmit?: (data: {
    dropdowns: string[];
    notes: string;
    search: string;
  }) => void;
};

/* ---------------- CONSTANTS ---------------- */

const TAJAWAL = "'Tajawal', sans-serif";
const GRADIENT = "linear-gradient(135deg, #023B4E 0%, #06f9f3 100%)";
const LABEL_COLOR = "#023B4E";

/* ---------------- DROPDOWN CONFIG ---------------- */

const DROPDOWN_FIELDS = [
  {
    label: "نوع الطلب",
    icon: <AssignmentIcon fontSize="small" />,
    options: ["شراء", "إيجار"],
  },
  {
    label: "نوع العقار",
    icon: <HomeWorkIcon fontSize="small" />,
    options: ["شقة", "فيلا", "أرض", "دوبلكس"],
  },
  {
    label: "المدينة",
    icon: <LocationCityIcon fontSize="small" />,
    options: ["الرياض", "جدة", "الدمام", "الخبر", "مكة"],
  },
  {
    label: "الميزانية",
    icon: <AccountBalanceWalletIcon fontSize="small" />,
    options: ["أقل من 500 ألف", "500 ألف - 1 مليون", "1 - 2 مليون", "أكثر من 2 مليون"],
  },
  {
    label: "المساحة",
    icon: <StraightenIcon fontSize="small" />,
    options: ["أقل من 100", "100 - 200", "200 - 300", "أكثر من 300"],
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

  const handleDropdownChange = (index: number, value: string) => {
    setDropdownValues((prev) => ({ ...prev, [index]: value }));
  };

  const handleSubmit = () => {
    if (!onSubmit) return;

    onSubmit({
      dropdowns: DROPDOWN_FIELDS.map((_, i) => dropdownValues[i] || ""),
      notes,
      search,
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
          variant="h2"
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
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 3,
        }}
      >
        {DROPDOWN_FIELDS.map((field, i) => (
          <Box
            key={i}
            sx={{
              p: 2,
              borderRadius: 3,
              border: "1px solid #eef3f3",
            }}
          >
            {/* LABEL WITH ICON */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 1,
                color: LABEL_COLOR,
              }}
            >
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
                sx={{
                  fontFamily: TAJAWAL,
                  "& .MuiSelect-select": { fontFamily: TAJAWAL },
                }}
                MenuProps={{
                  PaperProps: { sx: { fontFamily: TAJAWAL } },
                }}
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

      {/* ---------------- TEXT AREA ---------------- */}
      <Box sx={{ mt: 5 }}>
        <Typography
          sx={{
            mb: 1,
            fontWeight: 800,
            fontSize: { xs: "1.2rem", md: "1.6rem" },
            color: LABEL_COLOR,
            fontFamily: TAJAWAL,
          }}
        >
          تفاصيل
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

      {/* ---------------- SUBMIT ---------------- */}
      <Box sx={{ mt: 5, textAlign: "center" }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            px: 5,
            py: 1.4,
            fontWeight: 800,
            background: GRADIENT,
            fontFamily: TAJAWAL,
          }}
        >
          بحث
        </Button>
      </Box>
    </Container>
  );
};

export default Service01;
